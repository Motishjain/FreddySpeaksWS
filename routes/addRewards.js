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
	app.post("/addRewards",function(req, res,next) {
		upload(req,res,function(err){
        var imgname = "";
          if(err){
            console.log(err);
              res.json({error_code:1,err_desc:err});
              return;
          }else{
            imgname = req.file.filename
          }
          var params = req.body.data;
          params.image = imgname;
          console.log(imgname);
          var reawrdsObj = {};
          var reward = new Rewards(params);
          reward.save(function (err, room) { 
              if (err) {
                 console.log(err);
                 res.json({error_code:0,err_desc:err});
               }else{
                res.json({error_code:0,err_desc:null,dataObj: room });
               }
          });
     
      });
	});
};