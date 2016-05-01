var express = require('express');
var mongoose = require('mongoose');
var QuestionInputType = require('../models/questionInputType');


module.exports = function(app) {
	app.post("/dataQuestionInputType",function(req, res,next) {
		  QuestionInputType.find({}, function(err, items){
        if(err) {
          console.log(err)
        }else{
          res.json(items);
        }
      })
	});
};