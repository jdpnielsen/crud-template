import { FastifyRequest } from 'fastify';

import { authenticateJWT } from './authentication';

export async function authenticateAdmin(request: FastifyRequest) {
	await authenticateJWT(request);
	if (request.user.role !== 'admin') {
		throw new Error('Unauthorized');
	}
}
