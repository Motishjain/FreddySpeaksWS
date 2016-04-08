//BASE SETUP
//=============================================================================

//call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Reward = require('./models/reward');

mongoose.connect('mongodb://freddyuser:missionpossible@ds019708.mlab.com:19708/rateus');


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

//test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({
		message : 'hooray! welcome to our api!'
	});
});

//localhost:8080/api/fetchRewards
router.route('/fetchRewards')
.get(function(req, res) {
	
	Reward.find({'outletType':'RET'},function(err, rewards) {
        if (err) {
            res.send(err);
        }
        res.json(rewards);
    });
    
});

//more routes for our API will happen here

//REGISTER OUR ROUTES -------------------------------
//all of our routes will be prefixed with /api
app.use('/api', router);

//START THE SERVER
//=============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);