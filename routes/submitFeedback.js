var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/outletFeedback');
var OutletFeedback = models.OutletFeedback;
var Feedback = models.Feedback;
var Rating = models.Rating;

var jsonResponseObject = function(success, data, msg) {
	var jsonObject = {};
	jsonObject.success = success;
	jsonObject.data = data;
	jsonObject.msg = msg;
	return jsonObject;
};

module.exports = function(app, appEnv) {

	app.post("/submitFeedback", function(req, res) {
		var jsonRequest = req.body;
		var feedback = new Feedback();
		feedback.userName = jsonRequest.userName;
		feedback.userPhoneNumber = jsonRequest.userPhoneNumber;
		feedback.billNumber = jsonRequest.billNumber;
		feedback.billAmount = jsonRequest.billAmount;
		feedback.rewardCategory = jsonRequest.rewardCategory;
		feedback.rewardId = jsonRequest.rewardId;
		feedback.createdDate = new Date(jsonRequest.createdDate);

		var ratingsMap = jsonRequest.ratingsMap;

		for ( var key in ratingsMap) {
			if (ratingsMap.hasOwnProperty(key)) {
				var rating = new Rating();
				rating.questionId = key;
				rating.selectedOptionIndex = ratingsMap[key];
				feedback.ratings.push(rating);
			}
		}

		if (jsonRequest.outletCode) {
			OutletFeedback.findOne({
				'outletCode' : jsonRequest.outletCode
			}, function(err, outletFeedback) {
				if (err) {
					res.json(jsonResponseObject(false, null, err));
				}
				if (outletFeedback) {
					outletFeedback.feedbackList.push(feedback);
					outletFeedback.updatedDate = new Date();
					outletFeedback.save();
					res.json(jsonResponseObject(true, jsonRequest.outletCode,
							"Feedback saved Successfully"));
				} else {
					outletFeedback = new OutletFeedback();
					outletFeedback.outletCode = jsonRequest.outletCode;
					outletFeedback.createdDate = new Date();
					outletFeedback.feedbackList.push(feedback);
					outletFeedback.updatedDate = new Date();
					outletFeedback.save();
					res.json(jsonResponseObject(true, jsonRequest.outletCode,
							"Feedback saved Successfully"));
				}
			});
		}

	});
};
