// require the module
var mysql 	  = 	require('mysql');
var fs 		    = 	require('fs');
//var express   = 	require("express");
//var app       = 	express();

var config = JSON.parse(fs.readFileSync(__dirname + '/../config/db-config.json', 'utf8'));

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
        
        var pname = req.url;
		console.log(pname);
        var socPos = pname.search(/[0-9][0-9]-[0-9][0-9][0-9][0-9]/);
		console.log(socPos);
        var soc = pname.substring(socPos, socPos+2).concat(pname.substring(socPos+3, socPos+7));
		console.log(soc);
        var query = "INSERT INTO ViewHistory (id, soc, rating) Values(" + userId + "," + soc + "," + rating + ") ON DUPLICATE KEY UPDATE rating="+rating;
		console.log(query);
		//var query = "UPDATE ViewHistory SET rating = " + rating + " WHERE id = " + userId + " and soc = " + soc + ";";
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

// Gets the list of ratings for this user. Since this method is generally used
// by the profile page, it also performs a join in order to get the title of
// the occupations.
module.exports.getViewHistoryForUser = function(id, successNext, errNext) {
    var connection = mysql.createConnection(config);
    connection.connect();

    connection.query("SELECT VH.soc, VH.rating, O.title FROM ViewHistory VH, Occupation O WHERE VH.id = ? AND VH.soc = O.soc", [id], function(err, rows, fields) {
        if (err) {
            return errNext(err);
        }

        return successNext(rows);
    });
}

/*
app.get("/",function(req,res,rating){
        handle_rating(req,res,rating);
});

app.listen(3000);
*/
