"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = exports.Break = exports.Reduced = void 0;
var Common_1 = require("../../Common");
var Break = (function (value) { return Common_1.create(Common_1.Json.assign(Common_1.create({ tag: 'Break', value: value }), Common_1.create({
    cata: function (fs) { return fs['Break'](value); },
}))); });
exports.Break = Break;
var Continue = (function (value) { return Common_1.create(Common_1.Json.assign(Common_1.create({ tag: 'Continue', value: value }), Common_1.create({
    cata: function (fs) { return fs['Continue'](value); },
}))); });
exports.Continue = Continue;
var Reduced = Common_1.Json.assign(Break, {
    Break: Break,
    Continue: Continue,
    extract: Common_1.create(function (reduced) { return reduced.value; }),
});
exports.Reduced = Reduced;
