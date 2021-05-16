import {
	PromisedTrampoline,
	Promise,
	Function,
	Cast,
	Tuple,
} from '../ts-toolbelt'

interface X<
	TArgs extends Tuple,
	TRet extends any
> {
	(x: X<TArgs, TRet>): Function<TArgs, TRet>;
}

interface Rec {
	(f: Function, ...as: Function.Args<typeof f>): {
		rec: Rec;
		thunk: Function<[], Function.Ret<typeof f>>;
	};
}

export let promisedTrampoline: PromisedTrampoline = f => {
	let rec: Rec = (f, ...as) => ({ rec, thunk: () => f(...as) });
	type RecRet = Function.Ret<Rec>;
	type TArgs = PromisedTrampoline.Function.Args<typeof f>;
	type TRet = PromisedTrampoline.Function.Ret<typeof f>;
	let isRecRet = (state: any): state is RecRet => state && state.rec === rec;
	return (...as) => (
		((state: RecRet | TRet) => (
			new Promise((resolve, reject) => {
				(function f(state) {
					if (isRecRet(state)) {
						Promise.resolve().then(() => state.thunk()).then(f).catch(reject);
					} else {
						resolve(state);
					}
				})(state);
			})
		))(
			(x => x(x))(<X<TArgs, TRet>>
				(x => (...as) => (
					(s => (
						rec(() => f(s, ...as))
					))((...as: TArgs) => x(x)(...as))
				))
			)(...as)
		)
	);
};

export default promisedTrampoline