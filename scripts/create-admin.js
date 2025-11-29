const mongoose = require('mongoose');
const User = require('../models/user.js');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdmin = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@itojtplatform.com' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      email: 'admin@itojtplatform.com',
      password: 'admin123', // This will be hashed automatically by the User model
      role: 'admin',
      isActive: true,
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@itojtplatform.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login.');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();
