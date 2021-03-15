import { FastifyInstance } from 'fastify';

import { authenticateJWT } from '@lib/auth/authentication';

import { resetPwSchema, confirmResetPwSchema, changePwSchema } from './schema';
import { resetPwHandler, confirmResetPwHandler, changePwHandler, getHandler, removeHandler } from './controller';

export async function profileRoutes(fastify: FastifyInstance): Promise<void> {
	fastify.post('/reset-pw', { schema: resetPwSchema }, resetPwHandler);
	fastify.post('/confirm-reset-pw', { schema: confirmResetPwSchema }, confirmResetPwHandler);
	fastify.post('/change-pw', { schema: changePwSchema, preHandler: authenticateJWT }, changePwHandler);

	fastify.get('/', { preHandler: authenticateJWT }, getHandler);
	fastify.delete('/', { preHandler: authenticateJWT }, removeHandler);
}
