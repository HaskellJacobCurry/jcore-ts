"use strict";
exports.__esModule = true;
var Maybe_1 = require("../../../dist/Data/Maybe");
var String_1 = require("../../../dist/Data/String");
console.log({
    v: Maybe_1.Maybe.Show(String_1.String.Show).show(Maybe_1.Maybe.Just(String_1.String('shit'))).toString(),
    g: Maybe_1.Maybe.Show(String_1.String.Show).show(Maybe_1.Maybe.Functor.map(function (s) { return s; })(Maybe_1.Maybe.Just(String_1.String('shit')))).toString()
});
