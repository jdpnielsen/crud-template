import { Type } from '@sinclair/typebox';

import { passwordRegex } from '@models/user';

export const resetPwSchema = {
	body: Type.Object({
		email: Type.String({ format: 'email' }),
	}),
};

export const confirmResetPwSchema = {
	body: Type.Object({
		password: Type.String({ pattern: passwordRegex.source }),
		token: Type.String(),
	}),
};

export const changePwSchema = {
	body: Type.Object({
		oldPassword: Type.String(),
		newPassword: Type.String({ pattern: passwordRegex.source }),
	}),
};
