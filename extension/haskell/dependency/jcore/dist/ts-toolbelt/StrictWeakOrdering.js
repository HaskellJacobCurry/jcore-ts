"use strict";
exports.__esModule = true;
exports.StrictWeakOrdering = void 0;
var StrictWeakOrdering;
(function (StrictWeakOrdering) {
    StrictWeakOrdering.fromCompare = function (cmp) { return (function (a, b) { return (function (res) {
        if (res === void 0) { res = cmp(a, b); }
        return res == -1 ? true : false;
    })(); }); };
})(StrictWeakOrdering = exports.StrictWeakOrdering || (exports.StrictWeakOrdering = {}));
exports["default"] = StrictWeakOrdering;
