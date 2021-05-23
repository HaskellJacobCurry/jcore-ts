import { IBool } from './IBool';
import { Construct } from '../../ts-toolbelt';
export interface IInt {
    construct: CInt<IInt>;
    inc(): IInt;
    dec(): IInt;
    isEven(): IBool;
    isOdd(): IBool;
}
export interface CInt<TInt extends IInt = IInt> extends Construct<TInt> {
}
