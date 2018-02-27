var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Node server is running***');
});

	
app.get('/', function (req, res) {
/*res.sendFile(__dirname +'/'+'index.html');
var io = require('socket.io-client');
var socket = io.connect('obscure-stream-93442.herokuapp.com/', {reconnect: true});

console.log('2');

socket.on('connect', function(data) {
    socket.emit('join', 'Hello World from client');
	
	});
socket.on('messages', function(data) {
                console.log(data);
        });*/
var Client = require('node-rest-client').Client;
 
var client = new Client();
 
// direct way 
client.get("http://remote.site/rest/xml/method", function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});
 
// registering remote methods 
client.registerMethod("jsonMethod", "http://remote.site/rest/json/method", "GET");
 
client.methods.jsonMethod(function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});

});

