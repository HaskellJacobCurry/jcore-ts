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
exports.Maybe = exports.Foldable = exports.Monoid = exports.Semigroup = exports.Monad = exports.Bind = exports.Applicative = exports.Apply = exports.Functor = exports.Show = exports.foldMap = exports.mempty = exports.append = exports.pure = exports.ap = exports.fmap = exports.bind = exports.show = void 0;
var Maybe_1 = require("../../DataStructure/Data/Maybe");
var String_1 = require("./String");
var Show_1 = require("../../Typeclass/Data/Show");
var Functor_1 = require("../../Typeclass/Data/Functor");
var Apply_1 = require("../../Typeclass/Control/Apply");
var Applicative_1 = require("../../Typeclass/Control/Applicative");
var Bind_1 = require("../../Typeclass/Control/Bind");
var Monad_1 = require("../../Typeclass/Control/Monad");
var Semigroup_1 = require("../../Typeclass/Data/Semigroup");
var Monoid_1 = require("../../Typeclass/Data/Monoid");
var Foldable_1 = require("../../Typeclass/Data/Foldable");
var Common_1 = require("../../Common");
__exportStar(require("../../DataStructure/Data/Maybe"), exports);
var show = (function (ShowA) { return function (maybeA) { return (maybeA.cata({
    Nothing: function () { return String_1.String('Nothing'); },
    Just: function (value) { return (Common_1.apply(String_1.String.append(String_1.String('(Just '))(String_1.String.fromI(ShowA.show(value))))(function (_) { return String_1.String.append(_)(String_1.String(')')); })); },
})); }; });
exports.show = show;
var bind = (function (maybeA) { return function (f) { return (Common_1.apply(maybeA.cata({
    Just: f,
    Nothing: function () { return Maybe_1.Maybe.Nothing; },
}))(Maybe_1.Maybe.infer)); }; });
exports.bind = bind;
var fmap = (function (f) { return function (maybeA) { return (Common_1.apply(maybeA.cata({
    Nothing: function () { return Maybe_1.Maybe.Nothing; },
    Just: function (value) { return Maybe_1.Maybe.Just(f(value)); },
}))(Maybe_1.Maybe.infer)); }; });
exports.fmap = fmap;
var ap = (function (maybeF) { return function (maybeA) { return (Common_1.apply(maybeF.cata({
    Just: function (f) { return Functor.fmap(f)(Common_1.reinterpret(maybeA)); },
    Nothing: function () { return Maybe_1.Maybe.Nothing; },
}))(Maybe_1.Maybe.infer)); }; });
exports.ap = ap;
var pure = (Maybe_1.Maybe.Just);
exports.pure = pure;
var append = (function (SemigroupA) { return function (maybe0) { return function (maybe1) { return (maybe0.cata({
    Nothing: function () { return maybe1; },
    Just: function (value0) { return (maybe1.cata({
        Nothing: function () { return maybe0; },
        Just: function (value1) { return Maybe_1.Maybe.Just(SemigroupA.append(value0)(value1)); },
    })); }
})); }; }; });
exports.append = append;
var mempty = (Maybe_1.Maybe.Nothing_);
exports.mempty = mempty;
var foldMap = (function (Monoid) { return Maybe_1.Maybe.maybe(Monoid.mempty()); });
exports.foldMap = foldMap;
var Show = function (_) { return Show_1.IShow.instantiate()(Common_1.create({
    show: show(_),
})); };
exports.Show = Show;
var Functor = Functor_1.Functor1.instantiate()(Common_1.create({
    URI: Maybe_1.URI,
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
var Semigroup = function (_) { return (Semigroup_1.ISemigroup.instantiate()(Common_1.create({
    append: append(_),
}))); };
exports.Semigroup = Semigroup;
var Monoid = function (_) { return Monoid_1.IMonoid.instantiate()(Common_1.merge(Semigroup(_), Common_1.create({
    mempty: mempty
}))); };
exports.Monoid = Monoid;
var Foldable = Foldable_1.Foldable1.instantiate()(Common_1.create({
    URI: Maybe_1.URI,
    foldMap: foldMap,
    foldr: Common_1.placeholder(),
}));
exports.Foldable = Foldable;
var _Maybe = (Common_1.Json.assign(Maybe_1.Maybe, {
    Show: Show,
    Functor: Functor,
    Apply: Apply,
    Applicative: Applicative,
    Bind: Bind,
    Monad: Monad,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Foldable: Foldable,
    show: show,
    bind: bind,
    fmap: fmap,
    ap: ap,
    pure: pure,
    append: append,
    mempty: mempty,
    foldMap: foldMap,
}));
exports.Maybe = _Maybe;
exports.default = _Maybe;
