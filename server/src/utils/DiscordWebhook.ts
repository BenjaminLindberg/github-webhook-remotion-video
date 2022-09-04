import axios from 'axios';
const config = require('../../../config.json');

export default ({video}: {video: string}) => {
	const axios_config = {
		method: 'POST',
		url: config.webhook, // https://discord.com/webhook/url/here
		headers: {'Content-Type': 'application/json'},
		data: JSON.stringify({content: video}),
	};

	axios(axios_config)
		.then((response) => {
			console.log('Webhook delivered successfully');
			return response;
		})
		.catch((error) => {
			console.log(error);
			return error;
		});
};
