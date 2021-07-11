import {
	Json,
	create,
	S,
} from '../../Common'

type Reduced<A> = IReduced<A> & (Break<A> | Continue<A>);
export {Reduced}

const URI = S('Reduced');
type URI = typeof URI;
declare module '../../Common/HKT' {
	interface KindsByURI1<A> {
		[URI]: Reduced<A>;
	}
}
export {URI}

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

let extract: <A>(_: Reduced<A>) => A = (
	reduced => reduced.value
);
export {extract}

type Constructor = typeof Break;
export {Constructor}

interface HReduced {
	URI: URI;
	Break: <A>(value: A) => Reduced<A>;
	Continue: <A>(value: A) => Reduced<A>;
	extract: <A>(_: Reduced<A>) => A;
}

let Reduced: Constructor & HReduced = (
	Json.assign(Break, {
		URI,
		Break,
		Continue,
		extract,
	})
);
export default Reduced