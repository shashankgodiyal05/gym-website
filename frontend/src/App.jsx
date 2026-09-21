import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { GymProvider } from './context/GymContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import BookingModal from './components/BookingModal';
import CheckoutModal from './components/CheckoutModal';

import Home from './pages/Home';
import About from './pages/About';
import SlotBooking from './pages/SlotBooking';
import Membership from './pages/Membership';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';

// Auto scroll to top on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  // Global modal state
  const [selectedTrainerForBooking, setSelectedTrainerForBooking] = useState(null);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [checkoutBillingCycle, setCheckoutBillingCycle] = useState('annual');

  const handleOpenBookingModal = (trainer) => {
    setSelectedTrainerForBooking(trainer);
  };

  const handleCloseBookingModal = () => {
    setSelectedTrainerForBooking(null);
  };

  const handleOpenCheckoutModal = (plan, billingCycle = 'annual') => {
    setSelectedPlanForCheckout(plan);
    setCheckoutBillingCycle(billingCycle);
  };

  const handleCloseCheckoutModal = () => {
    setSelectedPlanForCheckout(null);
  };

  return (
    <GymProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0A0D14] text-slate-100 font-sans selection:bg-[#CCFF00] selection:text-black">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    onOpenBookingModal={handleOpenBookingModal}
                    onOpenCheckoutModal={handleOpenCheckoutModal}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/book-slot"
                element={<SlotBooking onOpenBookingModal={handleOpenBookingModal} />}
              />
              <Route
                path="/membership"
                element={<Membership onOpenCheckoutModal={handleOpenCheckoutModal} />}
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/my-bookings"
                element={
                  <MyBookings
                    onOpenBookingModal={handleOpenBookingModal}
                    onOpenCheckoutModal={handleOpenCheckoutModal}
                  />
                }
              />
              <Route
                path="*"
                element={
                  <Home
                    onOpenBookingModal={handleOpenBookingModal}
                    onOpenCheckoutModal={handleOpenCheckoutModal}
                  />
                }
              />
            </Routes>
          </main>

          <Footer />
          <Toast />

          {/* Trainer Slot Booking Modal */}
          {selectedTrainerForBooking && (
            <BookingModal
              trainer={selectedTrainerForBooking}
              onClose={handleCloseBookingModal}
            />
          )}

          {/* Membership Checkout Modal */}
          {selectedPlanForCheckout && (
            <CheckoutModal
              plan={selectedPlanForCheckout}
              billingCycle={checkoutBillingCycle}
              onClose={handleCloseCheckoutModal}
            />
          )}
        </div>
      </Router>
    </GymProvider>
  );
}
