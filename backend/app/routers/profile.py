import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import User, Profile
from app.schemas.profile import ProfileUpdate, ProfileResponse

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.get("/{user_id}", response_model=ProfileResponse)
async def get_profile(user_id: int, db: AsyncSession = Depends(get_db)):
    user = (await db.execute(select(User).where(User.id == user_id))).scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    profile = (await db.execute(select(Profile).where(Profile.user_id == user_id))).scalar_one_or_none()
    return ProfileResponse(
        user_id=user_id, name=user.name, email=user.email, profile_image=user.profile_image,
        college=profile.college if profile else None, department=profile.department if profile else None,
        skills=json.loads(profile.skills) if profile and profile.skills else [],
        bio=profile.bio if profile else None,
    )

@router.put("/{user_id}", response_model=ProfileResponse)
async def update_profile(user_id: int, data: ProfileUpdate, db: AsyncSession = Depends(get_db)):
    profile = (await db.execute(select(Profile).where(Profile.user_id == user_id))).scalar_one_or_none()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    if data.college is not None: profile.college = data.college
    if data.department is not None: profile.department = data.department
    if data.skills is not None: profile.skills = json.dumps(data.skills)
    if data.bio is not None: profile.bio = data.bio
    await db.commit()
    return await get_profile(user_id, db)