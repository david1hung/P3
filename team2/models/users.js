var mysql = require('mysql');
var fs = require('fs');

// Load the database configuration
// TECH DEBT: Not confident this filepath is robust
var config = JSON.parse(fs.readFileSync('db-config.json', 'utf8'));



module.exports.signUp = function(req, email, password, done) {

	req.flash('signup', 'yes');

    if (req.body.firstname == '' || req.body.lastname == '' || req.body.verifypassword == '') {
        req.flash('emptyField', 'yes');
        return done(null, false);
    }

	var connection = mysql.createConnection(config);
    connection.connect();

    connection.query("SELECT * FROM Users WHERE email = '" + email + "'",function(err, rows){
        if (err)
            return done(err); //database error
        if (rows.length) {
            req.flash('emailTaken', 'yes');
            return done(null, false); //email taken
        } else {

            if (password != req.body.verifypassword) {
                req.flash('passwordConflict', 'yes');
                return done(null, false);
            }

            var insertQuery = "INSERT INTO Users VALUES('" + req.body.firstname + "', '" + req.body.lastname + "', '" + email + "', '" + password + "', NULL)";

            connection.query(insertQuery, function(err, rows) {
            });

            connection.query("SELECT * FROM Users WHERE email = '" + email + "'",function(err, rows) {
                req.flash('success', 'yes');

                var newUser = new Object();
                newUser.firstname = rows[0].firstName;
                newUser.lastname = rows[0].lastName;
                newUser.email = rows[0].email;
                newUser.id = rows[0].id;

                return done(null, newUser);
            });

        }

    });

}


module.exports.login = function(req, email, password, done) {

	req.flash('login', 'yes');

	var connection = mysql.createConnection(config);
    connection.connect();

    connection.query("SELECT * FROM Users WHERE email = '" + email + "'",function(err, rows){
        if (err)
            return done(err); //database error
        if (!rows.length) {
            req.flash('incorrectEmail', 'yes');
            return done(null, false); //no matching email
        }

        if (!( rows[0].password == password)) { //wrong password
            req.flash('incorrectPassword', 'yes');
            return done(null, false);
        }

        req.flash('success', 'yes');

        var newUser = new Object();
        newUser.firstname = rows[0].firstName;
        newUser.lastname = rows[0].lastName;
        newUser.email = rows[0].email;
        newUser.id = rows[0].id;

        return done(null, newUser);
    });
}

module.exports.fbAuthenticate = function(accessToken, refreshToken, profile, done) {

    var connection = mysql.createConnection(config);
    connection.connect();

    connection.query("SELECT * FROM FBUsers WHERE id = '" + profile.id + "'",function(err, rows) {
        if (err)
            return done(err);
        if (rows.length) {
            return done(null, rows[0]);
        } else {
            var insertQuery = "INSERT INTO FBUsers VALUES('" + profile.name.givenName + "', '" + profile.name.familyName + "', '" + profile.emails[0].value + "', '" + profile.id + "')";
            connection.query(insertQuery, function(err, rows) {
            });

            connection.query("SELECT * FROM FBUsers WHERE id = '" + profile.id + "'",function(err, rows) {
                return done(null, rows[0]);
            });

        }
    });

}







