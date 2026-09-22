import { store } from '../store.js';

export const register = (req, res) => {
  try {
    const { name, email, phone, goal, experience, preferredTime } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required fields.'
      });
    }

    const existing = store.findUserByEmail(email);
    if (existing) {
      // For demo convenience, log them in as existing user
      store.setActiveUser(existing);
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${existing.name}!`,
        user: existing
      });
    }

    const newUser = store.createUser({
      name,
      email,
      phone,
      goal,
      experience,
      preferredTime
    });

    return res.status(201).json({
      success: true,
      message: `Account created successfully. Welcome to PulseFit, ${newUser.name}!`,
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during registration.',
      error: error.message
    });
  }
};

export const login = (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.'
      });
    }

    let user = store.findUserByEmail(email);
    if (!user) {
      // Create user if logging in for first time in demo
      user = store.createUser({
        name: name || 'Fitness Athlete',
        email
      });
    }

    store.setActiveUser(user);

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during login.',
      error: error.message
    });
  }
};

export const getProfile = (req, res) => {
  try {
    const user = store.getActiveUser();
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching profile.',
      error: error.message
    });
  }
};

export const updateProfile = (req, res) => {
  try {
    const currentUser = store.getActiveUser();
    const updated = store.updateUser(currentUser.id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Athlete profile updated successfully.',
      user: updated
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating profile.',
      error: error.message
    });
  }
};

export const resetData = (req, res) => {
  try {
    const result = store.resetDemo();
    return res.status(200).json({
      success: true,
      message: 'Demo profile, bookings, and plan restored.',
      result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error resetting data.',
      error: error.message
    });
  }
};
