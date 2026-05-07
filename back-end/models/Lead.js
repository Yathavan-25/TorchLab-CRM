const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    leadName: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    leadSource: { type: String, required: true },
    assignedSalesperson: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
      default: 'New',
    },
    dealValue: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', LeadSchema);