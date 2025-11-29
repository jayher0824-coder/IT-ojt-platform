require('dotenv').config();
const mongoose = require('mongoose');
const { AssessmentResult } = require('../server/database/models/Assessment');
const Student = require('../server/database/models/Student');
const User = require('../server/database/models/User');

async function debugAssessmentResults() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ojt-platform');
    console.log('✅ Connected to MongoDB\n');

    // Get all users with student role
    const users = await User.find({ role: 'student' });
    console.log(`📊 Total student users: ${users.length}\n`);

    for (const user of users) {
      console.log('━'.repeat(60));
      console.log(`👤 User: ${user.name} (${user.email})`);
      console.log(`   User ID: ${user._id}`);

      // Find student profile
      const student = await Student.findOne({ user: user._id });
      if (!student) {
        console.log('   ⚠️  No Student profile found');
        continue;
      }
      console.log(`   Student ID: ${student._id}`);
      console.log(`   Student Number: ${student.studentId}`);

      // Find assessment results
      const results = await AssessmentResult.find({ student: student._id })
        .populate('assessment', 'title');
      
      console.log(`   📝 Assessment Results: ${results.length}`);
      
      if (results.length > 0) {
        results.forEach((result, idx) => {
          console.log(`      ${idx + 1}. ${result.assessment?.title || 'Unknown'}`);
          console.log(`         Score: ${result.percentage}% (${result.passed ? 'Passed' : 'Failed'})`);
          console.log(`         Completed: ${result.completedAt}`);
        });
      }
      console.log('');
    }

    // Check for orphaned results (results with invalid student references)
    console.log('━'.repeat(60));
    console.log('🔍 Checking for orphaned results...\n');
    
    const allResults = await AssessmentResult.find({});
    console.log(`Total assessment results in database: ${allResults.length}\n`);

    for (const result of allResults) {
      const student = await Student.findById(result.student);
      if (!student) {
        console.log(`⚠️  Orphaned result found: ${result._id}`);
        console.log(`   Student ID: ${result.student}`);
        console.log(`   Score: ${result.percentage}%`);
        console.log(`   Completed: ${result.completedAt}`);
        
        // Try to find if this is actually a User ID
        const user = await User.findById(result.student);
        if (user) {
          console.log(`   ❌ This is a User ID, not a Student ID!`);
          console.log(`   User: ${user.name} (${user.email})`);
          
          // Find or create the correct student profile
          let correctStudent = await Student.findOne({ user: user._id });
          if (!correctStudent) {
            console.log(`   Creating student profile for this user...`);
            correctStudent = await Student.create({
              user: user._id,
              studentId: `STU${Date.now()}`,
              firstName: user.name?.split(' ')[0] || 'Unknown',
              lastName: user.name?.split(' ')[1] || 'Student',
              dateOfBirth: new Date('2000-01-01'),
              phone: '0000000000',
            });
            console.log(`   ✅ Created student profile: ${correctStudent._id}`);
          } else {
            console.log(`   Found correct student profile: ${correctStudent._id}`);
          }
          
          // Update the result with correct student ID
          result.student = correctStudent._id;
          await result.save();
          console.log(`   ✅ Fixed: Updated result to reference correct student ID`);
        }
        console.log('');
      }
    }

    console.log('━'.repeat(60));
    console.log('✅ Debug complete!\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  }
}

debugAssessmentResults();
