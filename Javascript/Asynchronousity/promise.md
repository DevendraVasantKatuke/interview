Serial Execution of Promise Array
```
const requestAry = [() => api.request1(), () => api.request2(), () => api.request3()];

// Using `await`
for (const requestItem of requestAry) {
	await requestItem();
}

// Using promises for serial execution
const finallyPromise = requestAry.reduce(
	 (currentPromise, nextRequest) => currentPromise.then(() => nextRequest()),
 	Promise.resolve() // Initial promise for linking promises in the array
);
```