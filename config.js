'use strict';

var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');

var config = {};
config.http_port = parseInt(process.argv[2]) || 54321;
config.db_url = 'mongodb://localhost/prototype';
config.root = rootPath;

module.exports = config;
