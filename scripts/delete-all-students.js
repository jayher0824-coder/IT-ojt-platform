const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Student = require('../server/database/models/Student');
const User = require('../server/database/models/User');

async function deleteAllStudents() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Count students before deletion
    const studentCount = await Student.countDocuments();
    const studentUserCount = await User.countDocuments({ role: 'student' });

    console.log(`\nFound ${studentCount} student profiles`);
    console.log(`Found ${studentUserCount} student user accounts`);

    // Ask for confirmation
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('\n⚠️  Are you sure you want to delete ALL student accounts? (yes/no): ', async (answer) => {
      if (answer.toLowerCase() === 'yes') {
        console.log('\nDeleting all student accounts...');

        // Delete all student profiles
        const studentResult = await Student.deleteMany({});
        console.log(`✅ Deleted ${studentResult.deletedCount} student profiles`);

        // Delete all user accounts with role 'student'
        const userResult = await User.deleteMany({ role: 'student' });
        console.log(`✅ Deleted ${userResult.deletedCount} student user accounts`);

        console.log('\n✅ All student accounts have been deleted successfully!');
      } else {
        console.log('\n❌ Deletion cancelled.');
      }

      readline.close();
      await mongoose.connection.close();
      console.log('\nDatabase connection closed.');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

deleteAllStudents();
