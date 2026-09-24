import React, { useState } from 'react';
import { Check, X as CloseIcon, ShieldCheck, Sparkles, HelpCircle, ArrowRight, Zap, Crown } from 'lucide-react';
import { MEMBERSHIP_PLANS, FAQS } from '../data/gymData';
import { useGym } from '../context/GymContext';

export default function Membership({ onOpenCheckoutModal }) {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [openFaq, setOpenFaq] = useState(null);
  const { activePlan, isLoggedIn } = useGym();

  const comparisonRows = [
    { feature: 'Gym Floor & Weight Room Access', starter: 'Standard Hours', pro: '24/7 Unlimited', vip: '24/7 VIP Access' },
    { feature: 'Locker & Luxury Rain Showers', starter: 'Shared Lockers', pro: 'Executive Locker', vip: 'Private VIP Locker' },
    { feature: 'InBody™ 3D Biometric Scan', starter: '1 Initial Scan', pro: 'Monthly Scan', vip: 'Bi-Weekly Scan' },
    { feature: 'Unlimited Group Classes (Spin/Yoga/HIIT)', starter: false, pro: true, vip: true },
    { feature: 'Contrast Spa (Sauna & Cold Plunge)', starter: false, pro: true, vip: true },
    { feature: 'Complimentary Personal Training Sessions', starter: '1 Intro Session', pro: '2 Sessions / mo', vip: '4 Sessions / mo' },
    { feature: 'Tailored Diet & Macronutrient Protocol', starter: false, pro: 'Standard Template', vip: 'Custom Biometric Diet' },
    { feature: 'Guest Passes (Workout with friends)', starter: false, pro: '1 Pass / month', vip: 'Unlimited' },
    { feature: 'Pulse Fuel Bar Shake Discounts', starter: false, pro: '15% Off', vip: '1 Free Shake Daily' },
    { feature: 'Priority Trainer Slot Reservation', starter: false, pro: true, vip: true },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Page Header */}
      <section className="relative pt-12 pb-6 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Membership Plans & Privileges</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-heading tracking-tight">
            INVEST IN YOUR <span className="text-gradient-lime">GREATEST ASSET</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Transparent pricing without surprise sign-up charges. Select your commitment level and unlock elite facility privileges instantly.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-[#121722] p-1.5 rounded-2xl border border-slate-800 flex items-center shadow-lg">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-[#CCFF00] text-black shadow-glow-lime'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-[#CCFF00] text-black shadow-glow-lime'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-extrabold uppercase">
                  Save 25%
                </span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isAnnual = billingCycle === 'annual';
            const price = isAnnual ? plan.annualPriceMonthly : plan.monthlyPrice;
            const isCurrentActive = isLoggedIn && activePlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl bg-[#121722] border transition-all flex flex-col justify-between p-8 ${
                  plan.isPopular
                    ? 'border-[#CCFF00] shadow-glow-lime lg:-translate-y-2'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular or Active Ribbon */}
                {isCurrentActive ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-black text-[11px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Your Active Plan
                  </span>
                ) : plan.isPopular ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#CCFF00] text-black text-[11px] font-black uppercase tracking-wider shadow-glow-lime">
                    {plan.badge}
                  </span>
                ) : null}

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-white font-heading">{plan.name}</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {plan.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{plan.tagline}</p>
                  </div>

                  {/* Price Section */}
                  <div className="py-2 border-y border-slate-800/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-white font-heading">
                        ₹{price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {isAnnual
                        ? `Billed annually (₹${(price * 12).toLocaleString('en-IN')}/year)`
                        : 'Billed monthly, cancel anytime'}
                    </p>
                  </div>

                  {/* Features included */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Included Privileges:
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-[#CCFF00] shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Excluded features if any */}
                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-2 opacity-60">
                        {plan.notIncluded.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-500 line-through">
                            <CloseIcon className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="pt-8">
                  <button
                    onClick={() => onOpenCheckoutModal(plan, billingCycle)}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                      isCurrentActive
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                        : plan.isPopular
                        ? 'bg-[#CCFF00] hover:bg-[#B3E600] text-black shadow-glow-lime'
                        : 'bg-white hover:bg-slate-200 text-black'
                    }`}
                  >
                    <span>{isCurrentActive ? 'Renew / Extend Plan' : `Get Started With ${plan.name}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Side-by-Side Detailed Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#121722] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 border-b border-slate-800">
            <h3 className="text-2xl font-bold uppercase text-white font-heading">
              Plan Comparison Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Detailed breakdown of features, recovery options, and personal training allocations.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-300 uppercase tracking-wider font-heading text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Tier Features</th>
                  <th className="py-4 px-6 text-center">Starter Club</th>
                  <th className="py-4 px-6 text-center text-[#CCFF00]">Pro Beast</th>
                  <th className="py-4 px-6 text-center text-amber-400">Elite VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition">
                    <td className="py-4 px-6 font-medium text-slate-200">{row.feature}</td>
                    
                    {/* Starter */}
                    <td className="py-4 px-6 text-center text-slate-400">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-4 h-4 text-[#CCFF00] mx-auto" />
                        ) : (
                          <CloseIcon className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        row.starter
                      )}
                    </td>

                    {/* Pro */}
                    <td className="py-4 px-6 text-center text-slate-300 font-semibold bg-slate-900/30">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <Check className="w-4 h-4 text-[#CCFF00] mx-auto" />
                        ) : (
                          <CloseIcon className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        row.pro
                      )}
                    </td>

                    {/* VIP */}
                    <td className="py-4 px-6 text-center text-amber-300 font-semibold">
                      {typeof row.vip === 'boolean' ? (
                        row.vip ? (
                          <Check className="w-4 h-4 text-[#CCFF00] mx-auto" />
                        ) : (
                          <CloseIcon className="w-4 h-4 text-slate-600 mx-auto" />
                        )
                      ) : (
                        row.vip
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Help & Transparency
          </span>
          <h2 className="text-3xl font-black uppercase text-white font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-[#121722] border border-slate-800 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-[#CCFF00] transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-slate-400 font-bold ml-2">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 border-t border-slate-800/60 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
