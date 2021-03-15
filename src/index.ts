import { install } from 'source-map-support';

import { createServer } from './server';
import config from './config';

install();

const init = async () => {
	const fastify = await createServer();

	await new Promise((resolve, reject) => {
		fastify.listen(config.port, (err, address) => {
			if (err) return reject(err);
			fastify.log.info(`fastify 🚀 server listening on ${address}`, { env: config.env });
			return resolve(address);
		});
	});

	return fastify;
};

init()
	.catch((ex) => {
		console.error(ex);
		process.exit(1);
	});
