import json
from openai import AsyncOpenAI
from app.config import settings

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


async def generate_first_question(role: str, department: str, resume_summary: str = "") -> str:
    context = f"Role: {role}, Department: {department}."
    if resume_summary:
        context += f" Candidate resume summary: {resume_summary}"

    resp = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert technical interviewer. Start every interview "
                    "with a warm, professional greeting and the classic opening question. "
                    "Keep it under 50 words."
                ),
            },
            {"role": "user", "content": f"Start interview for: {context}"},
        ],
        max_tokens=150,
        temperature=0.7,
    )
    return resp.choices[0].message.content.strip()


async def generate_next_question(role: str, previous_qa: list[dict], difficulty: str = "medium") -> dict:
    history_text = "\n".join(
        [f"Q{i+1}: {qa['question']}\nA{i+1}: {qa['answer']}" for i, qa in enumerate(previous_qa)]
    )

    prompt = (
        f"Role: {role}\nDifficulty: {difficulty}\n"
        f"Interview history so far:\n{history_text}\n\n"
        "Generate the next interview question. After 8 questions total, set is_last=true. "
        'Respond ONLY with valid JSON: {"question": "...", "category": "technical|hr|behavioral", "is_last": false}'
    )

    resp = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert technical interviewer. Reply only with JSON."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=200,
        temperature=0.7,
    )
    raw = resp.choices[0].message.content.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(raw)


async def evaluate_answer(question: str, answer: str, role: str) -> dict:
    prompt = (
        f"Role being interviewed for: {role}\n"
        f"Question: {question}\nCandidate Answer: {answer}\n\n"
        "Evaluate this answer. Respond ONLY with JSON:\n"
        '{"technical": 0-100, "communication": 0-100, "confidence": 0-100, '
        '"clarity": 0-100, "comment": "brief encouraging transition comment max 20 words"}'
    )
    resp = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert interviewer. Reply only with JSON."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=200,
        temperature=0.3,
    )
    raw = resp.choices[0].message.content.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(raw)


async def generate_final_feedback(role: str, all_qa_scores: list[dict]) -> dict:
    summary = json.dumps(all_qa_scores, indent=2)
    prompt = (
        f"Role: {role}\nInterview Q&A with scores:\n{summary}\n\n"
        "Generate comprehensive interview feedback. Respond ONLY with JSON:\n"
        '{"overall_score": 0-100, "technical_score": 0-100, "communication_score": 0-100, '
        '"confidence_score": 0-100, "clarity_score": 0-100, '
        '"strengths": ["...", "..."], "weaknesses": ["...", "..."], "suggestions": ["...", "..."]}'
    )
    resp = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a senior interviewer generating a detailed feedback report. Reply only with JSON."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=600,
        temperature=0.4,
    )
    raw = resp.choices[0].message.content.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(raw)


async def analyze_resume_text(resume_text: str) -> dict:
    prompt = (
        f"Resume text:\n{resume_text[:4000]}\n\n"
        "Analyze this resume for a software/tech role. Respond ONLY with JSON:\n"
        '{"score": 0-100, "skills": [...], "strengths": [...], "weaknesses": [...], "suggestions": [...]}'
    )
    resp = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an expert HR recruiter. Reply only with JSON."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=800,
        temperature=0.3,
    )
    raw = resp.choices[0].message.content.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(raw)