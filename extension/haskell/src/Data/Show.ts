import {IString} from './IString'

export interface Show<A> {
	readonly show: (a: A) => IString;
}
export type IShow<A> = Show<A>;
export default Show