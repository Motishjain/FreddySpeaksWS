module.exports = function(app,appEnv) {
	require('./fetchRewards')(app);
	require('./fetchQuestions')(app);
	require('./fetchFeedback')(app);
	require('./fetchSalesData')(app);
	require('./registerOutlet')(app);
	require('./saveRewards')(app);
	require('./submitFeedback')(app);
	require('./extendSubscription')(app);
	require('./fetchSubscription')(app);
	require('./saveGCMToken')(app);
	require('./addRewards')(app);
	require('./dataRewards')(app);
	require('./removeRewards')(app);
	require('./editRewards')(app);
	require('./addQuestions')(app);
	require('./dataQuestions')(app);
	require('./removeQuestions')(app);
	require('./editQuestions')(app);
};