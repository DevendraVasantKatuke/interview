```
new Promise((resolve, reject) => {
	doStuff(() => {
    	if (success) {
      		resolve('good')
    	} else {
      		reject(new Error('oops'))
    	}
  	})
})
```
```
promise
	.then((result) => {
    	/* success */
  	})
  	.catch((error) => {
    	/* failure */
  	})
// then() runs a function when a promise resolves. catch() runs when a promise fails.
```
```
const promises = [promise1(), promise2() /* ... */]

// Succeeds when all succeed
Promise.all(promises).then((results) => {
	/* ... */
})

// Succeeds when one finishes first
Promise.race(promises).then((result) => {
	/* ... */
})
```
```
return Promise.resolve('result')
return Promise.resolve(promise)
return Promise.resolve(thenable)

return Promise.reject('reason')

Promise.resolve(result).then(() => {
	/* ... */
})

// Promise.resolve(val) will return a promise that resolves to the value given to it.
```