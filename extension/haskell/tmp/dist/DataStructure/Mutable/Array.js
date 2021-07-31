"use strict";
exports.__esModule = true;
exports.pushMT = exports.reduceL = exports.reduce = exports.create = exports.URI = exports.Array = void 0;
var Bool_1 = require("../../../../dist/Instance/Data/Bool");
var Int_1 = require("../../../../dist/Instance/Data/Int");
var Common_1 = require("../../Common");
var URI = Common_1.S('Tuple');
exports.URI = URI;
var createArray = (function (_) { return Common_1.cast(_)(); });
exports.create = createArray;
var reduce = (function (f) { return function (b) { return function (arrayA) { return (Common_1.apply(Common_1.trampoline()(function (b, i) { return function (reduce) { return (Bool_1.Bool(i < arrayA.length).cata({
    False: function () { return b; },
    True: function () { return reduce(f(Int_1.Int(i))(b)(arrayA[i]), i + 1); }
})); }; }))(function (_) { return _(b, 0); })); }; }; });
exports.reduce = reduce;
var reduceL = (reduce);
exports.reduceL = reduceL;
var pushMT = (function (a) { return function (arrayA) { return (arrayA[arrayA.length] = a, arrayA); }; });
exports.pushMT = pushMT;
var map = (function (f) { return function (arrayA) { return (Common_1.chain(Common_1.placeholder())(function (next) { return function (_) { return next(reduce(function (i) { return function (arrayB) { return function (a) { return pushMT(f(i)(a))(arrayB); }; }; })); }; })(function (next) { return function (_) { return _(Array([]))(arrayA); }; })); }; });
var Array = (Common_1.merge(createArray, {
    URI: URI,
    create: createArray,
    reduce: reduce,
    reduceL: reduceL,
    pushMT: pushMT,
    map: map
}));
exports.Array = Array;
