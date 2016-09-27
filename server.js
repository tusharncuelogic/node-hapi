'use strict';

var hapi = require('hapi'),
    server = new hapi.Server();

var routes = require('./routes') ;

var nm = require('./routes/names');
console.log("Executing the server.js file");
nm.setName("Tushar Nikam");
var newname = nm.getName();
console.log(newname);
server.register(require('inert'), function(err) {

    if (err) {
        throw err;
    }

    server.connection({ port: 8000 });

    server.route(routes);
    
    server.start(function(err) {
        if (err) {
            throw err;
        }
        console.log('Web server is listening to http://localhost:8000');
    });    
});