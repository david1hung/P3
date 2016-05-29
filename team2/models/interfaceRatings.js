// require the module
var mysql 	  = 	require('mysql');
var fs 		    = 	require('fs');
//var express   = 	require("express");
//var app       = 	express();

var config = JSON.parse(fs.readFileSync('../db-config.json', 'utf8'));

var connectionPool = mysql.createPool(config);

//var userId = 1;

// Get Ratings from ViewedVids

// rating describes what dislike (-1), neutral (0), and like (+1)
module.exports.handle_rating = function(req,res,rating,userId) {
    
    connectionPool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        /* get thread IDs for debugging */
        //console.log('connected as id ' + connection.threadId);
        
        var pname = window.location.pathname;
        var socPos = pname.search(/[0-9][0-9]-[0-9][0-9][0-9][0-9]/);
        var soc = pname.substring(socPos, socPos+7);
        var query = "UPDATE SOCRatings SET rating = " + rating + " WHERE id = " + userId;
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

/*
app.get("/",function(req,res,rating){
        handle_rating(req,res,rating);
});

app.listen(3000);
*/