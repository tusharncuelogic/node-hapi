var fs = require("fs");
var async = require("async");

module.exports = function(request, reply) {

	/*fs.readFile('/home/tushar/training/user.txt', 'utf8',function(err, data) {
	  if (err) return reply(err);
	  return reply(data) ;
	});*/

	/*async.parallel([
	    sendUserData.bind(null,"Tushar Nikam"),
	    sendUserData.bind(null,"Piyush Balapure")
	], function(err, results) {
		console.log("Reading all the results") ;
		console.log(results) ;
		return reply(results);
	});*/

	/*async.map(['Tushar','Piyush','Sandeep'], sendUserData, function(err, results){
		console.log(results);
		return reply(results);
	});*/

	console.log("Called after stat function") ;

    /*sendUserData("Tushar",function(err, response) {
    	if(err){return reply(err);}
    		console.log("Got reponse");
    		return reply(response);
    });	*/
    
}

global.sendUserData = function(username , cb ){
	//var err = new Error("Errr occured");
	cb("err" , {username:username}) ;
}