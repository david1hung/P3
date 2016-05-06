var occupationModel = require('../models/occupation');

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
                             templateData.currentEmployment = formatWithThousandSeparators(currentEmployment);

                             var futureEmployment = parseFloat(occupation.futureEmployment) * 1000;
                             templateData.futureEmployment = formatWithThousandSeparators(futureEmployment);

                             var jobOpenings = parseFloat(occupation.jobOpenings) * 1000;
                             templateData.jobOpenings = formatWithThousandSeparators(jobOpenings);

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

module.exports.handleRandomCareer = function (req, res) {
    occupationModel.getRandomSOC(
        function (soc) {
            res.redirect('/career/' + soc + '/video');
        },
        function (err) {
            res.writeHead(500);
            res.end('Server error');
        });
}

function formatWithThousandSeparators(num) {
    var text = num.toFixed();
    var formattedText = new String();

    // Scan backwards from the end to add commas
    var i;
    for (i = text.length - 3; i >= 0; i -= 3) {
        formattedText = text.substring(i, i+3) + formattedText;
        if (i != 0) {
            formattedText = ',' + formattedText;
        }
    }
    // If i < 0, then some leading digits were skipped, so add them in
    if (i < 0) {
        formattedText = text.substring(0, i+3) + formattedText;
    }

    return formattedText;
}

function formatPercentage(num) {
    var text = (num * 100).toFixed() + "%";
    if (num > 0) {
        text = "+" + text;
    }
    return text;
}

function setupIconTemplateData(dict, occupation) {
    // TECH DEBT: This is the median, not the average. Clarify whether this is what we want.
    var salaryString = '$' + formatWithThousandSeparators(occupation.medianAnnualWage);
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
                             'doctoral of professional' : "Doctoral or Professional degree" };
    // TECH DEBT: Robustness issues
    var educationString = educationDecoder[occupation.educationRequired];
    dict.educationRequired = educationString;

    var currentEmployment = parseFloat(occupation.currentEmployment) * 1000;
    var futureEmployment = parseFloat(occupation.futureEmployment) * 1000;
    var jobOpenings = parseFloat(occupation.jobOpenings) * 1000;
    // Calculate percent growth
    // TECH DEBT: We need to add this as a field to our table for querying, not compute it dynamically
    var careerGrowth = (futureEmployment - currentEmployment) / currentEmployment;
    dict.careerGrowth = formatPercentage(careerGrowth);
}
