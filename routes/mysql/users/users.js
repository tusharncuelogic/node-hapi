module.exports = function(request, reply) {
    mysqldb.query('SELECT * FROM '+tbl_users+'',function(err, rows, fields) {
      if (err) return console.error(err);
      console.log(rows) ;
      return reply(rows);
    });
}