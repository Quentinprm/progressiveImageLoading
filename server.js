//imports
var express = require("express");
var bodyParser= require("body-parser");
var redis = require('redis');
var axios = require('axios');
var apiRouter=require('./apiRouter').router;
//Instantiable server
var server = express();
var client = redis.createClient();
// Body Parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
//configurer routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur le serveur de PIL </h1>');
});
server.use('/api/',apiRouter);
//launch server
client.on('error', function (err) {
    console.log("Error " + err);
});
server.listen(8081, function () {
    console.log("serveur en écoute");
});
