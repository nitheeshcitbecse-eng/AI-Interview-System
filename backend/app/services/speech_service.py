import uuid
from pathlib import Path
from gtts import gTTS
import whisper
from app.config import settings

_whisper_model = None


def get_whisper_model():
    global _whisper_model
    if _whisper_model is None:
        _whisper_model = whisper.load_model("base")
    return _whisper_model


def speech_to_text(audio_file_path: str) -> str:
    model = get_whisper_model()
    result = model.transcribe(audio_file_path)
    return result["text"].strip()


def text_to_speech(text: str, lang: str = "en") -> str:
    upload_dir = Path(settings.UPLOAD_DIR) / "audio"
    upload_dir.mkdir(parents=True, exist_ok=True)

    filename = f"{uuid.uuid4()}.mp3"
    output_path = upload_dir / filename

    tts = gTTS(text=text, lang=lang, slow=False)
    tts.save(str(output_path))

    return f"/static/audio/{filename}"