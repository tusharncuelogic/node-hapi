var mysql      = require('mysql');
var Joi = require('joi');
global.mysqldb = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'users_db'
}) ;
global.tbl_users = 'users';
global.tbl_friends = 'friends';

//Dont change after first set

mysqldb.connect();
var User = require('./models/user.js') ;
var valid = {
    id : Joi.number(),
    name:Joi.string().min(3).max(10),
    email : Joi.string().email(),
    password : Joi.string().alphanum().min(3).max(20),
    contact : Joi.number()
};



module.exports = [{
        method: 'POST',
        path: '/login',
        handler: User.login,
        config: {
            validate: {
                payload: {
                    email: valid.email ,
                    password : valid.password
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/signup',
        handler: User.signup ,
        config: {
            validate: {
                payload: {
                    name:valid.name ,
                    email:valid.email ,
                    password:valid.password,
                    contact: valid.contact
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/update',
        handler: User.update ,
        config: {
            validate: {
                payload: {
                    id: valid.id,
                    name: valid.name ,
                    email: valid.email ,
                    contact: valid.contact
                }
            }
        }
    },
    {
        method: ['DELETE','GET'],
        path: '/user/delete/{id?}',
        handler: User.delete,
        config: {
            validate: {
                params: {
                    id: valid.id
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/user/{id?}',
        handler: User.view ,
        config: {
            validate: {
                params: {
                    id: valid.id
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: User.users
    },    
    {
        method: 'GET',
        path: '/friends',
        handler: User.friends ,
        config: {
            validate: {
                params: {
                    id: valid.id
                }
            }
        }
    },    
    {
        method: 'GET',
        path: '/friend/add/{friendId?}',
        handler: User.friend_add ,
        config: {
            validate: {
                params: {
                    friendId: valid.id.required()
                }
            }
        }
    },    
    {
        method: 'GET',
        path: '/friend/remove/{friendId?}',
        handler: User.friend_remove,
        config: {
            validate: {
                params: {
                    friendId: valid.id.required()
                }
            }
        }
    },    
    {
        method: 'GET',
        path: '/friend/view/{friendId?}',
        handler: User.friend_view,
        config: {
            validate: {
                params: {
                    friendId: valid.id.required()
                }
            }
        }
    }];

//mysqldb.end();