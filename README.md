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

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom Dark Athletic Palette `#0A0D14`, `#CCFF00`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations & FX**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Deployment**: [Vercel](https://vercel.com/) with `vercel.json` SPA rewrite rules

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
cd frontend
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com), click **"Add New Project"**, and select this repo.
3. Set **Root Directory** to `frontend`.
4. Click **Deploy**.
