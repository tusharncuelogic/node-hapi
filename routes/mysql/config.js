const Bluebird = require('bluebird') ;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'users_db'
});
var conn = Bluebird.promisifyAll(connection) ;
module.exports = {conn:conn , tbl_users:'users', tbl_friends:'friends'};