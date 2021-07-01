import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {
	Json,
	assign,
	compose,
	S,
} from '../../util/common'

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

let create_: <A>(value: A) => Dual<A> = (
	value => ({URI, value})
);
export {create_ as create}

/** Semigroup a => Semigroup (Dual a) */
let Semigroup = <A>(_: ISemigroup<A>) => (
	((SemigroupA = _) => (
		ISemigroup.instantiate<Dual<A>>({
			append: dual0 => dual1 => create_(SemigroupA.append(dual1.value)(dual0.value))
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

let Dual = Json.assign(create_, {
	URI,
	get,
	create: create_,
	Semigroup,
	Monoid,
});
export default Dual