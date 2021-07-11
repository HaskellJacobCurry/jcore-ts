"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = exports.Continue = exports.Break = exports.URI = exports.Reduced = void 0;
var Common_1 = require("../../Common");
var URI = Common_1.S('Reduced');
exports.URI = URI;
var Break = (function (value) { return Common_1.create(Common_1.Json.assign(Common_1.create({ tag: 'Break', value: value }), Common_1.create({
    cata: function (fs) { return fs['Break'](value); },
}))); });
exports.Break = Break;
var Continue = (function (value) { return Common_1.create(Common_1.Json.assign(Common_1.create({ tag: 'Continue', value: value }), Common_1.create({
    cata: function (fs) { return fs['Continue'](value); },
}))); });
exports.Continue = Continue;
var extract = (function (reduced) { return reduced.value; });
exports.extract = extract;
var Reduced = (Common_1.Json.assign(Break, {
    URI: URI,
    Break: Break,
    Continue: Continue,
    extract: extract,
}));
exports.Reduced = Reduced;
exports.default = Reduced;
