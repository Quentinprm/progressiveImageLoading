var jwt=require("jsonwebtoken");
var randtoken = require('rand-token').generator({
    chars:'default'
});
const JWT_SIGN_SECRET="A7CC35353BE315636AC9636F4B9EFB2A2B919A3A2B73D5588DF88D8FDBAECA8F";
const NB_CHAR=64;
var redis = require('redis');
var client = redis.createClient();
var client = redis.createClient();
module.exports={
    generateToken: function(username){
        return randtoken.generate(64);         
    },
    generateTokenForUser:function(user){
        return jwt.sign({
            userId:user,
            isAdmin: false
        },JWT_SIGN_SECRET,{
            expiresIn:'3h'
        })
    },
    parseAuthorization: function(authorization) {
        return (authorization != null) ? authorization.replace('token=', '') : null;
    },
    getUserId:function(authorization){
        var userId=-1;
        var token=module.exports.parseAuthorization(authorization);
        if(token !=null){
            try{
                var jwtToken=jwt.verify(token,JWT_SIGN_SECRET);
                if(jwtToken !=null){
                    userId=jwtToken.userId;
                    return userId;
                }
            }catch(err){
                
            }
        }else{
            return userId;
        }
    },
}