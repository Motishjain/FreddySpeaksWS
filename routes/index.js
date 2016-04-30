module.exports = function(app,appEnv) {
	require('./fetchRewards')(app);
	require('./fetchQuestions')(app);
	require('./fetchFeedback')(app);
	require('./fetchSalesData')(app);
	require('./registerOutlet')(app);
	require('./saveRewards')(app);
	require('./submitFeedback')(app);
	require('./extendSubscription')(app);
	require('./saveGCMToken')(app);
};