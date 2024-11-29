const companySchema = require('../models/company');
const communicationLog = require('../models/communicationLog')

const getCompaniesInfoForUserDashboard = async (req, res) => {
    try {
        const companies = await companySchema.find({});

        const dashboardData = await Promise.all(
            companies.map(async (company) => {
                const lastFiveCommunications = await communicationLog.find({ companyId: company._id })
                    .sort({ date: -1 })
                    .limit(5);

                return {
                    companyId: company._id,
                    companyName: company.name,
                    lastFiveCommunications,
                    nextCommunication: company.nextCommunication,
                };
            })
        );
        res.status(200).json(dashboardData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch dashboard data.' });
    }
};

const logCommunication = async (req, res) => {
    const { companyId, type, date, notes } = req.body;
    try {
        const log = await communicationLog.create({ companyId, type, date, notes });

        // Update next communication for the company
        const company = await companySchema.findById(companyId);

        if (company) {
            const nextCommunicationIndex = company.communications.findIndex(
                (nextComm) => nextComm.method === type
            );

            const nextCommunication = nextCommunicationIndex >= 0
                ? company.communications[nextCommunicationIndex + 1]
                : null;

            await companySchema.findByIdAndUpdate(companyId, {
                nextCommunication: nextCommunication
                    ? { type: nextCommunication.method, date: new Date(date).setDate(new Date(date).getDate() + parseInt(company.communicationPeriodicity))}
                    : null,
            });
        }

        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: 'Failed to log communication.' });
    }
}

module.exports = { getCompaniesInfoForUserDashboard, logCommunication };