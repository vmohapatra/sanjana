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
        default :
    }
    
    return schema;
}

dataInteraction.saveForm = function(req) {
    console.log("In save contact form.");
    var schema = getFormSchema(req.body.form_id);

    db[schema.name].findOne({form_id:req.body.form_id},function(err, form){
        if(err) {
            console.log("Error in retrieving form data from db");
            console.log(err);
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
                console.log(err);
            }

            console.log("successfully saved form data");
        });
        

    });
};

dataInteraction.fetchForm = function(req) {
};

module.exports = dataInteraction;