var express = require('express');
var mongoose = require('mongoose');
var QuestionTypeRef = require('../models/questionTypeRef');


module.exports = function(app) {
	app.post("/dataQuestionTypeRef",function(req, res,next) {
		  QuestionTypeRef.find({}, function(err, items){
        if(err) {
          console.log(err)
        }else{
          res.json(items);
        }
      })
	});
};