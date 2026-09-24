import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Star, Award, Search, Filter, CheckCircle2, Dumbbell, ShieldCheck, Sparkles } from 'lucide-react';
import { TRAINERS_DATA } from '../data/gymData';
import { useGym } from '../context/GymContext';

export default function SlotBooking({ onOpenBookingModal }) {
  const { user, isLoggedIn, bookings } = useGym();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Strength', 'HIIT & Conditioning', 'Bodybuilding', 'Mobility & Recovery', 'Boxing & Agility'];

  const filteredTrainers = TRAINERS_DATA.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20">
      
      {/* Page Header */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Interactive Coach Schedule</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-heading tracking-tight">
            BOOK 1-ON-1 <span className="text-gradient-lime">TRAINER SLOTS</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Reserve dedicated 60-minute training blocks with master certified coaches. Optimize biomechanics, shatter plateaus, and train with undivided professional guidance.
          </p>

          {/* Quick status bar showing active bookings or guest prompt */}
          {isLoggedIn && user ? (
            <div className="inline-flex items-center gap-3 p-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700/80 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">
                Welcome, <strong className="text-white">{user.name}</strong>! You have{' '}
                <strong className="text-white">{bookings.length} upcoming</strong> session(s).
              </span>
              <Link
                to="/my-bookings"
                className="text-[#CCFF00] font-semibold hover:underline flex items-center gap-1"
              >
                View Dashboard →
              </Link>
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 p-2.5 px-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-slate-300">
                Browsing as Guest. Log in or create an account to reserve your coach slot.
              </span>
              <Link
                to="/login?redirect=/book-slot"
                className="text-[#CCFF00] font-bold hover:underline"
              >
                Sign In Now →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121722] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search trainer, specialty, or goal..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#CCFF00]"
              />
            </div>

            {/* Results count & guarantee */}
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Certified CSCS / NASM
              </span>
              <span>Showing {filteredTrainers.length} Available Coaches</span>
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#CCFF00] text-black shadow-glow-lime font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#121722] border border-slate-800 rounded-2xl p-6 hover:border-[#CCFF00]/40 transition-all flex flex-col sm:flex-row gap-6 shadow-xl group"
            >
              {/* Trainer Photo & Quick Stats */}
              <div className="sm:w-48 shrink-0 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-slate-700/80 group-hover:border-[#CCFF00]/60 transition">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-amber-300 text-[11px] font-bold flex items-center gap-1 border border-amber-500/30">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{trainer.rating}</span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-400">
                  <p><strong className="text-white">{trainer.experience}</strong> Exp</p>
                  <p className="text-[11px] text-slate-500">{trainer.reviewsCount} athlete reviews</p>
                </div>
              </div>

              {/* Trainer Details & Available Slot Previews */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[11px] px-2.5 py-0.5 rounded bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] font-semibold">
                      {trainer.category}
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      60-min sessions
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-heading">{trainer.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{trainer.role}</p>

                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {trainer.bio}
                  </p>

                  {/* Certifications badges */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {trainer.certifications.map((c, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Available Slots Preview */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>Available Time Slots Today/Tomorrow:</span>
                    </span>
                    <span className="text-emerald-400 font-medium">● Open Now</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {trainer.availableSlots.map((slot) => (
                      <span
                        key={slot.id}
                        className="text-[11px] px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                      >
                        {slot.time}
                      </span>
                    ))}
                  </div>

                  {/* Pricing & CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Session Rate</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-white font-heading">₹{trainer.sessionPrice}</span>
                        <span className="text-[11px] text-slate-400">/ session</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenBookingModal(trainer)}
                      className="px-5 py-2.5 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-glow-lime"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Select & Book Slot</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Assurance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-[#121722] border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase font-heading">Instant Slot Reservation</h4>
              <p className="text-xs text-slate-400">Lock your preferred date and time in real-time.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase font-heading">Flexible Rescheduling</h4>
              <p className="text-xs text-slate-400">Reschedule freely up to 2 hours prior to start.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase font-heading">Included With Pro / VIP</h4>
              <p className="text-xs text-slate-400">Members get free monthly personal trainer sessions.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
