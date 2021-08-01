"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITransducible1 = exports.Transducible1 = exports.ITransducible = exports.Transducible = void 0;
var Common_1 = require("../../Common");
var Transducible;
(function (Transducible) {
    Transducible.Ext = (function (TransducibleF) { return (Common_1.define(function (Ext) { return ({
        reduce_: function (reducer) { return function (b) { return function (transducibleA) { return (Common_1.apply((TransducibleF._reduce(reducer.step)(reducer.state)(b)(transducibleA)))(function (_) { return reducer.complete(_.fst)(_.snd); })); }; }; },
    }); })); });
    Transducible.instantiate = (function () { return function (_) { return Common_1.merge(_, Transducible.Ext(_)); }; });
})(Transducible || (Transducible = {}));
exports.Transducible = Transducible;
exports.ITransducible = Transducible;
var Transducible1;
(function (Transducible1) {
    Transducible1.Ext = (function (TransducibleF) { return (Common_1.define(function (Ext) { return ({
        reduce_: function (reducer) { return function (b) { return function (transducibleA) { return (Common_1.apply((TransducibleF._reduce(reducer.step)(reducer.state)(b)(transducibleA)))(function (_) { return reducer.complete(_.fst)(_.snd); })); }; }; },
    }); })); });
    Transducible1.instantiate = (function () { return function (_) { return Common_1.merge(_, Transducible1.Ext(_)); }; });
})(Transducible1 || (Transducible1 = {}));
exports.Transducible1 = Transducible1;
exports.ITransducible1 = Transducible1;
exports.default = Transducible;
