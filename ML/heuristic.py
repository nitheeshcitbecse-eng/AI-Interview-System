import numpy as np
from ml.features import extract_features

SCORE_KEYS = ["technical", "communication", "confidence", "clarity"]


def heuristic_score(answer: str) -> dict:
    """
    Rule-based scorer. Works instantly with zero training data.
    Used as fallback when ML model is not yet trained.
    """
    f = extract_features(answer)

    technical = (
        f["tech_density"]           * 150 +
        f["tech_category_coverage"] *  80 +
        f["has_code_hint"]          *  20 +
        f["has_numbers"]            *  10 +
        f["vocab_richness"]         *  25 +
        f["length_score"]           *  30 -
        f["filler_ratio"]           *  50
    )

    communication = (
        f["example_count"]                   *  12 +
        f["structure_count"]                 *   8 +
        f["length_score"]                    *  35 +
        f["content_density"]                 *  25 +
        f["sentence_variety"]                *   0.5 -
        f["filler_ratio"]                    *  80 -
        max(0, f["avg_sentence_len"] - 30)   *   0.5
    )

    confidence = (
        (f["polarity"] + 1) / 2  *  30 +
        (1 - f["subjectivity"])  *  20 +
        f["length_score"]        *  25 +
        f["example_count"]       *  10 +
        f["has_numbers"]         *  10 -
        f["filler_ratio"]        *  60
    )

    clarity = (
        f["vocab_richness"]                  *  25 +
        f["structure_count"]                 *  10 +
        f["length_score"]                    *  25 +
        f["content_density"]                 *  20 +
        f["sentence_variety"]                *   0.3 -
        f["filler_ratio"]                    *  50 -
        max(0, f["avg_sentence_len"] - 35)   *   0.8
    )

    return {
        k: round(float(np.clip(v, 0, 100)), 1)
        for k, v in zip(SCORE_KEYS, [technical, communication, confidence, clarity])
    }