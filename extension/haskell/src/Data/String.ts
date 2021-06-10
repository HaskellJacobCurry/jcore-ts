import {IString} from './IString'
import {IShow} from './Show'
import {
	Json,
	cast,
} from '../util/common'

interface String extends IString {}
export {String}

let from: (_: IString) => String = (
	string => cast(string)()
);
export {from}

let Show: IShow<String> = ({
	show: string => `"${string.toString()}"`,
});
export {Show}

let String = Json.assign(
	(value: string): String => ({
		toString: () => value,
	}), {
		from,
		Show
	}
);
export default String