const company = require("../models/company");

const addCompany = async (req, res) => {
  const {
    name,
    location,
    linkedinProfile,
    emails,
    phoneNumbers,
    comments,
    communicationPeriodicity,
    communications,
  } = req.body;
  // try {
  //     const newCompany = new company({
  //         name,
  //         location,
  //         linkedinProfile,
  //         emails,
  //         phoneNumbers,
  //         comments,
  //         communicationPeriodicity,
  //         communications,
  //     });
  //     const savedCompany = await newCompany.save();
  //     res.status(201).json({ message: 'Company added successfully', company: savedCompany });
  // } catch (error) {
  //     res.status(500).json({ message: 'Error adding company', error });
  // }

  try {
    // Ensure communication methods exist
    if (!communications || communications.length === 0) {
      return res
        .status(400)
        .json({ error: "Communication methods are required." });
    }

    // now having at correct intervals, not using this
    // const firstMethod = communications[0];
    // const nextCommunication = {
    //     type: firstMethod.method,
    //     date: new Date().setDate(new Date().getDate() + 1),
    // };

    const currentDate = new Date();

    // Set initial dates for all communication methods
    const updatedCommunications = communications.map((comm, index) => ({
      ...comm,
      dateDue: new Date(
        currentDate.setDate(
          currentDate.getDate() + index * communicationPeriodicity,
        ),
      ),
    }));

    const companyCreated = await company.create({
      name,
      location,
      linkedinProfile,
      emails,
      phoneNumbers,
      comments,
      communicationPeriodicity,
      communications: updatedCommunications,
      nextCommunication: {
        type: updatedCommunications[0].method,
        date: updatedCommunications[0].dateDue,
      },
    });

    res.status(201).json(companyCreated);
  } catch (err) {
    res.status(500).json({ error: "Failed to create company." });
  }
};

const getCompanies = async (req, res) => {
  try {
    // const companies = await company.find({}, 'name location'); // Fetch name and location fields only
    const companies = await company.find({});
    res.status(200).json(companies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch companies." });
  }
};

const editCompany = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedCompany = await company.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json(updatedCompany);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update company." });
  }
};

const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCompany = await company.findByIdAndDelete(id);
    if (!deletedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete company." });
  }
};

module.exports = { addCompany, getCompanies, editCompany, deleteCompany };
