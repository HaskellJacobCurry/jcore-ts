let {Promise} = require('../../dist/ts-toolbelt/Promise');

let randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1e2));

let makeIndex = () => (
	((i = 0) => {
		let api = {
			getIndex: () => randomDelay().then(() => i),
			setIndex: (j) => randomDelay().then(() => i = j),
			updateIndex: () => api.getIndex().then(i => api.setIndex(i + 1)).then(console.log),
		};
		return api;
	})()
);

let indexApi = makeIndex();
let mutex = Promise.resolve();

for (let i = 0; i < 1e2; i++) {
	queueMicrotask(() => (
		mutex = mutex.then(indexApi.updateIndex).catch(console.log)
	));
}