"use strict";
exports.__esModule = true;
var Int_1 = require("../../../dist/Data/Int");
var String_1 = require("../../../dist/Data/String");
console.log(String_1.String.Show.show(Int_1.Int.Ord.gt(Int_1.Int.Ring.add(Int_1.Int(3))(Int_1.Int.Semiring.one()))(Int_1.Int(3)).cata({
    True: function () { return String_1.String('true'); },
    False: function () { return String_1.String('false'); }
})).toString());
