var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rating = new Schema({ questionId: String, selectedOptionIndex: String }, { noId: true });

var Feedback = new Schema({
	userPhoneNumber : String,
	billNumber : String,
	billAmount : Number,
	rewardCategory : String,
	rewardId : String,
	ratings: [Rating],
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
exports.Rating = mongoose.model('rating', Rating);