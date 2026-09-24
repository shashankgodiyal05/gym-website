import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Crown,
  Dumbbell,
  User,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Lock,
  Edit3,
  X,
  LogOut,
  Zap,
  Activity
} from 'lucide-react';
import { useGym } from '../context/GymContext';
import { MEMBERSHIP_PLANS } from '../data/gymData';

export default function MyBookings({ onOpenBookingModal, onOpenCheckoutModal }) {
  const navigate = useNavigate();
  const { user, isLoggedIn, bookings, activePlan, cancelBooking, updateProfile, logoutUser, loginDemoUser } = useGym();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    goal: user?.goal || 'Muscle Hypertrophy & Strength',
    experience: user?.experience || 'Intermediate (1-3 yrs)',
    preferredTime: user?.preferredTime || 'Morning (06:00 AM - 09:00 AM)'
  });

  const currentPlan = MEMBERSHIP_PLANS.find((p) => p.id === activePlan) || MEMBERSHIP_PLANS[0];

  const handleOpenEdit = () => {
    setProfileForm({
      name: user?.name || '',
      phone: user?.phone || '',
      goal: user?.goal || 'Muscle Hypertrophy & Strength',
      experience: user?.experience || 'Intermediate (1-3 yrs)',
      preferredTime: user?.preferredTime || 'Morning (06:00 AM - 09:00 AM)'
    });
    setEditProfileOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    setEditProfileOpen(false);
  };

  // If user is not logged in, display the Athlete Portal Login Required Screen
  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
        <div className="w-20 h-20 rounded-3xl bg-[#121722] border border-slate-700/80 mx-auto flex items-center justify-center text-[#CCFF00] shadow-glow-lime">
          <Lock className="w-10 h-10" />
        </div>

        <div className="space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Member Access Restricted
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading">
            Sign In To Access Your Athlete Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Please log in with your athlete credentials or create an account to view your scheduled trainer sessions, membership keycard, and personalized performance records.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/login?redirect=/my-bookings"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#CCFF00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#B3E600] transition shadow-glow-lime"
          >
            <User className="w-4 h-4" />
            <span>Sign In To Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/register?redirect=/my-bookings"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition"
          >
            <span>Create New Account</span>
          </Link>
        </div>

        {/* 1-Click Demo Shortcut */}
        <div className="pt-6">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-[#121722] border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              <span>Testing out the website?</span>
            </div>
            <button
              onClick={() => loginDemoUser()}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[#CCFF00] font-bold border border-slate-600 transition"
            >
              ⚡ 1-Click Instant Demo Login (Karan Sharma)
            </button>
          </div>
        </div>

        {/* Feature Cards Preview */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-[#121722] border border-slate-800 space-y-2">
            <Calendar className="w-6 h-6 text-[#CCFF00]" />
            <h3 className="text-sm font-bold text-white">1-on-1 Coach Scheduling</h3>
            <p className="text-xs text-slate-400">
              Reserve certified coaches, track training sessions, and reschedule anytime.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121722] border border-slate-800 space-y-2">
            <Crown className="w-6 h-6 text-amber-400" />
            <h3 className="text-sm font-bold text-white">All-Access Membership</h3>
            <p className="text-xs text-slate-400">
              Unlock 24/7 keycard access, sauna recovery suites, and InBody body scans.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121722] border border-slate-800 space-y-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Athlete Bio-Tracking</h3>
            <p className="text-xs text-slate-400">
              Personalized macro targets, strength metrics, and body recomposition milestones.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Athlete Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading mt-1">
            My Dashboard & Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal coach schedule, active membership benefits, and profile settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/book-slot"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black font-extrabold text-xs uppercase tracking-wider transition shadow-glow-lime"
          >
            <Calendar className="w-4 h-4" />
            <span>Book New Slot</span>
          </Link>

          <button
            onClick={() => {
              logoutUser();
              navigate('/');
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-800 text-xs font-semibold text-slate-400 hover:text-red-400 transition"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Top Cards: Member Profile & Active Membership Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="p-6 rounded-2xl bg-[#121722] border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lime-400 to-emerald-400 text-black flex items-center justify-center font-black text-lg shadow-glow-lime">
                  {user.name?.charAt(0) || 'A'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{user.name}</h3>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleOpenEdit}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                title="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-slate-200 font-medium">{user.phone || 'Not specified'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Primary Goal:</span>
                <span className="text-slate-200 font-medium text-right max-w-[170px] truncate">
                  {user.goal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Experience:</span>
                <span className="text-slate-200 font-medium">{user.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Member Since:</span>
                <span className="text-slate-200 font-medium">{user.memberSince || '2024'}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Athlete Verified
            </span>
            <button
              onClick={handleOpenEdit}
              className="text-[#CCFF00] hover:underline font-bold text-[11px]"
            >
              Update Preferences →
            </button>
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
              <span className="text-xs text-slate-400">Pass: Active</span>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-2xl font-black text-white font-heading">{currentPlan.name}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{currentPlan.tagline}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#CCFF00] font-heading">
                  ₹{currentPlan.monthlyPrice}
                </span>
                <span className="text-xs text-slate-400">/mo</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>24/7 Facility Keycard Active</span>
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Recovery Lounge Unlocked</span>
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
            <span>My Booked Personal Training Sessions ({bookings.length})</span>
          </h2>
          <span className="text-xs text-slate-400">Free cancellation up to 2 hours before</span>
        </div>

        {bookings.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#121722] border border-slate-800 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 mx-auto flex items-center justify-center text-slate-500">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">No Upcoming Trainer Sessions</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You haven't reserved any trainer slots yet. Select one of our certified master coaches and book your private 60-minute training session.
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
                    <h3 className="text-base font-bold text-white font-heading mt-0.5">
                      {b.trainerName}
                    </h3>
                    <p className="text-xs text-slate-400">{b.trainerRole}</p>
                  </div>
                </div>

                {/* Session Date & Time */}
                <div className="flex flex-wrap items-center gap-3 text-xs">
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
                    <span className="hidden sm:inline">Cancel Session</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {editProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121722] border border-slate-700 rounded-2xl p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setEditProfileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white font-heading">Update Athlete Profile</h3>
              <p className="text-xs text-slate-400">Modify your training targets and contact details.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Fitness Goal</label>
                <select
                  value={profileForm.goal}
                  onChange={(e) => setProfileForm({ ...profileForm, goal: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="Muscle Hypertrophy & Strength">Muscle Hypertrophy & Maximum Strength</option>
                  <option value="Rapid Fat Loss & Conditioning">Rapid Fat Loss & Conditioning</option>
                  <option value="Athletic Speed & Explosive Power">Athletic Speed & Explosive Power</option>
                  <option value="Joint Mobility, Posture & Recovery">Joint Mobility, Posture & Recovery</option>
                  <option value="Powerlifting & Compound PRs">Powerlifting & Compound PRs</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Training Experience</label>
                <select
                  value={profileForm.experience}
                  onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="Beginner (< 1 yr)">Beginner (&lt; 1 yr)</option>
                  <option value="Intermediate (1-3 yrs)">Intermediate (1-3 yrs)</option>
                  <option value="Advanced Lifter (3+ yrs)">Advanced Lifter (3+ yrs)</option>
                  <option value="Competitive Athlete">Competitive Athlete</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditProfileOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#CCFF00] text-black text-xs font-bold shadow-glow-lime hover:bg-[#B3E600]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
