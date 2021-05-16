import { Int } from '../ts-toolbelt/Int';
export declare class Stack<T extends any = any> {
    private array;
    constructor();
    push(values: T[]): Stack<T>;
    push_(value: T): Stack<T>;
    pop(): T;
    size(): Int;
}
export default Stack;
