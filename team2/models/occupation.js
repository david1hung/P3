var mysql = require('mysql');
var fs = require('fs');

// Load the database configuration
// TECH DEBT: Not confident this filepath is robust
var config = JSON.parse(fs.readFileSync('db-config.json', 'utf8'));

// Finds the national occupation data for the occupation with the given SOC code.
// successNext takes the argument "occupation" of type Occupation
// errNext takes the argument "err" containing a description of the error
module.exports.find = function(soc, successNext, errNext) {
    var connection = mysql.createConnection(config);
    connection.connect();

    // TECH DEBT: Beware SQL injection! Consider validating soc, as it follows a well-defined format
    connection.query('SELECT * FROM Occupation WHERE soc = "' + soc + '";', function(err, rows, fields) {
        if (err === null || rows.length != 1) {
            successNext(rows[0]);
        }
        else {
            errNext(err);
        };
    });

    connection.end();
}
