import {
	Int,
	Function,
	Compare,
	Any,
	Bool,
	trampoline
} from '../ts-toolbelt'
import {Array} from './Array'

export class BinarySearchTree<
	TValue extends any = any,
	TKey extends any = TValue
> {
	protected key: TKey;
	protected values: TValue[];
	protected parent: this | null;
	protected left: this | null;
	protected right: this | null;
	protected compareKey: Compare<TKey>;
	protected getKey: Function<[TValue], TKey>;

	constructor(
		compareKey: Compare<TKey> = Any.compare,
		getKey: Function<[TValue], TKey> = _ => <TKey>_
	) {
		this.key = <TKey>undefined;
		this.values = [];
		this.parent = this.left = this.right = null;
		this.compareKey = compareKey;
		this.getKey = getKey;
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

	remove_(value: TValue): this {
		let key = this.getKey(value);
		let tree = this.findTreeByKey(key);
		if (tree) {
			if (!tree.left) {
				tree.transplantTree(tree.right);
			} else if (!tree.right) {
				tree.transplantTree(tree.left);
			} else {
				let successor = tree.right.findMinTree();
				if (successor.parent !== tree) {
					successor.transplantTree(successor.right);
					successor.setRight(tree.right);
				}
				successor.setLeft(tree.left);
				tree.transplantTree(successor);
			}
		}
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
			throw new Error('BinarySearchTree.prototype.min');
		}
		return new Array(values).slice().unlift();
	}

	_max(): TValue[] {
		return new Array(this.findMaxTree().values).slice().unlift();
	}

	max(): TValue[] {
		let values = this.findMaxTree().values;
		if (values.length == 0) {
			throw new Error('BinarySearchTree.prototype.max');
		}
		return new Array(values).slice().unlift();
	}

	inorderTraverse(cb: BinarySearchTree.InorderTraverse.Callback<TKey, TValue>): this {
		trampoline<[this?, trampoline.Cont<void>?], void>(
			(inorderTraverse, tree = this, cont = () => {}) => (
				(cont => (
					tree.left !== null ?
					inorderTraverse(tree.left, cont) : 
					cont()
				))(() => (
					(cont => (
						cb(tree.key, tree.values), cont()
					))(() => (
						tree.right !== null ?
						inorderTraverse(tree.right, cont) :
						cont()
					))
				))
			)
		)();
		return this;
	}

	preorderTraverse(cb: BinarySearchTree.PreorderTraverse.Callback<TKey, TValue>): this {
		trampoline<[this?, trampoline.Cont<void>?], void>(
			(preorderTraverse, tree = this, cont = () => {}) => (
				(cont => (
					cb(tree.key, tree.values), cont()
				))(() => (
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

	protected setTree(value: TValue, key = this.getKey(value)): this {
		this.key = key;
		this.values[this.values.length] = value;
		return this;
	}

	protected isRoot(): Bool {
		return this.parent === null;
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

	protected makeSubtree(): this {
		return <this>(new BinarySearchTree<TValue, TKey>(this.compareKey, this.getKey));
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
		if (this.right !== null) {
			return this.right.findMinTree();
		}
		return trampoline<[this?], this | null>(
			(successor, tree = this) => (
				tree.parent !== null ? (
					tree.parent.left === tree ? 
					tree.parent : 
					successor(tree.parent)
				) :
				null
			)
		)();
	}

	protected findPredecessorTree(): this | null {
		if (this.left !== null) {
			return this.left.findMaxTree();
		}
		return trampoline<[this?], this | null>(
			(predecessor, tree = this) => (
				tree.parent !== null ? (
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

	// effect: (this) becomes param(tree) and param(tree) is invalidated iff (this) is root
	protected transplantTree(tree: this | null): void {
		if (!this.parent) {
			if (tree) {
				this.key = tree.key;
				this.values = tree.values;
				this.setLeft(tree.left);
				this.setRight(tree.right);
			} else {
				throw new Error('BinarySearchTree.prototype.transplantTree');
			}
		} else if (this.parent.left === this) {
			this.parent.setLeft(tree);
		} else if (this.parent.right === this) {
			this.parent.setRight(tree);
		}
	}
}
export namespace BinarySearchTree {
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
}