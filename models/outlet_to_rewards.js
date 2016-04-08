var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoryRewards = new Schema({
	category : String,
	values : [String]
});

var OutletToRewards = new Schema({
	outletCode : String,
	categories : [CategoryRewards]
});

module.exports = mongoose.model('outletToRewards', OutletToRewards);