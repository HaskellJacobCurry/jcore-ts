import {
	Json,
	assign,
} from '../../Common/common'

/**
 * class Num a where
 *  add :: a -> a -> a
 *   alias :: (+)
 *  sub :: a -> a -> a
 *   alias :: (-)
 *  mul :: a -> a -> a
 *   alias :: (*)
 *  zero :: Unit -> a
 *  one :: Unit -> a
 *  abs :: a -> a 
 *  signum :: a -> a 
 * negate :: a -> a 
 */
interface INum<A> {
	add: (_: A) => (_: A) => A;
	sub: (_: A) => (_: A) => A;
	mul: (_: A) => (_: A) => A;
	zero: () => A;
	one: () => A;
	abs: (_: A) => A;
}
interface IExtNum<A> {
	negate: (_: A) => A;
}
interface Num<A> extends INum<A> {}
export {Num}
export {Num as INum}
namespace Num {
	export interface Ext<A> extends IExtNum<A> {}
	export let Ext: <A>(_: Num<A>) => Ext<A> = (
		Num => ({
			negate: a => Num.sub(Num.zero())(a),
		})
	);

	export let instantiate: <A>(_: Num<A>) => Num<A> & Ext<A> = (
		<A>(_: Num<A>) => (
			assign(_)((_: Num<A>) => Json.assign(_, Ext(_)))
		)
	);
}
export default Num