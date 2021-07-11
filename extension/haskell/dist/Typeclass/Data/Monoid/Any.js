"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Any = exports.Show = void 0;
var Any_1 = require("./Any_");
var String_1 = require("../../../Instance/Data/String");
var Bool_1 = require("../../../Instance/Data/Bool");
var common_1 = require("../../../Common/common");
/** Show Any */
var Show = ({
    show: function (any) { return (common_1.assign(Bool_1.Bool.fromI(any.value))(function (_) { return common_1.assign(String_1.String(_.tag)); })(function (_) { return String_1.String.Semigroup.append(String_1.String('Any '))(_); })); },
});
exports.Show = Show;
var _Any = (common_1.Json.assign(Any_1.Any, {
    Show: Show,
}));
exports.Any = _Any;
__exportStar(require("./Any_"), exports);
exports.default = _Any;
