module.exports = function(app,appEnv) {
	require('./fetchRewards')(app);
	require('./fetchQuestions')(app);
	require('./fetchFeedback')(app);
	require('./registerOutlet')(app);
	require('./saveRewards')(app);
	require('./submitFeedback')(app);
};