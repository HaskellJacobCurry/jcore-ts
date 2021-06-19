"use strict";
exports.__esModule = true;
exports.INum = exports.Num = void 0;
var Num;
(function (Num_1) {
    Num_1.Ext = (function (Num) { return ({
        negate: function (a) { return Num.sub(Num.zero())(a); }
    }); });
})(Num || (Num = {}));
exports.Num = Num;
exports.INum = Num;
exports["default"] = Num;
