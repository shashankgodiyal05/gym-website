from fastapi import APIRouter, Response, status
from app.models.schemas import InquiryCreateRequest
from app.store import store

router = APIRouter(prefix="/facilities", tags=["facilities"])

@router.get("")
@router.get("/")
def get_facilities():
    facilities = store.get_facilities()
    testimonials = store.get_testimonials()
    return {
        "success": True,
        "facilities": facilities,
        "testimonials": testimonials
    }

@router.post("/inquiry")
def submit_inquiry(payload: InquiryCreateRequest, response: Response):
    if not payload.name.strip() or not payload.email.strip():
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "success": False,
            "message": "Name and email are required for inquiries."
        }

    inquiry = store.create_inquiry({
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone or "",
        "message": payload.message or "Interested in trial membership.",
        "subject": payload.subject or "General Inquiry"
    })

    response.status_code = status.HTTP_201_CREATED
    return {
        "success": True,
        "message": f"Thank you, {payload.name}! Your inquiry has been logged. Our membership team will reach out within 2 hours.",
        "inquiry": inquiry
    }
