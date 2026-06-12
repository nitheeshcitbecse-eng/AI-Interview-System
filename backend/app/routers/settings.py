from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.user import Settings as UserSettings
from app.schemas.settings import SettingsUpdate, SettingsResponse

router = APIRouter(prefix="/settings", tags=["Settings"])

@router.get("/{user_id}", response_model=SettingsResponse)
async def get_settings(user_id: int, db: AsyncSession = Depends(get_db)):
    s = (await db.execute(select(UserSettings).where(UserSettings.user_id == user_id))).scalar_one_or_none()
    if not s:
        raise HTTPException(status_code=404, detail="Settings not found")
    return SettingsResponse(user_id=user_id, language=s.language, voice=s.voice, theme=s.theme,
                            camera_enabled=s.camera_enabled, eye_detection=s.eye_detection, difficulty=s.difficulty)

@router.put("/{user_id}", response_model=SettingsResponse)
async def update_settings(user_id: int, data: SettingsUpdate, db: AsyncSession = Depends(get_db)):
    s = (await db.execute(select(UserSettings).where(UserSettings.user_id == user_id))).scalar_one_or_none()
    if not s:
        raise HTTPException(status_code=404, detail="Settings not found")
    for field, value in data.model_dump(exclude_none=True).items():
        setattr(s, field, value)
    await db.commit()
    await db.refresh(s)
    return SettingsResponse(user_id=user_id, language=s.language, voice=s.voice, theme=s.theme,
                            camera_enabled=s.camera_enabled, eye_detection=s.eye_detection, difficulty=s.difficulty)