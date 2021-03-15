import addFormats from 'ajv-formats';
import Ajv from 'ajv';

const ajv = new Ajv({
	removeAdditional: true,
	useDefaults: true,
	coerceTypes: 'array',
});

ajv.addKeyword('kind');
ajv.addKeyword('modifier');

addFormats(ajv, [
	'date-time',
	'time',
	'date',
	'email',
	'hostname',
	'ipv4',
	'ipv6',
	'uri',
	'uri-reference',
	'uuid',
	'uri-template',
	'json-pointer',
	'relative-json-pointer',
	'regex',
]);

export default ajv;
