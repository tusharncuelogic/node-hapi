var async = require("async");

module.exports = function(request , reply) {
	var dt = [];

	/*sendUserData("Tushar",function(response) {
		setTimeout(function () {
			console.log("Got reponse") ;
		  	dt = response;
		}, 100) ;
	});*/

	/*async.map(['Tushar','Piyush','Sandeep'], sendUserData ,function(err,results){
		dt = results ;
		console.log(results) ;
	});*/

	async.series([
	    sendUserData.bind(null, "Tushar Test") ,
	    sendUserData.bind(null, "Tushar Test 2") ,
	    sendUserData.bind(null, "Tushar Test 3") 
	]);
	
	/*async.series([
	    sendUserData("Tushar Testing", function(){
	    	console.log("Procesed first callback");
	    }),
	    sendUserData("Tushar Testing 2", function(){
	    	console.log("Procesed second callback");
	    })
	],
	function(err, results) {
		console.log("Prcesed all cbs");
		console.log(results);
	});*/

    console.log("Response");  
    return reply(dt);  
    

}

global.sendUserData = function(username , cb ) {
	console.log(username);
	setTimeout(function () {
		cb(null,{username:username}) ;
	}, 100) ;	
}

global.sendUserData2 = function(username , cb ){
	//var err = new Error("Errr occured");
	cb({username:username}) ;
}