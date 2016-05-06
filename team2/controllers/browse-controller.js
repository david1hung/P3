module.exports.handleBrowsePage = function (req, res) {

	var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }
    res.render('browse.html', templateData);
};
