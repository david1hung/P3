var mysql = require('mysql');
var fs = require('fs');

// Load the database configuration
// TECH DEBT: Not confident this filepath is robust
var connection = mysql.createConnection(JSON.parse(fs.readFileSync('db-config.json', 'utf8')));

// next is a function handle with the signature function(err, rows, fields)
module.exports.find = function(soc, next) {
    connection.connect();
    // TECH DEBT: Beware SQL injection! Consider validating soc, as it follows a well-defined format
    connection.query('SELECT * FROM Occupation WHERE soc = "' + soc + '";', next);
    connection.end();
}
