Promises can be in one of four states.
- resolve – When the code associated with the promise completes successfully. And the resolve callback is called.
- reject – When the code associated with the promise fails, the reject callback function is called.
- pending – When the promise has neither been resolved nor rejected.
- fulfilled – When the promise has either been resolved or rejected.
```
const myPromise = new Promise(callback);
function callback(resolve, reject) {
  if (1 + 1 === 2) {
    resolve();
  } else {
    reject();
  }
}
```
```
const myPromise = new Promise(callback);
function callback(resolve, reject) {
  // perform some asynchronous operations
  let sum = 1 + 1; // let assume this an asynchronous operation
  if (sum === 2) {
    resolve("1 + 1 is actually equal to 2");
  } else {
    reject("ooops! An error occured");
  }
}
```
```
myPromise
  .then((info) => {
    console.log(info); // logs ‘1 + 1 is actually equal to 2’ to the console
  })
  .catch((info) => {
    console.log(info); // prints ‘ooops! Something crazy.  1 + 1 is no more equal to 2’ to the console
  })
  .finally(() => {
    console.log(
      "finally is sure to always execute because it executes if the promise succeeds or rejects
    );
  });
```
```
fetch("http://some-remote-endpoints")
      .then((response) => respone.json())
      .then((data) => setNames(data))
      .catch((error) => console.log(error));
```