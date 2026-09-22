import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  INITIAL_USER,
  INITIAL_BOOKINGS,
  TRAINERS_DATA,
  MEMBERSHIP_PLANS,
  FACILITIES,
  TESTIMONIALS
} from './data/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

class DataStore {
  constructor() {
    this.users = [{ ...INITIAL_USER }];
    this.bookings = [...INITIAL_BOOKINGS];
    this.trainers = [...TRAINERS_DATA];
    this.membershipPlans = [...MEMBERSHIP_PLANS];
    this.facilities = [...FACILITIES];
    this.testimonials = [...TESTIMONIALS];
    this.inquiries = [];
    this.activeUserSession = { ...INITIAL_USER };

    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf-8');
        const data = JSON.parse(raw);
        if (data.users) this.users = data.users;
        if (data.bookings) this.bookings = data.bookings;
        if (data.inquiries) this.inquiries = data.inquiries;
        if (data.activeUserSession) this.activeUserSession = data.activeUserSession;
      } else {
        this.saveToFile();
      }
    } catch (err) {
      // In serverless read-only environments (like Vercel Lambda), disk write may not be permitted
      console.warn('[DataStore] Operating in memory mode:', err.message);
    }
  }

  saveToFile() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(
        STORE_FILE,
        JSON.stringify(
          {
            users: this.users,
            bookings: this.bookings,
            inquiries: this.inquiries,
            activeUserSession: this.activeUserSession
          },
          null,
          2
        ),
        'utf-8'
      );
    } catch (err) {
      // Ignore write errors in serverless containers
    }
  }

  // User Auth Methods
  findUserByEmail(email) {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(userData) {
    const newUser = {
      id: `usr-${Date.now().toString().slice(-5)}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      goal: userData.goal || 'Muscle Hypertrophy & Strength',
      experience: userData.experience || 'Intermediate (1-3 yrs)',
      preferredTime: userData.preferredTime || 'Morning (06:00 AM - 09:00 AM)',
      membershipTier: userData.membershipTier || 'pro-beast',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    this.users.push(newUser);
    this.activeUserSession = newUser;
    this.saveToFile();
    return newUser;
  }

  updateUser(id, updates) {
    const index = this.users.findIndex((u) => u.id === id || u.email === updates.email);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      this.activeUserSession = this.users[index];
      this.saveToFile();
      return this.users[index];
    }
    // Update active session if not found in list
    this.activeUserSession = { ...this.activeUserSession, ...updates };
    this.saveToFile();
    return this.activeUserSession;
  }

  getActiveUser() {
    return this.activeUserSession;
  }

  setActiveUser(user) {
    this.activeUserSession = user;
    this.saveToFile();
  }

  // Trainers Methods
  getTrainers({ category, search } = {}) {
    let list = this.trainers;
    if (category && category !== 'All') {
      list = list.filter((t) => t.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.role.toLowerCase().includes(q) ||
          t.bio.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getTrainerById(id) {
    return this.trainers.find((t) => t.id === id);
  }

  // Bookings Methods
  getBookings(userId) {
    if (userId) {
      return this.bookings.filter((b) => b.userId === userId);
    }
    return this.bookings;
  }

  createBooking(bookingData) {
    const newBooking = {
      id: `bk-${Date.now().toString().slice(-4)}`,
      userId: bookingData.userId || this.activeUserSession.id || 'usr-101',
      trainerId: bookingData.trainerId,
      trainerName: bookingData.trainerName,
      trainerRole: bookingData.trainerRole,
      trainerAvatar: bookingData.trainerAvatar,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      price: bookingData.price,
      focus: bookingData.focus || 'General Hypertrophy & Technique',
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    };
    this.bookings.unshift(newBooking);
    this.saveToFile();
    return newBooking;
  }

  cancelBooking(id) {
    const initialLen = this.bookings.length;
    this.bookings = this.bookings.filter((b) => b.id !== id);
    if (this.bookings.length !== initialLen) {
      this.saveToFile();
      return true;
    }
    return false;
  }

  // Memberships
  getMembershipPlans() {
    return this.membershipPlans;
  }

  enrollMembership({ planId, billingCycle, paymentMethod }) {
    const plan = this.membershipPlans.find((p) => p.id === planId);
    if (!plan) return null;

    // Update active user tier
    this.activeUserSession.membershipTier = plan.id;
    const userIdx = this.users.findIndex((u) => u.id === this.activeUserSession.id);
    if (userIdx !== -1) {
      this.users[userIdx].membershipTier = plan.id;
    }
    this.saveToFile();

    return {
      success: true,
      transactionId: `TXN-${Date.now().toString().slice(-6)}`,
      plan,
      billingCycle: billingCycle || 'Monthly',
      paymentMethod: paymentMethod || 'upi',
      enrolledAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (billingCycle === 'annual' ? 365 : 30) * 86400000).toISOString()
    };
  }

  // Facilities & Inquiries
  getFacilities() {
    return this.facilities;
  }

  getTestimonials() {
    return this.testimonials;
  }

  createInquiry(inquiryData) {
    const inquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      createdAt: new Date().toISOString()
    };
    this.inquiries.push(inquiry);
    this.saveToFile();
    return inquiry;
  }

  resetDemo() {
    this.users = [{ ...INITIAL_USER }];
    this.bookings = [...INITIAL_BOOKINGS];
    this.activeUserSession = { ...INITIAL_USER };
    this.saveToFile();
    return { success: true, message: 'Store reset to default state.' };
  }
}

export const store = new DataStore();
