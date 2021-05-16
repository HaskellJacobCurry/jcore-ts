"use strict";
exports.__esModule = true;
var Function_1 = require("../../../dist/ts-toolbelt/Function");
var json = Function_1.Function.define(function (rec) { return ({
    a: 'shit',
    f: function (b) { return [rec().a + "-" + b]; }
}); });
console.log({
    a: json.a,
    c: json.f('lol')
});
