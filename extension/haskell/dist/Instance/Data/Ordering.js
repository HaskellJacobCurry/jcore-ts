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
exports.Ordering = exports.Ord = exports.Eq = exports.Show = exports.lt = exports.compare = exports.notEq = exports.eq = exports.show = void 0;
var Ordering_1 = require("../../DataStructure/Data/Ordering");
var String_1 = require("../../DataStructure/Data/String");
var Bool_1 = require("./Bool");
var Eq_1 = require("../../Typeclass/Data/Eq");
var Ord_1 = require("../../Typeclass/Data/Ord");
var Show_1 = require("../../Typeclass/Data/Show");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Data/Ordering"), exports);
var show = (function (ordering) { return String_1.String(ordering.tag); });
exports.show = show;
var eq = (function (ordering0) { return function (ordering1) { return Bool_1.Bool(ordering0.tag === ordering1.tag); }; });
exports.eq = eq;
var notEq = (function (_0) { return function (_1) { return Bool_1.Bool.fromI(Eq.notEq(_0)(_1)); }; });
exports.notEq = notEq;
var compare = (function (ordering0) { return function (ordering1) { return (ordering0.cata({
    LT: function () { return (ordering1.cata({
        LT: function () { return Ordering_1.Ordering.EQ; },
        EQ: function () { return Ordering_1.Ordering.LT; },
        GT: function () { return Ordering_1.Ordering.LT; },
    })); },
    EQ: function () { return (ordering1.cata({
        LT: function () { return Ordering_1.Ordering.GT; },
        EQ: function () { return Ordering_1.Ordering.EQ; },
        GT: function () { return Ordering_1.Ordering.LT; },
    })); },
    GT: function () { return (ordering1.cata({
        LT: function () { return Ordering_1.Ordering.GT; },
        EQ: function () { return Ordering_1.Ordering.GT; },
        GT: function () { return Ordering_1.Ordering.EQ; },
    })); }
})); }; });
exports.compare = compare;
var lt = (function (ordering0) { return function (ordering1) { return (compare(ordering0)(ordering1).cata({
    LT: function () { return Bool_1.Bool.True; },
    EQ: function () { return Bool_1.Bool.False; },
    GT: function () { return Bool_1.Bool.False; },
})); }; });
exports.lt = lt;
var Show = Show_1.IShow.instantiate()(Common_1.create({
    show: function (ordering) { return String_1.String(ordering.tag); },
}));
exports.Show = Show;
var Eq = Eq_1.IEq.instantiate()(Common_1.create({
    eq: eq,
}));
exports.Eq = Eq;
var Ord = Ord_1.IOrd.instantiate()(Common_1.merge(Eq, Common_1.create({
    compare: compare,
    lt: lt,
})));
exports.Ord = Ord;
var _Ordering = (Common_1.merge(Ordering_1.Ordering, {
    Show: Show,
    Eq: Eq,
    Ord: Ord,
    show: show,
    eq: eq,
    notEq: notEq,
    compare: compare,
    lt: lt,
}));
exports.Ordering = _Ordering;
exports.default = _Ordering;
