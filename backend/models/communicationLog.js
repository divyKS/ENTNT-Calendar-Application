const mongoose = require("mongoose");

const communicationLogSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("CommunicationLog", communicationLogSchema);
