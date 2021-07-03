import {
	Json,
	create,
} from '../util'

type Reduced<A> = IReduced<A> & (Break<A> | Continue<A>);
export {Reduced}

interface IReduced<A> {
	cata: <T, U>(
		fs: {
			Break: (value: A) => T;
			Continue: (value: A) => U;
		}
	) => T | U;
}

interface Break<A> {
	tag: 'Break';
	value: A;
}
let Break: <A>(value: A) => Reduced<A> = (
	<A>(value: A) => create<Reduced<A>>(
		Json.assign(
			create<Break<A>>({tag: 'Break', value}),
			create<IReduced<A>>({
				cata: fs => fs['Break'](value),
			})
		)
	)
);
export {Break}

interface Continue<A> {
	tag: 'Continue';
	value: A;
}
let Continue: <A>(value: A) => Reduced<A> = (
	<A>(value: A) => create<Reduced<A>>(
		Json.assign(
			create<Continue<A>>({tag: 'Continue', value}),
			create<IReduced<A>>({
				cata: fs => fs['Continue'](value),
			})
		)
	)
);
export {Continue}

let Reduced = Json.assign(Break, {
	Break,
	Continue,
	extract: create<<A>(_: Reduced<A>) => A>(
		reduced => reduced.value
	),
});