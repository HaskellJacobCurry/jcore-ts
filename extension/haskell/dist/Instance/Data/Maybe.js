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
exports.Maybe = exports.Foldable = exports.Monoid = exports.Semigroup = exports.Monad = exports.Bind = exports.Applicative = exports.Apply = exports.Functor = exports.Show = exports.show = void 0;
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
var Show = function (_) { return Common_1.apply(_)(function (ShowA) { return (Show_1.IShow.instantiate({
    show: show(ShowA),
})); }); };
exports.Show = Show;
var Functor = Functor_1.Functor1.instantiate({
    URI: Maybe_1.URI,
    fmap: function (f) { return function (maybeA) { return (Common_1.apply(maybeA.cata({
        Nothing: function () { return Maybe_1.Maybe.Nothing; },
        Just: function (value) { return Maybe_1.Maybe.Just(f(value)); },
    }))(Maybe_1.Maybe.infer)); }; },
});
exports.Functor = Functor;
var Apply = Apply_1.Apply1.instantiate(__assign(__assign({}, Functor), { ap: function (maybeF) { return function (maybeA) { return (Common_1.apply(maybeF.cata({
        Just: function (f) { return Functor.fmap(f)(Common_1.reinterpret(maybeA)); },
        Nothing: function () { return Maybe_1.Maybe.Nothing; },
    }))(Maybe_1.Maybe.infer)); }; }, liftA2: Common_1.reinterpret() }));
exports.Apply = Apply;
var Applicative = Applicative_1.Applicative1.instantiate(__assign(__assign({}, Apply), { pure: Maybe_1.Maybe.Just }));
exports.Applicative = Applicative;
var Bind = Bind_1.Bind1.instantiate(__assign(__assign({}, Apply), { bind: function (maybeA) { return function (f) { return (Common_1.apply(maybeA.cata({
        Just: f,
        Nothing: function () { return Maybe_1.Maybe.Nothing; },
    }))(Maybe_1.Maybe.infer)); }; } }));
exports.Bind = Bind;
var Monad = Monad_1.Monad1.instantiate(__assign(__assign({}, Applicative), Bind));
exports.Monad = Monad;
var Semigroup = function (_) { return ((function (SemigroupA) {
    if (SemigroupA === void 0) { SemigroupA = _; }
    return (Semigroup_1.ISemigroup.instantiate({
        append: function (maybe0) { return function (maybe1) { return (maybe0.cata({
            Nothing: function () { return maybe1; },
            Just: function (value0) { return (maybe1.cata({
                Nothing: function () { return maybe0; },
                Just: function (value1) { return Maybe_1.Maybe.Just(SemigroupA.append(value0)(value1)); },
            })); }
        })); }; },
    }));
})()); };
exports.Semigroup = Semigroup;
var Monoid = function (_) { return ((function (SemigroupA) {
    if (SemigroupA === void 0) { SemigroupA = _; }
    return (Monoid_1.IMonoid.instantiate(__assign(__assign({}, Semigroup(SemigroupA)), { mempty: function () { return Common_1.reinterpret(Maybe_1.Maybe.Nothing); } })));
})()); };
exports.Monoid = Monoid;
var Foldable = Foldable_1.Foldable1.instantiate({
    URI: Maybe_1.URI,
    foldMap: function (Monoid) { return Maybe_1.Maybe.maybe(Monoid.mempty()); },
    foldr: Common_1.placeholder(),
});
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
}));
exports.Maybe = _Maybe;
exports.default = _Maybe;
