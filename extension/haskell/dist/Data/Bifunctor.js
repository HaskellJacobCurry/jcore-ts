"use strict";
exports.__esModule = true;
exports.Bifunctor2 = exports.IBifunctor = exports.Bifunctor = void 0;
var common_1 = require("../util/common");
var Bifunctor;
(function (Bifunctor) {
    Bifunctor.Ext = (function (BifunctorF) { return (common_1.define(function (Ext) { return ({
        lmap: function (f) { return function (bifunctor) { return (BifunctorF.bimap(f)(common_1.id_())(bifunctor)); }; },
        rmap: function (f) { return function (bifunctor) { return (BifunctorF.bimap(common_1.id_())(f)(bifunctor)); }; }
    }); })); });
    Bifunctor.instantiate = function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Bifunctor.Ext(_)); })); };
})(Bifunctor || (Bifunctor = {}));
exports.Bifunctor = Bifunctor;
exports.IBifunctor = Bifunctor;
var Bifunctor2;
(function (Bifunctor2) {
    Bifunctor2.Ext = (function (BifunctorF) { return (common_1.define(function (Ext) { return ({
        lmap: function (f) { return function (bifunctor) { return (BifunctorF.bimap(f)(common_1.id_())(bifunctor)); }; },
        rmap: function (f) { return function (bifunctor) { return (BifunctorF.bimap(common_1.id_())(f)(bifunctor)); }; }
    }); })); });
    Bifunctor2.instantiate = function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Bifunctor2.Ext(_)); })); };
})(Bifunctor2 || (Bifunctor2 = {}));
exports.Bifunctor2 = Bifunctor2;
exports["default"] = Bifunctor;
