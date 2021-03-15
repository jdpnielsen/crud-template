import { FastifyRequest } from 'fastify';
import { CustomOptions, TValue, Type, Static, TSchema } from '@sinclair/typebox';

export function literalUnion<T extends TValue>(items: T[], options?: CustomOptions) {
	return Type.Union(items.map((e) => (Type.Literal<T>(e))), options);
}

export const idParam = Type.Object({
	id: Type.String({ format: 'uuid' }),
});

export interface TypeboxFastifySchema {
  body?: TSchema;
  querystring?: TSchema;
  params?: TSchema;
  headers?: TSchema;
  response?: TSchema;
}

export type TRequest<T extends TypeboxFastifySchema> = FastifyRequest<{
	Body: Static<T['body']>
	Querystring: Static<T['querystring']>
	Params: Static<T['params']>
	Headers: Static<T['headers']>
	Reply: Static<T['response']>
}>;
