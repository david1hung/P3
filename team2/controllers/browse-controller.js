var occupationModel = require('../models/occupation');
var format = require('../util/format');

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

        occupationModel.searchOccupationNames(
            req.query.q,

            function (rows) {
                templateData.resultsEmpty = (rows.length == 0);

                templateData.results = new Array(rows.length);
                for (var i = 0; i < rows.length; i++) {
                    var occupation = rows[i];
                    var result = new Object();

                    result.soc = occupation.soc;
                    result.title = occupation.title;

                    // TECH DEBT: This is the median, not the average. Clarify whether this is what we want.
                    var salaryString = '$' + format.formatWithThousandSeparators(occupation.medianAnnualWage);
                    // TECH DEBT: JS doesn't have very good support for named constants but we should find a way around that
                    if (occupation.medianAnnualWageOutOfRange == 1) {
                        salaryString = '>=' + salaryString;
                    }
                    result.averageAnnualSalary = salaryString;

                    var educationDecoder = { 'none' : 'No education required',
                                             'high school' : 'High school education',
                                             'some college' : 'Some college',
                                             'postsecondary nondegree' : 'Postsecondary nondegree award',
                                             'associate' : "Associate's degree",
                                             'bachelor' : "Bachelor's degree",
                                             'master' : "Master's degree",
                                             'doctoral or professional' : "Doctoral or Professional degree" };
                    // TECH DEBT: Robustness issues
                    var educationString = educationDecoder[occupation.educationRequired];
                    result.educationRequired = educationString;

                    var currentEmployment = parseFloat(occupation.currentEmployment) * 1000;
                    var futureEmployment = parseFloat(occupation.futureEmployment) * 1000;
                    // Calculate percent growth
                    // TECH DEBT: We need to add this as a field to our table for querying, not compute it dynamically
                    var careerGrowth = (futureEmployment - currentEmployment) / currentEmployment;
                    result.careerGrowth = format.formatPercentage(careerGrowth);

                    templateData.results.push(result);
                }
                
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
