let {Promise} = require('../../../dist/ts-toolbelt/Promise');
let {Semaphore} = require('../../../dist/ts-toolbelt/Semaphore');

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
let mutex = new Semaphore(1);

for (let i = 0; i < 1e2; i++) {
	queueMicrotask(() => (
		mutex.acquire()
			.then(release => (
				indexApi.updateIndex()
					.catch(console.log)
					.then(release)
			))
	));
}