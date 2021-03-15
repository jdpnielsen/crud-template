import { FastifyReply, FastifyRequest } from 'fastify';

export async function isUp(req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
	return res.send({ status: 'ok' });
}
