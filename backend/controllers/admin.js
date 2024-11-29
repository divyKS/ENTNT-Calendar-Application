const company = require('../models/company');

const addCompany = async (req, res) => {
    try {
        const { name, location, linkedinProfile, emails, phoneNumbers, comments, communicationPeriodicity, communications } = req.body;

        const newCompany = new company({
            name,
            location,
            linkedinProfile,
            emails,
            phoneNumbers,
            comments,
            communicationPeriodicity,
            communications,
        });

        const savedCompany = await newCompany.save();
        res.status(201).json({ message: 'Company added successfully', company: savedCompany });
    } catch (error) {
        res.status(500).json({ message: 'Error adding company', error });
    }
}

const getCompanies = async (req, res) => {
    try {
        // const companies = await company.find({}, 'name location'); // Fetch name and location fields only
        const companies = await company.find({});
        res.status(200).json(companies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch companies.' });
    }
}

const editCompany = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedCompany = await company.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedCompany) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json(updatedCompany);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update company.' });
    }
}

const deleteCompany = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCompany = await company.findByIdAndDelete(id);
        if (!deletedCompany) {
            return res.status(404).json({ error: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete company.' });
    }
}

module.exports = { addCompany, getCompanies, editCompany, deleteCompany };
