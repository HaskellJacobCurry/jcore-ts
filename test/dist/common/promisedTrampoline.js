"use strict";
exports.__esModule = true;
var promisedTrampoline_1 = require("../../../dist/common/promisedTrampoline");
promisedTrampoline_1.promisedTrampoline(function (s, n, acc) {
    if (acc === void 0) { acc = 0; }
    return (n == 0 ? acc : s(n - 1, acc + n));
})(1e5)
    .then(function (_) { return console.log({ _: _ }); });
