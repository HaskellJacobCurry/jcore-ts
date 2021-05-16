import { IShowable } from './IShowable';
import { String } from './String';
declare class Int implements IShowable {
    _: number;
    show: () => String;
}
declare type Int_ = Int;
declare let Int_: typeof Int & {
    Lift: (_: number) => Int;
};
export { Int_ as Int };
export default Int_;
