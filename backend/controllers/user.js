const company = require('../models/company');
const communicationLog = require('../models/communicationLog')

const getCompaniesInfoForUserDashboard = async (req, res) => {
    try {
        const companies = await company.find({});

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

module.exports = { getCompaniesInfoForUserDashboard };