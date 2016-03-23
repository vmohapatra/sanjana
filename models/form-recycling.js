var mongoose = require('mongoose');

// Create a Assess and Monitor Form Schema
var level1_recycling_schema = new mongoose.Schema({
    form_id : String,
    recycling_classroom_check : Boolean,
    recycling_classroom_note : { type: String },
    recycling_office_check : Boolean,
    recycling_office_note : { type: String },
    recycling_container_check : Boolean,
    recycling_container_kitchen_check : Boolean,
    recycling_container_stafflounge_check : Boolean,
    recycling_container_note : { type: String },
    container_visible_check : Boolean,
    container_visible_note : { type: String },
    recycling_sign_check : Boolean,
    recycling_sign_note : { type: String },
    collect_recycling_check : Boolean,
    collect_recycling_paper_check : Boolean,
    collect_recycling_cardboard_check : Boolean,
    collect_recycling_alumcans_check : Boolean,
    collect_recycling_plasticbottle_check : Boolean,
    collect_recycling_lightbulb_check : Boolean,
    collect_recycling_electwaste_check : Boolean,
    collect_recycling_note : { type: String },
    recycling_contaminants_check : Boolean,
    recycling_container_empty_check : Boolean,
    recycling_container_empty_note : { type: String },
    recycling_percent_check : Boolean,
    recycling_percent_note : { type: String }
});

module.exports = mongoose.model('Level1Recycling', level1_recycling_schema, 'level1RecyclingFormInfo');
