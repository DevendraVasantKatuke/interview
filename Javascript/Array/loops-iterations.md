Asynchronous Iteration

```
function fetcher(task,time) {
	return new Promise(function(res) {
		setTimeout(function() {
			res(`${task} Done`);
		}, time);
	})
}

const tasks = [1,2,3,4].map(d => {
	return fetcher(d, 1000* d);
});


(async () => {
	for await (const value of tasks) {
		console.log(value);
	}
})();
```

Promise.prototype.finally()

Promises now have a finally block, which will be exuected after then or catch block.
If we have any task that needs to be done in both then and catch block, we can now simply do that in finally block.

For example: Hiding the loader.

```
task().then().catch().finally();
```
