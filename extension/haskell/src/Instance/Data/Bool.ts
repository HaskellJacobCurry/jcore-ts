import {Bool, HBool as _HBool, Constructor} from '../../DataStructure/Data/Bool'
import {String} from '../../DataStructure/Data/String'
import {IShow} from '../../Typeclass/Data/Show'
import {Json} from '../../Common'

export * from '../../DataStructure/Data/Bool'

let Show = IShow.instantiate<Bool>({
	show: bool => (
		bool.cata({
			True: () => String('True'),
			False: () => String('False'),
		})
	)
});
export {Show}

interface HBool extends _HBool {
	Show: typeof Show;
}
export {HBool}

type _Bool = Bool;
let _Bool: Constructor & HBool = (
	Json.assign(Bool, {
		Show,
	})
);

export {_Bool as Bool}
export default _Bool