var bcrypt = require("bcrypt");
var jwtUtils= require('../utils/jwt.utils')
var redis = require('redis');
var axios = require('axios');
var client = redis.createClient();
//Routes
module.exports= {
    AddUserImage: function(req,res){
    
    },
    getImages:function(req,res){
        var headerAuth=req.headers['authorization'];
        var token=jwtUtils.parseAuthorization(headerAuth);
        client.exists(token,function(err,result){
            if(result){
                console.log("le client existe youpi");
                client.llen(token,function(error,resultat){
                    if(resultat>0){
                        client.lrange(token,0,resultat,function(e,r){
                            if(r){
                                 res.status(200).json({"imagesid":r});
                            }
                        });
                    }
                });
            }else{
                return res.status(404).json({"error":"ApiKey not found"});
            }
        });    
    },

    getImage:function(req,res){
        var headerAuth=req.headers['authorization'];
        var token=jwtUtils.parseAuthorization(headerAuth);
        client.exists(token,function(err,result){
            if(result){
                var id=req.params.id;
                if(id==null){
                    return res.status(400).json({'error':'missing parameters'});
                }
                client.hgetall(id,function(e,r){
                    if(r){
                        if(r.token==token){
                            return res.status(200).json({"linkhq":r.linkhq,"linklq":r.linklq});
                        }else{
                            return res.status(401).json({"error":"token miss match"});
                        }
                    
                }else{
                    return res.status(404).json({"error":"image not found"});
                }   
                })
            }else{
                return res.status(404).json({"error":"ApiKey not found"});
            }
        });
    }
}