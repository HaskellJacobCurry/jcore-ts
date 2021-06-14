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
exports.Foldable = exports.Monoid = exports.Monad = exports.Bind = exports.Applicative = exports.Apply = exports.Functor = exports.Show = exports.maybe = exports.infer = exports.Just = exports.Nothing = exports.Maybe = exports.URI = void 0;
var Apply_1 = require("../Control/Apply");
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
var Show = (function (Show) { return ({
    show: function (maybeA) { return maybeA.cata({
        Nothing: function () { return String_1.String('Nothing'); },
        Just: function (value) { return String_1.String("Just(" + Show.show(value) + ")"); }
    }); }
}); });
exports.Show = Show;
var Functor = ({
    URI: URI,
    fmap: function (f) { return function (maybeA) { return (Maybe.infer(maybeA.cata({
        Nothing: function () { return Nothing; },
        Just: function (value) { return Just(f(value)); }
    }))); }; }
});
exports.Functor = Functor;
var Apply = (common_1.Function.assign(common_1.Function.assign(__assign(__assign({}, Functor), { ap: function (maybeF) { return function (maybeA) { return Maybe.infer(maybeF.cata({
        Just: function (f) { return Functor.fmap(f)(common_1.reinterpret(maybeA)); },
        Nothing: function () { return Maybe.Nothing; }
    })); }; } }))(function (Apply) { return common_1.Json.assign(Apply_1.Apply1.Def(Apply), Apply); }))(function (Apply) { return common_1.Json.assign(Apply, Apply_1.Apply1.Ext(Apply)); }));
exports.Apply = Apply;
var Applicative = __assign(__assign({}, Apply), { pure: Just });
exports.Applicative = Applicative;
var Bind = (__assign(__assign({}, Apply), { bind: function (maybeA) { return function (f) { return Maybe.infer(maybeA.cata({
        Just: f,
        Nothing: function () { return Maybe.Nothing; }
    })); }; } }));
exports.Bind = Bind;
var Monad = __assign(__assign(__assign({}, Applicative), Bind), { "return": Applicative.pure });
exports.Monad = Monad;
var Semigroup = (function (Semigroup) { return ({
    append: function (maybe0) { return function (maybe1) { return (maybe0.cata({
        Nothing: function () { return maybe1; },
        Just: function (value0) { return (maybe1.cata({
            Nothing: function () { return maybe0; },
            Just: function (value1) { return Just(Semigroup.append(value0)(value1)); }
        })); }
    })); }; }
}); });
var Monoid = (function (SemigroupA) { return (common_1.Function.assign(__assign(__assign({}, Semigroup(SemigroupA)), { mempty: function () { return common_1.reinterpret(Nothing); } }))(function (_) { return common_1.Json.assign(_, Monoid_1.IMonoid.Ext(_)); })); });
exports.Monoid = Monoid;
var Foldable = (common_1.assign({
    foldMap: function (Monoid) { return maybe(Monoid.mempty()); }
})(function (_) { return common_1.Json.assign(_, Foldable_1.Foldable1.Ext(_)); }));
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
