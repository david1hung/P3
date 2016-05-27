module.exports.handleHomePage = function(req, res) {

    var templateData = new Object();

    if (req.user) {
        templateData.loggedIn = true;
        templateData.firstName = req.user.firstName;
    } else {
        templateData.loggedIn = false;
    }

    if (req.flash('loginAttempt') == 'yes') {

        if (req.flash('error') == 'signUpAttempt') {
            templateData.signUpAttempt = true;
            templateData.loginAttempt = false;
        } else {
            templateData.loginAttempt = true;
            templateData.signUpAttempt = false;
        }

        if (req.flash('success') == 'yes') {

            templateData.success = true;

        } else {

            templateData.success = false;

            if (req.flash('signup') == 'yes') {

                if (req.flash('emptyField') == 'yes') {

                    templateData.reason = 'All fields are required.';

                } else if (req.flash('emailTaken') == 'yes') {

                    templateData.reason = 'That email address is already taken.';

                } else {

                    req.flash('passwordConflict'); //clear it?

                    templateData.reason = 'Passwords do not match.';

                }
                
            } else if (req.flash('login') == 'yes') {

                if (req.flash('incorrectEmail') == 'yes') {

                    templateData.reason = 'Incorrect email.';

                } else {
                    req.flash('incorrectPassword'); //clear it?

                    templateData.reason = 'Incorrect password.';

                }

            } else {
                

                templateData.reason = 'All fields are required.';

            }
        }

    } else {

        templateData.signUpAttempt = false;
        templateData.loginAttempt = false;
        templateData.success = true;

    }

    //clear all flashes
    req.flash('loginAttempt');
    req.flash('error');
    req.flash('success');
    req.flash('signup');
    req.flash('emptyField');
    req.flash('emailTaken');
    req.flash('passwordConflict');
    req.flash('login');
    req.flash('incorrectEmail');
    req.flash('incorrectPassword');
        

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
