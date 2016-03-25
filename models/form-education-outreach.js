var mongoose = require('mongoose');

// Create a Assess and Monitor Form Schema
var level1_education_outreach_schema = new mongoose.Schema({
    form_id : String,
    form_user_email_id : String,
    introduce_student_staff_check : Boolean,
    introduce_student_staff_note : { type: String },
    regular_announcement_check : Boolean,
    regular_announcement_note : { type: String },
    wrr_success_check : Boolean,
    wrr_success_note : { type: String },
    student_green_team_check : Boolean,
    student_green_team_note : { type: String },
    student_green_team_registration_check : Boolean,
    waste_audit_check : Boolean,
    waste_audit_note : { type: String },
    classroom_contest_check : Boolean,
    classroom_contest_note : { type: String },
    quiz_show_check : Boolean,
    quiz_show_note : { type: String },
    wrr_poster_check : Boolean,
    wrr_poster_note : { type: String },
    skit_video_check : Boolean,
    skit_video_note : { type: String },
    short_training_check : Boolean,
    short_training_note : { type: String },
    cafeteria_volunteers_check : Boolean,
    cafeteria_volunteers_note : { type: String },
    climate_lessons_check : Boolean,
    climate_lessons_note : { type: String },
    inclass_lessons_check : Boolean,
    inclass_lessons_note : { type: String },
    guest_speakers_check : Boolean,
    guest_speakers_note : { type: String },
    other_wrr_check  : Boolean,
    other_wrr_note  : { type: String }
});

module.exports = mongoose.model('Level1EducationOutreach', level1_education_outreach_schema, 'level1EducationOutreachFormInfo');