"""Medical safety guardrails (Handoff §8 - non-negotiable).

Rules enforced here:
1. Every reply carries the disclaimer.
2. Emergency patterns answer 999/ER FIRST.
3. Diagnosis requests are refused - triage/navigation only.
5. Medicine/dose answers never substitute a prescription.
"""
import re

DISCLAIMER_BN = (
    "⚠️ এটি চিকিৎসা পরামর্শ নয়। AI শুধু পথ দেখায় - চূড়ান্ত সিদ্ধান্ত হবে "
    "ভেরিফায়েড ডাক্তারের। ওষুধ বা ডোজ নিজে থেকে বদলাবেন না।"
)
EMERGENCY_BN = (
    "🚨 এটি জরুরি অবস্থা হতে পারে। এখনই ৯৯৯ ডায়াল করুন বা নিকটতম "
    "হাসপাতালের ইমার্জেন্সিতে যান।"
)

# Patterns that mark an emergency - Bangla and English.
_EMERGENCY_PATTERNS = [
    r"বুক\s*ধড়ফড়|বুকে\s*ব্যথা|chest\s*pain",
    r"শ্বাস\s*কষ্ট|শ্বাসকষ্ট|difficulty\s*breathing",
    r"অজ্ঞান|unconscious",
    r"রক্তক্ষরণ|bleeding\s*(heavily|a\s*lot)",
    r"খিঁচুনি|seizure|convulsion",
    r"আত্মহত্যা|suicide",
]

# Patterns that request diagnosis/dose - must be refused.
_DIAGNOSIS_PATTERNS = [
    r"কী\s*রোগ|কি\s*রোগ|diagnos",
    r"কোন\s*ওষুধ\s*খাব|কী\s*ওষুধ|what\s*medicine\s*should",
    r"ডোজ\s*কত|dose\s*of",
    r"রিপোর্ট\s*দেখে\s*(বল|কী|কি)|diagnose\s*from\s*report",
]


def _matches(text: str, patterns: list[str]) -> bool:
    """Case-insensitive regex scan of the user message."""
    lowered = text.lower()
    return any(re.search(p, lowered) for p in patterns)


def is_emergency(message: str) -> bool:
    """True when the message matches an emergency pattern."""
    return _matches(message, _EMERGENCY_PATTERNS)


def requests_diagnosis(message: str) -> bool:
    """True when the user asks for diagnosis, a specific drug, or a dose."""
    return _matches(message, _DIAGNOSIS_PATTERNS)


REFUSAL_BN = (
    "আমি রোগ নির্ণয় বা ওষুধের পরামর্শ দিতে পারি না - এটি শুধু ভেরিফায়েড "
    "ডাক্তারই করবেন। আপনার লক্ষণ অনুযায়ী কোন স্পেশালিটির ডাক্তার দেখা "
    "উচিত, সেটা বলতে পারি। বলুন: কোথায় সমস্যা এবং কতদিন ধরে?"
)


def wrap_reply(reply: str, emergency: bool, refused: bool) -> tuple[str, str, bool]:
    """Assemble the final reply with mandatory footer text.

    Returns (reply, disclaimer, flagged).
    """
    if emergency:
        return f"{EMERGENCY_BN}\n\n{reply}", DISCLAIMER_BN, False
    if refused:
        return f"{REFUSAL_BN}\n\n{DISCLAIMER_BN}", DISCLAIMER_BN, True
    return f"{reply}\n\n{DISCLAIMER_BN}", DISCLAIMER_BN, False
