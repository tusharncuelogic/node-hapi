var md5 = require('md5');

//Signup
module.exports.signup = function(req,res) {
	var user = req.payload ;
	mysqldb.query('SELECT * FROM '+tbl_users+' where email = "'+user.email+'"', function(err, rows) {
      	if(err) throw err;
      	if(rows.length == 0) {
      		var user = req.payload ;
      		user.password =  md5(req.payload.password);
		    var query = mysqldb.query('INSERT INTO '+tbl_users+' SET ?', user , function(err, result) {
		      if (err) return console.error(err) ;
		      res({success: "User created successfully"}) ;
		    });
      	}
      	else {
      		res({error:"Email already exist"}) ;
      	}      	
    });
}

module.exports.login = function(req,res) {
	mysqldb.query('SELECT id , email FROM '+tbl_users+' where email = "'+req.payload.email+'" and password = "'+md5(req.payload.password) + '" limit 1',function(err, rows) {
      	if(err) throw err;
      	if(rows.length == 0) {
      		res({error:"Invalid credentials. Please try with different credentials"}) ;
      	}
      	else {
      		var user  = rows[0] ;      		
      		var token = jwt.encode(rows,jwt_secret) ;
      		mysqldb.query('UPDATE '+tbl_users+' SET token = "'+token+'" where id = '+user.id, function(err, result) {
		      if(err) throw(err);
		      console.log(result);
		      res({success : "User logged in successfully",token : token});
		    });
      	}
    });
}

module.exports.users = function(req,res) {
	mysqldb.query('SELECT * FROM '+tbl_users+'',function(err, rows, fields) {
      if (err) throw(err);
      res(rows) ;
    });
}

module.exports.view = function(req,res) {
	mysqldb.query('SELECT * FROM '+tbl_users+' where id = ?', req.params.id , function(err, user) {
      if(err) throw(err) ;
      res(user);
    });
}


module.exports.delete = function(req,res) {
	mysqldb.query('SELECT * FROM '+tbl_users+' where id = '+req.params.id+'', function(err, rows) {
      	if(err) throw err;
      	if(rows.length == 0) {
      		res({message:"No user found with this id . Please enter the correct user ID"});
      	}
      	else{
		    mysqldb.query('DELETE FROM '+tbl_users+' where id = ?',req.params.id,function(err, result) {
		      if (err) throw err ;
		      res({success:"User deleted successfully"});
		    });
      	}
    });
}

module.exports.update =  function(req, res){
	mysqldb.query('SELECT * FROM '+tbl_users+' where id = '+req.payload.id+'', function(err, rows) {
      	if(err) throw err;
      	if(rows.length == 0) {
      		res({message:"No user found with this id . Please enter the correct user ID"});
      	}
      	else{
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
      		mysqldb.query('UPDATE '+tbl_users+' SET '+updateQryStr+' where id = ?',update, function(err, result) {
		      if (err) throw(err);
		      res({message: "User updated successfully"});
		    });
      	}      	
    });
}

module.exports.friends =  function(req, res) {
	var token = req.headers.authorization ;
	var user  = jwt.decode(token,jwt_secret) ;
	var qry   = 'SELECT U.id, U.name, U.email FROM '+tbl_friends +' as F inner join '+tbl_users+' U on F.friend = U.id and F.user = ' + user[0].id ;
	var search = '';
	if(req.query.s) {
		qry +=' and U.name like ?';
		search = req.query.s;
	}
	mysqldb.query( qry, '%'+search+'%' ,function(err, rows) {
      	if(err) throw err ;
      	res(rows) ;
    });
}

module.exports.friend_add =  function(req,res) {

	var token = req.headers.authorization ;
	var user  = jwt.decode(token,jwt_secret) ;
	mysqldb.query('SELECT * FROM '+tbl_friends+' where user = ? and friend = ?', user[0].id,  req.params.friendId ,function(err, rows) {
		if(rows.length == 0){
			var query = mysqldb.query('INSERT INTO '+tbl_friends+' SET ?', {user : user[0].id , friend: req.params.friendId} , function(err,result) {
		      if (err) throw err ;
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
	var token = req.headers.authorization ;
	var user  = jwt.decode(token,jwt_secret) ;
	mysqldb.query('SELECT * FROM '+tbl_friends+' where user = ? and friend = ?',[user[0].id, req.params.friendId] , function(err, friends) {
      	if(err) throw(err) ;
      	if(friends.length == 0) {
			res({success: "No such friend exist"}) ;
		}
		else
		{
			var query = mysqldb.query('DELETE FROM '+tbl_friends+' WHERE id = ? ',friends[0].id , function(err, result) {
		      if (err) throw err ;
		      res({success: "Friend removed successfully"}) ;
		    });			
		}
    });
}

module.exports.friend_view =  function(req, res) {
	var token = req.headers.authorization ;
	var user  = jwt.decode(token,jwt_secret) ;
	mysqldb.query('SELECT * FROM '+tbl_friends+' where user = ? and friend = ?',[user[0].id, req.params.friendId] , function(err, friends) {
      	if(err) throw(err) ;
      	if(friends.length == 0) {
			res({error: "It's not your friend."}) ;
		}
		else
		{
			mysqldb.query('SELECT U.name , U.email , U.contact FROM '+tbl_users+' as U where id = ? ',req.params.friendId , function(err, friend) {
		      if (err) throw err ;
		      res(friend) ;
		    });			
		}
    });
}