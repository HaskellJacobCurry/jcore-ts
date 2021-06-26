export * from '../../dependency/jcore/dist/ts-toolbelt'
export * from '../../dependency/jcore/dist/ts-toolbelt/common'
export * from '../../dependency/jcore/dist/common/compose'
export * from '../../dependency/jcore/dist/common/pipe'
import {Function} from '../../dependency/jcore/dist/ts-toolbelt'

let id: <A>(_: A) => A = a => a;
export {id}

let id_: <A>() => (_: A) => A = () => a => a;
export {id_}

let const_: <A>(_: A) => <B>(_: B) => A = (
	a => _ => a
);
export {const_ as const}
export {const_}

let flip: <A, B, C>(_: (_: A) => (_: B) => C) => (_: B) => (_: A) => C = (
	f => b => a => f(a)(b)
);
export {flip}

let assign: <T>(_: T) => <U>(f: (_: T) => U) => U = (
	_ => f => f(_)
);
export {assign}

let define = Function.define;
export {define}

let apply = assign;
export {apply}

let create: <T>(_: T) => T = _ => _;
export {create}

/** recurse :: ((...a[i]) -> ((...a[i]) -> b) -> b) -> (...a[i]) -> b */
let recurse: <B>() => <AS extends any[]>(f: (..._: AS) => (s: (..._: AS) => B) => B) => (..._: AS) => B = (
	<B>() => <AS extends any[]>(f: (..._: AS) => (s: (..._: AS) => B) => B) => (...as: AS) => (
		apply(
			(x => x(x))(
				create<X<(..._: AS) => B>>(x => (...as) => (
					((s = (..._: AS) => x(x)(..._)) => (
						f(...as)(s)
					))()
				))
			)
		)(_ => _(...as))
	)
);
export {recurse}

interface X<A> {
	(x: X<A>): A;
}
export {X}