"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INum = exports.Num = void 0;
var common_1 = require("../../Common/common");
var Num;
(function (Num_1) {
    Num_1.Ext = (function (Num) { return ({
        negate: function (a) { return Num.sub(Num.zero())(a); },
    }); });
    Num_1.instantiate = (function (_) { return (common_1.assign(_)(function (_) { return common_1.Json.assign(_, Num_1.Ext(_)); })); });
})(Num || (Num = {}));
exports.Num = Num;
exports.INum = Num;
exports.default = Num;
