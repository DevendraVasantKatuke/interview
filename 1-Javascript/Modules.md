#### Dynamic Import
```
const mathModulePromise = import('./mathFunctions');

// Resolving the promise to get the module namespace object
mathModulePromise.then((mathModule) => {
	const result1 = mathModule.add(5, 3);
	const result2 = mathModule.subtract(8, 4);

	console.log('Result of addition:', result1);
	console.log('Result of subtraction:', result2);
})
.catch((error) => {
	console.error('Error during dynamic import:', error);
});
```
It’s important to note that top-level await is only allowed at the top level of modules. If you try to use it in other contexts, such as in a regular script, it will result in a syntax error.
```
// This is valid in a module
const result = await fetchData();

// This is not valid in a regular script
// Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules
```
