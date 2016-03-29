'use strict';

var db = require('../db');

//Contains the backend logic
var login = {};

login.insertRegisteredUser = function(query, callback) {
    //First time login. No validation has happened yet
    if(!query["invalidCredentials"]) {
    console.log("In insert registered user with no submissions yet. Adding registered user if not already present.");
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
        //If a invalid credential redirection for re submission
        callback("Redirected from invalid credential submission link. No operation required for registering user.");
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
                callback(err,"/login");
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
            
            if(user) {
                userInfo.name = user.name;
                userInfo.email = user.email;
                console.log(userInfo);
                callback(err, userInfo);
            }
            else {
                callback("No user details found.");
            }
        }
    });
};

login.registerNewUser = function(req, callback) {
    console.log("In register new user");
    //Find an user with the existing email address
    db.User.findOne(
        {email:req.body.email}, 
        function(err, user){
            if(err) {
                console.log("Error in retrieving user data from db.");
                console.log(err);
                callback(err,"/register");
            }

            if(user) {
                console.log("The email provide is already taken");
                //res.redirect('/main');
                req.session.user = user;
                callback("The email provided for registration is already taken.",'/register');
            }
            else {
                console.log("Registration possible with this email");
                var newUser = new db.User();
                newUser.name = req.body.name;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                
                newUser.save(function(err, savedUser){
                    if(err) {
                        console.log("Error in registering the user to db.");
                        callback(err, "/register");
                        //return res.status(500).send();
                    }
                    
                    callback("Successfully registered user", "/login");
                    //return res.status(200).send();
                });
            }
        }
    );
};

module.exports = login;