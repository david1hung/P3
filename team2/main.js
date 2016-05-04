var express = require('express');
var app = express();
var hbs = require ('hbs');

// Use Handlebars as the templating engine, and make it the default engine for
// html files
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);
// Register partials
hbs.registerPartials(__dirname + '/views/partials');

// Serve static files
app.use(express.static('public'));

// Set up routing
app.get('/', function(req, res) {
    res.render('index.html', {});
});

app.get('/worldOfWork', function(req, res) {
    res.render('worldOfWork.html', {});
});

app.get('/profile', function(req, res) {
    res.render('profile.html', {});
});

app.post('/signup', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.post('/login', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.post('/reset-password', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.get('/career/:occupation/video', function(req, res) {
    require('./controllers/occupation-controller').handleVideoPage(req, res);
});

app.get('/career/:occupation/salary', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.get('/career/:occupation/education', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.get('/career/:occupation/skills', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.get('/career/:occupation/outlook', function(req, res) {
    require('./controllers/occupation-controller').handleCareerOutlookPage(req, res);
});

app.get('/career/:occupation/world-of-work', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.get('/career/random', function(req, res) {
    require('./controllers/occupation-controller').handleRandomCareer(req, res);
});

// app.get('/profile', function(req, res) {
//     res.writeHead(501);
//     res.end('501 - Not implemented');
// });

app.get('/browse', function(req, res) {
    require('./controllers/browse-controller').handleBrowsePage(req, res);
});

app.get('/search', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

app.get('/help', function(req, res) {
    res.writeHead(501);
    res.end('501 - Not implemented');
});

// Run server
app.listen(8080);
