from typing import Optional
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Response, status
from app.store import store

router = APIRouter(prefix="/trainers", tags=["trainers"])

@router.get("")
@router.get("/")
def get_trainers(category: Optional[str] = None, search: Optional[str] = None):
    trainers = store.get_trainers(category=category, search=search)
    return {
        "success": True,
        "count": len(trainers),
        "trainers": trainers
    }

@router.get("/{trainer_id}")
def get_trainer_by_id(trainer_id: str, response: Response):
    trainer = store.get_trainer_by_id(trainer_id)
    if not trainer:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {
            "success": False,
            "message": f"Trainer with ID '{trainer_id}' not found."
        }
    return {
        "success": True,
        "trainer": trainer
    }

@router.get("/{trainer_id}/slots")
def get_trainer_slots(trainer_id: str, response: Response):
    trainer = store.get_trainer_by_id(trainer_id)
    if not trainer:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {
            "success": False,
            "message": f"Trainer with ID '{trainer_id}' not found."
        }

    schedule = []
    base_date = datetime.now()
    for i in range(7):
        d = base_date + timedelta(days=i)
        full_date = d.strftime("%Y-%m-%d")
        if i == 0:
            day_name = "Today"
        elif i == 1:
            day_name = "Tomorrow"
        else:
            day_name = d.strftime("%a")

        schedule.append({
            "date": full_date,
            "dayName": day_name,
            "slots": trainer.get("availableSlots", [])
        })

    return {
        "success": True,
        "trainerId": trainer.get("id"),
        "trainerName": trainer.get("name"),
        "sessionPrice": trainer.get("sessionPrice"),
        "schedule": schedule
    }
