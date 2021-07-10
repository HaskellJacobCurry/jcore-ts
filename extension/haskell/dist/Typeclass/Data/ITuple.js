"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snd = exports.fst = exports.create = exports.ITuple = void 0;
var Common_1 = require("../../Common");
var createTuple = (function (fst, snd) { return ({ fst: fst, snd: snd }); });
exports.create = createTuple;
var fst = (function (tuple) { return tuple.fst; });
exports.fst = fst;
var snd = (function (tuple) { return tuple.snd; });
exports.snd = snd;
var ITuple = Common_1.Json.assign(createTuple, {
    create: createTuple,
    fst: fst,
    snd: snd,
});
exports.ITuple = ITuple;
