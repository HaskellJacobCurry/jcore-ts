import {Function, HFunction as _HFunction, Constructor, URI} from '../../DataStructure/Data/Function'
import {Semigroupoid2} from '../../Typeclass/Control/Semigroupoid'
import {Category2} from '../../Typeclass/Control/Category'
import {Json} from '../../Common'

export * from '../../DataStructure/Data/Function'

/** compose :: Semigroupoid Function => Function b c -> Function a b -> Function a c */
let compose: <B, C>(_: Function<B, C>) => <A>(_: Function<A, B>) => Function<A, C> = (
	f0 => f1 => a => f0(f1(a))
);
export {compose}

/** identity :: Category Function => Function a a */
let identity: <A>() => Function<A, A> = (
	() => a => a
);
export {identity}

let Semigroupoid: Semigroupoid2<URI> = {
	URI,
	compose,
};
export {Semigroupoid}

let Category: Category2<URI> = {
	...Semigroupoid,
	identity: () => a => a,
};
export {Category}

interface HFunction extends _HFunction {
	Semigroupoid: typeof Semigroupoid;
	Category: typeof Category;
	compose: <B, C>(_: Function<B, C>) => <A>(_: Function<A, B>) => Function<A, C>;
	identity: <A>() => Function<A, A>;
}
export {HFunction}

type _Function<A, B> = Function<A, B>;
let _Function: Constructor & HFunction = (
	Json.assign(Function, {
		Semigroupoid,
		Category,
		compose,
		identity,
	})
);

export {_Function as Function}
export default _Function