"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monoid = exports.Semigroup = exports.mempty = exports.append = exports.create = exports.get = exports.Endo = exports.URI = void 0;
var Semigroup_1 = require("../Semigroup");
var Monoid_1 = require("../Monoid");
var common_1 = require("../../../Common/common");
var URI = common_1.S('Endo');
exports.URI = URI;
var get = function (_) { return _.fn; };
exports.get = get;
var createEndo = (function (fn) { return ({ URI: URI, fn: fn }); });
exports.create = createEndo;
var append = (function () { return function (endo0) { return function (endo1) { return Endo(common_1.compose(endo0.fn, endo1.fn)); }; }; });
exports.append = append;
var mempty = (function () { return function () { return Endo(common_1.id); }; });
exports.mempty = mempty;
var Semigroup = function () { return Semigroup_1.ISemigroup.instantiate()(common_1.create({
    append: append(),
})); };
exports.Semigroup = Semigroup;
var Monoid = function () { return (Monoid_1.IMonoid.instantiate()(common_1.merge(Semigroup(), common_1.create({
    mempty: mempty(),
})))); };
exports.Monoid = Monoid;
var Endo = (common_1.Json.assign(createEndo, {
    URI: URI,
    get: get,
    create: createEndo,
    Semigroup: Semigroup,
    Monoid: Monoid,
    append: append,
    mempty: mempty,
}));
exports.Endo = Endo;
exports.default = Endo;
