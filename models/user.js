var mongoose = require('mongoose');

// Create a User Schema
var userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Defaults:
//name : Test User
//email : test@test.com
//test : testpwd

module.exports = mongoose.model('User', userSchema, 'userInfo');
