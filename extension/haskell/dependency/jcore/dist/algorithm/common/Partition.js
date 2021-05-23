"use strict";
exports.__esModule = true;
exports.partition = exports.Partition = exports._partition = void 0;
var Swap_1 = require("./Swap");
exports._partition = function (as, iLeft, iRight, ordering) {
    var iPivot = iLeft;
    for (var i = iLeft; i < iRight; i++) {
        if (!ordering(as[iRight], as[i])) {
            Swap_1._swap(as, iPivot++, i);
        }
    }
    Swap_1._swap(as, iPivot, iRight);
    return iPivot;
};
var Partition;
(function (Partition) {
    Partition.fn = (function (left, right, ordering) {
        var pivot = left;
        for (var i = left; !i.equal(right); i = i.next()) {
            if (!ordering(right.read(), i.read())) {
                Swap_1.swap(pivot, i);
                pivot = pivot.next();
            }
        }
        Swap_1.swap(pivot, right);
        return pivot;
    });
})(Partition = exports.Partition || (exports.Partition = {}));
exports.partition = Partition.fn;
exports["default"] = Partition;
