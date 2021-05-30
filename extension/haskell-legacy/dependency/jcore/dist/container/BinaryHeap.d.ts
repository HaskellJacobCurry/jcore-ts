import { Compare, Int } from '../ts-toolbelt';
export declare class BinaryHeap<T = any> {
    protected compare: Compare<T>;
    protected array: T[];
    constructor(compare?: Compare<T>);
    protected heapify(i: Int): void;
    buildHeap(): void;
    push_(value: T): this;
    push(values: T[]): this;
    protected static left(i: Int): number;
    protected static right(i: Int): number;
    protected static parent(i: Int): number;
}
