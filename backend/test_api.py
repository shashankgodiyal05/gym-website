import sys
import pytest

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_and_info():
    health = client.get("/api/health")
    assert health.status_code == 200
    assert health.json().get("status") == "healthy"

    info = client.get("/api")
    assert info.status_code == 200
    assert "endpoints" in info.json()

def test_trainers():
    trainers = client.get("/api/trainers")
    assert trainers.status_code == 200
    assert len(trainers.json().get("trainers", [])) == 5

    trainer_one = client.get("/api/trainers/tr-1")
    assert trainer_one.status_code == 200
    assert "Vikram" in trainer_one.json().get("trainer", {}).get("name", "")

    slots = client.get("/api/trainers/tr-1/slots")
    assert slots.status_code == 200
    assert len(slots.json().get("schedule", [])) == 7

    trainers_filtered = client.get("/api/trainers?category=Strength")
    assert trainers_filtered.status_code == 200
    assert len(trainers_filtered.json().get("trainers", [])) >= 1

    trainers_search = client.get("/api/trainers?search=Vikram")
    assert trainers_search.status_code == 200
    assert len(trainers_search.json().get("trainers", [])) >= 1

def test_auth():
    reg_payload = {
        "name": "Rohan Sharma",
        "email": "rohan.test@athlete.com",
        "phone": "+91 99999 88888",
        "goal": "Muscle Hypertrophy & Strength"
    }
    register = client.post("/api/auth/register", json=reg_payload)
    assert register.status_code in (200, 201)
    assert register.json().get("user", {}).get("name") == "Rohan Sharma"

    login = client.post("/api/auth/login", json={"email": "rohan.test@athlete.com"})
    assert login.status_code == 200
    assert login.json().get("user", {}).get("email") == "rohan.test@athlete.com"

    profile = client.get("/api/auth/me")
    assert profile.status_code == 200

    update_prof = client.put("/api/auth/profile", json={"phone": "+91 99999 77777"})
    assert update_prof.status_code == 200
    assert update_prof.json().get("user", {}).get("phone") == "+91 99999 77777"

def test_memberships():
    plans = client.get("/api/memberships")
    assert plans.status_code == 200
    assert len(plans.json().get("plans", [])) == 3

    enroll = client.post("/api/memberships/enroll", json={
        "planId": "elite-vip",
        "billingCycle": "annual",
        "paymentMethod": "upi"
    })
    assert enroll.status_code == 200
    assert enroll.json().get("enrollment", {}).get("plan", {}).get("id") == "elite-vip"

    active_tier = client.get("/api/memberships/active")
    assert active_tier.status_code == 200
    assert active_tier.json().get("activeTier") == "elite-vip"

def test_bookings():
    new_booking = client.post("/api/bookings", json={
        "trainerId": "tr-1",
        "date": "2026-09-25",
        "timeSlot": "07:30 AM - 08:30 AM",
        "focus": "Compound Lifting Technique"
    })
    assert new_booking.status_code == 201
    booking_id = new_booking.json().get("booking", {}).get("id")

    bookings_list = client.get("/api/bookings")
    assert bookings_list.status_code == 200
    assert any(b.get("id") == booking_id for b in bookings_list.json().get("bookings", []))

    cancel = client.delete(f"/api/bookings/{booking_id}")
    assert cancel.status_code == 200

def test_facilities_and_inquiries():
    facilities = client.get("/api/facilities")
    assert facilities.status_code == 200
    assert len(facilities.json().get("facilities", [])) > 0

    inquiry = client.post("/api/facilities/inquiry", json={
        "name": "Pooja Verma",
        "email": "pooja@test.com",
        "message": "Interested in annual membership"
    })
    assert inquiry.status_code == 201

def test_reset():
    reset_res = client.post("/api/auth/reset")
    assert reset_res.status_code == 200

if __name__ == "__main__":
    test_health_and_info()
    test_trainers()
    test_auth()
    test_memberships()
    test_bookings()
    test_facilities_and_inquiries()
    test_reset()
    print("All tests passed successfully!")
