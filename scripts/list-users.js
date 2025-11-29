const mongoose = require('mongoose');
const User = require('../server/database/models/User');
const Student = require('../server/database/models/Student');
const Company = require('../server/database/models/Company');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform';

async function listUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Get search term from command line
    const searchTerm = process.argv[2] || '';

    // Find users
    let query = {};
    if (searchTerm) {
      query = { email: { $regex: searchTerm, $options: 'i' } };
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    
    console.log(`📋 Found ${users.length} user(s):\n`);

    for (const user of users) {
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`Email: ${user.email}`);
      console.log(`Role: ${user.role}`);
      console.log(`Created: ${user.createdAt}`);
      console.log(`User ID: ${user._id}`);

      if (user.role === 'student') {
        const student = await Student.findOne({ user: user._id });
        if (student) {
          console.log(`Student: ${student.firstName} ${student.lastName}`);
          console.log(`Student ID: ${student.studentId}`);
        }
      } else if (user.role === 'company') {
        const company = await Company.findOne({ user: user._id });
        if (company) {
          console.log(`Company: ${company.name}`);
        }
      }
      console.log('');
    }

    if (users.length === 0) {
      console.log('No users found matching the criteria.');
    }

  } catch (error) {
    console.error('❌ Error listing users:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

listUsers();
