"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var Case_1 = require("../../../dist/util/Case");
var util_1 = require("../../../dist/util");
var merge = 1;
var s = Case_1.Case.apply(void 0, __spreadArrays([44], util_1.create(['', [123]])));
var t = merge(s, Case_1.Case('yo', 3, []));
Case_1.Case.infer(t).cata({
    '44': function (a, b) { return 1; },
    'yo': function () { return 1; }
});
