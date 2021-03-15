import { DeepPartial } from 'typeorm';
import { FastifyReply, FastifyRequest } from 'fastify';
import { notFound } from '@jdpnielsen/http-error';

import { safeFields, User } from '@models/user';
import { TRequest } from '@lib/typebox.helper';
import { hashPassword, verifyPassword } from '@lib/auth/password.helper';
import { signAuthToken, signResetToken, verifyResetToken } from '@lib/auth/jwt.helper';

import { changePwSchema, confirmResetPwSchema, resetPwSchema } from './schema';

export async function resetPwHandler(req: TRequest<typeof resetPwSchema>, res: FastifyReply): Promise<FastifyReply> {
	const user = await req.db.users.findOne({ email: req.body.email });
	if (!user) {
		// Fake sign, in order to prevent timing from being used to infer email.
		await signResetToken({
			userId: '',
		});

		return res.status(200).send({
			message: 'If user with given email was found, a password reset email has been sendt.',
		});
	}

	const token = await signResetToken({
		userId: user._id,
	});

	//TODO: Send email & remove token from response.
	return res.status(200).send({
		token,
		message: 'If user with given email was found, a password reset email has been sendt.',
	});
}

export async function confirmResetPwHandler(req: TRequest<typeof confirmResetPwSchema>, res: FastifyReply): Promise<FastifyReply> {
	const decoded = await verifyResetToken(req.body.token);

	const user = await req.db.users.findOne(decoded.userId);
	if (!user) {
		throw notFound();
	}

	if (user.state !== 'PENDING_VERIFICATION') {
		throw new Error('Token expired');
	}

	const hashedPassword = await hashPassword(req.body.password);

	const payload: DeepPartial<User> = Object.assign(user, {
		hashedPassword,
		state: 'VERIFIED',
	});

	const updatedUser = await req.db.users.save(payload);
	const token = await signAuthToken({ userId: user._id });

	return res.send({ token, user: updatedUser });
}

export async function changePwHandler(req: TRequest<typeof changePwSchema>, res: FastifyReply): Promise<FastifyReply> {
	const doc = await req.db.users.findOne(req.user._id);
	if (!doc) {
		throw notFound();
	}

	const { hashedPassword, ...user } = doc;

	const valid = await verifyPassword(req.body.oldPassword, hashedPassword);

	if (!valid) {
		throw new Error('Unauthenticated');
	}

	const newHashedPassword = await hashPassword(req.body.newPassword);

	const payload: DeepPartial<User> = Object.assign(user, {
		hashedPassword: newHashedPassword.toString(),
	});

	await req.db.users.save(payload);

	return res.status(204).send();
}

export async function getHandler(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
	const user = await req.db.users.findOne(req.user._id, { select: safeFields });
	if (!user) {
		throw notFound();
	}

	return res.send(user);
}

export async function removeHandler(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
	const deleteResult = await req.db.users.delete(req.user._id);

	return res.send(deleteResult);
}
