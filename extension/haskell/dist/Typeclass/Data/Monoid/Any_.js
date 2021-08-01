"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monoid = exports.Semigroup = exports.mempty = exports.append = exports.create = exports.get = exports.Any = exports.URI = void 0;
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
var append = (function (any0) { return function (any1) { return createAny(IBool_1.IBool.or(any0.value)(any1.value)); }; });
exports.append = append;
var mempty = (function () { return createAny(IBool_1.IBool.False); });
exports.mempty = mempty;
/** Semigroup Any */
var Semigroup = Semigroup_1.ISemigroup.instantiate()(common_1.create({
    append: append,
}));
exports.Semigroup = Semigroup;
/** Monoid Any */
var Monoid = Monoid_1.IMonoid.instantiate()(common_1.merge(Semigroup, common_1.create({
    mempty: mempty,
})));
exports.Monoid = Monoid;
var Any = (common_1.Json.assign(createAny, {
    URI: URI,
    get: get,
    create: createAny,
    Semigroup: Semigroup,
    Monoid: Monoid,
    append: append,
    mempty: mempty,
}));
exports.Any = Any;
exports.default = Any;
