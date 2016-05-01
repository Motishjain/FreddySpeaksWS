var express = require('express');
var mongoose = require('mongoose');
var Rewards = require('../models/reward');


module.exports = function(app) {
	app.post("/removeRewards",function(req, res,next) {
		Rewards.remove({ _id: req.body.id }, function (err) {
	        if(err) {
	          console.log(err)
	          res.json({error_code:err});
	        }else{
	          res.json({error_code:0,err_desc:null});
	        }
      	});
	});
};