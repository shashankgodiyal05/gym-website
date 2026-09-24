import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  Dumbbell,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useGym } from '../context/GymContext';

export default function BookingModal({ trainer, onClose, onBookSuccess }) {
  const { user, isLoggedIn, bookSlot, loginUser, loginDemoUser } = useGym();

  // Generate next 7 days
  const getDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        fullDate: d.toISOString().split('T')[0],
        dayName: i === 0 ? 'Today' : i === 1 ? 'Tmrw' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return dates;
  };

  const datesList = getDates();
  const [selectedDate, setSelectedDate] = useState(datesList[1].fullDate); // Default tomorrow
  const [selectedSlot, setSelectedSlot] = useState(trainer?.availableSlots[0] || null);
  const [sessionFocus, setSessionFocus] = useState('General Hypertrophy & Technique');
  const [submitting, setSubmitting] = useState(false);

  // Inline auth state if guest
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState(null);

  if (!trainer) return null;

  const handleInlineLogin = (e) => {
    e.preventDefault();
    setAuthError(null);
    const res = loginUser(authEmail, authPassword);
    if (!res.success) {
      setAuthError(res.message);
    }
  };

  const handleQuickDemoAuth = () => {
    setAuthError(null);
    loginDemoUser();
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!selectedSlot) return;

    if (!isLoggedIn || !user) {
      setAuthError('Please sign in or use 1-click demo to confirm this booking.');
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      bookSlot({
        trainerId: trainer.id,
        trainerName: trainer.name,
        trainerRole: trainer.role,
        trainerAvatar: trainer.avatar,
        date: selectedDate,
        timeSlot: selectedSlot.time,
        price: trainer.sessionPrice,
        focus: sessionFocus
      });
      setSubmitting(false);
      onClose();
      if (onBookSuccess) onBookSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#121722] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="relative p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 to-[#121722]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={trainer.avatar}
              alt={trainer.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-[#CCFF00]/40 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] font-semibold">
                  {trainer.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {trainer.rating}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading mt-1">{trainer.name}</h3>
              <p className="text-xs text-slate-400">{trainer.role}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleConfirm} className="p-6 space-y-6">
          {/* Guest Sign-In Notice if not logged in */}
          {!isLoggedIn ? (
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Athlete Sign-In Required
                </span>
                <button
                  type="button"
                  onClick={handleQuickDemoAuth}
                  className="text-[11px] px-2.5 py-1 rounded-lg bg-[#CCFF00] text-black font-extrabold flex items-center gap-1 hover:bg-[#B3E600]"
                >
                  <Sparkles className="w-3 h-3" /> 1-Click Demo Sign In
                </button>
              </div>
              <p className="text-xs text-slate-300">
                You must be logged in to confirm a personal training slot. Sign in below or register a free account.
              </p>

              {authError && (
                <p className="text-xs text-red-400 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <input
                  type="email"
                  placeholder="Athlete Email"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                />
                <input
                  type="password"
                  placeholder="Passcode"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleInlineLogin}
                  className="text-xs font-bold text-black bg-[#CCFF00] px-4 py-1.5 rounded-lg hover:bg-[#B3E600]"
                >
                  Sign In & Proceed
                </button>
                <Link
                  to="/register?redirect=/book-slot"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Register New Account →
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Booking as:{' '}
                <strong className="text-white">{user.name}</strong> ({user.email})
              </span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          )}

          {/* Step 1: Date Selection */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              <Calendar className="w-4 h-4 text-[#CCFF00]" />
              <span>1. Choose Session Date</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {datesList.map((d) => {
                const isSelected = selectedDate === d.fullDate;
                return (
                  <button
                    key={d.fullDate}
                    type="button"
                    onClick={() => setSelectedDate(d.fullDate)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold shadow-glow-lime'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] uppercase">{d.dayName}</span>
                    <span className="text-base font-black font-heading mt-0.5">{d.dateNum}</span>
                    <span className="text-[9px] opacity-75">{d.month}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Time Slot */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              <Clock className="w-4 h-4 text-[#CCFF00]" />
              <span>2. Available Time Slots</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {trainer.availableSlots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00] font-bold ring-1 ring-[#CCFF00]'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{slot.time}</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {slot.period}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Workout Goal */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              <Dumbbell className="w-4 h-4 text-[#CCFF00]" />
              <span>3. Target Session Goal / Focus</span>
            </label>
            <select
              value={sessionFocus}
              onChange={(e) => setSessionFocus(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
            >
              <option value="Compound Lifting Technique (Squat/Bench/Deadlift)">
                Compound Lifting Technique (Squat/Bench/Deadlift)
              </option>
              <option value="Hypertrophy Volume & Muscle Pump">Hypertrophy Volume & Muscle Pump</option>
              <option value="High Intensity Conditioning & Fat Loss">High Intensity Conditioning & Fat Loss</option>
              <option value="Post-Injury Mobility & Fascial Release">Post-Injury Mobility & Fascial Release</option>
              <option value="Boxing Drills & Footwork">Boxing Drills & Footwork</option>
            </select>
          </div>

          {/* Session Price Summary */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">Total Investment</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white font-heading">₹{trainer.sessionPrice}</span>
                <span className="text-xs text-slate-400">/ 60-min session</span>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Free 24h Reschedule
              </span>
              <p className="text-[10px] text-slate-400 mt-0.5">Complimentary hydration included</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !selectedSlot || !isLoggedIn}
              className="flex-2 py-3 px-6 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black text-xs font-bold transition flex items-center justify-center gap-2 shadow-glow-lime disabled:opacity-50"
            >
              {submitting ? (
                <span>Confirming Slot...</span>
              ) : !isLoggedIn ? (
                <span>Sign In Required To Book</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Slot Booking</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
