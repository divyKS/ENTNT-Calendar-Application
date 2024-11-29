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
        const companies = await company.find({}, 'name location'); // Fetch name and location fields only
        res.status(200).json(companies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch companies.' });
    }
}

module.exports = { addCompany, getCompanies };
