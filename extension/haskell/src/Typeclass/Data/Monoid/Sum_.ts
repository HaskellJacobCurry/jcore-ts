import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {INum} from '../../GHC/Num'
import {
	Json,
	S,
	merge,
	create,
} from '../../../Common'

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

let createSum: <A>(value: A) => Sum<A> = (
	value => ({URI, value})
);
export {createSum as create}

let append: <A>(_: INum<A>) => (sum0: Sum<A>) => (sum1: Sum<A>) => Sum<A> = (
	NumA => sum0 => sum1 => Sum(NumA.add(sum0.value)(sum1.value))
);
export {append}

let mempty: <A>(_: INum<A>) => () => Sum<A> = (
	NumA => () => Sum(NumA.zero())
);
export {mempty}

/** Num a => Semigroup (Sum a) */
let Semigroup = <A>(_: INum<A>) => (
	ISemigroup.instantiate<Sum<A>>()(create<ISemigroup<Sum<A>>>({
		append: append(_),
	}))
);
export {Semigroup}

/** Num a => Monoid (Sum a) */
let Monoid = <A>(_: INum<A>) => (
	IMonoid.instantiate<Sum<A>>()(merge(Semigroup(_), create<IMonoid.Base<Sum<A>>>({
		mempty: mempty(_),
	})))
);
export {Monoid}

type Constructor = typeof createSum;
export {Constructor}

interface HSum {
	URI: URI;
	get: <A>(_: Sum<A>) => A;
	create: <A>(value: A) => Sum<A>;
	Semigroup: typeof Semigroup;
	Monoid: typeof Monoid;
	append: <A>(_: INum<A>) => (sum0: Sum<A>) => (sum1: Sum<A>) => Sum<A>;
	mempty: <A>(_: INum<A>) => () => Sum<A>;
}
export {HSum}

let Sum: Constructor & HSum = (
	Json.assign(createSum, {
		URI,
		get,
		create: createSum,
		Semigroup,
		Monoid,
		append,
		mempty,
	})
);
export default Sum