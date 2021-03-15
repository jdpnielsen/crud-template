import { verify, sign, VerifyOptions } from 'jsonwebtoken';

import config from '@config';

export type TokenPayload = {
	userId: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function promisedVerify<Token extends object = object>(token: string, secret: string, options: VerifyOptions): Promise<Token> {
	return new Promise((resolve, reject) => verify(token, secret, options, (err, decoded: Token) => {
		if (err) {
			return reject(err);
		}

		return resolve(decoded);
	}));
}

export async function signAuthToken(payload: TokenPayload) {
	return sign(payload, config.jwtSecret, {
		issuer: 'CRUD-TEMPLATE',
		subject: 'AUTH',
		expiresIn: '1d',
		algorithm: 'HS256',
	});
}

export async function verifyAuthToken(token: string): Promise<TokenPayload> {
	return await promisedVerify<TokenPayload>(token, config.jwtSecret, {
		issuer: 'CRUD-TEMPLATE',
		subject: 'AUTH',
		algorithms: ['HS256'],
	});
}

export async function signVerificationToken(payload: TokenPayload) {
	return sign(payload, config.jwtSecret, {
		issuer: 'CRUD-TEMPLATE',
		subject: 'VERIFY',
		expiresIn: '3d',
		algorithm: 'HS256',
	});
}

export async function verifyVerificationToken(token: string): Promise<TokenPayload> {
	return await promisedVerify<TokenPayload>(token, config.jwtSecret, {
		issuer: 'CRUD-TEMPLATE',
		subject: 'VERIFY',
		algorithms: ['HS256'],
	});
}

export async function signResetToken(payload: TokenPayload) {
	return sign(payload, config.jwtSecret, {
		issuer: 'CRUD-TEMPLATE',
		subject: 'RESET',
		expiresIn: '1d',
		algorithm: 'HS256',
	});
}

export async function verifyResetToken(token: string): Promise<TokenPayload> {
	return await promisedVerify<TokenPayload>(token, config.jwtSecret, {
		issuer: 'CRUD-TEMPLATE',
		subject: 'RESET',
		algorithms: ['HS256'],
	});
}
