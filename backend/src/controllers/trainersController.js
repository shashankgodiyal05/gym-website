import { store } from '../store.js';

export const getTrainers = (req, res) => {
  try {
    const { category, search } = req.query;
    const trainers = store.getTrainers({ category, search });

    return res.status(200).json({
      success: true,
      count: trainers.length,
      trainers
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve trainers.',
      error: error.message
    });
  }
};

export const getTrainerById = (req, res) => {
  try {
    const { id } = req.params;
    const trainer = store.getTrainerById(id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: `Trainer with ID '${id}' not found.`
      });
    }

    return res.status(200).json({
      success: true,
      trainer
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve trainer details.',
      error: error.message
    });
  }
};

export const getTrainerSlots = (req, res) => {
  try {
    const { id } = req.params;
    const trainer = store.getTrainerById(id);

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: `Trainer with ID '${id}' not found.`
      });
    }

    // Generate 7-day schedule matrix
    const schedule = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const fullDate = d.toISOString().split('T')[0];

      schedule.push({
        date: fullDate,
        dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
        slots: trainer.availableSlots
      });
    }

    return res.status(200).json({
      success: true,
      trainerId: trainer.id,
      trainerName: trainer.name,
      sessionPrice: trainer.sessionPrice,
      schedule
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve slots.',
      error: error.message
    });
  }
};
