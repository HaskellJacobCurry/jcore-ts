"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.BinarySearchTreeAVL = void 0;
var ts_toolbelt_1 = require("../ts-toolbelt");
var Array_1 = require("./Array");
var BinarySearchTreeAVL = /** @class */ (function () {
    function BinarySearchTreeAVL(getKey, compareKey, isRoot) {
        if (getKey === void 0) { getKey = function (_) { return _; }; }
        if (compareKey === void 0) { compareKey = ts_toolbelt_1.Any.compare; }
        if (isRoot === void 0) { isRoot = true; }
        this.key = undefined;
        this.values = [];
        this.left = this.right = null;
        this.getKey = getKey;
        this.compareKey = compareKey;
        this.parent = this;
        if (isRoot) {
            new Sentinel().setRight(this);
        }
    }
    BinarySearchTreeAVL.prototype.size = function () {
        return ts_toolbelt_1.trampoline(function (size, tree, acc, cont) {
            if (acc === void 0) { acc = 0; }
            if (cont === void 0) { cont = function (acc) { return acc; }; }
            return (!tree ? cont(acc) : ((function (acc) { return (size(tree.left, acc, function (acc) { return (size(tree.right, acc, cont)); })); })(acc + tree.values.length)));
        })(this);
    };
    BinarySearchTreeAVL.prototype.insert_ = function (value) {
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
    BinarySearchTreeAVL.prototype.insert = function (values) {
        return new Array_1.Array(values).foldl(function (acc, value) { return acc.insert_(value); }, this);
    };
    BinarySearchTreeAVL.prototype.removeOne_ = function (value) {
        ts_toolbelt_1.trampoline(function (remove, tree, key) {
            if (tree) {
                var compareRes = tree.compareKey(key, tree.key);
                if (compareRes == -1) {
                    return remove(tree.left, key);
                }
                else if (compareRes == 1) {
                    return remove(tree.right, key);
                }
                else if (1 < tree.values.length) {
                    new Array_1.Array(tree.values).pop();
                }
                else if (!tree.left) {
                    tree.transplantTree(tree.right);
                }
                else if (!tree.right) {
                    tree.transplantTree(tree.left);
                }
                else {
                    var successor = tree.right.findMinTree();
                    tree.key = successor.key;
                    tree.values = successor.values;
                    return remove(tree.right, tree.key);
                }
            }
        })(this, this.getKey(value));
        return this;
    };
    BinarySearchTreeAVL.prototype.removeOne = function (values) {
        return new Array_1.Array(values).foldl(function (acc, value) { return acc.removeOne_(value); }, this);
    };
    BinarySearchTreeAVL.prototype.remove_ = function (value) {
        ts_toolbelt_1.trampoline(function (remove, tree, key) {
            if (tree) {
                var compareRes = tree.compareKey(key, tree.key);
                if (compareRes == -1) {
                    return remove(tree.left, key);
                }
                else if (compareRes == 1) {
                    return remove(tree.right, key);
                }
                else if (!tree.left) {
                    tree.transplantTree(tree.right);
                }
                else if (!tree.right) {
                    tree.transplantTree(tree.left);
                }
                else {
                    var successor = tree.right.findMinTree();
                    tree.key = successor.key;
                    tree.values = successor.values;
                    return remove(tree.right, tree.key);
                }
            }
        })(this, this.getKey(value));
        return this;
    };
    BinarySearchTreeAVL.prototype.remove = function (values) {
        return new Array_1.Array(values).foldl(function (acc, value) { return acc.remove_(value); }, this);
    };
    BinarySearchTreeAVL.prototype.findByKey = function (key) {
        var tree = this.findTreeByKey(key);
        return tree !== null ? new Array_1.Array(tree.values).slice().unlift() : [];
    };
    BinarySearchTreeAVL.prototype._min = function () {
        return new Array_1.Array(this.findMinTree().values).slice().unlift();
    };
    BinarySearchTreeAVL.prototype.min = function () {
        var values = this.findMinTree().values;
        if (values.length == 0) {
            throw new Error('BinarySearchTreeAVL.prototype.min');
        }
        return new Array_1.Array(values).slice().unlift();
    };
    BinarySearchTreeAVL.prototype._max = function () {
        return new Array_1.Array(this.findMaxTree().values).slice().unlift();
    };
    BinarySearchTreeAVL.prototype.max = function () {
        var values = this.findMaxTree().values;
        if (values.length == 0) {
            throw new Error('BinarySearchTreeAVL.prototype.max');
        }
        return new Array_1.Array(values).slice().unlift();
    };
    BinarySearchTreeAVL.prototype.removeMin = function () {
        var mins = this.min();
        return this.removeOne(mins.length == 0 ? mins : [mins[0]]);
    };
    BinarySearchTreeAVL.prototype.removeMax = function () {
        var maxs = this.max();
        return this.removeOne(maxs.length == 0 ? maxs : [maxs[0]]);
    };
    BinarySearchTreeAVL.prototype.inorderTraverse = function (cb) {
        var _this = this;
        ts_toolbelt_1.trampoline(function (inorderTraverse, tree, cont) {
            if (tree === void 0) { tree = _this; }
            if (cont === void 0) { cont = function () { }; }
            return ((function (cont) { return (tree.left !== null ?
                inorderTraverse(tree.left, cont) :
                cont()); })(function () { return ((function (cont) {
                if (!tree.isEmpty()) {
                    cb(tree.key, tree.values);
                }
                return cont();
            })(function () { return (tree.right !== null ?
                inorderTraverse(tree.right, cont) :
                cont()); })); }));
        })();
        return this;
    };
    BinarySearchTreeAVL.prototype.preorderTraverse = function (cb) {
        var _this = this;
        ts_toolbelt_1.trampoline(function (preorderTraverse, tree, cont) {
            if (tree === void 0) { tree = _this; }
            if (cont === void 0) { cont = function () { }; }
            return ((function (cont) {
                if (!tree.isEmpty()) {
                    cb(tree.key, tree.values);
                }
                return cont();
            })(function () { return ((function (cont) { return (tree.left !== null ?
                preorderTraverse(tree.left, cont) :
                cont()); })(function () { return (tree.right !== null ?
                preorderTraverse(tree.right, cont) :
                cont()); })); }));
        })();
        return this;
    };
    BinarySearchTreeAVL.prototype.inorderTraverse_ = function (cb) {
        var _this = this;
        ts_toolbelt_1.trampoline(function (inorderTraverse, tree, cont) {
            if (tree === void 0) { tree = _this; }
            if (cont === void 0) { cont = function () { }; }
            return ((function (finalCont) {
                if (finalCont === void 0) { finalCont = cont; }
                return ((function (cont) { return (tree.left !== null ?
                    inorderTraverse(tree.left, cont) :
                    cont()); })(function () { return ((function (cont) {
                    if (!tree.isEmpty()) {
                        if (!cb(tree.key, tree.values)) {
                            return finalCont();
                        }
                    }
                    return cont();
                })(function () { return (tree.right !== null ?
                    inorderTraverse(tree.right, cont) :
                    cont()); })); }));
            })());
        })();
        return this;
    };
    BinarySearchTreeAVL.prototype.setTree = function (value, key) {
        if (key === void 0) { key = this.getKey(value); }
        this.key = key;
        this.values[this.values.length] = value;
        return this;
    };
    BinarySearchTreeAVL.prototype.isSentinel = function () {
        return false;
    };
    BinarySearchTreeAVL.prototype.isRoot = function () {
        return this.parent.isSentinel();
    };
    BinarySearchTreeAVL.prototype.isEmpty = function () {
        return this.values.length == 0;
    };
    BinarySearchTreeAVL.prototype.setLeft = function (tree) {
        this.left = tree;
        if (tree !== null) {
            tree.parent = this;
        }
        return this;
    };
    BinarySearchTreeAVL.prototype.setRight = function (tree) {
        this.right = tree;
        if (tree !== null) {
            tree.parent = this;
        }
        return this;
    };
    BinarySearchTreeAVL.prototype.setKey = function (key) {
        this.key = key;
        return this;
    };
    BinarySearchTreeAVL.prototype.setValues = function (values) {
        this.values = values;
        return this;
    };
    BinarySearchTreeAVL.prototype.makeSubtree = function () {
        return (new BinarySearchTreeAVL(this.getKey, this.compareKey, false));
    };
    // need to be overridden in derived classes if new fields are added
    BinarySearchTreeAVL.prototype.detachSelf = function (replacer) {
        if (replacer === void 0) { replacer = this.makeSubtree(); }
        replacer.setKey(this.key).setValues(this.values).setLeft(this.left).setRight(this.right);
        this._transplantTree(replacer);
        return replacer;
    };
    BinarySearchTreeAVL.prototype.findMinTree = function () {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (min, tree) {
            if (tree === void 0) { tree = _this; }
            return (tree.left !== null ? min(tree.left) : tree);
        })();
    };
    BinarySearchTreeAVL.prototype.findMaxTree = function () {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (max, tree) {
            if (tree === void 0) { tree = _this; }
            return (tree.right !== null ? max(tree.right) : tree);
        })();
    };
    BinarySearchTreeAVL.prototype.findSuccessorTree = function () {
        var _this = this;
        if (this.right) {
            return this.right.findMinTree();
        }
        return ts_toolbelt_1.trampoline(function (successor, tree) {
            if (tree === void 0) { tree = _this; }
            return (!tree.isRoot() ? (tree.parent.left === tree ?
                tree.parent :
                successor(tree.parent)) :
                null);
        })();
    };
    BinarySearchTreeAVL.prototype.findPredecessorTree = function () {
        var _this = this;
        if (this.left) {
            return this.left.findMaxTree();
        }
        return ts_toolbelt_1.trampoline(function (predecessor, tree) {
            if (tree === void 0) { tree = _this; }
            return (!tree.isRoot() ? (tree.parent.right === tree ?
                tree.parent :
                predecessor(tree.parent)) :
                null);
        })();
    };
    BinarySearchTreeAVL.prototype.findTreeByKey = function (key) {
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
    BinarySearchTreeAVL.prototype._transplantTree = function (tree) {
        if (this.parent.left === this) {
            this.parent.setLeft(tree);
        }
        else if (this.parent.right === this) {
            this.parent.setRight(tree);
        }
    };
    // effect: (this) becomes param(tree) and param(tree) is invalidated iff (this) is root
    BinarySearchTreeAVL.prototype.transplantTree = function (tree) {
        if (this.isRoot()) {
            var replacer = tree || this.makeSubtree();
            this._transplantTree(replacer);
            replacer.detachSelf(this);
        }
        else {
            this._transplantTree(tree);
        }
    };
    BinarySearchTreeAVL.prototype.pointTo = function (tree) {
        if (this !== tree) {
            this.detachSelf();
            tree.detachSelf(this);
        }
    };
    return BinarySearchTreeAVL;
}());
exports.BinarySearchTreeAVL = BinarySearchTreeAVL;
var Sentinel = /** @class */ (function (_super) {
    __extends(Sentinel, _super);
    function Sentinel() {
        return _super.call(this, undefined, undefined, false) || this;
    }
    Sentinel.prototype.isSentinel = function () {
        return true;
    };
    return Sentinel;
}(BinarySearchTreeAVL));
