var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/outletFeedback');
var OutletFeedback = models.OutletFeedback;
var Feedback = models.Feedback;
var outletFeedbackList;

module.exports = function(app, appEnv) {

	app.get("/fetchFeedback/:outletCode/:fromDate/:toDate", function(req, res) {

		var outletCode = req.params.outletCode;
		var fromDate = new Date(req.params.fromDate);
		var toDate = new Date(req.params.toDate);

		if (outletCode) {
			OutletFeedback.aggregate([ {
				$match : {
					'outletCode' : outletCode
				}
			}, {
				$project : {
					"feedbackList" : 1
				}
			}, {
				$unwind : '$feedbackList'
			}, {
				$match : {
					'feedbackList.createdDate' : {
						'$gte' : fromDate,
						'$lte' : toDate
					}
				}
			} ], function(err, result) {
				if (err) {
					console.log(err);
					return;
				}
				res.json(result);
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