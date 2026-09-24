import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  ShieldCheck,
  Check,
  CreditCard,
  Smartphone,
  Building,
  Lock,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useGym } from '../context/GymContext';

export default function CheckoutModal({ plan, billingCycle, onClose, onPurchaseSuccess }) {
  const { user, isLoggedIn, purchaseMembership, loginUser, loginDemoUser } = useGym();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('athlete@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9821');
  const [processing, setProcessing] = useState(false);

  // Inline sign-in if guest
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState(null);

  if (!plan) return null;

  const isAnnual = billingCycle === 'annual';
  const price = isAnnual ? plan.annualPriceMonthly * 12 : plan.monthlyPrice;
  const gst = Math.round(price * 0.18);
  const total = price + gst;

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

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      setAuthError('Please sign in or use 1-click demo to activate this membership pass.');
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      purchaseMembership(plan.id, plan.name, isAnnual ? 'Annual' : 'Monthly');
      setProcessing(false);
      onClose();
      if (onPurchaseSuccess) onPurchaseSuccess();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#121722] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-[#181F2E] to-[#121722] relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#CCFF00]/15 text-[#CCFF00] font-bold uppercase tracking-wider">
              {plan.badge || 'Official Membership'}
            </span>
            <span className="text-xs text-slate-400">
              • {isAnnual ? 'Billed Annually' : 'Billed Monthly'}
            </span>
          </div>

          <h3 className="text-2xl font-black text-white font-heading mt-2">
            Enroll in {plan.name}
          </h3>
          <p className="text-xs text-slate-300 mt-1">{plan.tagline}</p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleCheckout} className="p-6 space-y-5">
          {/* Investment Summary */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>{plan.name} ({isAnnual ? '12 Months Access' : '1 Month Access'})</span>
              <span className="font-semibold text-white">₹{price.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Standard 18% GST</span>
              <span className="font-semibold text-white">₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-800 pt-2.5 flex justify-between items-baseline">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Total Payable</span>
              <span className="text-xl font-black text-[#CCFF00] font-heading">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Member Confirmation / Guest Sign-In */}
          {!isLoggedIn || !user ? (
            <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Sign-In To Activate Pass
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
                Please authenticate your athlete profile so your 24/7 keycard and membership tier can be assigned.
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
                  Sign In & Link Pass
                </button>
                <Link
                  to="/register?redirect=/membership"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Register New Account →
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold uppercase tracking-wider text-slate-300">Member Details</span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Profile
                </span>
              </div>
              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Member:</span>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact Email:</span>
                  <span className="text-white font-medium">{user.email}</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
              Choose Payment Method (Simulator)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00] font-bold ring-1 ring-[#CCFF00]'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Smartphone className="w-5 h-5 mb-1" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00] font-bold ring-1 ring-[#CCFF00]'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <CreditCard className="w-5 h-5 mb-1" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'bg-[#CCFF00]/15 border-[#CCFF00] text-[#CCFF00] font-bold ring-1 ring-[#CCFF00]'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <Building className="w-5 h-5 mb-1" />
                <span>Net Banking</span>
              </button>
            </div>

            <div className="mt-3">
              {paymentMethod === 'upi' && (
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs space-y-1.5">
                  <label className="text-slate-400 text-[11px]">Simulated VPA / UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-slate-800/90 border border-slate-700 rounded-md px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#CCFF00]"
                  />
                  <p className="text-[10px] text-slate-500">Supports Google Pay, PhonePe, Paytm, BHIM</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs space-y-2">
                  <div>
                    <label className="text-slate-400 text-[11px]">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-md px-3 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-[#CCFF00]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="12/28"
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-md px-3 py-1.5 text-white text-xs"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      defaultValue="789"
                      maxLength={3}
                      className="w-full bg-slate-800/90 border border-slate-700 rounded-md px-3 py-1.5 text-white text-xs"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg text-xs space-y-1.5">
                  <label className="text-slate-400 text-[11px]">Select Bank</label>
                  <select className="w-full bg-slate-800/90 border border-slate-700 rounded-md px-3 py-1.5 text-white text-xs">
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Lock className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>256-Bit SSL Encrypted Sandbox Gateway • Instant Activation</span>
          </div>

          {/* Action Buttons */}
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
              disabled={processing || !isLoggedIn}
              className="flex-2 py-3 px-6 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black text-xs font-bold transition flex items-center justify-center gap-2 shadow-glow-lime disabled:opacity-50"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  <span>Authorizing Payment...</span>
                </span>
              ) : !isLoggedIn ? (
                <span>Sign In Required</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Activate Membership Now</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
