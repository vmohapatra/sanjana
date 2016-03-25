var mongoose = require('mongoose');

// Create a Assess and Monitor Form Schema
var level1_assess_monitor_schema = new mongoose.Schema({
    form_id : String,
    form_user_email_id : String,
    guide_complete_check : Boolean,
    guide_complete_note : { type: String },
    calculate_school_recycling_rate_check : Boolean,
    recycling_begin_date : { type: String },
    recycling_begin_rate  : { type: String },
    recycling_end_date : { type: String },
    recycling_end_rate  : { type: String },
    optional_service_change_check  : Boolean,
    optional_service_change_note  : { type: String }
});

module.exports = mongoose.model('Level1AssessMonitor', level1_assess_monitor_schema, 'level1AssessMonitorFormInfo');
