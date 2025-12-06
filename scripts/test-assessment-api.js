const axios = require('axios');
require('dotenv').config();

// Test the assessment API endpoint
async function testAssessmentAPI() {
    try {
        // First, login as a student to get a token
        console.log('1. Logging in as test student...');
        const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
            email: 'test@student.fatima.edu.ph',
            password: 'Test123!'
        });
        
        if (!loginResponse.data.success) {
            console.error('Login failed:', loginResponse.data.message);
            return;
        }
        
        const token = loginResponse.data.token;
        console.log('✓ Login successful, token received');
        
        // Now test the assessments endpoint
        console.log('\n2. Fetching assessments...');
        const assessmentResponse = await axios.get('http://localhost:3000/api/assessments', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('✓ Assessment API response:');
        console.log('  Success:', assessmentResponse.data.success);
        console.log('  Count:', assessmentResponse.data.count);
        console.log('  Data length:', assessmentResponse.data.data.length);
        
        if (assessmentResponse.data.data.length > 0) {
            const assessment = assessmentResponse.data.data[0];
            console.log('\nAssessment details:');
            console.log('  ID:', assessment._id);
            console.log('  Title:', assessment.title);
            console.log('  Category:', assessment.category);
            console.log('  Is Active:', assessment.isActive);
            console.log('  Questions count:', assessment.questions ? assessment.questions.length : 0);
            
            if (assessment.questions && assessment.questions.length > 0) {
                console.log('\nFirst question:');
                const q = assessment.questions[0];
                console.log('  Question:', q.question);
                console.log('  Category:', q.category);
                console.log('  Has options:', !!q.options);
                console.log('  Options count:', q.options ? q.options.length : 0);
            }
        } else {
            console.log('\n❌ No assessments returned!');
        }
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testAssessmentAPI();
