"use strict";
exports.__esModule = true;
exports.Functor = void 0;
var Functor;
(function (Functor) {
    Functor.map = function (f) { return function (functorA) { return functorA.map(f); }; };
})(Functor || (Functor = {}));
exports.Functor = Functor;
