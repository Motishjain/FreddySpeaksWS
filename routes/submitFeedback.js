/*
 * GET home page.
 */
var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/feedback');
var OutletFeedback = models.OutletFeedback;
var Feedback = models.Feedback;
var outletFeedback;


module.exports = function(app, appEnv) {
	var router = express.Router();

	router.route("/submitFeedback").post(function(req, res) {
		var jsonRequest = req.body;
		if (jsonRequest.outletCode) {
			OutletFeedback.find({
				'outletCode' : jsonRequest.outletCode
			}, function(err, outletFeedbackLocal) {
				if (err) {
					res.send(err);
				}
				outletFeedback = outletFeedbackLocal;
			});	
		}
		var feedback = new Feedback();
		feedback.userName = jsonRequest.userName;
		feedback.userPhoneNumber = jsonRequest.userPhoneNumber;
		feedback.billNumber = jsonRequest.billNumber;
		feedback.billAmount = jsonRequest.billAmount;
		feedback.rewardCategory = jsonRequest.rewardCategory;
		feedback.rewardId = jsonRequest.rewardId;
		feedback.ratingsMap = jsonRequest.ratingsMap;
		feedback.createdDate = new Date();
		
		if(outletFeedback) {		
			outletFeedback.feedbackList.push(feedback);
			outletFeedback.updatedDate = new Date();
			outletFeedback.save();
		}
		else {
			outletFeedback = new OutletFeedback();
			outletFeedback.outletCode = jsonRequest.outletCode;
			outletFeedback.createdDate = new Date();
			outletFeedback.feedbackList.push(feedback);
			outletFeedback.updatedDate = new Date();
			outletFeedback.save();
		}

	});
};


/*
Object.keys(o).forEach(function(key) {
var val = o[key];
logic();
});
*/