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
	createdDate : Date
});

var OutletFeedback = new Schema({
	outletCode : String,
	updatedDate : Date,
	feedbackList : [Feedback],
	createdDate : Date
});

exports.OutletFeedback = mongoose.model('outletFeedbacks', OutletFeedback);
exports.Feedback = mongoose.model('feedback', Feedback);