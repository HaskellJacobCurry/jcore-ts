"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatMap = exports.concatMT = exports.concat = exports.pushMT = exports.reduceL = exports.reduce = exports.singleton = exports.empty = exports.infer = exports.create = exports.URI = exports.Array = void 0;
var Bool_1 = require("../../Instance/Data/Bool");
var Int_1 = require("../../Instance/Data/Int");
var Common_1 = require("../../Common");
var URI = Common_1.S('Array');
exports.URI = URI;
var createArray = (function (_) { return Common_1.cast(_)(); });
exports.create = createArray;
var infer = (Common_1.reinterpret);
exports.infer = infer;
var empty = (function () { return Array([]); });
exports.empty = empty;
var singleton = (function (a) { return createArray([a]); });
exports.singleton = singleton;
var reduce = (function (f) { return function (b) { return function (arrayA) { return (Common_1.apply(Common_1.trampoline()(function (b, i) { return function (reduce) { return (Bool_1.Bool(i < arrayA.length).cata({
    False: function () { return b; },
    True: function () { return reduce(f(Int_1.Int(i))(b)(arrayA[i]), i + 1); },
})); }; }))(function (_) { return _(b, 0); })); }; }; });
exports.reduce = reduce;
var reduceL = (reduce);
exports.reduceL = reduceL;
var pushMT = (function (a) { return function (arrayA) { return (arrayA[arrayA.length] = a, arrayA); }; });
exports.pushMT = pushMT;
var map = (function (f) { return function (arrayA) { return (Common_1.apply(reduce(function (i) { return function (arrayB) { return function (a) { return pushMT(f(i)(a))(arrayB); }; }; }))(function (_) { return _(Array.empty())(arrayA); })); }; });
var concat = (function (ass) { return (reduce(function () { return Common_1.flip(concatMT); })(Array.empty())(ass)); });
exports.concat = concat;
var concatMT = (function (src) { return function (dest) { return (Common_1.apply(reduce(function () { return function (acc) { return function (a) { return pushMT(a)(acc); }; }; })(dest))(function (_) { return _(src); })); }; });
exports.concatMT = concatMT;
var concatMap = (function (f) { return function (arrayA) { return (Common_1.apply(reduce(function () { return function (acc) { return function (a) { return concatMT(f(a))(acc); }; }; })(Array.empty()))(function (_) { return _(arrayA); })); }; });
exports.concatMap = concatMap;
var Array = (Common_1.merge(createArray, {
    URI: URI,
    create: createArray,
    infer: infer,
    empty: empty,
    singleton: singleton,
    reduce: reduce,
    reduceL: reduceL,
    pushMT: pushMT,
    map: map,
    concat: concat,
    concatMT: concatMT,
    concatMap: concatMap,
}));
exports.Array = Array;
