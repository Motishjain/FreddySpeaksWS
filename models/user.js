var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Users = new Schema({
	userName : String,
	userPhoneNumber : String
});

module.exports = mongoose.model('users', Users);