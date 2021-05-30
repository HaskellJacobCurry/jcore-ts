"use strict";
exports.__esModule = true;
exports.Maybe = exports.Monoid = exports.Functor = exports.Show = exports.URI = exports.Just = exports.Nothing = void 0;
var String_1 = require("./String");
var ts_toolbelt_1 = require("../../dependency/jcore/dist/ts-toolbelt");
var common_1 = require("../../dependency/jcore/dist/ts-toolbelt/common");
exports.Nothing = function () { return ts_toolbelt_1.Json.assign({ tag: 'Nothing' }, {
    cata: function (fs) { return fs['Nothing'](); }
}); };
exports.Just = function (value) { return ts_toolbelt_1.Json.assign({ tag: 'Just', value: value }, {
    cata: function (fs) { return fs['Just'](value); }
}); };
exports.URI = common_1.S('Maybe');
exports.Show = function (Show) { return ({
    show: function (maybeA) { return maybeA.cata({
        Nothing: function () { return String_1.String('Nothing'); },
        Just: function (value) { return String_1.String("Just(" + Show.show(value) + ")"); }
    }); }
}); };
exports.Functor = ({
    URI: exports.URI,
    map: function (f) { return function (functorA) { return (exports.Maybe.reinterpret(functorA.cata({
        Nothing: function () { return exports.Nothing(); },
        Just: function (value) { return exports.Just(f(value)); }
    }))); }; }
});
exports.Monoid = function (Semigroup) { return ({
    append: function (maybe0) { return function (maybe1) { return (maybe0.cata({
        Nothing: function () { return maybe1; },
        Just: function (value0) { return (maybe1.cata({
            Nothing: function () { return maybe0; },
            Just: function (value1) { return exports.Just(Semigroup.append(value0)(value1)); }
        })); }
    })); }; },
    mempty: function () { return ts_toolbelt_1.reinterpret(exports.Nothing()); }
}); };
exports.Maybe = {
    URI: exports.URI,
    reinterpret: function (maybe) { return ts_toolbelt_1.reinterpret(maybe); },
    Nothing: exports.Nothing,
    Just: exports.Just,
    Show: exports.Show,
    Functor: exports.Functor
};
