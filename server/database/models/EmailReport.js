const mongoose = require('mongoose');

const emailReportSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  subject: {
    type: String,
    required: true,
    maxlength: 300,
  },
  content: {
    type: String,
    required: true,
  },
  emailType: {
    type: String,
    enum: ['welcome', 'assessment_reminder', 'job_match', 'application_update', 'password_reset', 'system_notification', 'admin_notification'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed', 'bounced'],
    default: 'pending',
  },
  sentAt: Date,
  readAt: Date,
  isRead: {
    type: Boolean,
    default: false,
  },
  metadata: {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    assessmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assessment',
    },
    applicationId: String,
    additionalData: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('EmailReport', emailReportSchema);
