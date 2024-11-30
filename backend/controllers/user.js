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
    const { companyId } = req.params;
    const { notes } = req.body;

    try {
        const company = await companySchema.findById(companyId);
        
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const currentDate = new Date();

        // Identify the next communication method
        const nextCommIndex = company.communications.findIndex(
            (comm) => comm.method === company.nextCommunication.type
        );

        if (nextCommIndex === -1) {
            return res.status(400).json({ error: 'Invalid communication method.' });
        }

        const loggedCommunication = company.communications[nextCommIndex];
       
        const originalDate = loggedCommunication.dateDue;

        // Log the communication
        const logEntry = {
            companyId: companyId,
            type: company.nextCommunication.type,
            date: currentDate, // Log the current date/time
            notes: notes || '',
        };
        await communicationLog.create(logEntry);

        // Update the logged communication's date to today's date
        loggedCommunication.dateDue = currentDate;

        // Update future dates for the same and subsequent communication methods
        company.communications.forEach((comm, index) => {
            if (index >= nextCommIndex) {
                comm.dateDue = new Date(
                    currentDate.getTime() + (index - nextCommIndex) * company.communicationPeriodicity * 24 * 60 * 60 * 1000
                );
            }
        });

        // Update the next communication
        const nextIndex = (nextCommIndex + 1) % company.communications.length;
        const nextCommunication = company.communications[nextIndex];

        if (nextCommunication) {
            company.nextCommunication = {
                type: nextCommunication.method,
                date: nextCommunication.dateDue,
            };
        } else {
            company.nextCommunication = null; // No upcoming communications left
        }

        // Save the updated company
        company.communications[nextCommIndex].complete = true;
        await company.save();

        res.status(201).json({ message: 'Communication logged successfully.', log: logEntry });
        // // Fetch the company and its next communication
        // const company = await companySchema.findById(companyId).populate('communications');

        // if (!company) {
        //     return res.status(404).json({ error: 'Company not found' });
        // }

        // // Create the communication log entry
        // const logEntry = {
        //     companyId: companyId,
        //     type: company.nextCommunication ? company.nextCommunication.type : 'N/A',
        //     date: new Date(), // Log the current date/time
        //     notes: notes || '',
        // };

        // // Save the log entry to the CommunicationLog collection
        // const log = await communicationLog.create(logEntry);

        // // Update next communication for the company
        // const nextCommunicationIndex = company.communications.findIndex(
        //     (nextComm) => nextComm.method === logEntry.type
        // );

        // // Determine the next communication based on the current one
        // const nextCommunication = nextCommunicationIndex >= 0
        //     ? company.communications[(nextCommunicationIndex + 1)%5]
        //     : null;

        // // Calculate the next communication date
        // if (nextCommunication) {
        //     const nextDate = new Date();
        //     nextDate.setDate(nextDate.getDate() + parseInt(company.communicationPeriodicity));

        //     // Update the company with the new next communication
        //     company.nextCommunication = {
        //         type: nextCommunication.method,
        //         date: nextDate,
        //     };
        //     await company.save();
        // }

        // res.status(201).json(log);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log communication.' });
    }
}

module.exports = { getCompaniesInfoForUserDashboard, logCommunication };