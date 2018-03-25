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
        if(!client.exists("imageid")){
            client.set("imageid",0);
        }
        client.incr("imageid",function(err,r){
            if(r){
                var id=r;
                var token=jwtUtils.parseAuthorization(headerAuth);
                client.lrem("apikey",1,token,function(err,result){
                    if(result){
                        client.lpush("apikey",token);
                        if(client.exists(token)){
                            client.hset(id,"name",name,"linkhq",linkhq,"linklq",linklq,"token",token);
                            client.lpush(token,id,function(err,resultat){
                                if(resultat){
                                    return res.status(200).json({'idimg':id});
                                }else{
                                    return res.status(500);
                                }
                            });
                        }
                    }else{
                       return res.status(404).json({'error':'apikey not found'});
                    }
                });
            }else{
                return res.status(500).json({'error':'cannot increment id'});
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
                client.lpush("apikey",token);
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
    },
    delImage:function(req,res){
        var headerAuth=req.headers['authorization'];
        var token=jwtUtils.parseAuthorization(headerAuth);
        client.lrem("apikey",1,token,function(err,result){
            if(result){
                client.lpush("apikey",token);
                var id=req.params.id;
                if(id==null){
                    return res.status(400).json({'error':'missing parameters'});
                }
                client.del(id,function(err,resultat){
                        client.lrem(token,1,id,function(e,r){
                            if(r){
                                console.log("on passe bien la");
                                return res.status(200).json({"response":"ok"});
                            }else{
                                return res.status(404).json({'error':'apikey id img list not found'});
                            }
                        });
                })
            }else{
               return res.status(404).json({'error':'apikey not found'});
            }
        }); 
    }
}