import json
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from app.database import get_db
from app.models.interview import InterviewSession, Question, Answer, LiveAnalysis, Feedback
from app.models.resume import Resume
from app.models.user import Settings as UserSettings
from app.models.history import History
from app.models.dashboard import DashboardStats
from app.schemas.interview import (
    StartInterviewRequest, StartInterviewResponse,
    SubmitAnswerRequest, AnswerResponse,
    LiveAnalysisResponse, FeedbackResponse,
)
from app.services import ai_service, speech_service
from app.services.cv_service import analyze_frame, FrameAnalysisResult
from app.services.ml_scoring import scorer, AnswerScorerModel

router = APIRouter(prefix="/interview", tags=["Interview"])

_session_frames: dict[int, list[FrameAnalysisResult]] = {}
_session_qa: dict[int, list[dict]] = {}


@router.post("/start", response_model=StartInterviewResponse)
async def start_interview(data: StartInterviewRequest, db: AsyncSession = Depends(get_db)):
    resume_summary = ""
    if data.resume_id:
        res = await db.execute(select(Resume).where(Resume.resume_id == data.resume_id))
        resume = res.scalar_one_or_none()
        if resume and resume.analysis:
            resume_summary = f"Skills: {resume.analysis.skills}"

    session = InterviewSession(
        user_id=data.user_id, role=data.role,
        department=data.department, resume_id=data.resume_id, status="active",
    )
    db.add(session)
    await db.flush()

    first_q = await ai_service.generate_first_question(data.role, data.department or "", resume_summary)
    db.add(Question(session_id=session.session_id, question_text=first_q, category="opening"))
    await db.commit()
    await db.refresh(session)

    _session_frames[session.session_id] = []
    _session_qa[session.session_id] = []

    return StartInterviewResponse(
        session_id=session.session_id,
        question=first_q,
        audio_url=speech_service.text_to_speech(first_q),
        avatar_state="speaking",
    )


@router.post("/answer", response_model=AnswerResponse)
async def submit_answer(data: SubmitAnswerRequest, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(InterviewSession).where(InterviewSession.session_id == data.session_id))
    session = res.scalar_one_or_none()
    if not session or session.status != "active":
        raise HTTPException(status_code=404, detail="Active session not found")

    res2 = await db.execute(
        select(Question).where(Question.session_id == data.session_id)
        .order_by(Question.created_at.desc()).limit(1)
    )
    latest_q = res2.scalar_one_or_none()
    if not latest_q:
        raise HTTPException(status_code=400, detail="No question found for this session")

    db.add(Answer(
        session_id=data.session_id, question_id=latest_q.question_id,
        user_answer=data.answer, time_taken=data.time_taken,
    ))

    ml_scores = scorer.predict(data.answer)
    try:
        ai_scores = await ai_service.evaluate_answer(latest_q.question_text, data.answer, session.role)
    except Exception:
        ai_scores = {**ml_scores, "comment": "Good answer! Moving on."}

    blended = {
        k: round((ml_scores.get(k, 50) + ai_scores.get(k, 50)) / 2, 1)
        for k in ["technical", "communication", "confidence", "clarity"]
    }

    db.add(LiveAnalysis(
        session_id=data.session_id,
        confidence=blended["confidence"], communication=blended["communication"],
        technical_score=blended["technical"], clarity=blended["clarity"], eye_contact=0.0,
    ))

    AnswerScorerModel.save_training_sample(data.answer, blended)

    qa_history = _session_qa.get(data.session_id, [])
    qa_history.append({"question": latest_q.question_text, "answer": data.answer, "scores": blended})
    _session_qa[data.session_id] = qa_history

    settings_res = await db.execute(select(UserSettings).where(UserSettings.user_id == session.user_id))
    user_settings = settings_res.scalar_one_or_none()
    difficulty = user_settings.difficulty if user_settings else "medium"

    try:
        next_q_data = await ai_service.generate_next_question(session.role, qa_history, difficulty)
    except Exception:
        next_q_data = {"question": "Tell me about a challenging project.", "category": "behavioral", "is_last": len(qa_history) >= 8}

    interview_ended = next_q_data.get("is_last", False) or len(qa_history) >= 8
    comment = ai_scores.get("comment", "Good answer!")

    if not interview_ended:
        db.add(Question(
            session_id=data.session_id,
            question_text=next_q_data["question"],
            category=next_q_data.get("category", "general"),
            difficulty=difficulty,
        ))
        response_text = f"{comment} {next_q_data['question']}"
        audio_url = speech_service.text_to_speech(response_text)
        await db.commit()
        return AnswerResponse(
            message=comment, next_question=next_q_data["question"],
            audio_url=audio_url, avatar_state="speaking", interview_ended=False,
        )

    # End session
    now = datetime.now(timezone.utc)
    duration_seconds = int((now - session.start_time.replace(tzinfo=timezone.utc)).total_seconds())

    await db.execute(
        update(InterviewSession).where(InterviewSession.session_id == data.session_id)
        .values(status="completed", end_time=now, duration=duration_seconds)
    )

    try:
        fb_data = await ai_service.generate_final_feedback(session.role, qa_history)
    except Exception:
        fb_data = {
            "overall_score": blended["technical"], "technical_score": blended["technical"],
            "communication_score": blended["communication"], "confidence_score": blended["confidence"],
            "clarity_score": blended["clarity"], "strengths": ["Good responses"],
            "weaknesses": ["Needs more examples"], "suggestions": ["Practice more"],
        }

    db.add(Feedback(
        session_id=data.session_id,
        overall_score=fb_data.get("overall_score", 0),
        technical_score=fb_data.get("technical_score", 0),
        communication_score=fb_data.get("communication_score", 0),
        confidence_score=fb_data.get("confidence_score", 0),
        clarity_score=fb_data.get("clarity_score", 0),
        strengths=json.dumps(fb_data.get("strengths", [])),
        weaknesses=json.dumps(fb_data.get("weaknesses", [])),
        suggestions=json.dumps(fb_data.get("suggestions", [])),
    ))

    db.add(History(
        user_id=session.user_id, session_id=data.session_id,
        role=session.role, score=fb_data.get("overall_score", 0), duration=duration_seconds,
    ))

    stats_res = await db.execute(select(DashboardStats).where(DashboardStats.user_id == session.user_id))
    stats = stats_res.scalar_one_or_none()
    if stats:
        new_total = stats.total_interviews + 1
        stats.average_score = round((stats.average_score * stats.total_interviews + fb_data.get("overall_score", 0)) / new_total, 1)
        stats.total_interviews = new_total
        stats.total_questions += len(qa_history)
        stats.practice_hours += round(duration_seconds / 3600, 2)

    await db.commit()
    outro = f"Interview complete! Your overall score is {fb_data.get('overall_score', 0):.0f}. Well done!"
    return AnswerResponse(
        message=outro, audio_url=speech_service.text_to_speech(outro),
        avatar_state="idle", interview_ended=True,
    )


@router.post("/answer/audio")
async def submit_audio_answer(session_id: int, audio: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    import tempfile, os
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        tmp.write(await audio.read())
        tmp_path = tmp.name
    try:
        transcribed_text = speech_service.speech_to_text(tmp_path)
    finally:
        os.unlink(tmp_path)
    return await submit_answer(SubmitAnswerRequest(session_id=session_id, answer=transcribed_text), db)


@router.post("/frame/{session_id}")
async def submit_frame(session_id: int, payload: dict):
    base64_frame = payload.get("frame", "")
    if not base64_frame:
        raise HTTPException(status_code=400, detail="No frame provided")
    result = analyze_frame(base64_frame)
    if session_id not in _session_frames:
        _session_frames[session_id] = []
    _session_frames[session_id].append(result)
    return {"eye_contact": result.eye_contact_score, "confidence": result.confidence_score,
            "face_detected": result.face_detected, "avatar_state": "listening"}


@router.get("/analysis/{session_id}", response_model=LiveAnalysisResponse)
async def get_live_analysis(session_id: int, db: AsyncSession = Depends(get_db)):
    res = await db.execute(
        select(LiveAnalysis).where(LiveAnalysis.session_id == session_id)
        .order_by(LiveAnalysis.created_at.desc()).limit(1)
    )
    lv = res.scalar_one_or_none()
    if not lv:
        raise HTTPException(status_code=404, detail="No analysis found")
    return LiveAnalysisResponse(
        confidence=lv.confidence, communication=lv.communication,
        technical=lv.technical_score, eye_contact=lv.eye_contact, clarity=lv.clarity,
    )


@router.get("/feedback/{session_id}", response_model=FeedbackResponse)
async def get_feedback(session_id: int, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Feedback).where(Feedback.session_id == session_id))
    fb = res.scalar_one_or_none()
    if not fb:
        raise HTTPException(status_code=404, detail="Feedback not yet generated")
    return FeedbackResponse(
        overall_score=fb.overall_score, technical=fb.technical_score,
        communication=fb.communication_score, confidence=fb.confidence_score,
        clarity=fb.clarity_score, strengths=json.loads(fb.strengths or "[]"),
        weaknesses=json.loads(fb.weaknesses or "[]"), suggestions=json.loads(fb.suggestions or "[]"),
    )