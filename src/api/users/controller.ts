import { DeepPartial } from 'typeorm';
import { FastifyReply } from 'fastify';
import { notFound } from '@jdpnielsen/http-error';

import { TRequest } from '@lib/typebox.helper';

import { safeFields, User } from '../../models/user';
import { hashPassword } from '../../lib/auth/password.helper';

import { createSchema, findSchema, getByIdSchema, removeSchema, updateSchema } from './schema';

export async function createHandler(req: TRequest<typeof createSchema>, res: FastifyReply): Promise<FastifyReply> {
	const payload: DeepPartial<User> = {
		email: req.body.email,
		state: req.body.state,
		role: req.body.role,
		hashedPassword: await hashPassword(req.body.password),
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { hashedPassword, ...user } = await req.db.users.save(payload);

	return res.send(user);
}

export async function findHandler(req: TRequest<typeof findSchema>, res: FastifyReply): Promise<FastifyReply> {
	const users = await req.db.users.find({ select: safeFields });

	return res.send(users);
}

export async function getByIdHandler(req: TRequest<typeof getByIdSchema>, res: FastifyReply): Promise<FastifyReply> {
	const user = await req.db.users.findOne(req.params.id, { select: safeFields });
	if (!user) {
		throw notFound();
	}

	return res.send(user);
}

export async function updateHandler(req: TRequest<typeof updateSchema>, res: FastifyReply): Promise<FastifyReply> {
	const user = await req.db.users.findOne(req.params.id, { select: safeFields });
	if (!user) {
		throw notFound();
	}

	const { password, ...fields } = req.body;

	const payload: Partial<User> = {
		...fields,
	};

	if (password) {
		payload.hashedPassword =  await hashPassword(password);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { hashedPassword, ...updatedUser } = await req.db.users.save(user);

	return res.send(updatedUser);
}

export async function removeHandler(req: TRequest<typeof removeSchema>, res: FastifyReply): Promise<FastifyReply> {
	const deleteResult = await req.db.users.delete(req.params.id);

	return res.send(deleteResult);
}
