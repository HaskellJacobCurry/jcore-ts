import { Int, Function, Compare, Bool } from '../ts-toolbelt';
export declare class BinarySearchTreeAVL<TValue extends any = any, TKey extends any = TValue> {
    protected key: TKey;
    protected values: TValue[];
    protected parent: this;
    protected left: this | null;
    protected right: this | null;
    protected getKey: Function<[TValue], TKey>;
    protected compareKey: Compare<TKey>;
    constructor(getKey?: Function<[TValue], TKey>, compareKey?: Compare<TKey>, isRoot?: boolean);
    size(): Int;
    insert_(value: TValue): this;
    insert(values: TValue[]): this;
    removeOne_(value: TValue): this;
    removeOne(values: TValue[]): this;
    remove_(value: TValue): this;
    remove(values: TValue[]): this;
    findByKey(key: TKey): TValue[];
    _min(): TValue[];
    min(): TValue[];
    _max(): TValue[];
    max(): TValue[];
    removeMin(): this;
    removeMax(): this;
    inorderTraverse(cb: BinarySearchTreeAVL.InorderTraverse.Callback<TKey, TValue>): this;
    preorderTraverse(cb: BinarySearchTreeAVL.PreorderTraverse.Callback<TKey, TValue>): this;
    inorderTraverse_(cb: BinarySearchTreeAVL.InorderTraverse_.Callback<TKey, TValue>): this;
    protected setTree(value: TValue, key?: TKey): this;
    protected isSentinel(): Bool;
    protected isRoot(): Bool;
    protected isEmpty(): Bool;
    protected setLeft(tree: this | null): this;
    protected setRight(tree: this | null): this;
    protected setKey(key: TKey): this;
    protected setValues(values: TValue[]): this;
    protected makeSubtree(): this;
    protected detachSelf(replacer?: this): this;
    protected findMinTree(): this;
    protected findMaxTree(): this;
    protected findSuccessorTree(): this | null;
    protected findPredecessorTree(): this | null;
    protected findTreeByKey(key: TKey): this | null;
    protected _transplantTree(tree: this | null): void;
    protected transplantTree(tree: this | null): void;
    protected pointTo(tree: this): void;
}
export declare namespace BinarySearchTreeAVL {
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
    namespace InorderTraverse_ {
        interface Callback<TKey extends any, TValue extends any> {
            (key: TKey, values: TValue[]): Bool;
        }
    }
}
