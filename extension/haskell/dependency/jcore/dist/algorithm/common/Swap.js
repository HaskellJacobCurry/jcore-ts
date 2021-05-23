"use strict";
exports.__esModule = true;
exports.swap = exports.Swap = exports._swap = void 0;
exports._swap = function (as, i0, i1) {
    var a0 = as[i0];
    as[i0] = as[i1];
    as[i1] = a0;
};
var Swap;
(function (Swap) {
    Swap.fn = (function (iter0, iter1) {
        var a0 = iter0.read();
        iter0.write(iter1.read());
        iter1.write(a0);
    });
})(Swap = exports.Swap || (exports.Swap = {}));
exports.swap = Swap.fn;
exports["default"] = Swap;
