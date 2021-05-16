import { Bool } from './Bool';
import { Compare } from './Compare';
export interface StrictWeakOrdering<T extends any = any> {
    (a: T, b: T): Bool;
}
export declare namespace StrictWeakOrdering {
    let fromCompare: <T extends unknown>(cmp: Compare<T>) => StrictWeakOrdering<T>;
}
export default StrictWeakOrdering;
