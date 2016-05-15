var Outlet = require('../models/outlet');
var OutletSubscription = require('../models/outletSubscription');
var Constants = require('../util/constants');
var currentDate = new Date();
var gcm = require('node-gcm');
var currentOutlet;

function updateSubscription(err, outletSubscription) {
	if (err) {
		console.log(err);
		return;
	}
	var daysOverDue;
	
	var expirationDate = outletSubscription.expiryDate;
	var newStatus;
    if(outletSubscription.activationStatus!==Constants.SUBSCRIPTION_EXPIRED) {
        if(currentDate>expirationDate) {
            var diff = currentDate.getTime() - expirationDate.getTime();
            daysOverDue = diff / (1000 * 60 * 60 * 24);
            if(daysOverDue<7) {
                newStatus = Constants.SUBSCRIPTION_PENDING;
            }
            else {
                newStatus = Constants.SUBSCRIPTION_EXPIRED;
            }
        }
    }
    if(newStatus!==null) {
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
    }
    
    if(newStatus===Constants.SUBSCRIPTION_PENDING || newStatus===Constants.SUBSCRIPTION_EXPIRED) {
    	var gcmToken = currentOutlet.gcmToken;
    	var notificationTitle, notificationBody;
    	if(newStatus===Constants.SUBSCRIPTION_PENDING) {
    		notificationTitle = 'Renewal Pending';    	
    		notificationBody = 'Expires in'+ (7-daysOverDue) + 'days';
    	}
    	else {
    		notificationTitle = 'Subscription Expired';
    		notificationBody = 'Please renew your subscription to continue.';
    	}
    	
    	var message = new gcm.Message({    		
    		priority: 'high',
    		contentAvailable: true,
    		data: {
    			outletCode: currentOutlet.outletCode,
    			activationStatus: newStatus
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
    }
	
}

module.exports = {
		checkSubscription: function () {
			Outlet.find({}, function(err, outlets) {
				if (err) {
					console.log("Error finding outlets");
				}
				for (var i = 0, len = outlets.length; i < len; i++) {
					currentOutlet = outlets[i];
					OutletSubscription.findOne({'outletCode':currentOutlet.outletCode}, updateSubscription);
				}

			});
		}
};