const mongoose = require('mongoose');
const AssessmentResult = require('../server/database/models/Assessment').AssessmentResult;

mongoose.connect('mongodb://localhost:27017/it-ojt-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const resultId = '6921cee0f791397aea5133b7';

async function checkResult() {
  try {
    console.log('Checking assessment result:', resultId);
    
    const result = await AssessmentResult.findById(resultId);
    console.log('\nRaw result:', JSON.stringify(result, null, 2));
    
    if (result) {
      console.log('\nStudent ID:', result.student);
      console.log('Assessment ID:', result.assessment);
      
      const populatedResult = await AssessmentResult.findById(resultId)
        .populate('student')
        .populate('assessment');
      
      console.log('\nPopulated student:', populatedResult.student);
      console.log('Populated assessment:', populatedResult.assessment);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

checkResult();
