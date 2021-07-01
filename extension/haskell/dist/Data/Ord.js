"use strict";
exports.__esModule = true;
exports.IOrd = exports.Ord = void 0;
var IBool_1 = require("./IBool");
var common_1 = require("../util/common");
var Ord;
(function (Ord_1) {
    Ord_1.Ext = (function (Ord) { return (common_1.define(function (Ext) { return ({
        notLt: function (ord0) { return function (ord1) { return IBool_1.IBool.not(Ord.lt(ord0)(ord1)); }; },
        gt: function (ord0) { return function (ord1) { return Ord.lt(ord1)(ord0); }; },
        notGt: function (ord0) { return function (ord1) { return IBool_1.IBool.not(Ext().gt(ord0)(ord1)); }; },
        min: function (ord0) { return function (ord1) { return (Ord.lt(ord0)(ord1).cata({
            True: function () { return ord0; },
            False: function () { return ord1; }
        })); }; },
        max: function (ord0) { return function (ord1) { return (Ord.lt(ord0)(ord1).cata({
            True: function () { return ord1; },
            False: function () { return ord0; }
        })); }; },
        clamp: function (min) { return function (max) { return function (ord) { return (Ord.lt(ord)(min).cata({
            True: function () { return min; },
            False: function () { return (Ord.lt(max)(ord).cata({
                True: function () { return max; },
                False: function () { return ord; }
            })); }
        })); }; }; },
        between: function (min) { return function (max) { return function (ord) { return Ord.eq(Ext().clamp(min)(max)(ord))(ord); }; }; }
    }); })); });
    Ord_1.instantiate = function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Ord_1.Ext(_)); })); };
})(Ord || (Ord = {}));
exports.Ord = Ord;
exports.IOrd = Ord;
exports["default"] = Ord;
