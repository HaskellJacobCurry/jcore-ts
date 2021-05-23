import {
	Construct,
	Constructible,
	reinterpret,
} from '../dependency/jcore/dist/ts-toolbelt'

export interface IBase extends Constructible {
	construct: Construct<IBase> & {default: IBase};
}
export default IBase

export let ctor = <A extends IBase>(A: Construct<A>) => reinterpret<A['construct']>(A);