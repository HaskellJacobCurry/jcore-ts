import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {INum} from '../../GHC/Num'
import {
	Json,
	S,
} from '../../util/common'

const URI = S('Sum');
type URI = typeof URI;
export {URI}

interface Sum<A> {
	URI: URI;
	value: A;
}
export {Sum}

let get: <A>(_: Sum<A>) => A = _ => _.value;
export {get}

let create_: <A>(value: A) => Sum<A> = (
	value => ({URI, value})
);
export {create_ as create}

/** Num a => Semigroup (Sum a) */
let Semigroup = <A>(_: INum<A>) => (
	((NumA = _) => (
		ISemigroup.instantiate<Sum<A>>({
			append: sum0 => sum1 => Sum(NumA.add(sum0.value)(sum1.value)),
		})
	))()
);
export {Semigroup}

/** Num a => Monoid (Sum a) */
let Monoid = <A>(_: INum<A>) => (
	((NumA = _) => (
		IMonoid.instantiate<Sum<A>>({
			...Semigroup(NumA),
			mempty: () => Sum(NumA.zero()),
		})
	))()
);
export {Monoid}

let Sum = Json.assign(
	<A>(value: A) => <Sum<A>>{URI, value}, {
		URI,
		get,
		create: create_,
		Semigroup,
		Monoid,
	}
);
export default Sum