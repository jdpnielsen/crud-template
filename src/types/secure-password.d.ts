declare module 'secure-password' {
	const INVALID_UNRECOGNIZED_HASH: symbol;
	const INVALID: symbol;
	const VALID: symbol;
	const VALID_NEEDS_REHASH: symbol;

	function SecurePassword(opts?: { memlimit?: number, opslimit?: number }): SecurePassword;
	class SecurePassword {
		static HASH_BYTES: number;
		static PASSWORD_BYTES_MIN: number;
		static PASSWORD_BYTES_MAX: number;
		static MEMLIMIT_MIN: number;
		static MEMLIMIT_MAX: number;
		static OPSLIMIT_MIN: number;
		static OPSLIMIT_MAX: number;
		static MEMLIMIT_DEFAULT: number;
		static OPSLIMIT_DEFAULT: number;
		static INVALID_UNRECOGNIZED_HASH: symbol;
		static INVALID: symbol;
		static VALID: symbol;
		static VALID_NEEDS_REHASH: symbol;

		constructor(opts?: { memlimit?: number, opslimit?: number });
		memlimit: number;
		opslimit: number;

		hashSync(passwordBuf: Buffer): Buffer;

		hash(passwordBuf: Buffer): Promise<Buffer>;
		hash(passwordBuf: Buffer, cb: (err: Error, hashBuf: Buffer) => void): void;
		hash(passwordBuf: Buffer, cb?: (err: Error, hashBuf: Buffer) => void): Promise<Buffer> | void;
		verifySync(passwordBuf: Buffer, hashBuf: Buffer): symbol;

		verify(passwordBuf: Buffer, hashBuf: Buffer): Promise<symbol>;
		verify(passwordBuf: Buffer, hashBuf: Buffer, cb: (err: Error, result: symbol) => void): void;
		verify(passwordBuf: Buffer, hashBuf: Buffer, cb?: (err: Error, result: symbol) => void): Promise<symbol> | void;
	}

	export default SecurePassword;
}

