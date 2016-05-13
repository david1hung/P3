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
        if (err === null && rows.length == 1) {
            successNext(rows[0]);
        }
        else {
            errNext(err);
        };
    });

    connection.end();
}

// successNext takes an argument as a string representing the random SOC code
// errNext takes an argument as an error object
module.exports.getRandomSOC = function(successNext, errNext) {
    var connection = mysql.createConnection(config);
    connection.connect();

    connection.query('SELECT soc FROM Occupation ORDER BY RAND() LIMIT 1;', function(err, rows, fields) {
        if (err === null && rows.length == 1) {
            successNext(rows[0].soc);
        }
        else {
            errNext(err);
        }
    });

    connection.end();
}

// coordinate is an object with attributes x and y. This coordinate specifies the
// region in which to get the random SOC code. Both x and y should only be in the
// range [-1, 1].
// successNext takes an argument as a string representing the random SOC code
// errNext takes an argument as an error object
module.exports.getRandomSOCInWOWRegion = function(coordinate, successNext, errNext) {
    // Not implemented; need data on plotting jobs to WOW region first.
    // Instead, just forward it to the normal random function.
    module.exports.getRandomSOC(successNext, errNext);
}

module.exports.searchOccupationNames = function(query, successNext, errNext) {
    var connection = mysql.createConnection(config);
    connection.connect();

    // TECH DEBT: Beware SQL injection! Consider validating query
    connection.query('SELECT * FROM Occupation WHERE title LIKE "%' + query + '%";', function(err, rows, fields) {
        if (err === null) {
            successNext(rows);
        }
        else {
            errNext(err);
        };
    });

    connection.end();
}
