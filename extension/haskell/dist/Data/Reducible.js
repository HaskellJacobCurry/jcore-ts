"use strict";
exports.__esModule = true;
exports.IReducible1 = exports.Reducible1 = exports.IReducible = exports.Reducible = void 0;
var util_1 = require("../util");
var Reducible;
(function (Reducible) {
    Reducible.Ext = (function (ReducibleF) { return (util_1.define(function (Ext) { return ({
        transduce: function (transducer) { return function (reducer) { return ReducibleF.reduce(transducer(reducer)); }; }
    }); })); });
    Reducible.instantiate = function (_) { return (util_1.Json.assign(_, Reducible.Ext(_))); };
})(Reducible || (Reducible = {}));
exports.Reducible = Reducible;
exports.IReducible = Reducible;
var Reducible1;
(function (Reducible1) {
    Reducible1.Ext = (function (ReducibleF) { return (util_1.define(function (Ext) { return ({
        transduce: function (transducer) { return function (reducer) { return ReducibleF.reduce(transducer(reducer)); }; }
    }); })); });
    Reducible1.instantiate = function (_) { return (util_1.Json.assign(_, Reducible1.Ext(_))); };
})(Reducible1 || (Reducible1 = {}));
exports.Reducible1 = Reducible1;
exports.IReducible1 = Reducible1;
exports["default"] = Reducible;
