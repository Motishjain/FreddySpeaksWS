var express = require('express');
var mongoose = require('mongoose');
var outletPayment = require('../models/outletPayments');
var outletSubscription = require('../models/outletSubscription');
var moment=require('moment');

function renewSubscription(expdate,bymonths){
	var currentexpiry=moment(new Date(expdate));
	switch(bymonths){
	case 3:
		return currentexpiry.add(3, 'months');
	case 6:
		return currentexpiry.add(6, 'months');
	case 12:
		return currentexpiry.add(1, 'year');
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
		var outletpayment=new outletPayment();
		outletpayment.outletCode=jsonRequest.outletCode;
		outletpayment.amount=jsonRequest.amount;
		outletpayment.subscripedMonths=jsonRequest.months;
		outletpayment.paymentDate=jsonRequest.paymentDate;
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
				 	outletSubscription.findOne({'outletCode' : jsonRequest.outletCode}, function(err, val){
					 if (err) {
						    console.log('Error Inserting New Data');
						    if (err.name == 'ValidationError') {
						        for (field in err.errors) {
						            console.log(err.errors[field].message); 
						        }
						    }
						}
					 var eDate=val.expiryDate;
					 outletSubscription.findOneAndUpdate(
							 {
							'outletCode' : jsonRequest.outletCode,
							 },
							 {
								 'expiryDate' : renewSubscription(eDate,jsonRequest.months),
								 'activationStatus' : "ACT"
							 }, function(err, outletSubscription) {
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