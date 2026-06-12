import base64
import cv2
import numpy as np
import mediapipe as mp
from dataclasses import dataclass

mp_face_mesh = mp.solutions.face_mesh

LEFT_EYE_INDICES  = [33, 160, 158, 133, 153, 144]
RIGHT_EYE_INDICES = [362, 385, 387, 263, 373, 380]
LEFT_IRIS  = [468, 469, 470, 471, 472]
RIGHT_IRIS = [473, 474, 475, 476, 477]


@dataclass
class FrameAnalysisResult:
    eye_contact_score: float = 0.0
    confidence_score: float = 0.0
    face_detected: bool = False


def decode_frame(base64_image: str) -> np.ndarray:
    img_data = base64.b64decode(base64_image)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)


def analyze_frame(base64_image: str) -> FrameAnalysisResult:
    frame = decode_frame(base64_image)
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = FrameAnalysisResult()

    with mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
    ) as face_mesh:
        output = face_mesh.process(rgb)
        if not output.multi_face_landmarks:
            return result

        result.face_detected = True
        landmarks = output.multi_face_landmarks[0].landmark
        h, w = frame.shape[:2]

        def iris_center(indices):
            return np.mean([landmarks[i].x * w for i in indices]), np.mean([landmarks[i].y * h for i in indices])

        def eye_center(indices):
            return np.mean([landmarks[i].x * w for i in indices]), np.mean([landmarks[i].y * h for i in indices])

        li_cx, li_cy = iris_center(LEFT_IRIS)
        le_cx, le_cy = eye_center(LEFT_EYE_INDICES)
        ri_cx, ri_cy = iris_center(RIGHT_IRIS)
        re_cx, re_cy = eye_center(RIGHT_EYE_INDICES)

        left_eye_w  = max(abs(landmarks[LEFT_EYE_INDICES[0]].x  - landmarks[LEFT_EYE_INDICES[3]].x)  * w, 1)
        right_eye_w = max(abs(landmarks[RIGHT_EYE_INDICES[0]].x - landmarks[RIGHT_EYE_INDICES[3]].x) * w, 1)

        left_offset  = np.sqrt((li_cx - le_cx)**2 + (li_cy - le_cy)**2) / left_eye_w
        right_offset = np.sqrt((ri_cx - re_cx)**2 + (ri_cy - re_cy)**2) / right_eye_w
        avg_offset = (left_offset + right_offset) / 2

        result.eye_contact_score = round(max(0.0, 1.0 - avg_offset * 3) * 100, 1)

        nose_tip = landmarks[1]
        center_penalty = abs(nose_tip.x - 0.5) * 2
        result.confidence_score = round(max(0.0, (1.0 - center_penalty) * 100), 1)

    return result


def aggregate_scores(frame_results: list[FrameAnalysisResult]) -> dict:
    valid = [r for r in frame_results if r.face_detected]
    if not valid:
        return {"eye_contact": 0, "confidence": 0}
    return {
        "eye_contact": round(np.mean([r.eye_contact_score for r in valid]), 1),
        "confidence":  round(np.mean([r.confidence_score  for r in valid]), 1),
    }