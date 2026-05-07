const express = require('express');
const { createLead, getLeads, getLeadById, updateLead, deleteLead, getDashboardData } = require('../controllers/leadController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard', protect, getDashboardData);
router.route('/').get(protect, getLeads).post(protect, createLead);
router.route('/:id').get(protect, getLeadById).put(protect, updateLead).delete(protect, deleteLead);

module.exports = router;