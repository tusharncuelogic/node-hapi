const Joi = require('joi') ;
var User = require('./models/user.js') ;
var valid = {
    id : Joi.number(),
    name:Joi.string().min(3).max(10),
    email : Joi.string().email(),
    password : Joi.string().alphanum().min(3).max(20),
    contact : Joi.number()
} ;

module.exports = [{
        method: 'POST',
        path: '/login',
        handler: User.login,
        config: {
            auth: false,
            validate: {
                payload: {
                    email: valid.email.required() ,
                    password : valid.password.required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/signup',
        handler: User.signup ,
        config: {
            auth: false,
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
    },    
    {
        method: 'GET',
        path: '/logout',
        handler: User.logout
    },    
    {
        method: 'GET',
        path: '/test',
        handler: require('./test.js')
    }];

//mysqldb.end();