import {IBool} from '../../Typeclass/Data/IBool'
import {IShow} from '../../Typeclass/Data/Show'
import {String} from './String'
import {
	Json,
	reinterpret,
	create,
} from '../../Common/common'

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

let createBool: (value: boolean) => Bool = (
	value => value ? True : False
);
export {createBool as create}

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

type Constructor = typeof createBool;
export {Constructor}

interface HBool {
	fromI: (_: IBool) => Bool;
	False: Bool;
	True: Bool;
	and: (_: Bool) => (_: Bool) => Bool;
	or: (_: Bool) => (_: Bool) => Bool;
	not: (_: Bool) => Bool;
}
export {HBool}

let Bool: Constructor & HBool = (
	Json.assign(createBool, {
		fromI,
		False,
		True,
		and,
		or,
		not,
	})
);
export default Bool