var mysql = require('mysql');
var dbconfig = require('./dbconfig');

module.exports = mysql.createPool(dbconfig);