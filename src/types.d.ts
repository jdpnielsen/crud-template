// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fastify } from 'fastify';

import { User } from './models/user';
import { Apikey } from './models/apikeys';
import { DBType } from './lib/db';

// this declaration must be in scope of the typescript interpreter to work
declare module 'fastify' {
	interface FastifyRequest { // you must reference the interface and not the type
		db: DBType
		user: Omit<User, 'hashedPassword'>
		apikey: Omit<Apikey, 'key'>
	}
}

