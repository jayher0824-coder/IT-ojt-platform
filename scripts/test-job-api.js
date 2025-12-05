// Simple test to fetch job details via API
const jobId = '6926c9015db6ba2c9e19678c'; // IT Tech support job

fetch(`http://localhost:3000/api/jobs/${jobId}`)
    .then(res => res.json())
    .then(data => {
        console.log('=== API RESPONSE ===');
        console.log(JSON.stringify(data, null, 2));
        
        if (data.success && data.data) {
            const job = data.data;
            console.log('\n=== ASSESSMENT FIELDS ===');
            console.log('requireCustomAssessment:', job.requireCustomAssessment);
            console.log('customAssessment:', job.customAssessment);
            console.log('Assessment check:', job.requireCustomAssessment || job.customAssessment ? '✅ WILL SHOW' : '❌ WILL NOT SHOW');
        }
    })
    .catch(err => console.error('Error:', err));
