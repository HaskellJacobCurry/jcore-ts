"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swap = exports.snd = exports.fst = exports.fromI = exports.create = exports.URI = exports.Tuple = void 0;
var common_1 = require("../../Common/common");
exports.URI = common_1.S('Tuple');
var createTuple = (function (fst, snd) { return ({ fst: fst, snd: snd }); });
exports.create = createTuple;
var fromI = (function (_a) {
    var fst = _a.fst, snd = _a.snd;
    return createTuple(fst, snd);
});
exports.fromI = fromI;
/** fst :: Tuple a b -> a */
var fst = function (tuple) { return tuple.fst; };
exports.fst = fst;
/** snd :: Tuple a b -> b */
var snd = function (tuple) { return tuple.snd; };
exports.snd = snd;
/** swap :: Tuple a b -> Tuple b a */
var swap = function (_a) {
    var fst = _a.fst, snd = _a.snd;
    return Tuple(snd, fst);
};
exports.swap = swap;
var Tuple = (common_1.Json.assign(createTuple, {
    URI: exports.URI,
    create: createTuple,
    fromI: fromI,
    fst: fst,
    snd: snd,
    swap: swap,
}));
exports.Tuple = Tuple;
exports.default = Tuple;
