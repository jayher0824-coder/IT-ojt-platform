require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../server/database/models/Job');
const CustomAssessment = require('../server/database/models/CustomAssessment');

async function fixJobAssessments() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB\n');

        // Get all custom assessments
        const assessments = await CustomAssessment.find({ isActive: true });
        console.log(`Found ${assessments.length} active assessments\n`);

        let fixed = 0;
        let alreadyCorrect = 0;
        let errors = 0;

        for (const assessment of assessments) {
            console.log(`\nProcessing assessment: ${assessment.title}`);
            console.log(`  Assessment ID: ${assessment._id}`);
            console.log(`  Job ID: ${assessment.job}`);
            
            try {
                const job = await Job.findById(assessment.job);
                
                if (!job) {
                    console.log(`  ❌ Job not found - assessment references non-existent job`);
                    errors++;
                    continue;
                }

                console.log(`  Job found: "${job.title}"`);
                console.log(`  Current requireCustomAssessment: ${job.requireCustomAssessment}`);
                console.log(`  Current customAssessment: ${job.customAssessment || 'null'}`);

                // Check if needs fixing
                const needsFix = !job.requireCustomAssessment || 
                                job.customAssessment?.toString() !== assessment._id.toString();

                if (needsFix) {
                    console.log(`  ⚠️  Needs fixing...`);
                    
                    job.requireCustomAssessment = true;
                    job.customAssessment = assessment._id;
                    await job.save();
                    
                    console.log(`  ✅ FIXED - Job updated successfully`);
                    console.log(`     New requireCustomAssessment: true`);
                    console.log(`     New customAssessment: ${assessment._id}`);
                    fixed++;
                } else {
                    console.log(`  ✅ Already correct - no changes needed`);
                    alreadyCorrect++;
                }

            } catch (error) {
                console.log(`  ❌ Error processing: ${error.message}`);
                errors++;
            }
        }

        console.log('\n\n=== SUMMARY ===');
        console.log(`Total assessments processed: ${assessments.length}`);
        console.log(`✅ Fixed: ${fixed}`);
        console.log(`✓ Already correct: ${alreadyCorrect}`);
        console.log(`❌ Errors: ${errors}`);

        if (fixed > 0) {
            console.log(`\n🎉 Successfully fixed ${fixed} job(s)!`);
            console.log('The custom assessments should now appear properly in the frontend.');
        }

    } catch (error) {
        console.error('Fatal error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

fixJobAssessments();
