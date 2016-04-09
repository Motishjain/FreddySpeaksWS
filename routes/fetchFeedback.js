var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/outletFeedback');
var OutletFeedback = models.OutletFeedback;
var Feedback = models.Feedback;
var outletFeedbackList;


module.exports = function(app, appEnv) {
	
	app.get("/fetchFeedback",function(req, res) {
		var fromDate = req.params.fromDate;
		var toDate = req.params.toDate;
		var outletCode = req.params.outletCode;
		
		if (outletCode) {
			OutletFeedback.find({
				'outletCode' : outletCode,
				'feedbackList.createdDate' : {"$gte": fromDate, "$lt": toDate}
			}, function(err, outletFeedback) {
				if (err) {
					res.send(err);
				}
				outletFeedbackList = outletFeedback.feedbackList;
			});	
		}
		
		res.json(outletFeedbackList);
		
	});
};


/*
Object.keys(o).forEach(function(key) {
var val = o[key];
logic();
});
*/