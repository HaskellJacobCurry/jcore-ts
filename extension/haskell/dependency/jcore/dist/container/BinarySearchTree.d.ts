import { Int, Function, Compare, Bool } from '../ts-toolbelt';
export declare class BinarySearchTree<TValue extends any = any, TKey extends any = TValue> {
    protected key: TKey;
    protected values: TValue[];
    protected parent: this | null;
    protected left: this | null;
    protected right: this | null;
    protected compareKey: Compare<TKey>;
    protected getKey: Function<[TValue], TKey>;
    constructor(compareKey?: Compare<TKey>, getKey?: Function<[TValue], TKey>);
    size(): Int;
    insert_(value: TValue): this;
    insert(values: TValue[]): this;
    remove_(value: TValue): this;
    remove(values: TValue[]): this;
    findByKey(key: TKey): TValue[];
    _min(): TValue[];
    min(): TValue[];
    _max(): TValue[];
    max(): TValue[];
    inorderTraverse(cb: BinarySearchTree.InorderTraverse.Callback<TKey, TValue>): this;
    preorderTraverse(cb: BinarySearchTree.PreorderTraverse.Callback<TKey, TValue>): this;
    protected setTree(value: TValue, key?: TKey): this;
    protected isRoot(): Bool;
    protected isEmpty(): Bool;
    protected setLeft(tree: this | null): this;
    protected setRight(tree: this | null): this;
    protected makeSubtree(): this;
    protected findMinTree(): this;
    protected findMaxTree(): this;
    protected findSuccessorTree(): this | null;
    protected findPredecessorTree(): this | null;
    protected findTreeByKey(key: TKey): this | null;
    protected transplantTree(tree: this | null): void;
}
export declare namespace BinarySearchTree {
    namespace InorderTraverse {
        interface Callback<TKey extends any, TValue extends any> {
            (key: TKey, values: TValue[]): any;
        }
    }
    namespace PreorderTraverse {
        interface Callback<TKey extends any, TValue extends any> {
            (key: TKey, values: TValue[]): any;
        }
    }
}
