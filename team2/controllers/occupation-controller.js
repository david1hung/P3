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

         if (templateData.lowWageOutOfRange == 1) {
            templateData.lowAnnualWageUnformatted = 187200;
        }
        else {
            templateData.lowAnnualWageUnformatted = occupation.lowWage;
        }

        if (templateData.medianWageOutOfRange == 1) {
            templateData.medianAnnualWageUnformatted = 187200;
        }
        else {
            templateData.medianAnnualWageUnformatted = occupation.medianWage;
        }

        if (templateData.highWageOutOfRange == 1) {
            templateData.highAnnualWageUnformatted = 187200;
        } 
        else {
            templateData.highAnnualWageUnformatted = occupation.highWage;
        }

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

module.exports.handleEducationPage = function(req, res) {
    occupationModel.find(req.params.occupation,
     function (occupation) {
         var templateData = new Object();
         setupIconTemplateData(templateData, occupation);

         templateData.occupationTitle = occupation.title;

         templateData.medianSalary = occupation.medianWage;

         var educationType = occupation.educationRequired;
         switch(educationType) {
            case "associate":
                templateData.typeOfSchool = "Undergraduate";
                templateData.typeOfDegree = "Associate's Degree";
                templateData.yearsInSchool = "2";
                templateData.yearsInSchoolInfo = 2;
                templateData.costPerYear = 15000;
            break;
            case "bachelor":
                templateData.typeOfSchool = "Undergraduate";
                templateData.typeOfDegree = "Bachelor's Degree";
                templateData.yearsInSchool = "4";
                templateData.yearsInSchoolInfo = 4;
                templateData.costPerYear = 30000;

            break;
            case "master":
                templateData.typeOfSchool = "Graduate";
                templateData.typeOfDegree = "Master's Degree";
                templateData.yearsInSchool = "6";
                templateData.yearsInSchoolInfo = 6;
                templateData.costPerYear = 30000;
            break;
            case "doctoral or professional":
                templateData.typeOfSchool = "Graduate or Professional";
                templateData.typeOfDegree = "Doctorate or Professional Degree";
                templateData.yearsInSchool = "8";
                templateData.yearsInSchoolInfo = 8;
                templateData.costPerYear = 30000;
            break;
            default:
                templateData.typeOfSchool = "N/A";
                templateData.typeOfDegree = "N/A";
                templateData.yearsInSchool = "N/A";
                templateData.yearsInSchoolInfo = 0;
                templateData.costPerYear = 0;
        }

        if (req.user) {
            templateData.loggedIn = true;
        } else {
            templateData.loggedIn = false;
        }

        res.render('education.html', templateData);
    },
    function (err) {
     res.writeHead(500);
     res.end('Server error');
 });
}

module.exports.handleSkillsPage = function(req, res) {
    occupationModel.find(req.params.occupation,
     function (occupation) {
         occupationModel.getSkills(occupation.soc,
            function (skills) {

                var templateData = new Object();
                setupIconTemplateData(templateData, occupation);
                templateData.occupationTitle = occupation.title;

                if (req.user) {
                    templateData.loggedIn = true;
                } else {
                    templateData.loggedIn = false;
                }

                if (skills != null) {
                    skillsText = JSON.parse(skills.skillsText);

                    var skillsArray = [];

                    if (skills.naturalistPercent > 0) {
                        skillsArray.push([skills.naturalistPercent, "Naturalistic Intelligence", skillsText.naturalistSkills]);
                    }
                    if (skills.musicalPercent > 0) {
                        skillsArray.push([skills.musicalPercent, "Musical Intelligence", skillsText.musicalSkills]);
                    }
                    if (skills.logicalPercent > 0) {
                        skillsArray.push([skills.logicalPercent, "Logical-Mathematical Intelligence", skillsText.logicalSkills]);
                    }
                    if (skills.existentialPercent > 0) {
                        skillsArray.push([skills.existentialPercent, "Existential Intelligence", skillsText.existentialSkills]);
                    }
                    if (skills.interpersonalPercent > 0) {
                        skillsArray.push([skills.interpersonalPercent, "Interpersonal Intelligence", skillsText.interpersonalSkills]);
                    }
                    if (skills.bodyPercent > 0) {
                        skillsArray.push([skills.bodyPercent, "Bodily-Kinesthetic Intelligence", skillsText.bodySkills]);
                    }
                    if (skills.linguisticPercent > 0) {
                        skillsArray.push([skills.linguisticPercent, "Linguistic Intelligence", skillsText.linguisticSkills]);
                    }
                    if (skills.intrapersonalPercent > 0) {
                        skillsArray.push([skills.intrapersonalPercent, "Intra-personal Intelligence", skillsText.intrapersonalSkills]);
                    }
                    if (skills.spatialPercent > 0) {
                        skillsArray.push([skills.spatialPercent, "Spatial Intelligence", skillsText.spatialSkills]);
                    }

                    skillsArray.sort(function(a,b){return b[0]-a[0];});

                    templateData.skillsArray = skillsArray;
                }

                res.render('skills.html', templateData);


            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            })
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
    dict.wageTypeIsAnnual = (occupation.wageType == 'annual');
    var wageString = '$' + format.formatWithThousandSeparators(occupation.averageWage);
    // TECH DEBT: JS doesn't have very good support for named constants but we should find a way around that
    if (occupation.averageWageOutOfRange == 1) {
        wageString = '>=' + wageString;
    }
    dict.averageWage = wageString;

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

    dict.careerGrowth = format.formatPercentage(occupation.careerGrowth);
}
