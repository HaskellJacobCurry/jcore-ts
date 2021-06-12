"use strict";
exports.__esModule = true;
var Maybe_1 = require("../../../dist/Data/Maybe");
var String_1 = require("../../../dist/Data/String");
var Int_1 = require("../../../dist/Data/Int");
/*
console.log({
    v: Maybe.Show(String.Show).show(Maybe.Just(String('shit'))).toString(),
    g: Maybe.Show(String.Show).show(
        Maybe.Functor.map((s: String) => s)(Maybe.Just(String('shit')))
    ).toString(),
})
*/
var maybeStr = (Maybe_1.Maybe.Apply.liftA2(function (a) { return function (b) { return (Int_1.Int.Show.show(Int_1.Int.Ring.mul(a)(b))); }; })(Maybe_1.Maybe.Just(Int_1.Int(33)))(Maybe_1.Maybe.Just(Int_1.Int(11))));
console.log(Maybe_1.Maybe.Show(String_1.String.Show).show(maybeStr).toString());
