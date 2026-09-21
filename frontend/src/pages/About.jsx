import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Dumbbell, Zap, Award, Sparkles, CheckCircle2, ArrowRight, HeartPulse, Clock, Users } from 'lucide-react';
import { FACILITIES } from '../data/gymData';

export default function About() {
  const stats = [
    { label: 'Floor Space', val: '18,500 SQ FT', desc: 'Spanning 3 state-of-the-art levels' },
    { label: 'Free Weights', val: '85+ TONS', desc: 'Calibrated steel & competition bumper plates' },
    { label: 'Master Coaches', val: '50+ ELITE', desc: 'All hold international CSCS / NASM certs' },
    { label: 'Contrast Spa', val: '4°C & 90°C', desc: 'Cold immersion tubs & Finnish cedar sauna' },
  ];

  const standards = [
    {
      icon: <Award className="w-6 h-6 text-[#CCFF00]" />,
      title: 'Biomechanical Superiority',
      desc: 'We invest exclusively in machinery featuring dynamic cam curves (Prime Fitness, Arsenal Strength, Eleiko) to ensure optimal muscle loading without joint shear.'
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-amber-400" />,
      title: 'Contrast Athletic Recovery',
      desc: 'Performance is only half the equation. Our dedicated thermal suite accelerates parasympathetic recovery, drops cortisol, and restores central nervous system readiness.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: 'Hospital-Grade Cleanliness',
      desc: 'Continuous HEPA 14 air recirculation replacing room volume 8 times every hour, continuous non-toxic antimicrobial sanitization, and pristine showers.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Zero Intimidation Culture',
      desc: 'Whether you are pulling your first 60kg deadlift or prepping for national championships, our community is built on mutual respect and dedicated hard work.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* About Header */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121722]/80 via-[#0A0D14] to-[#0A0D14] -z-10" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Our Mission & Legacy
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-heading tracking-tight">
            BUILT FOR THOSE WHO <span className="text-gradient-lime">REFUSE MEDIOCRITY</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Founded in 2021, PulseFit was conceived to solve the frustration of overcrowded, commercial gyms with subpar equipment and indifferent trainers. We built a high-performance sanctuary.
          </p>
        </div>
      </section>

      {/* Numerical Stats Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#121722] border border-slate-800 hover:border-slate-700 transition"
            >
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{item.label}</span>
              <div className="text-3xl font-black text-white font-heading mt-2 mb-1">{item.val}</div>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Philosophy Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
              The PulseFit Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading leading-tight">
              A Training Space Where Science Meets Iron Grit
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We started PulseFit with a simple belief: fitness is not a casual hobby—it is the cornerstone of mental resilience, longevity, and peak vitality. 
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Instead of cramming the gym floor with row after row of duplicate treadmills, we dedicated spacious zones for functional movement, heavy compound lifting, and specialized recovery suites. Every trainer on our roster has undergone rigorous practical testing in biomechanics, mobility assessments, and progressive overload protocols.
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Custom tailored periodization programs for every member</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>On-site physical therapists & certified athletic nutritionists</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Clean towel, locker, and private executive dressing suites</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/membership"
                className="px-6 py-3 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black text-xs font-bold uppercase tracking-wider transition shadow-glow-lime"
              >
                Join PulseFit Today
              </Link>
              <Link
                to="/book-slot"
                className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Book A Coach
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80"
                alt="Gym Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 p-4 rounded-2xl bg-[#121722]/95 border border-slate-700 shadow-xl max-w-xs backdrop-blur-md hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#CCFF00] flex items-center justify-center text-black font-bold">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">Calibrated Swedish Gear</p>
                  <p className="text-[11px] text-slate-400">Certified for powerlifting & Olympic lifters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Standards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Our Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading">
            The 4 Standards We Live By
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {standards.map((s, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#121722] border border-slate-800 space-y-3 hover:border-slate-700 transition"
            >
              <div className="p-3 w-fit rounded-xl bg-slate-900 border border-slate-800">
                {s.icon}
              </div>
              <h3 className="text-lg font-bold text-white font-heading">{s.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Zones & Spaces Tour */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
              Facility Map
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading mt-1">
              Purpose-Built Training Sectors
            </h2>
          </div>
          <Link
            to="/book-slot"
            className="text-xs font-bold text-[#CCFF00] hover:underline flex items-center gap-1.5"
          >
            <span>Book a trainer for a facility intro session</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FACILITIES.map((zone, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden bg-[#121722] border border-slate-800 group"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={zone.image}
                  alt={zone.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-4 left-4 text-[11px] font-bold px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[#CCFF00] border border-[#CCFF00]/30">
                  {zone.stats}
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-white font-heading">{zone.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{zone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
