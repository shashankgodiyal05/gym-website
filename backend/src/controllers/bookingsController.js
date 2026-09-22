import { store } from '../store.js';

export const getBookings = (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = store.getBookings(userId);

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings.',
      error: error.message
    });
  }
};

export const createBooking = (req, res) => {
  try {
    const { trainerId, trainerName, trainerRole, trainerAvatar, date, timeSlot, price, focus } = req.body;

    if (!trainerId || !date || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'trainerId, date, and timeSlot are required.'
      });
    }

    // Lookup trainer if name/avatar omitted
    let trainerInfo = {
      trainerName,
      trainerRole,
      trainerAvatar,
      price
    };

    if (!trainerName) {
      const trainer = store.getTrainerById(trainerId);
      if (trainer) {
        trainerInfo.trainerName = trainer.name;
        trainerInfo.trainerRole = trainer.role;
        trainerInfo.trainerAvatar = trainer.avatar;
        trainerInfo.price = trainer.sessionPrice;
      }
    }

    const booking = store.createBooking({
      trainerId,
      ...trainerInfo,
      date,
      timeSlot,
      focus
    });

    return res.status(201).json({
      success: true,
      message: `Session booked with ${booking.trainerName} for ${date} (${timeSlot})!`,
      booking
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create booking.',
      error: error.message
    });
  }
};

export const cancelBooking = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = store.cancelBooking(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Booking with ID '${id}' not found.`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Session booking cancelled successfully. Slot has been released.',
      cancelledId: id
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to cancel booking.',
      error: error.message
    });
  }
};
