import { INum } from '../GHC/Num';
import { IEq } from './Eq';
interface IInt {
    value: number;
}
export { IInt };
declare let add: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt;
export { add };
declare let sub: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt;
export { sub };
declare let mul: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt;
export { mul };
declare let negate: <TInt extends IInt>(_: TInt) => TInt;
export { negate };
declare let Num: INum<IInt> & INum.Ext<IInt>;
export { Num };
declare let Eq: IEq<IInt> & IEq.Ext<IInt>;
export { Eq };
declare let IInt: ((value: number) => IInt) & {
    add: <TInt extends IInt>(_: TInt) => (_: TInt) => TInt;
    sub: <TInt_1 extends IInt>(_: TInt_1) => (_: TInt_1) => TInt_1;
    mul: <TInt_2 extends IInt>(_: TInt_2) => (_: TInt_2) => TInt_2;
    negate: <TInt_3 extends IInt>(_: TInt_3) => TInt_3;
    Num: INum<IInt> & INum.Ext<IInt>;
    Eq: IEq<IInt> & IEq.Ext<IInt>;
};
export default IInt;
