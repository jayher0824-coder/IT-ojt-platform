const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../server/database/models/User');
const Company = require('../server/database/models/Company');

async function deleteAllCompanies() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find all company users
    const companyUsers = await User.find({ role: 'company' });
    console.log(`Found ${companyUsers.length} company user accounts`);

    if (companyUsers.length === 0) {
      console.log('No company accounts to delete');
      await mongoose.connection.close();
      return;
    }

    // Get company user IDs
    const companyUserIds = companyUsers.map(user => user._id);

    // Delete all Company profiles
    const companyProfilesResult = await Company.deleteMany({ 
      user: { $in: companyUserIds } 
    });
    console.log(`Deleted ${companyProfilesResult.deletedCount} company profiles`);

    // Delete all company User accounts
    const companyUsersResult = await User.deleteMany({ role: 'company' });
    console.log(`Deleted ${companyUsersResult.deletedCount} company user accounts`);

    console.log('\n✓ All company accounts have been deleted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error deleting company accounts:', error);
    process.exit(1);
  }
}

deleteAllCompanies();
