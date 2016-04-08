var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Questions = new Schema({
	outletCategory : String,
	questionName : String,
	questionType : String,
	ratingValues : [String],
	emoticonIds : [String]
});

module.exports = mongoose.model('questions', Questions);