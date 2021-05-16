import {
	Trampoline,
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
	(f: Function, ...as: Function.Args<typeof f>): State<Function.Ret<typeof f>>;
}

interface State<TRet = any> {
	rec: Rec;
	thunk: () => TRet | State<TRet>;
}

export let trampoline: Trampoline = f => {
	let rec: Rec = (f, ...as) => ({ rec, thunk: () => f(...as) });
	type TArgs = Trampoline.Function.Args<typeof f>;
	type TRet = Trampoline.Function.Ret<typeof f>;
	let isState = (state: any): state is State => state && state.rec === rec;
	return (...as) => (
		((state: State<TRet> | TRet) => {
			while (isState(state)) {
				state = state.thunk();
			}
			return state;
		})(
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

export default trampoline