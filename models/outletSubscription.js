var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var outletSubscriptions=new Schema({
	outletCode : String,
	expiryDate: String,
	activationStatus:String
});

module.exports = mongoose.model('outletSubscriptions', outletSubscriptions);