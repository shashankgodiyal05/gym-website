// PulseAI Knowledge Base and Algorithmic Engine for PulseFit Gym Platform
import { TRAINERS_DATA, MEMBERSHIP_PLANS, FACILITIES } from './gymData';

// Workout Generator Knowledge
export const WORKOUT_EXERCISES_DB = {
  chest: [
    { name: 'Barbell Flat Bench Press', cues: 'Retract scapulae, touch lower sternum, flare elbows ~45 degrees.', sets: '4', reps: '6-8', rest: '2.5 min', rpe: '8' },
    { name: 'Incline Dumbbell Press (30°)', cues: 'Focus on clavicular pec contraction. Control 3s eccentric.', sets: '3', reps: '8-10', rest: '2 min', rpe: '8.5' },
    { name: 'Cable Low-to-High Chest Flyes', cues: 'Squeeze inner pec fibers at full peak contraction, slight bend in elbows.', sets: '3', reps: '12-15', rest: '90 sec', rpe: '9' },
    { name: 'Weighted Chest Dips', cues: 'Lean torso forward 30 degrees to bias lower pectorals.', sets: '3', reps: '8-12', rest: '2 min', rpe: '8' }
  ],
  back: [
    { name: 'Conventional Barbell Deadlift', cues: 'Engage lats, wedge hips, drive floor away with quads.', sets: '3', reps: '5', rest: '3 min', rpe: '8.5' },
    { name: 'Neutral-Grip Lat Pulldowns', cues: 'Drive elbows into back pockets, avoid excessive torso swinging.', sets: '4', reps: '8-10', rest: '90 sec', rpe: '8' },
    { name: 'Chest-Supported T-Bar Row', cues: 'Pull with elbows, pause 1s at contraction, stretch rhomboids.', sets: '3', reps: '10-12', rest: '2 min', rpe: '8.5' },
    { name: 'Hyperextensions with Glute/Hamstring Squeeze', cues: 'Brace core, maintain neutral cervical spine.', sets: '3', reps: '12-15', rest: '60 sec', rpe: '7.5' }
  ],
  legs: [
    { name: 'Barbell Back Squat (Olympic Style)', cues: 'Brace 360 abdominal pressure, break knees and hips evenly, hit parallel depth.', sets: '4', reps: '6-8', rest: '3 min', rpe: '8' },
    { name: 'Romanian Deadlift (RDL)', cues: 'Push hips backward into wall behind you, slight knee bend, feel hamstring stretch.', sets: '3', reps: '8-10', rest: '2 min', rpe: '8' },
    { name: 'Bulgarian Split Squats', cues: 'Front foot planted firmly, sink back knee down toward mat, stay upright.', sets: '3', reps: '10 each leg', rest: '90 sec', rpe: '9' },
    { name: 'Standing Heavy Calf Raises', cues: 'Full deep ankle dorsiflexion, hold bottom stretch 2 seconds.', sets: '4', reps: '12-15', rest: '60 sec', rpe: '8.5' }
  ],
  shoulders: [
    { name: 'Standing Overhead Barbell Press (OHP)', cues: 'Tight glutes, push head forward once bar clears forehead.', sets: '4', reps: '6-8', rest: '2.5 min', rpe: '8' },
    { name: 'Dumbbell Lateral Raises (Strict)', cues: 'Lead with elbows, pour the pitcher, zero momentum or torso sway.', sets: '4', reps: '12-15', rest: '60 sec', rpe: '9' },
    { name: 'Rear Delt Face Pulls with Rope', cues: 'Pull hands past ears, externally rotate humerus at top.', sets: '3', reps: '15-20', rest: '60 sec', rpe: '8' }
  ],
  arms: [
    { name: 'Incline Dumbbell Bicep Curls', cues: 'Keep upper arm perpendicular to floor, get maximum long-head stretch.', sets: '3', reps: '10-12', rest: '75 sec', rpe: '8.5' },
    { name: 'Overhead Tricep Cable Extensions', cues: 'Fully stretch tricep long head behind head, lockout cleanly.', sets: '3', reps: '12-15', rest: '75 sec', rpe: '8.5' },
    { name: 'EZ-Bar Reverse Grip Curls', cues: 'Target brachioradialis and forearm thickness, smooth cadence.', sets: '3', reps: '12', rest: '60 sec', rpe: '8' }
  ],
  core: [
    { name: 'Hanging Leg Raises', cues: 'Posteriorly tilt pelvis at apex, avoid swinging legs.', sets: '3', reps: '12-15', rest: '60 sec', rpe: '8' },
    { name: 'Ab-Wheel Rollouts', cues: 'Tuck pelvis, maintain hollow-body arch throughout movement.', sets: '3', reps: '10-12', rest: '90 sec', rpe: '8.5' },
    { name: 'Cable Woodchoppers (Rotational)', cues: 'Drive rotation from hips and obliques, arms remain rigid.', sets: '3', reps: '12 each side', rest: '60 sec', rpe: '8' }
  ]
};

// Algorithmic AI Workout Generator
export function generateAiWorkout({ goal, level, days, equipment, focus, duration }) {
  const numDays = parseInt(days, 10) || 4;
  const schedule = [];

  const splitNames = {
    3: ['Day 1: Full Body Foundations (A)', 'Day 2: Full Body Explosive (B)', 'Day 3: Full Body Hypertrophy (C)'],
    4: ['Day 1: Upper Body Strength', 'Day 2: Lower Body Quad & Core', 'Day 3: Upper Body Hypertrophy', 'Day 4: Posterior Chain & Hamstrings'],
    5: ['Day 1: Push (Chest, Delts, Triceps)', 'Day 2: Pull (Lats, Upper Back, Biceps)', 'Day 3: Legs (Quads & Calves)', 'Day 4: Upper Body Precision', 'Day 5: Lower Body & Core'],
    6: ['Day 1: Push A (Chest Focus)', 'Day 2: Pull A (Lat Width)', 'Day 3: Legs A (Squat Dominant)', 'Day 4: Push B (Shoulder Focus)', 'Day 5: Pull B (Back Thickness)', 'Day 6: Legs B (Hinge Dominant)']
  };

  const dayTitles = splitNames[numDays] || splitNames[4];

  for (let i = 0; i < numDays; i++) {
    const title = dayTitles[i];
    let exercises = [];

    if (title.includes('Upper') || title.includes('Push')) {
      exercises = [
        ...WORKOUT_EXERCISES_DB.chest.slice(0, 2),
        ...WORKOUT_EXERCISES_DB.shoulders.slice(0, 1),
        ...WORKOUT_EXERCISES_DB.arms.slice(1, 2)
      ];
      if (title.includes('Upper')) {
        exercises.push(WORKOUT_EXERCISES_DB.back[1]);
      }
    } else if (title.includes('Pull')) {
      exercises = [
        ...WORKOUT_EXERCISES_DB.back.slice(0, 3),
        ...WORKOUT_EXERCISES_DB.arms.slice(0, 1),
        ...WORKOUT_EXERCISES_DB.shoulders.slice(2, 3)
      ];
    } else if (title.includes('Legs') || title.includes('Lower')) {
      exercises = [
        ...WORKOUT_EXERCISES_DB.legs.slice(0, 3),
        ...WORKOUT_EXERCISES_DB.core.slice(0, 1)
      ];
    } else {
      // Full body
      exercises = [
        WORKOUT_EXERCISES_DB.legs[0],
        WORKOUT_EXERCISES_DB.chest[0],
        WORKOUT_EXERCISES_DB.back[1],
        WORKOUT_EXERCISES_DB.shoulders[1],
        WORKOUT_EXERCISES_DB.core[0]
      ];
    }

    schedule.push({
      dayIndex: i + 1,
      dayTitle: title,
      warmup: '7 mins dynamic joint mobility (Cat-camel, Banded shoulder dislocates, Hip 90/90, World\'s Greatest Stretch)',
      exercises,
      cooldown: '5 mins foam rolling glutes & thoracic spine + 5 mins sauna or cold immersion reset'
    });
  }

  return {
    id: `plan-${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    meta: {
      goal,
      level,
      days: `${numDays} Days/Week`,
      equipment,
      focus,
      duration: `${duration} mins/session`
    },
    weeklyVolume: `${numDays * 4 + 4} Direct Sets`,
    restRecommendation: '48 hours between same-muscle stimulus. Minimum 7-8 hours uninterrupted sleep.',
    schedule
  };
}

// Algorithmic AI Macro & Nutrition Engine
export function calculateAiMacros({ age, gender, weightKg, heightCm, activity, goal, diet }) {
  const w = parseFloat(weightKg) || 75;
  const h = parseFloat(heightCm) || 175;
  const a = parseInt(age, 10) || 26;

  // Mifflin-St Jeor Formula
  let bmr = (10 * w) + (6.25 * h) - (5 * a);
  if (gender === 'female') {
    bmr -= 161;
  } else {
    bmr += 5;
  }
  bmr = Math.round(bmr);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    heavy: 1.725,
    athlete: 1.9
  };

  const mult = activityMultipliers[activity] || 1.55;
  const tdee = Math.round(bmr * mult);

  let targetCalories = tdee;
  let targetDesc = 'Maintenance & Recomposition';

  if (goal === 'cut_aggressive') {
    targetCalories = Math.round(tdee - 550);
    targetDesc = 'Aggressive Fat Loss (-550 kcal deficit)';
  } else if (goal === 'cut_lean') {
    targetCalories = Math.round(tdee - 300);
    targetDesc = 'Lean Deficit / Slow Cut (-300 kcal deficit)';
  } else if (goal === 'bulk_lean') {
    targetCalories = Math.round(tdee + 300);
    targetDesc = 'Lean Mass Hypertrophy (+300 kcal surplus)';
  } else if (goal === 'bulk_power') {
    targetCalories = Math.round(tdee + 550);
    targetDesc = 'Powerlifting Strength Surplus (+550 kcal)';
  }

  // Protein targets: 2.0g - 2.2g per kg bodyweight
  const proteinGrams = Math.round(w * 2.1);
  const proteinCals = proteinGrams * 4;

  // Fat targets: 25% of total calories
  const fatCals = Math.round(targetCalories * 0.25);
  const fatGrams = Math.round(fatCals / 9);

  // Remaining calories to Carbs
  const carbCals = Math.max(0, targetCalories - (proteinCals + fatCals));
  const carbGrams = Math.round(carbCals / 4);

  // Water intake
  const waterLiters = (w * 0.04).toFixed(1);

  // Sample meal suggestions based on dietary preference
  const mealPlans = {
    non_veg: [
      { meal: 'Breakfast (Post-Wakeup)', text: '4 Whole eggs scramble + 100g oats with berries + 1 scoop Whey isolate (52g Protein)' },
      { meal: 'Lunch (Metabolic Fuel)', text: '200g Grilled chicken breast / salmon + 200g sweet potato or brown rice + avocado greens (58g Protein)' },
      { meal: 'Pre-Workout Snack (90m before)', text: '1 Banana + 2 rice cakes with peanut butter + black espresso (Quick Glycogen)' },
      { meal: 'Post-Workout Dinner', text: '200g Lean beef mince or chicken tikka + steamed broccoli & quinoa bowl (50g Protein)' }
    ],
    veg: [
      { meal: 'Breakfast (Post-Wakeup)', text: '150g Low-fat Paneer bhurji / Tofu + oats bowl with chia seeds and almond butter (38g Protein)' },
      { meal: 'Lunch (Metabolic Fuel)', text: '200g Soya chunks / Edamame tossed in olive oil with brown rice and thick Greek yogurt (52g Protein)' },
      { meal: 'Pre-Workout Snack (90m before)', text: 'Apple slices + 1 scoop Plant/Whey isolate protein shake + dates (30g Protein)' },
      { meal: 'Post-Workout Dinner', text: 'Mixed lentil & chickpea stew + quinoa + grilled paneer with spinach (45g Protein)' }
    ],
    vegan: [
      { meal: 'Breakfast (Post-Wakeup)', text: 'Organic Tofu scramble with nutritional yeast + rolled oats with hemp seeds (36g Protein)' },
      { meal: 'Lunch (Metabolic Fuel)', text: 'Seitan & Tempeh stir-fry with broccoli, edamame and wild black rice (50g Protein)' },
      { meal: 'Pre-Workout Snack (90m before)', text: 'Pea-Rice protein isolate smoothie with banana, almond butter and flax (32g Protein)' },
      { meal: 'Post-Workout Dinner', text: 'Red lentil dahl + roasted chickpeas bowl with avocado tahini dressing (40g Protein)' }
    ]
  };

  const chosenMeals = mealPlans[diet] || mealPlans.non_veg;

  return {
    bmr,
    tdee,
    targetCalories,
    targetDesc,
    waterLiters,
    proteinGrams,
    carbGrams,
    fatGrams,
    macroPercentages: {
      protein: Math.round((proteinCals / targetCalories) * 100),
      carbs: Math.round((carbCals / targetCalories) * 100),
      fat: Math.round((fatCals / targetCalories) * 100)
    },
    mealPlan: chosenMeals
  };
}

// Algorithmic Smart Trainer Matcher
export function matchAiTrainer({ primaryGoal, trainingStyle, preferredTime, experience }) {
  const scoredTrainers = TRAINERS_DATA.map((t) => {
    let score = 70;
    let matchReasons = [];

    // Category matching
    if (primaryGoal === 'strength' && t.category === 'Strength') {
      score += 25;
      matchReasons.push('World-class powerlifting and compound lift mechanics specialist.');
    } else if (primaryGoal === 'bodybuilding' && t.category === 'Bodybuilding') {
      score += 25;
      matchReasons.push('Contest-level hypertrophy architecture and muscular symmetry expertise.');
    } else if (primaryGoal === 'fatloss' && t.category === 'HIIT & Conditioning') {
      score += 25;
      matchReasons.push('Metabolic acceleration and high-intensity energy systems master.');
    } else if (primaryGoal === 'mobility' && t.category === 'Mobility & Recovery') {
      score += 25;
      matchReasons.push('Joint mobility, fascial recovery, and postural rehabilitation focus.');
    } else if (primaryGoal === 'boxing' && t.category === 'Boxing & Agility') {
      score += 25;
      matchReasons.push('Explosive rotational power, combat conditioning, and footwork precision.');
    }

    // Time slots check
    const hasSlot = t.availableSlots.some((s) => s.period.toLowerCase() === preferredTime.toLowerCase());
    if (hasSlot) {
      score += 5;
      matchReasons.push(`Open coach slots available during your preferred ${preferredTime} training hours.`);
    }

    if (experience === 'beginner' && (t.id === 'tr-1' || t.id === 'tr-4')) {
      score += 3;
      matchReasons.push('Exceptional patient coaching track-record with foundational lifters.');
    }

    // Cap score at 99%
    score = Math.min(score, 99);

    return {
      trainer: t,
      matchScore: score,
      matchReasons
    };
  });

  return scoredTrainers.sort((a, b) => b.matchScore - a.matchScore);
}

// PulseBot Assistant Intelligent Q&A Engine
export function getPulseAiAssistantResponse(questionText) {
  const query = questionText.toLowerCase().trim();

  // Trainer queries
  if (query.includes('trainer') || query.includes('coach') || query.includes('vikram') || query.includes('elena') || query.includes('marcus')) {
    return {
      reply: `Our facility is staffed by **5 internationally certified master coaches**:
- **Vikram "Titan" Rathore** (Head Strength & Powerlifting Coach, ₹1200/session)
- **Elena Rostova** (HIIT & Conditioning Master, ₹1100/session)
- **Marcus Sterling** (Pro Bodybuilder & Physique Architect, ₹1500/session)
- **Ananya Deshmukh** (Mobility, Yoga & Recovery Specialist, ₹950/session)
- **David Vance** (Combat Athletics & Boxing Coach, ₹1250/session)

Would you like me to match you with a coach or book a session directly?`,
      action: {
        type: 'link',
        label: 'View Coach Schedules & Book',
        path: '/book-slot'
      }
    };
  }

  // Membership queries
  if (query.includes('membership') || query.includes('price') || query.includes('cost') || query.includes('pro beast') || query.includes('starter') || query.includes('vip')) {
    return {
      reply: `We offer **3 all-inclusive membership tiers** with no hidden fees:
1. **Starter Club** (₹1,499/mo annual or ₹1,999/mo): Full gym floor, locker access, and 1 fitness assessment.
2. **Pro Beast (Most Popular)** (₹2,699/mo annual or ₹3,499/mo): 24/7 gym access, unlimited group studio classes, sauna & cold plunge, plus 2 monthly complimentary trainer sessions!
3. **Elite VIP Athlete** (₹4,799/mo annual or ₹5,999/mo): 4 monthly 1-on-1 trainer sessions, unlimited guest passes, private VIP locker, and free daily protein shakes from the Fuel Bar!`,
      action: {
        type: 'link',
        label: 'Explore Membership Plans',
        path: '/membership'
      }
    };
  }

  // Workout / Routine queries
  if (query.includes('workout') || query.includes('routine') || query.includes('exercise') || query.includes('split') || query.includes('plan')) {
    return {
      reply: `I can generate a **complete, science-backed workout split** customized to your exact experience level, target muscle groups, and available weekly days!

You can visit our **PulseAI Fitness Lab** to generate your full day-by-day plan with sets, reps, and biomechanical cues.`,
      action: {
        type: 'link',
        label: 'Launch PulseAI Workout Architect ✨',
        path: '/ai-lab?tab=workout'
      }
    };
  }

  // Nutrition / Diet / Macros
  if (query.includes('macro') || query.includes('calorie') || query.includes('diet') || query.includes('protein') || query.includes('eat') || query.includes('food')) {
    return {
      reply: `For optimal athletic performance and body recomposition:
- **Protein Intake:** Aim for **1.8g to 2.2g of protein per kg of bodyweight**. For a 75kg athlete, that is roughly 150g - 165g daily.
- **Pre-Workout Fuel:** Consume 30-40g easily digestible complex carbohydrates 60-90 minutes before lifting (e.g. oats with banana).
- **Hydration:** Consume at least **35-40ml of water per kg of bodyweight** daily.

Use our **PulseAI Macro Coach** to calculate your exact BMR, TDEE, and daily grams!`,
      action: {
        type: 'link',
        label: 'Calculate My AI Macros 🥗',
        path: '/ai-lab?tab=nutrition'
      }
    };
  }

  // Recovery / Ice plunge / Sauna
  if (query.includes('ice') || query.includes('cold plunge') || query.includes('sauna') || query.includes('recovery') || query.includes('sore')) {
    return {
      reply: `**Contrast Therapy Protocol at PulseFit:**
- **Finnish Cedar Sauna (85°C - 90°C):** Spend 15 minutes to increase heart rate variability, trigger heat shock proteins, and promote deep muscle relaxation.
- **Cold Immersion Plunge (4°C):** Submerge up to neck level for 2 to 3 minutes to suppress systemic inflammation and stimulate norepinephrine.
- **Note:** Avoid ice baths immediately post-hypertrophy workouts if pure muscle building is your main priority, as cold immersion can attenuate immediate anabolic signaling!`,
      action: {
        type: 'link',
        label: 'View Recovery Spa Facilities',
        path: '/about'
      }
    };
  }

  // Default smart AI response
  return {
    reply: `I am your **PulseAI Athletic Assistant**. Here to help you optimize every aspect of your training:
- Build customized weekly workout splits
- Calculate precision nutrition & macronutrient targets
- Match with certified master coaches
- Guide you through facility amenities, saunas, and membership options

How can I assist your athletic journey today?`,
    action: {
      type: 'link',
      label: 'Open PulseAI Fitness Lab ✨',
      path: '/ai-lab'
    }
  };
}
