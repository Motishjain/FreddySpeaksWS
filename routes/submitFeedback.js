var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/outletFeedback');
var OutletFeedback = models.OutletFeedback;
var Feedback = models.Feedback;

var jsonResponse = function(success, data, msg) {
	return '{success:' + success + ',data:' + data + ',msg:' + msg + ',}';
};

module.exports = function(app, appEnv) {
	
	app.post("/submitFeedback",function(req, res) {
		var jsonRequest = req.body;
		var feedback = new Feedback();
		feedback.userName = jsonRequest.userName;
		feedback.userPhoneNumber = jsonRequest.userPhoneNumber;
		feedback.billNumber = jsonRequest.billNumber;
		feedback.billAmount = jsonRequest.billAmount;
		feedback.rewardCategory = jsonRequest.rewardCategory;
		feedback.rewardId = jsonRequest.rewardId;
		feedback.ratingsMap = jsonRequest.ratingsMap;
		feedback.createdDate = new Date();
	
		if (jsonRequest.outletCode) {				
			OutletFeedback.findOne({
				'outletCode' : jsonRequest.outletCode
			}, function(err, outletFeedback) {
				if (err) {
					res.json(jsonResponse(false, null, err));
				}				
				if(outletFeedback) {		
					outletFeedback.feedbackList.push(feedback);
					outletFeedback.updatedDate = new Date();
					outletFeedback.save();
					res.json(jsonResponse(true, jsonRequest.outletCode,
					"Feedback saved Successfully"));
				}
				else {
					outletFeedback = new OutletFeedback();
					outletFeedback.outletCode = jsonRequest.outletCode;
					outletFeedback.createdDate = new Date();
					outletFeedback.feedbackList.push(feedback);
					outletFeedback.updatedDate = new Date();
					outletFeedback.save();
					res.json(jsonResponse(true, jsonRequest.outletCode,
					"Feedback saved Successfully"));
				}
			});	
		}
		
		

	});
};


/*
Object.keys(o).forEach(function(key) {
var val = o[key];
logic();
});
*/