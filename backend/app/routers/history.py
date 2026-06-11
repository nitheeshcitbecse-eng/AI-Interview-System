from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from datetime import datetime
from pydantic import BaseModel
from app.database import get_db
from app.models.history import History

router = APIRouter(prefix="/history", tags=["History"])

class HistoryItem(BaseModel):
    id: int
    role: str
    score: float
    duration: int
    date: datetime
    class Config:
        from_attributes = True

@router.get("/{user_id}", response_model=List[HistoryItem])
async def get_history(user_id: int, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(History).where(History.user_id == user_id).order_by(History.date.desc()))
    return res.scalars().all()