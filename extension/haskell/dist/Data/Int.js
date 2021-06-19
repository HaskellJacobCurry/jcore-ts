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
exports.Ord = exports.Eq = exports.Ring = exports.Semiring = exports.Show = exports.Num = exports.odd = exports.even = exports.dec = exports.inc = exports.sub = exports.mul = exports.add = exports.fromI = exports.Int = exports.URI = void 0;
var IInt_1 = require("./IInt");
var Num_1 = require("../GHC/Num");
var Eq_1 = require("./Eq");
var Ord_1 = require("./Ord");
var String_1 = require("./String");
var Bool_1 = require("./Bool");
var Ordering_1 = require("./Ordering");
var common_1 = require("../util/common");
var URI = common_1.S('Int');
exports.URI = URI;
var fromI = (function (int) { return ({ URI: URI, value: int.value }); });
exports.fromI = fromI;
var add = IInt_1.IInt.add;
exports.add = add;
var mul = IInt_1.IInt.mul;
exports.mul = mul;
var sub = IInt_1.IInt.sub;
exports.sub = sub;
var inc = (function (int) { return Int(int.value + 1); });
exports.inc = inc;
var dec = (function (int) { return Int(int.value - 1); });
exports.dec = dec;
var even = (function (int) { return Bool_1.Bool(int.value % 2 == 0); });
exports.even = even;
var odd = (function (int) { return Bool_1.Bool(int.value % 2 != 0); });
exports.odd = odd;
var Num = (common_1.assign({
    add: add,
    sub: sub,
    mul: mul,
    zero: function () { return ({ value: 0 }); },
    one: function () { return ({ value: 1 }); },
    abs: function (int) { return ({ value: Math.abs(int.value) }); }
})(function (_) { return common_1.Json.assign(_, Num_1.INum.Ext(_)); }));
exports.Num = Num;
var Show = ({
    show: function (int) { return String_1.String("" + int.value); }
});
exports.Show = Show;
var Semiring = ({
    add: function (int0) { return function (int1) { return IInt_1.IInt.add(int0)(int1); }; },
    zero: function () { return Int(0); },
    mul: function (int0) { return function (int1) { return IInt_1.IInt.mul(int0)(int1); }; },
    one: function () { return Int(1); }
});
exports.Semiring = Semiring;
var Ring = (__assign(__assign({}, Semiring), { sub: function (int0) { return function (int1) { return IInt_1.IInt.sub(int0)(int1); }; }, negate: function (int) { return IInt_1.IInt.negate(int); } }));
exports.Ring = Ring;
var Eq = (common_1.assign(({
    eq: function (int0) { return function (int1) { return Bool_1.Bool(int0.value == int1.value); }; }
}))(function (Eq) { return common_1.Json.assign(Eq, Eq_1.IEq.Ext(Eq)); }));
exports.Eq = Eq;
var Ord = (common_1.assign(common_1.define(function (Ord) { return (__assign(__assign({}, Eq), { compare: function (int0) { return function (int1) { return (Ord().lt(int0)(int1).cata({
        True: function () { return Ordering_1.Ordering.LT; },
        False: function () { return (Ord().lt(int1)(int0).cata({
            True: function () { return Ordering_1.Ordering.GT; },
            False: function () { return Ordering_1.Ordering.EQ; }
        })); }
    })); }; }, lt: function (int0) { return function (int1) { return Bool_1.Bool(int0.value < int1.value); }; } })); }))(function (Ord) { return common_1.Json.assign(Ord, Ord_1.IOrd.Ext(Ord)); }));
exports.Ord = Ord;
var Int = common_1.Json.assign(function (value) { return ({
    URI: URI,
    value: value
}); }, {
    URI: URI,
    fromI: fromI,
    add: add,
    mul: mul,
    sub: sub,
    inc: inc,
    dec: dec,
    even: even,
    odd: odd,
    Show: Show,
    Semiring: Semiring,
    Ring: Ring,
    Eq: Eq,
    Ord: Ord
});
exports.Int = Int;
exports["default"] = Int;
