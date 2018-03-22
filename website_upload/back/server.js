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
/*
server.get('/api/:username', function (req, res) {
    var username = req.params.username;
    client.get(username, function (error, result) {
        if (result) {
            // the result exists in our cache - return it to our user immediately
            res.send({ "totalStars": result, "source": "redis cache" });
        } else {
                if (response.status === 404) {
                    es.send('The  username could not be found. Try "coligo-io" as an example!');
                } else {
                    res.send(response);
                    }         
        }
    });
});
*/
/*
server.post('api/add/',function(req,res){
    console.log("requete"+req);
    console.log("response"+res);
    res.send(response.status == 200);
    /*
    client.get(username, function (error, result) {
        if (result) {
            // the result exists in our cache - return it to our user immediately
            res.send(response.status === 500); // voir hset sur redis
        } else {
                if (response.status === 500) {
                    res.send('The  username alreaydy exist. Try another!');
                } else {
                    var password=req.params.password;
                    client.set(username,password);
                    res.send(response);
                    }         
        }
    });
    
});
*/
server.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon serveur </h1>');
});
server.use('/api/',apiRouter);
//launch server
client.on('error', function (err) {
    console.log("Error " + err);
});
server.listen(8081, function () {
    console.log("serveur en écoute");
});
