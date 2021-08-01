"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array = exports.Populatable = exports.Monad = exports.Bind = exports.Applicative = exports.Apply = exports.Functor = exports.populate = exports.seed = exports.bind = exports.pure = exports.ap = exports.fmap = void 0;
var Array_1 = require("../../DataStructure/Mutable/Array");
var Functor_1 = require("../../Typeclass/Data/Functor");
var Apply_1 = require("../../Typeclass/Control/Apply");
var Applicative_1 = require("../../Typeclass/Control/Applicative");
var Bind_1 = require("../../Typeclass/Control/Bind");
var Monad_1 = require("../../Typeclass/Control/Monad");
var Populatable_1 = require("../../Typeclass/Data/Populatable");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Mutable/Array"), exports);
var fmap = (function (f) { return Array_1.Array.map(function () { return f; }); });
exports.fmap = fmap;
var ap = (function (fs) { return function (as) { return (Common_1.apply(fmap(function (f) { return (fmap(f)(as)); })(fs))(Array_1.Array.concat)); }; });
exports.ap = ap;
var pure = (Array_1.Array.singleton);
exports.pure = pure;
var bind = (function (as) { return function (f) { return Array_1.Array.concatMap(f)(as); }; });
exports.bind = bind;
var seed = (Array_1.Array.empty);
exports.seed = seed;
var populate = (function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    return function (arrayA) { return (Array_1.Array.concatMT(Array_1.Array(as))(arrayA)); };
});
exports.populate = populate;
var Functor = Functor_1.Functor1.instantiate()(Common_1.create({
    URI: Array_1.URI,
    fmap: fmap,
}));
exports.Functor = Functor;
var Apply = Apply_1.Apply1.instantiate()(Common_1.merge(Functor, Common_1.create({
    ap: ap,
    liftA2: Common_1._(),
})));
exports.Apply = Apply;
var Applicative = Applicative_1.Applicative1.instantiate()(Common_1.merge(Apply, Common_1.create({
    pure: pure,
})));
exports.Applicative = Applicative;
var Bind = Bind_1.Bind1.instantiate()(Common_1.merge(Apply, Common_1.create({
    bind: bind,
})));
exports.Bind = Bind;
var Monad = Monad_1.Monad1.instantiate()(Common_1.merge(Applicative, Bind));
exports.Monad = Monad;
var Populatable = Populatable_1.Populatable1.instantiate()(Common_1.create({
    URI: Array_1.URI,
    seed: seed,
    populate: populate,
}));
exports.Populatable = Populatable;
var _Array = (Common_1.merge(Array_1.Array, {
    Functor: Functor,
    Apply: Apply,
    Applicative: Applicative,
    Bind: Bind,
    Monad: Monad,
    Populatable: Populatable,
    fmap: fmap,
    ap: ap,
    pure: pure,
    bind: bind,
    seed: seed,
    populate: populate,
}));
exports.Array = _Array;
