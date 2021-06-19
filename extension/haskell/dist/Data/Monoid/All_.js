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
exports.Monoid = exports.Semigroup = exports.get = exports.All = exports.URI = void 0;
var Monoid_1 = require("../Monoid");
var IBool_1 = require("../IBool");
var common_1 = require("../../util/common");
var URI = common_1.S('All');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
/** Semigroup All */
var Semigroup = ({
    append: function (_0) { return function (_1) { return All(IBool_1.IBool.and(_0.value)(_1.value)); }; }
});
exports.Semigroup = Semigroup;
/** Monoid All */
var Monoid = (common_1.assign(__assign(__assign({}, Semigroup), { mempty: function () { return All(IBool_1.IBool.True); } }))(function (_) { return common_1.Json.assign(_, Monoid_1.IMonoid.Ext(_)); }));
exports.Monoid = Monoid;
var All = common_1.Json.assign(function (value) { return ({ URI: URI, value: value }); }, {
    URI: URI,
    get: get,
    Semigroup: Semigroup,
    Monoid: Monoid
});
exports.All = All;
exports["default"] = All;
