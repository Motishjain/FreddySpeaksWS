/**Create by - Bhupender Singh
 * Date - 4/27/2016
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var outletPayment=new Schema({
	outletCode : String,
	amount: Number,
	subscribedMonths:Number,
	paymentDate:Date
});

module.exports = mongoose.model('outletPayments', outletPayment);