const Note = require('../models/Note');

const addNote = async (req, res) => {
  try {
    const note = await Note.create({ ...req.body, leadId: req.params.leadId });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ leadId: req.params.leadId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addNote, getNotes }