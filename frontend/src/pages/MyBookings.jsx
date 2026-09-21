import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Crown, Dumbbell, User, Trash2, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useGym } from '../context/GymContext';
import { MEMBERSHIP_PLANS } from '../data/gymData';

export default function MyBookings({ onOpenBookingModal, onOpenCheckoutModal }) {
  const { user, bookings, activePlan, cancelBooking } = useGym();

  const currentPlan = MEMBERSHIP_PLANS.find((p) => p.id === activePlan) || MEMBERSHIP_PLANS[1];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Member Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading mt-1">
            My Dashboard & Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal trainer schedule, view active plan benefits, and track session status.
          </p>
        </div>

        <Link
          to="/book-slot"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black font-extrabold text-xs uppercase tracking-wider transition shadow-glow-lime"
        >
          <Calendar className="w-4 h-4" />
          <span>Book New Slot</span>
        </Link>
      </div>

      {/* Top Cards: Member Profile & Active Membership Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-[#121722] border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-400 text-black flex items-center justify-center font-black text-lg">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{user?.name || 'Athlete Member'}</h3>
              <p className="text-xs text-slate-400">{user?.email || 'member@pulsefit.com'}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Primary Goal:</span>
              <span className="text-slate-200 font-medium text-right">{user?.goal || 'Strength & Conditioning'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Member Since:</span>
              <span className="text-slate-200 font-medium">{user?.memberSince || '2024'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Account Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Active & Verified
              </span>
            </div>
          </div>
        </div>

        {/* Membership Tier Card */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-[#121722] border border-amber-500/40 relative overflow-hidden flex flex-col justify-between space-y-4">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" /> Active Membership
              </span>
              <span className="text-xs text-slate-400">Renews automatically</span>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-2xl font-black text-white font-heading">{currentPlan.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{currentPlan.tagline}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#CCFF00] font-heading">₹{currentPlan.monthlyPrice}</span>
                <span className="text-xs text-slate-400">/mo</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>24/7 Access Unlocked</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Recovery Suite Included</span>
              </span>
            </div>

            <button
              onClick={() => onOpenCheckoutModal(currentPlan, 'annual')}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-amber-500/50 hover:border-amber-400 text-amber-300 text-xs font-bold uppercase tracking-wider transition"
            >
              Upgrade / Change Tier
            </button>
          </div>
        </div>

      </div>

      {/* Booked Trainer Sessions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold uppercase text-white font-heading flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#CCFF00]" />
            <span>Upcoming Personal Training Sessions ({bookings.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Free cancellation up to 2 hours before</span>
        </div>

        {bookings.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#121722] border border-slate-800 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 mx-auto flex items-center justify-center text-slate-500">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">No Upcoming Trainer Slots</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't reserved any trainer slots yet. Select one of our master coaches and book your private 60-minute session.
            </p>
            <Link
              to="/book-slot"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black font-bold text-xs uppercase tracking-wider transition shadow-glow-lime"
            >
              <span>Explore Coaches & Reserve Slot</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#121722] border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Trainer Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={b.trainerAvatar}
                    alt={b.trainerName}
                    className="w-14 h-14 rounded-xl object-cover border border-[#CCFF00]/40 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {b.status}
                      </span>
                      <span className="text-xs text-slate-500">ID: {b.id}</span>
                    </div>
                    <h3 className="text-base font-bold text-white font-heading mt-0.5">{b.trainerName}</h3>
                    <p className="text-xs text-slate-400">{b.trainerRole}</p>
                  </div>
                </div>

                {/* Session Date & Time */}
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div className="p-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-300">
                    <Calendar className="w-4 h-4 text-[#CCFF00]" />
                    <span className="font-semibold text-white">{b.date}</span>
                  </div>

                  <div className="p-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-[#CCFF00]" />
                    <span className="font-semibold text-white">{b.timeSlot}</span>
                  </div>

                  {b.focus && (
                    <div className="p-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-300">
                      <Dumbbell className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-300 truncate max-w-[180px]">{b.focus}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => cancelBooking(b.id)}
                    className="p-2.5 rounded-xl bg-red-950/40 border border-red-800/40 text-red-400 hover:bg-red-900/60 transition text-xs font-semibold flex items-center gap-1.5"
                    title="Cancel Booking"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
