var Promise = require("bluebird");
module.exports  = function(req,res) {
        
    /*
    Promise.all([Fn1,Fn2,Fn3]).then(function(results) {
        console.log("all the files were created");
        res(results);
    });
    */

    /*Promise.all([Fn1,Fn2,Fn3 ]).spread(function(res1, res2,res3) {
        console.log(res2);
        res(res1);
    })
    .error(function (e) {
        console.error("unable to read file, because: ");
    });
    */

    //Promise spread method
    Promise.all([Fn1(),Fn2(),Fn3()]).spread(function(res1,res2,res3){
        console.log(res1);
        console.log(res2);
        console.log(res3);
        res(res3);
    });

    /*Fn1().then(Fn2).then(Fn3).then(function(result){
        res(result) ;
    });*/

    console.log("I am outside functions");

    /*Fn1().then(function(final){
        res(final);
    }) ;*/

}

sendUserDataWithPromise = function(username) {
	return new Promise(function (resolve, reject) {
        if(username=='Tushar') {
        	reject("Error in username") ;
        }
        else
        {
        	resolve("Username is "+ username) ; 
        }
    });
}

var Fn1 = function() {
    return new Promise(function(resolve,reject) {
        setTimeout(function () {
            console.log("In Promise fn1") ;
            resolve({user:"This s username 1"}) ;
        },200) ;        
    });
}

function Fn2(pr2) {
    return new Promise(function(resolve,reject) {  
        setTimeout(function () {
            console.log("In Promise fn2") ;
            resolve({user:"This s username 2"}) ;
        },500) ;        
    });
}
function Fn3(args2) {
    return new Promise(function(resolve,reject) { 
        setTimeout(function () {
            console.log("In Promise fn3");
            resolve({user:"This s username 3"});
        },300) ;       
        
    });
}