var express = require('express');
var mongoose = require('mongoose');
var outletPayment = require('../models/outletPayments');
var outletSubscription = require('../models/outletSubscription');
var moment=require('moment');


Date.prototype.addMonths=function (cdate, months) {
	
	//console.log(cdate);
	var m=moment(new Date(cdate));
	console.log(m.isValid());
	//console.log(m);
	//m.add(1,'months');
	//console.log("post addition..");
	//console.log(m);
	var addDays;
	if(months==3)
	{
		m.add(3,'months');
		//console.log(m);
	}
	else if(months==6){
		m.add(6,'months');
		//console.log(m);
	}else if(months==12){
		m.add(1,'year');
		//console.log(m);
	}
	//var dat=new Date(cdate);
	//dat.setDate(dat.getDate()+addDays);
	
	return m;
	
};

/*Date.prototype.addDays=function(days)
{
var dat=new Date(this.valueOf());
dat.setDate(dat.getDate()+days);
return dat;
}*/

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
						 /*exports.expvalue=function(req, res, next){
							 outletSubscription.find({'outletCode' : jsonRequest.outletCode},
							expiryDate,function(err, someValue){
								 if(err) return next(err);
								 res.send(someValue);
							 });
						 };*/
						 
						 //var output=outletSubscription.findOne({'outletCode' : jsonRequest.outletCode},{'expiryDate':1});
						 //console.log(output);
						 
						 /*var query = outletSubscription.findOne({'outletCode' : jsonRequest.outletCode}, {'expiryDate':1});
						 //console.log(query);
						 if (query) {
							   var eDate = query.activationStatus;

							   console.log(eDate);
							}*/
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
							 console.log(eDate);
							 outletSubscription.findOneAndUpdate(
									 {
									'outletCode' : jsonRequest.outletCode,
									 },
									 {
										 'expiryDate' : Date.prototype.addMonths(eDate,jsonRequest.months),
										 'activationStatus' : "ACT"
									 }, function(err, outletSubscription) {
										 if (err) {
											 res.json(jsonResponseObject(false, null, err));
										 }
										 res.json(jsonResponseObject(true, jsonRequest.outletCode,
											"Payment info received and subscription information updated successfully"));
									 	});
						 });
						// var currentExpiryDate=outletSubscription.find({'outletCode' : jsonRequest.outletCode}
						 //).select({expiryDate:1});
						 //outletSubscription.findOne({'outletCode' : jsonRequest.outletCode},function(err, obj){
						//	 console.log(obj.expiryDate);
							 //currentExpiryDate=obj.expiryDate;
						  //});
						 //console.log(expvalue.someValue);
						
					 	}	
				});					
				
	});
};