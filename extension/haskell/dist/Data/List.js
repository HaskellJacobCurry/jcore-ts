"use strict";
exports.__esModule = true;
exports.Populatable = exports.Foldable = exports.Show = exports.populate = exports.seed = exports.foldr = exports.foldl = exports.foldMap = exports.show = exports.reverse = exports.map = exports.reverseMap = exports.unsnoc = exports.uncons = exports.tail = exports.last = exports.head = exports.singleton = exports.snoc = exports.cons = exports.create = exports.infer = exports.Cons = exports.Nil_ = exports.Nil = exports.URI = exports.List = void 0;
var util_1 = require("../util");
var Throwable_1 = require("../util/Throwable");
var String_1 = require("./String");
var Bool_1 = require("./Bool");
var Foldable_1 = require("./Foldable");
var Populatable_1 = require("./Populatable");
var Show_1 = require("./Show");
var Monoid_1 = require("./Monoid");
var Maybe_1 = require("./Maybe");
var Tuple_1 = require("./Tuple");
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
var cons = (function (head) { return function (tail) { return Cons(head, tail); }; });
exports.cons = cons;
var snoc = (function (init) { return function (last) { return (foldr(cons)(singleton(last))(init)); }; });
exports.snoc = snoc;
/** singleton :: a -> List a */
var singleton = (function (a) { return Cons(a, Nil); });
exports.singleton = singleton;
/** head :: List a -> a */
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
/** tail :: [a] -> [a] */
var tail = (function (list) { return (list.cata({
    Nil: function () { return Throwable_1.Throwable(String_1.String('EmptyList')); },
    Cons: function (_, tail) { return tail; }
})); });
exports.tail = tail;
/** uncons :: List a -> Maybe (Tuple a (List a))  */
var uncons = (function (list) { return (util_1.apply(list.cata({
    Nil: function () { return Maybe_1.Maybe.Nothing; },
    Cons: function (head, tail) { return Maybe_1.Maybe.Just(Tuple_1.Tuple(head, tail)); }
}))(Maybe_1.Maybe.infer)); });
exports.uncons = uncons;
/** unsnoc :: List a -> Maybe (Tuple (List a) a) */
var unsnoc = (function (list) { return (util_1.apply(util_1.recurse()(function (list) { return function (unsnoc) { return (list.cata({
    Nil: function () { return Maybe_1.Maybe.Nothing; },
    Cons: function (head, tail) { return (tail.cata({
        Nil: function () { return Maybe_1.Maybe.Just(Tuple_1.Tuple(Nil, head)); },
        Cons: function () { return (util_1.apply((Tuple_1.Tuple.Bifunctor.lmap(cons(head))))(function (_) { return util_1.apply(Maybe_1.Maybe.Functor.fmap(_)); })(function (_) { return _(unsnoc(tail)); })); }
    })); }
})); }; }))(function (_) { return _(list); })); });
exports.unsnoc = unsnoc;
exports.unsnoc = unsnoc = function (list) { return (util_1.apply(util_1.trampoline()(function (list, done, acc, cont) { return function (unsnoc) { return (done.cata({
    True: function () { return cont(acc); },
    False: function () { return (list.cata({
        Nil: function () { return cont(Maybe_1.Maybe.Nothing); },
        Cons: function (head, tail) { return (tail.cata({
            Nil: function () { return (util_1.apply((Tuple_1.Tuple.Bifunctor.rmap(util_1.const_(head))))(function (_) { return util_1.apply(Maybe_1.Maybe.Functor.fmap(_)); })(function (_) { return util_1.apply(_(acc)); })(cont)); },
            Cons: function () { return (unsnoc(tail, done, acc, function (acc) { return (util_1.apply((Tuple_1.Tuple.Bifunctor.lmap(cons(head))))(function (_) { return util_1.apply(Maybe_1.Maybe.Functor.fmap(_)); })(function (_) { return util_1.apply(_(acc)); })(function (acc) { return unsnoc(list, Bool_1.Bool.True, acc, cont); })); })); }
        })); }
    })); }
})); }; }))(function (_) { return _(list, Bool_1.Bool.False, Maybe_1.Maybe.Just(Tuple_1.Tuple(Nil, util_1.placeholder())), function (_) { return _; }); })); };
var reverseMap = (function (f) { return function (listA) { return (foldl(function (acc) { return function (a) { return cons(f(a))(acc); }; })(Nil)(listA)); }; });
exports.reverseMap = reverseMap;
var map = (function (f) { return function (listA) { return (util_1.apply((reverseMap(f)(listA)))(reverse)); }; });
exports.map = map;
var reverse = (function (_) { return reverseMap(util_1.id)(_); });
exports.reverse = reverse;
var show = (function (ShowA) { return function (listA) { return (util_1.apply(util_1.recurse()(function (list) { return function (show) { return (list.cata({
    Nil: function () { return String_1.String('Nil'); },
    Cons: function (head, tail) { return (util_1.apply((String_1.String('(Cons ')))(function (_) { return util_1.apply(String_1.String.append(_)(String_1.String.fromI(ShowA.show(head)))); })(function (_) { return util_1.apply(String_1.String.append(_)(String_1.String(' '))); })(function (_) { return util_1.apply(String_1.String.append(_)(show(tail))); })(function (_) { return String_1.String.append(_)(String_1.String(')')); })); }
})); }; }))(function (_) { return _(listA); })); }; });
exports.show = show;
exports.show = show = function (ShowA) { return function (listA) { return (util_1.apply(util_1.trampoline()(function (list, done, acc, cont) { return function (show) { return (done.cata({
    True: function () { return cont(acc); },
    False: function () { return (list.cata({
        Nil: function () { return cont(String_1.String('Nil')); },
        Cons: function (head, tail) { return (show(tail, done, acc, function (acc) { return (util_1.apply((String_1.String('(Cons ')))(function (_) { return util_1.apply(String_1.String.append(_)(String_1.String.fromI(ShowA.show(head)))); })(function (_) { return util_1.apply(String_1.String.append(_)(String_1.String(' '))); })(function (_) { return util_1.apply(String_1.String.append(_)(acc)); })(function (_) { return util_1.apply(String_1.String.append(_)(String_1.String(')'))); })(function (acc) { return show(list, Bool_1.Bool.True, acc, cont); })); })); }
    })); }
})); }; }))(function (_) { return _(listA, Bool_1.Bool.False, String_1.String.mempty(), function (_) { return _; }); })); }; };
var foldMap = (function (MonoidG) { return function (f) { return function (listA) { return (util_1.apply({
    MonoidExtG: Monoid_1.Monoid.Ext(MonoidG)
})(function (_a) {
    var MonoidExtG = _a.MonoidExtG;
    return util_1.apply(util_1.recurse()(function (acc, listA) { return function (foldMap) { return (listA.cata({
        Nil: function () { return acc; },
        Cons: function (head, tail) { return util_1.apply(MonoidExtG.mappend(acc)(f(head)))(function (_) { return foldMap(_, tail); }); }
    })); }; }));
})(function (_) { return _(MonoidG.mempty(), listA); })); }; }; });
exports.foldMap = foldMap;
exports.foldMap = foldMap = function (MonoidG) { return function (f) { return function (listA) { return (util_1.apply({
    MonoidExtG: Monoid_1.Monoid.Ext(MonoidG)
})(function (_a) {
    var MonoidExtG = _a.MonoidExtG;
    return util_1.apply(util_1.trampoline()(function (acc, listA) { return function (foldMap) { return (listA.cata({
        Nil: function () { return acc; },
        Cons: function (head, tail) { return util_1.apply(MonoidExtG.mappend(acc)(f(head)))(function (_) { return foldMap(_, tail); }); }
    })); }; }));
})(function (_) { return _(MonoidG.mempty(), listA); })); }; }; };
var foldl = (function (f) { return function (b) { return function (listA) { return (util_1.apply(util_1.trampoline()(function (acc, listA) { return function (foldl) { return (listA.cata({
    Nil: function () { return acc; },
    Cons: function (head, tail) { return foldl(f(acc)(head), tail); }
})); }; }))(function (_) { return _(b, listA); })); }; }; });
exports.foldl = foldl;
var foldr = (function (f) { return function (b) { return function (listA) { return (util_1.apply((reverse(listA)))(foldl(function (b) { return function (a) { return f(a)(b); }; })(b))); }; }; });
exports.foldr = foldr;
var seed = (function () { return Nil; });
exports.seed = seed;
var populate = (function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    return function (listA) { return (foldr(cons)(create_(as))(listA)); };
});
exports.populate = populate;
/** show :: (Show a) => Show (List a) => List a -> String */
var Show = function (_) { return util_1.apply(_)(function (ShowA) { return (Show_1.IShow.instantiate({
    show: show(ShowA)
})); }); };
exports.Show = Show;
var Foldable = Foldable_1.Foldable1.instantiate({
    URI: URI,
    foldMap: foldMap,
    foldr: util_1.placeholder()
});
exports.Foldable = Foldable;
Foldable.foldl = foldl;
Foldable.foldr = foldr;
var Populatable = Populatable_1.Populatable1.instantiate({
    URI: URI,
    seed: seed,
    populate: populate
});
exports.Populatable = Populatable;
var List = {
    URI: URI,
    Nil: Nil,
    Nil_: Nil_,
    Cons: Cons,
    infer: infer,
    create: create_,
    cons: cons,
    snoc: snoc,
    singleton: singleton,
    head: head,
    last: last,
    tail: tail,
    uncons: uncons,
    unsnoc: unsnoc,
    reverseMap: reverseMap,
    map: map,
    reverse: reverse,
    show: show,
    foldMap: foldMap,
    foldl: foldl,
    foldr: foldr,
    seed: seed,
    populate: populate,
    Show: Show,
    Foldable: Foldable,
    Populatable: Populatable
};
exports.List = List;
exports["default"] = List;
