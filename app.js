//BASE SETUP
//=============================================================================

//call the packages we need
var express = require('express'), // call express
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
app = express();

mongoose.connect('mongodb://freddyuser:missionpossible@ds019708.mlab.com:19708/rateus');


app.set('port', process.env.PORT || 3000);

//configure app to use bodyParser()
//this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

//ROUTES FOR OUR API
//=============================================================================
var router = express.Router(); // get an instance of the express Router

//middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

//more routes for our API will happen here

//REGISTER OUR ROUTES -------------------------------
var routes = require('./routes');

app.use('/',routes);

//START THE SERVER
//=============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);