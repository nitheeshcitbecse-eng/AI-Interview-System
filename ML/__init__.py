from ML.model import scorer, AnswerScorerModel
from ML.heuristic import heuristic_score
from ML.features import extract_features
from ML.answer_analyzer import analyze_answer, batch_analyze
from ML.resume_scorer import score_resume

def predict_scores(answer: str) -> dict:
    return scorer.predict(answer)

def save_sample(answer: str, scores: dict):
    AnswerScorerModel.save_sample(answer, scores)

def train_model() -> dict:
    result = AnswerScorerModel.train()
    if "error" not in result:
        scorer._load()
    return result

def model_status() -> dict:
    return {
        "trained":        scorer.is_trained(),
        "samples":        AnswerScorerModel.sample_count(),
        "samples_needed": max(0, 20 - AnswerScorerModel.sample_count()),
        "scorer":         "ML Model" if scorer.is_trained() else "Heuristic",
    }