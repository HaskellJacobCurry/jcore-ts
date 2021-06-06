"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Tuple = exports.Apply = exports.Functor = exports.swap = exports.snd = exports.fst = exports.URI = void 0;
var Apply_1 = require("../Control/Apply");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var common_1 = require("../../dependency/jcore/dist/ts-toolbelt/common");
exports.URI = common_1.S('Tuple');
/** fst :: Tuple a b -> a */
var fst = function (tuple) { return tuple.fst; };
exports.fst = fst;
/** snd :: Tuple a b -> b */
var snd = function (tuple) { return tuple.snd; };
exports.snd = snd;
/** swap :: Tuple a b -> Tuple b a */
var swap = function (_a) {
    var fst = _a.fst, snd = _a.snd;
    return Tuple(snd, fst);
};
exports.swap = swap;
/** map :: Functor (Tuple a) => (b -> c) -> Tuple a b -> Tuple a c */
var Functor = {
    URI: exports.URI,
    map: function (f) { return function (tupleA) { return Tuple(tupleA.fst, f(tupleA.snd)); }; }
};
exports.Functor = Functor;
/** ap :: Semigroup a => Apply (Tuple a) => Tuple a (b -> c) -> Tuple a b -> Tuple a c */
var Apply = function (Semigroup) { return ((function (Apply) { return (ts_toolbelt_1.Json.assign(Apply, Apply_1.Apply2_.Ext(Apply))); })(__assign(__assign({}, Functor), { ap: function (tupleF) { return function (tupleA) { return (Tuple(Semigroup.append(tupleF.fst)(tupleA.fst), tupleF.snd(tupleA.snd))); }; } }))); };
exports.Apply = Apply;
var Tuple = ts_toolbelt_1.Json.assign(function (fst, snd) { return ({ fst: fst, snd: snd }); }, {
    fst: fst,
    snd: snd,
    swap: swap,
    Apply: Apply
});
exports.Tuple = Tuple;
