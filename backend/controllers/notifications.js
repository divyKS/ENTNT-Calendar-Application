const company = require("../models/company");

const tasksOverDueAndDueToday = async (req, res) => {
    try {
        const currentDate = new Date();
        const startOfToday = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        );

        // Fetch overdue communications
        const overdueCompanies = await company.find({
            'nextCommunication.date': { $lt: startOfToday },
        }).select({});

        // Fetch today's communications
        const todayCompanies = await company.find({
            'nextCommunication.date': { $gte: startOfToday, $lt: new Date(startOfToday).setDate(startOfToday.getDate() + 1) },
        }).select({});

        res.status(200).json({
            overdue: overdueCompanies,
            today: todayCompanies,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
}

module.exports = { tasksOverDueAndDueToday, }