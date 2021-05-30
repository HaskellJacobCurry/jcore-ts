export interface Compare<T extends any = any> {
    (value0: T, value1: T): Compare.Result;
}
export declare namespace Compare {
    type Result = -1 | 0 | 1;
}
export default Compare;
