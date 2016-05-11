var occupationModel = require('../models/occupation');

module.exports.handleBrowsePage = function (req, res) {

    var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }
    res.render('browse.html', templateData);
}

module.exports.handleSearchRequest = function (req, res) {

    var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }

    if ('q' in req.query) {
        templateData.query = req.query.q;

        occupationModel.searchOccupationNames(req.query.q,
                                              function (rows) {
                                                  templateData.results = rows;

                                                  res.render('search.html', templateData);
                                              },
                                              function (err) {
                                                  res.writeHead(500);
                                                  res.end('500 - Server error');
                                              });
    }
    else {
        res.writeHead(400);
        res.end('400 - Client error (no query string)');
    }
}
