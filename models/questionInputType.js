var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionInputTypeRef = new Schema({
	questionInputTypeKey : String,
	questionInputTypeValue : String
});

module.exports = mongoose.model('QuestionInputTypeRef', QuestionInputTypeRef);