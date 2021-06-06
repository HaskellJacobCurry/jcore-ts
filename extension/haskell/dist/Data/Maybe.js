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
exports.Monoid = exports.Bind = exports.Apply = exports.Functor = exports.Show = exports.URI = exports.Just = exports.Nothing = exports.Maybe = void 0;
var Apply_1 = require("../Control/Apply");
var String_1 = require("./String");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var common_1 = require("../../dependency/jcore/dist/ts-toolbelt/common");
var Nothing = ts_toolbelt_1.Json.assign({ tag: 'Nothing' }, {
    cata: function (fs) { return fs['Nothing'](); }
});
exports.Nothing = Nothing;
var Just = function (value) { return ts_toolbelt_1.Json.assign({ tag: 'Just', value: value }, {
    cata: function (fs) { return fs['Just'](value); }
}); };
exports.Just = Just;
var URI = common_1.S('Maybe');
exports.URI = URI;
var Show = function (Show) { return ({
    show: function (maybeA) { return maybeA.cata({
        Nothing: function () { return String_1.String('Nothing'); },
        Just: function (value) { return String_1.String("Just(" + Show.show(value) + ")"); }
    }); }
}); };
exports.Show = Show;
var Functor = ({
    URI: URI,
    map: function (f) { return function (maybeA) { return (Maybe.reinterpret(maybeA.cata({
        Nothing: function () { return Nothing; },
        Just: function (value) { return Just(f(value)); }
    }))); }; }
});
exports.Functor = Functor;
var Apply = (ts_toolbelt_1.Function.assign(__assign(__assign({}, Functor), { ap: function (maybeF) { return function (maybeA) { return Maybe.reinterpret(maybeF.cata({
        Just: function (f) { return Functor.map(f)(ts_toolbelt_1.reinterpret(maybeA)); },
        Nothing: function () { return Maybe.Nothing; }
    })); }; } }))(function (Apply) { return ts_toolbelt_1.Json.assign(Apply, Apply_1.Apply1.Ext(Apply)); }));
exports.Apply = Apply;
var Bind = (__assign(__assign({}, Apply), { bind: function (maybeA) { return function (f) { return Maybe.reinterpret(maybeA.cata({
        Just: f,
        Nothing: function () { return Maybe.Nothing; }
    })); }; } }));
exports.Bind = Bind;
var Monoid = function (Semigroup) { return ({
    append: function (maybe0) { return function (maybe1) { return (maybe0.cata({
        Nothing: function () { return maybe1; },
        Just: function (value0) { return (maybe1.cata({
            Nothing: function () { return maybe0; },
            Just: function (value1) { return Just(Semigroup.append(value0)(value1)); }
        })); }
    })); }; },
    mempty: function () { return ts_toolbelt_1.reinterpret(Nothing); }
}); };
exports.Monoid = Monoid;
var Maybe = {
    URI: URI,
    reinterpret: function (maybe) { return ts_toolbelt_1.reinterpret(maybe); },
    Nothing: Nothing,
    Just: Just,
    Show: Show,
    Functor: Functor,
    Apply: Apply
};
exports.Maybe = Maybe;
