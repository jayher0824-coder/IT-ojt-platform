require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('../server/database/models/Job');
const CustomAssessment = require('../server/database/models/CustomAssessment');
const Company = require('../server/database/models/Company');

async function checkJobAssessments() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB\n');

        // Get all jobs
        const jobs = await Job.find({}).populate('company', 'companyName');
        console.log(`Total jobs found: ${jobs.length}\n`);

        // Get all custom assessments
        const assessments = await CustomAssessment.find({});
        console.log(`Total custom assessments found: ${assessments.length}\n`);

        console.log('=== JOBS WITH ASSESSMENT FIELDS ===');
        for (const job of jobs) {
            if (job.requireCustomAssessment || job.customAssessment) {
                console.log(`\nJob: ${job.title}`);
                console.log(`  Company: ${job.company?.companyName || 'Unknown'}`);
                console.log(`  Job ID: ${job._id}`);
                console.log(`  requireCustomAssessment: ${job.requireCustomAssessment}`);
                console.log(`  customAssessment: ${job.customAssessment || 'null'}`);
                console.log(`  Status: ${job.status}`);
                
                // Check if assessment actually exists
                if (job.customAssessment) {
                    const assessment = await CustomAssessment.findById(job.customAssessment);
                    if (assessment) {
                        console.log(`  ✅ Assessment exists: "${assessment.title}" (${assessment.questions.length} questions)`);
                    } else {
                        console.log(`  ❌ Assessment NOT found in database (broken reference)`);
                    }
                }
            }
        }

        console.log('\n\n=== ASSESSMENTS AND THEIR JOBS ===');
        for (const assessment of assessments) {
            console.log(`\nAssessment: ${assessment.title}`);
            console.log(`  Assessment ID: ${assessment._id}`);
            console.log(`  Job ID: ${assessment.job}`);
            console.log(`  Questions: ${assessment.questions.length}`);
            console.log(`  Active: ${assessment.isActive}`);
            console.log(`  Created: ${assessment.createdAt}`);
            
            // Find the job
            const job = await Job.findById(assessment.job).populate('company', 'companyName');
            if (job) {
                console.log(`  ✅ Job exists: "${job.title}"`);
                console.log(`     Company: ${job.company?.companyName || 'Unknown'}`);
                console.log(`     Job.requireCustomAssessment: ${job.requireCustomAssessment}`);
                console.log(`     Job.customAssessment: ${job.customAssessment || 'null'}`);
                
                // Check if there's a mismatch
                if (!job.requireCustomAssessment || job.customAssessment?.toString() !== assessment._id.toString()) {
                    console.log(`  ⚠️  WARNING: Job doesn't properly reference this assessment!`);
                    console.log(`     Expected customAssessment: ${assessment._id}`);
                    console.log(`     Actual customAssessment: ${job.customAssessment || 'null'}`);
                    console.log(`     requireCustomAssessment: ${job.requireCustomAssessment}`);
                }
            } else {
                console.log(`  ❌ Job NOT found (broken reference)`);
            }
        }

        console.log('\n\n=== MISMATCHES SUMMARY ===');
        let mismatches = 0;
        
        for (const assessment of assessments) {
            const job = await Job.findById(assessment.job);
            if (job) {
                if (!job.requireCustomAssessment || job.customAssessment?.toString() !== assessment._id.toString()) {
                    mismatches++;
                    console.log(`\n❌ Mismatch found:`);
                    console.log(`   Job: ${job.title} (${job._id})`);
                    console.log(`   Assessment: ${assessment.title} (${assessment._id})`);
                    console.log(`   Issue: Job fields not properly set`);
                }
            }
        }
        
        if (mismatches === 0) {
            console.log('✅ No mismatches found! All assessments properly linked to jobs.');
        } else {
            console.log(`\n⚠️  Found ${mismatches} mismatch(es). Run fix-job-assessments.js to fix them.`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

checkJobAssessments();
