import {
	Int,
	Function,
	Compare,
	Any,
	Bool,
} from '../ts-toolbelt'
import {trampoline} from '../common/trampoline'
import {Stack} from './Stack'
import {BinarySearchTreeAVL} from './BinarySearchTreeAVL'
import {Array} from './Array'

export class AVLTree<
	TValue extends any = any,
	TKey extends any = TValue
> extends BinarySearchTreeAVL<TValue, TKey> {
	protected height: Int = 0;
	protected static maxHeightDiff: Int = 1;

	insert_(value: TValue): this {
		let key = this.getKey(value);
		let stackBalanceCallback = new Stack<Function<[], void>>();
		trampoline<[this?], void>(
			(insert, tree = this) => {
				stackBalanceCallback.push_(() => tree.balance());
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
		while (stackBalanceCallback.size() != 0) {
			stackBalanceCallback.pop()();
		}
		return this;
	}

	removeOne_(value: TValue): this {
		let stackBalanceCallback = new Stack<Function<[], void>>();
		trampoline<[this | null, TKey], void>(
			(remove, tree, key) => {
				if (tree) {
					stackBalanceCallback.push_(() => tree.balance());
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
		while (stackBalanceCallback.size() != 0) {
			stackBalanceCallback.pop()();
		}
		return this;
	}

	remove_(value: TValue): this {
		let stackBalanceCallback = new Stack<Function<[], void>>();
		trampoline<[this | null, TKey], void>(
			(remove, tree, key) => {
				if (tree) {
					stackBalanceCallback.push_(() => tree.balance());
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
		while (stackBalanceCallback.size() != 0) {
			stackBalanceCallback.pop()();
		}
		return this;
	}

	private _remove_(value: TValue): this {
		(function remove(tree, key): void {
			if (tree) {
				let compareRes = tree.compareKey(key, tree.key);
				if (compareRes == -1) {
					remove(tree.left, key);
				} else if (compareRes == 1) {
					remove(tree.right, key);
				} else if (!tree.left) {
					tree.transplantTree(tree.right);
				} else if (!tree.right) {
					tree.transplantTree(tree.left);
				} else {
					let successor = tree.right.findMinTree();
					tree.key = successor.key;
					tree.values = successor.values;
					remove(tree.right, tree.key);
				}
				tree.balance();
			}
		})(<this | null>this, this.getKey(value));
		return this;
	}

	protected makeSubtree(): this {
		return <this>(new AVLTree<TValue, TKey>(this.getKey, this.compareKey, false));
	}

	protected balance(): void {
		if (AVLTree.height(this.left) - AVLTree.height(this.right) > AVLTree.maxHeightDiff) {
			let left = <this>this.left;
			if (AVLTree.height(left.left) < AVLTree.height(left.right)) {
				this.doubleRotateLeft();
			} else {
				this.rotateLeft();
			}
		} else if (AVLTree.height(this.right) - AVLTree.height(this.left) > AVLTree.maxHeightDiff) {
			let right = <this>this.right;
			if (AVLTree.height(right.right) < AVLTree.height(right.left)) {
				this.doubleRotateRight();
			} else {
				this.rotateRight();
			}
		}
		this.updateHeight();
	}

	// precondition: (this.left) is not null
	protected rotateLeft(): void {
		let left = <this>this.left;
		let pivot = this.detachSelf();
		pivot.setLeft(left.right);
		pivot._transplantTree(left);
		left.setRight(pivot);
		pivot.updateHeight();
		left.updateHeight();
		left.detachSelf(this);
	}

	// precondition: (this.right) is not null
	protected rotateRight(): void {
		let right = <this>this.right;
		let pivot = this.detachSelf();
		pivot.setRight(right.left);
		pivot._transplantTree(right);
		right.setLeft(pivot);
		pivot.updateHeight();
		right.updateHeight();
		right.detachSelf(this);
	}

	// precondition: (this.left) is not null
	protected doubleRotateLeft(): void {
		(<this>this.left).rotateRight();
		this.rotateLeft();
	}

	// precondition: (this.right) is not null
	protected doubleRotateRight(): void {
		(<this>this.right).rotateLeft();
		this.rotateRight();
	}

	// postcondition: height >= -1
	protected static height(tree: AVLTree | null): Int {
		return tree ? tree.height : -1;
	}

	protected updateHeight(): Int {
		return this.height = Int.max(AVLTree.height(this.left), AVLTree.height(this.right)) + 1;
	}

	protected detachSelf(tree = this.makeSubtree()): this {
		super.detachSelf(tree);
		tree.height = this.height;
		return tree;
	}
}