import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Activity,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Zap,
  Flame,
  Award
} from 'lucide-react';
import { useGym } from '../context/GymContext';

export default function Register({ defaultMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { registerUser, loginUser, loginDemoUser, user, updateProfile } = useGym();

  // Determine initial mode from query string (?mode=login) or prop
  const searchParams = new URLSearchParams(location.search);
  const modeParam = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(
    defaultMode === 'login' || modeParam === 'login' || location.pathname === '/login'
  );

  useEffect(() => {
    if (defaultMode === 'login' || modeParam === 'login' || location.pathname === '/login') {
      setIsLogin(true);
    } else if (defaultMode === 'register' || modeParam === 'register' || location.pathname === '/register') {
      setIsLogin(false);
    }
  }, [location.pathname, defaultMode, modeParam]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    goal: 'Muscle Hypertrophy & Strength',
    experience: 'Intermediate (1-3 yrs)',
    preferredTime: 'Morning (06:00 AM - 09:00 AM)'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Interactive BMI Calculator widget state
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('74');

  const calculateBmi = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return null;
    const bmi = (w / (h * h)).toFixed(1);
    let category = 'Optimal / Normal';
    let color = 'text-emerald-400';
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-cyan-400';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Athletic Bulk / Mildly High';
      color = 'text-amber-400';
    } else if (bmi >= 30) {
      category = 'High / Recomp Needed';
      color = 'text-red-400';
    }
    const maintenanceCalories = Math.round(w * 24 * 1.35);
    const dailyProtein = Math.round(w * 2.0); // 2g per kg
    return { bmi, category, color, maintenanceCalories, dailyProtein };
  };

  const bmiData = calculateBmi();

  const handleModeSwitch = (loginState) => {
    setIsLogin(loginState);
    setAuthError(null);
  };

  const handleQuickDemo = () => {
    setAuthError(null);
    const res = loginDemoUser();
    if (res.success) {
      const redirect = searchParams.get('redirect') || '/my-bookings';
      navigate(redirect);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);

    if (isLogin) {
      // Login validation
      if (!formData.email.trim() || !formData.password) {
        setAuthError('Please enter both your email address and passcode.');
        setIsSubmitting(false);
        return;
      }

      const res = loginUser(formData.email, formData.password);
      setIsSubmitting(false);

      if (res.success) {
        const redirect = searchParams.get('redirect') || '/my-bookings';
        navigate(redirect);
      } else {
        setAuthError(res.message);
      }
    } else {
      // Registration validation
      if (!formData.name.trim()) {
        setAuthError('Please enter your full name.');
        setIsSubmitting(false);
        return;
      }

      if (!formData.email.trim()) {
        setAuthError('Please enter a valid email address.');
        setIsSubmitting(false);
        return;
      }

      if (!formData.password || formData.password.length < 4) {
        setAuthError('Passcode must be at least 4 characters long.');
        setIsSubmitting(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setAuthError('Passcodes do not match. Please re-enter.');
        setIsSubmitting(false);
        return;
      }

      const res = registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        goal: formData.goal,
        experience: formData.experience,
        preferredTime: formData.preferredTime
      });

      setIsSubmitting(false);

      if (res.success) {
        const redirect = searchParams.get('redirect') || '/my-bookings';
        navigate(redirect);
      } else {
        setAuthError(res.message);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-[#CCFF00]" />
          <span>PulseFit Athlete Portal</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase text-white font-heading">
          {isLogin ? 'Sign In To Your Athlete Account' : 'Join The Elite Training Lab'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          {isLogin
            ? 'Access your private coach schedule, active membership perks, and personalized training dashboard.'
            : 'Register your athlete profile to reserve 1-on-1 trainer slots, contrast recovery suites, and biometric scanning.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Container (7 Cols) */}
        <div className="lg:col-span-7 bg-[#121722] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Toggle Switch */}
          <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => handleModeSwitch(false)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                !isLogin
                  ? 'bg-[#CCFF00] text-black shadow-glow-lime'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. New Member Registration
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch(true)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isLogin
                  ? 'bg-[#CCFF00] text-black shadow-glow-lime'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. Existing Athlete Sign In
            </button>
          </div>

          {/* Quick Demo Test Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-1 rounded-md bg-[#CCFF00]/20 text-[#CCFF00]">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <p className="font-semibold text-white">Instant Demo Testing?</p>
                <p className="text-[11px] text-slate-400">
                  Preset demo account: <span className="text-[#CCFF00] font-mono">karan@ironpulse.fitness</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleQuickDemo}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-bold text-slate-200 hover:text-white transition whitespace-nowrap"
            >
              ⚡ 1-Click Demo Login
            </button>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-xs text-red-200 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{authError}</p>
                {authError.includes('register') && (
                  <button
                    type="button"
                    onClick={() => handleModeSwitch(false)}
                    className="text-[#CCFF00] underline font-bold"
                  >
                    Switch to Registration tab →
                  </button>
                )}
                {authError.includes('already exists') && (
                  <button
                    type="button"
                    onClick={() => handleModeSwitch(true)}
                    className="text-[#CCFF00] underline font-bold"
                  >
                    Switch to Sign In tab →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name (Registration only) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Arjun Kapoor"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. arjun@athlete.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                />
              </div>
            </div>

            {/* Phone (Registration only) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Mobile Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                  />
                </div>
              </div>
            )}

            {/* Passcode Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  {isLogin ? 'Athlete Passcode *' : 'Create Passcode (min 4 chars) *'}
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        email: 'karan@ironpulse.fitness',
                        password: 'athlete123'
                      }));
                    }}
                    className="text-[11px] text-[#CCFF00] hover:underline"
                  >
                    Auto-fill demo credentials
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter passcode"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Passcode (Registration only) */}
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Confirm Passcode *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="Repeat passcode"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Fitness Objectives (Registration Only) */}
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

            {/* Submit CTA */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-glow-lime disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing Athlete Account...</span>
                  </span>
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In To Account' : 'Complete Registration & Enter Lab'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Bottom Switch Note */}
            <div className="text-center pt-2">
              {isLogin ? (
                <p className="text-xs text-slate-400">
                  Don't have an athlete account yet?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch(false)}
                    className="text-[#CCFF00] font-bold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              ) : (
                <p className="text-xs text-slate-400">
                  Already registered with PulseFit?{' '}
                  <button
                    type="button"
                    onClick={() => handleModeSwitch(true)}
                    className="text-[#CCFF00] font-bold hover:underline"
                  >
                    Sign in to your account
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Fitness Readiness Calculator & Lab Perks (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live BMI & Energy Need Calculator */}
          <div className="bg-[#121722] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Fitness Readiness Calculator</h3>
                <p className="text-[11px] text-slate-400">Estimate baseline BMI, Energy & Daily Protein Target</p>
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
                  <span className="text-xs text-slate-400">Body Mass Index (BMI)</span>
                  <span className={`text-base font-black font-heading ${bmiData.color}`}>
                    {bmiData.bmi} ({bmiData.category})
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-xs">
                  <span className="text-slate-400">Estimated Caloric Maintenance</span>
                  <span className="font-bold text-white">~{bmiData.maintenanceCalories} kcal / day</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-xs">
                  <span className="text-slate-400">Optimal Protein Target (2g/kg)</span>
                  <span className="font-bold text-[#CCFF00]">~{bmiData.dailyProtein} g / day</span>
                </div>
              </div>
            )}
          </div>

          {/* Member Privileges Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Included With Every Athlete Registration</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant reservation of 1-on-1 certified master coach slots</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Personal Athlete Dashboard to track upcoming sessions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Access to contrast therapy saunas & cold plunges</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Flexible membership management without locked contracts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
