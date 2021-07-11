"use strict";
exports.__esModule = true;
var Bool_1 = require("../../../dist/Instance/Data/Bool");
console.log(Bool_1.Bool.and(Bool_1.Bool.True)(Bool_1.Bool.not(Bool_1.Bool.True)).cata({
    True: function () { return 11; },
    False: function () { return 's'; }
}));
