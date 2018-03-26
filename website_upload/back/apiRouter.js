//imports
var express=require('express');
var usersCtrl=require('./routes/usersCtrl');
var imagesCtrl=require('./routes/imagesCtrl');
//Router
exports.router=(function(){
    var apiRouter=express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/logout/').post(usersCtrl.logout);
    apiRouter.route('/users/email/').put(usersCtrl.changemail);
    apiRouter.route('/users/password/').put(usersCtrl.changepassword);
    apiRouter.route('/users/username/').put(usersCtrl.changeusername);
    apiRouter.route('/profile/').get(usersCtrl.profile);
    apiRouter.route('/users/delete/').delete(usersCtrl.delete);
    //Images routes 
    apiRouter.route('/images/').get(imagesCtrl.getImages);
    apiRouter.route('/images/:id/').get(imagesCtrl.getImage);
    apiRouter.route('/images/add').post(imagesCtrl.addImage);
    apiRouter.route('/images/:id/del').delete(imagesCtrl.delImage);
    //apikey verification
    apiRouter.route('/apikey').get(usersCtrl.verifyapikey);
    /*
    apiRouter.route('/images/').post(imagesCtrl.addImage);
    apiRouter.route('/images/').get(imagesCtrl.getImages);
    */
    return apiRouter;
})();