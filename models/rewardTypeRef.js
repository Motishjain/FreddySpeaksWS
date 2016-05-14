var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RewardTypeRef = new Schema({
	rewardTypeKey : String,
	rewardTypeValue : String
});

module.exports = mongoose.model('RewardTypeRefs', RewardTypeRef);