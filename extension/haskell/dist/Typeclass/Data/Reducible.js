"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IReducible1 = exports.Reducible1 = exports.IReducible = exports.Reducible = void 0;
var Common_1 = require("../../Common");
var Reducible;
(function (Reducible) {
    Reducible.Ext = (function (ReducibleF) { return (Common_1.define(function (Ext) { return ({
        transduce: function (transducer) { return function (reducer) { return ReducibleF.reduce(transducer(reducer)); }; },
    }); })); });
    Reducible.instantiate = (function () { return function (_) { return Common_1.merge(_, Reducible.Ext(_)); }; });
})(Reducible || (Reducible = {}));
exports.Reducible = Reducible;
exports.IReducible = Reducible;
var Reducible1;
(function (Reducible1) {
    Reducible1.Ext = (function (ReducibleF) { return (Common_1.define(function (Ext) { return ({
        transduce: function (transducer) { return function (reducer) { return ReducibleF.reduce(transducer(reducer)); }; },
    }); })); });
    Reducible1.instantiate = (function () { return function (_) { return Common_1.merge(_, Reducible1.Ext(_)); }; });
})(Reducible1 || (Reducible1 = {}));
exports.Reducible1 = Reducible1;
exports.IReducible1 = Reducible1;
exports.default = Reducible;
