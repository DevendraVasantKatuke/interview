- 📜 [Promise — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- 📜 [JavaScript Promises for Dummies ― Jecelyn Yeen](https://scotch.io/tutorials/javascript-promises-for-dummies)
- 📜 [Understanding promises in JavaScript — Gokul N K](https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1)
- 📜 [Master the JavaScript Interview: What is a Promise? — Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
- 📜 [An Overview of JavaScript Promises — Sandeep Panda](https://www.sitepoint.com/overview-javascript-promises/)
- 📜 [How to use Promises in JavaScript — Prashant Ram](https://medium.freecodecamp.org/promises-in-javascript-explained-277b98850de)
- 📜 [Implementing Promises In JavaScript — Maciej Cieslar](https://medium.freecodecamp.org/how-to-implement-promises-in-javascript-1ce2680a7f51)
- 📜 [JavaScript: Promises explained with simple real life analogies — Shruti Kapoor](https://codeburst.io/javascript-promises-explained-with-simple-real-life-analogies-dd6908092138)
- 📜 [Promises for Asynchronous Programming — Exploring JS](http://exploringjs.com/es6/ch_promises.html)
- 📜 [JavaScript Promises Explained By Gambling At A Casino — Kevin Kononenko](https://blog.codeanalogies.com/2018/08/26/javascript-promises-explained-by-gambling-at-a-casino/)
- 📜 [ES6 Promises: Patterns and Anti-Patterns — Bobby Brennan](https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918)
- 📜 [A Simple Guide to ES6 Promises — Brandon Morelli](https://codeburst.io/a-simple-guide-to-es6-promises-d71bacd2e13a)
- 📜 [The ES6 Promises — Manoj Singh Negi](https://codeburst.io/the-es6-promises-87a979ab27e4)
- 📜 [ES6 Promises in Depth — Nicolás Bevacqua](https://ponyfoo.com/articles/es6-promises-in-depth)
- 📜 [Playing with Javascript Promises: A Comprehensive Approach — Rajesh Babu](https://codeburst.io/playing-with-javascript-promises-a-comprehensive-approach-25ab752c78c3)
- 📜 [How to Write a JavaScript Promise — Brandon Wozniewicz](https://medium.freecodecamp.org/how-to-write-a-javascript-promise-4ed8d44292b8)
- 📜 [A Coding Writer’s Guide: An Introduction To ES6 Promises — Andrew Ly](https://medium.com/@andrewly07/a-coding-writers-guide-an-introduction-to-es6-promises-9ff9f9e88f6c)
- 📜 [Understanding Promises in JavaScript — Chris Noring](https://dev.to/itnext/reverse-engineering-understand-promises-1jfc)
- 📜 [Converting callbacks to promises — Zell Liew](https://dev.to/zellwk/converting-callbacks-to-promises-nhn)
- 📜 [JavaScript Promises: Zero To Hero Plus Cheat Sheet — Joshua Saunders](https://medium.com/dailyjs/javascript-promises-zero-to-hero-plus-cheat-sheet-64d75051cffa)
- 📜 [Promises - JavaScript concepts — Agney Menon](https://dev.to/boywithsilverwings/promises-javascript-concepts-293c)
- 📜 [Javascript `Promise` 101 — Igor Irianto](https://dev.to/iggredible/javascript-promise-101-3idl)
- 📜 [Simplify JavaScript Promises — Sunny Singh](https://dev.to/sunnysingh/simplify-javascript-promises-4djb)
- 📜 [The Lowdown on Promises — Aphinya Dechalert](https://medium.com/better-programming/the-low-down-on-promises-af4a96bbb95f)
- 📜 [JavaScript Visualized: Promises & Async/Await — Lydia Hallie](https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke)
- 📜 [Promises in JavaScript — Peter Klingelhofer](https://dev.to/peterklingelhofer/promises-in-javascript-3h5k)
- 📜 [Best Practices for ES6 Promises — Basti Ortiz](https://dev.to/somedood/best-practices-for-es6-promises-36da)
- 📜 [Lo que debemos saber de EScript 2020 — Kike Sanchez](https://medium.com/zurvin/lo-que-debemos-saber-de-escript-2020-5fc61da5e4cd)
- 📜 [Promise Basics - javascript.info](https://javascript.info/promise-basics)
- 🎥 [Let's Learn ES6 - Promises — Ryan Christiani](https://www.youtube.com/watch?v=vQ3MoXnKfuQ)
- 🎥 [JavaScript ES6 / ES2015 Promises — Traversy Media](https://www.youtube.com/watch?v=XJEHuBZQ5dU)
- 🎥 [Promises — Fun Fun Function](https://www.youtube.com/watch?v=2d7s3spWAzo)
- 🎥 [Error Handling Promises in JavaScript — Fun Fun Function](https://www.youtube.com/watch?v=f8IgdnYIwOU)
- 🎥 [Promises Part 1 - Topics of JavaScript/ES6 — The Coding Train](https://www.youtube.com/watch?v=QO4NXhWo_NM)
- 🎥 [JavaScript Promise in 100 Seconds](https://www.youtube.com/watch?v=RvYYCGs45L4)

```
const promise = new Promise((resolve, reject) => {
    // Perform some work (possibly asynchronous)
    // ...

    if (/* Work has successfully finished and produced "value" */) {
        resolve(value);
    } else {
        // Something went wrong because of "reason"
        // The reason is traditionally an Error object, although
        // this is not required or enforced.
        let reason = new Error(message);
        reject(reason);
        // Throwing an error also rejects the promise.
        throw reason;
    }
});

promise.then(value => {
        // Work has completed successfully,
        // promise has been fulfilled with "value"
    }).catch(reason => {
        // Something went wrong,
        // promise has been rejected with "reason"
});
```
```
const promise = new Promise(resolve => setTimeout(resolve, 5000));
promise
    // 5 seconds later
    .then(() => 2)
        // returning a value from a then callback will cause
        // the new promise to resolve with this value
    .then(value => { /* value === 2 */ });
```
```
function wait(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
const p = wait(5000).then(() => wait(4000)).then(() => wait(1000));
p.then(() => { /* 10 seconds have passed */ });
```
```
const p = new Promise(resolve => {throw 'oh no'});
p.catch(() => 'oh yes').then(console.log.bind(console));
// outputs "oh yes"

p.catch(() => Promise.reject('oh yes'))
    .then(console.log.bind(console)) // won't be called
    .catch(console.error.bind(console)); // outputs "oh yes"
```
```
promise
    .then(result => {
        if (result.condition) {
            return handlerFn1()
                .then(handlerFn2);
        } else if (result.condition2) {
            return handlerFn3()
                .then(handlerFn4);
        } else {
            throw new Error("Invalid result");
        }
    })
    .then(handlerFn5)
    .catch(err => {
        console.error(err);
    });
```
Thus, the execution order of the functions looks like:
promise --> handlerFn1 -> handlerFn2 --> handlerFn5 ~~> .catch()
        |                             ^
        V                             |  
        -> handlerFn3 -> handlerFn4  -^

The single catch will get the error on whichever branch it may occur.
```
function resolve(value, milliseconds) {
    return new Promise(resolve => setTimeout(() => resolve(value), milliseconds));
}

// wait "millis" ms, then reject with "reason"
function reject(reason, milliseconds) {
    return new Promise((_, reject) => setTimeout(() => reject(reason), milliseconds));
}
Promise.all([
    resolve(1, 5000),
    resolve(2, 6000),
    resolve(3, 7000)
]).then(values => console.log(values)); // outputs "[1, 2, 3]" after 7 seconds.

Promise.all([
    resolve(1, 5000),
    reject('Error!', 6000),
    resolve(2, 7000)
]).then(values => console.log(values)) // does not output anything
.catch(reason => console.log(reason)); // outputs "Error!" after 6 seconds.

Promise.all([
    resolve(1, 5000),
    resolve(2, 6000),
    { hello: 3 }
])
.then(values => console.log(values)); // outputs "[1, 2, { hello: 3 }]" after 6 seconds

Promise.all([
    resolve(1, 5000),
    resolve(2, 6000),
    resolve(3, 7000)
])
.then(([result1, result2, result3]) => {
    console.log(result1);
    console.log(result2);
    console.log(result3);
});
```
```
// the "then" reduction
[1, 3, 5, 7, 9].reduce((seq, n) => {
    return seq.then(() => {
        console.log(n);
        return new Promise(res => setTimeout(res, 1000));
    });
}, Promise.resolve()).then(
    () => console.log('done'),
    (e) => console.log(e)
);
// will log 1, 3, 5, 7, 9, 'done' in 1s intervals

The "catch" reduction
var working_resource = 5; // one of the values from the source array
[1, 3, 5, 7, 9].reduce(
    (seq, n) => {
        return seq.catch(() => {
            console.log(n);
            if(n === working_resource) { // 5 is working
                return new Promise((resolve, reject) => setTimeout(() => resolve(n), 1000));
            } else { // all other values are not working
                return new Promise((resolve, reject) => setTimeout(reject, 1000));
            }
        });
    }, 
    Promise.reject()).then(
        (n) => console.log('success at: ' + n),
        () => console.log('total failure')
    );
    // will log 1, 3, 5, 'success at 5' at 1s intervals
```
```
// wait "milliseconds" milliseconds, then resolve with "value"
function resolve(value, milliseconds) {
    return new Promise(resolve => setTimeout(() => resolve(value), milliseconds));
}

// wait "milliseconds" milliseconds, then reject with "reason"
function reject(reason, milliseconds) {
    return new Promise((_, reject) => setTimeout(() => reject(reason), milliseconds));
}

Promise.race([
    resolve(1, 5000),
    resolve(2, 3000),
    resolve(3, 1000)
])
.then(value => console.log(value)); // outputs "3" after 1 second.

Promise.race([
    reject(new Error('bad things!'), 1000),
    resolve(2, 2000)
])
.then(value => console.log(value)) // does not output anything
.catch(error => console.log(error.message)); // outputs "bad things!" after 1 second
```
```
fooFn(options, function callback(err, result) { ... });

// you can promisify it (convert it to a promise-based function) like this:
function promiseFooFn(options) {
    return new Promise((resolve, reject) =>
        fooFn(options, (err, result) =>
            // If there's an error, reject; otherwise resolve
            err ? reject(err) : resolve(result)
        )
    );
}

promiseFooFn(options).then(result => {
    // success!
}).catch(err => {
    // error!
});

// In a more generic way, here's how to promisify any given callback-style function:
function promisify(func) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            func(...args, (err, result) => err ? reject(err) : resolve(result));
        });
    }
}

const fs = require('fs');
const promisedStat = promisify(fs.stat.bind(fs));
promisedStat('/foo/bar')
    .then(stat => console.log('STATE', stat))
    .catch(err => console.log('ERROR', err));
```
```
throwErrorAsync()
    .then(null, error => { /* handle error here */ });

// or
throwErrorAsync()
    .catch(error => { /* handle error here */ });
```
```
throwErrorAsync()
    .then(() => { /* never called */ })
    .catch(error => { /* handle error here */ });
```
```
doSomethingAsync()
    .then(result => { throwErrorSync(); })
    .then(() => { /* never called */ })
    .catch(error => { /* handle error from throwErrorSync() */ });
```
```
throwErrorAsync()
    .catch(error => { /* handle error here */; return result; })
    .then(result => { /* handle result here */ });
```
```
throwErrorAsync()
    .catch(error => {
        /* handle error from throwErrorAsync() */
        throw error;
    })
    .then(() => { /* will not be called if there's an error */ })
    .catch(error => { /* will get called with the same error */ });
```
```
new Promise((resolve, reject) => {
    setTimeout(() => { throw new Error(); });
});
```
```
throwErrorAsync()
    .then(() => { /* will not be called */ });
    // error silently ignored
```
```
throwErrorAsync()
    .then(() => { /* will not be called */ })
    .catch(error => { /* handle error*/ });

// or
throwErrorAsync()
    .then(() => { /* will not be called */ }, error => { /* handle error*/ });
```
```
window.addEventListener('unhandledrejection', event => console.log('unhandled'));
window.addEventListener('rejectionhandled', event => console.log('handled'));
var p = Promise.reject('test');
setTimeout(() => p.catch(console.log), 1000);
// Will print 'unhandled', and after one second 'test' and 'handled'
```
```
process.on('rejectionHandled', (reason, promise) => {});
process.on('unhandledRejection', (reason, promise) => {});
```
```
// the following calls are equivalent
promise.then(fulfill, null)
promise.then(fulfill)

// the following calls are also equivalent
promise.then(null, reject)
promise.catch(reject)
```
```
// the following calls are not equivalent!
promise.then(fulfill, reject)
promise.then(fulfill).catch(reject)
// the following calls are not equivalent!
promise.then(fulfill, reject)
promise.catch(reject).then(fulfill)
```
```
Promise.resolve() // previous promise is fulfilled
    .then(() => { throw new Error(); }, // error in the fulfill handler
    error => { /* this is not called! */ });
```
```
Promise.resolve() // previous promise is fulfilled
    .then(() => { throw new Error(); }) // error in the fulfill handler
    .catch(error => { /* handle error */ });
```
```
function foo(arg) {
    if (arg === 'unexepectedValue') {
        throw new Error('UnexpectedValue')
    }
    return new Promise(resolve =>
        setTimeout(() => resolve(arg), 1000)
    )
}
```
```
makeSomethingAsync()
    .then(() => foo('unexpectedValue'))
    .catch(err => console.log(err)) // <-- Error: UnexpectedValue will be caught here
```
```
foo('unexpectedValue') // <-- error will be thrown, so the application will crash
    .then(makeSomethingAsync) // <-- will not run
    .catch(err => console.log(err)) // <-- will not catch

// There are 2 possible workarounds:
// Return a rejected promise with the error
function foo(arg) {
    if (arg === 'unexepectedValue') {
        return Promise.reject(new Error('UnexpectedValue'))
    }
    return new Promise(resolve =>
        setTimeout(() => resolve(arg), 1000)
    )
}

// Wrap your function into a promise chain
function foo(arg) {
    return Promise.resolve()
        .then(() => {
            if (arg === 'unexepectedValue') {
                throw new Error('UnexpectedValue')
            }
            return new Promise(resolve =>
                setTimeout(() => resolve(arg), 1000)
            )
        })
}
```
```
if (result) { // if we already have a result
    processResult(result); // process it
} else {
    fetchResult().then(processResult);
}
```
```
var fetch = result
    ? Promise.resolve(result)
    : fetchResult();

fetch.then(processResult);
```
```
// A resource that is not expected to change frequently
var planets = 'http://swapi.co/api/planets/';

// The cached promise, or null
var cachedPromise;

function fetchResult() {
    if (!cachedPromise) {
        cachedPromise = fetch(planets)
        .catch(function (e) {
            // Invalidate the current result to retry on the next fetch
            cachedPromise = null;
            // re-raise the error to propagate it to callers
            throw e;
        });
    }
    return cachedPromise;
}
```
```
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
wait(5000).then(() => {
    console.log('5 seconds have passed...');
});
```
```
let resolved = Promise.resolve(2);
resolved.then(value => {
    // immediately invoked
    // value === 2
});
```
```
let one = new Promise(resolve => setTimeout(() => resolve(2), 1000));
let two = Promise.resolve(one);
two.then(value => {
    // 1 second has passed
    // value === 2
});
```
```
let resolved = Promise.resolve({
    then(onResolved) {
        onResolved(2);
    }
});
resolved.then(value => {
    // immediately invoked
    // value === 2
});
```
```
let rejected = Promise.reject("Oops!");
rejected.catch(reason => {
    // immediately invoked
    // reason === "Oops!"
});
```
```
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', () => {
            reject(new Error(`Failed to load ${url}`));
        });
        img.src = url;
    });
}

(async () => {
    // load /image.png and append to #image-holder, otherwise throw error
    try {
        let img = await loadImage('http://example.com/image.png');
        document.getElementById('image-holder').appendChild(img);
    } catch (error) {
        console.error(error);
    }
})();
```
```
var loadingData = true;

fetch('/data')
    .then(result => processData(result.data))
    .catch(error => console.error(error))
    .finally(() => {
        loadingData = false;
    });
```
```
if (!Promise.prototype.finally) {
    Promise.prototype.finally = function(callback) {
        return this.then(result => {
            callback();
            return result;
        }, error => {
            callback();
            throw error;
        });
    };
}
```
```
function promiseForEach(arr, cb) {
    var i = 0;
    var nextPromise = function () {
        if (i >= arr.length) {
            // Processing finished.
            return;
        }

        // Process next function. Wrap in `Promise.resolve` in case
        // the function does not return a promise
        var newPromise = Promise.resolve(cb(arr[i], i));
        i++;
        // Chain to finish processing.
        return newPromise.then(nextPromise);
    };
    // Kick off the chain.
    return Promise.resolve().then(nextPromise);
};
```
```
var get = function(path) {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('GET', path);
        request.onload = resolve;
        request.onerror = reject;
        request.send();
    });
};
```
```
request.onload = function() {
    if (this.status >= 200 && this.status < 300) {
        if(request.response) {
            // Assuming a successful call returns JSON
            resolve(JSON.parse(request.response));
        } else {
            resolve();
        } 
    } else {
        reject(
            {
                'status': this.status,
                'message': request.statusText
        });
    }
};

request.onerror = function() {
    reject(
        {
            'status': this.status,
            'message': request.statusText
    });
};
```