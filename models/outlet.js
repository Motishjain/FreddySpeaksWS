var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Outlets = new Schema({
	outletName : String,
	outletCode : String,
	outletType : String,
	aliasName : String,
	addrLine1 : String,
	addrLine2 : String,
	pinCode : String,
	email : String,
	workPhone : String,
	cellNumber : String,
});
module.exports = mongoose.model('outlets', Outlets);