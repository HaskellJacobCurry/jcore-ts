"use strict";
exports.__esModule = true;
exports.quickSort = exports.QuickSort = exports._quickSort = void 0;
var ts_toolbelt_1 = require("../../ts-toolbelt");
var Swap_1 = require("./Swap");
var Partition_1 = require("./Partition");
var _quickSort = function (as, iBegin, iLast, ordering) { return (ts_toolbelt_1.Function.define(function (quickSort) { return function (as, iLeft, iRight, ordering) {
    if (iLeft < iRight) {
        var iPivot = Partition_1._partition(as, iLeft, iRight, ordering);
        quickSort()(as, iLeft, iPivot - 1, ordering);
        quickSort()(as, iPivot + 1, iRight, ordering);
    }
}; })(as, iBegin, iLast - 1, ordering)); };
exports._quickSort = _quickSort;
exports._quickSort = _quickSort = function (as, iBegin, iLast, ordering) { return (Swap_1._swap(as, iLast - 1, ts_toolbelt_1.Int.random(iBegin, iLast - 1)),
    ts_toolbelt_1.trampoline(function (quickSort, as, iLeft, iRight, ordering, cont) {
        if (cont === void 0) { cont = function () { }; }
        if (iLeft < iRight) {
            var iPivot_1 = Partition_1._partition(as, iLeft, iRight, ordering);
            return quickSort(as, iLeft, iPivot_1 - 1, ordering, function () { return (quickSort(as, iPivot_1 + 1, iRight, ordering, cont)); });
        }
        return cont();
    })(as, iBegin, iLast - 1, ordering)); };
var QuickSort;
(function (QuickSort) {
    QuickSort.fn = (function (first, last, ordering) {
        console.log('randomize'),
            ts_toolbelt_1.trampoline(function (quickSort, left, right, ordering, cont) {
                if (cont === void 0) { cont = function () { }; }
                if (left.index() < right.index()) {
                    var pivot_1 = Partition_1.partition(left, right, ordering);
                    return quickSort(left, pivot_1.prev(), ordering, function () { return (quickSort(pivot_1.next(), right, ordering, cont)); });
                }
                return cont();
            })(first, last.prev(), ordering);
    });
})(QuickSort = exports.QuickSort || (exports.QuickSort = {}));
exports.quickSort = QuickSort.fn;
exports["default"] = QuickSort;
