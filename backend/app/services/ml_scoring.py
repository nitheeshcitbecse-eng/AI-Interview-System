import json
import pickle
import numpy as np
from pathlib import Path
from typing import Optional

import nltk
from textblob import TextBlob
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.multioutput import MultiOutputRegressor
from sklearn.model_selection import train_test_split

try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt", quiet=True)
try:
    nltk.data.find("averaged_perceptron_tagger")
except LookupError:
    nltk.download("averaged_perceptron_tagger", quiet=True)

MODEL_PATH = Path("ml_models/answer_scorer.pkl")
TRAINING_DATA_PATH = Path("ml_models/training_data.json")
MODEL_PATH.parent.mkdir(parents=True, exist_ok=True)


def extract_text_features(answer: str) -> dict:
    if not answer or not answer.strip():
        return {k: 0.0 for k in ["word_count","sentence_count","avg_word_len","avg_sentence_len",
                                  "vocab_richness","tech_density","filler_ratio","polarity",
                                  "subjectivity","has_example","has_structure"]}

    blob = TextBlob(answer)
    tokens = nltk.word_tokenize(answer.lower())
    sentences = nltk.sent_tokenize(answer)

    word_count = len(tokens)
    sentence_count = max(len(sentences), 1)
    avg_word_len = np.mean([len(t) for t in tokens if t.isalpha()]) if tokens else 0
    vocab_richness = len(set(tokens)) / max(word_count, 1)

    tech_keywords = {"algorithm","complexity","database","api","model","function","class","object",
                     "performance","optimize","design","pattern","architecture","deploy","test",
                     "debug","pipeline","machine","learning","neural","data","structure","binary",
                     "tree","graph","hash","array","queue","stack","cache","http","rest","sql"}
    tech_density = sum(1 for t in tokens if t in tech_keywords) / max(word_count, 1)

    filler_words = {"um","uh","like","basically","literally","you know"}
    filler_ratio = sum(1 for t in tokens if t in filler_words) / max(word_count, 1)

    has_example  = int(any(w in answer.lower() for w in ["for example","such as","e.g.","instance"]))
    has_structure = int(any(c in answer for c in ["1.","2.","-","•","first","second","finally"]))

    return {
        "word_count": word_count, "sentence_count": sentence_count,
        "avg_word_len": avg_word_len, "avg_sentence_len": word_count / sentence_count,
        "vocab_richness": vocab_richness, "tech_density": tech_density,
        "filler_ratio": filler_ratio, "polarity": blob.sentiment.polarity,
        "subjectivity": blob.sentiment.subjectivity,
        "has_example": has_example, "has_structure": has_structure,
    }


def features_to_vector(features: dict) -> np.ndarray:
    keys = ["word_count","sentence_count","avg_word_len","avg_sentence_len","vocab_richness",
            "tech_density","filler_ratio","polarity","subjectivity","has_example","has_structure"]
    return np.array([features.get(k, 0.0) for k in keys])


def heuristic_score(answer: str) -> dict:
    f = extract_text_features(answer)
    wc = f["word_count"]
    length_score = min(wc / 150, 1.0) if wc <= 150 else max(0.5, 1.0 - (wc - 200) / 300)

    technical     = min(100, f["tech_density"]*200 + length_score*40 + f["vocab_richness"]*30 + f["has_example"]*15 + f["has_structure"]*15)
    communication = min(100, length_score*35 + f["avg_sentence_len"]/25*20 + f["has_structure"]*20 + (1 - f["filler_ratio"]*10)*25)
    confidence    = min(100, (f["polarity"]+1)/2*30 + (1-f["subjectivity"])*20 + length_score*30 + f["has_example"]*20)
    clarity       = min(100, f["vocab_richness"]*30 + f["has_structure"]*25 + length_score*25 + (1 - min(f["avg_sentence_len"]/40, 1))*20)

    return {
        "technical":     round(max(0, technical), 1),
        "communication": round(max(0, communication), 1),
        "confidence":    round(max(0, confidence), 1),
        "clarity":       round(max(0, clarity), 1),
    }


class AnswerScorerModel:
    SCORE_KEYS = ["technical", "communication", "confidence", "clarity"]

    def __init__(self):
        self.model: Optional[Pipeline] = None
        self._load_if_exists()

    def _load_if_exists(self):
        if MODEL_PATH.exists():
            with open(MODEL_PATH, "rb") as f:
                self.model = pickle.load(f)

    def is_trained(self) -> bool:
        return self.model is not None

    def predict(self, answer: str) -> dict:
        if not self.is_trained():
            return heuristic_score(answer)
        features = features_to_vector(extract_text_features(answer)).reshape(1, -1)
        preds = self.model.predict(features)[0]
        return {k: round(float(np.clip(v, 0, 100)), 1) for k, v in zip(self.SCORE_KEYS, preds)}

    @staticmethod
    def save_training_sample(answer: str, scores: dict):
        existing = []
        if TRAINING_DATA_PATH.exists():
            with open(TRAINING_DATA_PATH) as f:
                existing = json.load(f)
        existing.append({"answer": answer, "scores": scores})
        with open(TRAINING_DATA_PATH, "w") as f:
            json.dump(existing, f, indent=2)

    @classmethod
    def train(cls) -> dict:
        if not TRAINING_DATA_PATH.exists():
            return {"error": "No training data found"}
        with open(TRAINING_DATA_PATH) as f:
            data = json.load(f)
        if len(data) < 20:
            return {"error": f"Need at least 20 samples, have {len(data)}"}

        X_text = [d["answer"] for d in data]
        y = np.array([[d["scores"].get(k, 50) for k in cls.SCORE_KEYS] for d in data])

        pipeline = Pipeline([
            ("tfidf", TfidfVectorizer(max_features=500, ngram_range=(1, 2))),
            ("model", MultiOutputRegressor(RandomForestRegressor(n_estimators=100, random_state=42))),
        ])
        X_train, X_test, y_train, y_test = train_test_split(X_text, y, test_size=0.2)
        pipeline.fit(X_train, y_train)
        score = pipeline.score(X_test, y_test)

        with open(MODEL_PATH, "wb") as f:
            pickle.dump(pipeline, f)

        return {"samples": len(data), "r2_score": round(score, 3), "status": "trained"}


scorer = AnswerScorerModel()