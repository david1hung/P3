module.exports.handleHomePage = function(req, res) {

    var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }
    res.render('index.html', templateData);
}

module.exports.handleWorldOfWorkPage = function(req, res) {

    var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }
    res.render('worldOfWork.html', templateData);
}

module.exports.handleProfilePage = function(req, res) {

    var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }
    res.render('profile.html', templateData);
}

module.exports.handleSalaryPage = function(req, res) {

    var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }
    res.render('salary.html', templateData);
}