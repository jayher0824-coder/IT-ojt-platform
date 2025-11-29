const mongoose = require('mongoose');
require('dotenv').config();

const { AssessmentResult } = require('../server/database/models/Assessment');

async function clearAssessmentResults() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform');
        console.log('✓ Connected to MongoDB');

        const result = await AssessmentResult.deleteMany({});
        console.log(`✓ Deleted ${result.deletedCount} assessment results`);

        await mongoose.disconnect();
        console.log('✓ Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

clearAssessmentResults();
