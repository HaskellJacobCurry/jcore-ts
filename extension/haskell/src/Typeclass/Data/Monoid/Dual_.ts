import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {
	Json,
	S,
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

/** Semigroup a => Semigroup (Dual a) */
let Semigroup = <A>(_: ISemigroup<A>) => (
	((SemigroupA = _) => (
		ISemigroup.instantiate<Dual<A>>({
			append: dual0 => dual1 => createDual(SemigroupA.append(dual1.value)(dual0.value))
		})
	))()
);
export {Semigroup}

let Monoid = <A>(_: IMonoid<A>) => (
	((MonoidA = _) => (
		IMonoid.instantiate<Dual<A>>({
			...Semigroup(MonoidA),
			mempty: () => Dual(MonoidA.mempty()),
		})
	))()
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
}
export {HDual}

let Dual: Constructor & HDual = (
	Json.assign(createDual, {
		URI,
		get,
		create: createDual,
		Semigroup,
		Monoid,
	})
);
export default Dual