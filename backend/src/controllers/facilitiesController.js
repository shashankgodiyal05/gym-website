import { store } from '../store.js';

export const getFacilities = (req, res) => {
  try {
    const facilities = store.getFacilities();
    const testimonials = store.getTestimonials();

    return res.status(200).json({
      success: true,
      facilities,
      testimonials
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve facilities data.',
      error: error.message
    });
  }
};

export const submitInquiry = (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required for inquiries.'
      });
    }

    const inquiry = store.createInquiry({
      name,
      email,
      phone: phone || '',
      message: message || 'Interested in trial membership.',
      subject: subject || 'General Inquiry'
    });

    return res.status(201).json({
      success: true,
      message: `Thank you, ${name}! Your inquiry has been logged. Our membership team will reach out within 2 hours.`,
      inquiry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry.',
      error: error.message
    });
  }
};
