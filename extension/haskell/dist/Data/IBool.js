"use strict";
exports.__esModule = true;
exports.CBool = exports.Bool = void 0;
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var Bool = {
    not: function (bool0) { return ts_toolbelt_1.cast(bool0.not())(); },
    and: function (bool0) { return function (bool1) { return ts_toolbelt_1.cast(bool0.and(bool1))(); }; },
    or: function (bool0) { return function (bool1) { return ts_toolbelt_1.cast(bool0.or(bool1))(); }; }
};
exports.Bool = Bool;
exports.CBool = Bool;
exports["default"] = Bool;
