var DB = require('./config.js') ;
module.exports  = function(req,res) {
	DB.conn.queryAsync("SELECT * FROM users").then(function(users) {
		res(users) ;
	});
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