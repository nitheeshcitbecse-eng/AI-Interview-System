import re
import numpy as np
import nltk
from textblob import TextBlob

for resource, path in [
    ("punkt", "tokenizers/punkt"),
    ("averaged_perceptron_tagger", "taggers/averaged_perceptron_tagger"),
    ("stopwords", "corpora/stopwords"),
]:
    try:
        nltk.data.find(path)
    except LookupError:
        nltk.download(resource, quiet=True)

from nltk.corpus import stopwords
STOP_WORDS = set(stopwords.words("english"))

# ─── Keyword Banks ────────────────────────────────────────────────────────────

TECH_KEYWORDS = {
    "algorithms":     ["algorithm","complexity","recursion","sorting","searching","binary",
                       "tree","graph","heap","hash","dynamic","greedy","backtracking","bfs","dfs"],
    "data_structures":["array","linked","list","stack","queue","dictionary","set","tuple",
                       "matrix","vector","trie","deque"],
    "ml_ai":          ["model","training","neural","network","deep","learning","supervised",
                       "unsupervised","gradient","loss","accuracy","overfitting","regularization",
                       "dropout","classification","regression","clustering","embedding","transformer"],
    "web":            ["api","rest","http","request","response","endpoint","json","authentication",
                       "authorization","jwt","oauth","cors","middleware","routing","websocket","graphql"],
    "database":       ["sql","query","index","join","transaction","acid","normalization","schema",
                       "foreign","primary","nosql","mongodb","postgres","mysql","orm","redis"],
    "system_design":  ["scalability","availability","latency","throughput","cache","load","balancer",
                       "microservice","distributed","consistency","partition","replication","sharding"],
    "software_eng":   ["design","pattern","solid","testing","unit","integration","agile","scrum",
                       "git","refactor","architecture","abstraction","encapsulation","polymorphism"],
}

ALL_TECH = {kw for kws in TECH_KEYWORDS.values() for kw in kws}

FILLER_WORDS = {
    "um","uh","like","basically","literally","you","know","sort",
    "kind","thing","stuff","actually","honestly","obviously","clearly"
}

EXAMPLE_SIGNALS = [
    "for example","such as","for instance","to illustrate",
    "in my experience","i implemented","i built","i designed",
    "i worked on","specifically","in particular","consider"
]

STRUCTURE_SIGNALS = [
    "first","second","third","finally","additionally","furthermore",
    "however","therefore","in conclusion","to summarize",
    "step 1","step 2","1.","2.","3.","lastly","next"
]

FEATURE_KEYS = [
    "word_count","sentence_count","unique_words","avg_word_len","avg_sentence_len",
    "vocab_richness","content_density","tech_count","tech_density","tech_category_coverage",
    "filler_count","filler_ratio","example_count","structure_count","polarity","subjectivity",
    "noun_ratio","verb_ratio","has_numbers","has_code_hint","sentence_variety","length_score",
]


def extract_features(answer: str) -> dict:
    """Extract 22 numeric features from an answer string."""
    if not answer or not answer.strip():
        return {k: 0.0 for k in FEATURE_KEYS}

    blob      = TextBlob(answer)
    lower     = answer.lower()
    tokens    = nltk.word_tokenize(lower)
    alpha     = [t for t in tokens if t.isalpha()]
    sentences = nltk.sent_tokenize(answer)

    wc       = len(alpha)
    sc       = max(len(sentences), 1)
    unique   = len(set(alpha))
    non_stop = [t for t in alpha if t not in STOP_WORDS]

    tech_hits    = sum(1 for t in alpha if t in ALL_TECH)
    filler_hits  = sum(1 for t in alpha if t in FILLER_WORDS)
    example_hits = sum(1 for s in EXAMPLE_SIGNALS if s in lower)
    struct_hits  = sum(1 for s in STRUCTURE_SIGNALS if s in lower)

    try:
        pos    = nltk.pos_tag(alpha[:60])
        noun_r = sum(1 for _, t in pos if t.startswith("NN")) / max(len(pos), 1)
        verb_r = sum(1 for _, t in pos if t.startswith("VB")) / max(len(pos), 1)
    except Exception:
        noun_r = verb_r = 0.0

    sent_lens    = [len(nltk.word_tokenize(s)) for s in sentences]
    sent_variety = float(np.std(sent_lens)) if len(sent_lens) > 1 else 0.0

    return {
        "word_count":             wc,
        "sentence_count":         sc,
        "unique_words":           unique,
        "avg_word_len":           float(np.mean([len(t) for t in alpha])) if alpha else 0.0,
        "avg_sentence_len":       wc / sc,
        "vocab_richness":         unique / max(wc, 1),
        "content_density":        len(non_stop) / max(wc, 1),
        "tech_count":             tech_hits,
        "tech_density":           tech_hits / max(wc, 1),
        "tech_category_coverage": len([c for c, kws in TECH_KEYWORDS.items()
                                       if any(t in kws for t in alpha)]) / len(TECH_KEYWORDS),
        "filler_count":           filler_hits,
        "filler_ratio":           filler_hits / max(wc, 1),
        "example_count":          example_hits,
        "structure_count":        struct_hits,
        "polarity":               float(blob.sentiment.polarity),
        "subjectivity":           float(blob.sentiment.subjectivity),
        "noun_ratio":             noun_r,
        "verb_ratio":             verb_r,
        "has_numbers":            int(bool(re.search(r'\d', answer))),
        "has_code_hint":          int(any(k in lower for k in
                                    ["o(","big o","time complexity","space complexity","def ","class ","function"])),
        "sentence_variety":       sent_variety,
        "length_score":           _length_score(wc),
    }


def _length_score(wc: int) -> float:
    if wc < 10:    return 0.1
    if wc < 30:    return 0.3 + (wc - 10) / 20 * 0.3
    if wc <= 100:  return 0.6 + (wc - 30) / 70 * 0.3
    if wc <= 250:  return 0.9 + (wc - 100) / 150 * 0.1
    return max(0.5, 1.0 - (wc - 250) / 500)


def to_vector(features: dict) -> np.ndarray:
    return np.array([features.get(k, 0.0) for k in FEATURE_KEYS])