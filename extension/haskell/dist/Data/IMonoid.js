"use strict";
exports.__esModule = true;
exports.Monoid = void 0;
var Monoid;
(function (Monoid) {
    Monoid.mempty = function (construct) { return function () { return construct.mempty(); }; };
})(Monoid || (Monoid = {}));
exports.Monoid = Monoid;
