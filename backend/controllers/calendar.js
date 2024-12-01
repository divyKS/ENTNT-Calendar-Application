const { startOfDay } = require("date-fns/startOfDay");
const communicationLog = require("../models/communicationLog");
const companySchema = require("../models/company");
const { isBefore } = require("date-fns/isBefore");

const getCalendarCommunications = async (req, res) => {
  try {
    const companies = await companySchema
      .find()
      .populate("communications")
      .select("name communications");

    const data = {
      past: [{}],
      upcoming: [{}],
    };

    const currentDate = new Date();
    const normalizedToday = startOfDay(currentDate)

    for (const company of companies) {
      for (const comm of company.communications) {
        // if a method is logged more than once, then we can have the latest one - my communication methods are cyclic
        const latestLog = await communicationLog
          .findOne({ companyId: company._id, type: comm.method })
          .sort({ date: -1 });

        const notes = latestLog ? latestLog.notes : "";
        
        const communicationDate = new Date(comm.dateDue);

        if (isBefore(communicationDate, normalizedToday)) {
          data.past.push({
            companyName: company.name,
            method: comm.method,
            date: communicationDate,
            complete: comm.complete, // CHECK
            notes,
          });
        } else {
          data.upcoming.push({
            companyName: company.name,
            method: comm.method,
            date: communicationDate,
            complete: comm.complete, // CHECK
            notes,
          });
        }
      }
    }

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch communications for calendar." });
  }
};

module.exports = { getCalendarCommunications };
