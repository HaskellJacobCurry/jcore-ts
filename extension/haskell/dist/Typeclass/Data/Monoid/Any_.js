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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monoid = exports.Semigroup = exports.create = exports.get = exports.Any = exports.URI = void 0;
var Semigroup_1 = require("../Semigroup");
var Monoid_1 = require("../Monoid");
var IBool_1 = require("../IBool");
var common_1 = require("../../../Common/common");
var URI = common_1.S('Any');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
var createAny = (function (value) { return ({ URI: URI, value: value }); });
exports.create = createAny;
/** Semigroup Any */
var Semigroup = Semigroup_1.ISemigroup.instantiate({
    append: function (any0) { return function (any1) { return createAny(IBool_1.IBool.or(any0.value)(any1.value)); }; },
});
exports.Semigroup = Semigroup;
/** Monoid Any */
var Monoid = Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup), { mempty: function () { return createAny(IBool_1.IBool.False); } }));
exports.Monoid = Monoid;
var Any = (common_1.Json.assign(createAny, {
    URI: URI,
    get: get,
    create: createAny,
    Semigroup: Semigroup,
    Monoid: Monoid,
}));
exports.Any = Any;
exports.default = Any;
