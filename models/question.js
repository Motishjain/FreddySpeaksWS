var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Questions = new Schema({
	outletType : String,
	questionName : String,
	questionType : String,
	questionInputType: String,
	ratingValues : Array,
	emoticonIds : Array,
	//isDirty : { type: Boolean, default: "true" }
});

module.exports = mongoose.model('questions', Questions);