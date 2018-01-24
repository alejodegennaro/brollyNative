/*Routes*/
var express = require('express');
var router = express.Router();
var passport = require("passport");
var Service = require('../services/service.js');


router.post("/login", (req, res) => {
  console.log("req.body");
  console.log(req.body);

  //if the credentials are empty strings or not sent, throw error
  if(!req.body.username || !req.body.password || 
      req.body.username.trim().statuslength == 0 || req.body.password.trim().length == 0){
    res.status(401).json({status:"invalid credentials"});
  } 
  else {
    var user = Service.findMockUser(req.body.username);
    //ideally we would validate user and pass here
    if(user) {
      var payload = {id: user.id};
      var token = Service.getJwtToken(payload);
      res.json({status: "success", username:req.body.username, token: token});
    } else {
      res.status(401).json({status:"passwords did not match"});
    }
  }

});

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("logging out");
    req.logout();
    res.json({status:"user logged out"});
});


router.get('/policies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Service.getPolicies(req, res);
});


module.exports = router;

