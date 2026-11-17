"""FastAPI chat endpoint tests via TestClient."""
from fastapi.testclient import TestClient

from app.main import create_app

client = TestClient(create_app())


def test_health_has_disclaimer() -> None:
    resp = client.get("/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "ok"
    assert "চিকিৎসা পরামর্শ নয়" in body["disclaimer"]


def test_emergency_message_flags_emergency() -> None:
    resp = client.post(
        "/chat",
        json={"session_id": "s1", "message": "বুকে ব্যথা করছে", "locale": "bn"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["emergency"] is True
    assert "৯৯৯" in body["reply"]


def test_diagnosis_message_is_refused() -> None:
    resp = client.post(
        "/chat",
        json={"session_id": "s2", "message": "কী রোগ হয়েছে বলো", "locale": "bn"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["flagged"] is True
    assert "রোগ নির্ণয়" in body["reply"]


def test_history_records_turns() -> None:
    client.post(
        "/chat",
        json={"session_id": "s3", "message": "জ্বর আছে", "locale": "bn"},
    )
    resp = client.get("/chat/history/s3")
    assert resp.status_code == 200
    assert len(resp.json()["messages"]) == 2


def test_stream_produces_sse_events() -> None:
    with client.stream(
        "POST",
        "/chat/stream",
        json={"session_id": "s4", "message": "জ্বর আছে", "locale": "bn"},
    ) as resp:
        assert resp.status_code == 200
        events = list(resp.iter_lines())
    assert any("token" in line for line in events)
    assert any("done" in line for line in events)
