var mysql      = require('mysql');
var Joi = require('joi');
global.mysqldb = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'users_db'
});

global.tbl_users = 'users';
mysqldb.connect();

module.exports = [{
        method: 'POST' ,
        path: '/user',
        handler: require('./users/new.js') ,
        config: {
            validate: {
                payload: {
                    name: Joi.string().min(3).max(10).required(),
                    email: Joi.string().email().required(),
                    contact: Joi.number()
                }
            }
        }
    },
    {
        method: 'PUT' ,
        path: '/user',
        handler: require('./users/update.js') ,
        config: {
            validate: {
                payload: {
                    id: Joi.number().required(),
                    name: Joi.string().min(3),
                    email: Joi.string().email(),
                    contact: Joi.number()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/user/{id?}',
        handler: require('./users/delete.js'),
        config: {
            validate: {
                params: {
                    id: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/user/{id?}',
        handler: require('./users/view.js'),
        config: {
            validate: {
                params: {
                    id: Joi.number().required()
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: require('./users/users.js')
    },
    {
        method: 'GET',
        path: '/test',
        handler: require('./test.js')
    }];

//mysqldb.end();