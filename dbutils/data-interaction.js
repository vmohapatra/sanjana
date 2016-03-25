'use strict';

var db = require('../db');

//Contains the logic for interacting with data in the app ie. pushing and retrieval from the db
var dataInteraction = {};

//Util function to determine which for schema to be used
function getFormSchema(formId) {
    var schema = {};
    switch(formId) {
        case "form_1_1" :
            schema.instance = new db.Level1Contact();
            schema.name = "Level1Contact";
            break;
        case "form_1_2" :
            schema.instance = new db.Level1TeamFormation();
            schema.name = "Level1TeamFormation";
            break;
         case "form_1_3" :
            schema.instance = new db.Level1AssessMonitor();
            schema.name = "Level1AssessMonitor";
            break;
        case "form_1_4" :
            schema.instance = new db.Level1EducationOutreach();
            schema.name = "Level1EducationOutreach";
            break;
        case "form_1_5" :
            schema.instance = new db.Level1WasteReduction();
            schema.name = "Level1WasteReduction";
            break;
        case "form_1_6" :
            schema.instance = new db.Level1Recycling();
            schema.name = "Level1Recycling";
            break;
        case "form_1_7" :
            schema.instance = new db.Level1HazardousMaterialManagement();
            schema.name = "Level1HazardousMaterialManagement";
            break;
       default :
    }
    
    return schema;
}

dataInteraction.saveForm = function(req, callback) {
    console.log("In save form.");
    var schema = getFormSchema(req.body.form_id);

    console.log(schema.name);
    
    db[schema.name].findOne({form_id:req.body.form_id},function(err, form){
        if(err) {
            console.log("Error in retrieving form data from db");
            callback(err);
        }

        var formLength = Object.keys(req.body).length;
        if(!form) {
            console.log("No form info present in db");
            form = schema.instance;

            for(var key in req.body) {
                form[key] = req.body[key];
            }
        }
        else {
            console.log("**Form info exists in db**");

            for(var key in req.body) {
                form[key] = req.body[key];
            }

            console.log(form);
        }

        form.save(function(err, savedUser){
            if(err) {
                console.log("Error in saving the form data");
                callback(err);
            }

            callback("successfully saved form data", form);
        });

    });
    
};

dataInteraction.fetchForm = function(req, callback) {
    console.log("In fetch form.");
    var schema = getFormSchema(req.query.form_id);

    console.log(schema.name);
    db[schema.name].findOne({form_id:req.query.form_id, form_user_email_id:req.query.form_user_email_id}, function(err, form){
        if(err) {
            console.log("Error in retrieving form data from db");
            callback(err);
        }
        else {
            console.log("**Form info exists in db**");
            callback(err, form);
        }
    });

};

module.exports = dataInteraction;