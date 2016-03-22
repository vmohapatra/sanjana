var mongoose = require('mongoose');

// Create a Contact Form Schema
var level1_team_formation_schema = new mongoose.Schema({
    form_id : String,
    team_formation_check : Boolean,
    staff_1 : { type: String },
    staff_1_title : { type: String },
    staff_2 : { type: String },
    staff_2_title : { type: String },
    participation_announcement_check  : Boolean,
    participation_announcement_note : { type: String }
});

module.exports = mongoose.model('Level1TeamFormation', level1_team_formation_schema, 'level1FormTeamFormInfo');
