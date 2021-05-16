export declare type Json = object;
export declare namespace Json {
    type Compute<TJson extends Json> = {
        [K in keyof TJson]: TJson[K];
    };
    type Pick<TJson extends Json, TKey extends keyof TJson = keyof TJson> = {
        [K in TKey]: TJson[K];
    };
    type Omit<TJson extends Json, TKey extends keyof TJson> = Pick<TJson, Exclude<keyof TJson, TKey>>;
}
