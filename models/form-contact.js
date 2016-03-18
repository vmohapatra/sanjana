var mongoose = require('mongoose');

// Create a Contact Form Schema
var level1_contact_schema = new mongoose.Schema({
    managerName: String,
    managerEmail: { type: String },
    managerPhone: { type: String },
    personName: { type: String },
    personTitle: { type: String }
});

module.exports = mongoose.model('Level1Contact', level1_contact_schema, 'level1ContactFormInfo');
