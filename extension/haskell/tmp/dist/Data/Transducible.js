"use strict";
exports.__esModule = true;
exports.ITransducible1 = exports.Transducible1 = exports.ITransducible = exports.Transducible = void 0;
var Transducible;
(function (Transducible) {
    Transducible.Def = (function (TransducibleF) { return ({
        transduce: function (transducer) { return function (reducer) { return TransducibleF.reduce(transducer(reducer)); }; }
    }); });
    Transducible.instantiate = function (_) { return _; };
})(Transducible || (Transducible = {}));
exports.Transducible = Transducible;
exports.ITransducible = Transducible;
var Transducible1;
(function (Transducible1) {
    Transducible1.Def = (function (TransducibleF) { return ({
        transduce: function (transducer) { return function (reducer) { return TransducibleF.reduce(transducer(reducer)); }; }
    }); });
    Transducible1.instantiate = function (_) { return _; };
})(Transducible1 || (Transducible1 = {}));
exports.Transducible1 = Transducible1;
exports.ITransducible1 = Transducible1;
exports["default"] = Transducible;
