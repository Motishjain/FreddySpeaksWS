var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Outlets = new Schema({
	outletName : String,
	aiasName : String,
	addressLine1 : String,
	addressLine2 : String,
	pinCode : String,
	email : String,
	workPhone : String,
	cellNumber : String,
	outletTypeCode : String
});

module.exports = mongoose.model('outlets', Outlets);