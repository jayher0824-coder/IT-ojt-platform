const mongoose = require('mongoose');
const Student = require('../server/database/models/Student');
const User = require('../server/database/models/User');
const { AssessmentResult } = require('../server/database/models/Assessment');

mongoose.connect('mongodb://localhost:27017/it-ojt-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentId = '690d13c43b2fd4fc604eef3a';

async function checkAndFix() {
  try {
    console.log('Checking for student:', studentId);
    
    const student = await Student.findById(studentId);
    console.log('Student found:', student ? 'YES' : 'NO');
    
    if (!student) {
      console.log('\nLooking for assessment results with this student ID...');
      const results = await AssessmentResult.find({ student: studentId });
      console.log('Found', results.length, 'assessment results');
      
      if (results.length > 0) {
        console.log('\nLooking for current user to find correct student...');
        // Let's find the current logged-in user's student profile
        const users = await User.find({ role: 'student' }).limit(5);
        console.log('\nFound', users.length, 'student users:');
        
        for (const user of users) {
          const studentProfile = await Student.findOne({ user: user._id });
          if (studentProfile) {
            console.log(`- User: ${user.email}, Student ID: ${studentProfile._id}`);
          } else {
            console.log(`- User: ${user.email}, NO STUDENT PROFILE`);
          }
        }
        
        console.log('\n--- FIX OPTION ---');
        console.log('You need to update the assessment results to reference the correct student ID.');
        console.log('Run this in MongoDB:');
        console.log(`db.assessmentresults.updateMany({ student: ObjectId("${studentId}") }, { $set: { student: ObjectId("CORRECT_STUDENT_ID") } })`);
      }
    } else {
      console.log('Student details:', JSON.stringify(student, null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkAndFix();
