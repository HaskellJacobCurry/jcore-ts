"use strict";
exports.__esModule = true;
var Bool_1 = require("../../../dist/Data/Bool");
var IBool_1 = require("../../../dist/Data/IBool");
console.log(IBool_1["default"].and(Bool_1.Bool.True)(IBool_1["default"].not(Bool_1.Bool.True)).cata({
    True: function () { return 11; },
    False: function () { return 's'; }
}));
