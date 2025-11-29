const mongoose = require('mongoose');
require('dotenv').config();

const { AssessmentResult } = require('../server/database/models/Assessment');
const Student = require('../server/database/models/Student');

async function checkAssessmentResults() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform');
        console.log('✓ Connected to MongoDB');

        const results = await AssessmentResult.find({})
            .populate('student', 'firstName lastName')
            .populate('assessment', 'title');
        
        console.log(`\n✓ Found ${results.length} assessment result(s):\n`);
        
        results.forEach((result, index) => {
            console.log(`${index + 1}. Student: ${result.student?.firstName} ${result.student?.lastName}`);
            console.log(`   Assessment: ${result.assessment?.title}`);
            console.log(`   Score: ${result.percentage}%`);
            console.log(`   Passed: ${result.passed}`);
            console.log(`   Completed: ${result.completedAt}`);
            console.log(`   Result ID: ${result._id}\n`);
        });

        await mongoose.disconnect();
        console.log('✓ Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkAssessmentResults();
