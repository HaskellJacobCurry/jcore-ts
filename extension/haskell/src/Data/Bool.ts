import {IBool, CBool} from './IBool'
import {IShow} from './Show'
import {String} from './String'
import {
	Json,
	reinterpret,
} from '../../dependency/jcore/dist/ts-toolbelt'

export interface False {
	readonly tag: 'False';
}
export interface True {
	readonly tag: 'True';
}

export let False = Json.assign(
	<False>{tag: 'False'}, <IBool>{
		cata: fs => fs['False'](),
		not: () => True,
		and: other => False,
		or: other => other,
	}
) as Bool;
export let True = Json.assign(
	<True>{tag: 'True'}, <IBool>{
		cata: fs => fs['True'](),
		not: () => False,
		and: other => other,
		or: other => True,
	}
) as Bool;

export let and = (bool0: Bool) => (bool1: Bool) => CBool.and(bool0)(bool1);

export let or = (bool0: Bool) => (bool1: Bool) => CBool.or(bool0)(bool1);

export let not = (bool: Bool) => CBool.not(bool);

export let Show: IShow<Bool> = ({
	show: bool => (
		bool.cata({
			True: () => String('True'),
			False: () => String('False'),
		})
	)
});

export type Bool = IBool & (False | True);
export let Bool = Json.assign(
	(value: boolean) => value ? True : False, {
		and,
		or,
		not,
		False,
		True,
		Show,
	}
);