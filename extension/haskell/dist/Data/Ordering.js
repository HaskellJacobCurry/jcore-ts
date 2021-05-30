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
exports.Ordering = exports.invert = exports.Ord = exports.Eq = exports.Show = exports.GT = exports.EQ = exports.LT = void 0;
var Eq_1 = require("./Eq");
var Ord_1 = require("./Ord");
var String_1 = require("./String");
var Bool_1 = require("./Bool");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
exports.LT = ts_toolbelt_1.Json.assign({ tag: 'LT' }, {
    cata: function (fs) { return fs['LT'](); }
});
exports.EQ = ts_toolbelt_1.Json.assign({ tag: 'EQ' }, {
    cata: function (fs) { return fs['EQ'](); }
});
exports.GT = ts_toolbelt_1.Json.assign({ tag: 'GT' }, {
    cata: function (fs) { return fs['GT'](); }
});
exports.Show = ({
    show: function (ordering) { return String_1.String(ordering.tag); }
});
exports.Eq = ((function (Eq) { return (ts_toolbelt_1.Json.assign(Eq, Eq_1.Eq.Ext(Eq))); })({
    eq: function (ordering0) { return function (ordering1) { return Bool_1.Bool(ordering0.tag === ordering1.tag); }; }
}));
exports.Ord = ((function (Ord) { return (ts_toolbelt_1.Json.assign(Ord, Ord_1.Ord.Ext(Ord))); })(ts_toolbelt_1.Function.define(function (Ord) { return (__assign(__assign({}, exports.Eq), { compare: function (ordering0) { return function (ordering1) { return (ordering0.cata({
        LT: function () { return (ordering1.cata({
            LT: function () { return exports.EQ; },
            EQ: function () { return exports.LT; },
            GT: function () { return exports.LT; }
        })); },
        EQ: function () { return (ordering1.cata({
            LT: function () { return exports.GT; },
            EQ: function () { return exports.EQ; },
            GT: function () { return exports.LT; }
        })); },
        GT: function () { return (ordering1.cata({
            LT: function () { return exports.GT; },
            EQ: function () { return exports.GT; },
            GT: function () { return exports.EQ; }
        })); }
    })); }; }, lt: function (ordering0) { return function (ordering1) { return (Ord().compare(ordering0)(ordering1).cata({
        LT: function () { return Bool_1.Bool.True; },
        EQ: function () { return Bool_1.Bool.False; },
        GT: function () { return Bool_1.Bool.False; }
    })); }; } })); })));
exports.invert = function (ordering) { return (ordering.cata({
    LT: function () { return exports.GT; },
    EQ: function () { return exports.EQ; },
    GT: function () { return exports.LT; }
})); };
exports.Ordering = {
    LT: exports.LT,
    EQ: exports.EQ,
    GT: exports.GT,
    Show: exports.Show,
    Eq: exports.Eq,
    Ord: exports.Ord,
    invert: exports.invert
};
