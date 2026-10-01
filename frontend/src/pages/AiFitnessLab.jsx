import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  Dumbbell,
  Apple,
  Target,
  Flame,
  CheckCircle2,
  Copy,
  Check,
  Save,
  RotateCcw,
  Clock,
  ShieldCheck,
  Star,
  Calendar,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import { generateAiWorkout, calculateAiMacros, matchAiTrainer } from '../data/aiKnowledge';
import { useGym } from '../context/GymContext';

export default function AiFitnessLab({ onOpenBookingModal, onOpenCheckoutModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'workout';
  const [activeTab, setActiveTab] = useState(initialTab); // 'workout' | 'nutrition' | 'matcher'
  const { user, isLoggedIn, saveAiWorkoutPlan, saveAiMacroPlan, showNotification } = useGym();

  // Tab 1: Workout Generator State
  const [workoutForm, setWorkoutForm] = useState({
    goal: 'Hypertrophy & Muscle Building',
    level: 'Intermediate (1-3 yrs)',
    days: '4',
    equipment: 'Full Commercial Gym (Eleiko & Prime)',
    focus: 'Full Body Balanced',
    duration: '60'
  });
  const [generatedWorkout, setGeneratedWorkout] = useState(() =>
    generateAiWorkout({
      goal: 'Hypertrophy & Muscle Building',
      level: 'Intermediate (1-3 yrs)',
      days: '4',
      equipment: 'Full Commercial Gym (Eleiko & Prime)',
      focus: 'Full Body Balanced',
      duration: '60'
    })
  );
  const [isGeneratingWorkout, setIsGeneratingWorkout] = useState(false);
  const [copiedWorkout, setCopiedWorkout] = useState(false);

  // Tab 2: Nutrition & Macro State
  const [macroForm, setMacroForm] = useState({
    age: '26',
    gender: 'male',
    weightKg: '75',
    heightCm: '175',
    activity: 'moderate',
    goal: 'bulk_lean',
    diet: 'non_veg'
  });
  const [generatedMacros, setGeneratedMacros] = useState(() =>
    calculateAiMacros({
      age: 26,
      gender: 'male',
      weightKg: 75,
      heightCm: 175,
      activity: 'moderate',
      goal: 'bulk_lean',
      diet: 'non_veg'
    })
  );
  const [isCalculatingMacros, setIsCalculatingMacros] = useState(false);
  const [copiedMacros, setCopiedMacros] = useState(false);

  // Tab 3: Coach Matcher State
  const [matcherForm, setMatcherForm] = useState({
    primaryGoal: 'strength',
    preferredTime: 'Morning',
    experience: 'intermediate'
  });
  const [matchedCoaches, setMatchedCoaches] = useState(() =>
    matchAiTrainer({
      primaryGoal: 'strength',
      preferredTime: 'Morning',
      experience: 'intermediate'
    })
  );
  const [isMatchingCoaches, setIsMatchingCoaches] = useState(false);

  // Sync tab with URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['workout', 'nutrition', 'matcher'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Workout Handlers
  const handleGenerateWorkout = (e) => {
    e.preventDefault();
    setIsGeneratingWorkout(true);
    setTimeout(() => {
      const plan = generateAiWorkout(workoutForm);
      setGeneratedWorkout(plan);
      setIsGeneratingWorkout(false);
      showNotification('AI Routine Generated', 'Your customized athletic training protocol is ready!');
    }, 500);
  };

  const handleSaveWorkout = () => {
    if (!generatedWorkout) return;
    saveAiWorkoutPlan(generatedWorkout);
  };

  const handleCopyWorkout = () => {
    if (!generatedWorkout) return;
    let text = `PULSEFIT AI WORKOUT ROUTINE\nGoal: ${generatedWorkout.meta.goal} | Split: ${generatedWorkout.meta.days}\n\n`;
    generatedWorkout.schedule.forEach((day) => {
      text += `--- ${day.dayTitle} ---\nWarmup: ${day.warmup}\nExercises:\n`;
      day.exercises.forEach((ex, idx) => {
        text += `${idx + 1}. ${ex.name} - ${ex.sets} sets x ${ex.reps} (Rest: ${ex.rest}, RPE: ${ex.rpe})\n   Cue: ${ex.cues}\n`;
      });
      text += `Cooldown: ${day.cooldown}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedWorkout(true);
    setTimeout(() => setCopiedWorkout(false), 2000);
    showNotification('Copied to Clipboard', 'Full workout routine formatted and copied.');
  };

  // Macro Handlers
  const handleCalculateMacros = (e) => {
    e.preventDefault();
    setIsCalculatingMacros(true);
    setTimeout(() => {
      const result = calculateAiMacros(macroForm);
      setGeneratedMacros(result);
      setIsCalculatingMacros(false);
      showNotification('Macros Calculated', 'Biometric nutritional targets updated successfully!');
    }, 450);
  };

  const handleSaveMacros = () => {
    if (!generatedMacros) return;
    saveAiMacroPlan({
      ...generatedMacros,
      inputs: macroForm,
      savedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
  };

  const handleCopyMacros = () => {
    if (!generatedMacros) return;
    let text = `PULSEFIT AI BIOMETRIC NUTRITION PROTOCOL\nTarget Calories: ${generatedMacros.targetCalories} kcal/day (${generatedMacros.targetDesc})\n`;
    text += `Protein: ${generatedMacros.proteinGrams}g (${generatedMacros.macroPercentages.protein}%)\n`;
    text += `Carbs: ${generatedMacros.carbGrams}g (${generatedMacros.macroPercentages.carbs}%)\n`;
    text += `Fat: ${generatedMacros.fatGrams}g (${generatedMacros.macroPercentages.fat}%)\n`;
    text += `Water: ${generatedMacros.waterLiters} Liters/day\n\nDaily Meal Strategy:\n`;
    generatedMacros.mealPlan.forEach((m) => {
      text += `• ${m.meal}: ${m.text}\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedMacros(true);
    setTimeout(() => setCopiedMacros(false), 2000);
    showNotification('Nutrition Copied', 'Macro protocol copied to clipboard.');
  };

  // Coach Matcher Handlers
  const handleMatchCoaches = (e) => {
    e.preventDefault();
    setIsMatchingCoaches(true);
    setTimeout(() => {
      const matches = matchAiTrainer(matcherForm);
      setMatchedCoaches(matches);
      setIsMatchingCoaches(false);
      showNotification('Coach Match Updated', 'Compatibility ranking generated!');
    }, 400);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Header Section */}
      <section className="relative pt-12 pb-6 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold uppercase tracking-wider shadow-glow-lime backdrop-blur-md">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>PulseFit AI Fitness Laboratory</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-heading tracking-tight">
            ENGINEER YOUR PHYSIQUE <span className="text-gradient-lime">WITH AI</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Algorithmic exercise prescription, precision biometric macronutrient targets, and intelligent coach compatibility analysis engineered for peak athletic transformation.
          </p>

          {/* Interactive Tool Navigation Tabs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleTabChange('workout')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'workout'
                  ? 'bg-[#CCFF00] text-black shadow-glow-lime scale-105'
                  : 'bg-[#121722] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Dumbbell className="w-4 h-4" />
              <span>Workout Architect</span>
            </button>

            <button
              onClick={() => handleTabChange('nutrition')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'nutrition'
                  ? 'bg-[#CCFF00] text-black shadow-glow-lime scale-105'
                  : 'bg-[#121722] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>Biometric Macro Coach</span>
            </button>

            <button
              onClick={() => handleTabChange('matcher')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'matcher'
                  ? 'bg-[#CCFF00] text-black shadow-glow-lime scale-105'
                  : 'bg-[#121722] border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>Smart Coach Matcher</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TAB 1: WORKOUT ARCHITECT                                                  */}
      {/* ========================================================================= */}
      {activeTab === 'workout' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn">
          {/* Form & Config Panel */}
          <div className="bg-[#121722] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  Configure Your Custom Training Protocol
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust parameters below and let our algorithm generate your personalized split.
                </p>
              </div>

              <button
                onClick={handleGenerateWorkout}
                disabled={isGeneratingWorkout}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#CCFF00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#B3E600] transition shadow-glow-lime shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGeneratingWorkout ? 'Generating Protocol...' : 'Generate AI Workout'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
              {/* Goal */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Primary Goal
                </label>
                <select
                  value={workoutForm.goal}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, goal: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option>Hypertrophy & Muscle Building</option>
                  <option>Maximum Strength & Powerlifting</option>
                  <option>Fat Loss & Metabolic Conditioning</option>
                  <option>Athletic Speed, Agility & Power</option>
                  <option>Joint Mobility, Longevity & Core</option>
                </select>
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Lifting Experience
                </label>
                <select
                  value={workoutForm.level}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, level: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option>Beginner (0 - 1 Year)</option>
                  <option>Intermediate (1 - 3 Years)</option>
                  <option>Advanced / Competitive Lifter (3+ Years)</option>
                </select>
              </div>

              {/* Days Per Week */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Weekly Frequency
                </label>
                <select
                  value={workoutForm.days}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, days: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="3">3 Days (Full Body Split)</option>
                  <option value="4">4 Days (Upper / Lower Split)</option>
                  <option value="5">5 Days (Push / Pull / Legs Split)</option>
                  <option value="6">6 Days (High-Volume Athlete Split)</option>
                </select>
              </div>

              {/* Equipment */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Equipment Available
                </label>
                <select
                  value={workoutForm.equipment}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, equipment: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option>Full Commercial Gym (Eleiko & Prime)</option>
                  <option>Dumbbells & Flat/Incline Bench Only</option>
                  <option>Barbell & Power Rack Core Basics</option>
                  <option>Bodyweight & Calisthenics Minimalist</option>
                </select>
              </div>

              {/* Target Focus */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Target Muscle Bias
                </label>
                <select
                  value={workoutForm.focus}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, focus: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option>Full Body Balanced</option>
                  <option>Chest, Delts & Triceps Focus</option>
                  <option>Back Width, Thickness & Biceps</option>
                  <option>Quad & Hamstring Hypertrophy</option>
                  <option>Core, Glute & Rotational Power</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Time Per Workout
                </label>
                <select
                  value={workoutForm.duration}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, duration: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="45">45 Minutes (High Density)</option>
                  <option value="60">60 Minutes (Standard Optimal)</option>
                  <option value="75">75 Minutes (High Volume Strength)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Generated Plan Output */}
          {generatedWorkout && (
            <div className="space-y-6">
              {/* Output Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#121722] to-slate-900 border border-slate-800 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#CCFF00]">
                      Active AI Protocol • Generated {generatedWorkout.createdAt}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-heading mt-1">
                    {generatedWorkout.meta.days} • {generatedWorkout.meta.goal}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {generatedWorkout.weeklyVolume} • {generatedWorkout.restRecommendation}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyWorkout}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition border border-slate-700"
                    title="Copy full routine"
                  >
                    {copiedWorkout ? <Check className="w-3.5 h-3.5 text-[#CCFF00]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWorkout ? 'Copied!' : 'Copy Routine'}</span>
                  </button>

                  <button
                    onClick={handleSaveWorkout}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#CCFF00] text-black text-xs font-bold hover:bg-[#B3E600] transition shadow-glow-lime"
                    title="Save to athlete dashboard"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save to Dashboard</span>
                  </button>
                </div>
              </div>

              {/* Day Schedules Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {generatedWorkout.schedule.map((day) => (
                  <div
                    key={day.dayIndex}
                    className="p-6 rounded-3xl bg-[#121722] border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      {/* Day Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <h4 className="text-lg font-black text-white font-heading">{day.dayTitle}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/20">
                          Day {day.dayIndex} of {generatedWorkout.schedule.length}
                        </span>
                      </div>

                      {/* Warm-up Callout */}
                      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-white">Dynamic Warmup: </strong>
                          {day.warmup}
                        </div>
                      </div>

                      {/* Exercises List */}
                      <div className="space-y-3">
                        {day.exercises.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-slate-800 text-[#CCFF00] text-[10px] font-black flex items-center justify-center shrink-0">
                                  {exIdx + 1}
                                </span>
                                {ex.name}
                              </span>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                                  {ex.sets} Sets × {ex.reps}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300">
                                  RPE {ex.rpe}
                                </span>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-400 pl-6 leading-relaxed">
                              <strong className="text-slate-300">Biomechanical Cue: </strong>
                              {ex.cues} (Rest: {ex.rest})
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cooldown */}
                    <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{day.cooldown}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: NUTRITION & MACRO COACH                                            */}
      {/* ========================================================================= */}
      {activeTab === 'nutrition' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn">
          {/* Biometrics Config Panel */}
          <div className="bg-[#121722] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  Biometric Precision Macro & Calorie Calculator
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Powered by the Mifflin-St Jeor metabolic expenditure algorithm tailored to athletic body recomposition.
                </p>
              </div>

              <button
                onClick={handleCalculateMacros}
                disabled={isCalculatingMacros}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#CCFF00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#B3E600] transition shadow-glow-lime shrink-0"
              >
                <Apple className="w-4 h-4" />
                <span>{isCalculatingMacros ? 'Computing...' : 'Calculate My Macros'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
              {/* Age */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Age (Years)
                </label>
                <input
                  type="number"
                  value={macroForm.age}
                  onChange={(e) => setMacroForm({ ...macroForm, age: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                  placeholder="26"
                  min="16"
                  max="80"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Biological Sex
                </label>
                <select
                  value={macroForm.gender}
                  onChange={(e) => setMacroForm({ ...macroForm, gender: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="male">Male (BMR +5)</option>
                  <option value="female">Female (BMR -161)</option>
                </select>
              </div>

              {/* Weight */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Bodyweight (kg)
                </label>
                <input
                  type="number"
                  value={macroForm.weightKg}
                  onChange={(e) => setMacroForm({ ...macroForm, weightKg: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                  placeholder="75"
                  min="40"
                  max="180"
                />
              </div>

              {/* Height */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={macroForm.heightCm}
                  onChange={(e) => setMacroForm({ ...macroForm, heightCm: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                  placeholder="175"
                  min="130"
                  max="220"
                />
              </div>

              {/* Activity Level */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Activity Level
                </label>
                <select
                  value={macroForm.activity}
                  onChange={(e) => setMacroForm({ ...macroForm, activity: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="sedentary">Sedentary (Desk Job, little exercise)</option>
                  <option value="light">Lightly Active (1-2 days/week)</option>
                  <option value="moderate">Moderately Active (3-5 days/week)</option>
                  <option value="heavy">Heavy Training (6-7 days/week)</option>
                  <option value="athlete">Elite Athlete / Physical Job</option>
                </select>
              </div>

              {/* Athletic Goal */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Nutritional Goal
                </label>
                <select
                  value={macroForm.goal}
                  onChange={(e) => setMacroForm({ ...macroForm, goal: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="cut_aggressive">Aggressive Fat Loss (-550 kcal)</option>
                  <option value="cut_lean">Slow Clean Cut (-300 kcal)</option>
                  <option value="maintain">Body Recomposition / Maintenance</option>
                  <option value="bulk_lean">Lean Muscle Hypertrophy (+300 kcal)</option>
                  <option value="bulk_power">Maximum Strength Surplus (+550 kcal)</option>
                </select>
              </div>

              {/* Diet Preference */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Dietary Protocol
                </label>
                <select
                  value={macroForm.diet}
                  onChange={(e) => setMacroForm({ ...macroForm, diet: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="non_veg">Non-Vegetarian (Chicken, Fish, Eggs, Whey)</option>
                  <option value="veg">Vegetarian (Paneer, Tofu, Soya, Legumes, Greek Yogurt, Whey)</option>
                  <option value="vegan">100% Plant-Based Vegan (Seitan, Tempeh, Lentils, Plant Protein)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Macro Calculation Results */}
          {generatedMacros && (
            <div className="space-y-6">
              {/* Daily Target Pill Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#121722] to-slate-900 border border-slate-800 gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#CCFF00]">
                    Biometric Nutrition Target
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl font-black text-white font-heading">
                      {generatedMacros.targetCalories.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">kcal / day</span>
                  </div>
                  <p className="text-xs text-[#CCFF00] font-medium mt-0.5">
                    {generatedMacros.targetDesc} • BMR: {generatedMacros.bmr} kcal | TDEE: {generatedMacros.tdee} kcal
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyMacros}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition border border-slate-700"
                  >
                    {copiedMacros ? <Check className="w-3.5 h-3.5 text-[#CCFF00]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMacros ? 'Copied!' : 'Copy Plan'}</span>
                  </button>

                  <button
                    onClick={handleSaveMacros}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#CCFF00] text-black text-xs font-bold hover:bg-[#B3E600] transition shadow-glow-lime"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save to Dashboard</span>
                  </button>
                </div>
              </div>

              {/* Macro Cards Breakdown */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Protein */}
                <div className="p-5 rounded-2xl bg-[#121722] border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    Protein (Muscle Synthesis)
                  </span>
                  <div className="text-3xl font-black text-white font-heading">
                    {generatedMacros.proteinGrams}g
                  </div>
                  <p className="text-xs text-slate-400">
                    {generatedMacros.macroPercentages.protein}% of daily calories
                  </p>
                </div>

                {/* Carbohydrates */}
                <div className="p-5 rounded-2xl bg-[#121722] border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    Carbohydrates (Glycogen)
                  </span>
                  <div className="text-3xl font-black text-white font-heading">
                    {generatedMacros.carbGrams}g
                  </div>
                  <p className="text-xs text-slate-400">
                    {generatedMacros.macroPercentages.carbs}% of daily calories
                  </p>
                </div>

                {/* Fats */}
                <div className="p-5 rounded-2xl bg-[#121722] border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Dietary Fats (Hormones)
                  </span>
                  <div className="text-3xl font-black text-white font-heading">
                    {generatedMacros.fatGrams}g
                  </div>
                  <p className="text-xs text-slate-400">
                    {generatedMacros.macroPercentages.fat}% of daily calories
                  </p>
                </div>

                {/* Water */}
                <div className="p-5 rounded-2xl bg-[#121722] border border-slate-800 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#CCFF00]">
                    Daily Water Intake
                  </span>
                  <div className="text-3xl font-black text-white font-heading">
                    {generatedMacros.waterLiters} L
                  </div>
                  <p className="text-xs text-slate-400">
                    Electrolyte replenishment minimum
                  </p>
                </div>
              </div>

              {/* Sample Meal Plan Grid */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#121722] border border-slate-800 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-lg font-black text-white font-heading">
                    Sample Daily Meal Protocol ({macroForm.diet.toUpperCase().replace('_', '-')})
                  </h3>
                  <span className="text-[11px] text-[#CCFF00] font-semibold">
                    Optimal Nutrient Timing
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedMacros.mealPlan.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5"
                    >
                      <h4 className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider">
                        {item.meal}
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SMART COACH MATCHER                                                */}
      {/* ========================================================================= */}
      {activeTab === 'matcher' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn">
          {/* Matcher Criteria Bar */}
          <div className="bg-[#121722] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  AI Master Coach Compatibility Matcher
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Our system evaluates coaching certifications, athletic disciplines, and open schedule slots to compute your optimal trainer match.
                </p>
              </div>

              <button
                onClick={handleMatchCoaches}
                disabled={isMatchingCoaches}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#CCFF00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#B3E600] transition shadow-glow-lime shrink-0"
              >
                <Target className="w-4 h-4" />
                <span>{isMatchingCoaches ? 'Analyzing...' : 'Re-Run Coach Match'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
              {/* Primary Focus */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  What is your primary athletic focus?
                </label>
                <select
                  value={matcherForm.primaryGoal}
                  onChange={(e) => setMatcherForm({ ...matcherForm, primaryGoal: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="strength">Heavy Compound Strength & Powerlifting</option>
                  <option value="bodybuilding">Physique Architecture & Hypertrophy</option>
                  <option value="fatloss">Rapid Fat Loss & Functional Conditioning (HIIT)</option>
                  <option value="mobility">Athletic Recovery, Mobility & Posture Rehab</option>
                  <option value="boxing">Combat Athletics, Agility & Boxing Conditioning</option>
                </select>
              </div>

              {/* Time preference */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Preferred Training Hours
                </label>
                <select
                  value={matcherForm.preferredTime}
                  onChange={(e) => setMatcherForm({ ...matcherForm, preferredTime: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="Morning">Morning Sessions (06:00 AM - 10:00 AM)</option>
                  <option value="Afternoon">Midday Sessions (11:00 AM - 04:00 PM)</option>
                  <option value="Evening">Evening Sessions (05:00 PM - 09:00 PM)</option>
                </select>
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  Your Experience Level
                </label>
                <select
                  value={matcherForm.experience}
                  onChange={(e) => setMatcherForm({ ...matcherForm, experience: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#CCFF00]"
                >
                  <option value="beginner">Beginner (Need technique instruction & safety)</option>
                  <option value="intermediate">Intermediate (Overcoming plateaus & consistency)</option>
                  <option value="advanced">Advanced (Contest prep / maximum PR peaks)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Matched Coaches Cards */}
          <div className="space-y-6">
            <h3 className="text-lg font-black text-white font-heading">
              Compatibility Match Results ({matchedCoaches.length} Coaches Ranked)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedCoaches.map(({ trainer, matchScore, matchReasons }, idx) => {
                const isTopMatch = idx === 0;
                return (
                  <div
                    key={trainer.id}
                    className={`rounded-3xl bg-[#121722] border transition-all flex flex-col justify-between overflow-hidden relative ${
                      isTopMatch
                        ? 'border-[#CCFF00] shadow-glow-lime'
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Top Match Badge */}
                    {isTopMatch && (
                      <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
                        ★ Best Match
                      </span>
                    )}

                    {/* Trainer Image & Compatibility Meter */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={trainer.avatar}
                        alt={trainer.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121722] via-[#121722]/30 to-transparent" />

                      {/* Score Pill */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-[#CCFF00]/40">
                        <span className="text-sm font-black text-[#CCFF00] font-heading">
                          {matchScore}%
                        </span>
                        <span className="text-[10px] text-slate-300 font-medium">Match</span>
                      </div>
                    </div>

                    {/* Trainer Info & AI Reasons */}
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h4 className="text-lg font-black text-white font-heading">{trainer.name}</h4>
                        <p className="text-xs text-slate-400">{trainer.role}</p>

                        <div className="pt-2 space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            AI Match Rationale:
                          </span>
                          {matchReasons.map((reason, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-1.5 text-xs text-slate-300 leading-snug">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Rate & Book Action */}
                      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Per Session</span>
                          <p className="text-base font-black text-white font-heading">₹{trainer.sessionPrice}</p>
                        </div>

                        <button
                          onClick={() => onOpenBookingModal(trainer)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#CCFF00] text-black font-extrabold text-xs hover:bg-[#B3E600] transition shadow-glow-lime"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Slot</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Pre-Footer AI Assistance Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white font-heading">
              Need Continuous Coaching During Your Workout?
            </h3>
            <p className="text-xs text-slate-400">
              Use our floating PulseAI Coach assistant anytime by clicking the bot icon in the bottom right corner.
            </p>
          </div>

          <Link
            to="/book-slot"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#CCFF00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#B3E600] transition shadow-glow-lime shrink-0"
          >
            <span>Book A Certified Master Coach</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
