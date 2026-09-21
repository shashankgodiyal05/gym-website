// Mock database & initial dataset for PulseFit Gym Client Demo

export const TRAINERS_DATA = [
  {
    id: 'tr-1',
    name: 'Vikram "Titan" Rathore',
    role: 'Head Strength & Powerlifting Coach',
    category: 'Strength',
    rating: 4.95,
    reviewsCount: 142,
    experience: '9+ Years',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    bio: 'Former national powerlifter specializing in compound lifting biomechanics, maximum hypertrophy, and post-injury rehabilitation.',
    certifications: ['CSCS Certified', 'IPF Level 2 Coach', 'Precision Nutrition'],
    sessionPrice: 1200,
    availableSlots: [
      { id: 's1', time: '06:00 AM - 07:00 AM', period: 'Morning' },
      { id: 's2', time: '07:30 AM - 08:30 AM', period: 'Morning' },
      { id: 's3', time: '05:30 PM - 06:30 PM', period: 'Evening' },
      { id: 's4', time: '07:00 PM - 08:00 PM', period: 'Evening' }
    ]
  },
  {
    id: 'tr-2',
    name: 'Elena Rostova',
    role: 'HIIT & Functional Conditioning Master',
    category: 'HIIT & Conditioning',
    rating: 4.92,
    reviewsCount: 118,
    experience: '7+ Years',
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
    bio: 'Specialist in metabolic conditioning, endurance athletics, and rapid fat oxidation through high-intensity functional training.',
    certifications: ['NASM-CPT', 'CrossFit Level 3', 'TRX Master Trainer'],
    sessionPrice: 1100,
    availableSlots: [
      { id: 's5', time: '07:00 AM - 08:00 AM', period: 'Morning' },
      { id: 's6', time: '09:00 AM - 10:00 AM', period: 'Morning' },
      { id: 's7', time: '04:00 PM - 05:00 PM', period: 'Afternoon' },
      { id: 's8', time: '06:30 PM - 07:30 PM', period: 'Evening' }
    ]
  },
  {
    id: 'tr-3',
    name: 'Marcus Sterling',
    role: 'Pro Bodybuilder & Physique Architect',
    category: 'Bodybuilding',
    rating: 4.98,
    reviewsCount: 189,
    experience: '11+ Years',
    avatar: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    bio: 'Elite contest prep coach and physique specialist. Helps busy professionals sculpt defined muscle density while balancing hormonal health.',
    certifications: ['ISSA Master Trainer', 'EXOS Performance', 'Bio-Mech Specialist'],
    sessionPrice: 1500,
    availableSlots: [
      { id: 's9', time: '08:00 AM - 09:00 AM', period: 'Morning' },
      { id: 's10', time: '12:30 PM - 01:30 PM', period: 'Afternoon' },
      { id: 's11', time: '06:00 PM - 07:00 PM', period: 'Evening' },
      { id: 's12', time: '08:00 PM - 09:00 PM', period: 'Evening' }
    ]
  },
  {
    id: 'tr-4',
    name: 'Ananya Deshmukh',
    role: 'Mobility, Yoga & Athletic Recovery Coach',
    category: 'Mobility & Recovery',
    rating: 4.94,
    reviewsCount: 96,
    experience: '6+ Years',
    avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    bio: 'Combines dynamic Vinyasa, fascial release, and joint mobility to build bulletproof resilience, flexibility, and core structural stability.',
    certifications: ['500hr RYT Yoga Alliance', 'FRC Mobility Specialist', 'Dry Needling Cert'],
    sessionPrice: 950,
    availableSlots: [
      { id: 's13', time: '06:30 AM - 07:30 AM', period: 'Morning' },
      { id: 's14', time: '08:30 AM - 09:30 AM', period: 'Morning' },
      { id: 's15', time: '05:00 PM - 06:00 PM', period: 'Evening' },
      { id: 's16', time: '07:30 PM - 08:30 PM', period: 'Evening' }
    ]
  },
  {
    id: 'tr-5',
    name: 'David Vance',
    role: 'Combat Athletics & Boxing Coach',
    category: 'Boxing & Agility',
    rating: 4.89,
    reviewsCount: 84,
    experience: '8+ Years',
    avatar: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80',
    bio: 'Former amateur boxing champion specializing in footwork, explosive rotational power, speed drills, and combat conditioning.',
    certifications: ['USA Boxing Certified Coach', 'ACE Fitness Specialist', 'Speed Agility Coach'],
    sessionPrice: 1250,
    availableSlots: [
      { id: 's17', time: '07:00 AM - 08:00 AM', period: 'Morning' },
      { id: 's18', time: '11:00 AM - 12:00 PM', period: 'Morning' },
      { id: 's19', time: '06:00 PM - 07:00 PM', period: 'Evening' }
    ]
  }
];

export const MEMBERSHIP_PLANS = [
  {
    id: 'starter',
    name: 'Starter Club',
    tagline: 'Ideal for fitness enthusiasts building a consistent workout habit.',
    monthlyPrice: 1999,
    annualPriceMonthly: 1499,
    isPopular: false,
    color: 'border-slate-700',
    badge: 'Core Access',
    features: [
      'Access to standard gym floor & cardio floor',
      'Free locker room & luxury shower access',
      '1 Complimentary 1-on-1 Fitness Assessment',
      'PulseFit mobile app workout tracking',
      'Gym access during standard hours (6 AM - 10 PM)'
    ],
    notIncluded: [
      'Unlimited group studio classes',
      'Sauna, steam bath & ice plunge lounge',
      'Monthly complimentary personal training',
      'Custom macro nutrition & diet plan'
    ]
  },
  {
    id: 'pro-beast',
    name: 'Pro Beast',
    tagline: 'Our most popular plan designed for serious physical transformations.',
    monthlyPrice: 3499,
    annualPriceMonthly: 2699,
    isPopular: true,
    color: 'border-[#CCFF00]',
    badge: 'Most Popular',
    features: [
      'Everything in Starter Club',
      '24/7 Unlimited Gym & Weight Room Access',
      'Unlimited Group Studio Classes (HIIT, Spin, Yoga)',
      'Infrared Sauna & Steam Room Access',
      '2 Complimentary 1-on-1 Trainer Sessions per month',
      'Monthly Body Composition InBody™ 3D Scan',
      '15% Discount on Juice Bar & Supplements'
    ],
    notIncluded: [
      'Dedicated VIP locker with laundry service',
      'Unlimited guest passes'
    ]
  },
  {
    id: 'elite-vip',
    name: 'Elite VIP Athlete',
    tagline: 'All-inclusive ultimate luxury fitness & recovery experience.',
    monthlyPrice: 5999,
    annualPriceMonthly: 4799,
    isPopular: false,
    color: 'border-amber-500',
    badge: 'All Inclusive VIP',
    features: [
      'Everything in Pro Beast Plan',
      '4 1-on-1 Elite Personal Trainer Sessions/mo',
      'Full Recovery Lounge: Cold Plunge, Hyperice & Sauna',
      'Personalized Biometric Diet & Nutrition Protocol',
      'Dedicated Private Locker & Towel Service',
      'Unlimited Guest Passes (Bring a workout buddy anytime)',
      'Free Daily Energy Shake from Pulse Fuel Bar',
      'Priority Slot Booking with Master Coaches'
    ],
    notIncluded: []
  }
];

export const FACILITIES = [
  {
    title: 'Olympic Lifting & Power Zone',
    description: 'Eleiko calibrated plates, 8 heavy-duty power racks, deadlift platforms, and competition-grade barbells.',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
    stats: '8 Power Racks • Competition Platforms'
  },
  {
    title: 'Functional HIIT & Turf Arena',
    description: '40-meter indoor sprint turf, sleds, kettlebells, ski-ergs, assault bikes, and battle ropes for explosive conditioning.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    stats: '40m Sled Track • Rogue Conditioning'
  },
  {
    title: 'Contrast Therapy & Recovery Spa',
    description: 'Finnish dry sauna, therapeutic eucalyptus steam room, and 4°C cold immersion plunge tubs for rapid muscle recovery.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    stats: '4°C Cold Plunge • Infrared Sauna'
  },
  {
    title: 'Cardio Loft with Panoramic View',
    description: 'LifeFitness & Concept2 cardiovascular gear equipped with immersive digital running trails and live heart telemetry.',
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    stats: '50+ High-Tech Cardio Machines'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aman Singhania',
    role: 'Member since 2023',
    achievement: 'Lost 16 kg & gained 6 kg muscle',
    quote: 'The trainer slot booking makes it effortless to maintain routine around my crazy work hours. Booking Vikram for strength sessions changed my posture and strength completely.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'Pooja Kashyap',
    role: 'Member since 2024',
    achievement: 'Completed first Half Marathon',
    quote: 'The Pro Beast membership is unmatched. The recovery lounge with the ice bath alone is worth every single rupee. Beautiful atmosphere and world-class equipment.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Rohan Mehra',
    role: 'Member since 2022',
    achievement: 'Increased Squat from 80kg to 160kg',
    quote: 'Cleanest gym in the city, top-of-the-line Eleiko gear, and trainers who actually focus on safety and biomechanics. The client demo will speak for itself!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS = [
  {
    q: 'How does trainer slot booking work?',
    a: 'You choose your preferred trainer, pick an available date within the next 7 days, and choose your favorite morning or evening slot. You receive an instant booking confirmation with reminder notifications.'
  },
  {
    q: 'Can I reschedule or cancel a booked session?',
    a: 'Yes, slots can be managed directly from your "My Bookings" dashboard up to 2 hours before the session start time without any penalty.'
  },
  {
    q: 'What happens immediately after I buy a membership?',
    a: 'Your membership is activated instantly! You get a digital member badge, access to the gym facility, and you can immediately schedule your complimentary fitness assessment.'
  },
  {
    q: 'Are locker and shower facilities included?',
    a: 'Yes, all membership tiers (Starter, Pro Beast, and Elite VIP) include clean, sanitized locker rooms, showers, and vanity amenities.'
  }
];
