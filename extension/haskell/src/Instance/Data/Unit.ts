import {Unit, HUnit as _HUnit, Constructor} from '../../DataStructure/Data/Unit'
import {String} from '../../DataStructure/Data/String'
import {IShow} from '../../Typeclass/Data/Show'
import {
	merge,
	create,
} from '../../Common'

export * from '../../DataStructure/Data/Unit'

let Show = IShow.instantiate<Unit>()(create<IShow<Unit>>({
	show: _ => String('Unit'),
}));
export {Show}

interface HUnit extends _HUnit {
	Show: typeof Show;
}
export {HUnit}

type _Unit = Unit;
let _Unit: Constructor & HUnit = (
	merge(Unit, {
		Show,
	})
);

export {_Unit as Unit}
export default _Unit