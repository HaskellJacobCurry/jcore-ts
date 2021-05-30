import {IOrdering} from './IOrdering'
import {Eq as IEq} from './Eq'
import {IShow} from './Show'
import {String} from './String'
import {
	Json,
	reinterpret,
} from '../../dependency/jcore/dist/ts-toolbelt'

export let Show: IShow<Int> = ({
	show: int => String(`${int.value}`),
});

export interface Int {
	value: number;
}
export let Int = Json.assign(
	(value: number) => <Int>({value}), {
		Show,
	}
);