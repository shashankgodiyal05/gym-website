import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, User, Mail, Phone, Target, Flame, Activity, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useGym } from '../context/GymContext';

export default function Register() {
  const navigate = useNavigate();
  const { registerUser, loginUser, user } = useGym();

  const [isLogin, setIsLogin] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    goal: 'Muscle Hypertrophy & Strength',
    experience: 'Intermediate (1-3 yrs)',
    preferredTime: 'Morning (06:00 AM - 09:00 AM)'
  });

  // Interactive BMI Calculator widget state
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('74');

  const calculateBmi = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return null;
    const bmi = (w / (h * h)).toFixed(1);
    let category = 'Normal';
    let color = 'text-emerald-400';
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-cyan-400';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Slightly High';
      color = 'text-amber-400';
    } else if (bmi >= 30) {
      category = 'High / Bulk Phase';
      color = 'text-red-400';
    }
    const maintenanceCalories = Math.round(w * 24 * 1.35);
    return { bmi, category, color, maintenanceCalories };
  };

  const bmiData = calculateBmi();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      loginUser(formData.email, formData.name);
    } else {
      registerUser(formData);
    }
    navigate('/my-bookings');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
          Athlete Onboarding
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase text-white font-heading">
          {isLogin ? 'Welcome Back, Athlete' : 'Begin Your Fitness Journey'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          {isLogin
            ? 'Access your booked training slots and active membership pass.'
            : 'Join PulseFit and unlock access to master trainers, contrast therapy, and peak nutrition protocols.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (7 Cols) */}
        <div className="lg:col-span-7 bg-[#121722] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Toggle Switch */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                !isLogin ? 'bg-[#CCFF00] text-black shadow-glow-lime' : 'text-slate-400 hover:text-white'
              }`}
            >
              New Member Registration
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                isLogin ? 'bg-[#CCFF00] text-black shadow-glow-lime' : 'text-slate-400 hover:text-white'
              }`}
            >
              Existing Member Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Karan Sharma"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="karan@example.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            {/* Phone */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
              </div>
            )}

            {/* Fitness Goal & Experience (Registration Only) */}
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Primary Fitness Objective
                  </label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                  >
                    <option value="Muscle Hypertrophy & Strength">Muscle Hypertrophy & Maximum Strength</option>
                    <option value="Rapid Fat Loss & Conditioning">Rapid Fat Loss & Conditioning</option>
                    <option value="Athletic Speed & Explosive Power">Athletic Speed & Explosive Power</option>
                    <option value="Joint Mobility, Posture & Recovery">Joint Mobility, Posture & Recovery</option>
                    <option value="Powerlifting & Compound PRs">Powerlifting & Heavy Compound PRs</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Training Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                    >
                      <option value="Beginner (< 1 yr)">Beginner (&lt; 1 yr)</option>
                      <option value="Intermediate (1-3 yrs)">Intermediate (1-3 yrs)</option>
                      <option value="Advanced Lifter (3+ yrs)">Advanced Lifter (3+ yrs)</option>
                      <option value="Competitive Athlete">Competitive Athlete</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Preferred Gym Slot
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                    >
                      <option value="Morning (06:00 AM - 09:00 AM)">Morning (06:00 - 09:00 AM)</option>
                      <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 - 03:00 PM)</option>
                      <option value="Evening Prime (05:30 PM - 09:00 PM)">Evening (05:30 - 09:00 PM)</option>
                      <option value="Late Night (09:00 PM - 12:00 AM)">Late Night (09:00 PM+)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Password input preview */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                required
                defaultValue="athlete123"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
              />
              <p className="text-[10px] text-slate-500 mt-1">Pre-filled with demo credentials for instant testing.</p>
            </div>

            {/* Submit CTA */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-glow-lime"
              >
                <span>{isLogin ? 'Sign In To Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>

        {/* BMI & Fitness Readiness Widget (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live BMI Calculator */}
          <div className="bg-[#121722] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00]">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Fitness Readiness Calculator</h3>
                <p className="text-[11px] text-slate-400">Calculate baseline BMI & Daily Energy Need</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-400">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            {bmiData && (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Estimated Body Mass Index</span>
                  <span className={`text-lg font-black font-heading ${bmiData.color}`}>
                    {bmiData.bmi} ({bmiData.category})
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                  <span className="text-xs text-slate-400">Target Daily Maintenance</span>
                  <span className="text-sm font-bold text-white">
                    ~{bmiData.maintenanceCalories} kcal / day
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                <span>Complimentary InBody™ 3D scan included on first visit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                <span>Instant access to trainer booking engine after sign-up</span>
              </div>
            </div>
          </div>

          {/* Member Privileges Notice */}
          <div className="bg-gradient-to-br from-slate-900 to-[#121722] border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4" />
              <span>Why Register Online?</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Online registered members skip the front desk intake queue, receive instant biometric access, and secure priority time slot reservations with master trainers.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
