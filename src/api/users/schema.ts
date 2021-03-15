import { Type } from '@sinclair/typebox';

import { passwordRegex, userRoles, userStates } from '@models/user';
import { idParam, literalUnion } from '@lib/typebox.helper';

export const createSchema = {
	body: Type.Object({
		email: Type.String({ format: 'email' }),
		password: Type.String({ minLength: 8, pattern: passwordRegex.source }),
		state: literalUnion([...userStates]),
		role: literalUnion([...userRoles]),
	}),
};

export const findSchema = {};

export const getByIdSchema = {
	params: idParam,
};

export const updateSchema = {
	params: idParam,
	body: Type.Object({
		email: Type.Optional(Type.String({ format: 'email' })),
		password: Type.Optional(Type.String({ minLength: 8, pattern: passwordRegex.source })),
		state: Type.Optional(literalUnion([...userStates])),
		role: Type.Optional(literalUnion([...userRoles])),
	}),
};

export const removeSchema = {
	params: idParam,
};
