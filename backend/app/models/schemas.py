from typing import Optional, List, Any, Dict
from pydantic import BaseModel, Field

# Auth schemas
class UserRegisterRequest(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    goal: Optional[str] = "Muscle Hypertrophy & Strength"
    experience: Optional[str] = "Intermediate (1-3 yrs)"
    preferredTime: Optional[str] = "Morning (06:00 AM - 09:00 AM)"
    password: Optional[str] = "athlete123"

class UserLoginRequest(BaseModel):
    email: str
    password: Optional[str] = "athlete123"
    name: Optional[str] = "Fitness Athlete"

class UserProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    goal: Optional[str] = None
    experience: Optional[str] = None
    preferredTime: Optional[str] = None
    membershipTier: Optional[str] = None

# Booking schemas
class BookingCreateRequest(BaseModel):
    trainerId: str
    date: str
    timeSlot: str
    trainerName: Optional[str] = None
    trainerRole: Optional[str] = None
    trainerAvatar: Optional[str] = None
    price: Optional[int] = None
    focus: Optional[str] = "General Hypertrophy & Technique"
    userId: Optional[str] = None

# Membership schemas
class MembershipEnrollRequest(BaseModel):
    planId: str
    billingCycle: Optional[str] = "Monthly"
    paymentMethod: Optional[str] = "upi"
    paymentDetails: Optional[Dict[str, Any]] = None

# Facilities schemas
class InquiryCreateRequest(BaseModel):
    name: str
    email: str
    phone: Optional[str] = ""
    message: Optional[str] = "Interested in trial membership."
    subject: Optional[str] = "General Inquiry"
