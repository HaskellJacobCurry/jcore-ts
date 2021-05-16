"use strict";
exports.__esModule = true;
exports.Bool = void 0;
var ts_toolbelt_1 = require("../../ts-toolbelt");
var Bool;
(function (Bool) {
    Bool.not = function (bool) { return ts_toolbelt_1.polymorph(bool.not()); };
    Bool.and = function (bool0) { return function (bool1) { return ts_toolbelt_1.polymorph(bool0.and(bool1)); }; };
    Bool.or = function (bool0) { return function (bool1) { return ts_toolbelt_1.polymorph(bool0.or(bool1)); }; };
})(Bool || (Bool = {}));
exports.Bool = Bool;
