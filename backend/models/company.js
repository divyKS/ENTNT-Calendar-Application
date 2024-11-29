const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
    method: { type: String, required: true }, // E.g., LinkedIn Post
    description: { type: String, required: true }, // E.g., "Post about the company"
    sequence: { type: Number, required: true }, // Order of execution
    mandatory: { type: Boolean, default: false }, // Is this step mandatory?
});

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    linkedinProfile: { type: String, required: true },
    emails: [{ type: String }], // Multiple emails allowed
    phoneNumbers: [{ type: String }], // Multiple phone numbers allowed
    comments: { type: String },
    communicationPeriodicity: { type: String, default: '14' },
    communications: [communicationSchema], // Communication methods associated with the company
});

module.exports = mongoose.model('Company', companySchema);
