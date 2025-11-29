const jwt = require('jsonwebtoken');
const User = require('../../database/models/User');

// Protect routes - check if user is authenticated
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from token
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No user found with this token',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is deactivated',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Check if student has completed assessment
const requireAssessment = async (req, res, next) => {
  if (req.user.role === 'student') {
    const Student = require('../../database/models/Student');
    const student = await Student.findOne({ user: req.user._id });
    
    if (!student || !student.assessmentCompleted) {
      return res.status(403).json({
        success: false,
        message: 'Assessment must be completed before accessing this resource',
        requiresAssessment: true,
      });
    }
  }
  next();
};

module.exports = { protect, authorize, requireAssessment };
