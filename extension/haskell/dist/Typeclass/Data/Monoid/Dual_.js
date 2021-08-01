"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monoid = exports.Semigroup = exports.mempty = exports.append = exports.create = exports.get = exports.Dual = exports.URI = void 0;
var Semigroup_1 = require("../Semigroup");
var Monoid_1 = require("../Monoid");
var common_1 = require("../../../Common/common");
var URI = common_1.S('Dual');
exports.URI = URI;
var get = function (_) { return _.value; };
exports.get = get;
var createDual = (function (value) { return ({ URI: URI, value: value }); });
exports.create = createDual;
var append = (function (SemigroupA) { return function (dual0) { return function (dual1) { return createDual(SemigroupA.append(dual1.value)(dual0.value)); }; }; });
exports.append = append;
var mempty = (function (Monoid) { return function () { return Dual(Monoid.mempty()); }; });
exports.mempty = mempty;
/** Semigroup a => Semigroup (Dual a) */
var Semigroup = function (_) { return (Semigroup_1.ISemigroup.instantiate()(common_1.create({
    append: append(_)
}))); };
exports.Semigroup = Semigroup;
var Monoid = function (_) { return (Monoid_1.IMonoid.instantiate()(common_1.merge(Semigroup(_), common_1.create({
    mempty: mempty(_),
})))); };
exports.Monoid = Monoid;
var Dual = (common_1.Json.assign(createDual, {
    URI: URI,
    get: get,
    create: createDual,
    Semigroup: Semigroup,
    Monoid: Monoid,
    append: append,
    mempty: mempty,
}));
exports.Dual = Dual;
exports.default = Dual;
