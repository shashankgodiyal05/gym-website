import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Dumbbell,
  Calendar,
  Crown,
  User,
  Menu,
  X,
  RotateCcw,
  ArrowRight,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { useGym } from '../context/GymContext';
import { MEMBERSHIP_PLANS } from '../data/gymData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, bookings, activePlan, logoutUser, resetDemoData } = useGym();

  const currentPlan = MEMBERSHIP_PLANS.find((p) => p.id === activePlan) || MEMBERSHIP_PLANS[0];

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Book Trainer Slot', path: '/book-slot' },
    { name: 'Membership Plans', path: '/membership' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    logoutUser();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0D14]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#CCFF00] to-lime-400 flex items-center justify-center text-black shadow-glow-lime group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-heading">
                  PULSE
                </span>
                <span className="text-xl sm:text-2xl font-black tracking-wider text-[#CCFF00] font-heading">
                  FIT
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-medium -mt-1">
                Club & Lab
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'text-[#CCFF00] bg-slate-900/90 shadow-sm border border-slate-700/60'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Bookings Tracker Pill (Visible when logged in or has bookings) */}
            <Link
              to="/my-bookings"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700/70 text-xs font-semibold text-slate-300 hover:border-[#CCFF00]/50 hover:text-white transition-all"
              title="View Booked Sessions & Membership"
            >
              <Calendar className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>Bookings</span>
              <span className="w-5 h-5 rounded-full bg-[#CCFF00] text-black font-bold flex items-center justify-center text-[10px]">
                {bookings.length}
              </span>
            </Link>

            {/* Active Membership Badge */}
            {isLoggedIn && (
              <Link
                to="/membership"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 text-xs font-semibold text-amber-300 hover:border-amber-400 transition-all shadow-sm"
                title="Current Active Membership"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentPlan.name}</span>
              </Link>
            )}

            {/* User Account / Dropdown or Login / Register Buttons */}
            {isLoggedIn && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400 text-black flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <span className="text-xs font-semibold text-slate-200 truncate max-w-[100px]">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#121722] border border-slate-800 shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-slate-800/80">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-semibold">
                        <Crown className="w-3 h-3 text-amber-400" />
                        <span>{currentPlan.name} Plan</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/my-bookings"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-900/80 transition"
                      >
                        <Calendar className="w-4 h-4 text-[#CCFF00]" />
                        <span>Dashboard & Bookings ({bookings.length})</span>
                      </Link>

                      <Link
                        to="/book-slot"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-900/80 transition"
                      >
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span>Book 1-on-1 Coach Slot</span>
                      </Link>

                      <Link
                        to="/membership"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-900/80 transition"
                      >
                        <Crown className="w-4 h-4 text-amber-400" />
                        <span>Membership Pass & Upgrades</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-800/80">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out of Account</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-[#CCFF00] text-black hover:bg-[#B3E600] transition shadow-glow-lime"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Join / Register</span>
                </Link>
              </div>
            )}

            {/* Quick Demo Reset Pill */}
            <button
              onClick={resetDemoData}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition border border-transparent hover:border-slate-800"
              title="Reset Demo Data (Accounts & Slots)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/my-bookings"
              className="relative p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
            >
              <Calendar className="w-4 h-4 text-[#CCFF00]" />
              {bookings.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CCFF00] text-black text-[9px] font-black rounded-full flex items-center justify-center">
                  {bookings.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0A0D14]/98 px-4 pt-3 pb-6 space-y-3">
          {isLoggedIn && user ? (
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#CCFF00] text-black font-bold flex items-center justify-center text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <span className="text-xs text-white font-semibold block">{user.name}</span>
                  <span className="text-[10px] text-amber-300 flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-400" /> {currentPlan.name}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded bg-red-950/40 border border-red-900/50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-slate-900 text-center text-xs font-bold text-white border border-slate-800"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-[#CCFF00] text-center text-xs font-bold text-black shadow-glow-lime"
              >
                Register Account
              </Link>
            </div>
          )}

          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'text-[#CCFF00] bg-slate-900 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-900 text-sm text-slate-200 border border-slate-800"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#CCFF00]" />
                My Bookings & Profile
              </span>
              <span className="w-5 h-5 rounded-full bg-[#CCFF00] text-black font-bold flex items-center justify-center text-xs">
                {bookings.length}
              </span>
            </Link>

            <button
              onClick={() => {
                resetDemoData();
                setMobileMenuOpen(false);
              }}
              className="text-left text-xs text-slate-400 hover:text-white py-2 flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
