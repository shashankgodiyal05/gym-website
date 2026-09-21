import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Calendar, Flame, Zap, Shield, ArrowRight, Star, Trophy, Users, CheckCircle2 } from 'lucide-react';
import { TRAINERS_DATA, MEMBERSHIP_PLANS, FACILITIES, TESTIMONIALS } from '../data/gymData';

export default function Home({ onOpenBookingModal, onOpenCheckoutModal }) {
  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 overflow-hidden">
        {/* Background gradient & ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0D14]/70 via-[#0A0D14]/85 to-[#0A0D14] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85')`
          }}
        />

        {/* Ambient colored lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#CCFF00]/10 blur-[130px] rounded-full pointer-events-none z-10" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-[#FF7A00]/10 blur-[120px] rounded-full pointer-events-none z-10" />

        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-12">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-glow-lime backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#CCFF00]">
              Now Open • New Generation Training Lab
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-heading leading-none">
            BUILD YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-lime-300 to-emerald-400">HIGHEST</span> FORM
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-light">
            Olympic-grade biomechanics, contrast cold therapy, and master trainers. Book personal training slots or enroll in all-access memberships designed for real results.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/book-slot"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#CCFF00] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#B3E600] transition shadow-glow-lime group"
            >
              <Calendar className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
              <span>Book Trainer Slot</span>
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/membership"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900/90 border border-slate-700 text-white font-bold text-sm uppercase tracking-wider hover:bg-slate-800 hover:border-slate-600 transition"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Explore Membership</span>
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-black text-white font-heading">24 / 7</span>
              <p className="text-xs text-slate-400 mt-0.5">Keycard Facility Access</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-black text-[#CCFF00] font-heading">50+</span>
              <p className="text-xs text-slate-400 mt-0.5">Master Trainers & Coaches</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">4.9 ★</span>
              <p className="text-xs text-slate-400 mt-0.5">Average Athlete Rating</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-heading">100%</span>
              <p className="text-xs text-slate-400 mt-0.5">Eleiko & Prime Biomechanics</p>
            </div>
          </div>

        </div>
      </section>

      {/* Highlights / Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            The PulseFit Difference
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading">
            Not Just A Gym. An Athletic Laboratory.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Every square foot is engineered to maximize human output, prevent injury, and accelerate body recomposition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#121722] border border-slate-800 hover:border-[#CCFF00]/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00] mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">Targeted Trainer Slot Booking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Book certified specialists in strength, HIIT, powerlifting, and rehab with our seamless instant calendar scheduler.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121722] border border-slate-800 hover:border-amber-500/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">Contrast Recovery & Cold Plunges</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Flush metabolic waste, decrease inflammation, and trigger dopamine resets with Finnish dry saunas and 4°C ice plunges.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121722] border border-slate-800 hover:border-cyan-400/40 transition group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">Transparent All-Access Memberships</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Clear, upfront plans without hidden registration fees or lock-in penalties. Switch between monthly and annual plans easily.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Trainers & Slot Booking Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
              Certified Master Coaches
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading mt-1">
              Book A Personal Training Slot
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select your master coach, choose an open date, and train with focused intention.
            </p>
          </div>

          <Link
            to="/book-slot"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#CCFF00] hover:underline"
          >
            <span>View All Coaches & Schedules</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TRAINERS_DATA.slice(0, 3).map((trainer) => (
            <div
              key={trainer.id}
              className="bg-[#121722] border border-slate-800 rounded-2xl overflow-hidden hover:border-[#CCFF00]/40 transition group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121722] via-[#121722]/30 to-transparent" />
                <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[#CCFF00] border border-[#CCFF00]/30">
                  {trainer.category}
                </span>
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-amber-300 flex items-center gap-1 border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {trainer.rating}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-white font-heading">{trainer.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{trainer.role}</p>
                  <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                    {trainer.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">Session Rate</span>
                    <p className="text-lg font-black text-white font-heading">₹{trainer.sessionPrice}</p>
                  </div>

                  <button
                    onClick={() => onOpenBookingModal(trainer)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#CCFF00] text-black font-bold text-xs hover:bg-[#B3E600] transition shadow-glow-lime"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Slot</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Showcase */}
      <section className="bg-[#0D111A] py-16 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
              World-Class Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading">
              Zones Built For Peak Performance
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              From Swedish calibrated barbell platforms to bio-frequency recovery chambers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACILITIES.map((fac, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#CCFF00]">
                    {fac.stats}
                  </span>
                  <h3 className="text-base font-bold text-white font-heading leading-snug">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-[#CCFF00] hover:border-[#CCFF00]/50 transition"
            >
              <span>Explore All Facility Details & Specs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Membership Plans Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading">
            Choose Your Membership Tier
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Flexible monthly plans and discounted annual memberships with instant activation and no lock-in fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-6 sm:p-8 rounded-2xl bg-[#121722] border transition-all relative flex flex-col justify-between ${
                plan.isPopular
                  ? 'border-[#CCFF00] shadow-glow-lime'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#CCFF00] text-black text-[11px] font-extrabold uppercase tracking-wider">
                  {plan.badge}
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white font-heading">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 py-2">
                  <span className="text-3xl sm:text-4xl font-black text-white font-heading">
                    ₹{plan.monthlyPrice}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>

                <ul className="space-y-2.5 pt-2 border-t border-slate-800">
                  {plan.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onOpenCheckoutModal(plan, 'monthly')}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                    plan.isPopular
                      ? 'bg-[#CCFF00] hover:bg-[#B3E600] text-black shadow-glow-lime'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  Enroll In {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link
            to="/membership"
            className="text-xs font-bold text-slate-400 hover:text-[#CCFF00] transition underline"
          >
            Compare all 18+ features in side-by-side membership comparison →
          </Link>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Athlete Transformations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading">
            Stories From The Iron Floor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-[#121722] border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#CCFF00]/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <span className="text-[11px] text-[#CCFF00] font-medium">{t.achievement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Footer Call to Action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#181F2E] via-slate-900 to-[#121722] border border-slate-700/80 p-8 sm:p-12 relative overflow-hidden text-center space-y-6">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white font-heading max-w-2xl mx-auto">
            Ready To Claim Your Peak Athletic Physique?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Sign up online today and take your first step toward lifelong strength, endurance, and longevity.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl bg-[#CCFF00] hover:bg-[#B3E600] text-black font-extrabold text-xs uppercase tracking-wider transition shadow-glow-lime"
            >
              Sign Up For Membership
            </Link>
            <Link
              to="/book-slot"
              className="px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Book 1-on-1 Trainer Slot
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
