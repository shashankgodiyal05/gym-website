import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GymContext = createContext();

const INITIAL_USERS = [
  {
    id: 'usr-karan',
    name: 'Karan Sharma',
    email: 'karan@ironpulse.fitness',
    password: 'athlete123',
    phone: '+91 98234 56789',
    goal: 'Muscle Hypertrophy & Strength',
    experience: 'Intermediate (1-3 yrs)',
    preferredTime: 'Morning (06:00 AM - 09:00 AM)',
    membershipTier: 'pro-beast',
    memberSince: 'Oct 2024'
  }
];

const INITIAL_BOOKINGS_BY_USER = {
  'karan@ironpulse.fitness': [
    {
      id: 'bk-101',
      trainerId: 'tr-1',
      trainerName: 'Vikram "Titan" Rathore',
      trainerRole: 'Head Strength & Powerlifting Coach',
      trainerAvatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      timeSlot: '07:30 AM - 08:30 AM',
      price: 1200,
      focus: 'Compound Lifting Technique (Squat/Bench/Deadlift)',
      status: 'Confirmed',
      bookedAt: '2 hours ago'
    }
  ]
};

export const GymProvider = ({ children }) => {
  // All registered accounts
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('pulsefit_registered_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  });

  // Current logged in session user (null if guest)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pulsefit_active_session');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // All bookings store keyed by lowercase email
  const [allBookings, setAllBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('pulsefit_user_bookings');
      return saved ? JSON.parse(saved) : INITIAL_BOOKINGS_BY_USER;
    } catch (e) {
      return INITIAL_BOOKINGS_BY_USER;
    }
  });

  const [toast, setToast] = useState(null);

  // Sync registered users
  useEffect(() => {
    try {
      localStorage.setItem('pulsefit_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {}
  }, [registeredUsers]);

  // Sync active session
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('pulsefit_active_session', JSON.stringify(user));
      } else {
        localStorage.removeItem('pulsefit_active_session');
      }
    } catch (e) {}
  }, [user]);

  // Sync bookings
  useEffect(() => {
    try {
      localStorage.setItem('pulsefit_user_bookings', JSON.stringify(allBookings));
    } catch (e) {}
  }, [allBookings]);

  // Derived bookings for current user
  const userKey = user?.email ? user.email.toLowerCase().trim() : null;
  const bookings = userKey && allBookings[userKey] ? allBookings[userKey] : [];
  const activePlan = user?.membershipTier || 'starter';
  const isLoggedIn = Boolean(user && user.loggedIn);

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

  // Registration Handler
  const registerUser = (userData) => {
    const emailNorm = userData.email?.toLowerCase().trim();
    if (!emailNorm) {
      showNotification('Validation Error', 'Email address is required.', 'error');
      return { success: false, message: 'Email address is required.' };
    }

    if (!userData.name || !userData.name.trim()) {
      showNotification('Validation Error', 'Full name is required.', 'error');
      return { success: false, message: 'Full name is required.' };
    }

    if (!userData.password || userData.password.length < 4) {
      showNotification('Validation Error', 'Passcode must be at least 4 characters.', 'error');
      return { success: false, message: 'Passcode must be at least 4 characters.' };
    }

    // Check if email already registered
    const exists = registeredUsers.find((u) => u.email.toLowerCase().trim() === emailNorm);
    if (exists) {
      showNotification('Account Exists', 'An account with this email already exists. Please log in.', 'error');
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const newUser = {
      id: `usr-${Date.now().toString().slice(-5)}`,
      name: userData.name.trim(),
      email: emailNorm,
      password: userData.password,
      phone: userData.phone?.trim() || '+91 98000 00000',
      goal: userData.goal || 'Muscle Hypertrophy & Strength',
      experience: userData.experience || 'Intermediate (1-3 yrs)',
      preferredTime: userData.preferredTime || 'Morning (06:00 AM - 09:00 AM)',
      membershipTier: userData.membershipTier || 'starter',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      loggedIn: true
    };

    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);

    // Initialize empty bookings for new user
    setAllBookings((prev) => ({
      ...prev,
      [emailNorm]: []
    }));

    // Auto-login registered user
    setUser(newUser);
    triggerCelebration();
    showNotification('Account Created!', `Welcome to PulseFit, ${newUser.name}! Your athlete account is now active.`);
    return { success: true, user: newUser };
  };

  // Login Handler
  const loginUser = (email, password) => {
    const emailNorm = email?.toLowerCase().trim();
    if (!emailNorm) {
      showNotification('Input Required', 'Please enter your email address.', 'error');
      return { success: false, message: 'Email address is required.' };
    }

    if (!password) {
      showNotification('Input Required', 'Please enter your passcode.', 'error');
      return { success: false, message: 'Passcode is required.' };
    }

    const matchedUser = registeredUsers.find((u) => u.email.toLowerCase().trim() === emailNorm);
    if (!matchedUser) {
      showNotification('Account Not Found', 'No athlete account with this email. Please register first.', 'error');
      return { success: false, message: 'No athlete account found with this email. Please register.' };
    }

    if (matchedUser.password && matchedUser.password !== password) {
      showNotification('Incorrect Passcode', 'The passcode you entered is incorrect. Please try again.', 'error');
      return { success: false, message: 'Incorrect passcode. Please check your credentials.' };
    }

    const activeUser = {
      ...matchedUser,
      loggedIn: true
    };

    setUser(activeUser);
    triggerCelebration();
    showNotification('Welcome Back!', `Logged in as ${activeUser.name} (${activeUser.email}).`);
    return { success: true, user: activeUser };
  };

  // 1-Click Demo Login
  const loginDemoUser = () => {
    const demo = registeredUsers.find((u) => u.email === 'karan@ironpulse.fitness') || INITIAL_USERS[0];
    const active = { ...demo, loggedIn: true };
    setUser(active);
    triggerCelebration();
    showNotification('Demo Athlete Logged In', `Logged in as ${active.name} (Pro Beast Tier).`);
    return { success: true, user: active };
  };

  // Logout Handler
  const logoutUser = () => {
    setUser(null);
    showNotification('Logged Out', 'You have been safely signed out from PulseFit.', 'info');
  };

  // Profile Update
  const updateProfile = (updates) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.email.toLowerCase() === updated.email.toLowerCase() ? { ...u, ...updates } : u))
    );
    showNotification('Profile Updated', 'Your athlete profile details were saved successfully.');
  };

  // Book Trainer Slot
  const bookSlot = (bookingDetails) => {
    if (!user) {
      showNotification('Sign In Required', 'Please sign in or register before booking a trainer slot.', 'error');
      return null;
    }

    const newBooking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      userId: user.id,
      userEmail: user.email,
      ...bookingDetails,
      status: 'Confirmed',
      bookedAt: 'Just now'
    };

    const userEmailKey = user.email.toLowerCase();
    setAllBookings((prev) => {
      const currentList = prev[userEmailKey] || [];
      return {
        ...prev,
        [userEmailKey]: [newBooking, ...currentList]
      };
    });

    triggerCelebration();
    showNotification(
      'Slot Confirmed!',
      `Session with ${bookingDetails.trainerName} booked for ${bookingDetails.date} (${bookingDetails.timeSlot}).`
    );
    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId) => {
    if (!user) return;
    const userEmailKey = user.email.toLowerCase();
    setAllBookings((prev) => {
      const currentList = prev[userEmailKey] || [];
      return {
        ...prev,
        [userEmailKey]: currentList.filter((b) => b.id !== bookingId)
      };
    });
    showNotification('Session Cancelled', 'Your trainer booking has been released.', 'info');
  };

  // Membership Purchase
  const purchaseMembership = (planId, planName, cycle = 'Monthly') => {
    if (!user) {
      showNotification('Sign In Required', 'Please sign in or register before activating a membership.', 'error');
      return;
    }

    const updated = {
      ...user,
      membershipTier: planId
    };
    setUser(updated);
    setRegisteredUsers((prev) =>
      prev.map((u) => (u.email.toLowerCase() === updated.email.toLowerCase() ? { ...u, membershipTier: planId } : u))
    );

    triggerCelebration();
    showNotification(
      'Membership Activated!',
      `You are now enrolled in the ${planName} (${cycle}) plan. Enjoy elite facility privileges!`
    );
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setRegisteredUsers(INITIAL_USERS);
    setUser(null);
    setAllBookings(INITIAL_BOOKINGS_BY_USER);
    try {
      localStorage.removeItem('pulsefit_registered_users');
      localStorage.removeItem('pulsefit_active_session');
      localStorage.removeItem('pulsefit_user_bookings');
    } catch (e) {}
    showNotification('Demo Data Reset', 'Initial state restored. You can now register a fresh account or log in with demo credentials.', 'info');
  };

  return (
    <GymContext.Provider
      value={{
        user,
        isLoggedIn,
        registeredUsers,
        bookings,
        activePlan,
        toast,
        registerUser,
        loginUser,
        loginDemoUser,
        logoutUser,
        updateProfile,
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
