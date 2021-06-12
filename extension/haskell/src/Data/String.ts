import {IString} from './IString'
import {IShow} from './Show'
import {
	Json,
	cast,
} from '../util/common'

interface String extends IString {}
export {String}

let fromI: (_: IString) => String = (
	string => cast(string)()
);
export {fromI}

let Show: IShow<String> = ({
	show: string => `"${string.toString()}"`,
});
export {Show}

let String = Json.assign(
	(value: string): String => ({
		toString: () => value,
	}), {
		fromI,
		Show
	}
);
export default String