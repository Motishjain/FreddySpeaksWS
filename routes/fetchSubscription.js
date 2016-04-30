var express = require('express');
var mongoose = require('mongoose');
var OutletSubscription = require('../models/outletSubscription');

module.exports = function(app, appEnv) {

	app.get("/fetchSubscription/:outletCode", function(req, res) {
		var outletCode = req.params.outletCode;
		console.log(outletCode);

		if (outletCode) {
			OutletSubscription.findOne({'outletCode':outletCode}, function(err, result) {
				if (err) {
					console.log(err);
					return;
				}
				res.json(result);
			});
		}
	});
};