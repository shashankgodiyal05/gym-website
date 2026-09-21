import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, MapPin, Phone, Mail, Clock, Instagram, Youtube, Twitter, Send, CheckCircle2 } from 'lucide-react';
import { useGym } from '../context/GymContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showNotification } = useGym();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showNotification('VIP Pass Unlocked!', `A 1-day complimentary guest pass has been emailed to ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-[#07090E] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/70">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black shadow-glow-lime">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-black tracking-wider text-white font-heading">PULSE</span>
                <span className="text-2xl font-black tracking-wider text-[#CCFF00] font-heading">FIT</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Engineered for athletes, lifters, and relentless transformers. Elite biomechanics equipment, Olympic lifting platforms, and science-backed personal training.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#CCFF00] hover:border-[#CCFF00]/40 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#CCFF00] hover:border-[#CCFF00]/40 transition">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#CCFF00] hover:border-[#CCFF00]/40 transition">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-heading text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#CCFF00] transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#CCFF00] transition">About Our Facility</Link></li>
              <li><Link to="/book-slot" className="hover:text-[#CCFF00] transition">Book Trainer Slot</Link></li>
              <li><Link to="/membership" className="hover:text-[#CCFF00] transition">Membership Plans</Link></li>
              <li><Link to="/register" className="hover:text-[#CCFF00] transition">Member Sign-Up</Link></li>
              <li><Link to="/my-bookings" className="hover:text-[#CCFF00] transition">My Bookings Dashboard</Link></li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-heading text-sm tracking-wider uppercase">Hours & Access</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mon – Fri:</p>
                  <p className="text-slate-400">05:00 AM – 11:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Sat – Sun:</p>
                  <p className="text-slate-400">06:00 AM – 10:00 PM</p>
                </div>
              </li>
              <li className="pt-1">
                <span className="inline-block px-2.5 py-1 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded text-[11px] font-bold text-[#CCFF00]">
                  ⚡ 24/7 Keycard for VIP Athletes
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter & Free Day Pass */}
          <div className="space-y-3">
            <h4 className="text-white font-heading text-sm tracking-wider uppercase">Get Free 1-Day Pass</h4>
            <p className="text-xs text-slate-400">
              Experience the gym for free. Enter your email to claim your digital trial pass.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Pass sent to your email! Check inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="athlete@email.com"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-md bg-[#CCFF00] text-black font-semibold text-xs hover:bg-[#B3E600] transition flex items-center gap-1"
                  >
                    <span>Claim</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
            <div className="pt-2 text-xs space-y-1">
              <p className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Plot 42, Velocity Tower, Tech Hub</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+91 (800) 987-PULSE</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PULSEFIT ATHLETIC CLUB. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Ready for Vercel Deployment</span>
            <span className="text-[#CCFF00]">Client Demo Build</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
