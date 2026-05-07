const Lead = require('../models/Lead');

const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLeads = async (req, res) => {
  try {
    const { status, source, salesperson } = req.query;
    let query = {};
    if (status) query.status = status;
    if (source) query.source = source;
    if (salesperson) query.salesperson = salesperson;

    const leads = await Lead.find(query);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const leads = await Lead.find({});
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const qualifiedLeads = leads.filter(l => l.status === 'Qualified').length;
    const wonLeads = leads.filter(l => l.status === 'Won').length;
    const lostLeads = leads.filter(l => l.status === 'Lost').length;

    const totalDealValue = leads.reduce((acc, curr) => acc + (curr.dealValue || 0), 0);
    const totalWonValue = leads.filter(l => l.status === 'Won').reduce((acc, curr) => acc + (curr.dealValue || 0), 0);

    res.json({ totalLeads, newLeads, qualifiedLeads, wonLeads, lostLeads, totalDealValue, totalWonValue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead, getDashboardData}