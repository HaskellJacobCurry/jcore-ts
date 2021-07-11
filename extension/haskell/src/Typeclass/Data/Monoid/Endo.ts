import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {
	Json,
	assign,
	compose,
	id,
	S,
} from '../../../Common/common'

const URI = S('Endo');
type URI = typeof URI;
declare module '../../../Common/HKT' {
	interface KindsByURI1<A> {
		[URI]: Endo<A>;
	}
}
export {URI}

interface Endo<A> {
	URI: URI;
	fn: (_: A) => A;
}
export {Endo}

let get: <A>(_: Endo<A>) => (_: A) => A = _ => _.fn;
export {get}

let createEndo: <A>(fn: (_: A) => A) => Endo<A> = (
	fn => ({URI, fn})
);
export {createEndo as create}

let Semigroup = <A>() => ISemigroup.instantiate<Endo<A>>({
	append: endo0 => endo1 => Endo(compose(endo0.fn, endo1.fn)),
});
export {Semigroup}

let Monoid = <A>() => IMonoid.instantiate<Endo<A>>({
	...Semigroup<A>(),
	mempty: () => Endo(id),
});
export {Monoid}

type Constructor = typeof createEndo;
export {Constructor}

interface HEndo {
	URI: URI;
	get: <A>(_: Endo<A>) => (_: A) => A;
	create: <A>(fn: (_: A) => A) => Endo<A>;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
}
export {HEndo}

let Endo: Constructor & HEndo = (
	Json.assign(createEndo, {
		URI,
		get,
		create: createEndo,
		Semigroup,
		Monoid,
	})
);
export default Endo