import { FastifyInstance } from 'fastify';

import { isUp } from './controller';

export async function healthRoutes(fastify: FastifyInstance): Promise<void> {
	fastify.get('/', isUp);
}
