"use strict";
exports.__esModule = true;
exports.Eq = void 0;
var IBool_1 = require("./IBool");
var Eq;
(function (Eq) {
    Eq.eq = function (eq0) { return function (eq1) { return eq0.eq(eq1); }; };
    Eq.notEq = function (eq0) { return function (eq1) { return IBool_1.Bool.not(eq0.eq(eq1)); }; };
})(Eq = exports.Eq || (exports.Eq = {}));
