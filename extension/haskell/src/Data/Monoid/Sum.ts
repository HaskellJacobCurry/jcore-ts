import {IShow} from '../Show'
import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {INum} from '../../GHC/Num'
import {String} from '../String'
import {
	Json,
	assign,
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

/** Num a => Semigroup (Sum a) */
let Semigroup: <A>(_: INum<A>) => ISemigroup<Sum<A>> = (
	NumA => ({
		append: sum0 => sum1 => Sum(NumA.add(sum0.value)(sum1.value)),
	})
);
export {Semigroup}

/** Num a => Monoid (Sum a) */
let Monoid: <A>(_: INum<A>) => IMonoid<Sum<A>> & IMonoid.Ext<Sum<A>> = (
	<A>(NumA: INum<A>) => (
		assign(<IMonoid<Sum<A>>>{
			...Semigroup(NumA),
			mempty: () => Sum(NumA.zero()),
		})(_ => Json.assign(_, IMonoid.Ext(_)))
	)
);
export {Monoid}

let Sum = Json.assign(
	<A>(value: A) => <Sum<A>>{URI, value}, {
		URI,
		get,
		Show,
		Semigroup,
		Monoid,
	}
);
export default Sum