var express = require('express');
var mongoose = require('mongoose');
var  multer  =   require('multer');
var Rewards = require('../models/reward');

var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './public/dist/uploads/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        },

    });

var upload = multer({ //multer settings
                    storage: storage
                }).single('file');


module.exports = function(app) {
	app.post("/editRewards",function(req, res,next) {
      var conditions =  {_id:req.body.id};
      var options =  { multi: true }; 
      var doc = req.body.data;
      Rewards.update(conditions, doc, options, function (err, raw) {
          if (err){
              console.log(err);
              res.json({error_code:0,err_desc:err});
            } else{
              console.log(raw);
              res.json({error_code:0,err_desc:null});
          }
  	  });
  })
  app.post("/editiRewards",function(req, res,next) {
       upload(req,res,function(err){
              var imgname = "";
                if(err){
                  console.log(err);
                  res.json({error_code:1,err_desc:err});
                }else{
                  imgname = req.file.filename
                }
                var params = req.body.data;
                   params.image = imgname;
                   console.log(params);
                 var conditions =  {_id:req.body.id};
                var options =  { multi: true }; 
                 Rewards.update(conditions, params, options, function (err, raw) {
                  if (err){
                      console.log(err);
                    } else{
                      console.log(raw);
                      res.json({error_code:0,err_desc:null, img:imgname});
                  }
                });

              });
  })
};