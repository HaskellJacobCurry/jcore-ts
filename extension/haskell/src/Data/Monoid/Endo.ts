import {ISemigroup} from '../Semigroup'
import {IMonoid} from '../Monoid'
import {
	Json,
	assign,
	compose,
	id,
	S,
} from '../../util/common'

const URI = S('Endo');
type URI = typeof URI;
declare module '../../util/HKT' {
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

let create_: <A>(fn: (_: A) => A) => Endo<A> = (
	fn => ({URI, fn})
);
export {create_ as create}

let Semigroup = <A>() => ISemigroup.instantiate<Endo<A>>({
	append: endo0 => endo1 => Endo(compose(endo0.fn, endo1.fn)),
});
export {Semigroup}

let Monoid = <A>() => IMonoid.instantiate<Endo<A>>({
	...Semigroup<A>(),
	mempty: () => Endo(id),
});
export {Monoid}

let Endo = Json.assign(
	<A>(fn: (_: A) => A) => <Endo<A>>{URI, fn}, {
		URI,
		get,
		create: create_,
		Semigroup,
		Monoid,
	}
);
export default Endo