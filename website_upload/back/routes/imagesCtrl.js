var bcrypt = require("bcrypt");
var jwtUtils = require('../utils/jwt.utils')
var redis = require('redis');
var axios = require('axios');
var client = redis.createClient();
var async = require('async');
var randomToken= require('random-token');
// config for cloudinary
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'morgandbs',
    api_key: '396852746268724',
    api_secret: 'wQ8JPv0UxJv2_YaEKDQfHgRRArA'
});
//Routes
module.exports = {
    addImage: function (req, res) {
        console.log("addImage function");
        var headerAuth = req.headers['authorization'];
        var name = req.body.name;
        var linkhq = req.body.linkhq;
        var linklq = req.body.linklq;
        if (name == null || linkhq == null || linklq == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
                var id = randomToken(16);
                var token = jwtUtils.parseAuthorization(headerAuth);
                client.lrem("apikey", 1, token, function (err, result) {
                    if (result) {
                        client.lpush("apikey", token);
                        if (client.exists(token)) {
                            client.hset(id, "name", name, "linkhq", linkhq, "linklq", linklq, "token", token);
                            client.lpush(token, id, function (err, resultat) {
                                if (resultat) {
                                    return res.status(200).json({ 'idimg': id });
                                } else {
                                    return res.status(500);
                                }
                            });
                        }
                    } else {
                        return res.status(404).json({ 'error': 'apikey not found' });
                    }
                });
    },
    getImages: function (req, res) {
        console.log("getImages function");
        var headerAuth = req.headers['authorization'];
        var token = jwtUtils.parseAuthorization(headerAuth);
        client.lrem("apikey", 1, token, function (err, result) {
            if (result) {
                client.lpush("apikey", token);
                client.llen(token, function (error, resultat) {
                    if (resultat > 0) {
                        client.lrange(token, 0, resultat, function (er, re) {
                            if (re) {
                                var liste = '{"images":[';
                                async.each(re, function (item, callback) {
                                    client.hgetall(item, function (e, r) {
                                        if (r) {
                                            if (r.token == token) {
                                                liste += '{"linkhq":"' + r.linkhq + '","linklq":"' + r.linklq + '","name":"' + r.name + '","id":"' + item + '"}';
                                                if (item == re[re.length - 1]) {
                                                    liste += "]}";
                                                    console.log("msg:" + liste);
                                                    return res.status(200).json(JSON.parse(liste));

                                                } else {
                                                    liste += ",";
                                                    callback();
                                                }
                                            } else {
                                                return res.status(401).json({ "error": "apikey miss match" });
                                            }

                                        } else {
                                            return res.status(404).json({ "error": "image not found" });
                                        }
                                    })

                                });
                            }
                        });
                    } else {
                        return res.status(200).json({ "msg": "no image" });
                    }
                });
            } else {
                return res.status(404).json({ 'error': 'apikey not found' });
            }
        });
    },
    getImage: function (req, res) {
        console.log("getImage function by id");
        var headerAuth = req.headers['authorization'];
        var token = jwtUtils.parseAuthorization(headerAuth);
        client.lrem("apikey", 1, token, function (err, result) {
            if (result) {
                client.lpush("apikey", token);
                var id = req.params.id;
                if (id == null) {
                    return res.status(400).json({ 'error': 'missing parameters' });
                }
                client.hgetall(id, function (e, r) {
                    if (r) {
                        if (r.token == token) {
                            return res.status(200).json({ "linkhq": r.linkhq, "linklq": r.linklq });
                        } else {
                            return res.status(401).json({ "error": "apikey miss match" });
                        }

                    } else {
                        return res.status(404).json({ "error": "image not found" });
                    }
                })
            } else {
                return res.status(404).json({ 'error': 'apikey not found' });
            }
        });
    },
    delImage: function (req, res) {
        console.log("delImage image function by id");
        var headerAuth = req.headers['authorization'];
        var token = jwtUtils.parseAuthorization(headerAuth);
        client.lrem("apikey", 1, token, function (err, result) {
            if (result) {
                client.lpush("apikey", token);
                var id = req.params.id;
                if (id == null) {
                    return res.status(400).json({ 'error': 'missing parameters' });
                }
                client.hget(id,"name",function(err,resultat){
                    if(resultat){
                        cloudinary.v2.uploader.destroy(resultat);
                    }
                });
                client.del(id, function (err, resultat) {
                    client.lrem(token, 1, id, function (e, r) {
                        if (r) {
                            return res.status(200).json({ "response": "ok" });
                        } else {
                            return res.status(404).json({ 'error': 'apikey id img list not found' });
                        }
                    });
                })
            } else {
                return res.status(404).json({ 'error': 'apikey not found' });
            }
        });
    },
    delImages: function(req,res){
        console.log("delImages function");
        var headerAuth = req.headers['authorization'];
        var token = jwtUtils.parseAuthorization(headerAuth);
        client.lrem("apikey", 1, token, function (err, result) {
            if (result) {
                client.lpush("apikey", token);
                client.llen(token, function (error, resultat) {
                    if (resultat > 0) {
                        client.lrange(token, 0, resultat, function (er, re) {
                            if (re) {
                                async.each(re, function (item, callback) {
                                    client.hget(item,"name",function(err,resultat){
                                        if(resultat){
                                            cloudinary.v2.uploader.destroy(resultat);
                                        }
                                    });
                                    client.del(item, function (err, resultat) {
                                        if(resultat){
                                            callback();
                                        }else{
                                            return res.status(500).json({"error":"one image delation error"});
                                        }      
                                    })

                                });
                                client.del(token,function(err,resultat){
                                    if(resultat){
                                        return res.status(200).json({"msg":"ok"});
                                    }
                                    else{
                                        return res.status(500).json({"error":"imageid list delation error"});
                                    }
                                })
                            }
                        });
                    } else {
                        return res.status(200).json({ "msg": "no image" });
                    }
                });
            } else {
                return res.status(404).json({ 'error': 'apikey not found' });
            }
        });
    }
}