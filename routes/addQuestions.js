var express = require('express');
var mongoose = require('mongoose');
var Questions = require('../models/question');



module.exports = function(app) {
	app.post("/addQuestions",function(req, res,next) {
          var params = req.body.data;
          var question = new Questions(params);
          question.save(function (err, room) { 
              if (err) {
                 console.log(err);
                 res.json({error_code:0,err_desc:err});
               }else{
                res.json({error_code:0,err_desc:null,dataObj: room });
               }
          });
     
	});
};