var express = require('express');
var app = express();
var mustache = require('mustache');

// Use Handlebars are the templating engine, and make it the default engine for
// html files
app.set('view engine', 'hbs');
app.engine('html', require('hbs').__express);

// Serve static files
app.use(express.static('public'));

// Set up routing
app.get('/', function(req, res) {
    res.render('index.html', {});
});

// Run server
app.listen(8080);
