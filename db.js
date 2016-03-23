'use strict';

// Configures the database

var mongoose = require('mongoose');
var config = require('./config');

//Uses sanjana_db by default for the app
mongoose.connect(config.db_url, function(err){
    if(!err){
        console.log('connected to sanjana_db');
    } else{
        console.log(err);
        throw err;
    }
});

module.exports = {
    User: require('./models/user'),
    Level1Contact: require('./models/form-contact'),
    Level1TeamFormation: require('./models/form-team-formation'),
    Level1AssessMonitor: require('./models/form-assess-monitor'),
    Level1EducationOutreach: require('./models/form-education-outreach'),
    Level1WasteReduction: require('./models/form-waste-reduction'),
    Level1Recycling: require('./models/form-recycling'),
    Level1HazardousMaterialManagement: require('./models/form-hazardous-material-management')
};
