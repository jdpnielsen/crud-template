import { DeepPartial } from 'typeorm';
import { FastifyReply, FastifyRequest } from 'fastify';
import { notFound } from '@jdpnielsen/http-error';

import { safeFields, User } from '@models/user';
import { TRequest } from '@lib/typebox.helper';
import { hashPassword, verifyPassword } from '@lib/auth/password.helper';
import { signAuthToken, signVerificationToken } from '@lib/auth/jwt.helper';

import { loginSchema, removeSchema, signupSchema } from './schema';

export async function signupHandler(req: TRequest<typeof signupSchema>, res: FastifyReply): Promise<FastifyReply> {
	const hashedPassword = await hashPassword(req.body.password);

	const payload: DeepPartial<User> = {
		email: req.body.email,
		hashedPassword: hashedPassword.toString(),
		role: 'owner',
	};

	const user = await req.db.users.save(payload);

	const token = await signVerificationToken({ userId: user._id });
	// TODO: Send email

	return res.send({ token, message: 'Please verify your email' });
}

export async function loginHandler(req: TRequest<typeof loginSchema>, res: FastifyReply): Promise<FastifyReply> {
	const doc = await req.db.users.findOne({ email: req.body.email });

	if (!doc) {
		throw notFound();
	}

	const { hashedPassword, ...user } = doc;

	const valid = await verifyPassword(req.body.password, hashedPassword);

	if (!valid) {
		throw new Error('Unauthenticated');
	}

	const token = await signAuthToken({
		userId: user._id,
	});

	return res.send({ token, user });
}

export async function getHandler(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
	const user = await req.db.users.findOne(req.user._id, { select: safeFields });
	if (!user) {
		throw notFound('User not found', { info: { id: req.user._id } });
	}

	return res.send({ user });
}

export async function removeHandler(_req: TRequest<typeof removeSchema>, res: FastifyReply): Promise<FastifyReply> {
	// TODO: Implement proper flow. Should maybe implement somekind of notification & cooldown period.
	return res.send({ message: 'fake removal' });
}
