var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OutletToRewards = new Schema({
	outletCode : String,
	rewardCategory : String,
	rewardIdList : [String]
});

module.exports = mongoose.model('outletToRewards', OutletToRewards);