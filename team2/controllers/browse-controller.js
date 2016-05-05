module.exports.handleBrowsePage = function (req, res, loggedIn) {

	var templateData = new Object();

    if (loggedIn) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }
    res.render('browse.html', templateData);
};
