var express = require('express');
var mongoose = require('mongoose');
var Rewards = require('../models/reward');


module.exports = function(app) {
	app.post("/dataRewards",function(req, res,next) {
		  Rewards.find({}, function(err, items){
        if(err) {
          console.log(err)
        }else{
          res.json(items);
        }
      })
	});
};