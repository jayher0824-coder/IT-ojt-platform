const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const resetPasswords = async () => {
  try {
    console.log('Resetting passwords for test accounts...');
    
    // Reset admin password
    const admin = await User.findOne({ email: 'admin@itojtplatform.com' });
    if (admin) {
      admin.password = 'admin123';
      await admin.save();
      console.log('✓ Admin password reset to: admin123');
    }
    
    // Reset student passwords
    const students = await User.find({ role: 'student' });
    for (const student of students) {
      student.password = 'student123';
      await student.save();
      console.log(`✓ Student password reset for ${student.email}: student123`);
    }
    
    // Reset company passwords
    const companies = await User.find({ role: 'company' });
    for (const company of companies) {
      company.password = 'company123';
      await company.save();
      console.log(`✓ Company password reset for ${company.email}: company123`);
    }
    
    console.log('\n=== Login Credentials ===');
    console.log('Admin: admin@itojtplatform.com / admin123');
    console.log('Students: [student-email] / student123');
    console.log('Companies: [company-email] / company123');
    console.log('=========================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting passwords:', error);
    process.exit(1);
  }
};

resetPasswords();
