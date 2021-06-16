import {
	cast,
	Json
} from '../util/common'

interface IInt {
	value: number;
}
export {IInt}

let add: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt = (
	int0 => int1 => cast({value: int0.value + int1.value})()
);
export {add}

let subtract: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt = (
	int0 => int1 => cast({value: int0.value - int1.value})()
);
export {subtract}

let multiply: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt = (
	int0 => int1 => cast({value: int0.value * int1.value})()
);
export {multiply}

let negate: <TInt extends IInt>(_: TInt) => TInt = (
	int => cast({value: -int.value})()
);
export {negate}

let IInt = Json.assign(
	(value: number) => <IInt>{value}, {
		add,
		subtract,
		multiply,
		negate,
	}
);
export default IInt