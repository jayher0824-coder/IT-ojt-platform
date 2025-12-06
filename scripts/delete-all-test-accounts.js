const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../server/database/models/User');
const Company = require('../server/database/models/Company');
const Student = require('../server/database/models/Student');

async function deleteAllTestAccounts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all student and company users
    const studentUsers = await User.find({ role: 'student' });
    const companyUsers = await User.find({ role: 'company' });
    
    console.log(`Found ${studentUsers.length} student accounts`);
    console.log(`Found ${companyUsers.length} company accounts`);

    // Get user IDs
    const studentUserIds = studentUsers.map(user => user._id);
    const companyUserIds = companyUsers.map(user => user._id);

    // Delete Student profiles
    const studentProfilesResult = await Student.deleteMany({ 
      user: { $in: studentUserIds } 
    });
    console.log(`Deleted ${studentProfilesResult.deletedCount} student profiles`);

    // Delete Company profiles
    const companyProfilesResult = await Company.deleteMany({ 
      user: { $in: companyUserIds } 
    });
    console.log(`Deleted ${companyProfilesResult.deletedCount} company profiles`);

    // Delete Student user accounts
    const studentUsersResult = await User.deleteMany({ role: 'student' });
    console.log(`Deleted ${studentUsersResult.deletedCount} student user accounts`);

    // Delete Company user accounts
    const companyUsersResult = await User.deleteMany({ role: 'company' });
    console.log(`Deleted ${companyUsersResult.deletedCount} company user accounts`);

    console.log('\n✓ All student and company accounts have been deleted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error deleting accounts:', error);
    process.exit(1);
  }
}

deleteAllTestAccounts();
