/*
 * GET home page.
 */
var express = require('express');
var mongoose = require('mongoose');
var Rewards = require('../models/reward');

module.exports = function(app,appEnv) {
	var router = express.Router();
	
	router.route("/fetchRewards").get(function(req, res) {
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