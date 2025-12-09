If you’re reading this, you probably understand how the promise and async/await are different in the execution context.

![Alt text](image.gif)
In JavaScript, promises and async/await are two different ways to handle asynchronous operations. But they are closely related.

Promise

A promise is an object that eventually leads to an asynchronous operation’s completion or failure. A promise can be in one of three states: pending, fulfilled, or rejected. When the asynchronous operation is completed, the Promise will either be fulfilled with a value or rejected with an error.

```
// Using Promises
function promiseFunction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Resolved");
        }, 2000);
    })
}

console.log("Start");
promiseFunction()
    .then((result) => {
        console.log(result);
        console.log("End");
    })
    .catch((error) => {
        console.log(error)
    });

Output:
Start
Resolved
End
```

Async/Await

Async/await is a syntactic sugar on top of promises. It provides a more concise way to write asynchronous code, making it easier to read and write. With Async/Await, you can write asynchronous code that looks similar to synchronous code, and it uses promises under the hood.

In async/await, the async keyword is used to declare an asynchronous function. The await keyword is used to wait for a promise to be resolved before continuing with the execution of the function. The await keyword can only be used inside an async function.
```
// Using Async/Await
async function asyncFunction() {
    try {
        console.log("Start");
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Resolved");
            }, 2000);
        });
        const result = await promise;
        console.log(result);
        console.log("End");
    } catch (error) {
        console.error(error);
    }
}

asyncFunction()

output:
Start
Resolved
End
```

Difference

The only difference is the execution context between promise and async/await.

When a Promise is created and the asynchronous operation is started, the code after the Promise creation continues to execute synchronously. When the Promise is resolved or rejected, the attached callback function is added to the microtask queue. The microtask queue is processed after the current task has been completed but before the next task is processed from the task queue. This means that any code that follows the creation of the Promise will execute before the callback function attached to the Promise is executed.

On the other hand, with Async/Await, the await keyword causes the JavaScript engine to pause the execution of the async function until the Promise is resolved or rejected. While the async function waits for the Promise to resolve, it does not block the call stack, and any other synchronous code can be executed. Once the Promise is resolved, the execution of the async function resumes, and the result of the Promise is returned. If rejected, it throws an error value.