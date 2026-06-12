from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.dashboard import DashboardStats
from app.models.user import User
from app.schemas.dashboard import DashboardResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/{user_id}", response_model=DashboardResponse)
async def get_dashboard(user_id: int, db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.id == user_id))).scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    stats = (await db.execute(select(DashboardStats).where(DashboardStats.user_id == user_id))).scalar_one_or_none()
    return DashboardResponse(
        name=user.name,
        total_interviews=stats.total_interviews if stats else 0,
        average_score=stats.average_score if stats else 0.0,
        questions_answered=stats.total_questions if stats else 0,
        practice_hours=stats.practice_hours if stats else 0.0,
    )