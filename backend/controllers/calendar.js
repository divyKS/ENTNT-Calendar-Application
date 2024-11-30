const companySchema = require('../models/company')

const getCalendarCommunications = async (req, res) => {
    try {
        const communications = await companySchema.find()
            .populate('communications')
            .select('name communications');

        const data = {
            past: [],
            upcoming: [],
        };

        const currentDate = new Date();

        communications.forEach((company) => {
            company.communications.forEach((comm) => {
                if (comm.dateDue <= currentDate) {
                    data.past.push({
                        companyName: company.name,
                        method: comm.method,
                        date: comm.dateDue,
                        notes: comm.notes || '',
                    });
                } else {
                    data.upcoming.push({
                        companyName: company.name,
                        method: comm.method,
                        date: comm.dateDue,
                    });
                }
            });
        });

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch communications for calendar.' });
    }
};

module.exports = { getCalendarCommunications };