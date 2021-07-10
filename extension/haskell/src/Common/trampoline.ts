import {
	X,
	apply,
	create,
} from './common'

type Rec = <AS extends any[], B>(f: (..._: AS) => StateLike<B>, ..._: AS) => State<B>;

interface State<T> {
	rec: Rec;
	thunk: () => StateLike<T>;
}

type StateLike<T> = T | State<T>;

let rec: Rec = (f, ...as) => ({
	rec,
	thunk: () => f(...as),
});

let isState = <T>(state: any): state is State<T> => state && state.rec === rec;

namespace trampoline_ {
	export type Cont<T> = (acc: T) => StateLike<T>;
}
let trampoline_: <AS extends any[], B>(f: (s: (..._: AS) => StateLike<B>, ..._: AS) => StateLike<B>) => (..._: AS) => B = (
	<AS extends any[], B>(f: (s: (..._: AS) => StateLike<B>, ..._: AS) => StateLike<B>) => (...as: AS) => (
		apply(
			(x => x(x))(
				create<X<(..._: AS) => StateLike<B>>>(
					(x => (...as) => (
						((s = (...as: AS) => x(x)(...as)) => (
							rec(() => f(s, ...as))
						))()
					))
				)
			)
		)(_ => apply(
			_(...as)
		))(state => {
			while (isState<B>(state)) {
				state = state.thunk();
			}
			return state;
		})
	)
);
export {trampoline_}

namespace trampoline {
	export type Cont<T> = (acc: T) => StateLike<T>;
}
let trampoline: <B>() => <AS extends any[]>(f: (..._: AS) => (s: (..._: AS) => StateLike<B>) => StateLike<B>) => (..._: AS) => B = (
	<B>() => <AS extends any[]>(f: (..._: AS) => (s: (..._: AS) => StateLike<B>) => StateLike<B>) => (...as: AS) => (
		apply(
			(x => x(x))(
				create<X<(..._: AS) => StateLike<B>>>(
					(x => (...as) => (
						((s = (...as: AS) => x(x)(...as)) => (
							rec(() => f(...as)(s))
						))()
					))
				)
			)
		)(_ => apply(
			_(...as)
		))(state => {
			while (isState<B>(state)) {
				state = state.thunk();
			}
			return state;
		})
	)
);
export {trampoline}

export default trampoline