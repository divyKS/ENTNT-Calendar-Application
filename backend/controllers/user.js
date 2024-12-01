const companySchema = require("../models/company");
const communicationLog = require("../models/communicationLog");

const getCompaniesInfoForUserDashboard = async (req, res) => {
  try {
    const companies = await companySchema.find({});

    const dashboardData = await Promise.all(
      companies.map(async (company) => {
        const lastFiveCommunications = await communicationLog
          .find({ companyId: company._id })
          .sort({ date: -1 })
          .limit(5);

        return {
          companyId: company._id,
          companyName: company.name,
          lastFiveCommunications,
          nextCommunication: company.nextCommunication,
        };
      }),
    );
    res.status(200).json(dashboardData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch dashboard data." });
  }
};

const logCommunication = async (req, res) => {
  const { companyId } = req.params;
  const { notes } = req.body;

  try {
    const company = await companySchema.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    const currentDate = new Date();

    const indexOfCommunicationToBeDoneNow = company.communications.findIndex(
      (comm) => comm.method === company.nextCommunication.type,
    );

    if (indexOfCommunicationToBeDoneNow === -1) {
      return res.status(400).json({ error: "Invalid communication method." });
    }

    // communication that has to be logged now
    const communicationToBeLoggedNow = company.communications[indexOfCommunicationToBeDoneNow];
    
    const logEntry = {
      companyId: companyId,
      type: company.nextCommunication.type,
      date: currentDate,
      notes: notes || "",
    };
    
    await communicationLog.create(logEntry);
    
    company.communications[indexOfCommunicationToBeDoneNow].complete = true;

    // Update future dates for the same and subsequent communication methods
    company.communications.forEach((comm, index) => {
      if (index >= indexOfCommunicationToBeDoneNow) {
        comm.dateDue = new Date(
          currentDate.getTime() +
            (index - indexOfCommunicationToBeDoneNow) *
              company.communicationPeriodicity *
              24 *
              60 *
              60 *
              1000,
        );
      }
    });

    // Update the next communication
    const indexOfNextCommMethod = (indexOfCommunicationToBeDoneNow + 1) % company.communications.length;
    const nextCommMethod = company.communications[indexOfNextCommMethod];

    if (nextCommMethod) {
      company.nextCommunication = {
        type: nextCommMethod.method,
        date: nextCommMethod.dateDue,
      };
    } else {
      company.nextCommunication = null;
    }

    await company.save();

    res
      .status(201)
      .json({ message: "Communication logged successfully.", log: logEntry });
      
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log communication." });
  }
};

module.exports = { getCompaniesInfoForUserDashboard, logCommunication };
