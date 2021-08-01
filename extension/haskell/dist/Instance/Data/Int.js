"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Int = exports.Ord = exports.Eq = exports.Ring = exports.Semiring = exports.Show = exports.Num = exports.show = exports.notGt = exports.gt = exports.notLt = exports.lt = exports.compare = exports.notEq = void 0;
var Int_1 = require("../../DataStructure/Data/Int");
var String_1 = require("../../DataStructure/Data/String");
var Bool_1 = require("./Bool");
var Ordering_1 = require("../../DataStructure/Data/Ordering");
var Num_1 = require("../../Typeclass/GHC/Num");
var Semiring_1 = require("../../Typeclass/Data/Semiring");
var Ring_1 = require("../../Typeclass/Data/Ring");
var Eq_1 = require("../../Typeclass/Data/Eq");
var Ord_1 = require("../../Typeclass/Data/Ord");
var Show_1 = require("../../Typeclass/Data/Show");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Data/Int"), exports);
var notEq = (function (_0) { return function (_1) { return Bool_1.Bool.fromI(Eq.notEq(_0)(_1)); }; });
exports.notEq = notEq;
var compare = (function (int0) { return function (int1) { return (lt(int0)(int1).cata({
    True: function () { return Ordering_1.Ordering.LT; },
    False: function () { return (lt(int1)(int0).cata({
        True: function () { return Ordering_1.Ordering.GT; },
        False: function () { return Ordering_1.Ordering.EQ; },
    })); }
})); }; });
exports.compare = compare;
var lt = (function (int0) { return function (int1) { return Bool_1.Bool(int0.value < int1.value); }; });
exports.lt = lt;
var notLt = (function (_0) { return function (_1) { return Bool_1.Bool.fromI(Ord.notLt(_0)(_1)); }; });
exports.notLt = notLt;
var gt = (function (_0) { return function (_1) { return Bool_1.Bool.fromI(Ord.gt(_0)(_1)); }; });
exports.gt = gt;
var notGt = (function (_0) { return function (_1) { return Bool_1.Bool.fromI(Ord.notGt(_0)(_1)); }; });
exports.notGt = notGt;
var show = (function (int) { return String_1.String("" + int.value); });
exports.show = show;
var Num = Num_1.INum.instantiate({
    add: Int_1.Int.add,
    sub: Int_1.Int.sub,
    mul: Int_1.Int.mul,
    zero: Int_1.Int.zero,
    one: Int_1.Int.one,
    abs: Int_1.Int.abs,
});
exports.Num = Num;
var Show = Show_1.IShow.instantiate()(Common_1.create({
    show: show,
}));
exports.Show = Show;
var Semiring = Semiring_1.ISemiring.instantiate()(Common_1.create({
    add: Int_1.Int.add,
    zero: Int_1.Int.zero,
    mul: Int_1.Int.mul,
    one: Int_1.Int.one,
}));
exports.Semiring = Semiring;
var Ring = Ring_1.IRing.instantiate()(Common_1.merge(Semiring, Common_1.create({
    sub: Int_1.Int.sub,
    negate: Int_1.Int.negate,
})));
exports.Ring = Ring;
var Eq = Eq_1.IEq.instantiate()(Common_1.create({
    eq: Int_1.Int.eq,
}));
exports.Eq = Eq;
var Ord = Ord_1.IOrd.instantiate()(Common_1.merge(Eq, Common_1.create({
    compare: compare,
    lt: lt,
})));
exports.Ord = Ord;
var _Int = (Common_1.Json.assign(Int_1.Int, {
    Num: Num,
    Show: Show,
    Semiring: Semiring,
    Ring: Ring,
    Eq: Eq,
    Ord: Ord,
    notEq: notEq,
    compare: compare,
    lt: lt,
    notLt: notLt,
    gt: gt,
    notGt: notGt,
    show: show,
}));
exports.Int = _Int;
exports.default = _Int;
