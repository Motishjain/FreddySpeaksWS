var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmoticonIdRef = new Schema({
	emoticonId : String,
	emotion : String
});

module.exports = mongoose.model('EmoticonIdRefs', EmoticonIdRef);