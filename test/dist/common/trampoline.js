"use strict";
exports.__esModule = true;
var trampoline_1 = require("../../../dist/common/trampoline");
console.log(trampoline_1.trampoline(function (s, n, acc) {
    if (acc === void 0) { acc = 0; }
    return (n == 0 ?
        acc :
        s(n - 1, acc + n));
})(1e4));
