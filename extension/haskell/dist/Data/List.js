"use strict";
exports.__esModule = true;
exports.last = exports.head = exports.create = exports.infer = exports.Cons = exports.Nil_ = exports.Nil = exports.URI = exports.List = void 0;
var util_1 = require("../util");
var Throwable_1 = require("../util/Throwable");
var String_1 = require("./String");
var Bool_1 = require("./Bool");
var URI = util_1.S('List');
exports.URI = URI;
var Nil = util_1.create(util_1.Json.assign({ URI: URI }, util_1.create({ tag: 'Nil' }), util_1.create({
    cata: function (fs) { return fs['Nil'](); }
})));
exports.Nil = Nil;
var Nil_ = (function () { return util_1.Json.assign({ URI: URI }, util_1.create({ tag: 'Nil' }), util_1.create({
    cata: function (fs) { return fs['Nil'](); }
})); });
exports.Nil_ = Nil_;
var Cons = (function (head, tail) { return util_1.create(util_1.Json.assign({ URI: URI }, util_1.create({ tag: 'Cons', head: head, tail: tail }), util_1.create({
    cata: function (fs) { return fs['Cons'](head, tail); }
}))); });
exports.Cons = Cons;
var infer = (function (list) { return util_1.reinterpret(list); });
exports.infer = infer;
var create_ = (function (as) { return (util_1.apply(util_1.trampoline()(function (acc, i) { return function (collect) { return (Bool_1.Bool(i < 0).cata({
    False: function () { return collect(Cons(as[i], acc), i - 1); },
    True: function () { return acc; }
})); }; }))(function (_) { return _(Nil, as.length - 1); })); });
exports.create = create_;
/** head :: [a] -> a */
var head = (function (list) { return (list.cata({
    Nil: function () { return Throwable_1.Throwable(String_1.String('EmptyList')); },
    Cons: function (head) { return head; }
})); });
exports.head = head;
/** last :: [a] -> a  */
var last = (function (list) { return (util_1.recurse()(function (_) { return function (last) { return (list.cata({
    Nil: function () { return Throwable_1.Throwable(String_1.String('EmptyList')); },
    Cons: function (head, tail) { return (tail.cata({
        Nil: function () { return head; },
        Cons: function () { return last(tail); }
    })); }
})); }; })(list)); });
exports.last = last;
exports.last = last = function (list) { return (util_1.apply(util_1.trampoline_(function (last, list) { return (list.cata({
    Nil: function () { return Throwable_1.Throwable(String_1.String('EmptyList')); },
    Cons: function (head, tail) { return (tail.cata({
        Nil: function () { return head; },
        Cons: function () { return last(tail); }
    })); }
})); }))(function (_) { return _(list); })); };
var List = {
    URI: URI,
    Nil: Nil,
    Nil_: Nil_,
    Cons: Cons,
    infer: infer,
    create: create_,
    head: head,
    last: last
};
exports.List = List;
exports["default"] = List;
