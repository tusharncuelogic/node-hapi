module.exports = function(request, reply) {	
	mysqldb.query('SELECT * FROM '+tbl_users+' where id = '+request.payload.id+'', function(err, rows) {
      	if(err) throw err;
      	if(rows.length == 0){
      		return reply({message:"No user found with this id . Please enter the correct user ID"});
      	}
      	else{
      		var updateQryStr = '';
      		var update = [];
      		if(request.payload.name)
      		{
      			updateQryStr += 'name = ?';
      			update.push(request.payload.name);
      		}
      		if(request.payload.email)
      		{
      			updateQryStr += 'email = ?';
      			update.push(request.payload.email);
      		}
      		if(request.payload.contact)
      		{
      			updateQryStr += 'contact = ?';
      			update.push(request.payload.contact);
      		}

      		update.push(request.payload.id);
      		mysqldb.query('UPDATE '+tbl_users+' SET '+updateQryStr+' where id = ?',update, function(err, result) {
		      if (err) throw(err);
		      console.log(result);
		      return reply({message: "User updated successfully"});
		    });
      	}      	
    });   

}