"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortBy = exports.mergeAll = exports.merge = exports.foldr = exports.foldl = exports.reverse = exports.map = exports.reverseMap = exports.find = exports.find_ = exports.index = exports.pop = exports.shiftN = exports.shift = exports.unsnoc = exports.uncons = exports.tail = exports.last = exports.head = exports.singleton = exports.snoc = exports.cons = exports.create = exports.infer = exports.Cons = exports.Nil_ = exports.Nil = exports.URI = exports.List = void 0;
var Common_1 = require("../../Common");
var Case_1 = require("../../Common/Case");
var Throwable_1 = require("../../Common/Throwable");
var String_1 = require("../../Instance/Data/String");
var Bool_1 = require("../../Instance/Data/Bool");
var Maybe_1 = require("../../Instance/Data/Maybe");
var Tuple_1 = require("../../Instance/Data/Tuple");
var Int_1 = require("../../Instance/Data/Int");
var Ordering_1 = require("../../Instance/Data/Ordering");
var URI = Common_1.S('List');
exports.URI = URI;
var Nil = Common_1.create(Common_1.Json.assign({ URI: URI }, Common_1.create({ tag: 'Nil' }), Common_1.create({
    cata: function (fs) { return fs['Nil'](); },
})));
exports.Nil = Nil;
var Nil_ = (function () { return Common_1.Json.assign({ URI: URI }, Common_1.create({ tag: 'Nil' }), Common_1.create({
    cata: function (fs) { return fs['Nil'](); },
})); });
exports.Nil_ = Nil_;
var Cons = (function (head, tail) { return Common_1.create(Common_1.Json.assign({ URI: URI }, Common_1.create({ tag: 'Cons', head: head, tail: tail }), Common_1.create({
    cata: function (fs) { return fs['Cons'](head, tail); },
}))); });
exports.Cons = Cons;
var infer = (function (list) { return Common_1.reinterpret(list); });
exports.infer = infer;
var createList = (function (as) { return (Common_1.apply(Common_1.trampoline()(function (acc, i) { return function (collect) { return (Bool_1.Bool(i < 0).cata({
    False: function () { return collect(Cons(as[i], acc), i - 1); },
    True: function () { return acc; },
})); }; }))(function (_) { return _(Nil, as.length - 1); })); });
exports.create = createList;
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
    Cons: function (head) { return head; },
})); });
exports.head = head;
/** last :: [a] -> a  */
var last = (function (list) { return (Common_1.recurse()(function (_) { return function (last) { return (list.cata({
    Nil: function () { return Throwable_1.Throwable(String_1.String('EmptyList')); },
    Cons: function (head, tail) { return (tail.cata({
        Nil: function () { return head; },
        Cons: function () { return last(tail); },
    })); },
})); }; })(list)); });
exports.last = last;
exports.last = last = function (list) { return (Common_1.apply(Common_1.trampoline_(function (last, list) { return (list.cata({
    Nil: function () { return Throwable_1.Throwable(String_1.String('EmptyList')); },
    Cons: function (head, tail) { return (tail.cata({
        Nil: function () { return head; },
        Cons: function () { return last(tail); },
    })); },
})); }))(function (_) { return _(list); })); };
/** tail :: [a] -> [a] */
var tail = (function (list) { return (list.cata({
    Nil: function () { return Throwable_1.Throwable(String_1.String('EmptyList')); },
    Cons: function (_, tail) { return tail; },
})); });
exports.tail = tail;
/** uncons :: List a -> Maybe (Tuple a (List a))  */
var uncons = (function (list) { return (Common_1.apply(list.cata({
    Nil: function () { return Maybe_1.Maybe.Nothing; },
    Cons: function (head, tail) { return Maybe_1.Maybe.Just(Tuple_1.Tuple(head, tail)); },
}))(Maybe_1.Maybe.infer)); });
exports.uncons = uncons;
/** unsnoc :: List a -> Maybe (Tuple (List a) a) */
var unsnoc = (function (list) { return (Common_1.apply(Common_1.recurse()(function (list) { return function (unsnoc) { return (list.cata({
    Nil: function () { return Maybe_1.Maybe.Nothing; },
    Cons: function (head, tail) { return (tail.cata({
        Nil: function () { return Maybe_1.Maybe.Just(Tuple_1.Tuple(Nil, head)); },
        Cons: function () { return (Common_1.apply((Tuple_1.Tuple.Bifunctor.lmap(cons(head))))(function (_) { return Common_1.apply(Maybe_1.Maybe.Functor.fmap(_)); })(function (_) { return _(unsnoc(tail)); })); },
    })); },
})); }; }))(function (_) { return _(list); })); });
exports.unsnoc = unsnoc;
exports.unsnoc = unsnoc = function (list) { return (Common_1.apply(Common_1.trampoline()(function (list, done, acc, cont) { return function (unsnoc) { return (done.cata({
    True: function () { return cont(acc); },
    False: function () { return (list.cata({
        Nil: function () { return cont(Maybe_1.Maybe.Nothing); },
        Cons: function (head, tail) { return (tail.cata({
            Nil: function () { return (Common_1.apply((Tuple_1.Tuple.Bifunctor.rmap(Common_1.const_(head))))(function (_) { return Common_1.apply(Maybe_1.Maybe.Functor.fmap(_)); })(function (_) { return Common_1.apply(_(acc)); })(cont)); },
            Cons: function () { return (unsnoc(tail, done, acc, function (acc) { return (Common_1.apply((Tuple_1.Tuple.Bifunctor.lmap(cons(head))))(function (_) { return Common_1.apply(Maybe_1.Maybe.Functor.fmap(_)); })(function (_) { return Common_1.apply(_(acc)); })(function (acc) { return unsnoc(list, Bool_1.Bool.True, acc, cont); })); })); },
        })); },
    })); }
})); }; }))(function (_) { return _(list, Bool_1.Bool.False, Maybe_1.Maybe.Just(Tuple_1.Tuple(Nil, Common_1.placeholder())), function (_) { return _; }); })); };
var shift = (function (list) { return (list.cata({
    Nil: function () { return Maybe_1.Maybe.Nothing_(); },
    Cons: function (_, tail) { return Maybe_1.Maybe.Just(tail); }
})); });
exports.shift = shift;
var shiftN = (function (n) { return function (listA) { return (Common_1.apply(Common_1.trampoline()(function (acc, n) { return function (shiftN) { return (Int_1.Int.gt(n)(Int_1.Int(0)).cata({
    False: function () { return Maybe_1.Maybe.Just(acc); },
    True: function () { return (shift(acc).cata({
        Nothing: function () { return Maybe_1.Maybe.Nothing_(); },
        Just: function (acc) { return shiftN(acc, Int_1.Int.dec(n)); },
    })); },
})); }; }))(function (_) { return _(listA, n); })); }; });
exports.shiftN = shiftN;
var pop = (function (listA) { return (unsnoc(listA).cata({
    Nothing: function () { return Maybe_1.Maybe.Nothing_(); },
    Just: function (_) { return Maybe_1.Maybe.Just(Tuple_1.Tuple.fst(_)); },
})); });
exports.pop = pop;
var index = (function (i) { return function (listA) { return (Common_1.apply(Common_1.trampoline()(function (listA, i) { return function (index) { return (listA.cata({
    Nil: function () { return Maybe_1.Maybe.Nothing_(); },
    Cons: function (head, tail) { return (Int_1.Int.gt(i)(Int_1.Int(0)).cata({
        False: function () { return Maybe_1.Maybe.Just(head); },
        True: function () { return index(tail, Int_1.Int.dec(i)); },
    })); },
})); }; }))(function (_) { return _(listA, i); })); }; });
exports.index = index;
var find_ = (function (f) { return function (listA) { return (Common_1.apply(Common_1.trampoline()(function (listA, i) { return function (find_) { return (listA.cata({
    Nil: function () { return Maybe_1.Maybe.Nothing_(); },
    Cons: function (head, tail) { return (f(head).cata({
        True: function () { return Maybe_1.Maybe.Just(Tuple_1.Tuple(head, i)); },
        False: function () { return find_(tail, Int_1.Int.inc(i)); },
    })); },
})); }; }))(function (_) { return _(listA, Int_1.Int(0)); })); }; });
exports.find_ = find_;
var find = (function (f) { return function (listA) { return (Common_1.apply((find_(f)(listA)))(Maybe_1.Maybe.Functor.fmap(Tuple_1.Tuple.fst))); }; });
exports.find = find;
var reverseMap = (function (f) { return function (listA) { return (foldl(function (acc) { return function (a) { return cons(f(a))(acc); }; })(Nil)(listA)); }; });
exports.reverseMap = reverseMap;
var map = (function (f) { return function (listA) { return (Common_1.apply((reverseMap(f)(listA)))(reverse)); }; });
exports.map = map;
var reverse = (function (_) { return reverseMap(Common_1.id)(_); });
exports.reverse = reverse;
var foldl = (function (f) { return function (b) { return function (listA) { return (Common_1.apply(Common_1.trampoline()(function (acc, listA) { return function (foldl) { return (listA.cata({
    Nil: function () { return acc; },
    Cons: function (head, tail) { return foldl(f(acc)(head), tail); },
})); }; }))(function (_) { return _(b, listA); })); }; }; });
exports.foldl = foldl;
var foldr = (function (f) { return function (b) { return function (listA) { return (Common_1.apply((reverse(listA)))(foldl(function (b) { return function (a) { return f(a)(b); }; })(b))); }; }; });
exports.foldr = foldr;
/** merge :: (a -> a -> Ordering) -> List a -> List a -> List a */
var merge = (function (f) { return function (list0) { return function (list1) { return (Common_1.apply(Common_1.recurse()(function (list0, list1) { return function (merge) { return (Common_1.apply(list0.cata({
    Nil: function () { return Case_1.Case(0, list1); },
    Cons: function (head0, tail0) { return (list1.cata({
        Nil: function () { return Case_1.Case(0, list0); },
        Cons: function (head1, tail1) { return Case_1.Case(1, head0, tail0, head1, tail1); },
    })); }
}))(Case_1.Case.infer).cata({
    0: function (list) { return list; },
    1: function (head0, tail0, head1, tail1) { return (Ordering_1.Ordering.eq(f(head0)(head1))(Ordering_1.Ordering.LT).cata({
        True: function () { return cons(head0)(merge(tail0, list1)); },
        False: function () { return cons(head1)(merge(list0, tail1)); }
    })); }
})); }; }))(function (_) { return _(list0, list1); })); }; }; });
exports.merge = merge;
exports.merge = merge = function (f) { return function (list0) { return function (list1) { return (Common_1.apply(Common_1.trampoline()(function (list0, list1, done, acc, cont) { return function (merge) { return (done.cata({
    True: function () { return cont(acc); },
    False: function () { return (Common_1.apply(list0.cata({
        Nil: function () { return Case_1.Case(0, list1); },
        Cons: function (head0, tail0) { return (list1.cata({
            Nil: function () { return Case_1.Case(0, list0); },
            Cons: function (head1, tail1) { return Case_1.Case(1, head0, tail0, head1, tail1); },
        })); }
    }))(Case_1.Case.infer).cata({
        0: function (list) { return merge(list0, list1, Bool_1.Bool.True, list, cont); },
        1: function (head0, tail0, head1, tail1) { return (Ordering_1.Ordering.eq(f(head0)(head1))(Ordering_1.Ordering.LT).cata({
            True: function () { return (merge(tail0, list1, done, acc, function (acc) { return (merge(list0, list1, Bool_1.Bool.True, cons(head0)(acc), cont)); })); },
            False: function () { return (merge(list0, tail1, done, acc, function (acc) { return (merge(list0, list1, Bool_1.Bool.True, cons(head1)(acc), cont)); })); },
        })); }
    })); },
})); }; }))(function (_) { return _(list0, list1, Bool_1.Bool.False, Nil, function (_) { return _; }); })); }; }; };
/** mergeAll :: (a -> a -> Ordering) -> List (List a) -> List a */
var mergeAll = (function (f) { return function (lists) { return (Common_1.apply({
    /** mergePairs :: List (List a) -> List (List a) */
    mergePairs: Common_1.create(function (lists) { return (Common_1.apply(Common_1.recurse()(function (lists) { return function (mergePairs) { return (Common_1.apply(lists.cata({
        Nil: function () { return Case_1.Case(0, Nil_()); },
        Cons: function (head0, tail0) { return (tail0.cata({
            Nil: function () { return Case_1.Case(0, lists); },
            Cons: function (head1, tail1) { return Case_1.Case(1, head0, head1, tail1); },
        })); }
    }))(Case_1.Case.infer).cata({
        0: function (lists) { return lists; },
        1: function (head0, head1, tail) { return cons(merge(f)(head0)(head1))(mergePairs(tail)); },
    })); }; }))(function (_) { return _(lists); })); }),
})(function (_a) {
    var mergePairs = _a.mergePairs;
    return Common_1.apply(Common_1.recurse()(function (lists) { return function (mergeAll) { return (lists.cata({
        Nil: function () { return Nil_(); },
        Cons: function (head, tail) { return (tail.cata({
            Nil: function () { return head; },
            Cons: function () { return Common_1.compose(mergeAll, mergePairs)(lists); },
        })); },
    })); }; }));
})(function (_) { return _(lists); })); }; });
exports.mergeAll = mergeAll;
exports.mergeAll = mergeAll = function (f) { return function (lists) { return (Common_1.apply({
    /** mergePairs :: List (List a) -> List (List a) */
    mergePairs: Common_1.create(function (lists) { return (Common_1.apply(Common_1.trampoline()(function (lists, done, acc, cont) { return function (mergePairs) { return (done.cata({
        True: function () { return cont(acc); },
        False: function () { return (Common_1.apply(lists.cata({
            Nil: function () { return Case_1.Case(0, Nil_()); },
            Cons: function (head0, tail0) { return (tail0.cata({
                Nil: function () { return Case_1.Case(0, lists); },
                Cons: function (head1, tail1) { return Case_1.Case(1, head0, head1, tail1); },
            })); }
        }))(Case_1.Case.infer).cata({
            0: function (lists) { return mergePairs(List.Nil, Bool_1.Bool.True, lists, cont); },
            1: function (head0, head1, tail) { return (mergePairs(tail, done, acc, function (acc) { return (mergePairs(List.Nil, Bool_1.Bool.True, cons(merge(f)(head0)(head1))(acc), cont)); })); },
        })); },
    })); }; }))(function (_) { return _(lists, Bool_1.Bool.False, List.Nil, function (_) { return _; }); })); }),
})(function (_a) {
    var mergePairs = _a.mergePairs;
    return Common_1.apply(Common_1.trampoline()(function (lists) { return function (mergeAll) { return (lists.cata({
        Nil: function () { return Nil_(); },
        Cons: function (head, tail) { return (tail.cata({
            Nil: function () { return head; },
            Cons: function () { return Common_1.compose(mergeAll, mergePairs)(lists); },
        })); },
    })); }; }));
})(function (_) { return _(lists); })); }; };
/** sortBy :: (a -> a -> Ordering) -> List a -> List a */
var sortBy = (function (f) { return function (list) { return (Common_1.apply({
    /** sequences :: List a -> List (List a) */
    sequences: Common_1.recurse()(function (list) { return function (sequences) { return (Common_1.apply({
        /** descending :: a -> List a -> List a -> List (List a) */
        descending: Common_1.recurse()(function (head, acc, list) { return function (descending) { return (list.cata({
            Nil: function () { return singleton(cons(head)(acc)); },
            Cons: function (head0, tail0) { return (Ordering_1.Ordering.eq(f(head)(head0))(Ordering_1.Ordering.GT).cata({
                True: function () { return descending(head0, cons(head)(acc), tail0); },
                False: function () { return cons(cons(head)(acc))(sequences(list)); },
            })); }
        })); }; }),
        /** ascending :: a -> (List a -> List a) -> List a -> List (List a) */
        ascending: Common_1.recurse()(function (head, acc, list) { return function (ascending) { return (list.cata({
            Nil: function () { return singleton(acc(singleton(head))); },
            Cons: function (head0, tail0) { return (Ordering_1.Ordering.eq(f(head)(head0))(Ordering_1.Ordering.GT).cata({
                False: function () { return ascending(head0, function (tail1) { return acc(cons(head)(tail1)); }, tail0); },
                True: function () { return cons(acc(singleton(head)))(sequences(list)); },
            })); },
        })); }; }),
    })(function (_a) {
        var descending = _a.descending, ascending = _a.ascending;
        return (list.cata({
            Nil: function () { return Nil_(); },
            Cons: function (head0, tail0) { return (tail0.cata({
                Nil: function () { return singleton(list); },
                Cons: function (head1, tail1) { return (Ordering_1.Ordering.eq(f(head0)(head1))(Ordering_1.Ordering.GT).cata({
                    True: function () { return descending(head1, singleton(head0), tail1); },
                    False: function () { return ascending(head1, cons(head0), tail1); },
                })); }
            })); },
        }));
    })); }; }),
})(function (_a) {
    var sequences = _a.sequences;
    return Common_1.compose(mergeAll(f), sequences)(list);
})); }; });
exports.sortBy = sortBy;
var List = (Common_1.Json.assign(createList, {
    URI: URI,
    Nil: Nil,
    Nil_: Nil_,
    Cons: Cons,
    infer: infer,
    create: createList,
    cons: cons,
    snoc: snoc,
    singleton: singleton,
    head: head,
    last: last,
    tail: tail,
    uncons: uncons,
    unsnoc: unsnoc,
    shift: shift,
    shiftN: shiftN,
    pop: pop,
    index: index,
    find_: find_,
    find: find,
    reverseMap: reverseMap,
    map: map,
    reverse: reverse,
    merge: merge,
    mergeAll: mergeAll,
    sortBy: sortBy,
}));
exports.List = List;
exports.default = List;
