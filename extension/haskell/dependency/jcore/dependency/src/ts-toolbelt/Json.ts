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
}