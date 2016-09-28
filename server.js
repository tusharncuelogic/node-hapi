'use strict';

var hapi = require('hapi'),
    server = new hapi.Server();

server.register(require('inert'), function(err) {

    if (err) { throw err; }

    server.connection({ port: 8000 });

    server.route(require('./routes/mysql'));

    //server.route(require('./routes/mysql'));
    //Enable above for mongodb routing with same urls
    
    server.start(function(err) {
        if (err) {
            throw err;
        }
        console.log('Web server is listening to http://localhost:8000');
    });    
});