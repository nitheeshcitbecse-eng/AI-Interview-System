import json
import pickle
import numpy as np
from pathlib import Path
from typing import Optional

from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multioutput import MultiOutputRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, r2_score

from ml.features import extract_features, to_vector
from ml.heuristic import heuristic_score, SCORE_KEYS

MODEL_PATH         = Path("ml_models/answer_scorer.pkl")
TRAINING_DATA_PATH = Path("ml_models/training_data.json")
METRICS_PATH       = Path("ml_models/metrics.json")
MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)


class AnswerScorerModel:

    def __init__(self):
        self.text_model:    Optional[Pipeline] = None
        self.feature_model: Optional[Pipeline] = None
        self._load()

    def _load(self):
        if MODEL_PATH.exists():
            with open(MODEL_PATH, "rb") as f:
                saved = pickle.load(f)
                self.text_model    = saved.get("text_model")
                self.feature_model = saved.get("feature_model")

    def is_trained(self) -> bool:
        return self.text_model is not None

    def predict(self, answer: str) -> dict:
        if not self.is_trained():
            return heuristic_score(answer)

        t = self._text_predict(answer)
        g = self._feature_predict(answer)

        return {
            k: round(float(np.clip(0.6 * t[k] + 0.4 * g[k], 0, 100)), 1)
            for k in SCORE_KEYS
        }

    def _text_predict(self, answer: str) -> dict:
        preds = self.text_model.predict([answer])[0]
        return {k: float(np.clip(v, 0, 100)) for k, v in zip(SCORE_KEYS, preds)}

    def _feature_predict(self, answer: str) -> dict:
        if self.feature_model is None:
            return heuristic_score(answer)
        vec   = to_vector(extract_features(answer)).reshape(1, -1)
        preds = self.feature_model.predict(vec)[0]
        return {k: float(np.clip(v, 0, 100)) for k, v in zip(SCORE_KEYS, preds)}

    # ── Data management ───────────────────────────────────────────

    @staticmethod
    def save_sample(answer: str, scores: dict):
        data = []
        if TRAINING_DATA_PATH.exists():
            with open(TRAINING_DATA_PATH) as f:
                data = json.load(f)
        if not any(d["answer"] == answer for d in data):
            data.append({"answer": answer, "scores": scores})
            with open(TRAINING_DATA_PATH, "w") as f:
                json.dump(data, f, indent=2)

    @staticmethod
    def sample_count() -> int:
        if not TRAINING_DATA_PATH.exists():
            return 0
        with open(TRAINING_DATA_PATH) as f:
            return len(json.load(f))

    # ── Training ──────────────────────────────────────────────────

    @classmethod
    def train(cls) -> dict:
        if not TRAINING_DATA_PATH.exists():
            return {"error": "No training data yet. Complete some interviews first."}

        with open(TRAINING_DATA_PATH) as f:
            data = json.load(f)

        n = len(data)
        if n < 20:
            return {"error": f"Need at least 20 samples. Have {n} so far."}

        answers = [d["answer"] for d in data]
        y       = np.array([[d["scores"].get(k, 50) for k in SCORE_KEYS] for d in data])

        # Model A: TF-IDF → RandomForest
        text_pipeline = Pipeline([
            ("tfidf", TfidfVectorizer(
                max_features=1000, ngram_range=(1, 3),
                sublinear_tf=True, min_df=2
            )),
            ("model", MultiOutputRegressor(
                RandomForestRegressor(
                    n_estimators=200, max_depth=10,
                    min_samples_split=4, random_state=42, n_jobs=-1
                )
            )),
        ])

        # Model B: Hand-crafted features → GradientBoosting
        X_feat = np.array([to_vector(extract_features(a)) for a in answers])
        feature_pipeline = Pipeline([
            ("scaler", StandardScaler()),
            ("model",  MultiOutputRegressor(
                GradientBoostingRegressor(
                    n_estimators=100, max_depth=4,
                    learning_rate=0.1, random_state=42
                )
            )),
        ])

        tr, te = train_test_split(list(range(n)), test_size=0.2, random_state=42)

        text_pipeline.fit([answers[i] for i in tr], y[tr])
        feature_pipeline.fit(X_feat[tr], y[tr])

        tp = text_pipeline.predict([answers[i] for i in te])
        fp = feature_pipeline.predict(X_feat[te])
        bp = 0.6 * tp + 0.4 * fp

        metrics = {
            "status":  "trained",
            "samples": n,
            "r2":      round(float(r2_score(y[te], bp)), 3),
            "mae":     round(float(mean_absolute_error(y[te], bp)), 2),
            "per_score_mae": {
                k: round(float(mean_absolute_error(y[te, i], bp[:, i])), 2)
                for i, k in enumerate(SCORE_KEYS)
            },
        }

        with open(MODEL_PATH, "wb") as f:
            pickle.dump({"text_model": text_pipeline, "feature_model": feature_pipeline}, f)
        with open(METRICS_PATH, "w") as f:
            json.dump(metrics, f, indent=2)

        return metrics


# Global singleton
scorer = AnswerScorerModel()