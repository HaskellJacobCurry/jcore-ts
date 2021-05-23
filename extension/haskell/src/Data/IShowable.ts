import {IString} from './IString'
import {
	Construct
} from '../../dependency/jcore/dist/ts-toolbelt'

interface Showable {
	show: (_: IShowable) => IString;
}
namespace Showable {
	export let show: Showable['show'] = showable => showable.show();
}
export {Showable}

export interface IShowable {
	construct: CShowable<IShowable>;
	show(): IString;
}
export interface CShowable<TShowable extends IShowable = IShowable> extends Construct<TShowable> {}

