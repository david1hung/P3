var fs = require('fs');
var express = require('express');
var app = express();
var hbs = require ('hbs');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var RememberMeStrategy = require('passport-remember-me').Strategy;

var usersModel = require('./models/users.js');



// Use Handlebars as the templating engine, and make it the default engine for
// html and hbs files
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
app.engine('hbs', require('hbs').__express);
// Register partials
hbs.registerPartials(__dirname + '/views/partials');

// Serve static files
app.use(express.static('public'));

// Cookie Parser
app.use(cookieParser());

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Sessions
app.use(session({secret: "replacethis",saveUninitialized: true,resave: true}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('remember-me'));

// Connect Flash
app.use(flash());

// Load the app server configuration
var appConfig = JSON.parse(fs.readFileSync(__dirname + '/config/app-config.json', 'utf8'));


// Set up routing
app.get('/', function(req, res) {
    require('./controllers/temp-controller').handleHomePage(req, res);
});

app.get('/loginAttempt', function(req, res) {
    req.flash('loginAttempt', 'yes');
    res.redirect('/');
});

app.get('/worldOfWork', function(req, res) {
    require('./controllers/temp-controller').handleWorldOfWorkPage(req, res);
});

app.get('/profile', function(req, res) {
    require('./controllers/temp-controller').handleProfilePage(req, res);
});

app.get('/salary', function(req, res) {
    require('./controllers/occupation-controller').handleSalaryPage(req, res);
});

app.post('/signup', passport.authenticate('local-signup', { successRedirect: '/profile', failureRedirect: '/loginAttempt', failureFlash: 'signUpAttempt' }));

app.post('/login', passport.authenticate('local-login', { failureRedirect: '/loginAttempt', failureFlash: 'loginAttempt' }),
    function(req, res, next) {
        if (!req.body.remember_me) { return next(); }

        usersModel.issueRememberMeToken(req.user, function(err, token) {
            if (err) { return next(err); }
            res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
            return next();
        });
    },
    function(req, res) {
        res.redirect('/profile');
    });

app.post('/logout', function(req, res){
  usersModel.clearRememberMeToken(req.user, function() {
    res.clearCookie('remember_me');
    req.logout();
    res.redirect('/');
  });
});

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));

app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

app.post('/reset-password', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.get('/career/:occupation/video', function(req, res) {
    require('./controllers/occupation-controller').handleVideoPage(req, res);
});

app.get('/career/:occupation/salary', function(req, res) {
    require('./controllers/occupation-controller').handleSalaryPage(req, res);
});

app.get('/career/:occupation/education', function(req, res) {
    require('./controllers/occupation-controller').handleEducationPage(req, res);
});

app.get('/career/:occupation/skills', function(req, res) {
    require('./controllers/occupation-controller').handleSkillsPage(req, res);
});

app.get('/career/:occupation/outlook', function(req, res) {
    require('./controllers/occupation-controller').handleCareerOutlookPage(req, res);
});

app.get('/career/:occupation/world-of-work', function(req, res) {
    require('./controllers/occupation-controller').handleWorldOfWorkPage(req, res);
});

app.get('/career/random', function(req, res) {
    require('./controllers/occupation-controller').handleRandomCareer(req, res);
});

app.get('/career/vidup', function(req, res) {
	require('./controllers/algorithm-controller').handleVideoLike(req, res);
});

app.get('/career/vidmid', function(req, res) {
	require('./controllers/algorithm-controller').handleVideoNeutral(req, res);
});

app.get('/career/viddown', function(req, res) {
	require('./controllers/algorithm-controller').handleVideoDislike(req, res);
});

app.get('/career/video', function(req, res) {
	res.send('Hi');
});

app.get('/browse', function(req, res) {
    require('./controllers/browse-controller').handleBrowsePage(req, res);
});

// search requests should use a REST API; query string is in parameter q
app.get('/search', function(req, res) {
    require('./controllers/browse-controller').handleSearchRequest(req, res);
});

app.get('/help', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.get('/recover-account', function(req, res) {
    require('./controllers/user-controller').handleRecoverAccount(req, res);
});

app.post('/password-reset', function(req, res) {
    require('./controllers/user-controller').handlePasswordReset(req, res);
});

app.get('/new-password', function(req, res) {
    require('./controllers/user-controller').handleNewPassword(req, res);
});

app.post('/set-password', function(req, res) {
    require('./controllers/user-controller').handleSetPassword(req, res);
});

require('./controllers/passport-controller.js')(passport, LocalStrategy, FacebookStrategy, LinkedInStrategy, RememberMeStrategy);

// Run server
app.listen(appConfig.port);
