const company = require("../models/company");
const { startOfDay, isBefore, isToday } = require('date-fns')

const tasksOverDueAndDueToday = async (req, res) => {
    try {       
        const currentDate = new Date();
        const normalizedToday = startOfDay(currentDate); // Get the start of the current day

        const companies = await company.find().populate('communications');

        const overdue = [];
        const today = [];

        companies.forEach((company) => {
            company.communications.forEach((comm) => {
                const communicationDate = new Date(comm.dateDue); // Convert the due date to a Date object

                if (!comm.complete) {
                    // Use isBefore to check if the communication date is before today
                    if (isBefore(communicationDate, normalizedToday)) {
                        overdue.push({
                            companyId: company._id,
                            name: company.name,
                            method: comm.method,
                            dueDate: comm.dateDue
                        });
                    } else if (isToday(communicationDate)) { // Check if the communication is due today
                        today.push({
                            companyId: company._id,
                            name: company.name,
                            method: comm.method,
                            dueDate: comm.dateDue
                        });
                    }
                }
            });
        });     

        res.status(200).json({ overdue, today });
        // const currentDate = new Date();
        // const startOfToday = new Date(
        //     currentDate.getFullYear(),
        //     currentDate.getMonth(),
        //     currentDate.getDate()
        // );

        // // Fetch overdue communications
        // const overdueCompanies = await company.find({
        //     'nextCommunication.date': { $lt: startOfToday },
        // }).select({});

        // // Fetch today's communications
        // const todayCompanies = await company.find({
        //     'nextCommunication.date': { $gte: startOfToday, $lt: new Date(startOfToday).setDate(startOfToday.getDate() + 1) },
        // }).select({});

        // res.status(200).json({
        //     overdue: overdueCompanies,
        //     today: todayCompanies,
        // });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch notifications.' });
    }
}

module.exports = { tasksOverDueAndDueToday, }