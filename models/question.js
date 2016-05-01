var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Questions = new Schema({
	outletType : String,
	name : String,
	type : String,
	questionInputType: String,
	ratingValues : Array,
	emoticonIds : Array,
	isDirty : Boolean
});

module.exports = mongoose.model('questions', Questions);