var mongoose = require('mongoose');

// Create a Assess and Monitor Form Schema
var level1_hmm_schema = new mongoose.Schema({
    form_id : String,
    lhwmp_visit_check : Boolean,
    mostrecent_lhwmp_visit_date : { type: String },
    lhwmp_followup_check : Boolean,
    lhwmp_followup_note : { type: String }
});

module.exports = mongoose.model('Level1HazardousMaterialManagement', level1_hmm_schema, 'level1HazardousMaterialManagementFormInfo');
