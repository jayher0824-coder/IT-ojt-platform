const mongoose = require('mongoose');
const Student = require('../server/database/models/Student');
const User = require('../server/database/models/User');
const { AssessmentResult } = require('../server/database/models/Assessment');

mongoose.connect('mongodb://localhost:27017/it-ojt-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function fixStudentData() {
  try {
    // Find the user jayher824@gmail.com
    const user = await User.findOne({ email: 'jayher824@gmail.com' });
    
    if (!user) {
      console.log('User not found!');
      return;
    }
    
    console.log('Found user:', user.email, '(ID:', user._id + ')');
    
    // Check if student profile exists
    let student = await Student.findOne({ user: user._id });
    
    if (!student) {
      console.log('Creating student profile...');
      student = new Student({
        user: user._id,
        firstName: user.firstName || 'Jay',
        lastName: user.lastName || 'Hernandez',
        email: user.email,
        studentId: 'STU' + Date.now(),
        phone: '09123456789',
        dateOfBirth: new Date('2000-01-01'),
        course: 'IT',
        yearLevel: 4,
        skills: [],
        assessmentCompleted: true,
      });
      await student.save();
      console.log('Student profile created with ID:', student._id);
    } else {
      console.log('Student profile already exists with ID:', student._id);
    }
    
    // Update all assessment results to reference the correct student
    const oldStudentId = '690d13c43b2fd4fc604eef3a';
    console.log('\nUpdating assessment results...');
    
    const updateResult = await AssessmentResult.updateMany(
      { student: oldStudentId },
      { $set: { student: student._id } }
    );
    
    console.log('Updated', updateResult.modifiedCount, 'assessment results');
    console.log('\nFix complete!');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

fixStudentData();
