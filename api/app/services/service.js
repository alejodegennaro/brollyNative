var policies = require ('./policies.json')
var users = require("../models/user.js");
var jwt = require('jsonwebtoken');
var config = require("../../config/index.js");

getPolicies = (req, res) => {
	console.log(policies);
    res.json(policies);
}

findMockUser = (params) => {
    return users[0];
}

getJwtToken = (payload) => {
    return jwt.sign(payload, config.jwtOptions.secretOrKey);
}


module.exports = {getPolicies,findMockUser,getJwtToken};