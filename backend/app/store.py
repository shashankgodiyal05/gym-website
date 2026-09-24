import json
import os
import time
from datetime import datetime, timezone, timedelta
from typing import Optional, Dict, Any, List
from app.data.seed import (
    INITIAL_USER,
    get_initial_bookings,
    TRAINERS_DATA,
    MEMBERSHIP_PLANS,
    FACILITIES,
    TESTIMONIALS
)

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BUNDLED_STORE = os.path.abspath(os.path.join(CURRENT_DIR, "../data/store.json"))

if os.environ.get("VERCEL"):
    DATA_DIR = "/tmp/data"
    STORE_FILE = os.path.join(DATA_DIR, "store.json")
else:
    DATA_DIR = os.path.abspath(os.path.join(CURRENT_DIR, "../data"))
    STORE_FILE = os.path.join(DATA_DIR, "store.json")

class DataStore:
    def __init__(self):
        self.users: List[Dict[str, Any]] = [dict(INITIAL_USER)]
        self.bookings: List[Dict[str, Any]] = get_initial_bookings()
        self.trainers: List[Dict[str, Any]] = [dict(t) for t in TRAINERS_DATA]
        self.membership_plans: List[Dict[str, Any]] = [dict(p) for p in MEMBERSHIP_PLANS]
        self.facilities: List[Dict[str, Any]] = [dict(f) for f in FACILITIES]
        self.testimonials: List[Dict[str, Any]] = [dict(t) for t in TESTIMONIALS]
        self.inquiries: List[Dict[str, Any]] = []
        self.active_user_session: Dict[str, Any] = dict(INITIAL_USER)

        self._init_store()

    def _init_store(self):
        try:
            if not os.path.exists(DATA_DIR):
                os.makedirs(DATA_DIR, exist_ok=True)

            source_file = STORE_FILE if os.path.exists(STORE_FILE) else (BUNDLED_STORE if os.path.exists(BUNDLED_STORE) else None)
            if source_file and os.path.exists(source_file):
                with open(source_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if "users" in data and isinstance(data["users"], list):
                        self.users = data["users"]
                    if "bookings" in data and isinstance(data["bookings"], list):
                        self.bookings = data["bookings"]
                    if "inquiries" in data and isinstance(data["inquiries"], list):
                        self.inquiries = data["inquiries"]
                    if "activeUserSession" in data and isinstance(data["activeUserSession"], dict):
                        self.active_user_session = data["activeUserSession"]
            else:
                self.save_to_file()
        except Exception as err:
            print(f"[DataStore] Operating in memory mode: {err}")

    def save_to_file(self):
        try:
            if not os.path.exists(DATA_DIR):
                os.makedirs(DATA_DIR, exist_ok=True)
            with open(STORE_FILE, "w", encoding="utf-8") as f:
                json.dump(
                    {
                        "users": self.users,
                        "bookings": self.bookings,
                        "inquiries": self.inquiries,
                        "activeUserSession": self.active_user_session
                    },
                    f,
                    indent=2
                )
        except Exception:
            # Ignore write errors in serverless/read-only mode
            pass

    # User Auth Methods
    def find_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        target = email.lower().strip()
        for u in self.users:
            if u.get("email", "").lower().strip() == target:
                return u
        return None

    def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        timestamp_suffix = str(int(time.time() * 1000))[-5:]
        member_since = datetime.now().strftime("%b %Y")
        new_user = {
            "id": f"usr-{timestamp_suffix}",
            "name": user_data.get("name"),
            "email": user_data.get("email"),
            "phone": user_data.get("phone") or "",
            "goal": user_data.get("goal") or "Muscle Hypertrophy & Strength",
            "experience": user_data.get("experience") or "Intermediate (1-3 yrs)",
            "preferredTime": user_data.get("preferredTime") or "Morning (06:00 AM - 09:00 AM)",
            "membershipTier": user_data.get("membershipTier") or "pro-beast",
            "memberSince": member_since,
            "password": user_data.get("password") or "athlete123"
        }
        self.users.append(new_user)
        self.active_user_session = new_user
        self.save_to_file()
        return new_user

    def update_user(self, user_id: str, updates: Dict[str, Any]) -> Dict[str, Any]:
        target_email = updates.get("email")
        for i, u in enumerate(self.users):
            if u.get("id") == user_id or (target_email and u.get("email", "").lower() == target_email.lower()):
                self.users[i].update({k: v for k, v in updates.items() if v is not None})
                self.active_user_session = self.users[i]
                self.save_to_file()
                return self.users[i]

        self.active_user_session.update({k: v for k, v in updates.items() if v is not None})
        self.save_to_file()
        return self.active_user_session

    def get_active_user(self) -> Dict[str, Any]:
        return self.active_user_session

    def set_active_user(self, user: Dict[str, Any]):
        self.active_user_session = user
        self.save_to_file()

    # Trainers Methods
    def get_trainers(self, category: Optional[str] = None, search: Optional[str] = None) -> List[Dict[str, Any]]:
        result = self.trainers
        if category and category.lower() != "all":
            result = [t for t in result if t.get("category", "").lower() == category.lower()]
        if search and search.strip():
            q = search.lower().strip()
            result = [
                t for t in result
                if q in t.get("name", "").lower()
                or q in t.get("role", "").lower()
                or q in t.get("bio", "").lower()
            ]
        return result

    def get_trainer_by_id(self, trainer_id: str) -> Optional[Dict[str, Any]]:
        for t in self.trainers:
            if t.get("id") == trainer_id:
                return t
        return None

    # Bookings Methods
    def get_bookings(self, user_id: Optional[str] = None) -> List[Dict[str, Any]]:
        if user_id:
            return [b for b in self.bookings if b.get("userId") == user_id]
        return self.bookings

    def create_booking(self, booking_data: Dict[str, Any]) -> Dict[str, Any]:
        timestamp_suffix = str(int(time.time() * 1000))[-4:]
        new_booking = {
            "id": f"bk-{timestamp_suffix}",
            "userId": booking_data.get("userId") or self.active_user_session.get("id") or "usr-101",
            "trainerId": booking_data.get("trainerId"),
            "trainerName": booking_data.get("trainerName"),
            "trainerRole": booking_data.get("trainerRole"),
            "trainerAvatar": booking_data.get("trainerAvatar"),
            "date": booking_data.get("date"),
            "timeSlot": booking_data.get("timeSlot"),
            "price": booking_data.get("price"),
            "focus": booking_data.get("focus") or "General Hypertrophy & Technique",
            "status": "Confirmed",
            "bookedAt": datetime.now(timezone.utc).isoformat()
        }
        self.bookings.insert(0, new_booking)
        self.save_to_file()
        return new_booking

    def cancel_booking(self, booking_id: str) -> bool:
        initial_len = len(self.bookings)
        self.bookings = [b for b in self.bookings if b.get("id") != booking_id]
        if len(self.bookings) != initial_len:
            self.save_to_file()
            return True
        return False

    # Memberships Methods
    def get_membership_plans(self) -> List[Dict[str, Any]]:
        return self.membership_plans

    def enroll_membership(self, plan_id: str, billing_cycle: Optional[str] = "Monthly", payment_method: Optional[str] = "upi") -> Optional[Dict[str, Any]]:
        plan = None
        for p in self.membership_plans:
            if p.get("id") == plan_id:
                plan = p
                break
        if not plan:
            return None

        # Update active user tier
        self.active_user_session["membershipTier"] = plan["id"]
        for u in self.users:
            if u.get("id") == self.active_user_session.get("id"):
                u["membershipTier"] = plan["id"]
                break
        self.save_to_file()

        days = 365 if str(billing_cycle).lower() == "annual" else 30
        now = datetime.now(timezone.utc)
        expires = now + timedelta(days=days)
        txn_id = f"TXN-{str(int(time.time() * 1000))[-6:]}"

        return {
            "success": True,
            "transactionId": txn_id,
            "plan": plan,
            "billingCycle": billing_cycle or "Monthly",
            "paymentMethod": payment_method or "upi",
            "enrolledAt": now.isoformat(),
            "expiresAt": expires.isoformat()
        }

    # Facilities & Inquiries
    def get_facilities(self) -> List[Dict[str, Any]]:
        return self.facilities

    def get_testimonials(self) -> List[Dict[str, Any]]:
        return self.testimonials

    def create_inquiry(self, inquiry_data: Dict[str, Any]) -> Dict[str, Any]:
        inquiry_id = f"inq-{int(time.time() * 1000)}"
        inquiry = {
            "id": inquiry_id,
            **inquiry_data,
            "createdAt": datetime.now(timezone.utc).isoformat()
        }
        self.inquiries.append(inquiry)
        self.save_to_file()
        return inquiry

    def reset_demo(self) -> Dict[str, Any]:
        self.users = [dict(INITIAL_USER)]
        self.bookings = get_initial_bookings()
        self.active_user_session = dict(INITIAL_USER)
        self.save_to_file()
        return {"success": True, "message": "Store reset to default state."}

store = DataStore()
