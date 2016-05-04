var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionTypeRef = new Schema({
	questionTypeKey : String,
	questionTypeValue : String
});

module.exports = mongoose.model('QuestionTypeRef', QuestionTypeRef);