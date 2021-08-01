import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {
	Json,
	S,
	merge,
	create,
} from '../../../Common/common'

const URI = S('Dual');
type URI = typeof URI;
export {URI}

interface Dual<A> {
	URI: URI;
	value: A;
}
export {Dual}

let get: <A>(_: Dual<A>) => A = _ => _.value;
export {get}

let createDual: <A>(value: A) => Dual<A> = (
	value => ({URI, value})
);
export {createDual as create}

let append: <A>(_: ISemigroup<A>) => (dual0: Dual<A>) => (dual1: Dual<A>) => Dual<A> = (
	SemigroupA => dual0 => dual1 => createDual(SemigroupA.append(dual1.value)(dual0.value))
);
export {append}

let mempty: <A>(_: IMonoid<A>) => () => Dual<A> = (
	Monoid => () => Dual(Monoid.mempty())
);
export {mempty}

/** Semigroup a => Semigroup (Dual a) */
let Semigroup = <A>(_: ISemigroup<A>) => (
	ISemigroup.instantiate<Dual<A>>()(create<ISemigroup<Dual<A>>>({
		append: append(_)
	}))
);
export {Semigroup}

let Monoid = <A>(_: IMonoid<A>) => (
	IMonoid.instantiate<Dual<A>>()(merge(Semigroup(_), create<IMonoid.Base<Dual<A>>>({
		mempty: mempty(_),
	})))
);
export {Monoid}

type Constructor = typeof createDual;
export {Constructor}

interface HDual {
	URI: URI;
	get: <A>(_: Dual<A>) => A;
	create: <A>(value: A) => Dual<A>;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	append: <A>(_: ISemigroup<A>) => (dual0: Dual<A>) => (dual1: Dual<A>) => Dual<A>;
	mempty: <A>(_: IMonoid<A>) => () => Dual<A>
}
export {HDual}

let Dual: Constructor & HDual = (
	Json.assign(createDual, {
		URI,
		get,
		create: createDual,
		Semigroup,
		Monoid,
		append,
		mempty,
	})
);
export default Dual