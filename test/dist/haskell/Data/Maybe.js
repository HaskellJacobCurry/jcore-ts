"use strict";
exports.__esModule = true;
var readme_1 = require("../../../../dist/haskell/Data/Monoid/readme");
var Maybe_1 = require("../../../../dist/haskell/Data/Maybe");
var res = (Maybe_1.Maybe(readme_1.A).Lift(new readme_1.A()).cata({
    Nothing: function () { return ['yo']; },
    Just: function (a) { return 123; }
}));
console.log(res);
