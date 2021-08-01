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

let Functor = Functor1.instantiate<URI>()(create<Functor1<URI>>({
	URI,
	fmap,
}));
export {Functor}