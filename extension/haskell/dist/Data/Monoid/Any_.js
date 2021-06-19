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
exports.Monoid = exports.Semigroup = exports.get = exports.Any = exports.URI = void 0;
var Monoid_1 = require("../Monoid");
var IBool_1 = require("../IBool");
var common_1 = require("../../util/common");
var URI = common_1.S('Any');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
/** Semigroup Any */
var Semigroup = ({
    append: function (any0) { return function (any1) { return Any(IBool_1.IBool.or(any0.value)(any1.value)); }; }
});
exports.Semigroup = Semigroup;
/** Monoid Any */
var Monoid = (common_1.assign(__assign(__assign({}, Semigroup), { mempty: function () { return Any(IBool_1.IBool.False); } }))(function (_) { return common_1.Json.assign(_, Monoid_1.IMonoid.Ext(_)); }));
exports.Monoid = Monoid;
var Any = common_1.Json.assign(function (value) { return ({ URI: URI, value: value }); }, {
    URI: URI,
    get: get,
    Semigroup: Semigroup,
    Monoid: Monoid
});
exports.Any = Any;
exports["default"] = Any;
