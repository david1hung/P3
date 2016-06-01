// require the module
var mysql 	  = 	require('mysql');
var fs 		    = 	require('fs');
var express   = 	require("express");
var app       = 	express();
var algorithmModel = require('../models/algorithm');

var config = JSON.parse(fs.readFileSync(__dirname + '/../config/db-config.json', 'utf8'));

var connectionPool = mysql.createPool(config);

var userId = 1;

module.exports.handle_filters = function(req, res, soc, salary, edu) {
    
    connectionPool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        /* get thread IDs for debugging */
        //console.log('connected as id ' + connection.threadId);
        
        //var pname = window.location.pathname;
        //var socPos = pname.search(/[0-9][0-9]-[0-9][0-9][0-9][0-9]/);
        //var soc = pname.substring(socPos, socPos+2).concat(pname.substring(socPos+3, socPos+7));
        var userId = 1; //set to 1 for testing, but would use req.userId if logged in
        var query = "INSERT INTO UserFilters (id, soc, salary, edu) Values(" + userId + "," + soc + "," + salary + "," + edu ") ON DUPLICATE KEY UPDATE salary="+salary + ",edu=" + edu;
        // connect to database
          connection.query(query, function(err, fields){
                if (err) throw err;
              console.log("Success for query " + query);
              });
          
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

// Get Ratings from ViewedVids

// rating describes what dislike (-1), neutral (0), and like (+1)
module.exports.handle_database = function(req,res) {
    
    connectionPool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        /* get thread IDs for debugging */
        //console.log('connected as id ' + connection.threadId);
        
        // connect to database
	      connection.query('SELECT * FROM SOCRatings', function(err, rows, fields){
				if (err) throw err;
			  console.log("Results: ", rows);
			  });
    	  

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}


module.exports.handleVideoLike = function(req,res) {
	
        algorithmModel.getFirstVid(
            function (soc) {
                res.redirect('/career/' + soc + '/video');
            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            });
	
}

module.exports.handleVideoNeutral = function(req,res) {


        algorithmModel.getSecondVid(
            function (soc) {
                res.redirect('/career/' + soc + '/video');
            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            });
}


module.exports.handleVideoDislike = function(req, res) {


        algorithmModel.getThirdVid(
            function (soc) {
                res.redirect('/career/' + soc + '/video');
            },
            function (err) {
                res.writeHead(500);
                res.end('Server error');
            });
}

app.get("/",function(req,res){
        handle_database(req,res);
});

app.listen(3000);
