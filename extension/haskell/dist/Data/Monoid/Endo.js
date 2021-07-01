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
exports.Monoid = exports.Semigroup = exports.create = exports.get = exports.Endo = exports.URI = void 0;
var Semigroup_1 = require("../Semigroup");
var Monoid_1 = require("../Monoid");
var common_1 = require("../../util/common");
var URI = common_1.S('Endo');
exports.URI = URI;
var get = function (_) { return _.fn; };
exports.get = get;
var create_ = (function (fn) { return ({ URI: URI, fn: fn }); });
exports.create = create_;
var Semigroup = function () { return Semigroup_1.ISemigroup.instantiate({
    append: function (endo0) { return function (endo1) { return Endo(common_1.compose(endo0.fn, endo1.fn)); }; }
}); };
exports.Semigroup = Semigroup;
var Monoid = function () { return Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup()), { mempty: function () { return Endo(common_1.id); } })); };
exports.Monoid = Monoid;
var Endo = common_1.Json.assign(function (fn) { return ({ URI: URI, fn: fn }); }, {
    URI: URI,
    get: get,
    create: create_,
    Semigroup: Semigroup,
    Monoid: Monoid
});
exports.Endo = Endo;
exports["default"] = Endo;
