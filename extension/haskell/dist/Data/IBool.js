"use strict";
exports.__esModule = true;
exports.or = exports.and = exports.not = exports.IBool = void 0;
var common_1 = require("../util/common");
var not = (function (bool) { return common_1.cast(bool.not())(); });
exports.not = not;
var and = (function (bool0) { return function (bool1) { return common_1.cast(bool0.and(bool1))(); }; });
exports.and = and;
var or = (function (bool0) { return function (bool1) { return common_1.cast(bool0.or(bool1))(); }; });
exports.or = or;
var IBool = {
    not: not,
    and: and,
    or: or
};
exports.IBool = IBool;
exports["default"] = IBool;
