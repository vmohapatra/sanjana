var mongoose = require('mongoose');

// Create a Contact Form Schema
var level1_contact_schema = new mongoose.Schema({
    form_id : String,
    form_user_email_id : String,
    rcm_name: String,
    rcm_email: { type: String },
    rcm_phone: { type: String },
    completing_person: { type: String },
    completing_person_title: { type: String }
});

module.exports = mongoose.model('Level1Contact', level1_contact_schema, 'level1ContactFormInfo');
