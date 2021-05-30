"use strict";
exports.__esModule = true;
exports.insertionSort = exports.InsertionSort = exports._insertionSort = void 0;
exports._insertionSort = function (as, iBegin, iEnd, ordering) {
    for (var i = iBegin; i < iEnd; i++) {
        var a = as[i];
        var j = i - 1;
        for (; !(j < 0) && ordering(a, as[j]); j--) {
            as[j + 1] = as[j];
        }
        as[j + 1] = a;
    }
};
var InsertionSort;
(function (InsertionSort) {
    InsertionSort.fn = (function (first, last, ordering) {
        for (var i = first; !i.equal(last); i = i.next()) {
            var v = i.read();
            var j = i.prev();
            for (var jEnd = first.prev(); !(j.equal(jEnd)) && ordering(v, j.read()); j = j.prev()) {
                j.next().write(j.read());
            }
            j.next().write(v);
        }
    });
})(InsertionSort = exports.InsertionSort || (exports.InsertionSort = {}));
exports.insertionSort = InsertionSort.fn;
exports["default"] = InsertionSort;
