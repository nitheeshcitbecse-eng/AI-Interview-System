import re

RESUME_TECH = {
    "languages":  ["python","java","javascript","typescript","c++","c#","go","rust","kotlin","swift"],
    "frontend":   ["react","angular","vue","html","css","tailwind","bootstrap","nextjs","redux"],
    "backend":    ["fastapi","django","flask","spring","nodejs","express","graphql","rest"],
    "databases":  ["postgresql","mysql","mongodb","redis","sqlite","cassandra","elasticsearch"],
    "ml_ai":      ["tensorflow","pytorch","scikit-learn","keras","pandas","numpy","opencv","huggingface"],
    "devops":     ["docker","kubernetes","aws","gcp","azure","ci","cd","github","terraform","jenkins","linux"],
}

ACTION_VERBS  = ["built","developed","designed","implemented","created","optimized","improved",
                 "led","launched","deployed","automated","reduced","increased","managed","architected"]
IMPACT_WORDS  = ["improved","reduced","increased","saved","boosted","accelerated","achieved",
                 "delivered","generated","streamlined","enhanced","scaled","optimized"]
SOFT_SKILLS   = ["communication","leadership","teamwork","problem-solving","critical thinking",
                 "time management","adaptability","creativity","collaboration","mentoring"]
EDUCATION_KW  = ["bachelor","master","phd","b.e","b.tech","m.tech","mca","bsc","msc",
                 "degree","university","college","gpa","cgpa"]
CERT_KW       = ["certified","certification","aws","gcp","azure","google","microsoft",
                 "coursera","udemy","nptel","hackerrank","leetcode"]


def score_resume(resume_text: str) -> dict:
    """
    Score a resume locally without any API call.
    Returns score, skills, strengths, weaknesses, suggestions.
    """
    lower    = resume_text.lower()
    words    = re.findall(r'\b\w+\b', lower)
    word_set = set(words)
    wc       = len(words)

    # Skills
    found        = {cat: [s for s in skills if s in lower] for cat, skills in RESUME_TECH.items()}
    total_found  = sum(len(v) for v in found.values())
    skill_score  = min(100, (total_found / 15) * 100)

    # Action verbs
    action_hits  = sum(1 for v in ACTION_VERBS if v in word_set)
    action_score = min(100, action_hits * 15)

    # Quantified impact
    numbers      = len(re.findall(r'\b\d+[%x]?\b', resume_text))
    impact_hits  = sum(1 for w in IMPACT_WORDS if w in word_set)
    impact_score = min(100, numbers * 5 + impact_hits * 10)

    # Education & certifications
    has_edu      = any(k in lower for k in EDUCATION_KW)
    cert_hits    = sum(1 for k in CERT_KW if k in lower)
    edu_score    = 100 if has_edu else 0
    cert_score   = min(100, cert_hits * 20)

    # Length
    if   wc < 100:  len_score = 20
    elif wc < 200:  len_score = 50
    elif wc < 400:  len_score = 80
    elif wc <= 800: len_score = 100
    else:           len_score = max(60, 100 - (wc - 800) / 20)

    # Soft skills
    soft_found   = [s for s in SOFT_SKILLS if s in lower]
    soft_score   = min(100, len(soft_found) * 20)

    # Overall (weighted)
    overall = (
        skill_score  * 0.35 +
        action_score * 0.15 +
        impact_score * 0.20 +
        edu_score    * 0.10 +
        cert_score   * 0.08 +
        len_score    * 0.07 +
        soft_score   * 0.05
    )

    # Strengths
    strengths = []
    if skill_score  > 60: strengths.append(f"Strong tech stack — {total_found} technologies found")
    if action_hits  > 5:  strengths.append("Good use of action verbs")
    if numbers      > 3:  strengths.append("Quantified achievements present")
    if has_edu:           strengths.append("Education section present")
    if cert_hits    > 0:  strengths.append(f"{cert_hits} certification(s) detected")
    if len(soft_found)>2: strengths.append("Good mix of soft skills")

    # Weaknesses
    weaknesses = []
    if skill_score  < 40: weaknesses.append("Limited tech skills — add more technologies")
    if action_hits  < 3:  weaknesses.append("Few action verbs — use Built, Designed, Improved")
    if numbers      < 2:  weaknesses.append("No quantified impact — add numbers (e.g. 'Reduced latency by 40%')")
    if not has_edu:       weaknesses.append("No education section found")
    if cert_hits   == 0:  weaknesses.append("No certifications — add any online courses")
    if wc          < 200: weaknesses.append("Resume too short — expand experience sections")

    # Suggestions
    suggestions = []
    missing = [cat for cat, skills in found.items() if not skills]
    if missing:
        suggestions.append(f"Missing skills in: {', '.join(missing)}")
    if not found.get("devops"):
        suggestions.append("Add DevOps/cloud skills — Docker, AWS, CI/CD are highly valued")
    suggestions.append("Tailor keywords to match the specific job description")
    suggestions.append("Keep to 1 page if under 2 years experience")

    return {
        "score":              round(overall, 1),
        "skills":             [s.title() for cat in found.values() for s in cat],
        "skills_by_category": {cat: [s.title() for s in skills] for cat, skills in found.items() if skills},
        "strengths":          strengths,
        "weaknesses":         weaknesses,
        "suggestions":        suggestions,
        "breakdown": {
            "skills":         round(skill_score, 1),
            "action_verbs":   round(action_score, 1),
            "impact":         round(impact_score, 1),
            "education":      round(edu_score, 1),
            "certifications": round(cert_score, 1),
            "length":         round(len_score, 1),
        },
    }