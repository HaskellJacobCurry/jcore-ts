"use strict";
exports.__esModule = true;
exports.Foldable1 = exports.IFoldable = exports.Foldable = void 0;
var Endo_1 = require("./Monoid/Endo");
var Dual_1 = require("./Monoid/Dual");
var common_1 = require("../util/common");
var Foldable;
(function (Foldable_1) {
    Foldable_1.Ext = (function (Foldable) { return (common_1.define(function (Ext) { return ({
        foldr: function (f) { return function (b) { return function (foldableA) { return (common_1.assign(Endo_1.Endo.Monoid())(function (_) { return common_1.assign(Foldable.foldMap(_)(function (_) { return Endo_1.Endo(f(_)); })); })(function (_) { return common_1.assign(Endo_1.Endo.get(_(foldableA))); })(function (_) { return _(b); })); }; }; },
        foldl: function (f) { return function (b) { return function (foldableA) { return (common_1.assign(Dual_1.Dual.Monoid(Endo_1.Endo.Monoid()))(function (_) { return common_1.assign(Foldable.foldMap(_)(function (_) { return Dual_1.Dual(Endo_1.Endo(common_1.flip(f)(_))); })); })(function (_) { return common_1.assign(Endo_1.Endo.get(Dual_1.Dual.get(_(foldableA)))); })(function (_) { return _(b); })); }; }; }
    }); })); });
})(Foldable || (Foldable = {}));
exports.Foldable = Foldable;
exports.IFoldable = Foldable;
var Foldable1;
(function (Foldable1) {
    Foldable1.Ext = (function (Foldable) { return (common_1.define(function (Ext) { return ({
        foldr: function (f) { return function (b) { return function (foldableA) { return (common_1.assign(Endo_1.Endo.Monoid())(function (_) { return common_1.assign(Foldable.foldMap(_)(function (_) { return Endo_1.Endo(f(_)); })); })(function (_) { return common_1.assign(Endo_1.Endo.get(_(foldableA))); })(function (_) { return _(b); })); }; }; },
        foldl: function (f) { return function (b) { return function (foldableA) { return (common_1.assign(Dual_1.Dual.Monoid(Endo_1.Endo.Monoid()))(function (_) { return common_1.assign(Foldable.foldMap(_)(function (_) { return Dual_1.Dual(Endo_1.Endo(common_1.flip(f)(_))); })); })(function (_) { return common_1.assign(Endo_1.Endo.get(Dual_1.Dual.get(_(foldableA)))); })(function (_) { return _(b); })); }; }; }
    }); })); });
})(Foldable1 || (Foldable1 = {}));
exports.Foldable1 = Foldable1;
exports["default"] = Foldable;
