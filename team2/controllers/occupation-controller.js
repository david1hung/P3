var occupationModel = require('../models/occupation');

module.exports.handleVideoPage = function(req, res) {
    occupationModel.find(req.params.occupation,
                         function (occupation) {
                             res.writeHead(200);
                             res.end(occupation.title);
                         },
                         function (err) {
                             res.writeHead(500);
                             res.end('Server error');
                         });
}

module.exports.handleCareerOutlookPage = function(req, res) {
    occupationModel.find(req.params.occupation,
                         function (occupation) {

                             var currentEmployment = parseFloat(occupation.currentEmployment);
                             var futureEmployment = parseFloat(occupation.futureEmployment);
                             var jobOpenings = parseFloat(occupation.jobOpenings);

                             res.render('careerOutlook.html',
                                        { 'occupationTitle' : occupation.title });
                         },
                         function (err) {
                             res.writeHead(500);
                             res.end('Server error');
                         });
};
