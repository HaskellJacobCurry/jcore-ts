"use strict";
exports.__esModule = true;
exports.BinaryHeap = void 0;
var ts_toolbelt_1 = require("../ts-toolbelt");
var Swap_1 = require("../algorithm/common/Swap");
var Array_1 = require("./Array");
var BinaryHeap = /** @class */ (function () {
    function BinaryHeap(compare) {
        if (compare === void 0) { compare = ts_toolbelt_1.Any.compare; }
        this.array = [];
        this.compare = compare;
    }
    // precondition: left and right are heaps
    BinaryHeap.prototype.heapify = function (i) {
        var _this = this;
        ts_toolbelt_1.trampoline(function (heapify, i) {
            var iLeft = BinaryHeap.left(i);
            var iRight = BinaryHeap.right(i);
            var iMax = i;
            if (iLeft < _this.array.length && _this.compare(_this.array[iMax], _this.array[iLeft]) == -1) {
                iMax = iLeft;
            }
            if (iRight < _this.array.length && _this.compare(_this.array[iMax], _this.array[iRight]) == -1) {
                iMax = iRight;
            }
            if (iMax != i) {
                Swap_1._swap(_this.array, i, iMax);
                return heapify(iMax);
            }
        })(i);
    };
    BinaryHeap.prototype.buildHeap = function () {
        for (var i = BinaryHeap.parent(this.array.length - 1); !(i < 0); i--) {
            this.heapify(i);
        }
    };
    BinaryHeap.prototype.push_ = function (value) {
        this.array[this.array.length] = value;
        return this;
    };
    BinaryHeap.prototype.push = function (values) {
        return new Array_1.Array(values).foldl(function (acc, value) { return acc.push_(value); }, this);
    };
    // left(i) = 2*i where i is one-based
    BinaryHeap.left = function (i) {
        return (i + 1 << 1) - 1;
    };
    // right(i) = 2*i+1 where i is one-based
    BinaryHeap.right = function (i) {
        return i + 1 << 1;
    };
    // parent(i) = floor(i/2) where i is one-based
    BinaryHeap.parent = function (i) {
        return i >> 1;
    };
    return BinaryHeap;
}());
exports.BinaryHeap = BinaryHeap;
