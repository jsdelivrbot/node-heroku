var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Node server is running***');
});
var senderId;
var redis = require("redis");
var redisPort =6380;
var redisUrl= 'azupsdsstred1.redis.cache.windows.net';
var redisAuth_pass='Ze6sjIhQGTl96rbe+mA3O3hbrskbRdlmpNUIbczv1Oo=';
var redisServername = 'azupsdsstred1.redis.cache.windows.net';
var client = redis.createClient(redisPort,redisUrl, {auth_pass: redisAuth_pass, tls: {servername: redisServername}});
	var orderDetails=require('./getPendingOrderDetails.js');
	var  items=orderDetails.items;
app.get('/', function (req, res) {

var io = require('socket.io-client');
var socket = io.connect('obscure-stream-93442.herokuapp.com/', {reconnect: true});

console.log('1');

socket.on('connect', function(data) {
	console.log('2');
    socket.on('response', function(data) {
		console.log('3');
                console.log(data);
        });
	
	});
	console.log('4');
	
 socket.on('eventemit', function(data) {
	 console.log('5');
                console.log(data);				
				senderId= data.event.sender.id;					
										
				 new Promise((resolve, reject) => {
						console.log('Initial');
                    
					   client.hgetall(senderId, function(err, obj) {			
						 if (err) {
							// Reject the Promise with an error
							return reject(err);
						  }
						  // Resolve (or fulfill) the promise with data
						  return resolve(obj);
						});
						 
				 }).then(redisInfo => {							
						console.log('Do this');
						 orderDetails.getPendingOrderDetails(redisInfo);
						
					}).catch(() => {
						console.log('Do that');
					});
				
        });
	console.log(" Inside fn items:");
	console.log(items);
	
	//res.status(200).send(JSON.stringify({items}));
	res.send(items);	
	
});
app.use('/getPendingOrderDetails:items', function(req, res) {        
    var itemsToDisplay = req.params.items;
  
});
app.post('/getPendingOrderDetails', function (req,res,next,itemsToDisplay) {
	
	req.itemsToDisplay = itemsToDisplay;
	res.send(itemsToDisplay);
    return next();
	
},function (req, res){
	res.sendFile(__dirname +'/'+'index.html');
	});
	

/*var Client = require('node-rest-client').Client;
 
var client = new Client();
 
// direct way 
client.get("https://obscure-stream-93442.herokuapp.com/getRepData", function (data, response) {
    // parsed response body as js object 
   // console.log(data);
     console.log("response");
    console.log(response.responseUrl);
	res.redirect(response.responseUrl);
	
});
 
// registering remote methods 
client.registerMethod("jsonMethod", "https://obscure-stream-93442.herokuapp.com/getRepData", "GET");
 
/*client.methods.jsonMethod(function (data, response) {
      
    console.log(data);
    // raw response 
    console.log(response);
});*/



