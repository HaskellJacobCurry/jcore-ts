"use strict";
exports.__esModule = true;
exports.Ord = void 0;
var IBool_1 = require("./IBool");
var IRing_1 = require("./IRing");
var Ord;
(function (Ord) {
    Ord.compare = function (ord0) { return function (ord1) { return ord0.compare(ord1); }; };
    Ord.lt = function (ord0) { return function (ord1) { return ord0.lt(ord1); }; };
    Ord.notLt = function (ord0) { return function (ord1) { return IBool_1.Bool.not(ord0.lt(ord1)); }; };
    Ord.gt = function (ord0) { return function (ord1) { return ord1.lt(ord0); }; };
    Ord.notGt = function (ord0) { return function (ord1) { return IBool_1.Bool.not(ord1.lt(ord0)); }; };
    Ord.min = function (ord0) { return function (ord1) { return (Ord.lt(ord0)(ord1).cata({
        True: function () { return ord0; },
        False: function () { return ord1; }
    })); }; };
    Ord.max = function (ord0) { return function (ord1) { return (Ord.gt(ord0)(ord1).cata({
        True: function () { return ord0; },
        False: function () { return ord1; }
    })); }; };
    Ord.clamp = function (min) { return function (max) { return function (ord) { return (ord.lt(min).cata({
        True: function () { return min; },
        False: function () { return (max.lt(ord).cata({
            True: function () { return max; },
            False: function () { return ord; }
        })); }
    })); }; }; };
    Ord.between = function (min) { return function (max) { return function (ord) { return (Ord.clamp(min)(max)(ord).eq(ord)); }; }; };
    Ord.abs = function (ord) { return (ord.lt(ord.construct.zero()).cata({
        True: function () { return IRing_1.Ring.negate(ord); },
        False: function () { return ord; }
    })); };
})(Ord = exports.Ord || (exports.Ord = {}));
