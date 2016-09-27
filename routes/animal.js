module.exports = function(request, reply) {
	
    sendUserData("Animal Name",function(response){
    	return reply(response) ;
    });

}