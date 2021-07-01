import {IBool} from './IBool'
import {IShow} from './Show'
import {String} from './String'
import {
	Json,
	reinterpret,
	create,
} from '../util/common'

/** data Bool = True | False */
type Bool = IBool & (False | True);
export {Bool}

interface False {
	tag: 'False';
}
let False: Bool = create<Bool>(
	Json.assign(
		create<False>({tag: 'False'}),
		create<IBool>({
			cata: fs => fs['False'](),
			not: () => True,
			and: _ => False,
			or: _ => _,
		})
	)
);
export {False}

interface True {
	tag: 'True';
}
let True: Bool = create<Bool>(
	Json.assign(
		create<True>({tag: 'True'}),
		create<IBool>({
			cata: fs => fs['True'](),
			not: () => False,
			and: _ => _,
			or: _ => True,
		})
	)
);
export {True}

let fromI: (_: IBool) => Bool = (
	bool => (
		bool.cata({
			True: () => True,
			False: () => False,
		})
	)
);
export {fromI}

let create_: (value: boolean) => Bool = (
	value => value ? True : False
);
export {create_ as create}

let and: (_: Bool) => (_: Bool) => Bool = (
	bool0 => bool1 => IBool.and(bool0)(bool1)
);
export {and}

let or: (_: Bool) => (_: Bool) => Bool = (
	bool0 => bool1 => IBool.or(bool0)(bool1)
);
export {or}

let not: (_: Bool) => Bool = (
	bool => IBool.not(bool)
);
export {not}

let Show = IShow.instantiate<Bool>({
	show: bool => (
		bool.cata({
			True: () => String('True'),
			False: () => String('False'),
		})
	)
});
export {Show}

let Bool = Json.assign(create_, {
	fromI,
	and,
	or,
	not,
	False,
	True,
	Show,
});
export default Bool