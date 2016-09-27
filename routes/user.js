module.exports = function(request, reply) {
    
    sendUserData("User Name",function(response){
    	return reply(response) ;
    });
}

global.sendUserData = function(username , cb ){
	cb({username:username}) ;
}