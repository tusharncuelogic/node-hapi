
module.exports.test = function(req,res) {
	Promise.all([a,b,c]).spread(function(res1,res2,res3) {
		console.log("Get all the data") ;
		console.log(res1.insertId);
		console.log(res2.insertId);
		console.log(res3.insertId);
		res("Done") ;
	})
	.catch(function(err){
		console.log("Have error");
		console.error(err);		
		res(Error(err));
	});
  
}

var addFirst = function() {
	var user  = {name : "Aman", email:"aman@cuelogic.com",password:"testpass",contact:123456789 } ;
	return DB.conn.queryAsync('INSERT INTO '+DB.tbl_users+' SET ?', user) ;	
}

var addSecond = function(firstId) { 	
	var user = {name:"Nikhil", email:"nikhil@cuelogic.com",password:"testpass",contact:123456789 } ;
	return	DB.conn.queryAsync('INSERT INTO '+DB.tbl_users+' SET ?', user) ;
}

var addThird = function() {
	var user  = {name : "Aditya", email:"aditya@cuelogic.com",password:"testpass",contact:123456789 } ;
	return DB.conn.queryAsync('INSERT INTO '+DB.tbl_users+' SET ?', user);
}
