"use strict";
exports.__esModule = true;
exports.Bifunctor2 = void 0;
var Function_1 = require("./Function");
var Bifunctor2;
(function (Bifunctor2) {
    Bifunctor2.Ext = (function (Bifunctor) { return (Function_1.Function.define(function (Ext) { return ({
        lmap: function (f) { return function (bifunctor) { return (Bifunctor.bimap(f)(Function_1.Function.id())(bifunctor)); }; },
        rmap: function (f) { return function (bifunctor) { return (Bifunctor.bimap(Function_1.Function.id())(f)(bifunctor)); }; }
    }); })); });
})(Bifunctor2 || (Bifunctor2 = {}));
exports.Bifunctor2 = Bifunctor2;
