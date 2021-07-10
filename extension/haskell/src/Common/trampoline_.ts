import {
	X,
	apply,
	create,
	recurse,
} from '.'
import {Promise, Promisable} from './Promise'

type Rec = <AS extends any[], B>(f: (..._: AS) => Promisable<StateLike<Promisable<B>>>, ..._: AS) => State<Promisable<B>>;

interface State<T> {
	rec: Rec;
	thunk: () => Promisable<StateLike<T>>;
}

type StateLike<T> = T | State<T>;

let rec: Rec = (f, ...as) => ({
	rec,
	thunk: () => f(...as),
});

let isState = <T>(state: any): state is State<T> => state && state.rec === rec;

namespace trampoline__ {
	export type Cont<T> = (acc: T) => StateLike<T>;
}
let trampoline__: <AS extends any[], B>(f: (s: (..._: AS) => StateLike<Promisable<B>>, ..._: AS) => Promisable<StateLike<Promisable<B>>>) => (..._: AS) => Promise<B> = (
	<AS extends any[], B>(f: (s: (..._: AS) => StateLike<Promisable<B>>, ..._: AS) => Promisable<StateLike<Promisable<B>>>) => (...as: AS) => (
		apply(
			(x => x(x))(
				create<X<(..._: AS) => StateLike<Promisable<B>>>>(
					(x => (...as) => (
						((s = (...as: AS) => x(x)(...as)) => (
							rec(() => f(s, ...as))
						))()
					))
				)
			)
		)(_ => apply(
			_(...as)
		))(state => (
			new Promise<B>((resolve, reject) => (
				apply(
					recurse<void>()((state: StateLike<Promisable<B>>) => next => {
						if (isState<Promisable<B>>(state)) {
							Promise.resolve().then(() => state.thunk()).then(next, reject);
						} else {
							resolve(state);
						}
					})
				)(_ => _(state))
			))
		))
	)
);
export {trampoline__}