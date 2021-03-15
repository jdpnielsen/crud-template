declare module 'secure-token' {
	export function create(size?: number): Buffer;
	export function hash(tokenBuf: Buffer, namespace?: string | Buffer): Buffer;
	export const APPTOKEN_BYTES_MIN: number;
	export const APPTOKEN_BYTES: number;
}
