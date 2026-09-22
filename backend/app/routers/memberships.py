from fastapi import APIRouter, Response, status
from app.models.schemas import MembershipEnrollRequest
from app.store import store

router = APIRouter(prefix="/memberships", tags=["memberships"])

@router.get("")
@router.get("/")
def get_plans():
    plans = store.get_membership_plans()
    return {
        "success": True,
        "count": len(plans),
        "plans": plans
    }

@router.post("/enroll")
def enroll_membership(payload: MembershipEnrollRequest, response: Response):
    if not payload.planId:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "success": False,
            "message": "planId is required to enroll in a membership."
        }

    enrollment = store.enroll_membership(
        plan_id=payload.planId,
        billing_cycle=payload.billingCycle,
        payment_method=payload.paymentMethod
    )

    if not enrollment:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {
            "success": False,
            "message": f"Plan with ID '{payload.planId}' does not exist."
        }

    return {
        "success": True,
        "message": f"Successfully enrolled in {enrollment['plan']['name']} ({enrollment['billingCycle']})!",
        "enrollment": enrollment
    }

@router.get("/active")
def get_active_membership():
    user = store.get_active_user()
    plans = store.get_membership_plans()
    tier = user.get("membershipTier", "pro-beast")
    current_plan = next((p for p in plans if p.get("id") == tier), plans[1] if len(plans) > 1 else plans[0])

    return {
        "success": True,
        "activeTier": tier,
        "plan": current_plan,
        "user": {
            "name": user.get("name"),
            "email": user.get("email"),
            "memberSince": user.get("memberSince")
        }
    }
