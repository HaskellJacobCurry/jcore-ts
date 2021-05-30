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
exports.AVLTree = void 0;
var ts_toolbelt_1 = require("../ts-toolbelt");
var trampoline_1 = require("../common/trampoline");
var Stack_1 = require("./Stack");
var BinarySearchTreeAVL_1 = require("./BinarySearchTreeAVL");
var Array_1 = require("./Array");
var AVLTree = /** @class */ (function (_super) {
    __extends(AVLTree, _super);
    function AVLTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.height = 0;
        return _this;
    }
    AVLTree.prototype.insert_ = function (value) {
        var _this = this;
        var key = this.getKey(value);
        var stackBalanceCallback = new Stack_1.Stack();
        trampoline_1.trampoline(function (insert, tree) {
            if (tree === void 0) { tree = _this; }
            stackBalanceCallback.push_(function () { return tree.balance(); });
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
        while (stackBalanceCallback.size() != 0) {
            stackBalanceCallback.pop()();
        }
        return this;
    };
    AVLTree.prototype.removeOne_ = function (value) {
        var stackBalanceCallback = new Stack_1.Stack();
        trampoline_1.trampoline(function (remove, tree, key) {
            if (tree) {
                stackBalanceCallback.push_(function () { return tree.balance(); });
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
        while (stackBalanceCallback.size() != 0) {
            stackBalanceCallback.pop()();
        }
        return this;
    };
    AVLTree.prototype.remove_ = function (value) {
        var stackBalanceCallback = new Stack_1.Stack();
        trampoline_1.trampoline(function (remove, tree, key) {
            if (tree) {
                stackBalanceCallback.push_(function () { return tree.balance(); });
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
        while (stackBalanceCallback.size() != 0) {
            stackBalanceCallback.pop()();
        }
        return this;
    };
    AVLTree.prototype._remove_ = function (value) {
        (function remove(tree, key) {
            if (tree) {
                var compareRes = tree.compareKey(key, tree.key);
                if (compareRes == -1) {
                    remove(tree.left, key);
                }
                else if (compareRes == 1) {
                    remove(tree.right, key);
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
                    remove(tree.right, tree.key);
                }
                tree.balance();
            }
        })(this, this.getKey(value));
        return this;
    };
    AVLTree.prototype.makeSubtree = function () {
        return (new AVLTree(this.getKey, this.compareKey, false));
    };
    AVLTree.prototype.balance = function () {
        if (AVLTree.height(this.left) - AVLTree.height(this.right) > AVLTree.maxHeightDiff) {
            var left = this.left;
            if (AVLTree.height(left.left) < AVLTree.height(left.right)) {
                this.doubleRotateLeft();
            }
            else {
                this.rotateLeft();
            }
        }
        else if (AVLTree.height(this.right) - AVLTree.height(this.left) > AVLTree.maxHeightDiff) {
            var right = this.right;
            if (AVLTree.height(right.right) < AVLTree.height(right.left)) {
                this.doubleRotateRight();
            }
            else {
                this.rotateRight();
            }
        }
        this.updateHeight();
    };
    // precondition: (this.left) is not null
    AVLTree.prototype.rotateLeft = function () {
        var left = this.left;
        var pivot = this.detachSelf();
        pivot.setLeft(left.right);
        pivot._transplantTree(left);
        left.setRight(pivot);
        pivot.updateHeight();
        left.updateHeight();
        left.detachSelf(this);
    };
    // precondition: (this.right) is not null
    AVLTree.prototype.rotateRight = function () {
        var right = this.right;
        var pivot = this.detachSelf();
        pivot.setRight(right.left);
        pivot._transplantTree(right);
        right.setLeft(pivot);
        pivot.updateHeight();
        right.updateHeight();
        right.detachSelf(this);
    };
    // precondition: (this.left) is not null
    AVLTree.prototype.doubleRotateLeft = function () {
        this.left.rotateRight();
        this.rotateLeft();
    };
    // precondition: (this.right) is not null
    AVLTree.prototype.doubleRotateRight = function () {
        this.right.rotateLeft();
        this.rotateRight();
    };
    // postcondition: height >= -1
    AVLTree.height = function (tree) {
        return tree ? tree.height : -1;
    };
    AVLTree.prototype.updateHeight = function () {
        return this.height = ts_toolbelt_1.Int.max(AVLTree.height(this.left), AVLTree.height(this.right)) + 1;
    };
    AVLTree.prototype.detachSelf = function (tree) {
        if (tree === void 0) { tree = this.makeSubtree(); }
        _super.prototype.detachSelf.call(this, tree);
        tree.height = this.height;
        return tree;
    };
    AVLTree.maxHeightDiff = 1;
    return AVLTree;
}(BinarySearchTreeAVL_1.BinarySearchTreeAVL));
exports.AVLTree = AVLTree;
