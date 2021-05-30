"use strict";
exports.__esModule = true;
exports.min = exports.Min = exports._min = void 0;
exports._min = function (as, iBegin, iEnd, ordering) {
    var iMin = iBegin;
    for (var i = iBegin + 1; i < iEnd; i++) {
        if (ordering(as[i], as[iMin])) {
            iMin = i;
        }
    }
    return [iMin, as[iMin]];
};
var Min;
(function (Min) {
    Min.fn = (function (first, last, ordering) {
        var min = first;
        for (var i = first.next(); !i.equal(last); i = i.next()) {
            if (ordering(i.read(), min.read())) {
                min = i;
            }
        }
        return min;
    });
})(Min = exports.Min || (exports.Min = {}));
exports.min = Min.fn;
exports["default"] = Min;
