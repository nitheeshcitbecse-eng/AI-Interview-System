import uuid, json
from pathlib import Path
import pdfplumber
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.resume import Resume, ResumeAnalysis
from app.schemas.resume import ResumeUploadResponse, ResumeAnalysisResponse
from app.services.ai_service import analyze_resume_text
from app.config import settings

router = APIRouter(prefix="/resume", tags=["Resume"])
UPLOAD_DIR = Path(settings.UPLOAD_DIR) / "resumes"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(user_id: int, file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files accepted")
    content = await file.read()
    filename = f"{uuid.uuid4()}.pdf"
    (UPLOAD_DIR / filename).write_bytes(content)

    resume = Resume(user_id=user_id, file_url=f"/static/resumes/{filename}", original_filename=file.filename)
    db.add(resume)
    await db.commit()
    await db.refresh(resume)
    return ResumeUploadResponse(resume_id=resume.resume_id, file_url=resume.file_url, message="Uploaded. Call /resume/analyze to analyze.")


@router.post("/analyze/{resume_id}", response_model=ResumeAnalysisResponse)
async def analyze_resume(resume_id: int, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Resume).where(Resume.resume_id == resume_id))
    resume = res.scalar_one_or_none()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    local_path = Path(settings.UPLOAD_DIR) / "resumes" / Path(resume.file_url).name
    extracted_text = ""
    with pdfplumber.open(str(local_path)) as pdf:
        for page in pdf.pages:
            extracted_text += page.extract_text() or ""

    analysis_data = await analyze_resume_text(extracted_text)

    existing = (await db.execute(select(ResumeAnalysis).where(ResumeAnalysis.resume_id == resume_id))).scalar_one_or_none()
    if existing:
        for k, v in analysis_data.items():
            setattr(existing, k if k != "score" else "score", json.dumps(v) if isinstance(v, list) else v)
    else:
        db.add(ResumeAnalysis(
            resume_id=resume_id, score=analysis_data["score"],
            skills=json.dumps(analysis_data.get("skills", [])),
            strengths=json.dumps(analysis_data.get("strengths", [])),
            weaknesses=json.dumps(analysis_data.get("weaknesses", [])),
            suggestions=json.dumps(analysis_data.get("suggestions", [])),
            raw_text=extracted_text[:5000],
        ))
    await db.commit()
    return ResumeAnalysisResponse(resume_id=resume_id, **{k: analysis_data[k] for k in ["score","skills","strengths","weaknesses","suggestions"]})


@router.get("/{resume_id}", response_model=ResumeAnalysisResponse)
async def get_resume_analysis(resume_id: int, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(ResumeAnalysis).where(ResumeAnalysis.resume_id == resume_id))
    a = res.scalar_one_or_none()
    if not a:
        raise HTTPException(status_code=404, detail="No analysis found")
    return ResumeAnalysisResponse(
        resume_id=resume_id, score=a.score,
        skills=json.loads(a.skills or "[]"), strengths=json.loads(a.strengths or "[]"),
        weaknesses=json.loads(a.weaknesses or "[]"), suggestions=json.loads(a.suggestions or "[]"),
    )