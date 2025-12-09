`async` and `await` build on top of promises and generators to express asynchronous actions inline. This makes asynchronous or callback code much easier to maintain.

Functions with the `async` keyword return a Promise, and can be called with that syntax.

Inside an async function the await keyword can be applied to any Promise, and will cause all of the function body after the await to be executed after the promise resolves.

A function deﬁned as async is a function that can perform asynchronous actions but still look synchronous.

The way it's done is using the await keyword to defer the function while it waits for a Promise to resolve or reject.
```
async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch (err) {
        // Rejections in the promise will get thrown here
        console.error(err.message);
    }
}
```
An async function always returns a Promise itself, so you can use it in other asynchronous functions.
```
const getJSON = async url => {
    const response = await fetch(url);
    return await response.json();
}
```
You have to keep the operator precedence in mind when using await keyword.

Imagine that we have an asynchronous function which calls another asynchronous function, getUnicorn() which returns a Promise that resolves to an instance of class Unicorn. Now we want to get the size of the unicorn using the getSize() method of that class.
```
async function myAsyncFunction() {
    await getUnicorn().getSize();
}
```
At ﬁrst sight, it seems valid, but it's not. Due to operator precedence, it's equivalent to the following:
```
async function myAsyncFunction() {
    await (getUnicorn().getSize());
}
```
Here we attempt to call getSize() method of the Promise object, which isn't what we want.

Instead, we should use brackets to denote that we ﬁrst want to wait for the unicorn, and then call getSize() method of the result:
```
async function asyncFunction() {
    (await getUnicorn()).getSize();
}
```
Of course. the previous version could be valid in some cases, for example, if the getUnicorn() function was synchronous, but the getSize() method was asynchronous.

async functions do not replace the Promise type; they add language keywords that make promises easier to call.
```
async function doAsyncThing() { ... }

function doPromiseThing(input) { return new Promise((r, x) => ...); }

// Call with promise syntax
doAsyncThing()
    .then(a => doPromiseThing(a))
    .then(b => ...)
    .catch(ex => ...);
    // Call with await syntax
    try {
        const a = await doAsyncThing();
        const b = await doPromiseThing(a);
        ...
    }
    catch(ex) { ... }
```
Any function that uses chains of promises can be rewritten using await:
```
function newUnicorn() {
    return fetch('unicorn.json')
    // fetch unicorn.json from server
    .then(responseCurrent => responseCurrent.json()) // parse the response as JSON
    .then(unicorn =>
        fetch('new/unicorn', {
            method: 'post',
            body: JSON.stringify({unicorn})
        })
    )
    .then(responseNew => responseNew.json())
    .then(json => json.success)
    // return success property of response
    .catch(err => console.log('Error creating unicorn:', err));
}
```
The function can be rewritten using async / await as follows:
```
async function newUnicorn() {
    try {
        const responseCurrent = await fetch('unicorn.json');
        const unicorn = await responseCurrent.json();
        const responseNew = await fetch('new/unicorn', {
            method: 'post',
            body: JSON.stringify({unicorn})
        });
        const json = await responseNew.json();
        return json.success
    } catch (err) {
        console.log('Error creating unicorn:', err);
    }
}
```
This async variant of newUnicorn() appears to return a Promise, but really there were multiple await keywords.

Each one returned a Promise, so really we had a collection of promises rather than a chain.
In fact we can think of it as a function* generator, with each await being a yield new Promise. However, the results of each promise are needed by the next to continue the function. This is why the additional keyword async is needed on the function (as well as the await keyword when calling the promises) as it tells JavaScript to automatically creates an observer for this iteration. The Promise returned by async function newUnicorn()
resolves when this iteration completes.

Practically, you don't need to consider that; await hides the promise and async hides the generator iteration.

You can call async functions as if they were promises, and await any promise or any async function. You don't need to await an async function, just as you can execute a promise without a .then().

You can also use an async IIFE if you want to execute that code immediately:
```
(async () => {
    await makeCoffee()
    console.log('coffee is ready!')
})()
```
Looping with async await
When using async await in loops, you might encounter some of these problems.

If you just try to use await inside forEach, this will throw an Unexpected token error.
```
(async() => {
    data = [1, 2, 3, 4, 5];
    data.forEach(e => {
        const i = await somePromiseFn(e);
        console.log(i);
    });
})();
```
This comes from the fact that you've erroneously seen the arrow function as a block. The await will be in the context of the callback function, which is not async.

The interpreter protects us from making the above error, but if you add async to the forEach callback no errors get thrown. You might think this solves the problem, but it won't work as expected.
```
(async() => {
data = [1, 2, 3, 4, 5];
data.forEach(async(e) => {
    const i = await somePromiseFn(e);
    console.log(i);
});
console.log('this will print first');
})();
```
This happens because the callback async function can only pause itself, not the parent async function.

You could write an asyncForEach function that returns a promise and then you could something like `await asyncForEach(async (e) => await somePromiseFn(e), data )`. Basically you return a promise that resolves when all the callbacks are awaited and done. But there are better ways of doing this, and that is to just use a loop.

You can use a for-of loop or a for/while loop, it doesn't really matter which one you pick.
```
(async() => {
    data = [1, 2, 3, 4, 5];
    for (let e of data) {
        const i = await somePromiseFn(e);
        console.log(i);
    }
    console.log('this will print last');
})();
```
But there's another catch. This solution will wait for each call to somePromiseFn to complete before iterating over the next one.

This is great if you actually want your somePromiseFn invocations to be executed in order but if you want them to run concurrently, you will need to await on Promise.all.
```
(async() => {
    data = [1, 2, 3, 4, 5];
    const p = await Promise.all(data.map(async(e) => await somePromiseFn(e)));
    console.log(...p);
})();
```
Promise.all receives an array of promises as its only parameter and returns a promise. When all of the promises in the array are resolved, the returned promise is also resolved. We await on that promise and when it's resolved all our values are available.

The above examples are fully runnable. The somePromiseFn function can be made as an async echo function with a timeout.
```
function somePromiseFn(n) {
    return new Promise((res, rej) => {
        setTimeout(() => res(n), 250);
    });
}
```
##### Less indentation
With promises:
```
function doTheThing() {
    return doOneThing()
        .then(doAnother)
        .then(doSomeMore)
        .catch(handleErrors)
}
```
With async functions:
```
async function doTheThing() {
    try {
        const one = await doOneThing();
        const another = await doAnother(one);
        return await doSomeMore(another);
    } catch (err) {
        handleErrors(err);
    }
}
```
Note how the return is at the bottom, and not at the top, and you use the language's native error-handling mechanics (try/catch).

###### Simultaneous async (parallel) operations
Often you will want to perform asynchronous operations in parallel. There is direct syntax that supports this in the async/await proposal, but since await will wait for a promise, you can wrap multiple promises together in Promise.all to wait for them:
```
// Not in parallel
async function getFriendPosts(user) {
    friendIds = await db.get("friends", {user}, {id: 1});
    friendPosts = [];
    for (let id in friendIds) {
        friendPosts = friendPosts.concat( await db.get("posts", {user: id}) );
    }
    // etc.
}
```
This will do each query to get each friend's posts serially, but they can be done simultaneously:
```
// In parallel
async function getFriendPosts(user) {
    friendIds = await.db.get("friends", {user}, {id: 1});
    friendPosts = await Promise.all( friendIds.map(id =>
        db.get("posts", {user: id})
    );
    // etc.
}
```
This will loop over the list of IDs to create an array of promises. await will wait for all promises to be complete.

Promise.all combines them into a single promise, but they are done in parallel.

### Async Iterators
An async function is one that returns a promise. await yields to the caller until the promise resolves and then continues with the result.

An iterator allows the collection to be looped through with a for-of loop.

An async iterator is a collection where each iteration is a promise which can be awaited using a for-await-of loop.

A JavaScript Iterator is an object with a .next() method, which returns an IteratorItem, which is an object with value : `<any> and done : <boolean>`.

A JavaScript AsyncIterator is an object with a .next() method, which returns a Promise<IteratorItem>, a promise for the next value.

To create an AsyncIterator, we can use the async generator syntax:
```
// Returns a promise which resolves after time had passed.

const delay = time => new Promise(resolve => setTimeout(resolve, time));

async function* delayedRange(max) {
    for (let i = 0; i < max; i++) {
        await delay(1000);
        yield i;
    }
}

for await (let number of delayedRange(10)) {
    console.log(number);
}
```
The for await of loop is another piece of new syntax, available only inside of async functions, as well as async generators. Inside the loop, the values yielded (which, remember, are Promises) are unwrapped, so the Promise is hidden away. Within the loop, you can deal with the direct values (the yielded numbers), the for await of loop will wait for the Promises on your behalf.

The above example will wait 1 second, log 0, wait another second, log 1, and so on, until it logs 9. At which point the AsyncIterator will be done, and the for await of loop will exit.

### How to make iterator usable inside async callback function
When using async callback we need to consider scope. Especially if inside a loop. This simple article shows what not to do and a simple working example.

##### Erroneous code, can you spot why this usage of key will lead to bugs?
```
var pipeline = {};
// (...) adding things in pipeline
for(var key in pipeline) {
    fs.stat(pipeline[key].path, function(err, stats) {
        if (err) {
            // clear that one
            delete pipeline[key];
            return;
        }
        // (...)
        pipeline[key].count++;
    });
}
```
The problem is that there is only one instance of var key. All callbacks will share the same key instance. At the time the callback will ﬁre, the key will most likely have been incremented and not pointing to the element we are receiving the stats for.

##### Correct Writing
```
var pipeline = {};
// (...) adding things in pipeline
var processOneFile = function(key) {
    fs.stat(pipeline[key].path, function(err, stats) {
        if (err) {
            // clear that one
            delete pipeline[key];
            return;
        }
        // (...)
        pipeline[key].count++;
    });
};
// verify it is not growing
for(var key in pipeline) {
    processOneFileInPipeline(key);
}
```
By creating a new function, we are scoping key inside a function so all callback have their own key instance.
