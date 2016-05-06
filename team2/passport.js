var mysql = require('mysql');

var connection = mysql.createConnection(
    {
        host    : 'localhost',
        user    : 'p3_admin',
        password: '',
        database: 'p3_test', 
    }

    );

connection.connect();
connection.query('USE p3_test') //redundant?

module.exports = function(passport, LocalStrategy) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {

    connection.query("SELECT * FROM Users WHERE email = '" + email + "'",function(err, rows){
        if (err)
            return done(err); //database error
        if (rows.length) {
            return done(null, false); //email taken
        } else {
            var newUser = new Object();
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.email = email;
            newUser.password = password;

            var insertQuery = "INSERT INTO Users VALUES('" + newUser.firstname + "', '" + newUser.lastname + "', '" + email + "', '" + password + "', NULL)";

            connection.query(insertQuery, function(err, rows) {
            });

            connection.query("SELECT * FROM Users WHERE email = '" + email + "'",function(err, rows) {
                return done(null, rows[0]);
            });

        }

    });
  }
));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {

    connection.query("SELECT * FROM Users WHERE email = '" + email + "'",function(err, rows){
        if (err)
            return done(err); //database error
        if (!rows.length) {
            return done(null, false); //no matching email
        }

        if (!( rows[0].password == password)) { //wrong password
            return done(null, false);
        }

        return done(null, rows[0]);
    });
  }
));


};




