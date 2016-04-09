var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Feedback = new Schema({
	userName : String,
	userPhoneNumber : String,
	billNumber : String,
	billAmount : String,
	rewardCategory : String,
	rewardId : String,
	ratings : String,
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