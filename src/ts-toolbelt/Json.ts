export type Json = object;
export namespace Json {
	export type Compute<
		TJson extends Json
	> = { 
		[K in keyof TJson]: TJson[K]; 
	};

	export type Pick<
		TJson extends Json,
		TKey extends keyof TJson = keyof TJson
	> = { 
		[K in TKey]: TJson[K]; 
	};

	export type Omit<
		TJson extends Json,
		TKey extends keyof TJson
	> = Pick<TJson, Exclude<keyof TJson, TKey>>;

	export function assign<A>(dest: A): A;
	export function assign<A, B>(dest: A, src0: B): A & B;
	export function assign<A, B, C>(dest: A, src0: B, src1: C): A & B & C;
	export function assign<A, B, C, D>(dest: A, src0: B, src1: C, src2: D): A & B & C & D;
	export function assign<A, B, C, D, E>(dest: A, src0: B, src1: C, src2: D, src3: E): A & B & C & D & E;
	export function assign(dest: any, ...srcs: any[]): any {
		for (let src of srcs) {
			for (let k in src) {
				if (typeof src[k] !== 'undefined') {
					dest[k] = src[k];
				}
			}
		}
		return dest;
	}
}