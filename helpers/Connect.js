//easy way to connect mysql DB u need just require connection and then do ur staff

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: process.env.MYSQLDBHOST,
  port: process.env.MYSQLDBPORT,
  user: process.env.MYSQLDBUSER,
  password: process.env.MYSQLDBPASSWORD,
  database: process.env.MYSQLDBNAME,
  timezone: 'Z'
});

connection.connect();

module.exports = connection;