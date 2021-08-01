import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {
	Json,
	assign,
	compose,
	id,
	S,
	merge,
	create,
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

let append: <A>() => (endo0: Endo<A>) => (endo1: Endo<A>) => Endo<A> = (
	() => endo0 => endo1 => Endo(compose(endo0.fn, endo1.fn))
);
export {append}

let mempty: <A>() => () => Endo<A> = (
	() => () => Endo(id)
);
export {mempty}

let Semigroup = <A>() => ISemigroup.instantiate<Endo<A>>()(create<ISemigroup<Endo<A>>>({
	append: append(),
}));
export {Semigroup}

let Monoid = <A>() => (
	IMonoid.instantiate<Endo<A>>()(merge(Semigroup<A>(), create<IMonoid.Base<Endo<A>>>({
		mempty: mempty(),
	})))
);
export {Monoid}

type Constructor = typeof createEndo;
export {Constructor}

interface HEndo {
	URI: URI;
	get: <A>(_: Endo<A>) => (_: A) => A;
	create: <A>(fn: (_: A) => A) => Endo<A>;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	append: <A>() => (endo0: Endo<A>) => (endo1: Endo<A>) => Endo<A>;
	mempty: <A>() => () => Endo<A>;
}
export {HEndo}

let Endo: Constructor & HEndo = (
	Json.assign(createEndo, {
		URI,
		get,
		create: createEndo,
		Semigroup,
		Monoid,
		append,
		mempty,
	})
);
export default Endo