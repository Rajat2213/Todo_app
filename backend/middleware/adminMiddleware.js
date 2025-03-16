const { findUserById } = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await findUserById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Failed to verify admin role' });
  }
};

module.exports = adminMiddleware;