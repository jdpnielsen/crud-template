import { Type, Static } from '@sinclair/typebox';

import { literalUnion } from '@lib/typebox.helper';

import ajv from '../lib/validator';

const config = {
	port: process.env.PORT || 8080,
	env: process.env.NODE_ENV || 'development',
	jwtSecret: process.env.JWT_SECRET,
};

const configSchema = Type.Object({
	port: Type.Integer(),
	env: literalUnion(['development', 'production'], { default: 'development' }),
	jwtSecret: Type.String(),
});

if (!ajv.validate(configSchema, config)) {
	console.error('config errors:', ajv.errors);
	throw new Error('Invalid environment variable configuration. Please check that .env is created. Alternatively check above for details');
}

export default config as Static<typeof configSchema>;
