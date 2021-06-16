import {IShow} from '../Show'
import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {String} from '../String'
import {
	Json,
	assign,
	compose,
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

/** Show a => Show (Sum a) */
let Show: <A>(_: IShow<A>) => IShow<Sum<A>> = (
	ShowA => ({
		show: sumA => (
			assign(
				String('Sum(')
			)(_ => assign(
				String.Semigroup.append(_)(String.fromI(ShowA.show(sumA.value)))
			))(_ => String.Semigroup.append(_)(String(')')))
		),
	})
);
export {Show}

/** Semigroup a => Semigroup (Sum a) */
let Semigroup: <A>(_: ISemigroup<A>) => ISemigroup<Sum<A>> = (
	SemigroupA => ({
		append: dual0 => dual1 => Dual(SemigroupA.append(dual1.value)(dual0.value))
	})
);
export {Semigroup}

let Monoid: <A>(_: IMonoid<A>) => IMonoid<Sum<A>> & IMonoid.Ext<Sum<A>> = (
	<A>(MonoidA: IMonoid<A>) => (
		assign(<IMonoid<Sum<A>>>{
			...Semigroup(MonoidA),
			mempty: () => Dual(MonoidA.mempty()),
		})(_ => Json.assign(_, IMonoid.Ext(_)))
	)
);
export {Monoid}

let Dual = Json.assign(
	<A>(value: A) => <Sum<A>>{URI, value}, {
		URI,
		get,
		Show,
		Semigroup,
		Monoid,
	}
);
export default Sum