var async = require("async");
var Promise = require('bluebird') ;
var mysql_qry = Promise.promisify(mysqldb.query) ;


module.exports  = function(req,res) {

	mysql_qry("SELECT * FROM users").then(function(users) {
		res(users);
	},function(err){res("okkk");});

	/*sendUserDataA("sendUserDataA Method called").then(function(response){
		res(response) ;
	});*/

	/*
	sendUserDataWithPromise("Tushar").then(function(result){
		res(result);
	},function(err){res(err);});
	*/
}

sendUserDataWithPromise = function(username) {
	return new Promise(function (resolve, reject) {
        if(username=='Tushar'){
        	reject("Error in username") ;
        }
        else
        {
        	resolve("Username is "+ username) ; 
        }
    });
}

global.sendUserData = function(username,cb) {	
	cb(null,{username:username}) ;
}