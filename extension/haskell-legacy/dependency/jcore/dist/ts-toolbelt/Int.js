"use strict";
exports.__esModule = true;
exports.Int = void 0;
var StrictWeakOrdering_1 = require("./StrictWeakOrdering");
var Int;
(function (Int) {
    Int.min = function (a, b) { return a < b ? a : b; };
    Int.max = function (a, b) { return b < a ? a : b; };
    Int.compare = function (a, b) { return a < b ? -1 : b < a ? 1 : 0; };
    Int.strictWeakOrdering = StrictWeakOrdering_1.StrictWeakOrdering.fromCompare(Int.compare);
    Int.random = function (min, max) { return Date.now() % (max - min + 1) + min; };
})(Int = exports.Int || (exports.Int = {}));
exports["default"] = Int;
