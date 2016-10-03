'use strict';
var hapi = require('hapi'),
    server = new hapi.Server();
global.jwt = require('jwt-simple');
global.jwt_secret = 'testsecretkey'; //Changing this secret will reset all token to false

const onRequest = function (request , reply) {
    var allowed = ['/login','/signup'] ;   
    if(allowed.indexOf(request.url.path) >= 0)
    {
        return reply.continue() ;
    }
    else
    {
        try {
            var user = jwt.decode(request.headers.authorization , jwt_secret) ;
            request.user =  user[0];
            return reply.continue();
        } catch(err) {
            return reply("Invalid token") ;
        }
    }    
};

server.register(require('inert'), function(err) {
    if (err) { throw err; }
    server.connection({ port: 8000 });
    server.ext('onRequest', onRequest) ;
    server.route(require('./routes/mysql')) ;
    //server.route(require('./routes/mongo'));
    //Enable above for mongodb routing with same urls
    server.start(function(err) {
        if (err) {
            throw err;
        }
        console.log('Web server is listening to http://localhost:8000');
    });    
});