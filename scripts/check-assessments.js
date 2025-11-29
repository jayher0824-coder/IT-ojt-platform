const mongoose = require('mongoose');
const { Assessment } = require('../server/database/models/Assessment');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform';

async function checkAssessments() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB\n');

    const assessments = await Assessment.find({});
    console.log(`Total assessments: ${assessments.length}\n`);

    assessments.forEach((assessment, index) => {
      console.log(`${index + 1}. Assessment: ${assessment.title}`);
      console.log(`   Category: ${assessment.category}`);
      console.log(`   Questions: ${assessment.questions.length}`);
      console.log(`   Active: ${assessment.isActive}`);
      
      // Count questions by category
      const categoryCount = {};
      assessment.questions.forEach(q => {
        categoryCount[q.category] = (categoryCount[q.category] || 0) + 1;
      });
      
      console.log(`   Question breakdown:`);
      Object.entries(categoryCount).forEach(([cat, count]) => {
        console.log(`     - ${cat}: ${count}`);
      });
      console.log('');
    });

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkAssessments();
