var bcrypt = require("bcrypt");
var jwtUtils= require('../utils/jwt.utils')
var redis = require('redis');
var axios = require('axios');
var client = redis.createClient();
//Routes
module.exports={
    addImage:function(req,res){
        console.log("add images function");
        var headerAuth=req.headers['authorization'];
        var name=req.body.name;
        var linkhq=req.body.linkhq;
        var linklq=req.body.linklq;
        if(name==null||linkhq==null||linklq==null){
            return res.status(400).json({'error':'missing parameters'});
        }
        var token=jwtUtils.parseAuthorization(headerAuth);
        client.lrem("apikey",1,token,function(err,result){
            if(result){
                client.lpush("apikey",token);
                client.hset(name,"linkhq",linkhq,"linklq",linklq,"token",token);
                if(client.exists(token)){
                    client.lpush(token,name,function(err,resultat){
                        if(resultat){
                            return res.status(200).json({'idimg':name});
                        }else{
                            return res.status(500);
                        }
                    });
                }
            }else{
               return res.status(404).json({'error':'apikey not found'});
            }
        });
    },
    getImages:function(req,res){
        var headerAuth=req.headers['authorization'];
        var token=jwtUtils.parseAuthorization(headerAuth);
        client.lrem("apikey",1,token,function(err,result){
            if(result){
                console.log("le client existe youpi");
                client.lpush("apikey",token);
                client.llen(token,function(error,resultat){
                    if(resultat>0){
                        client.lrange(token,0,resultat,function(e,r){
                            if(r){
                                 res.status(200).json({"imagesid":r});
                            }
                        });
                    }else{
                        return res.status(200).json({"response":"no image"});
                    }
                });
            }else{
               return res.status(404).json({'error':'apikey not found'});
            }
        }); 
    },

    getImage:function(req,res){

        var headerAuth=req.headers['authorization'];
        var token=jwtUtils.parseAuthorization(headerAuth);
        client.lrem("apikey",1,token,function(err,result){
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
                            return res.status(401).json({"error":"apikey miss match"});
                        }
                    
                }else{
                    return res.status(404).json({"error":"image not found"});
                }   
                })
            }else{
               return res.status(404).json({'error':'apikey not found'});
            }
        }); 
    }
}