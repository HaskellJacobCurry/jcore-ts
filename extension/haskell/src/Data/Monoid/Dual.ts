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

/** Show a => Show (Dual a) */
let Show: <A>(_: IShow<A>) => IShow<Dual<A>> = (
	ShowA => ({
		show: dualA => (
			assign(
				String('Dual(')
			)(_ => assign(
				String.Semigroup.append(_)(String.fromI(ShowA.show(dualA.value)))
			))(_ => String.Semigroup.append(_)(String(')')))
		),
	})
);
export {Show}

/** Semigroup a => Semigroup (Dual a) */
let Semigroup: <A>(_: ISemigroup<A>) => ISemigroup<Dual<A>> = (
	SemigroupA => ({
		append: dual0 => dual1 => Dual(SemigroupA.append(dual1.value)(dual0.value))
	})
);
export {Semigroup}

let Monoid: <A>(_: IMonoid<A>) => IMonoid<Dual<A>> & IMonoid.Ext<Dual<A>> = (
	<A>(MonoidA: IMonoid<A>) => (
		assign(<IMonoid<Dual<A>>>{
			...Semigroup(MonoidA),
			mempty: () => Dual(MonoidA.mempty()),
		})(_ => Json.assign(_, IMonoid.Ext(_)))
	)
);
export {Monoid}

let Dual = Json.assign(
	<A>(value: A) => <Dual<A>>{URI, value}, {
		URI,
		get,
		Show,
		Semigroup,
		Monoid,
	}
);
export default Dual