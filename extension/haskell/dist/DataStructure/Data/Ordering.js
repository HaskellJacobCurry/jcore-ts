"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invert = exports.fromI = exports.GT = exports.EQ = exports.LT = exports.Ordering = void 0;
var common_1 = require("../../Common/common");
var LT = common_1.Json.assign({ tag: 'LT' }, {
    cata: function (fs) { return fs['LT'](); },
});
exports.LT = LT;
var EQ = common_1.Json.assign({ tag: 'EQ' }, {
    cata: function (fs) { return fs['EQ'](); },
});
exports.EQ = EQ;
var GT = common_1.Json.assign({ tag: 'GT' }, {
    cata: function (fs) { return fs['GT'](); },
});
exports.GT = GT;
var fromI = (function (ordering) { return (ordering.cata({
    LT: function () { return LT; },
    EQ: function () { return EQ; },
    GT: function () { return GT; },
})); });
exports.fromI = fromI;
var invert = (function (ordering) { return (ordering.cata({
    LT: function () { return GT; },
    EQ: function () { return EQ; },
    GT: function () { return LT; },
})); });
exports.invert = invert;
var Ordering = {
    LT: LT,
    EQ: EQ,
    GT: GT,
    fromI: fromI,
    invert: invert,
};
exports.Ordering = Ordering;
exports.default = Ordering;
