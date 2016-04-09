var express = require('express');
var mongoose = require('mongoose');
var OutletToRewards = require('../models/outletToRewards');

var jsonResponse = function(success, data, msg) {
	return '{success:'+success+',data:'+data+',msg:'+msg+',}';
};

module.exports = function(app, appEnv) {
	var router = express.Router();

	router.route("/registerOutlet").get(function(req, res) {
		var jsonRequest = req.body;
		if (jsonRequest.outletCode) {
			OutletToRewards.find({
				'outletCode' : req.outletCode
			}, function(err, outletToRewards) {
				if (err) {
					res.json(jsonResponse(false,null,err));
				}
				outletToRewards.categoryRewards = jsonRequest.rewardsMap;
				outletToReward.save(function(err) {
					if (err) {
						res.json(jsonResponse(false,null,err));
					}
				});
				res.json(jsonResponse(true,outletToReward.outletCode,"Rewards saved Successfully"));
			});
		} else {
			var outletToReward = new OutletToRewards();
			outletToReward.outletCode = jsonRequest.outletCode;
			outletToReward.categoryRewards = jsonRequest.rewardsMap;
			outletToReward.save(function(err) {
				if (err) {
					res.json(jsonResponse(false,null,err));
				}
			});
			res.json(jsonResponse(true,outletToReward.outletCode,"Rewards saved Successfully"));
		}

	});
};