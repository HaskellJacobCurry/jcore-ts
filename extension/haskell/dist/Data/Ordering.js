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
exports.Ord = exports.Eq = exports.Show = exports.invert = exports.fromI = exports.GT = exports.EQ = exports.LT = exports.Ordering = void 0;
var Eq_1 = require("./Eq");
var Ord_1 = require("./Ord");
var String_1 = require("./String");
var Bool_1 = require("./Bool");
var common_1 = require("../util/common");
var LT = common_1.Json.assign({ tag: 'LT' }, {
    cata: function (fs) { return fs['LT'](); }
});
exports.LT = LT;
var EQ = common_1.Json.assign({ tag: 'EQ' }, {
    cata: function (fs) { return fs['EQ'](); }
});
exports.EQ = EQ;
var GT = common_1.Json.assign({ tag: 'GT' }, {
    cata: function (fs) { return fs['GT'](); }
});
exports.GT = GT;
var fromI = (function (ordering) { return (ordering.cata({
    LT: function () { return LT; },
    EQ: function () { return EQ; },
    GT: function () { return GT; }
})); });
exports.fromI = fromI;
var invert = (function (ordering) { return (ordering.cata({
    LT: function () { return GT; },
    EQ: function () { return EQ; },
    GT: function () { return LT; }
})); });
exports.invert = invert;
var Show = ({
    show: function (ordering) { return String_1.String(ordering.tag); }
});
exports.Show = Show;
var Eq = (common_1.Function.assign({
    eq: function (ordering0) { return function (ordering1) { return Bool_1.Bool(ordering0.tag === ordering1.tag); }; }
})(function (Eq) { return common_1.Json.assign(Eq, Eq_1.Eq.Ext(Eq)); }));
exports.Eq = Eq;
var Ord = (common_1.Function.assign(common_1.Function.define(function (Ord) { return (__assign(__assign({}, Eq), { compare: function (ordering0) { return function (ordering1) { return (ordering0.cata({
        LT: function () { return (ordering1.cata({
            LT: function () { return EQ; },
            EQ: function () { return LT; },
            GT: function () { return LT; }
        })); },
        EQ: function () { return (ordering1.cata({
            LT: function () { return GT; },
            EQ: function () { return EQ; },
            GT: function () { return LT; }
        })); },
        GT: function () { return (ordering1.cata({
            LT: function () { return GT; },
            EQ: function () { return GT; },
            GT: function () { return EQ; }
        })); }
    })); }; }, lt: function (ordering0) { return function (ordering1) { return (Ord().compare(ordering0)(ordering1).cata({
        LT: function () { return Bool_1.Bool.True; },
        EQ: function () { return Bool_1.Bool.False; },
        GT: function () { return Bool_1.Bool.False; }
    })); }; } })); }))(function (Ord) { return common_1.Json.assign(Ord, Ord_1.Ord.Ext(Ord)); }));
exports.Ord = Ord;
var Ordering = {
    LT: LT,
    EQ: EQ,
    GT: GT,
    fromI: fromI,
    invert: invert,
    Show: Show,
    Eq: Eq,
    Ord: Ord
};
exports.Ordering = Ordering;
