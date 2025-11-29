const mongoose = require('mongoose');
const Student = require('../server/database/models/Student');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform';

async function fixStudentIds() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Find all students without a studentId
    const studentsWithoutId = await Student.find({
      $or: [
        { studentId: { $exists: false } },
        { studentId: null },
        { studentId: '' }
      ]
    });

    console.log(`Found ${studentsWithoutId.length} students without studentId`);

    if (studentsWithoutId.length === 0) {
      console.log('All students have studentId. No action needed.');
      process.exit(0);
    }

    // Update each student with a unique studentId
    for (const student of studentsWithoutId) {
      const studentId = `STU${Date.now()}${Math.floor(Math.random() * 10000)}`;
      student.studentId = studentId;
      await student.save();
      console.log(`✓ Updated student ${student._id} with studentId: ${studentId}`);
    }

    console.log('\n✓ All students now have unique studentIds');
    console.log('Student ID fix completed successfully!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error fixing student IDs:', error);
    process.exit(1);
  }
}

fixStudentIds();
