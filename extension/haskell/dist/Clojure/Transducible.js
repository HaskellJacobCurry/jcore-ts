"use strict";
exports.__esModule = true;
exports.ITransducible1 = exports.Transducible1 = exports.ITransducible = exports.Transducible = void 0;
var util_1 = require("../util");
var Transducible;
(function (Transducible) {
    Transducible.Ext = (function (TransducibleF) { return util_1.define(function (Ext) { return ({
        reduce_: function (reducer) { return function (b) { return function (transducibleA) { return (util_1.apply((TransducibleF._reduce(reducer.step)(reducer.state)(b)(transducibleA)))(function (_) { return reducer.complete(_.fst)(_.snd); })); }; }; }
    }); }); });
    Transducible.instantiate = function (_) { return (util_1.Json.assign(_, Transducible.Ext(_))); };
})(Transducible || (Transducible = {}));
exports.Transducible = Transducible;
exports.ITransducible = Transducible;
var Transducible1;
(function (Transducible1) {
    Transducible1.Ext = (function (TransducibleF) { return util_1.define(function (Ext) { return ({
        reduce_: function (reducer) { return function (b) { return function (transducibleA) { return (util_1.apply((TransducibleF._reduce(reducer.step)(reducer.state)(b)(transducibleA)))(function (_) { return reducer.complete(_.fst)(_.snd); })); }; }; }
    }); }); });
    Transducible1.instantiate = function (_) { return (util_1.Json.assign(_, Transducible1.Ext(_))); };
})(Transducible1 || (Transducible1 = {}));
exports.Transducible1 = Transducible1;
exports.ITransducible1 = Transducible1;
exports["default"] = Transducible;
