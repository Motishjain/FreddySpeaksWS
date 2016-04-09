var express = require('express');
var mongoose = require('mongoose');
var Outlet = require('../models/outlet');

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
			function(c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
	return uuid;
}

var jsonResponseObject = function(success, data, msg) {
	var jsonObject = {};
	jsonObject.success = success;
	jsonObject.data = data;
	jsonObject.msg = msg;
	return jsonObject;
};

module.exports = function(app, appEnv) {

	app.post("/registerOutlet", function(req, res) {
		var jsonRequest = req.body;
		if (jsonRequest.outletCode) {
			Outlet.findOneAndUpdate({
				'outletCode' : jsonRequest.outletCode
			}, {
				'outletName' : jsonRequest.outletName,
				'aliasName' : jsonRequest.aliasName,
				'addrLine1' : jsonRequest.addrLine1,
				'addrLine2' : jsonRequest.addrLine2,
				'pinCode' : jsonRequest.pinCode,
				'email' : jsonRequest.email,
				'workPhone' : jsonRequest.workPhone,
				'cellNumber' : jsonRequest.cellNumber
			}, function(err, outlet) {
				if (err) {
					res.json(jsonResponseObject(false, null, err));
				}
				res.json(jsonResponseObject(true, jsonRequest.outletCode,
						"Outlet updated Successfully"));
			});
		} else {
			var outlet = new Outlet();
			outlet.outletName = jsonRequest.outletName;
			outlet.outletCode = generateUUID();
			outlet.aliasName = jsonRequest.aliasName;
			outlet.addrLine1 = jsonRequest.addrLine1;
			outlet.addrLine2 = jsonRequest.addrLine2;
			outlet.pinCode = jsonRequest.pinCode;
			outlet.email = jsonRequest.email;
			outlet.workPhone = jsonRequest.workPhone;
			outlet.cellNumber = jsonRequest.cellNumber;
			outlet.outletTypeCode = jsonRequest.outletTypeCode;
			outlet.save(function(err) {
				if (err) {
					res.json(jsonResponseObject(false, null, err));
				} else {
					res.json(jsonResponseObject(true, outlet.outletCode,
							"Outlet registered Successfully"));
				}
			});
		}

	});
};