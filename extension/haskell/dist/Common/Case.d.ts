import { Cast, Record } from '.';
declare type Key = string | number;
interface State<TKey extends Key = Key, TArgs extends any[] = any[]> {
    key: TKey;
    args: TArgs;
}
export { State };
interface Case<TState extends State> {
    state: TState;
    _T0: TState extends State<infer TKey, infer TArgs> ? [TKey, TArgs] : never;
    cata: <T>(fs: ((TState extends State<infer TKey> ? TKey : never) extends infer TKey ? {
        [K in TKey extends Key ? TKey : never]: (this['_T0'] extends infer T0 ? (T0 extends any ? (T0 extends [infer TKey, infer TArgs] ? (TArgs extends any[] ? (TKey extends K ? (..._s: TArgs) => T : never) : never) : never) : never) : never);
    } : never) extends infer J ? Cast<J, Record> : never) => T;
}
export { Case };
declare type Infer<TCase> = (Case<TCase extends Case<infer TState> ? TState : never> extends Case<infer TState> ? ([
    TState
] extends [never] ? never : Case<TState>) : never);
declare let infer: <TCase>(_: TCase) => Infer<TCase>;
export { infer };
declare let createCase: <TKey extends Key, TArgs extends any[]>(_: TKey, ..._s: TArgs) => Case<State<TKey, TArgs>>;
export { createCase as create };
declare let Case: (<TKey extends string | number, TArgs extends any[]>(_: TKey, ..._s: TArgs) => Case<State<TKey, TArgs>>) & {
    create: <TKey extends string | number, TArgs extends any[]>(_: TKey, ..._s: TArgs) => Case<State<TKey, TArgs>>;
    infer: <TCase>(_: TCase) => [TCase extends Case<infer TState> ? TState : never] extends [never] ? never : Case<TCase extends Case<infer TState> ? TState : never>;
};
