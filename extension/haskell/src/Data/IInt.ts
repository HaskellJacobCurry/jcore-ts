import {INum} from '../GHC/Num'
import {IEq} from './Eq'
import {IBool} from './IBool'
import {
	cast,
	Json,
	assign,
} from '../util/common'

interface IInt {
	value: number;
}
export {IInt}

let add: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt = (
	int0 => int1 => cast({value: int0.value + int1.value})()
);
export {add}

let sub: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt = (
	int0 => int1 => cast({value: int0.value - int1.value})()
);
export {sub}

let mul: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt = (
	int0 => int1 => cast({value: int0.value * int1.value})()
);
export {mul}

let negate: <TInt extends IInt>(_: TInt) => TInt = (
	int => cast({value: -int.value})()
);
export {negate}

let Num: INum<IInt> & INum.Ext<IInt> = (
	assign(<INum<IInt>>{
		add,
		sub,
		mul,
		zero: () => ({value: 0}),
		one: () => ({value: 1}),
		abs: int => ({value: Math.abs(int.value)})
	})(_ => Json.assign(_, INum.Ext(_)))
);
export {Num}

let Eq: IEq<IInt> & IEq.Ext<IInt> = (
	assign(<IEq<IInt>>({
		eq: int0 => int1 => IBool(int0.value == int1.value),
	}))(Eq => Json.assign(Eq, IEq.Ext(Eq)))
);
export {Eq}

let IInt = Json.assign(
	(value: number) => <IInt>{value}, {
		add,
		sub,
		mul,
		negate,
		Num,
		Eq,
	}
);
export default IInt