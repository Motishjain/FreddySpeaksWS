var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Questions = new Schema({
	outletType : String,
	outletType : String,
	name : String,
	type : String,
	ratingValues : Array,
	emoticonIds : Array
});

module.exports = mongoose.model('questions', Questions);