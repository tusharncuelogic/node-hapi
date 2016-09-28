//Mongo DB Connections
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
mongoose.connect('mongodb://localhost/users_db') ;
var db = mongoose.connection;
var UserSchema = mongoose.Schema({
    name: String,
    email: String
});
var User = mongoose.model('User', UserSchema) ;


module.exports = [{
        method: 'GET',
        path: '/user/{Id}',
        handler: function(request,reply) {
            conn.collection('users').remove({_id:new ObjectID(request.params.Id) }, function(err) {
                if (!err) return console.error(err);
                return reply({success:"User deleted"}) ;
            });            
        }
    },
    {
        method: 'POST',
        path: '/user',
        handler: function(request, reply) {            
            var data = {name : request.payload.name ,email: request.payload.email } ;            
            var user = new User(data);
            user.save(function(err , user) {
                if (err) return console.error(err);                
                return reply({success:"User added" });
            });                       
        }
    },
    {
        method: 'GET',
        path: '/users',
        handler: function(request, reply) {
            User.find(function (err, users) {
              if (err) return console.error(err) ;
              return reply(users);
            })
        }
    }];