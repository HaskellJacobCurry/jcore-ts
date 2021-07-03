"use strict";
exports.__esModule = true;
exports.snd = exports.fst = exports.create = exports.ITuple = void 0;
var util_1 = require("../util");
var createTuple = (function (fst, snd) { return ({ fst: fst, snd: snd }); });
exports.create = createTuple;
var fst = (function (tuple) { return tuple.fst; });
exports.fst = fst;
var snd = (function (tuple) { return tuple.snd; });
exports.snd = snd;
var ITuple = util_1.Json.assign(createTuple, {
    create: createTuple,
    fst: fst,
    snd: snd
});
exports.ITuple = ITuple;
