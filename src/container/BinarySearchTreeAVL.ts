import {
	Int,
	Function,
	Compare,
	Any,
	Bool,
	trampoline,
} from '../ts-toolbelt'
import {Array} from './Array'

export class BinarySearchTreeAVL<
	TValue extends any = any,
	TKey extends any = TValue
> {
	protected key: TKey;
	protected values: TValue[];
	protected parent: this;
	protected left: this | null;
	protected right: this | null;
	protected getKey: Function<[TValue], TKey>;
	protected compareKey: Compare<TKey>;

	constructor(
		getKey: Function<[TValue], TKey> = _ => <TKey>_,
		compareKey: Compare<TKey> = Any.compare,
		isRoot = true,
	) {
		this.key = <TKey>undefined;
		this.values = [];
		this.left = this.right = null;
		this.getKey = getKey;
		this.compareKey = compareKey;
		this.parent = this;
		if (isRoot) {
			new Sentinel().setRight(<any>this);
		}
	}

	size(): Int {
		return trampoline<[this | null, Int?, Function<[Int], Int>?]>(
			(size, tree, acc = 0, cont = acc => acc) => (
				!tree ? cont(acc) : (
					(acc => (
						size(tree.left, acc, acc => (
							size(tree.right, acc, cont)
						))
					))(acc + tree.values.length)
				)
			)
		)(this);
	}

	insert_(value: TValue): this {
		let key = this.getKey(value);
		trampoline<[this?], void>(
			(insert, tree = this) => {
				if (!tree.isEmpty())  {
					let compareRes = tree.compareKey(key, tree.key);
					if (compareRes == -1) {
						return insert(tree.left || tree.setLeft(tree.makeSubtree()).left!);
					} else if (compareRes == 1) {
						return insert(tree.right || tree.setRight(tree.makeSubtree()).right!);
					}
				}
				tree.setTree(value, key);
			}
		)();
		return this;
	}

	insert(values: TValue[]): this {
		return new Array(values).foldl((acc, value) => acc.insert_(value), this);
	}

	removeOne_(value: TValue): this {
		trampoline<[this | null, TKey], void>(
			(remove, tree, key) => {
				if (tree) {
					let compareRes = tree.compareKey(key, tree.key);
					if (compareRes == -1) {
						return remove(tree.left, key);
					} else if (compareRes == 1) {
						return remove(tree.right, key);
					} else if (1 < tree.values.length) {
						new Array(tree.values).pop();
					} else if (!tree.left) {
						tree.transplantTree(tree.right);
					} else if (!tree.right) {
						tree.transplantTree(tree.left);
					} else {
						let successor = tree.right.findMinTree();
						tree.key = successor.key;
						tree.values = successor.values;
						return remove(tree.right, tree.key);
					}
				}
			}
		)(this, this.getKey(value));
		return this;
	}

	removeOne(values: TValue[]): this {
		return new Array(values).foldl((acc, value) => acc.removeOne_(value), this);
	}

	remove_(value: TValue): this {
		trampoline<[this | null, TKey], void>(
			(remove, tree, key) => {
				if (tree) {
					let compareRes = tree.compareKey(key, tree.key);
					if (compareRes == -1) {
						return remove(tree.left, key);
					} else if (compareRes == 1) {
						return remove(tree.right, key);
					} else if (!tree.left) {
						tree.transplantTree(tree.right);
					} else if (!tree.right) {
						tree.transplantTree(tree.left);
					} else {
						let successor = tree.right.findMinTree();
						tree.key = successor.key;
						tree.values = successor.values;
						return remove(tree.right, tree.key);
					}
				}
			}
		)(this, this.getKey(value));
		return this;
	}

	remove(values: TValue[]): this {
		return new Array(values).foldl((acc, value) => acc.remove_(value), this);
	}

	findByKey(key: TKey): TValue[] {
		let tree = this.findTreeByKey(key);
		return tree !== null ? new Array(tree.values).slice().unlift() : [];
	}

	_min(): TValue[] {
		return new Array(this.findMinTree().values).slice().unlift();
	}

	min(): TValue[] {
		let values = this.findMinTree().values;
		if (values.length == 0) {
			throw new Error('BinarySearchTreeAVL.prototype.min');
		}
		return new Array(values).slice().unlift();
	}

	_max(): TValue[] {
		return new Array(this.findMaxTree().values).slice().unlift();
	}

	max(): TValue[] {
		let values = this.findMaxTree().values;
		if (values.length == 0) {
			throw new Error('BinarySearchTreeAVL.prototype.max');
		}
		return new Array(values).slice().unlift();
	}

	removeMin(): this {
		let mins = this.min();
		return this.removeOne(mins.length == 0 ? mins : [mins[0]]);
	}

	removeMax(): this {
		let maxs = this.max();
		return this.removeOne(maxs.length == 0 ? maxs : [maxs[0]]);
	}

	inorderTraverse(cb: BinarySearchTreeAVL.InorderTraverse.Callback<TKey, TValue>): this {
		trampoline<[this?, trampoline.Cont<void>?], void>(
			(inorderTraverse, tree = this, cont = () => {}) => (
				(cont => (
					tree.left !== null ?
					inorderTraverse(tree.left, cont) : 
					cont()
				))(() => (
					(cont => {
						if (!tree.isEmpty()) {
							cb(tree.key, tree.values);
						}
						return cont();
					})(() => (
						tree.right !== null ?
						inorderTraverse(tree.right, cont) :
						cont()
					))
				))
			)
		)();
		return this;
	}

	preorderTraverse(cb: BinarySearchTreeAVL.PreorderTraverse.Callback<TKey, TValue>): this {
		trampoline<[this?, trampoline.Cont<void>?], void>(
			(preorderTraverse, tree = this, cont = () => {}) => (
				(cont => {
					if (!tree.isEmpty()) {
						cb(tree.key, tree.values);
					}
					return cont();
				})(() => (
					(cont => (
						tree.left !== null ?
						preorderTraverse(tree.left, cont) : 
						cont()
					))(() => (
						tree.right !== null ?
						preorderTraverse(tree.right, cont) :
						cont()
					))
				))
			)
		)();
		return this;
	}

	inorderTraverse_(cb: BinarySearchTreeAVL.InorderTraverse_.Callback<TKey, TValue>): this {
		trampoline<[this?, trampoline.Cont<void>?], void>(
			(inorderTraverse, tree = this, cont = () => {}) => (
				((finalCont = cont) => (
					(cont => (
						tree.left !== null ?
						inorderTraverse(tree.left, cont) : 
						cont()
					))(() => (
						(cont => {
							if (!tree.isEmpty()) {
								if (!cb(tree.key, tree.values)) {
									return finalCont();
								}
							}
							return cont();
						})(() => (
							tree.right !== null ?
							inorderTraverse(tree.right, cont) :
							cont()
						))
					))
				))()
			)
		)();
		return this;
	}

	protected setTree(value: TValue, key = this.getKey(value)): this {
		this.key = key;
		this.values[this.values.length] = value;
		return this;
	}

	protected isSentinel(): Bool {
		return false;
	}

	protected isRoot(): Bool {
		return this.parent.isSentinel();
	}

	protected isEmpty(): Bool {
		return this.values.length == 0;
	}

	protected setLeft(tree: this | null): this {
		this.left = tree;
		if (tree !== null) {
			tree.parent = this;
		}
		return this;
	}

	protected setRight(tree: this | null): this {
		this.right = tree;
		if (tree !== null) {
			tree.parent = this;
		}
		return this;
	}

	protected setKey(key: TKey): this {
		this.key = key;
		return this;
	}

	protected setValues(values: TValue[]): this {
		this.values = values;
		return this;
	}

	protected makeSubtree(): this {
		return <this>(new BinarySearchTreeAVL<TValue, TKey>(this.getKey, this.compareKey, false));
	}

	// need to be overridden in derived classes if new fields are added
	protected detachSelf(replacer = this.makeSubtree()): this {
		replacer.setKey(this.key).setValues(this.values).setLeft(this.left).setRight(this.right);
		this._transplantTree(replacer);
		return replacer;
	}

	protected findMinTree(): this {
		return trampoline<[this?], this>(
			(min, tree = this) => (
				tree.left !== null ? min(tree.left) : tree
			)
		)();
	}

	protected findMaxTree(): this {
		return trampoline<[this?], this>(
			(max, tree = this) => (
				tree.right !== null ? max(tree.right) : tree
			)
		)();
	}

	protected findSuccessorTree(): this | null {
		if (this.right) {
			return this.right.findMinTree();
		}
		return trampoline<[this?], this | null>(
			(successor, tree = this) => (
				!tree.isRoot() ? (
					tree.parent.left === tree ? 
					tree.parent : 
					successor(tree.parent)
				) :
				null
			)
		)();
	}

	protected findPredecessorTree(): this | null {
		if (this.left) {
			return this.left.findMaxTree();
		}
		return trampoline<[this?], this | null>(
			(predecessor, tree = this) => (
				!tree.isRoot() ? (
					tree.parent.right === tree ? 
					tree.parent : 
					predecessor(tree.parent)
				) :
				null
			)
		)();
	}

	protected findTreeByKey(key: TKey): this | null {
		return trampoline<[this | null], this | null>(
			(findByKey, tree) => (
				tree === null ?
				tree :
				((compareRes = tree.compareKey(key, tree.key)) => (
					compareRes == -1 ?
					findByKey(tree.left) :
					compareRes == 1 ?
					findByKey(tree.right) :
					tree
				))()
			)
		)(this);
	}

	protected _transplantTree(tree: this | null) {
		if (this.parent.left === this) {
			this.parent.setLeft(tree);
		} else if (this.parent.right === this) {
			this.parent.setRight(tree);
		}
	}

	// effect: (this) becomes param(tree) and param(tree) is invalidated iff (this) is root
	protected transplantTree(tree: this | null) {
		if (this.isRoot()) {
			let replacer = tree || this.makeSubtree();
			this._transplantTree(replacer);
			replacer.detachSelf(this);
		} else {
			this._transplantTree(tree);
		}
	}

	protected pointTo(tree: this) {
		if (this !== tree) {
			this.detachSelf();
			tree.detachSelf(this);
		}
	}
}
export namespace BinarySearchTreeAVL {
	export namespace InorderTraverse {
		export interface Callback<
			TKey extends any,
			TValue extends any
		> {
			(key: TKey, values: TValue[]): any;
		}
	}

	export namespace PreorderTraverse {
		export interface Callback<
			TKey extends any,
			TValue extends any
		> {
			(key: TKey, values: TValue[]): any;
		}
	}

	export namespace InorderTraverse_ {
		export interface Callback<
			TKey extends any,
			TValue extends any
		> {
			(key: TKey, values: TValue[]): Bool;
		}
	}
}

class Sentinel extends BinarySearchTreeAVL<any, any> {
	constructor() {
		super(undefined, undefined, false);
	}

	protected isSentinel(): Bool {
		return true;
	}
}