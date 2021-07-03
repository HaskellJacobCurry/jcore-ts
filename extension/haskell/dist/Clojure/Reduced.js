"use strict";
exports.__esModule = true;
exports.Continue = exports.Break = exports.Reduced = void 0;
var util_1 = require("../util");
var Break = (function (value) { return util_1.create(util_1.Json.assign(util_1.create({ tag: 'Break', value: value }), util_1.create({
    cata: function (fs) { return fs['Break'](value); }
}))); });
exports.Break = Break;
var Continue = (function (value) { return util_1.create(util_1.Json.assign(util_1.create({ tag: 'Continue', value: value }), util_1.create({
    cata: function (fs) { return fs['Continue'](value); }
}))); });
exports.Continue = Continue;
var Reduced = util_1.Json.assign(Break, {
    Break: Break,
    Continue: Continue,
    extract: util_1.create(function (reduced) { return reduced.value; })
});
exports.Reduced = Reduced;
