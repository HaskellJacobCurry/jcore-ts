let trampoline = f => {
	let rec = (f, ...as) => ({ rec, thunk: () => f(...as) });
	let isRecRet = (state) => state && state.rec === rec;
	return (...as) => (
		((state) => {
			while (isRecRet(state)) {
				state = state.thunk();
			}
			return state;
		})(
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