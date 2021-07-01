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
exports.Monoid = exports.Semigroup = exports.create = exports.get = exports.Dual = exports.URI = void 0;
var Semigroup_1 = require("../Semigroup");
var Monoid_1 = require("../Monoid");
var common_1 = require("../../util/common");
var URI = common_1.S('Dual');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
var create_ = (function (value) { return ({ URI: URI, value: value }); });
exports.create = create_;
/** Semigroup a => Semigroup (Dual a) */
var Semigroup = function (_) { return ((function (SemigroupA) {
    if (SemigroupA === void 0) { SemigroupA = _; }
    return (Semigroup_1.ISemigroup.instantiate({
        append: function (dual0) { return function (dual1) { return create_(SemigroupA.append(dual1.value)(dual0.value)); }; }
    }));
})()); };
exports.Semigroup = Semigroup;
var Monoid = function (_) { return ((function (MonoidA) {
    if (MonoidA === void 0) { MonoidA = _; }
    return (Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup(MonoidA)), { mempty: function () { return Dual(MonoidA.mempty()); } })));
})()); };
exports.Monoid = Monoid;
var Dual = common_1.Json.assign(create_, {
    URI: URI,
    get: get,
    create: create_,
    Semigroup: Semigroup,
    Monoid: Monoid
});
exports.Dual = Dual;
exports["default"] = Dual;
