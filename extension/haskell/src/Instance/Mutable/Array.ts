import {Array, HArray as _HArray, Constructor, URI} from '../../DataStructure/Mutable/Array'
import {Functor1} from '../../Typeclass/Data/Functor'
import {Apply1} from '../../Typeclass/Control/Apply'
import {Applicative1} from '../../Typeclass/Control/Applicative'
import {Bind1} from '../../Typeclass/Control/Bind'
import {Monad1} from '../../Typeclass/Control/Monad'
import {Populatable1} from '../../Typeclass/Data/Populatable'
import {
	merge,
	_,
	apply,
	create,
} from '../../Common'

export * from '../../DataStructure/Mutable/Array'

let fmap: <A, B>(_: (_: A) => B) => (_: Array<A>) => Array<B> = (
	f => Array.map(() => f)
);
export {fmap}

let ap: <A, B>(_: Array<(_: A) => B>) => (_: Array<A>) => Array<B> = (
	<A, B>(fs: Array<(_: A) => B>) => (as: Array<A>) => (
		apply(
			fmap<(_: A) => B, Array<B>>(f => (
				fmap<A, B>(f)(as)
			))(fs)
		)(Array.concat)
	)
);
export {ap}

let pure: <A>(_: A) => Array<A> = (
	Array.singleton
);
export {pure}

let bind: <A>(_: Array<A>) => <B>(_: (_: A) => Array<B>) => Array<B> = (
	as => f => Array.concatMap(f)(as)
);
export {bind}

let seed: <A>() => Array<A> = (
	Array.empty
);
export {seed}

let populate: <A>(..._s: A[]) => (_: Array<A>) => Array<A> = (
	<A>(...as: A[]) => (arrayA: Array<A>) => (
		Array.concatMT(Array(as))(arrayA)
	)
);
export {populate}

let Functor = Functor1.instantiate<URI>()(
	create<Functor1<URI>>({
		URI,
		fmap,
	})
);
export {Functor}

let Apply = Apply1.instantiate<URI>()(
	merge(Functor, create<Apply1.Base<URI>>({
		ap,
		liftA2: _(),
	}))
);
export {Apply}

let Applicative = Applicative1.instantiate<URI>()(
	merge(Apply, create<Applicative1.Base<URI>>({
		pure,
	}))
);
export {Applicative}

let Bind = Bind1.instantiate<URI>()(
	merge(Apply, create<Bind1.Base<URI>>({
		bind,
	}))
);
export {Bind}

let Monad = Monad1.instantiate<URI>()(
	merge(Applicative, Bind)
);
export {Monad}

let Populatable = Populatable1.instantiate<URI>()(
	create<Populatable1<URI>>({
		URI,
		seed,
		populate,
	})
);
export {Populatable}

interface HArray extends _HArray {
	Functor: typeof Functor;
	Apply: typeof Apply;
	Applicative: typeof Applicative;
	Bind: typeof Bind;
	Monad: typeof Monad;
	Populatable: typeof Populatable;
	fmap: <A, B>(_: (_: A) => B) => (_: Array<A>) => Array<B>;
	ap: <A, B>(_: Array<(_: A) => B>) => (_: Array<A>) => Array<B>;
	pure: <A>(_: A) => Array<A>;
	bind: <A>(_: Array<A>) => <B>(_: (_: A) => Array<B>) => Array<B>;
	seed: <A>() => Array<A>;
	populate: <A>(..._s: A[]) => (_: Array<A>) => Array<A>;
}
export {HArray}

type _Array<A> = Array<A>;
let _Array: Constructor & HArray = (
	merge(Array, {
		Functor,
		Apply,
		Applicative,
		Bind,
		Monad,
		Populatable,
		fmap,
		ap,
		pure,
		bind,
		seed,
		populate,
	})
);
export {_Array as Array}