import { Int } from '../ts-toolbelt';
import { BinarySearchTreeAVL } from './BinarySearchTreeAVL';
export declare class AVLTree<TValue extends any = any, TKey extends any = TValue> extends BinarySearchTreeAVL<TValue, TKey> {
    protected height: Int;
    protected static maxHeightDiff: Int;
    insert_(value: TValue): this;
    removeOne_(value: TValue): this;
    remove_(value: TValue): this;
    private _remove_;
    protected makeSubtree(): this;
    protected balance(): void;
    protected rotateLeft(): void;
    protected rotateRight(): void;
    protected doubleRotateLeft(): void;
    protected doubleRotateRight(): void;
    protected static height(tree: AVLTree | null): Int;
    protected updateHeight(): Int;
    protected detachSelf(tree?: this): this;
}
