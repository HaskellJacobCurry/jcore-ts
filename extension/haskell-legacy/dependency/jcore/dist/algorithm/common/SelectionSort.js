"use strict";
exports.__esModule = true;
exports.selectionSort = exports.SelectionSort = exports._selectionSort = void 0;
var Min_1 = require("./Min");
var Swap_1 = require("./Swap");
exports._selectionSort = function (as, iBegin, iEnd, ordering) {
    var _a;
    for (var i = iBegin; i < iEnd - 1; i++) {
        var iMin = (_a = Min_1._min(as, i, iEnd, ordering), _a[0]), _ = _a[1];
        Swap_1._swap(as, i, iMin);
    }
};
var SelectionSort;
(function (SelectionSort) {
    SelectionSort.fn = (function (first, last, ordering) {
        for (var i = first; !i.next().equal(last); i = i.next()) {
            var iMin = Min_1.min(i, last, ordering);
            Swap_1.swap(i, iMin);
        }
    });
})(SelectionSort = exports.SelectionSort || (exports.SelectionSort = {}));
exports.selectionSort = SelectionSort.fn;
exports["default"] = SelectionSort;
