const express = require('express');
const { addNote, getNotes } = require('../controllers/noteController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:leadId').post(protect, addNote).get(protect, getNotes);

module.exports = router;