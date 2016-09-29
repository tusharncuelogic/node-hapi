module.exports = function(request, reply) {
    var user = request.payload;
    user.status = 1;            
    var query = mysqldb.query('INSERT INTO '+tbl_users+' SET ?', user, function(err, result) {
      if (err) return console.error(err) ;
      return reply({message: "User created successfully"});
    });
}