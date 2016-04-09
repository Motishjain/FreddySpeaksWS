var express = require('express');
var mongoose = require('mongoose');
var OutletToRewards = require('../models/outletToRewards');

var jsonResponse = function(success, data, msg) {
	return '{success:' + success + ',data:' + data + ',msg:' + msg + ',}';
};

module.exports = function(app, appEnv) {

	app.post("/saveRewards", function(req, res) {
		var jsonRequest = req.body;
		if (jsonRequest.outletCode) {
			OutletToRewards.findOneAndUpdate({
				'outletCode' : jsonRequest.outletCode,
				'rewardCategory' : jsonRequest.rewardCategory
			}, {
				'rewardIdList' : jsonRequest.rewardIdList
			}, {
				upsert : true
			}, function(err, outletToRewards) {
				if (err) {
					res.json(jsonResponse(false, null, err));
				}
				res.json(jsonResponse(true, jsonRequest.outletCode,
						"Rewards saved Successfully"));
			});
		}

	});
};