const mongoose = require('mongoose');

const customAssessmentSubmissionSchema = new mongoose.Schema({
    assessment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomAssessment',
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        answer: String,
        isCorrect: Boolean,
        pointsEarned: Number
    }],
    score: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    passed: {
        type: Boolean,
        required: true
    },
    timeSpent: Number, // in seconds
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CustomAssessmentSubmission', customAssessmentSubmissionSchema);
