var express = require('express');
var mongoose = require('mongoose');
var Questions = require('../models/question');


module.exports = function(app) {
	app.post("/removeQuestions",function(req, res,next) {
		Questions.remove({ _id: req.body.id }, function (err) {
	        if(err) {
	          console.log(err)
	          res.json({error_code:err});
	        }else{
	          res.json({error_code:0,err_desc:null});
	        }
      	});
	});
};