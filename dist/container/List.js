"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.List = void 0;
var common_1 = require("../ts-toolbelt/common");
var ts_toolbelt_1 = require("../ts-toolbelt");
var List = /** @class */ (function () {
    function List() {
    }
    List.singleton = function (a) {
        return new List.Cons(a, new List.Nil);
    };
    List.range = function (min, max) {
        if (max < min)
            throw new Error('List<T>.range(min: Int, max: Int): List<Int>');
        return ts_toolbelt_1.trampoline(function (range, i, list) {
            if (list === void 0) { list = new List.Nil; }
            return (i < min ?
                list :
                range(i - 1, new List.Cons(i, list)));
        })(max);
    };
    List.cons = function (a, as) {
        return new List.Cons(a, as);
    };
    List.snoc = function (as, a) {
        return new List.Cons(a, as);
    };
    List.nil = function () {
        return new List.Nil;
    };
    List.prototype.foldl = function (reducer, seed) {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (foldl, list, acc) {
            if (list === void 0) { list = _this; }
            if (acc === void 0) { acc = seed; }
            return (list.cata({
                Nil: function () { return acc; },
                Cons: function (a, as) { return foldl(as, reducer(acc, a)); }
            }));
        })();
    };
    List.prototype.foldr = function (reducer, seed) {
        return this.reverse().foldl(function (acc, value) { return reducer(value, acc); }, seed);
    };
    List.prototype.reverse = function () {
        return this.foldl(function (acc, value) { return new List.Cons(value, acc); }, List.nil());
    };
    List.prototype.append = function (list) {
        return this.foldr(List.cons, list);
    };
    List.prototype.map = function (f) {
        return this.foldr(function (value, acc) { return List.cons(f(value), acc); }, List.nil());
    };
    List.prototype.flatMap = function (listF) {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (flatMap, fs, acc) {
            if (fs === void 0) { fs = listF; }
            if (acc === void 0) { acc = List.nil(); }
            return (fs.cata({
                Nil: function () { return acc; },
                Cons: function (f, fs) { return flatMap(fs, acc.append(_this.map(f))); }
            }));
        })();
    };
    List.prototype.size = function () {
        return this.foldl(function (acc, _) { return acc + 1; }, 0);
    };
    List.prototype.head = function () {
        return this.cata({
            Nil: function () { return null; },
            Cons: function (a, _) { return a; }
        });
    };
    List.prototype.tail = function () {
        return this.cata({
            Nil: function () { return null; },
            Cons: function (_, as) { return as; }
        });
    };
    List.prototype.last = function () {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (last, list) {
            if (list === void 0) { list = _this; }
            return (list.cata({
                Nil: function () { return null; },
                Cons: function (a, as) { return (as.cata({
                    Nil: function () { return a; },
                    Cons: function () { return last(as); }
                })); }
            }));
        })();
    };
    List.prototype.uncons = function () {
        return this.cata({
            Nil: function () { return null; },
            Cons: function (a, as) { return [a, as]; }
        });
    };
    List.prototype.unsnoc = function () {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (unsnoc, list, heads, cont) {
            if (list === void 0) { list = _this; }
            if (heads === void 0) { heads = List.nil(); }
            if (cont === void 0) { cont = function (_) { return _; }; }
            return (list.cata({
                Nil: function () { return cont(null); },
                Cons: function (a, as) { return (as.cata({
                    Nil: function () { return cont([heads, a]); },
                    Cons: function () { return (unsnoc(as, heads, function (acc) { return (acc ?
                        unsnoc(List.singleton(acc[1]), List.cons(a, acc[0]), cont) :
                        unsnoc(List.nil(), heads, cont)); })); }
                })); }
            }));
        })();
    };
    List.prototype.shift = function () {
        return this.tail();
    };
    List.prototype.shiftN = function (n) {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (shiftN, n, acc) {
            if (acc === void 0) { acc = _this; }
            return (n == 0 ?
                acc :
                acc.cata({
                    Nil: function () { return null; },
                    Cons: function (_, as) { return shiftN(n - 1, as); }
                }));
        })(n);
    };
    List.prototype.pop = function () {
        var tuple = this.unsnoc();
        return tuple ? tuple[0] : null;
    };
    List.prototype.popN = function (n) {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (popN, n, acc) {
            if (acc === void 0) { acc = _this; }
            return (n == 0 ?
                acc :
                (function (list) {
                    if (list === void 0) { list = acc.pop(); }
                    return (list ?
                        list.cata({
                            Nil: function () { return null; },
                            Cons: function () { return popN(n - 1, list); }
                        }) :
                        null);
                })());
        })(n);
    };
    List.prototype.index = function (i) {
        var _this = this;
        if (i < 0)
            throw new Error('List<T>.prototype.index(i: Int): T | null');
        return ts_toolbelt_1.trampoline(function (index, i, list) {
            if (list === void 0) { list = _this; }
            return (list.cata({
                Nil: function () { return null; },
                Cons: function (a, as) { return i == 0 ? a : index(i - 1, as); }
            }));
        })(i);
    };
    List.prototype.findIndex = function (f) {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (findIndex, i, list) {
            if (i === void 0) { i = 0; }
            if (list === void 0) { list = _this; }
            return (list.cata({
                Nil: function () { return -1; },
                Cons: function (a, as) { return f(a) ? i : findIndex(i + 1, as); }
            }));
        })();
    };
    List.prototype.insertAt = function (i, value) {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (insertAt, i, list, cont) {
            if (list === void 0) { list = _this; }
            if (cont === void 0) { cont = function (_) { return _; }; }
            return (i == 0 ?
                cont(List.cons(value, list)) :
                list.cata({
                    Nil: function () { return cont(null); },
                    Cons: function (a, as) { return (insertAt(i - 1, as, function (acc) { return (acc ? cont(List.cons(a, acc)) : cont(null)); })); }
                }));
        })(i);
        return ts_toolbelt_1.Function.define(function (insertAt) { return function (i, list) {
            if (list === void 0) { list = _this; }
            return (i == 0 ?
                List.cons(value, list) :
                list.cata({
                    Nil: function () { return null; },
                    Cons: function (a, as) { return ((function (list) {
                        if (list === void 0) { list = insertAt()(i - 1, as); }
                        return (list ? List.cons(a, list) : null);
                    })()); }
                }));
        }; })(i);
    };
    List.prototype.deleteAt = function (i) {
        var _this = this;
        return ts_toolbelt_1.trampoline(function (deleteAt, i, list, cont) {
            if (list === void 0) { list = _this; }
            if (cont === void 0) { cont = function (_) { return _; }; }
            return (list.cata({
                Nil: function () { return cont(null); },
                Cons: function (a, as) { return (i == 0 ?
                    cont(as) :
                    deleteAt(i - 1, as, function (acc) { return (acc ? cont(List.cons(a, acc)) : cont(null)); })); }
            }));
        })(i);
        return ts_toolbelt_1.Function.define(function (deleteAt) { return function (i, list) {
            if (list === void 0) { list = _this; }
            return (list.cata({
                Nil: function () { return null; },
                Cons: function (a, as) { return (i == 0 ?
                    as :
                    (function (list) {
                        if (list === void 0) { list = deleteAt()(i - 1, as); }
                        return (list ? List.cons(a, list) : null);
                    })()); }
            }));
        }; })(i);
    };
    List.prototype.filter = function (f) {
        return this.foldr(function (value, acc) { return f(value) ? List.cons(value, acc) : acc; }, List.nil());
    };
    return List;
}());
exports.List = List;
(function (List) {
    var Tag;
    (function (Tag) {
        Tag.Nil = common_1.S('Nil');
        Tag.Cons = common_1.S('Cons');
    })(Tag = List.Tag || (List.Tag = {}));
    var Nil = /** @class */ (function (_super) {
        __extends(Nil, _super);
        function Nil() {
            var _this = _super.call(this) || this;
            _this.tag = Tag.Nil;
            return _this;
        }
        Nil.prototype.cata = function (fs) {
            return fs[this.tag]();
        };
        return Nil;
    }(List));
    List.Nil = Nil;
    var Cons = /** @class */ (function (_super) {
        __extends(Cons, _super);
        function Cons(a, as) {
            var _this = _super.call(this) || this;
            _this.tag = Tag.Cons;
            _this.a = a;
            _this.as = as;
            return _this;
        }
        Cons.prototype.cata = function (fs) {
            return fs[this.tag](this.a, this.as);
        };
        return Cons;
    }(List));
    List.Cons = Cons;
})(List = exports.List || (exports.List = {}));
exports.List = List;
