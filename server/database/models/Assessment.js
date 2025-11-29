const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'coding', 'true-false', 'short-answer'],
    required: true,
  },
  options: [String], // For multiple choice questions
  correctAnswer: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  category: {
    type: String,
    enum: ['programming', 'database', 'webDevelopment', 'networking', 'problemSolving'],
    required: true,
  },
  points: {
    type: Number,
    default: 1,
  },
  explanation: String,
});

const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  questions: [questionSchema],
  timeLimit: {
    type: Number, // in minutes
    required: true,
  },
  passingScore: {
    type: Number,
    required: true,
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['general', 'programming', 'database', 'webDevelopment', 'networking', 'problemSolving'],
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const assessmentResultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  assessment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment',
    required: true,
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    answer: String,
    isCorrect: Boolean,
    points: Number,
  }],
  score: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
  timeSpent: Number, // in minutes
  startedAt: {
    type: Date,
    required: true,
  },
  completedAt: {
    type: Date,
    required: true,
  },
  categoryScores: {
    programming: Number,
    database: Number,
    webDevelopment: Number,
    networking: Number,
    problemSolving: Number,
  },
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
const AssessmentResult = mongoose.model('AssessmentResult', assessmentResultSchema);

module.exports = { Assessment, AssessmentResult };
