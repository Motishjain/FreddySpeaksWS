var express = require('express');
var mongoose = require('mongoose');
var OutletPayment = require('../models/outletPayments');
var OutletSubscription = require('../models/outletSubscription');
var moment=require('moment');

function renewSubscription(expdate,bymonths){
	switch(bymonths){
	case '3':
		return moment(expdate, 'MMMM Do YYYY').add(3,'months').format('MMMM Do YYYY');
	case '6':
		return moment(expdate, 'MMMM Do YYYY').add(6,'months').format('MMMM Do YYYY');
	case '12':
		return moment(expdate, 'MMMM Do YYYY').add(1,'year').format('MMMM Do YYYY');
	}
}
var jsonResponseObject=function(success, data, msg){
	var jsonObject={};
	jsonObject.success=success;
	jsonObject.data=data;
	jsonObject.msg=msg;
	return jsonObject;
};

module.exports=function(app, appEnv){

	app.post("/extendSubscription",function(req,res){
		var jsonRequest=req.body;
		var outletpayment=new OutletPayment();
		outletpayment.outletCode=jsonRequest.outletCode;
		outletpayment.amount=jsonRequest.amount;
		outletpayment.subscripedMonths=jsonRequest.subscribedMonths;
		outletpayment.paymentDate=jsonRequest.paymentDate;
		outletpayment.paymentId=jsonRequest.paymentId;
		outletpayment.save(function(err){
			if (err) {
				console.log('Error Inserting New Data');
				if (err.name == 'ValidationError') {
					for (field in err.errors) {
						console.log(err.errors[field].message); 
					}
				}
			}
			else {
				OutletSubscription.findOne({'outletCode' : jsonRequest.outletCode}, function(err, val){
					if (err) {
						console.log('Error Inserting New Data');
						if (err.name == 'ValidationError') {
							for (field in err.errors) {
								console.log(err.errors[field].message); 
							}
						}
					}
					var eDate=val.expiryDate;
					OutletSubscription.findOneAndUpdate(
							{
								'outletCode' : jsonRequest.outletCode,
							},
							{
								'expiryDate' : renewSubscription(eDate,jsonRequest.subscribedMonths),
								'activationStatus' : "ACT"
							}, function(err, OutletSubscription) {
								if (err) {
									res.json(jsonResponseObject(false, null, err));
								}
								res.json(jsonResponseObject(true, jsonRequest.outletCode,
										"Payment info received and subscription information updated successfully"));
							});
				});
			}	
		});					

	});
};