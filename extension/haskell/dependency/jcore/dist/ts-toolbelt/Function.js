"use strict";
exports.__esModule = true;
exports.Function = void 0;
var Function;
(function (Function) {
    Function.validate = function (a) { return typeof a === 'function'; };
    Function.define = function (f) { return ((function (a) { return ((function (x) { return x(x); })(function (x) { return f(function () { return a || (a = x(x)); }); })); })()); };
    Function.assign = function (f) { return function (g) { return g(f()); }; };
})(Function = exports.Function || (exports.Function = {}));
exports["default"] = Function;
