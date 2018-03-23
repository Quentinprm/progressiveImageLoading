var bcrypt = require("bcrypt");
var jwtUtils= require('../utils/jwt.utils')
var redis = require('redis');
var axios = require('axios');
var client = redis.createClient();
//Routes
module.exports= {
    AddUserImage: function(req,res){
        
    },
    getUserImage:function(req,res){
        var headerAuth=req.headers['authorization'];
        var token=jwt.jwtUtils.parseAuthorization(headerAuth);
    }
}