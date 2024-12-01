const mongoose = require("mongoose");

const communicationSchema = new mongoose.Schema({
  method: { type: String, required: true },
  description: { type: String, required: true },
  sequence: { type: Number, required: true },
  mandatory: { type: Boolean, default: false },
  dateDue: { type: Date, required: true },
  complete: { type: Boolean, default: false },
});

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  linkedinProfile: { type: String, required: true },
  emails: [{ type: String }],
  phoneNumbers: [{ type: String }],
  comments: { type: String },
  communicationPeriodicity: { type: String, default: "14" },
  communications: [communicationSchema],
  nextCommunication: {
    type: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: null,
    },
  },
});

module.exports = mongoose.model("Company", companySchema);
