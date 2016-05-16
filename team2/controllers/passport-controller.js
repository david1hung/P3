var usersModel = require('../models/users');

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
        usersModel.signUp(req, email, password, done);
    }
    ));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {
        usersModel.login(req, email, password, done);
    }
    ));


};




