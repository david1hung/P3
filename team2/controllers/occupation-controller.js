var occupationModel = require('../models/occupation');
var format = require('../util/format');

module.exports.handleVideoPage = function(req, res) {
    occupationModel.find(req.params.occupation,
                         function (occupation) {
                             var templateData = new Object();
                             setupIconTemplateData(templateData, occupation);

                             templateData.occupationTitle = occupation.title;

                             if (req.user) {
                                templateData.loggedIn = true;
                             } else {
                                templateData.loggedIn = false;
                             }

                             res.render('video.html', templateData);
                         },
                         function (err) {
                             res.writeHead(500);
                             res.end('Server error');
                         });
}

module.exports.handleCareerOutlookPage = function(req, res) {
    occupationModel.find(req.params.occupation,
                         function (occupation) {
                             var templateData = new Object();
                             setupIconTemplateData(templateData, occupation);

                             templateData.occupationTitle = occupation.title;

                             var currentEmployment = parseFloat(occupation.currentEmployment) * 1000;
                             templateData.currentEmployment = format.formatWithThousandSeparators(currentEmployment);

                             var futureEmployment = parseFloat(occupation.futureEmployment) * 1000;
                             templateData.futureEmployment = format.formatWithThousandSeparators(futureEmployment);

                             var jobOpenings = parseFloat(occupation.jobOpenings) * 1000;
                             templateData.jobOpenings = format.formatWithThousandSeparators(jobOpenings);

                             if (req.user) {
                                templateData.loggedIn = true;
                             } else {
                                templateData.loggedIn = false;
                             }

                             res.render('careerOutlook.html', templateData);
                         },
                         function (err) {
                             res.writeHead(500);
                             res.end('Server error');
                         });
};

module.exports.handleSalaryPage = function(req, res) {
        occupationModel.find(req.params.occupation,
                         function (occupation) {
                             var templateData = new Object();
                             setupIconTemplateData(templateData, occupation);

                             templateData.occupationTitle = occupation.title;

                             templateData.medianAnnualWageUnformatted = occupation.medianAnnualWage;

                             if (req.user) {
                                templateData.loggedIn = true;
                             } else {
                                templateData.loggedIn = false;
                             }

                             res.render('salary.html', templateData);
                         },
                         function (err) {
                             res.writeHead(500);
                             res.end('Server error');
                         });
}

module.exports.handleRandomCareer = function (req, res) {
    // If both x and y are specified in the query string, then the request should
    // return a random SOC code in the region specified by the coordinates.
    if ('x' in req.query && 'y' in req.query) {
        // TECH DEBT: Robustness issues
        occupationModel.getRandomSOCInWOWRegion(
            req.query,
            function (soc) {
                res.redirect('/career/' + soc + '/video');
            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            });
    }
    else {
        occupationModel.getRandomSOC(
            function (soc) {
                res.redirect('/career/' + soc + '/video');
            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            });
    }
}

function setupIconTemplateData(dict, occupation) {
    // TECH DEBT: This is the median, not the average. Clarify whether this is what we want.
    var salaryString = '$' + format.formatWithThousandSeparators(occupation.medianAnnualWage);
    // TECH DEBT: JS doesn't have very good support for named constants but we should find a way around that
    if (occupation.medianAnnualWageOutOfRange == 1) {
        salaryString = '>=' + salaryString;
    }
    dict.averageAnnualSalary = salaryString;

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
    dict.educationRequired = educationString;

    var currentEmployment = parseFloat(occupation.currentEmployment) * 1000;
    var futureEmployment = parseFloat(occupation.futureEmployment) * 1000;
    // Calculate percent growth
    // TECH DEBT: We need to add this as a field to our table for querying, not compute it dynamically
    var careerGrowth = (futureEmployment - currentEmployment) / currentEmployment;
    dict.careerGrowth = format.formatPercentage(careerGrowth);
}
