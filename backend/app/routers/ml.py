from fastapi import APIRouter
from app.services.ml_scoring import AnswerScorerModel, scorer

router = APIRouter(prefix="/ml", tags=["ML Admin"])

@router.post("/train")
async def trigger_training():
    result = AnswerScorerModel.train()
    scorer._load_if_exists()
    return result

@router.get("/status")
async def model_status():
    return {
        "model_trained": scorer.is_trained(),
        "using": "RandomForest (TF-IDF)" if scorer.is_trained() else "Heuristic rule-based scorer",
    }