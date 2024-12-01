const company = require("../models/company");
const { startOfDay, isBefore, isToday } = require("date-fns");

const tasksOverDueAndDueToday = async (req, res) => {
  try {
    const currentDate = new Date();
    const normalizedToday = startOfDay(currentDate);

    const companies = await company.find().populate("communications");

    const overdue = [];
    const today = [];

    companies.forEach((company) => {
      company.communications.forEach((comm) => {
        const communicationDate = new Date(comm.dateDue);

        if (!comm.complete) {
          if (isBefore(communicationDate, normalizedToday)) {
            overdue.push({
              companyId: company._id,
              name: company.name,
              method: comm.method,
              dueDate: comm.dateDue,
            });
          } else if (isToday(communicationDate)) {
            today.push({
              companyId: company._id,
              name: company.name,
              method: comm.method,
              dueDate: comm.dateDue,
            });
          }
        }
      });
    });

    res.status(200).json({ overdue, today });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};

module.exports = { tasksOverDueAndDueToday };
