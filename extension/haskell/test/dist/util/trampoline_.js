"use strict";
exports.__esModule = true;
var trampoline_1 = require("../../../dist/util/trampoline_");
var Promise_1 = require("../../../dist/util/Promise");
var util_1 = require("../../../dist/util");
util_1.apply(trampoline_1.trampoline__(function (s, n, acc) {
    if (acc === void 0) { acc = 0; }
    return (n == 0 ? Promise_1.Promise.resolve(acc) : (Promise_1.Promise.await(1e3)
        .then(function () { return console.log(n); })
        .then(function () { return s(n - 1, acc + n); })));
}))(function (_) { return _(1e1); })
    .then(function (_) { return console.log({ _: _ }); });
