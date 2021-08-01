import {Bool, HBool as _HBool, Constructor} from '../../DataStructure/Data/Bool'
import {String} from '../../DataStructure/Data/String'
import {IShow} from '../../Typeclass/Data/Show'
import {
	merge,
	create
} from '../../Common'

export * from '../../DataStructure/Data/Bool'

let show: (_: Bool) => String = (
	bool => (
		bool.cata({
			True: () => String('True'),
			False: () => String('False'),
		})
	)
);

let Show = IShow.instantiate<Bool>()(create<IShow<Bool>>({
	show,
}));
export {Show}

interface HBool extends _HBool {
	Show: typeof Show;
	show: (_: Bool) => String;
}
export {HBool}

type _Bool = Bool;
let _Bool: Constructor & HBool = (
	merge(Bool, {
		Show,
		show,
	})
);

export {_Bool as Bool}
export default _Bool