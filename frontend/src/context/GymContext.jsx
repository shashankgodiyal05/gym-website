import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GymContext = createContext();

const INITIAL_USER = {
  name: 'Karan Sharma',
  email: 'karan@ironpulse.fitness',
  phone: '+91 98234 56789',
  goal: 'Muscle Hypertrophy & Strength',
  experience: 'Intermediate (1-3 yrs)',
  loggedIn: true,
  membershipTier: 'pro-beast',
  memberSince: 'Oct 2024'
};

const INITIAL_BOOKINGS = [
  {
    id: 'bk-101',
    trainerId: 'tr-1',
    trainerName: 'Vikram "Titan" Rathore',
    trainerRole: 'Head Strength & Powerlifting Coach',
    trainerAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '07:30 AM - 08:30 AM',
    price: 1200,
    status: 'Confirmed',
    bookedAt: '2 hours ago'
  }
];

export const GymProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pulsefit_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('pulsefit_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [activePlan, setActivePlan] = useState(() => {
    const saved = localStorage.getItem('pulsefit_active_plan');
    return saved ? saved : 'pro-beast';
  });

  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pulsefit_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pulsefit_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('pulsefit_active_plan', activePlan);
  }, [activePlan]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#CCFF00', '#FF7A00', '#FFFFFF']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  const showNotification = (title, message, type = 'success') => {
    setToast({ title, message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const dismissToast = () => setToast(null);

  const registerUser = (userData) => {
    const updated = {
      ...userData,
      loggedIn: true,
      membershipTier: activePlan,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    setUser(updated);
    triggerCelebration();
    showNotification('Account Created!', `Welcome to PulseFit, ${userData.name}!`);
    return true;
  };

  const loginUser = (email, name = 'Fitness Athlete') => {
    const updated = {
      ...user,
      email,
      name: name || user.name,
      loggedIn: true
    };
    setUser(updated);
    showNotification('Welcome Back!', `Logged in as ${updated.name}`);
    return true;
  };

  const logoutUser = () => {
    setUser((prev) => ({ ...prev, loggedIn: false }));
    showNotification('Logged Out', 'You have been safely signed out.', 'info');
  };

  const bookSlot = (bookingDetails) => {
    const newBooking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      ...bookingDetails,
      status: 'Confirmed',
      bookedAt: 'Just now'
    };
    setBookings((prev) => [newBooking, ...prev]);
    triggerCelebration();
    showNotification(
      'Slot Confirmed!',
      `Session with ${bookingDetails.trainerName} booked for ${bookingDetails.date} (${bookingDetails.timeSlot}).`
    );
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    showNotification('Session Cancelled', 'Your trainer booking has been cancelled and slot released.', 'info');
  };

  const purchaseMembership = (planId, planName, cycle = 'Monthly') => {
    setActivePlan(planId);
    setUser((prev) => ({
      ...prev,
      membershipTier: planId
    }));
    triggerCelebration();
    showNotification(
      'Membership Activated!',
      `You are now enrolled in the ${planName} (${cycle}) plan. Enjoy full privileges!`
    );
  };

  const resetDemoData = () => {
    setUser(INITIAL_USER);
    setBookings(INITIAL_BOOKINGS);
    setActivePlan('pro-beast');
    showNotification('Demo Reset', 'Default demo profile, bookings, and plan restored.', 'info');
  };

  return (
    <GymContext.Provider
      value={{
        user,
        bookings,
        activePlan,
        toast,
        registerUser,
        loginUser,
        logoutUser,
        bookSlot,
        cancelBooking,
        purchaseMembership,
        showNotification,
        dismissToast,
        resetDemoData
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
