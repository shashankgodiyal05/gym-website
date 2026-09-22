import { store } from '../store.js';

export const getPlans = (req, res) => {
  try {
    const plans = store.getMembershipPlans();
    return res.status(200).json({
      success: true,
      count: plans.length,
      plans
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve membership plans.',
      error: error.message
    });
  }
};

export const enroll = (req, res) => {
  try {
    const { planId, billingCycle, paymentMethod, paymentDetails } = req.body;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: 'planId is required to enroll in a membership.'
      });
    }

    const enrollment = store.enrollMembership({
      planId,
      billingCycle,
      paymentMethod
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: `Plan with ID '${planId}' does not exist.`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Successfully enrolled in ${enrollment.plan.name} (${enrollment.billingCycle})!`,
      enrollment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to process membership enrollment.',
      error: error.message
    });
  }
};

export const getActiveMembership = (req, res) => {
  try {
    const user = store.getActiveUser();
    const plans = store.getMembershipPlans();
    const currentPlan = plans.find((p) => p.id === user.membershipTier) || plans[1];

    return res.status(200).json({
      success: true,
      activeTier: user.membershipTier,
      plan: currentPlan,
      user: {
        name: user.name,
        email: user.email,
        memberSince: user.memberSince
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch active membership status.',
      error: error.message
    });
  }
};
