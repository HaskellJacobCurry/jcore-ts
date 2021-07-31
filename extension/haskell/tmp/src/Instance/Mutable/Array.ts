import {Array, HArray as _HArray, Constructor, URI} from '../../DataStructure/Mutable/Array'
import {Functor1} from '../../../../dist/Typeclass/Data/Functor'
import {
	merge
} from '../../Common'

export * from '../../DataStructure/Mutable/Array'

let Functor = Functor1.instantiate<URI>({
	
});

interface HArray extends _HArray {}
export {HArray}

type _Array<A> = Array<A>;
let _Array: Constructor & HArray = (
	merge(Array, {

	})
);
export {_Array as Array}