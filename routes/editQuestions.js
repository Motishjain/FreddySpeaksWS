var express = require('express');
var mongoose = require('mongoose');
var Questions = require('../models/question');


module.exports = function(app) {
	app.post("/editQuestions",function(req, res,next) {
      var conditions =  {_id:req.body.id};
      var options =  { multi: true }; 
      var doc = req.body.data;
      Questions.update(conditions, doc, options, function (err, raw) {
          if (err){
              console.log(err);
              res.json({error_code:0,err_desc:err});
            } else{
              console.log(raw);
              res.json({error_code:0,err_desc:null});
          }
  	  });
  })
}