var occupationModel = require('../models/occupation');

module.exports.handleVideoPage = function(req, res) {
    occupationModel.find(req.params.occupation,
                         function (occupation) {
                             res.render('video.html',
                                        { 'occupationTitle' : occupation.title });
                         },
                         function (err) {
                             res.writeHead(500);
                             res.end('Server error');
                         });
}

module.exports.handleCareerOutlookPage = function(req, res) {
    occupationModel.find(req.params.occupation,
                         function (occupation) {

                             var currentEmployment = parseFloat(occupation.currentEmployment) * 1000;
                             var futureEmployment = parseFloat(occupation.futureEmployment) * 1000;
                             var jobOpenings = parseFloat(occupation.jobOpenings) * 1000;
                             // Calculate percent change
                             var percentChange = (futureEmployment - currentEmployment) / currentEmployment;

                             // Format numbers
                             var currentEmploymentString = formatWithThousandSeparators(currentEmployment);
                             var futureEmploymentString = formatWithThousandSeparators(futureEmployment)
                             var jobOpeningsString = formatWithThousandSeparators(jobOpenings);
                             var percentChangeString = formatPercentage(percentChange);

                             res.render('careerOutlook.html',
                                        { 'occupationTitle' : occupation.title,
                                          'currentEmployment' : currentEmploymentString,
                                          'futureEmployment' : futureEmploymentString,
                                          'percentChange' : percentChangeString,
                                          'jobOpenings' : jobOpeningsString });
                         },
                         function (err) {
                             res.writeHead(500);
                             res.end('Server error');
                         });
};

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
