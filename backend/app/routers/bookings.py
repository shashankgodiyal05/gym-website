from typing import Optional
from fastapi import APIRouter, Response, status
from app.models.schemas import BookingCreateRequest
from app.store import store

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.get("")
@router.get("/")
def get_bookings(userId: Optional[str] = None):
    bookings = store.get_bookings(userId)
    return {
        "success": True,
        "count": len(bookings),
        "bookings": bookings
    }

@router.post("")
@router.post("/")
def create_booking(payload: BookingCreateRequest, response: Response):
    if not payload.trainerId or not payload.date or not payload.timeSlot:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "success": False,
            "message": "trainerId, date, and timeSlot are required."
        }

    trainer_name = payload.trainerName
    trainer_role = payload.trainerRole
    trainer_avatar = payload.trainerAvatar
    price = payload.price

    if not trainer_name:
        trainer = store.get_trainer_by_id(payload.trainerId)
        if trainer:
            trainer_name = trainer.get("name")
            trainer_role = trainer.get("role")
            trainer_avatar = trainer.get("avatar")
            price = trainer.get("sessionPrice")

    booking_data = {
        "userId": payload.userId,
        "trainerId": payload.trainerId,
        "trainerName": trainer_name or "Personal Trainer",
        "trainerRole": trainer_role or "Fitness Coach",
        "trainerAvatar": trainer_avatar or "",
        "date": payload.date,
        "timeSlot": payload.timeSlot,
        "price": price or 1200,
        "focus": payload.focus
    }

    booking = store.create_booking(booking_data)
    response.status_code = status.HTTP_201_CREATED
    return {
        "success": True,
        "message": f"Session booked with {booking['trainerName']} for {payload.date} ({payload.timeSlot})!",
        "booking": booking
    }

@router.delete("/{booking_id}")
def cancel_booking(booking_id: str, response: Response):
    deleted = store.cancel_booking(booking_id)
    if not deleted:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {
            "success": False,
            "message": f"Booking with ID '{booking_id}' not found."
        }

    return {
        "success": True,
        "message": "Session booking cancelled successfully. Slot has been released.",
        "cancelledId": booking_id
    }
