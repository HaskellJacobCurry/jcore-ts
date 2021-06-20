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
exports.Foldable = exports.Monoid = exports.Semigroup = exports.Monad = exports.Bind = exports.Applicative = exports.Apply = exports.Functor = exports.Show = exports.maybe = exports.infer = exports.Just = exports.Nothing = exports.Maybe = exports.URI = void 0;
var Show_1 = require("./Show");
var Functor_1 = require("./Functor");
var Apply_1 = require("../Control/Apply");
var Applicative_1 = require("../Control/Applicative");
var Bind_1 = require("../Control/Bind");
var Monad_1 = require("../Control/Monad");
var Semigroup_1 = require("./Semigroup");
var Monoid_1 = require("./Monoid");
var Foldable_1 = require("./Foldable");
var String_1 = require("./String");
var common_1 = require("../util/common");
var URI = common_1.S('Maybe');
exports.URI = URI;
var Nothing = (common_1.Json.assign({ tag: 'Nothing' }, { URI: URI }, {
    cata: function (fs) { return fs['Nothing'](); }
}));
exports.Nothing = Nothing;
var Just = (function (value) { return (common_1.Json.assign({ tag: 'Just', value: value }, { URI: URI }, {
    cata: function (fs) { return fs['Just'](value); }
})); });
exports.Just = Just;
var infer = (function (maybe) { return common_1.reinterpret(maybe); });
exports.infer = infer;
/** maybe :: b -> (a -> b) -> Maybe a -> b */
var maybe = (function (b) { return function (f) { return function (maybeA) { return (maybeA.cata({
    Nothing: function () { return b; },
    Just: function (a) { return f(a); }
})); }; }; });
exports.maybe = maybe;
var Show = function (_) { return ((function (ShowA) {
    if (ShowA === void 0) { ShowA = _; }
    return (Show_1.IShow.enhance({
        show: function (maybeA) { return maybeA.cata({
            Nothing: function () { return String_1.String('Nothing'); },
            Just: function (value) { return String_1.String("Just(" + ShowA.show(value) + ")"); }
        }); }
    }));
})()); };
exports.Show = Show;
var Functor = Functor_1.Functor1.enhance({
    URI: URI,
    fmap: function (f) { return function (maybeA) { return infer(maybeA.cata({
        Nothing: function () { return Nothing; },
        Just: function (value) { return Just(f(value)); }
    })); }; }
});
exports.Functor = Functor;
var Apply = Apply_1.Apply1.enhance(__assign(__assign({}, Functor), { ap: function (maybeF) { return function (maybeA) { return infer(maybeF.cata({
        Just: function (f) { return Functor.fmap(f)(common_1.reinterpret(maybeA)); },
        Nothing: function () { return Nothing; }
    })); }; }, liftA2: common_1.reinterpret() }));
exports.Apply = Apply;
var Applicative = Applicative_1.Applicative1.enhance(__assign(__assign({}, Apply), { pure: Just }));
exports.Applicative = Applicative;
var Bind = Bind_1.Bind1.enhance(__assign(__assign({}, Apply), { bind: function (maybeA) { return function (f) { return infer(maybeA.cata({
        Just: f,
        Nothing: function () { return Nothing; }
    })); }; } }));
exports.Bind = Bind;
var Monad = Monad_1.Monad1.enhance(__assign(__assign({}, Applicative), Bind));
exports.Monad = Monad;
var Semigroup = function (_) { return ((function (SemigroupA) {
    if (SemigroupA === void 0) { SemigroupA = _; }
    return (Semigroup_1.ISemigroup.enhance({
        append: function (maybe0) { return function (maybe1) { return (maybe0.cata({
            Nothing: function () { return maybe1; },
            Just: function (value0) { return (maybe1.cata({
                Nothing: function () { return maybe0; },
                Just: function (value1) { return Just(SemigroupA.append(value0)(value1)); }
            })); }
        })); }; }
    }));
})()); };
exports.Semigroup = Semigroup;
var Monoid = function (_) { return ((function (SemigroupA) {
    if (SemigroupA === void 0) { SemigroupA = _; }
    return (Monoid_1.IMonoid.enhance(__assign(__assign({}, Semigroup(SemigroupA)), { mempty: function () { return common_1.reinterpret(Nothing); } })));
})()); };
exports.Monoid = Monoid;
var Foldable = Foldable_1.Foldable1.enhance({
    URI: URI,
    foldMap: function (Monoid) { return maybe(Monoid.mempty()); },
    foldr: common_1.reinterpret()
});
exports.Foldable = Foldable;
var Maybe = {
    URI: URI,
    Nothing: Nothing,
    Just: Just,
    infer: infer,
    maybe: maybe,
    Show: Show,
    Functor: Functor,
    Apply: Apply,
    Applicative: Applicative,
    Bind: Bind,
    Monad: Monad,
    Semigroup: Semigroup,
    Monoid: Monoid,
    Foldable: Foldable
};
exports.Maybe = Maybe;
exports["default"] = Maybe;
