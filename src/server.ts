import fastifyCors from 'fastify-cors';
import fastifyAuth from 'fastify-auth';
import { fastify } from 'fastify';

import ajv from '@lib/validator';
import config from '@config';

import { db } from './lib/db';
import { usersRoutes } from './api/users';
import { healthRoutes } from './api/health';
import { profileRoutes } from './api/account/profile';
import { accountRoutes } from './api/account';

const app = fastify({
	logger: {
		prettyPrint: config.env === 'development',
	},
});

app.setValidatorCompiler(({ schema }) => {
	return ajv.compile(schema);
});

export async function createServer() {
	await db(app);

	await app.register(fastifyCors);
	await app.register(fastifyAuth);

	await app.register(accountRoutes, { prefix: '/api/account' });
	await app.register(profileRoutes, { prefix: '/api/account/profile' });
	await app.register(healthRoutes, { prefix: '/api/health' });
	await app.register(usersRoutes, { prefix: '/api/users' });

	app.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});

	return app;
}
