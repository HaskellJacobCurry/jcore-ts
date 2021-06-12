export * from '../../dependency/jcore/dist/ts-toolbelt'
export * from '../../dependency/jcore/dist/ts-toolbelt/common'
export * from '../../dependency/jcore/dist/common/compose'

let id: <A>(_: A) => A = a => a;
export {id}

let id_: <A>() => (_: A) => A = () => a => a;
export {id_}

let const_: <A>(_: A) => <B>(_: B) => A = (
	a => _ => a
);
export {const_}

let flip: <A, B, C>(_: (_: A) => (_: B) => C) => (_: B) => (_: A) => C = (
	f => b => a => f(a)(b)
);
export {flip}