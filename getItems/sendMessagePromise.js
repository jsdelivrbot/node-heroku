exports.sendMessagePromise = function (recipientId, message) {
	return new Promise((resolve, reject) => {
	console.log('message: ', message);
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
		console.log('message sent successfully');
		return resolve(response);
    });
	})
};