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
exports.Monoid = exports.Semigroup = exports.create = exports.get = exports.Sum = exports.URI = void 0;
var Semigroup_1 = require("../Semigroup");
var Monoid_1 = require("../Monoid");
var common_1 = require("../../util/common");
var URI = common_1.S('Sum');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
var create_ = (function (value) { return ({ URI: URI, value: value }); });
exports.create = create_;
/** Num a => Semigroup (Sum a) */
var Semigroup = function (_) { return ((function (NumA) {
    if (NumA === void 0) { NumA = _; }
    return (Semigroup_1.ISemigroup.instantiate({
        append: function (sum0) { return function (sum1) { return Sum(NumA.add(sum0.value)(sum1.value)); }; }
    }));
})()); };
exports.Semigroup = Semigroup;
/** Num a => Monoid (Sum a) */
var Monoid = function (_) { return ((function (NumA) {
    if (NumA === void 0) { NumA = _; }
    return (Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup(NumA)), { mempty: function () { return Sum(NumA.zero()); } })));
})()); };
exports.Monoid = Monoid;
var Sum = common_1.Json.assign(function (value) { return ({ URI: URI, value: value }); }, {
    URI: URI,
    get: get,
    create: create_,
    Semigroup: Semigroup,
    Monoid: Monoid
});
exports.Sum = Sum;
exports["default"] = Sum;
