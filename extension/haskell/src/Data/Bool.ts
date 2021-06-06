import {IBool, CBool} from './IBool'
import {IShow} from './Show'
import {String} from './String'
import {
	Json,
	reinterpret,
} from '../../dependency/jcore/dist/ts-toolbelt'

/** data Bool = True | False */
type Bool = IBool & (False | True);
export {Bool}

interface False {
	readonly tag: 'False';
}
let False = <Bool>Json.assign(
	<False>{tag: 'False'}, <IBool>{
		cata: fs => fs['False'](),
		not: () => True,
		and: other => False,
		or: other => other,
	}
);
export {False}

interface True {
	readonly tag: 'True';
}
let True = <Bool>Json.assign(
	<True>{tag: 'True'}, <IBool>{
		cata: fs => fs['True'](),
		not: () => False,
		and: other => other,
		or: other => True,
	}
);
export {True}

let and = (bool0: Bool) => (bool1: Bool) => CBool.and(bool0)(bool1);
export {and}

let or = (bool0: Bool) => (bool1: Bool) => CBool.or(bool0)(bool1);
export {or}

let not = (bool: Bool) => CBool.not(bool);
export {not}

let Show: IShow<Bool> = ({
	show: bool => (
		bool.cata({
			True: () => String('True'),
			False: () => String('False'),
		})
	)
});
export {Show}

let Bool = Json.assign(
	(value: boolean) => value ? True : False, {
		and,
		or,
		not,
		False,
		True,
		Show,
	}
);