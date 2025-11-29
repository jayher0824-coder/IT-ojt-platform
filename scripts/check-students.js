const mongoose = require('mongoose');
const Student = require('../server/database/models/Student');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform';

async function checkStudents() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Find all students
    const students = await Student.find({}).select('_id studentId firstName lastName user');

    console.log(`\nTotal students: ${students.length}\n`);

    students.forEach((student, index) => {
      console.log(`${index + 1}. Student ID: ${student._id}`);
      console.log(`   Name: ${student.firstName} ${student.lastName}`);
      console.log(`   StudentId: ${student.studentId || 'MISSING'}`);
      console.log(`   User: ${student.user}`);
      console.log('');
    });

    // Count students without studentId
    const missingCount = students.filter(s => !s.studentId).length;
    console.log(`Students without studentId: ${missingCount}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkStudents();
