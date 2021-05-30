import {IBool} from './IBool'
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
		False,
		True,
		Show,
	}
);