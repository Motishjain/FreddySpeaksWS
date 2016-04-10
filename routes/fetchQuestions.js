var express = require('express');
var mongoose = require('mongoose');
var Questions = require('../models/question');

module.exports = function(app,appEnv) {
	
	app.get("/fetchQuestions/:outletType",function(req, res) {
		var outletType = req.params.outletType;
		Questions.find({
			'outletType' : outletType
		}, function(err, questions) {
			if (err) {
				res.send(err);
			}
			res.json(questions);
		});
	});
};