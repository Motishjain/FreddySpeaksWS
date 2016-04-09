var express = require('express');
var mongoose = require('mongoose');
var OutletToRewards = require('../models/outletToRewards');

var jsonResponseObject = function(success, data, msg) {
	var jsonObject = {};
	jsonObject.success = success;
	jsonObject.data = data;
	jsonObject.msg = msg;
	return jsonObject;
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
					res.json(jsonResponseObject(false, null, err));
				}
				res.json(jsonResponseObject(true, jsonRequest.outletCode,
						"Rewards saved Successfully"));
			});
		}

	});
};