'use strict';

var db = require('../db');

//Contains the backend logic
var login = {};

login.insertRegisteredUser = function(query, callback) {
    console.log("In insert registered user. Adding registered user if not already present");
    //First time login. No validation has happened yet
    if(!query["invalidCredentials"]) {
        
        db.User.findOne({email:"test@test.com"},function(err, user){
            if(err) {
                console.log("Error in retrieving user data from db");
                callback(err);
            }
            
            if(!user) {
                console.log("Registered user not present.");
                var registeredUser = new db.User();
                registeredUser.name = "Test User";
                registeredUser.email = "test@test.com";
                registeredUser.password = "testpwd";
                registeredUser.save(function(err, savedUser){
                    if(err) {
                        console.log("Error in saving the user");
                        callback(err);
                        //return res.status(500).send();
                    }
                    
                    callback("successfully saved registered user", savedUser);
                    //return res.status(200).send();
                });
            }
            else {
                console.log("**Registered User exists**");
                callback("Registered User exists", user);
            }
        });
    }
    else {
        //If not a invalid credential redirection for re submission 
    }
};

login.authenticateCredentials = function(req, callback) {
    console.log("In authenticate credentials at login.");
    db.User.findOne(
        {email:req.body.email, password:req.body.password}, 
        function(err, user){
            if(err) {
                console.log("Error in retrieving user data from db.");
                console.log(err);
                callback(err,redirectLink);
            }

            if(user) {
                console.log("User with login credentials found. Login credentials valid.");
                //res.redirect('/main');
                req.session.user = user;
                callback("Valid credentials.",'/main');
            }
            else {
                console.log("No User with matching credentials. Login credentials invalid.");
                //res.redirect('/login?invalidCredentials=true');
                callback("Error in authenticating credentials.",'/login?invalidCredentials=true');
            }
        }
    );
};

login.getUserInfo = function(req, callback) {
    console.log("in get User info");
    db.User.findOne({email: req.session.user.email },function(err, user){
        if(err) {
            console.log(err);
            callback(err);
        }
        else {
            var userInfo = {};
            userInfo.name = user.name;
            userInfo.email = user.email;
            console.log(userInfo);
            callback(err, userInfo);
        }
    });
};
module.exports = login;