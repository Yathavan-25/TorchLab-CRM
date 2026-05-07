const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
    content: { type: String, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);