"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eq = exports.negate = exports.abs = exports.odd = exports.even = exports.dec = exports.inc = exports.sub = exports.mul = exports.add = exports.one = exports.zero = exports.create = exports.fromI = exports.Int = exports.URI = void 0;
var IInt_1 = require("../../Typeclass/Data/IInt");
var Bool_1 = require("../../Instance/Data/Bool");
var Common_1 = require("../../Common");
var URI = Common_1.S('Int');
exports.URI = URI;
var fromI = (function (int) { return ({ URI: URI, value: int.value }); });
exports.fromI = fromI;
var createInt = (function (value) { return ({ URI: URI, value: value }); });
exports.create = createInt;
var zero = function () { return createInt(0); };
exports.zero = zero;
var one = function () { return createInt(1); };
exports.one = one;
var add = IInt_1.IInt.add;
exports.add = add;
var mul = IInt_1.IInt.mul;
exports.mul = mul;
var sub = IInt_1.IInt.sub;
exports.sub = sub;
var inc = (function (int) { return Int(int.value + 1); });
exports.inc = inc;
var dec = (function (int) { return Int(int.value - 1); });
exports.dec = dec;
var even = (function (int) { return Bool_1.Bool(int.value % 2 == 0); });
exports.even = even;
var odd = (function (int) { return Bool_1.Bool(int.value % 2 != 0); });
exports.odd = odd;
var abs = function (int) { return createInt(Math.abs(int.value)); };
exports.abs = abs;
var negate = IInt_1.IInt.negate;
exports.negate = negate;
var eq = (function (int0) { return function (int1) { return Bool_1.Bool(int0.value == int1.value); }; });
exports.eq = eq;
var Int = (Common_1.Json.assign(createInt, {
    URI: URI,
    create: createInt,
    fromI: fromI,
    zero: zero,
    one: one,
    add: add,
    mul: mul,
    sub: sub,
    inc: inc,
    dec: dec,
    even: even,
    odd: odd,
    abs: abs,
    negate: negate,
    eq: eq,
}));
exports.Int = Int;
exports.default = Int;
