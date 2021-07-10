import {
	Json,
	placeholder,
	reinterpret,
	create,
	Cast,
	Record,
} from '.'

type Key = string | number;

interface State<TKey extends Key = Key, TArgs extends any[] = any[]> {
	key: TKey;
	args: TArgs;
}
export {State}

interface Case<TState extends State> {
	state: TState;
	_T0: TState extends State<infer TKey, infer TArgs> ? [TKey, TArgs] : never;
	cata: <T>(fs: (
		(TState extends State<infer TKey> ? TKey : never) extends infer TKey ? {
			[K in TKey extends Key ? TKey : never]: (
				this['_T0'] extends infer T0 ? (
					T0 extends any ? (
						T0 extends [infer TKey, infer TArgs] ? (
							TArgs extends any[] ? (
								TKey extends K ? (..._s: TArgs) => T : never
							) : never
						) : never
					) : never
				) : never
			)
		} : never
	) extends infer J ? Cast<J, Record> : never) => T;
}
export {Case}

type Infer<TCase> = (
	Case<TCase extends Case<infer TState> ? TState : never> extends Case<infer TState> ? (
		[TState] extends [never] ? never : Case<TState>
	) : never
);
let infer: <TCase>(_: TCase) => Infer<TCase> = _ => reinterpret(_);
export {infer}

let createCase: <TKey extends Key, TArgs extends any[]>(_: TKey, ..._s: TArgs) => Case<State<TKey, TArgs>> = (
	<TKey extends Key, TArgs extends any[]>(key: TKey, ...args: TArgs) => (
		create<Case<State<TKey, TArgs>>>({
			state: create({key, args}),
			_T0: placeholder(),
			cata: fs => fs[key](...args),
		})
	)
);
export {createCase as create}

let Case = Json.assign(createCase, {
	create: createCase,
	infer,
});