"use strict";
exports.__esModule = true;
var readme_1 = require("../../../dist/haskell/Data/Monoid/readme");
var B = /** @class */ (function () {
    function B() {
        this.b = 1;
    }
    return B;
}());
readme_1.Eff(readme_1.A).mempty().a.append(readme_1.Eff(readme_1.A).mempty().a);
