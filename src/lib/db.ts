import { createConnection, getConnectionOptions, Repository } from 'typeorm';
import { FastifyInstance } from 'fastify';
import 'reflect-metadata';

import { User } from '../models/user';

export type DBType = {
	users: Repository<User>,
};

export async function db(server: FastifyInstance) {
	try {
		const connectionOptions = await getConnectionOptions();
		Object.assign(connectionOptions, {
			options: { encrypt: true },
			entities: [
				User,
			],
		});

		const connection = await createConnection(connectionOptions);

		const dbDecorator: DBType = {
			users: connection.getRepository(User),
		};

		server.decorate('db', dbDecorator);
		server.decorateRequest('db', { getter: () => dbDecorator });
	} catch (error) {
		console.log(error);
		console.log('make sure you have set .env variables - see .env.sample');
	}
}
