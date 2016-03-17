'use strict';

// Configures the database

var mongoose = require('mongoose');
var config = require('./config');

//Uses sanjana_db by default for the app
mongoose.connect(config.db_url);

module.exports = {
    User: require('./models/user'),
    Level1Contact: require('./models/user')
};

//User
//Form sublist1_1 Contact
//Form sublist1_2 A
//Form sublist1_3 B
//Form sublist1_4 C
//Form sublist1_5 D
//Form sublist1_7 E
//Form sublist1_8 F