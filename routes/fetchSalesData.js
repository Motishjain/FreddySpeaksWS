var express = require('express');
var mongoose = require('mongoose');
var models = require('../models/outletFeedback');
var OutletFeedback = models.OutletFeedback;
var Feedback = models.Feedback;
var outletFeedbackList;

module.exports = function(app, appEnv) {

	app.get("/fetchSalesData/:outletCode/:year/:month", function(req, res) {

		var outletCode = req.params.outletCode;
		var year = req.params.year;
		var month = req.params.month;

		var start = new Date(year, month, 1);
		var end = new Date(year, month, 32);

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
						'$gte' : start,
						'$lte' : end
					}
				}
			}, {
				$group : {
					_id : {
						day : {
							$dayOfMonth : "$feedbackList.createdDate"
						}
					},
					totalSale : {
						$sum : "$feedbackList.billAmount"
					}
				}
			}, {
				$project : {
					dayOfMonth : "$_id.day",
					totalSale : 1,
					_id : 0
				}
			}, {
				$sort : {
					"dayOfMonth" : 1
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
