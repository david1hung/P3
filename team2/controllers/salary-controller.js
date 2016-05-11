module.exports.handleSalaryPage = function (req, res) {

	var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
    } else {
        templateData.loggedIn = false;
    }
    res.render('salary.html', templateData);
};
