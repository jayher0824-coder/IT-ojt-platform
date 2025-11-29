const mongoose = require('mongoose');
require('dotenv').config();

const { Assessment } = require('../server/database/models/Assessment');

async function checkQuestions() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/it-ojt-platform');
        console.log('✓ Connected to MongoDB');

        const assessment = await Assessment.findOne({ title: 'IT Skills Assessment' });
        
        if (!assessment) {
            console.log('No assessment found');
            await mongoose.disconnect();
            return;
        }

        console.log(`\n✓ Found assessment: ${assessment.title}`);
        console.log(`✓ Total questions: ${assessment.questions.length}\n`);

        // Show first question from each category
        const categories = ['programming', 'database', 'webDevelopment', 'networking', 'problemSolving'];
        
        categories.forEach(cat => {
            const question = assessment.questions.find(q => q.category === cat);
            if (question) {
                console.log(`\n${cat.toUpperCase()}:`);
                console.log(`Question: ${question.question}`);
                console.log(`Type: ${question.type}`);
                console.log(`Options: ${JSON.stringify(question.options)}`);
                console.log(`Answer: ${question.correctAnswer}`);
            }
        });

        await mongoose.disconnect();
        console.log('\n✓ Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkQuestions();
