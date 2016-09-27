module.exports = [{
        method: 'GET',
        path: '/animal',
        handler: require('./animal.js') 
    },
    {
        method: 'GET',
        path: '/users',
        handler: require('./user.js')
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