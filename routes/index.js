module.exports = function(app,appEnv) {
	require('./fetchRewards')(app);
	require('./fetchQuestions')(app);
};