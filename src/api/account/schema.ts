import { Type } from '@sinclair/typebox';

import { passwordRegex } from '@models/user';
import { idParam } from '@lib/typebox.helper';

export const signupSchema = {
	body: Type.Object({
		email: Type.String({ format: 'email' }),
		password: Type.String({ pattern: passwordRegex.source }),
	}),
};

export const loginSchema = {
	body: Type.Object({
		email: Type.String({ format: 'email' }),
		password: Type.String({ pattern: passwordRegex.source }),
	}),
};

export const removeSchema = {
	params: idParam,
};
