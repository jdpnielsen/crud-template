import SecurePassword from 'secure-password';

const securePassword = new SecurePassword();

export async function hashPassword(password: string) {
	const buf = await securePassword.hash(Buffer.from(password));
	return buf.toString('base64');
}

export async function verifyPassword(password: string, passwordHash: string) {
	const passwordBuf = Buffer.from(password);
	const hashBuf = Buffer.from(passwordHash, 'base64');

	const verified = await securePassword.verify(passwordBuf, hashBuf);

	if (verified === SecurePassword.VALID) {
		return true;
	}

	if (verified === SecurePassword.VALID_NEEDS_REHASH) {
		throw new Error('Valid credentials - Needs rehash');
	}

	if (verified === SecurePassword.INVALID) {
		throw new Error('Invalid credentials');
	}

	if (verified === SecurePassword.INVALID_UNRECOGNIZED_HASH) {
		throw new Error('Invalid unrecognized hash');
	}

	throw new Error('Something went wrong. Contact system administrator if problem persists.');
}
