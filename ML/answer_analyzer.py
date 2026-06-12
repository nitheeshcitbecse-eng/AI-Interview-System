from ml.features import extract_features, TECH_KEYWORDS, FILLER_WORDS

SCORE_KEYS = ["technical", "communication", "confidence", "clarity"]


def analyze_answer(question: str, answer: str) -> dict:
    """
    Returns per-answer strengths, issues, and tips.
    Used in the feedback report card.
    """
    f         = extract_features(answer)
    issues    = []
    strengths = []
    tips      = []
    wc        = f["word_count"]
    lower     = answer.lower()

    # ── Length ────────────────────────────────────────────────────
    if wc < 20:
        issues.append("Answer is too short.")
        tips.append("Aim for at least 50–100 words per answer.")
    elif wc < 50:
        issues.append("Answer could be more detailed.")
        tips.append("Add context, examples, or explain your reasoning step by step.")
    elif wc > 400:
        issues.append("Answer is too long — be more concise.")
        tips.append("Focus on key points; interviewers value clarity over length.")
    else:
        strengths.append("Good answer length.")

    # ── Filler words ──────────────────────────────────────────────
    if f["filler_ratio"] > 0.05:
        issues.append("Too many filler words — practice pausing instead.")
        tips.append("Record yourself answering and count filler words to improve.")
    else:
        strengths.append("Clean delivery with minimal filler words.")

    # ── Examples ──────────────────────────────────────────────────
    if f["example_count"] == 0:
        tips.append("Support your answer with a real example from your experience.")
    else:
        strengths.append("Good use of concrete examples.")

    # ── Structure ─────────────────────────────────────────────────
    if f["structure_count"] == 0 and wc > 80:
        tips.append("Structure your answer: 'First… Second… Finally…'")
    elif f["structure_count"] > 0:
        strengths.append("Well-structured answer.")

    # ── Technical depth ───────────────────────────────────────────
    is_technical = any(k in question.lower() for k in
        ["algorithm","design","implement","explain","difference","complexity","how","what is","why"])
    if is_technical and f["tech_density"] < 0.02:
        issues.append("Lacks technical depth for this question.")
        tips.append("Include specific terms, complexity analysis, or implementation details.")
    elif f["tech_density"] > 0.08:
        strengths.append("Strong technical vocabulary used.")

    # ── Confidence ────────────────────────────────────────────────
    if f["polarity"] < -0.1:
        tips.append("Use more confident, positive language in your answers.")
    elif f["polarity"] > 0.1:
        strengths.append("Confident and positive tone.")

    # ── Vocabulary ────────────────────────────────────────────────
    if f["vocab_richness"] < 0.4:
        tips.append("Vary your vocabulary — avoid repeating the same words.")
    elif f["vocab_richness"] > 0.7:
        strengths.append("Rich and varied vocabulary.")

    # ── STAR method for behavioural questions ─────────────────────
    is_behavioural = any(k in question.lower() for k in
        ["tell me about","describe a time","give an example","when did you","how did you handle"])
    if is_behavioural:
        has_s = any(w in lower for w in ["situation","context","background","was working"])
        has_t = any(w in lower for w in ["task","goal","objective","needed to","had to"])
        has_a = any(w in lower for w in ["did","implemented","solved","created","built","decided"])
        has_r = any(w in lower for w in ["result","outcome","achieved","improved","reduced","learned"])
        if all([has_s, has_t, has_a, has_r]):
            strengths.append("Used STAR method effectively.")
        else:
            missing = [name for flag, name in [
                (has_s,"Situation"),(has_t,"Task"),(has_a,"Action"),(has_r,"Result")
            ] if not flag]
            tips.append(f"STAR method incomplete — missing: {', '.join(missing)}.")

    quality = (
        "Excellent"        if not issues and len(strengths) >= 3 else
        "Good"             if len(issues) <= 1 and len(strengths) >= 2 else
        "Average"          if len(issues) <= 2 else
        "Needs Improvement"
    )

    return {
        "word_count": wc,
        "quality":    quality,
        "strengths":  strengths,
        "issues":     issues,
        "tips":       tips,
    }


def batch_analyze(qa_list: list[dict]) -> list[dict]:
    """Analyze all Q&A pairs from a completed session."""
    results = []
    for i, qa in enumerate(qa_list):
        r = analyze_answer(qa.get("question", ""), qa.get("answer", ""))
        r["question_number"] = i + 1
        r["question"]        = qa.get("question", "")
        results.append(r)
    return results