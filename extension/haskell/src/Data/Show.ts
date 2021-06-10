import {IString} from './IString'

/**
 * class Show f where
 *  show :: f -> String
 */

interface Show<A> {
	show: (a: A) => IString;
}
export {Show}
export {Show as IShow};
export default Show