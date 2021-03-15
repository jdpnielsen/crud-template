import { FastifyInstance } from 'fastify';

import { authenticateJWT } from '@lib/auth/authentication';

import { loginSchema, removeSchema, signupSchema } from './schema';
import { signupHandler, getHandler, removeHandler, loginHandler } from './controller';

export async function accountRoutes(fastify: FastifyInstance): Promise<void> {
	fastify.post('/signup', { schema: signupSchema }, signupHandler);
	fastify.post('/login', { schema: loginSchema }, loginHandler);

	fastify.get('/', { preHandler: authenticateJWT }, getHandler);
	fastify.delete('/', { schema: removeSchema, preHandler: authenticateJWT }, removeHandler);
}
