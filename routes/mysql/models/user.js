var md5 = require('md5') ;
var DB = require('../config.js') ;
//Signup
module.exports.signup = function(req,res) {
	var user = req.payload ;
	DB.conn.queryAsync('SELECT * FROM '+DB.tbl_users+' where email = "'+user.email+'"').then(function(rows) {
      	if(rows.length == 0) {
      		var user = req.payload ;
      		user.password =  md5(req.payload.password) ;
		    DB.conn.queryAsync('INSERT INTO '+DB.tbl_users+' SET ?', user).then(function(result) {
		      res({success: "User created successfully"}) ;
		    });
      	}
      	else {
      		res({error:"Email already exist"}) ;
      	}
    });
}

module.exports.login = function(req,res) {
	DB.conn.queryAsync('SELECT id , email FROM '+DB.tbl_users+' where email = "'+req.payload.email+'" and password = "'+md5(req.payload.password) + '" limit 1').then(function(rows) {
      	if(rows.length == 0) {
      		res({error:"Invalid credentials. Please try with different credentials"}) ;
      	}
      	else {
      		var user  = rows[0] ;      		
      		var token = jwt.encode(rows,jwt_secret) ;
      		DB.conn.queryAsync('UPDATE '+DB.tbl_users+' SET token = "'+token+'" where id = '+user.id).then(function(result) {
		      res({success : "User logged in successfully",token : token});
		    });
      	}
    });
}

module.exports.users = function(req,res) {
    DB.conn.queryAsync("SELECT * FROM "+DB.tbl_users).then(function(users) {
		res(users) ;
	});
}

module.exports.view = function(req,res) {
	DB.conn.queryAsync('SELECT * FROM '+DB.tbl_users+' where id = ?', req.params.id).then(function(user){res(user);});	
}


module.exports.delete = function(req,res) {
	DB.conn.queryAsync('SELECT * FROM '+DB.tbl_users+' where id = ?', req.params.id).then(function(rows) {		
		if(rows.length == 0) {
      		res({message:"No user found with this id . Please enter the correct user ID"});
      	}
      	else {
		    DB.conn.queryAsync('DELETE FROM '+DB.tbl_users+' where id = ?',req.params.id).then(function(result) {
		      res({success:"User deleted successfully"});
		    });
      	}
	});
}

module.exports.update = function(req, res) {
	DB.conn.queryAsync('SELECT * FROM '+DB.tbl_users+' where id = '+req.payload.id+'').then(function(rows) {
      	if(rows.length == 0) {
      		res({message:"No user found with this id . Please enter the correct user ID"});
      	}
      	else {
      		var updateQryStr = '';
      		var update = [];
      		if(req.payload.name)
      		{
      			updateQryStr += 'name = ?';
      			update.push(req.payload.name);
      		}
      		if(req.payload.email)
      		{
      			updateQryStr += 'email = ?';
      			update.push(req.payload.email);
      		}
      		if(req.payload.contact)
      		{
      			updateQryStr += 'contact = ?';
      			update.push(req.payload.contact);
      		}
      		update.push(req.payload.id);
      		DB.conn.queryAsync('UPDATE '+DB.tbl_users+' SET '+updateQryStr+' where id = ?',update).then(function(result) {
		      res({message: "User updated successfully"});
		    });
      	}      	
    });
}

module.exports.friends =  function(req, res) {	
	var qry   = 'SELECT U.id, U.name, U.email FROM '+DB.tbl_friends +' as F inner join '+DB.tbl_users+' U on F.friend = U.id and F.user = ' + req.user.id ;
	var search = '';
	if(req.query.s) {
		qry +=' and U.name like ?';
		search = req.query.s;
	}
	DB.conn.queryAsync(qry,'%'+search+'%').then(function(friends){
		res(friends) ;
	});
}

module.exports.friend_add =  function(req,res) {	
	DB.conn.queryAsync('SELECT * FROM '+DB.tbl_friends+' where user = ? and friend = ?', [ req.user.id , req.params.friendId ]).then(function(rows) {
		if(rows.length == 0){
			DB.conn.queryAsync('INSERT INTO '+DB.tbl_friends+' SET ?', {user : req.user.id , friend: req.params.friendId}).then(function(result) {
		      res({success: "Friend added successfully"}) ;
		    });
		}
		else
		{
			res({success: "Friend already exist"}) ;
		}
	});
}

module.exports.friend_remove =  function(req, res) {	
	DB.conn.queryAsync('SELECT * FROM '+DB.tbl_friends+' where user = ? and friend = ?',[req.user.id, req.params.friendId]).then(function(friends) {
      	if(friends.length == 0) {
			res({success: "No such friend exist"}) ;
		}
		else
		{
			DB.conn.queryAsync('DELETE FROM '+DB.tbl_friends+' WHERE id = ? ',friends[0].id ).then(function(result) {
		      res({success: "Friend removed successfully"}) ;
		    });
		}
    });
}

module.exports.friend_view =  function(req, res) {	
	DB.conn.queryAsync('SELECT * FROM '+DB.tbl_friends+' where user = ? and friend = ?',[req.user.id, req.params.friendId]).then(function(friends) {
      	if(err) throw(err) ;
      	if(friends.length == 0) {
			res({error: "It's not your friend."}) ;
		}
		else
		{
			DB.conn.queryAsync('SELECT U.name , U.email , U.contact FROM '+DB.tbl_users+' as U where id = ? ',req.params.friendId).then(function(friend) {
		      res(friend) ;
		    });			
		}
    });
}

module.exports.logout = function(req,res) {
	DB.conn.queryAsync('UPDATE '+DB.tbl_users+' SET token = "" where id = ?', req.user.id).then(function(result) {
      res({success : "You have successfully logged out"});
    });
}