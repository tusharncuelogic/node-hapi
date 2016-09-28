module.exports = function(request, reply) {
            mysqldb.query('SELECT * FROM '+tbl_users+' where id = ?', request.params.id , function(err, user) {
              if (err) return console.error(err) ;
              return reply(user);
            });
        }