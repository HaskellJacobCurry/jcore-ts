let promisedTrampoline = f => {
	let rec = (f, ...as) => ({ rec, thunk: () => f(...as) });
	let isRecRet = (state) => state && state.rec === rec;
	return (...as) => (
		((state) => (
			new Promise((resolve, reject) => {
				(function f(state) {
					if (isRecRet(state)) {
						Promise.resolve().then(() => state.thunk()).then(f).catch(reject);
					} else {
						resolve(state);
					}
				})(state);
			})
		))(
			(x => x(x))(
				(x => (...as) => (
					(s => (
						rec(() => f(s, ...as))
					))((...as) => x(x)(...as))
				))
			)(...as)
		)
	);
};

promisedTrampoline((s, n, acc = 0) => (
	n == 0 ? Promise.resolve(acc) : s(n - 1, acc + n)
))(1e5)
	.then(_ => console.log({_}));