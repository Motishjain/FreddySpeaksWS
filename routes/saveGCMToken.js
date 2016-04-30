var express = require('express');
var mongoose = require('mongoose');
var Outlet = require('../models/outlet');

var jsonResponseObject = function(success, data, msg) {
	var jsonObject = {};
	jsonObject.success = success;
	jsonObject.data = data;
	jsonObject.msg = msg;
	return jsonObject;
};

module.exports = function(app, appEnv) {

	app.get("/saveGCMToken/:outletCode/:token", function(req, res) {
		var outletCode = req.params.outletCode;
		var gcmToken = req.params.token;
			
		if (outletCode) {
			Outlet.findOneAndUpdate({
				'outletCode' : outletCode,				
			}, {
				'gcmToken' : gcmToken
			}, function(err, result) {
				if (err) {
					res.json(jsonResponseObject(false, null, err));
				}
				res.json(jsonResponseObject(true, outletCode,
						"GCM token saved Successfully"));
			});
		}

	});
};