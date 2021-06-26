"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Monoid = exports.Semigroup = exports.Show = exports.get = exports.Sum = exports.URI = void 0;
var Monoid_1 = require("../Monoid");
var String_1 = require("../String");
var common_1 = require("../../util/common");
var URI = common_1.S('Sum');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
/** Show a => Show (Sum a) */
var Show = (function (ShowA) { return ({
    show: function (sumA) { return (common_1.assign(String_1.String('Sum('))(function (_) { return common_1.assign(String_1.String.Semigroup.append(_)(String_1.String.fromI(ShowA.show(sumA.value)))); })(function (_) { return String_1.String.Semigroup.append(_)(String_1.String(')')); })); }
}); });
exports.Show = Show;
/** Num a => Semigroup (Sum a) */
var Semigroup = (function (NumA) { return ({
    append: function (sum0) { return function (sum1) { return Sum(NumA.add(sum0.value)(sum1.value)); }; }
}); });
exports.Semigroup = Semigroup;
/** Num a => Monoid (Sum a) */
var Monoid = (function (NumA) { return (common_1.assign(__assign(__assign({}, Semigroup(NumA)), { mempty: function () { return Sum(NumA.zero()); } }))(function (_) { return common_1.Json.assign(_, Monoid_1.IMonoid.Ext(_)); })); });
exports.Monoid = Monoid;
var Sum = common_1.Json.assign(function (value) { return ({ URI: URI, value: value }); }, {
    URI: URI,
    get: get,
    Show: Show,
    Semigroup: Semigroup,
    Monoid: Monoid
});
exports.Sum = Sum;
exports["default"] = Sum;