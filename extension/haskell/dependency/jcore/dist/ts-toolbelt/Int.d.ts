import { Compare } from './Compare';
import { StrictWeakOrdering } from './StrictWeakOrdering';
export declare type Int = number;
export declare namespace Int {
    let min: (a: Int, b: Int) => number;
    let max: (a: Int, b: Int) => number;
    let compare: Compare<Int>;
    let strictWeakOrdering: StrictWeakOrdering<number>;
    let random: (min: Int, max: Int) => number;
}
export default Int;
