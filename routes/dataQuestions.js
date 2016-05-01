var express = require('express');
var mongoose = require('mongoose');
var Questions = require('../models/question');


module.exports = function(app) {
	app.post("/dataQuestions",function(req, res,next) {
		  Questions.find({}, function(err, items){
        if(err) {
          console.log(err)
        }else{
          res.json(items);
        }
      })
	});
};