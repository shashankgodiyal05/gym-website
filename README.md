# 🏋️ PulseFit™ — Elite Gym & Athletic Training Web Platform

A modern, high-converting fitness club frontend web application engineered with **React 18**, **Vite**, and **Tailwind CSS**. Designed for athletic gym owners, trainers, and members.

![PulseFit Preview](https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80)

---

## ⚡ Key Highlights & Features

1. **Trainer Slot Booking Engine (`/book-slot`)**:
   - Filter coaches by specialty: Strength, HIIT, Bodybuilding, Mobility & Recovery, Boxing.
   - Interactive 7-day date selector & morning/evening slot availability.
   - Target training focus selector with instant confirmation modal and confetti.

2. **Membership Tier Plans (`/membership`)**:
   - Tiered packages: **Starter Club**, **Pro Beast (Most Popular)**, and **Elite VIP Athlete**.
   - Monthly vs. Annual discount billing switcher (Save 25%).
   - Side-by-side 10-point feature comparison table.
   - Simulated interactive payment checkout (UPI, Card, Net Banking) with instant activation.

3. **Athlete Registration & Login (`/register`)**:
   - Seamless onboarding with fitness goal, experience level, and preferred workout hours.
   - **Interactive BMI & Calorie Target Calculator** widget.

4. **About Our Facility & Standards (`/about`)**:
   - Details on Swedish Eleiko calibrated gear, Prime Fitness variable resistance, Finnish sauna & cold plunge contrast therapy.

5. **Member Portal & Live Session Manager (`/my-bookings`)**:
   - Active membership card with live privileges.
   - Upcoming booked trainer sessions with instant cancellation/reschedule simulations.

6. **Client Demo Mode**:
   - LocalStorage synchronization ensures all booked slots, membership upgrades, and profile edits persist across reloads.
   - Quick **"Reset Demo"** button in navigation to restore default showcase data in 1 click.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Dark Athletic Palette `#0A0D14`, `#CCFF00`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Server**: [Uvicorn](https://www.uvicorn.org/) ASGI Server
- **Data Validation**: [Pydantic v2](https://docs.pydantic.dev/)
- **API Documentation**: Interactive OpenAPI / Swagger UI at `http://localhost:5000/docs`
- **Testing**: `pytest` and `httpx` smoke test suite

---

## 🚀 Getting Started

### 1. Backend (Python + FastAPI)
```bash
cd backend
python -m venv .venv
# Windows:
.\.venv\Scripts\activate
# macOS/Linux:
# source .venv/bin/activate

pip install -r requirements.txt
python main.py
```
- API Server runs at: [http://localhost:5000](http://localhost:5000)
- Interactive OpenAPI Docs: [http://localhost:5000/docs](http://localhost:5000/docs)
- Run tests:
  ```bash
  pytest -v
  ```

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel (Unified Frontend & FastAPI Backend)

The project includes a root [`vercel.json`](file:///c:/Users/kiran/OneDrive/Apps/gym_website/vercel.json) that automatically deploys **both the React frontend and the Python FastAPI backend** under a single domain:

1. Push this repository to your GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New..." $\rightarrow$ "Project"**.
3. Select your **`gym-website`** repository.
4. Leave the **Root Directory** as default (`./`).
5. Click **Deploy**.

Vercel will automatically:
- Build the React SPA into static assets.
- Deploy the Python FastAPI serverless function from [`api/index.py`](file:///c:/Users/kiran/OneDrive/Apps/gym_website/api/index.py).
- Route all `/api/*` calls to the FastAPI backend and `/docs` to interactive Swagger.
- Route all page paths to the React application with zero CORS issues!
