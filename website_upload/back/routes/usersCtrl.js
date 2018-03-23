var bcrypt = require("bcrypt");
var jwtUtils= require('../utils/jwt.utils')
var redis = require('redis');
var axios = require('axios');
var client = redis.createClient();
// Constants
const EMAIL_REGEX     = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
//Routes
module.exports= {
    delete: function(req,res){
    var headerAuth=req.headers['authorization'];
    var userId=jwtUtils.getUserId(headerAuth);
    console.log("userId:"+userId);
    if (userId==-1){
        return res.status(400).json({'error':'wrong token'});
    }
    client.hgetall(userId,function(error,result){
        if(result){
            console.log(result.sessiontoken==jwtUtils.parseAuthorization(headerAuth));
            if(result.sessiontoken==jwtUtils.parseAuthorization(headerAuth)){
                client.del(userId,function(err,resultat){
                    if(resultat){
                        return res.status(200).json({'msg':'account delete'});
                    }
                });
                
            }else{
                return res.status(400).json({'error':'this token is a previous version'});
            }      
        }else{
            return res.status(404).json({"error":"user not exist in DB"});
        }
    });
},
    register: function(req,res){
        console.log("register route");
        //Params
        var email= req.body.email;
        var username=req.body.username;
        var password=req.body.password;
        console.log("try to register with email:"+email+" username:"+username+" and password:"+password);
        if(email == null || username==null || password==null){
            return res.status(400).json({'error':'missing parameters'});
        }
        if (username.length >= 13 || username.length <= 4) {
            return res.status(400).json({ 'error': 'wrong username (must be length 5 - 12)' });
        }
        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
         }
         if (!PASSWORD_REGEX.test(password)){
            return res.status(400).json({ 'error': 'password invalid (must length > 8 and 1 maj, 1min , 1 number,1 special char )' });
        }

        client.hgetall(username, function (error, result) {
            if (result) {
                return res.status(409).json({'error':'user with that email already exist'}); 
            } else {
                bcrypt.hash(password,5,function(err,bcryptedPassword){
                        var token =jwtUtils.generateToken(username);
                        client.hmset(username,[
                            'email', email,
                            'username', username,
                            'password', bcryptedPassword,
                            'token', token,
                            'sessiontoken',null
                            ], function(err, reply){
                            if(err){
                                return res.status(500).json({ 'error': 'cannot add user' });
                            }
                                return res.status(201).json({'userId':username,'token':token});       
                            });            
                });
                   
            }
        });   
    },
    login: function(req,res){
        var username=req.body.username;
        var password =req.body.password;
        if (username == null ||  password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
          }
          client.hgetall(username, function (error, result) {
            if (result) {
                bcrypt.compare(password,result.password,function(errBcrypt,resBcrypt){
                    if(resBcrypt){
                        var sessiontoken=jwtUtils.generateTokenForUser(result.username);
                        client.hset(username,'sessiontoken',sessiontoken);
                        return res.status(200).json({'username':result.username,'sessiontoken':sessiontoken});
                    }else{
                        return res.status(403).json({'error':'invalid password'});
                    }
                });
            }else{
                return res.status(404).json({'error': 'user not exist in DB'});
            }
          }); 
    },

    logout: function(req,res){
        var headerAuth=req.headers['authorization'];
        var userId=jwtUtils.getUserId(headerAuth);
        console.log("userId"+userId);
        if(userId==-1){
            return res.status(400).json({'error':'wrong token'});
        }
        client.hgetall(userId,function(error,result){
            if(result){
                console.log(result.sessiontoken==jwtUtils.parseAuthorization(headerAuth));
                if(result.sessiontoken==jwtUtils.parseAuthorization(headerAuth)){
                    console.log("sessiontoken"+result.sessiontoken);
                    client.hset(userId,'sessiontoken',null,function(err,result){
                        if(result){
                            
                        }else{
                            console.log(result.sessiontoken);
                            return res.status(200).json({'ok':'token is kill','token':result.sessiontoken});
                        }
                    });
                    
                }else{
                    return res.status(400).json({'error':'this token is a previous version'});
                }      
            }else{
                return res.status(404).json({"error":"user not exist in DB"});
            }
        });
    },

    profile: function(req,res){
        var headerAuth=req.headers['authorization'];
        var userId=jwtUtils.getUserId(headerAuth);
        console.log("userId:"+userId);
        if (userId==-1){
            
            return res.status(400).json({'error':'wrong token'});
        }
        client.hgetall(userId,function(error,result){
            if(result){
                console.log(result.sessiontoken==jwtUtils.parseAuthorization(headerAuth));
                if(result.sessiontoken==jwtUtils.parseAuthorization(headerAuth)){
                    console.log("sessiontoken"+result.sessiontoken);
                    return res.status(200).json({'username':result.username,'password':result.password,'email':result.email,'id':userId,'token':result.token})
                }else{
                    return res.status(400).json({'error':'this token is a previous version'});
                }      
            }else{
                return res.status(404).json({"error":"user not exist in DB"});
            }
        });
    },

    changemail: function(req,res){
        console.log("changemail function");
        var headerAuth=req.headers['authorization'];
        var userId=jwtUtils.getUserId(headerAuth);
        var email=req.body.email;
        if (!EMAIL_REGEX.test(email)) {
            console.log("pas le bon mail:"+email);
            return res.status(400).json({ 'error': 'email is not valid' });
         }
        if (userId==-1){
            return res.status(400).json({'error':'wrong token'});
        }
        client.hgetall(userId,function(error,result){
            if(result){
                if(result.sessiontoken==jwtUtils.parseAuthorization(headerAuth)){
                    client.hset(userId,'email',email,function(err,resultat){
                        if(resultat){
                            console.log("test");
                            
                        }else{
                            return res.status(200).json({'username':userId});
                        }
                    });
                }else{
                    return res.status(400).json({'error':'this token is a previous version'});
                }      
            }else{
                return res.status(404).json({"error":"user not exist in DB"});
            }
        });
    },

    changepassword: function(req,res){
        console.log("changepassword function");
        var headerAuth=req.headers['authorization'];
        var userId=jwtUtils.getUserId(headerAuth);
        var password=req.body.password;
        if (!PASSWORD_REGEX.test(password)){
            return res.status(400).json({ 'error': 'password invalid (must length > 8 and 1 maj, 1min , 1 number,1 special char )' });
        }
        if (userId==-1){
            return res.status(400).json({'error':'wrong token'});
        }
        client.hgetall(userId,function(error,result){
            if(result){
                if(result.sessiontoken==jwtUtils.parseAuthorization(headerAuth)){
                    bcrypt.hash(password,5,function(err,bcryptedPassword){
                        client.hset(userId,'password',bcryptedPassword,function(err,resultat){
                            if(resultat){
                            }else{
                                return res.status(200).json({'username':userId});
                            }
                        });
                    });
                    
                }else{
                    return res.status(400).json({'error':'this token is a previous version'});
                }      
            }else{
                return res.status(404).json({"error":"user not exist in DB"});
            }
        });
    }
}