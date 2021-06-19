"use strict";
exports.__esModule = true;
exports.Eq = exports.Num = exports.negate = exports.mul = exports.sub = exports.add = exports.IInt = void 0;
var Num_1 = require("../GHC/Num");
var Eq_1 = require("./Eq");
var IBool_1 = require("./IBool");
var common_1 = require("../util/common");
var add = (function (int0) { return function (int1) { return common_1.cast({ value: int0.value + int1.value })(); }; });
exports.add = add;
var sub = (function (int0) { return function (int1) { return common_1.cast({ value: int0.value - int1.value })(); }; });
exports.sub = sub;
var mul = (function (int0) { return function (int1) { return common_1.cast({ value: int0.value * int1.value })(); }; });
exports.mul = mul;
var negate = (function (int) { return common_1.cast({ value: -int.value })(); });
exports.negate = negate;
var Num = (common_1.assign({
    add: add,
    sub: sub,
    mul: mul,
    zero: function () { return ({ value: 0 }); },
    one: function () { return ({ value: 1 }); },
    abs: function (int) { return ({ value: Math.abs(int.value) }); }
})(function (_) { return common_1.Json.assign(_, Num_1.INum.Ext(_)); }));
exports.Num = Num;
var Eq = (common_1.assign(({
    eq: function (int0) { return function (int1) { return IBool_1.IBool(int0.value == int1.value); }; }
}))(function (Eq) { return common_1.Json.assign(Eq, Eq_1.IEq.Ext(Eq)); }));
exports.Eq = Eq;
var IInt = common_1.Json.assign(function (value) { return ({ value: value }); }, {
    add: add,
    sub: sub,
    mul: mul,
    negate: negate,
    Num: Num,
    Eq: Eq
});
exports.IInt = IInt;
exports["default"] = IInt;
