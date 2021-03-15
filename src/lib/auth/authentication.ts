import { FastifyRequest } from 'fastify';
import { badRequest, unauthorized } from '@jdpnielsen/http-error';

import { safeFields } from '@models/user';

import { TokenPayload, verifyAuthToken } from './jwt.helper';

export interface DecodedAuthToken {
	user: string;
}

export async function authenticateJWT(request: FastifyRequest) {
	const authorizationHeader = request.raw.headers.authorization;

	if (!authorizationHeader) {
		throw unauthorized('Authorization header missing');
	}

	let decoded: TokenPayload;
	try {
		decoded = await verifyAuthToken(authorizationHeader.split(' ')[1]);
	} catch (error) {
		throw badRequest('Malformed Authorization header', { cause: error, info: { authorizationHeader } });
	}

	const user = await request.db.users.findOne({ _id: decoded.userId }, { select: safeFields });
	if (!user) {
		throw unauthorized();
	}

	request.user = user;
}
