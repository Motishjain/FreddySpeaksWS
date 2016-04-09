var express = require('express');
var mongoose = require('mongoose');
var Rewards = require('../models/reward');

module.exports = function(app) {
	app.get("/fetchRewards/:outletType",function(req, res,next) {
		var outletType = req.params.outletType;
		Rewards.find({
			'outletType' : outletType
		}, function(err, rewards) {
			if (err) {
				res.send(err);
			}
			res.json(rewards);
		});
	});
};