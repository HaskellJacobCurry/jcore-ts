export declare type Json = object;
export declare namespace Json {
    type Compute<TJson extends Json> = {
        [K in keyof TJson]: TJson[K];
    };
    type Pick<TJson extends Json, TKey extends keyof TJson = keyof TJson> = {
        [K in TKey]: TJson[K];
    };
    type Omit<TJson extends Json, TKey extends keyof TJson> = Pick<TJson, Exclude<keyof TJson, TKey>>;
    function assign<A>(dest: A): A;
    function assign<A, B>(dest: A, src0: B): A & B;
    function assign<A, B, C>(dest: A, src0: B, src1: C): A & B & C;
    function assign<A, B, C, D>(dest: A, src0: B, src1: C, src2: D): A & B & C & D;
    function assign<A, B, C, D, E>(dest: A, src0: B, src1: C, src2: D, src3: E): A & B & C & D & E;
}
