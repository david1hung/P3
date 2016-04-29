var occupation = require('../models/occupation');

module.exports.handleVideoPage = function(req, res) {
    occupation.find(req.params.occupation, function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.writeHead(500);
            res.end('Server error');
            return;
        }
        
        if (rows.length == 0) {
            res.writeHead(200);
            res.end('No occupation found');
            return;
        }

        res.writeHead(200);
        res.end(rows[0].soc);
    });
}
