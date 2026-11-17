"""Safety layer tests — the non-negotiable medical guardrails."""
from app.services.safety import (
    DISCLAIMER_BN,
    EMERGENCY_BN,
    REFUSAL_BN,
    is_emergency,
    requests_diagnosis,
    wrap_reply,
)


def test_chest_pain_is_emergency() -> None:
    """Bangla chest pain must trigger the emergency path."""
    assert is_emergency("আমার বুকে ব্যথা করছে")


def test_breathing_difficulty_is_emergency() -> None:
    assert is_emergency("শ্বাস কষ্ট হচ্ছে")


def test_normal_symptom_is_not_emergency() -> None:
    assert not is_emergency("দুই দিন ধরে জ্বর আছে")


def test_diagnosis_request_is_refused() -> None:
    assert requests_diagnosis("রিপোর্ট দেখে বলো কী রোগ")


def test_dose_request_is_refused() -> None:
    assert requests_diagnosis("নাপার ডোজ কত?")


def test_emergency_reply_leads_with_999() -> None:
    """Rule 2: emergency answer starts with the 999/ER directive."""
    reply, disclaimer, flagged = wrap_reply("ভয় পাবেন না।", True, False)
    assert reply.startswith(EMERGENCY_BN)
    assert disclaimer == DISCLAIMER_BN
    assert not flagged


def test_refusal_includes_disclaimer() -> None:
    """Rule 1: every reply carries the disclaimer."""
    reply, disclaimer, flagged = wrap_reply("", False, True)
    assert REFUSAL_BN in reply
    assert DISCLAIMER_BN in reply
    assert flagged


def test_normal_reply_gets_disclaimer_footer() -> None:
    reply, disclaimer, flagged = wrap_reply("মেডিসিন দেখুন।", False, False)
    assert reply.endswith(DISCLAIMER_BN)
    assert not flagged
