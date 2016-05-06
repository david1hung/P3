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

        req.flash('signup', 'yes');

        if (req.body.firstname == '' || req.body.lastname == '' || req.body.verifypassword == '') {
            req.flash('emptyField', 'yes');
            return done(null, false);
        }


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

            var newUser = new Object();
            newUser.firstname = req.body.firstname;
            newUser.lastname = req.body.lastname;
            newUser.email = email;
            newUser.password = password;

            var insertQuery = "INSERT INTO Users VALUES('" + newUser.firstname + "', '" + newUser.lastname + "', '" + email + "', '" + password + "', NULL)";

            connection.query(insertQuery, function(err, rows) {
            });

            connection.query("SELECT * FROM Users WHERE email = '" + email + "'",function(err, rows) {
                req.flash('success', 'yes');
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
        
        req.flash('login', 'yes');



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
        return done(null, rows[0]);
    });
  }
));


};




