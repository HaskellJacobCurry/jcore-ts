import { Int } from '../ts-toolbelt';
export declare class Queue<T extends any = any> {
    private array;
    private iFront;
    private iEnd;
    constructor();
    enqueue_(value: T): Queue<T>;
    enqueue(...values: T[]): Queue<T>;
    size(): Int;
    _dequeue(): T;
    dequeue(): T;
    _front(): T;
    front(): T;
    _back(): T;
    back(): T;
    private conditionalResize;
}
export default Queue;
