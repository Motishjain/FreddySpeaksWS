var express = require('express');
var mongoose = require('mongoose');
console.log("at start!");
var Outlet = require('../models/outlet');
var outletSubscription = require('../models/outletSubscription');
var moment=require('moment');

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

function calculateExpiry(cdate) {
	var m=moment(new Date(cdate));
		m.add(1,'months');
	return m;
};



var jsonResponseObject = function(success, data, msg) {
	var jsonObject = {};
	jsonObject.success = success;
	jsonObject.data = data;
	jsonObject.msg = msg;
	return jsonObject;
};
console.log("before start!");
module.exports = function(app, appEnv) {

	app.post("/registerOutlet", function(req, res) {
		console.log("started.");
		var jsonRequest = req.body;
		if (jsonRequest.outletCode) {
			console.log("found code!");
			Outlet.findOneAndUpdate({
				'outletCode' : jsonRequest.outletCode
			}, {
				'outletName' : jsonRequest.outletName,				
				'addrLine1' : jsonRequest.addrLine1,
				'addrLine2' : jsonRequest.addrLine2,
				'pinCode' : jsonRequest.pinCode,
				'email' : jsonRequest.email,
				'workPhone' : jsonRequest.workPhone,
				'cellNumber' : jsonRequest.cellNumber,
				'updateDate':jsonRequest.createdDate
			}, function(err, outlet) {
				if (err) {
				    console.log('Error Inserting New Data');
				    if (err.name == 'ValidationError') {
				        for (field in err.errors) {
				            console.log(err.errors[field].message); 
				        }
				    }
				}
				res.json(jsonResponseObject(true, jsonRequest.outletCode,
						"Outlet updated Successfully"));
			});
		} else {
			var outlet = new Outlet();
			console.log("not found code!");
			var generatedCode=generateUUID();
			console.log(generatedCode);
			outlet.outletName = jsonRequest.outletName;
			outlet.outletCode = generatedCode;			
			outlet.addrLine1 = jsonRequest.addrLine1;
			outlet.addrLine2 = jsonRequest.addrLine2;
			outlet.pinCode = jsonRequest.pinCode;
			outlet.email = jsonRequest.email;
			outlet.workPhone = jsonRequest.workPhone;
			outlet.cellNumber = jsonRequest.cellNumber;
			outlet.outletTypeCode = jsonRequest.outletTypeCode;
			outlet.createdDate = jsonRequest.createdDate;
			console.log(jsonRequest.outletName);
			outlet.save(function(err) {
				if (err) {
				    console.log('Error Inserting New Data');
				    if (err.name == 'ValidationError') {
				        for (field in err.errors) {
				            console.log(err.errors[field].message); 
				        }
				    }
				}
				else {
					var outletSubscribe=new outletSubscription();
					outletSubscribe.outletCode=generatedCode;
					outletSubscribe.expiryDate=calculateExpiry(jsonRequest.createdDate);
					outletSubscribe.activationStatus="TR";
					outletSubscribe.save(function(err) {
						if (err) {
						    console.log('Outlet registered successfully but there is error inserting the subscription details');
						    if (err.name == 'ValidationError') {
						        for (field in err.errors) {
						            console.log(err.errors[field].message); 
						        }
						    }
						}
						else {
							res.json(jsonResponseObject(true, outletSubscribe.outletCode,
									"Outlet Registered Successfully and Trial Period Activated!"));
						}
					});
				}
			});
			
		}

	});
};