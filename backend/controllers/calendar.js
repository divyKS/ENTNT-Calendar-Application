const communicationLog = require('../models/communicationLog');
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

        for (const company of communications) {
            for (const comm of company.communications) {
                // Fetch the latest note for the communication method from communicationLogSchema
                const latestLog = await communicationLog
                    .findOne({ companyId: company._id, type: comm.method })
                    .sort({ date: -1 }); // Sort by date (latest first)

                const notes = latestLog ? latestLog.notes : ''; // Get notes if available

                if (comm.dateDue <= currentDate) {
                    data.past.push({
                        companyName: company.name,
                        method: comm.method,
                        date: comm.dateDue,
                        notes, // Add notes
                    });
                } else {
                    data.upcoming.push({
                        companyName: company.name,
                        method: comm.method,
                        date: comm.dateDue,
                        notes, // Add notes for upcoming too
                    });
                }
            }
        }

        // communications.forEach((company) => {
        //     company.communications.forEach(async (comm) => {
        //         const latestLog = await communicationLog
        //             .findOne({ companyId: company._id, type: comm.method })
        //             .sort({ date: -1 }); // Sort by date (latest first)

        //         const notes = latestLog ? latestLog.notes : ''; // Get notes if available

        //         if (comm.dateDue <= currentDate) {
        //             data.past.push({
        //                 companyName: company.name,
        //                 method: comm.method,
        //                 date: comm.dateDue,
        //                 notes: notes,
        //             });
        //         } else {
        //             data.upcoming.push({
        //                 companyName: company.name,
        //                 method: comm.method,
        //                 date: comm.dateDue,
        //             });
        //         }
        //     });
        // });

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch communications for calendar.' });
    }
};

module.exports = { getCalendarCommunications };