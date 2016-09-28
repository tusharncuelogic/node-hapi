module.exports = function(request, reply) {
    mysqldb.query('SELECT * FROM '+tbl_users+' where id = '+request.params.id+'', function(err, rows) {
      	if(err) throw err;
      	if(rows.length == 0) {
      		return reply({message:"No user found with this id . Please enter the correct user ID"});
      	}
      	else{
		    mysqldb.query('DELETE FROM '+tbl_users+' where id = ?',request.params.id, 
		        function(err, result) {
		      if (err) throw err ;
		      return reply({success:"User deleted successfully"});
		    });

      	}      	
    });   


}