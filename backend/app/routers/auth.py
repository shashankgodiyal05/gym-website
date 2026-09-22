from fastapi import APIRouter, Response, status
from app.models.schemas import UserRegisterRequest, UserLoginRequest, UserProfileUpdateRequest
from app.store import store

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
def register_user(payload: UserRegisterRequest, response: Response):
    if not payload.name.strip() or not payload.email.strip():
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "success": False,
            "message": "Name and email are required fields."
        }

    existing = store.find_user_by_email(payload.email)
    if existing:
        store.set_active_user(existing)
        response.status_code = status.HTTP_200_OK
        return {
            "success": True,
            "message": f"Welcome back, {existing.get('name')}!",
            "user": existing
        }

    new_user = store.create_user(payload.model_dump())
    response.status_code = status.HTTP_201_CREATED
    return {
        "success": True,
        "message": f"Account created successfully. Welcome to PulseFit, {new_user.get('name')}!",
        "user": new_user
    }

@router.post("/login")
def login_user(payload: UserLoginRequest, response: Response):
    if not payload.email or not payload.email.strip():
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "success": False,
            "message": "Email address is required."
        }

    user = store.find_user_by_email(payload.email)
    if not user:
        user = store.create_user({
            "name": payload.name or "Fitness Athlete",
            "email": payload.email
        })

    store.set_active_user(user)
    return {
        "success": True,
        "message": f"Welcome back, {user.get('name')}!",
        "user": user
    }

@router.get("/me")
def get_current_user():
    user = store.get_active_user()
    return {
        "success": True,
        "user": user
    }

@router.put("/profile")
def update_current_user(payload: UserProfileUpdateRequest):
    current = store.get_active_user()
    updated = store.update_user(current.get("id"), payload.model_dump(exclude_unset=True))
    return {
        "success": True,
        "message": "Athlete profile updated successfully.",
        "user": updated
    }

@router.post("/reset")
def reset_demo_data():
    result = store.reset_demo()
    return {
        "success": True,
        "message": "Demo profile, bookings, and plan restored.",
        "result": result
    }
