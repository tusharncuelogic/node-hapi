var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
mongoose.connect('mongodb://localhost/users_db') ;
var conn = mongoose.connection;

module.exports = [{
        method: 'GET',
        path: '/user_delete/{Id}',
        handler: function(request,reply) {
            conn.collection('users').remove({_id:new ObjectID(request.params.Id) }, function(err) {
                if (!err) {
                        console.log(err);
                }
                else {
                        console.log("success") ;
                }
            });
            
            return reply({success:"User deleted"}) ;
        }
    },
    {
        method: 'GET',
        path: '/animal',
        handler: require('./animal.js') 
    },
    {
        method: 'POST',
        path: '/user',
        handler: function(request, reply) {
            var data = {name : request.payload.name , _id: new ObjectID() } ;
            conn.collection('users').insert(data);
            return reply({success:"User added"});
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: function(request, reply) {
            conn.collection('users').find({} , function(err, response) {
                if(err) {
                    console.log("Error occured") ; 
                    console.log(err) ;
                }
                return reply(response.toArray());
            });
        }
    },
    {
        method: 'GET',
        path: '/hello/{user?}',
        handler: function(request, reply) {
            return reply({name: request.params.user? request.params.user:"World"});
        }
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: function(request, reply) {
            reply.file('./public/file.html') ;
        }
}];