var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/outletFeedback');
var OutletFeedback = models.OutletFeedback;
var Feedback = models.Feedback;
var outletFeedbackList;


module.exports = function(app, appEnv) {
	
	app.get("/fetchFeedback/:outletCode/:fromDate/:toDate",function(req, res) {
		
		var outletCode = req.params.outletCode;
		var fromDate = new Date(req.params.fromDate);
		var toDate = new Date(req.params.toDate);
		
		if (outletCode) {
			OutletFeedback.findOne({
				'outletCode' : outletCode,
				'feedbackList.createdDate' : {"$gte": fromDate, "$lt": toDate}
			}, function(err, outletFeedback) {
				if (err) {
					res.send(err);
				}
				outletFeedbackList = outletFeedback.feedbackList;
				res.json(outletFeedbackList);
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