const mongoose = require('mongoose');
const User = require('../server/database/models/User');
const Student = require('../server/database/models/Student');
const { AssessmentResult } = require('../server/database/models/Assessment');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform';

async function deleteUser(email) {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the user
    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      return;
    }

    console.log(`Found user: ${user.email} (Role: ${user.role})`);

    // If student, delete related data
    if (user.role === 'student') {
      // Find student profile
      const student = await Student.findOne({ user: user._id });
      
      if (student) {
        console.log(`Found student profile for: ${student.firstName} ${student.lastName}`);
        
        // Delete assessment results
        const assessmentResults = await AssessmentResult.deleteMany({ student: student._id });
        console.log(`✓ Deleted ${assessmentResults.deletedCount} assessment results`);
        
        // Delete student profile
        await Student.findByIdAndDelete(student._id);
        console.log(`✓ Deleted student profile`);
      }
    }

    // Delete the user account
    await User.findByIdAndDelete(user._id);
    console.log(`✓ Deleted user account: ${email}`);
    
    console.log('\n✅ Account deletion completed successfully!');

  } catch (error) {
    console.error('❌ Error deleting user:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Get email from command line argument
const emailToDelete = process.argv[2] || 'jhernandez6129val@fatima.student.edu.ph';

console.log(`\n🗑️  Deleting account: ${emailToDelete}\n`);

deleteUser(emailToDelete);
