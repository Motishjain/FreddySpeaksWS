/*
 * GET home page.
 */
var express = require('express');
var mongoose = require('mongoose');
var Outlet = require('../models/outlet');

module.exports = function(app, appEnv) {

	app.post("/registerOutlet", function(req, res) {	
		var jsonRequest = JSON.parse(req.body);
		if (jsonRequest.outletCode) {
			Outlet.find({
				'outletCode' : req.outletCode
			}, function(err, outlet) {
				if (err) {
					res.send(err);
				}
				res.json(outlet.outletCode);
			});
		} else {
			var outlet = new Outlet();
			outlet.outletName = jsonRequest.outletName;
			outlet.outletCode = jsonRequest.outletCode;
			outlet.aliasName = jsonRequest.aliasName;
			outlet.addressLine1 = jsonRequest.addressLine1;
			outlet.addressLine2 = jsonRequest.addressLine2;
			outlet.pinCode = jsonRequest.pinCode;
			outlet.workPhone = jsonRequest.workPhone;
			outlet.cellNumber = jsonRequest.cellNumber;
			outlet.outletTypeCode = jsonRequest.outletTypeCode;
			outlet.save(function(err) {
				if (err) {
					res.json({
						success : false,
						data : null,
						msg : 'Unable to create outlet'
					});
				} else {
					res.json({
						success : true,
						data : outlet.outletCode,
						msg : 'Outlet created'
					});
				}
			});
		}

	});
};