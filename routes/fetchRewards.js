var express = require('express');
var mongoose = require('mongoose');
var Rewards = require('../models/reward');

module.exports = function(app) {
	app.get("/fetchRewards",function(req, res) {
		Rewards.find({
			'outletType' : 'RET'
		}, function(err, rewards) {
			if (err) {
				res.send(err);
			}
			res.json(rewards);
		});
	});
};