import {IString} from './IString'
import {IShow} from './Show'
import {
	Json
} from '../../dependency/jcore/dist/ts-toolbelt'

export let Show: IShow<String> = ({
	show: string => `"${string.toString()}"`,
});

export interface String extends IString {}
export let String = Json.assign(
	(value: string): String => ({
		toString: () => value,
	}), {
		Show
	}
);
export default String