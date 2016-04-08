var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rating = new Schema({
	questionId : String,
	rating : Number
});

var Feedback = new Schema({
	userName : String,
	userPhoneNumber : String,
	billNumber : String,
	billAmount : String,
	rewardCategory : String,
	rewardId : String,
	ratings : [Rating],
});

var Feedbacks = new Schema({
	outletCode : String,
	updateDate : Date,
	feedbackList : [Feedback]
});

module.exports = mongoose.model('feedbacks', Feedbacks);