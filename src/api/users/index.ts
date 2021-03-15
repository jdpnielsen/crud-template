import { FastifyInstance } from 'fastify';

import { authenticateAdmin } from '../../lib/auth/authorization';

import { createSchema, getByIdSchema, updateSchema, removeSchema, findSchema } from './schema';
import { createHandler, findHandler, getByIdHandler, updateHandler, removeHandler } from './controller';

export async function usersRoutes(fastify: FastifyInstance): Promise<void> {
	fastify.get('/', { schema: findSchema, preHandler: authenticateAdmin }, findHandler);
	fastify.post('/', { schema: createSchema, preHandler: authenticateAdmin }, createHandler);
	fastify.get('/:id', { schema: getByIdSchema, preHandler: authenticateAdmin }, getByIdHandler);
	fastify.put('/:id', { schema: updateSchema, preHandler: authenticateAdmin }, updateHandler);
	fastify.delete('/:id', { schema: removeSchema, preHandler: authenticateAdmin }, removeHandler);
}
