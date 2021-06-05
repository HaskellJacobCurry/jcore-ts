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
exports.Int = exports.Ord = exports.Eq = exports.Ring = exports.Semiring = exports.Show = exports.odd = exports.even = exports.dec = exports.inc = void 0;
var Eq_1 = require("./Eq");
var Ord_1 = require("./Ord");
var String_1 = require("./String");
var Bool_1 = require("./Bool");
var Ordering_1 = require("./Ordering");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
exports.inc = function (int) { return (int.value++, int); };
exports.dec = function (int) { return (int.value--, int); };
exports.even = function (int) { return Bool_1.Bool(int.value % 2 == 0); };
exports.odd = function (int) { return Bool_1.Bool(int.value % 2 != 0); };
exports.Show = ({
    show: function (int) { return String_1.String("" + int.value); }
});
exports.Semiring = ({
    add: function (int0) { return function (int1) { return exports.Int(int0.value + int1.value); }; },
    zero: function () { return exports.Int(0); },
    mul: function (int0) { return function (int1) { return exports.Int(int0.value * int1.value); }; },
    one: function () { return exports.Int(1); }
});
exports.Ring = (__assign(__assign({}, exports.Semiring), { sub: function (int0) { return function (int1) { return exports.Int(int0.value - int1.value); }; }, negate: function (int) { return exports.Int(-int.value); } }));
exports.Eq = (ts_toolbelt_1.Function.assign(function () { return ({
    eq: function (int0) { return function (int1) { return Bool_1.Bool(int0.value == int1.value); }; }
}); })(function (Eq) { return ts_toolbelt_1.Json.assign(Eq, Eq_1.IEq.Ext(Eq)); }));
exports.Ord = (ts_toolbelt_1.Function.assign(function () { return (ts_toolbelt_1.Function.define(function (Ord) { return (__assign(__assign({}, exports.Eq), { compare: function (int0) { return function (int1) { return (Ord().lt(int0)(int1).cata({
        True: function () { return Ordering_1.Ordering.LT; },
        False: function () { return (Ord().lt(int1)(int0).cata({
            True: function () { return Ordering_1.Ordering.GT; },
            False: function () { return Ordering_1.Ordering.EQ; }
        })); }
    })); }; }, lt: function (int0) { return function (int1) { return Bool_1.Bool(int0.value < int1.value); }; } })); })); })(function (Ord) { return ts_toolbelt_1.Json.assign(Ord, Ord_1.IOrd.Ext(Ord)); }));
exports.Int = ts_toolbelt_1.Json.assign(function (value) { return ({ value: value }); }, {
    inc: exports.inc,
    dec: exports.dec,
    even: exports.even,
    odd: exports.odd,
    Show: exports.Show,
    Semiring: exports.Semiring,
    Ring: exports.Ring,
    Eq: exports.Eq,
    Ord: exports.Ord
});
