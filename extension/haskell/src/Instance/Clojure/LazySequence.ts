import {LazySequence, HLazySequence as _HLazySequence, Constructor, URI} from '../../DataStructure/Clojure/LazySequence'
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

export * from '../../DataStructure/Clojure/LazySequence'

let fmap: <A, B>(_: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B> = (
	LazySequence.map
);
export {fmap}

let ap: <A, B>(_: LazySequence<(_: A) => B>) => (_: LazySequence<A>) => LazySequence<B> = (
	<A, B>(fs: LazySequence<(_: A) => B>) => (as: LazySequence<A>) => (
		apply(
			fmap<(_: A) => B, LazySequence<B>>(f => (
				fmap<A, B>(f)(as)
			))(fs)
		)(LazySequence.concat)
	)
);
export {ap}

let pure: <A>(_: A) => LazySequence<A> = (
	LazySequence.singleton
);
export {pure}

let bind: <A>(_: LazySequence<A>) => <B>(_: (_: A) => LazySequence<B>) => LazySequence<B> = (
	as => f => LazySequence.concatMap(f)(as)
);
export {bind}

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

interface HLazySequence extends _HLazySequence {
	Functor: typeof Functor;
	Apply: typeof Apply;
	Applicative: typeof Applicative;
	Bind: typeof Bind;
	Monad: typeof Monad;
	fmap: <A, B>(_: (_: A) => B) => (_: LazySequence<A>) => LazySequence<B>;
	ap: <A, B>(_: LazySequence<(_: A) => B>) => (_: LazySequence<A>) => LazySequence<B>;
	pure: <A>(_: A) => LazySequence<A>;
	bind: <A>(_: LazySequence<A>) => <B>(_: (_: A) => LazySequence<B>) => LazySequence<B>;
}
export {HLazySequence}

type _LazySequence<A> = LazySequence<A>;
let _LazySequence: Constructor & HLazySequence = (
	merge(LazySequence, {
		Functor,
		Apply,
		Applicative,
		Bind,
		Monad,
		fmap,
		ap,
		pure,
		bind,
	})
);
export {_LazySequence as LazySequence}