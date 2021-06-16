"use strict";
exports.__esModule = true;
exports.negate = exports.multiply = exports.subtract = exports.add = exports.IInt = void 0;
var common_1 = require("../util/common");
var add = (function (int0) { return function (int1) { return common_1.cast({ value: int0.value + int1.value })(); }; });
exports.add = add;
var subtract = (function (int0) { return function (int1) { return common_1.cast({ value: int0.value - int1.value })(); }; });
exports.subtract = subtract;
var multiply = (function (int0) { return function (int1) { return common_1.cast({ value: int0.value * int1.value })(); }; });
exports.multiply = multiply;
var negate = (function (int) { return common_1.cast({ value: -int.value })(); });
exports.negate = negate;
var IInt = common_1.Json.assign(function (value) { return ({ value: value }); }, {
    add: add,
    subtract: subtract,
    multiply: multiply,
    negate: negate
});
exports.IInt = IInt;
exports["default"] = IInt;
