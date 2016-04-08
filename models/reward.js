var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Rewards = new Schema({
	outletType : String,
	name : String,
	image : String,
	cost : String,
	level : String,
	type : String
});

module.exports = mongoose.model('rewards', Rewards);