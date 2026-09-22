import os
import time
from datetime import datetime, timezone
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.routers import auth, trainers, bookings, memberships, facilities

load_dotenv()

START_TIME = time.time()

app = FastAPI(
    title="PulseFit Gym API",
    description="REST API Backend for PulseFit Elite Gym & Athletic Training Web Platform built with Python & FastAPI",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:4173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:4173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Top-level API router mounted at /api
api_router = APIRouter(prefix="/api")

@api_router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "PulseFit Gym API",
        "version": "1.0.0",
        "uptimeSeconds": int(time.time() - START_TIME),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@api_router.get("")
@api_router.get("/")
def api_directory():
    return {
        "service": "PulseFit Gym REST API",
        "version": "1.0.0",
        "status": "online",
        "framework": "FastAPI (Python)",
        "endpoints": {
            "docs": "/docs",
            "health": "GET /api/health",
            "auth": {
                "register": "POST /api/auth/register",
                "login": "POST /api/auth/login",
                "me": "GET /api/auth/me",
                "profile": "PUT /api/auth/profile",
                "reset": "POST /api/auth/reset"
            },
            "trainers": {
                "list": "GET /api/trainers?category=&search=",
                "getById": "GET /api/trainers/:id",
                "slots": "GET /api/trainers/:id/slots"
            },
            "bookings": {
                "list": "GET /api/bookings?userId=",
                "create": "POST /api/bookings",
                "cancel": "DELETE /api/bookings/:id"
            },
            "memberships": {
                "plans": "GET /api/memberships",
                "enroll": "POST /api/memberships/enroll",
                "active": "GET /api/memberships/active"
            },
            "facilities": {
                "list": "GET /api/facilities",
                "inquiry": "POST /api/facilities/inquiry"
            }
        }
    }

# Mount sub-routers
api_router.include_router(auth.router)
api_router.include_router(trainers.router)
api_router.include_router(bookings.router)
api_router.include_router(memberships.router)
api_router.include_router(facilities.router)

# Mount /api router into main application
app.include_router(api_router)

@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("main:app", host=host, port=port, reload=True)
