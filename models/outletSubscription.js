var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var outletSubscriptions=new Schema({
	outletCode : String,
	expiryDate: Date,
	activationStatus:String
});

module.exports = mongoose.model('outletSubscriptions', outletSubscriptions);