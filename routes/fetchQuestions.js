/*
 * GET home page.
 */
var express = require('express');
var mongoose = require('mongoose');
var Questions = require('../models/question');

module.exports = function(app,appEnv) {
	var router = express.Router();
	
	router.route("/fetchQuestions").get(function(req, res) {
		Questions.find({
			'outletType' : 'RET'
		}, function(err, questions) {
			if (err) {
				res.send(err);
			}
			res.json(questions);
		});
	});
};