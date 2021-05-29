"use strict";
exports.__esModule = true;
exports.BinarySearchTree = void 0;
var ts_toolbelt_1 = require("../ts-toolbelt");
var Array_1 = require("./Array");
var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree(compareKey, getKey) {
        if (compareKey === void 0) { compareKey = ts_toolbelt_1.Any.compare; }
        if (getKey === void 0) { getKey = function (_) { return _; }; }
        this.key = undefined;
        this.values = [];
        this.parent = this.left = this.right = null;
        this.compareKey = compareKey;
        this.getKey = getKey;
    }
    BinarySearchTree.prototype.size = function () {
        return ts_toolbelt_1.trampoline(function (size, tree, acc, cont) {
            if (acc === void 0) { acc = 0; }
            if (cont === void 0) { cont = function (acc) { return acc; }; }
            return (!tree ? cont(acc) : ((function (acc) { return (size(tree.left, acc, function (acc) { return (size(tree.right, acc, cont)); })); })(acc + tree.values.length)));
        })(this);
    };
    BinarySearchTree.prototype.insert_ = function (value) {
        var _this = this;
        var key = this.getKey(value);
        ts_toolbelt_1.trampoline(function (insert, tree) {
            if (tree === void 0) { tree = _this; }
            if (!tree.isEmpty()) {
                var compareRes = tree.compareKey(key, tree.key);
                if (compareRes == -1) {
                    return insert(tree.left || tree.setLeft(tree.makeSubtree()).left);
                }
                else if (compareRes == 1) {
                    return insert(tree.right || tree.setRight(tree.makeSubtree()).right);
                }
            }
            tree.setTree(value, key);
        })();
        return this;
    };
    BinarySearchTree.prototype.insert = function (values) {
        return new Array_1.Array(values).foldl(function (acc, value) { return acc.insert_(value); }, this);
    };
    BinarySearchTree.prototype.remove_ = function (value) {
        var key = this.getKey(value);
        var tree = this.findTreeByKey(key);
        if (tree) {
            if (!tree.left) {
                tree.transplantTree(tree.right);
            }
            else if (!tree.right) {
                tree.transplantTree(tree.left);
            }
            else {
                var successor = tree.right.findMinTree();
                if (successor.parent !== tree) {
                    successor.transplantTree(successor.right);
                    successor.setRight(tree.right);
                }
                successor.setLeft(tree.left);
                tree.transplantTree(successor);
            }
        }
        return this;
    };
    BinarySearchTree.prototype.remove = function (values) {
        return new Array_1.Array(values).foldl(function (acc, value) { return acc.remove_(value); }, this);
    };
    BinarySearchTree.prototype.findByKey = function (key) {
        var tree = this.findTreeByKey(key);
        return tree !== null ? new Array_1.Array(tree.values).slice().unlift() : [];
    };
    BinarySearchTree.prototype._min = function () {
        return new Array_1.Array(this.findMinTree().values).slice().unlift();
    };
    BinarySearchTree.prototype.min = function () {
        var values = this.findMinTree().values;
        if (values.length == 0) {
            throw new Error('BinarySearchTree.prototype.min');
        }
        return new Array_1.Array(values).slice().unlift();
    };
    BinarySearchTree.prototype._max = function () {
        return new Array_1.Array(this.findMaxTree().values).slice().unlift();
    };
    BinarySearchTree.prototype.max = function () {
        var values = this.findMaxTree().values;
        if (values.length == 0) {
            throw new Error('BinarySearchTree.prototype.max');
        }
        return new Array_1.Array(values).slice().unlift();
    };
    BinarySearchTree.prototype.inorderTraverse = function (cb) {
        var _this = this;
        ts_toolbelt_1.trampoline(function (inorderTraverse, tree, cont) {
            if (tree === void 0) { tree = _this; }
            if (cont === void 0) { cont = function () { }; }
            return ((function (cont) { return (tree.left !== null ?
                inorderTraverse(tree.left, cont) :
                cont()); })(function () { return ((function (cont) { return (cb(tree.key, tree.values), cont()); })(function () { return (tree.right !== null ?
                inorderTraverse(tree.right, cont) :
                cont()); })); }));
        })();
        return this;
    };
    BinarySearchTree.prototype.preorderTraverse = function (cb) {
        var _this = this;
        ts_toolbelt_1.trampoline(function (preorderTraverse, tree, cont) {
            if (tree === void 0) { tree = _this; }
            if (cont === void 0) { cont = function () { }; }
            return ((function (cont) { return (cb(tree.key, tree.values), cont()); })(function () { return ((function (cont) { return (tree.left !== null ?
                preorderTraverse(tree.left, cont) :
                cont()); })(function () { return (tree.right !== null ?
                preorderTraverse(tree.right, cont) :
                cont()); })); }));
        })();
        return this;
    };
    BinarySearchTree.prototype.setTree = function (value, key) {
        if (key === void 0) { key = this.getKey(value); }
        this.key = key;
        this.values[this.values.length] = value;
        return this;
    };
    BinarySearchTree.prototype.isRoot = function () {
        return this.parent === null;
    };
    BinarySearchTree.prototype.isEmpty = function () {
        return this.values.length == 0;
    };
    BinarySearchTree.prototype.setLeft = function (tree) {
        this.left = tree;
        if (tree !== null) {
            tree.parent = this;
        }
        return this;
    };
    BinarySearchTree.prototype.setRight = function (tree) {
        this.right = tree;
        if (tree !== null) {
            tree.parent = this;
        }
        return this;
    };
    BinarySearchTree.prototype.makeSubtree = function () {
        return (new BinarySearchTree(this.compareKey, this.getKey));
    };
    BinarySearchTree.prototype.findMinTree = function () {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (min, tree) {
            if (tree === void 0) { tree = _this; }
            return (tree.left !== null ? min(tree.left) : tree);
        })();
    };
    BinarySearchTree.prototype.findMaxTree = function () {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (max, tree) {
            if (tree === void 0) { tree = _this; }
            return (tree.right !== null ? max(tree.right) : tree);
        })();
    };
    BinarySearchTree.prototype.findSuccessorTree = function () {
        var _this = this;
        if (this.right !== null) {
            return this.right.findMinTree();
        }
        return ts_toolbelt_1.trampoline(function (successor, tree) {
            if (tree === void 0) { tree = _this; }
            return (tree.parent !== null ? (tree.parent.left === tree ?
                tree.parent :
                successor(tree.parent)) :
                null);
        })();
    };
    BinarySearchTree.prototype.findPredecessorTree = function () {
        var _this = this;
        if (this.left !== null) {
            return this.left.findMaxTree();
        }
        return ts_toolbelt_1.trampoline(function (predecessor, tree) {
            if (tree === void 0) { tree = _this; }
            return (tree.parent !== null ? (tree.parent.right === tree ?
                tree.parent :
                predecessor(tree.parent)) :
                null);
        })();
    };
    BinarySearchTree.prototype.findTreeByKey = function (key) {
        return ts_toolbelt_1.trampoline(function (findByKey, tree) { return (tree === null ?
            tree :
            (function (compareRes) {
                if (compareRes === void 0) { compareRes = tree.compareKey(key, tree.key); }
                return (compareRes == -1 ?
                    findByKey(tree.left) :
                    compareRes == 1 ?
                        findByKey(tree.right) :
                        tree);
            })()); })(this);
    };
    // effect: (this) becomes param(tree) and param(tree) is invalidated iff (this) is root
    BinarySearchTree.prototype.transplantTree = function (tree) {
        if (!this.parent) {
            if (tree) {
                this.key = tree.key;
                this.values = tree.values;
                this.setLeft(tree.left);
                this.setRight(tree.right);
            }
            else {
                throw new Error('BinarySearchTree.prototype.transplantTree');
            }
        }
        else if (this.parent.left === this) {
            this.parent.setLeft(tree);
        }
        else if (this.parent.right === this) {
            this.parent.setRight(tree);
        }
    };
    return BinarySearchTree;
}());
exports.BinarySearchTree = BinarySearchTree;
