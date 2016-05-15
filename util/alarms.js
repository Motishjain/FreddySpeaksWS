var Outlet = require('../models/outlet');
var OutletSubscription = require('../models/outletSubscription');
var Constants = require('../util/constants');
var currentDate = new Date();
var gcm = require('node-gcm');

function updateSubscription(err, outletSubscription) {
	if (err) {
		console.log(err);
		return;
	}
	var daysOverDue, daysLeft=0, timeDiff;

	var expirationDate = outletSubscription.expiryDate;
	var newStatus;
	if(outletSubscription.activationStatus!==Constants.SUBSCRIPTION_EXPIRED) {
		if(currentDate>expirationDate) {
			timeDiff = currentDate.getTime() - expirationDate.getTime();
			daysOverDue = timeDiff / (1000 * 60 * 60 * 24);
			if(daysOverDue<7) {
				newStatus = Constants.SUBSCRIPTION_PENDING;
			}
			else {
				newStatus = Constants.SUBSCRIPTION_EXPIRED;
			}
		}
		else {
			timeDiff = expirationDate.getTime() - currentDate.getTime();
			daysLeft = timeDiff / (1000 * 60 * 60 * 24);
		}
	}
	if(newStatus) {
		OutletSubscription.findOneAndUpdate({
			'outletCode' : outletSubscription.outletCode			    				
		}, {
			'activationStatus' : newStatus
		}, function(err, updatedOutletSubscription) {
			if (err) {
				console.log(err);
				return;
			}
		});
		outletSubscription.activationStatus = newStatus;
	}

	if(newStatus===Constants.SUBSCRIPTION_PENDING || newStatus===Constants.SUBSCRIPTION_EXPIRED || daysLeft<3) {
		
		Outlet.findOne({'outletCode':outletSubscription.outletCode}, function(err, currentOutlet) {
			var gcmToken = currentOutlet.gcmToken;
			var notificationTitle, notificationBody;
			if(outletSubscription.activationStatus===Constants.SUBSCRIPTION_PENDING) {
				notificationTitle = 'Renewal Pending';    	
				notificationBody = 'Expires in '+ (7-daysOverDue) + ' days';
			}
			else if(outletSubscription.activationStatus===Constants.SUBSCRIPTION_EXPIRED) {
				notificationTitle = 'Subscription Expired';
				notificationBody = 'Please renew your subscription to continue.';
			}
			else {
				notificationTitle = 'Gentle Reminder';    	
				notificationBody = 'Your subscription will expire in '+ daysLeft + ' days';
			}

			var message = new gcm.Message({    		
				priority: 'high',
				contentAvailable: true,
				data: {
					outletCode: outletSubscription.outletCode,
					activationStatus: outletSubscription.activationStatus
				},
				notification: {
					title: notificationTitle,
					icon: "ic_launcher",
					body: notificationBody
				}
			});

			var regTokens = [gcmToken];
			var sender = new gcm.Sender(Constants.GCM_SERVER_KEY);
			sender.send(message, { registrationTokens: regTokens }, function (err, response) {
				if(err) {
					console.error(err);
				}
				else {
					console.log(response);
				}
			});
		});
	}

}

module.exports = {
		checkSubscription: function () {
			Outlet.find({}, function(err, outlets) {
				if (err) {
					console.log("Error finding outlets");
				}
				for (var i = 0, len = outlets.length; i < len; i++) {
					var outlet = outlets[i];
					OutletSubscription.findOne({'outletCode':outlet.outletCode}, updateSubscription);
				}

			});
		}
};