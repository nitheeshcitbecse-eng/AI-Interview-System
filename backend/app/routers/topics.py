from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List, Optional
from pydantic import BaseModel
from app.database import get_db
from app.models.topic import Topic, QuestionBank

router = APIRouter(prefix="/topics", tags=["Topics"])

class TopicOut(BaseModel):
    topic_id: int
    name: str
    description: Optional[str]
    difficulty: str
    class Config:
        from_attributes = True

class QuestionBankOut(BaseModel):
    id: int
    question: str
    answer: Optional[str]
    difficulty: str
    class Config:
        from_attributes = True

@router.get("", response_model=List[TopicOut])
async def get_topics(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Topic).order_by(Topic.name))
    return res.scalars().all()

@router.get("/{topic_id}/questions", response_model=List[QuestionBankOut])
async def get_topic_questions(topic_id: int, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(QuestionBank).where(QuestionBank.topic_id == topic_id))
    return res.scalars().all()