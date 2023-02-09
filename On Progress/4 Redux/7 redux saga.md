https://blog.logrocket.com/redux-toolkits-new-listener-middleware-vs-redux-saga/
# Getting started

## Install

```sh
$ npm install redux-saga
```
or

```sh
$ yarn add redux-saga
```

Alternatively, you may use the provided UMD builds directly in the `<script>` tag of an HTML page. See [this section](#using-umd-build-in-the-browser).

## Usage Example

Suppose we have a UI to fetch some user data from a remote server when a button is clicked. (For brevity, we'll just show the action triggering code.)

```javascript
class UserComponent extends React.Component {
  ...
  onSomeButtonClicked() {
    const { userId, dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }
  ...
}
```

The Component dispatches a plain Object action to the Store. We'll create a Saga that watches for all `USER_FETCH_REQUESTED` actions and triggers an API call to fetch the user data.

#### `sagas.js`

```javascript
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```

To run our Saga, we'll have to connect it to the Redux Store using the `redux-saga` middleware.

#### `main.js`

```javascript
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(mySaga)

// render the application
```

## Using UMD build in the browser

There is also a **UMD** build of `redux-saga` available in the `dist/` folder. When using the umd build `redux-saga` is available as `ReduxSaga` in the window object. This enables you to create Saga middleware without using ES6 `import` syntax like this:

```javascript
var sagaMiddleware = ReduxSaga.default()
```

The UMD version is useful if you don't use Webpack or Browserify. You can access it directly from [unpkg](https://unpkg.com/).

The following builds are available:

- [https://unpkg.com/redux-saga/dist/redux-saga.umd.js](https://unpkg.com/redux-saga/dist/redux-saga.umd.js)
- [https://unpkg.com/redux-saga/dist/redux-saga.umd.min.js](https://unpkg.com/redux-saga/dist/redux-saga.umd.min.js)

**Important!**  
If the browser you are targeting doesn't support *ES2015 generators*, you must transpile them (i.e., with [babel plugin](https://github.com/facebook/regenerator/tree/master/packages/regenerator-transform)) and provide a valid runtime, such as [the one here](https://unpkg.com/regenerator-runtime/runtime.js). The runtime must be imported before **redux-saga**:

```javascript
import 'regenerator-runtime/runtime'
// then
import sagaMiddleware from 'redux-saga'
```

# Beginner Tutorial

## Objectives of this tutorial

This tutorial attempts to introduce redux-saga in a (hopefully) accessible way.

For our getting started tutorial, we are going to use the trivial Counter demo from the Redux repo. The application is quite basic but is a good fit to illustrate the basic concepts of redux-saga without being lost in excessive details.

### The initial setup

Before we start, clone the [tutorial repository](https://github.com/redux-saga/redux-saga-beginner-tutorial).

> The final code of this tutorial is located in the `sagas` branch.

Then in the command line, run:

```sh
$ cd redux-saga-beginner-tutorial
$ npm install
```

To start the application, run:

```sh
$ npm start
```

Once compilation has finished, open [http://localhost:9966](http://localhost:9966) in a browser.

We are starting with the most basic use case: 2 buttons to `Increment` and `Decrement` a counter. Later, we will introduce asynchronous calls.

If things go well, you should see 2 buttons `Increment` and `Decrement` along with a message below showing `Counter: 0`.

> In case you encountered an issue with running the application. Feel free to create an issue on the [tutorial repo](https://github.com/redux-saga/redux-saga-beginner-tutorial/issues).

## Hello Sagas!

We are going to create our first Saga. Following the tradition, we will write our 'Hello, world' version for Sagas.

Create a file `sagas.js` then add the following snippet:

```javascript
export function* helloSaga() {
  console.log('Hello Sagas!')
}
```

So nothing scary, just a normal function (except for the `*`). All it does is print a greeting message into the console.

In order to run our Saga, we need to:

- create a Saga middleware with a list of Sagas to run (so far we have only one `helloSaga`)
- connect the Saga middleware to the Redux store

We will make the changes to `main.js`:

```javascript
// ...
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// ...
import { helloSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})

// rest unchanged
```

First we import our Saga from the `./sagas` module. Then we create a middleware using the factory function `createSagaMiddleware` exported by the `redux-saga` library.

Before running our `helloSaga`, we must connect our middleware to the Store using `applyMiddleware`. Then we can use the `sagaMiddleware.run(helloSaga)` to start our Saga.

So far, our Saga does nothing special. It just logs a message then exits.

## Making Asynchronous calls

Now let's add something closer to the original Counter demo. To illustrate asynchronous calls, we will add another button to increment the counter 1 second after the click.

First things first, we'll provide an additional button and a callback `onIncrementAsync` to the UI component.

We will make the changes to `Counter.js`:

```javascript
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
  <div>
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked: {value} times
    </div>
  </div>
```

Next we should connect the `onIncrementAsync` of the Component to a Store action.

We will modify the `main.js` module as follows

```javascript
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}
```

Note that unlike in redux-thunk, our component dispatches a plain object action.

Now we will introduce another Saga to perform the asynchronous call. Our use case is as follows:

> On each `INCREMENT_ASYNC` action, we want to start a task that will do the following

> - Wait 1 second then increment the counter

Add the following code to the `sagas.js` module:

```javascript
import { put, takeEvery } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// ...

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```

Time for some explanations.

We create a `delay` function that returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will resolve after a specified number of milliseconds. We'll use this function to *block* the Generator.

Sagas are implemented as [Generator functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) that *yield* objects to the redux-saga middleware. The yielded objects are a kind of instruction to be interpreted by the middleware. When a Promise is yielded to the middleware, the middleware will suspend the Saga until the Promise completes. In the above example, the `incrementAsync` Saga is suspended until the Promise returned by `delay` resolves, which will happen after 1 second.

Once the Promise is resolved, the middleware will resume the Saga, executing code until the next yield. In this example, the next statement is another yielded object: the result of calling `put({type: 'INCREMENT'})`, which instructs the middleware to dispatch an `INCREMENT` action.

`put` is one example of what we call an *Effect*. Effects are plain JavaScript objects which contain instructions to be fulfilled by the middleware. When a middleware retrieves an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled.

So to summarize, the `incrementAsync` Saga sleeps for 1 second via the call to `delay(1000)`, then dispatches an `INCREMENT` action.

Next, we created another Saga `watchIncrementAsync`. We use `takeEvery`, a helper function provided by `redux-saga`, to listen for dispatched `INCREMENT_ASYNC` actions and run `incrementAsync` each time.

Now we have 2 Sagas, and we need to start them both at once. To do that, we'll add a `rootSaga` that is responsible for starting our other Sagas. In the same file `sagas.js`, refactor the file as follows:

```javascript
import { put, takeEvery, all } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
```

This Saga yields an array with the results of calling our two sagas, `helloSaga` and `watchIncrementAsync`. This means the two resulting Generators will be started in parallel. Now we only have to invoke `sagaMiddleware.run` on the root Saga in `main.js`.

```javascript
// ...
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = ...
sagaMiddleware.run(rootSaga)

// ...
```

## Making our code testable

We want to test our `incrementAsync` Saga to make sure it performs the desired task.

Create another file `sagas.spec.js`:

```javascript
import test from 'tape'

import { incrementAsync } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  // now what ?
})
```

`incrementAsync` is a generator function. When run, it returns an iterator object, and the iterator's `next` method returns an object with the following shape

```javascript
gen.next() // => { done: boolean, value: any }
```

The `value` field contains the yielded expression, i.e. the result of the expression after
the `yield`. The `done` field indicates if the generator has terminated or if there are still
more 'yield' expressions.

In the case of `incrementAsync`, the generator yields 2 values consecutively:

1. `yield delay(1000)`
2. `yield put({type: 'INCREMENT'})`

So if we invoke the next method of the generator 3 times consecutively we get the following
results:

```javascript
gen.next() // => { done: false, value: <result of calling delay(1000)> }
gen.next() // => { done: false, value: <result of calling put({type: 'INCREMENT'})> }
gen.next() // => { done: true, value: undefined }
```

The first 2 invocations return the results of the yield expressions. On the 3rd invocation
since there is no more yield the `done` field is set to true. And since the `incrementAsync`
Generator doesn't return anything (no `return` statement), the `value` field is set to
`undefined`.

So now, in order to test the logic inside `incrementAsync`, we'll have to iterate
over the returned Generator and check the values yielded by the generator.

```javascript
import test from 'tape'

import { incrementAsync } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  assert.deepEqual(
    gen.next(),
    { done: false, value: ??? },
    'incrementAsync should return a Promise that will resolve after 1 second'
  )
})
```

The issue is how do we test the return value of `delay`? We can't do a simple equality test
on Promises. If `delay` returned a *normal* value, things would've been easier to test.

Well, `redux-saga` provides a way to make the above statement possible. Instead of calling
`delay(1000)` directly inside `incrementAsync`, we'll call it *indirectly* and export it
to make a subsequent deep comparison possible:

```javascript
import { put, takeEvery, all, call } from 'redux-saga/effects'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

// ...

export function* incrementAsync() {
  // use the call Effect
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}
```

Instead of doing `yield delay(1000)`, we're now doing `yield call(delay, 1000)`. What's the difference?

In the first case, the yield expression `delay(1000)` is evaluated before it gets passed to the caller of `next` (the caller could be the middleware when running our code. It could also be our test code which runs the Generator function and iterates over the returned Generator). So what the caller gets is a Promise, like in the test code above.

In the second case, the yield expression `call(delay, 1000)` is what gets passed to the caller of `next`. `call` just like `put`, returns an Effect which instructs the middleware to call a given function with the given arguments. In fact, neither `put` nor `call` performs any dispatch or asynchronous call by themselves, they return plain JavaScript objects.

```javascript
put({type: 'INCREMENT'}) // => { PUT: {type: 'INCREMENT'} }
call(delay, 1000)        // => { CALL: {fn: delay, args: [1000]}}
```

What happens is that the middleware examines the type of each yielded Effect then decides how to fulfill that Effect. If the Effect type is a `PUT` then it will dispatch an action to the Store. If the Effect is a `CALL` then it'll call the given function.

This separation between Effect creation and Effect execution makes it possible to test our Generator in a surprisingly easy way:

```javascript
import test from 'tape'

import { put, call } from 'redux-saga/effects'
import { incrementAsync, delay } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
})
```

Since `put` and `call` return plain objects, we can reuse the same functions in our test code. And to test the logic of `incrementAsync`, we iterate over the generator and do `deepEqual` tests on its values.

In order to run the above test, run:

```sh
$ npm test
```

which should report the results on the console.

# Background on the Saga concept

**WIP**

For now, here are some useful links.

## External links

- [Applying the Saga Pattern (Youtube video)](https://www.youtube.com/watch?v=xDuwrtwYHu8) By Caitie McCaffrey
- [Original paper](http://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf) By Hector Garcia-Molina & Kenneth Salem
- [A Saga on Sagas](https://msdn.microsoft.com/en-us/library/jj591569.aspx) from MSDN site

# Declarative Effects

In `redux-saga`, Sagas are implemented using Generator functions. To express the Saga logic, we yield plain JavaScript Objects from the Generator. We call those Objects [*Effects*](https://redux-saga.js.org/docs/api/#effect-creators). An Effect is an object that contains some information to be interpreted by the middleware. You can view Effects like instructions to the middleware to perform some operation (e.g., invoke some asynchronous function, dispatch an action to the store, etc.).

To create Effects, you use the functions provided by the library in the `redux-saga/effects` package.

In this section and the following, we will introduce some basic Effects. And see how the concept allows the Sagas to be easily tested.

Sagas can yield Effects in multiple forms. The easiest way is to yield a Promise.

For example suppose we have a Saga that watches a `PRODUCTS_REQUESTED` action. On each matching action, it starts a task to fetch a list of products from a server.

```javascript
import { takeEvery } from 'redux-saga/effects'
import Api from './path/to/api'

function* watchFetchProducts() {
  yield takeEvery('PRODUCTS_REQUESTED', fetchProducts)
}

function* fetchProducts() {
  const products = yield Api.fetch('/products')
  console.log(products)
}
```

In the example above, we are invoking `Api.fetch` directly from inside the Generator (In Generator functions, any expression at the right of `yield` is evaluated then the result is yielded to the caller).

`Api.fetch('/products')` triggers an AJAX request and returns a Promise that will resolve with the resolved response, the AJAX request will be executed immediately. Simple and idiomatic, but...

Suppose we want to test the generator above:

```javascript
const iterator = fetchProducts()
assert.deepEqual(iterator.next().value, ??) // what do we expect ?
```

We want to check the result of the first value yielded by the generator. In our case it's the result of running `Api.fetch('/products')` which is a Promise . Executing the real service during tests is neither a viable nor practical approach, so we have to *mock* the `Api.fetch` function, i.e. we'll have to replace the real function with a fake one which doesn't actually run the AJAX request but only checks that we've called `Api.fetch` with the right arguments (`'/products'` in our case).

Mocks make testing more difficult and less reliable. On the other hand, functions that return values are easier to test, since we can use a simple `equal()` to check the result. This is the way to write the most reliable tests.

Not convinced? I encourage you to read [Eric Elliott's article](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d#.4ttnnzpgc):

> (...)`equal()`, by nature answers the two most important questions every unit test must answer,
but most don’t:
- What is the actual output?
- What is the expected output?
>
> If you finish a test without answering those two questions, you don’t have a real unit test. You have a sloppy, half-baked test.

What we actually need to do is make sure the `fetchProducts` task yields a call with the right function and the right arguments.

Instead of invoking the asynchronous function directly from inside the Generator, **we can yield only a description of the function invocation**. i.e. We'll yield an object which looks like

```javascript
// Effect -> call the function Api.fetch with `./products` as argument
{
  CALL: {
    fn: Api.fetch,
    args: ['./products']
  }
}
```

Put another way, the Generator will yield plain Objects containing *instructions*, and the `redux-saga` middleware will take care of executing those instructions and giving back the result of their execution to the Generator. This way, when testing the Generator, all we need to do is to check that it yields the expected instruction by doing a simple `deepEqual` on the yielded Object.

For this reason, the library provides a different way to perform asynchronous calls.

```javascript
import { call } from 'redux-saga/effects'

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // ...
}
```

We're using now the `call(fn, ...args)` function. **The difference from the preceding example is that now we're not executing the fetch call immediately, instead, `call` creates a description of the effect**. Just as in Redux you use action creators to create a plain object describing the action that will get executed by the Store, `call` creates a plain object describing the function call. The redux-saga middleware takes care of executing the function call and resuming the generator with the resolved response.

This allows us to easily test the Generator outside the Redux environment. Because `call` is just a function which returns a plain Object.

```javascript
import { call } from 'redux-saga/effects'
import Api from '...'

const iterator = fetchProducts()

// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
)
```

Now we don't need to mock anything, and a basic equality test will suffice.

The advantage of those *declarative calls* is that we can test all the logic inside a Saga by iterating over the Generator and doing a `deepEqual` test on the values yielded successively. This is a real benefit, as your complex asynchronous operations are no longer black boxes, and you can test in detail their operational logic no matter how complex it is.

`call` also supports invoking object methods, you can provide a `this` context to the invoked functions using the following form:

```javascript
yield call([obj, obj.method], arg1, arg2, ...) // as if we did obj.method(arg1, arg2 ...)
```

`apply` is an alias for the method invocation form

```javascript
yield apply(obj, obj.method, [arg1, arg2, ...])
```

`call` and `apply` are well suited for functions that return Promise results. Another function `cps` can be used to handle Node style functions (e.g. `fn(...args, callback)` where `callback` is of the form `(error, result) => ()`). `cps` stands for Continuation Passing Style.

For example:

```javascript
import { cps } from 'redux-saga/effects'

const content = yield cps(readFile, '/path/to/file')
```

And of course you can test it just like you test `call`:

```javascript
import { cps } from 'redux-saga/effects'

const iterator = fetchSaga()
assert.deepEqual(iterator.next().value, cps(readFile, '/path/to/file') )
```

`cps` also supports the same method invocation form as `call`.

A full list of declarative effects can be found in the [API reference](https://redux-saga.js.org/docs/api/#effect-creators).

# Dispatching actions to the store

Taking the previous example further, let's say that after each save, we want to dispatch some action
to notify the Store that the fetch has succeeded (we'll omit the failure case for the moment).

We could pass the Store's `dispatch` function to the Generator. Then the
Generator could invoke it after receiving the fetch response:

```javascript
// ...

function* fetchProducts(dispatch) {
  const products = yield call(Api.fetch, '/products')
  dispatch({ type: 'PRODUCTS_RECEIVED', products })
}
```

However, this solution has the same drawbacks as invoking functions directly from inside the Generator (as discussed in the previous section). If we want to test that `fetchProducts` performs
the dispatch after receiving the AJAX response, we'll need again to mock the `dispatch`
function.

Instead, we need the same declarative solution. Create a plain JavaScript Object to instruct the
middleware that we need to dispatch some action, and let the middleware perform the real
dispatch. This way we can test the Generator's dispatch in the same way: by inspecting
the yielded Effect and making sure it contains the correct instructions.

The library provides, for this purpose, another function `put` which creates the dispatch
Effect.

```javascript
import { call, put } from 'redux-saga/effects'
// ...

function* fetchProducts() {
  const products = yield call(Api.fetch, '/products')
  // create and yield a dispatch Effect
  yield put({ type: 'PRODUCTS_RECEIVED', products })
}
```

Now, we can test the Generator easily as in the previous section

```javascript
import { call, put } from 'redux-saga/effects'
import Api from '...'

const iterator = fetchProducts()

// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
)

// create a fake response
const products = {}

// expects a dispatch instruction
assert.deepEqual(
  iterator.next(products).value,
  put({ type: 'PRODUCTS_RECEIVED', products }),
  "fetchProducts should yield an Effect put({ type: 'PRODUCTS_RECEIVED', products })"
)
```

Note how we pass the fake response to the Generator via its `next` method. Outside the
middleware environment, we have total control over the Generator, we can simulate a
real environment by mocking results and resuming the Generator with them. Mocking
data is a lot easier than mocking functions and spying calls.

# A common abstraction: Effect

To generalize, triggering Side Effects from inside a Saga is always done by yielding some declarative Effect. (You can also yield Promise directly, but this will make testing difficult as we saw in the first section.)

What a Saga does is actually compose all those Effects together to implement the desired control flow. The most basic example is to sequence yielded Effects by putting the yields one after another. You can also use the familiar control flow operators (`if`, `while`, `for`) to implement more sophisticated control flows.

We saw that using Effects like `call` and `put`, combined with high-level APIs like `takeEvery` allows us to achieve the same things as `redux-thunk`, but with the added benefit of easy testability.

But `redux-saga` provides another advantage over `redux-thunk`. In the Advanced section you'll encounter some more powerful Effects that let you express complex control flows while still allowing the same testability benefit.

# Error handling

In this section we'll see how to handle the failure case from the previous example. Let's suppose that our API function `Api.fetch` returns a Promise which gets rejected when the remote fetch fails for some reason.

We want to handle those errors inside our Saga by dispatching a `PRODUCTS_REQUEST_FAILED` action to the Store.

We can catch errors inside the Saga using the familiar `try/catch` syntax.

```javascript
import Api from './path/to/api'
import { call, put } from 'redux-saga/effects'

// ...

function* fetchProducts() {
  try {
    const products = yield call(Api.fetch, '/products')
    yield put({ type: 'PRODUCTS_RECEIVED', products })
  }
  catch(error) {
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
  }
}
```

In order to test the failure case, we'll use the `throw` method of the Generator

```javascript
import { call, put } from 'redux-saga/effects'
import Api from '...'

const iterator = fetchProducts()

// expects a call instruction
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
)

// create a fake error
const error = {}

// expects a dispatch instruction
assert.deepEqual(
  iterator.throw(error).value,
  put({ type: 'PRODUCTS_REQUEST_FAILED', error }),
  "fetchProducts should yield an Effect put({ type: 'PRODUCTS_REQUEST_FAILED', error })"
)
```

In this case, we're passing the `throw` method a fake error. This will cause the Generator to break the current flow and execute the catch block.

Of course, you're not forced to handle your API errors inside `try`/`catch` blocks. You can also make your API service return a normal value with some error flag on it. For example, you can catch Promise rejections and map them to an object with an error field.

```javascript
import Api from './path/to/api'
import { call, put } from 'redux-saga/effects'

function fetchProductsApi() {
  return Api.fetch('/products')
    .then(response => ({ response }))
    .catch(error => ({ error }))
}

function* fetchProducts() {
  const { response, error } = yield call(fetchProductsApi)
  if (response)
    yield put({ type: 'PRODUCTS_RECEIVED', products: response })
  else
    yield put({ type: 'PRODUCTS_REQUEST_FAILED', error })
}
```

## onError hook
Errors in forked tasks [bubble up to their parents](../API.md#error-propagation)
until it is caught or reaches the root saga.
If an error propagates to the root saga the whole saga tree is already **terminated**. The preferred approach, in this case, to use [onError hook](../API.md#error-propagation#createsagamiddlewareoptions) to report an exception, inform a user about the problem and gracefully terminate your app.

Why can't I use `onError` hook as a global error handler?
Usually, there is no one-size-fits-all solution, as exceptions are context dependent. Consider `onError` hook as the last resort that helps you to handle **unexpected** errors.

What if I don't want an error to bubble?
Consider to use safe wrapper. You can find examples [here](https://github.com/redux-saga/redux-saga/issues/1250)

# Using Saga Helpers

`redux-saga` provides some helper effects wrapping internal functions to spawn tasks when some specific actions are dispatched to the Store.

The helper functions are built on top of the lower level API. In the advanced section, we'll see how those functions can be implemented.

The first function, `takeEvery` is the most familiar and provides a behavior similar to `redux-thunk`.

Let's illustrate with the common AJAX example. On each click on a Fetch button we dispatch a `FETCH_REQUESTED` action. We want to handle this action by launching a task that will fetch some data from the server.

First we create the task that will perform the asynchronous action:

```javascript
import { call, put } from 'redux-saga/effects'
import Api from './path/to/api'

export function* fetchData(action) {
  try {
    const data = yield call(Api.fetchUser, action.payload.url)
    yield put({ type: 'FETCH_SUCCEEDED', data })
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error })
  }
}
```

To launch the above task on each `FETCH_REQUESTED` action:

```javascript
import { takeEvery } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeEvery('FETCH_REQUESTED', fetchData)
}
```

In the above example, `takeEvery` allows multiple `fetchData` instances to be started concurrently. At a given moment, we can start a new `fetchData` task while there are still one or more previous `fetchData` tasks which have not yet terminated.

If we want to only get the response of the latest request fired (e.g. to always display the latest version of data) we can use the `takeLatest` helper:

```javascript
import { takeLatest } from 'redux-saga/effects'

function* watchFetchData() {
  yield takeLatest('FETCH_REQUESTED', fetchData)
}
```

Unlike `takeEvery`, `takeLatest` allows only one `fetchData` task to run at any moment. And it will be the latest started task. If a previous task is still running when another `fetchData` task is started, the previous task will be automatically cancelled.

If you have multiple Sagas watching for different actions, you can create multiple watchers with those built-in helpers, which will behave like there was `fork` used to spawn them (we'll talk about `fork` later. For now, consider it to be an Effect that allows us to start multiple sagas in the background).

For example:

```javascript
import { takeEvery } from 'redux-saga/effects'

// FETCH_USERS
function* fetchUsers(action) { ... }

// CREATE_USER
function* createUser(action) { ... }

// use them in parallel
export default function* rootSaga() {
  yield takeEvery('FETCH_USERS', fetchUsers)
  yield takeEvery('CREATE_USER', createUser)
}
```

# Using Channels

Until now we've used the `take` and `put` effects to communicate with the Redux Store. Channels generalize those Effects to communicate with external event sources or between Sagas themselves. They can also be used to queue specific actions from the Store.

In this section, we'll see:

- How to use the `yield actionChannel` Effect to buffer specific actions from the Store.

- How to use the `eventChannel` factory function to connect `take` Effects to external event sources.

- How to create a channel using the generic `channel` factory function and use it in `take`/`put` Effects to communicate between two Sagas.

## Using the `actionChannel` Effect

Let's review the canonical example:

```javascript
import { take, fork, ... } from 'redux-saga/effects'

function* watchRequests() {
  while (true) {
    const {payload} = yield take('REQUEST')
    yield fork(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }
```

The above example illustrates the typical *watch-and-fork* pattern. The `watchRequests` saga is using `fork` to avoid blocking and thus not missing any action from the store. A `handleRequest` task is created on each `REQUEST` action. So if there are many actions fired at a rapid rate there can be many `handleRequest` tasks executing concurrently.

Imagine now that our requirement is as follows: we want to process `REQUEST` serially. If we have at any moment four actions, we want to handle the first `REQUEST` action, then only after finishing this action we process the second action and so on...

So we want to *queue* all non-processed actions, and once we're done with processing the current request, we get the next message from the queue.

Redux-Saga provides a little helper Effect `actionChannel`, which can handle this for us. Let's see how we can rewrite the previous example with it:

```javascript
import { take, actionChannel, call, ... } from 'redux-saga/effects'

function* watchRequests() {
  // 1- Create a channel for request actions
  const requestChan = yield actionChannel('REQUEST')
  while (true) {
    // 2- take from the channel
    const {payload} = yield take(requestChan)
    // 3- Note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }
```

The first thing is to create the action channel. We use `yield actionChannel(pattern)` where pattern is interpreted using the same rules we mentioned previously with `take(pattern)`. The difference between the 2 forms is that `actionChannel` **can buffer incoming messages** if the Saga is not yet ready to take them (e.g. blocked on an API call).

Next is the `yield take(requestChan)`. Besides usage with a `pattern` to take specific actions from the Redux Store, `take` can also be used with channels (above we created a channel object from specific Redux actions). The `take` will block the Saga until a message is available on the channel. The take may also resume immediately if there is a message stored in the underlying buffer.

The important thing to note is how we're using a blocking `call`. The Saga will remain blocked until `call(handleRequest)` returns. But meanwhile, if other `REQUEST` actions are dispatched while the Saga is still blocked, they will queued internally by `requestChan`. When the Saga resumes from `call(handleRequest)` and executes the next `yield take(requestChan)`, the take will resolve with the queued message.

By default, `actionChannel` buffers all incoming messages without limit. If you want a more control over the buffering, you can supply a Buffer argument to the effect creator. Redux-Saga provides some common buffers (none, dropping, sliding) but you can also supply your own buffer implementation. [See API docs](../api#buffers) for more details.

For example if you want to handle only the most recent five items you can use:

```javascript
import { buffers } from 'redux-saga'
import { actionChannel } from 'redux-saga/effects'

function* watchRequests() {
  const requestChan = yield actionChannel('REQUEST', buffers.sliding(5))
  ...
}
```

## Using the `eventChannel` factory to connect to external events

Like `actionChannel` (Effect), `eventChannel` (a factory function, not an Effect) creates a Channel for events but from event sources other than the Redux Store.

This basic example creates a Channel from an interval:

```javascript
import { eventChannel, END } from 'redux-saga'

function countdown(secs) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        secs -= 1
        if (secs > 0) {
          emitter(secs)
        } else {
          // this causes the channel to close
          emitter(END)
        }
      }, 1000);
      // The subscriber must return an unsubscribe function
      return () => {
        clearInterval(iv)
      }
    }
  )
}
```

The first argument in `eventChannel` is a *subscriber* function. The role of the subscriber is to initialize the external event source (above using `setInterval`), then routes all incoming events from the source to the channel by invoking the supplied `emitter`. In the above example we're invoking `emitter` on each second.

> Note: You need to sanitize your event sources as to not pass null or undefined through the event channel. While it's fine to pass numbers through, we'd recommend structuring your event channel data like your redux actions. `{ number }` over `number`.

Note also the invocation `emitter(END)`. We use this to notify any channel consumer that the channel has been closed, meaning no other messages will come through this channel.

Let's see how we can use this channel from our Saga. (This is taken from the cancellable-counter example in the repo.)

```javascript
import { take, put, call } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

// creates an event Channel from an interval of seconds
function countdown(seconds) { ... }

export function* saga() {
  const chan = yield call(countdown, value)
  try {    
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      let seconds = yield take(chan)
      console.log(`countdown: ${seconds}`)
    }
  } finally {
    console.log('countdown terminated')
  }
}
```

So the Saga is yielding a `take(chan)`. This causes the Saga to block until a message is put on the channel. In our example above, it corresponds to when we invoke `emitter(secs)`. Note also we're executing the whole `while (true) {...}` loop inside a `try/finally` block. When the interval terminates, the countdown function closes the event channel by invoking `emitter(END)`. Closing a channel has the effect of terminating all Sagas blocked on a `take` from that channel. In our example, terminating the Saga will cause it to jump to its `finally` block (if provided, otherwise the Saga terminates).

The subscriber returns an `unsubscribe` function. This is used by the channel to unsubscribe before the event source complete. Inside a Saga consuming messages from an event channel, if we want to *exit early* before the event source complete (e.g. Saga has been cancelled) you can call `chan.close()` to close the channel and unsubscribe from the source.

For example, we can make our Saga support cancellation:

```javascript
import { take, put, call, cancelled } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'

// creates an event Channel from an interval of seconds
function countdown(seconds) { ... }

export function* saga() {
  const chan = yield call(countdown, value)
  try {    
    while (true) {
      let seconds = yield take(chan)
      console.log(`countdown: ${seconds}`)
    }
  } finally {
    if (yield cancelled()) {
      chan.close()
      console.log('countdown cancelled')
    }    
  }
}
```

Here is another example of how you can use event channels to pass WebSocket events into your saga (e.g.: using socket.io library).
Suppose you are waiting for a server message `ping` then reply with a `pong` message after some delay.


```javascript
import { take, put, call, apply, delay } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { createWebSocketConnection } from './socketConnection'

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket) {
  // `eventChannel` takes a subscriber function
  // the subscriber function takes an `emit` argument to put messages onto the channel
  return eventChannel(emit => {

    const pingHandler = (event) => {
      // puts event payload into the channel
      // this allows a Saga to take this payload from the returned channel
      emit(event.payload)
    }
    
    const errorHandler = (errorEvent) => {
      // create an Error object and put it into the channel
      emit(new Error(errorEvent.reason))
    }
    
    // setup the subscription
    socket.on('ping', pingHandler)
    socket.on('error', errorHandler)

    // the subscriber must return an unsubscribe function
    // this will be invoked when the saga calls `channel.close` method
    const unsubscribe = () => {
      socket.off('ping', pingHandler)
    }

    return unsubscribe
  })
}

// reply with a `pong` message by invoking `socket.emit('pong')`
function* pong(socket) {
  yield delay(5000)
  yield apply(socket, socket.emit, ['pong']) // call `emit` as a method with `socket` as context
}

export function* watchOnPings() {
  const socket = yield call(createWebSocketConnection)
  const socketChannel = yield call(createSocketChannel, socket)

  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      const payload = yield take(socketChannel)
      yield put({ type: INCOMING_PONG_PAYLOAD, payload })
      yield fork(pong, socket)
    } catch(err) {
      console.error('socket error:', err)
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
      // socketChannel.close()
    }
  }
}
```

> Note: messages on an eventChannel are not buffered by default. You have to provide a buffer to the eventChannel factory in order to specify buffering strategy for the channel (e.g. `eventChannel(subscriber, buffer)`).
[See the API docs](../api#buffers) for more info.

In this WebSocket example, the socketChannel may emit an error when some socket error occurs, this will abort our `yield take(socketChannel)` waiting on this eventChannel. Note that emitting an error will not abort the channel by default, we need to close the channel explicitly if we want to end the channel after an error.

### Using channels to communicate between Sagas

Besides action channels and event channels, You can also directly create channels which are not connected to any source by default. You can then manually `put` on the channel. This is handy when you want to use a channel to communicate between sagas.

To illustrate, let's review the former example of request handling.

```javascript
import { take, fork, ... } from 'redux-saga/effects'

function* watchRequests() {
  while (true) {
    const {payload} = yield take('REQUEST')
    yield fork(handleRequest, payload)
  }
}

function* handleRequest(payload) { ... }
```

We saw that the watch-and-fork pattern allows handling multiple requests simultaneously, without limit on the number of worker tasks executing concurrently. Then, we used the `actionChannel` effect to limit the concurrency to one task at a time.

So let's say that our requirement is to have a maximum of three tasks executing at the same time. When we get a request and there are less than three tasks executing, we process the request immediately, otherwise we queue the task and wait for one of the three *slots* to become free.

Below is an example of a solution using channels:

```javascript
import { channel } from 'redux-saga'
import { take, fork, ... } from 'redux-saga/effects'

function* watchRequests() {
  // create a channel to queue incoming requests
  const chan = yield call(channel)

  // create 3 worker 'threads'
  for (var i = 0; i < 3; i++) {
    yield fork(handleRequest, chan)
  }

  while (true) {
    const {payload} = yield take('REQUEST')
    yield put(chan, payload)
  }
}

function* handleRequest(chan) {
  while (true) {
    const payload = yield take(chan)
    // process the request
  }
}
```

In the above example, we create a channel using the `channel` factory. We get back a channel which by default buffers all messages we put on it (unless there is a pending taker, in which the taker is resumed immediately with the message).

The `watchRequests` saga then forks three worker sagas. Note the created channel is supplied to all forked sagas. `watchRequests` will use this channel to *dispatch* work to the three worker sagas. On each `REQUEST` action the Saga will put the payload on the channel. The payload will then be taken by any *free* worker. Otherwise it will be queued by the channel until a worker Saga is ready to take it.

All the three workers run a typical while loop. On each iteration, a worker will take the next request, or will block until a message is available. Note that this mechanism provides an automatic load-balancing between the 3 workers. Rapid workers are not slowed down by slow workers.

# Composing Sagas

While using `yield*` provides an idiomatic way of composing Sagas, this approach has some limitations:

- You'll likely want to test nested generators separately. This leads to some duplication in the test code as well as the overhead of the duplicated execution. We don't want to execute a nested generator but only make sure the call to it was issued with the right argument.

- More importantly, `yield*` allows only for sequential composition of tasks, so you can only `yield*` to one generator at a time.

You can use `yield` to start one or more subtasks in parallel. When yielding a call to a generator, the Saga will wait for the generator to terminate before progressing, then resume with the returned value (or throws if an error propagates from the subtask).

```javascript
function* fetchPosts() {
  yield put(actions.requestPosts())
  const products = yield call(fetchApi, '/products')
  yield put(actions.receivePosts(products))
}

function* watchFetch() {
  while (yield take('FETCH_POSTS')) {
    yield call(fetchPosts) // waits for the fetchPosts task to terminate
  }
}
```

Yielding to an array of nested generators will start all the sub-generators in parallel, wait
for them to finish, then resume with all the results

```javascript
function* mainSaga(getState) {
  const results = yield all([call(task1), call(task2), ...])
  yield put(showResults(results))
}
```

In fact, yielding Sagas is no different than yielding other effects (future actions, timeouts, etc). This means you can combine those Sagas with all the other types using the effect combinators.

For example, you may want the user to finish some game in a limited amount of time:

```javascript
function* game(getState) {
  let finished
  while (!finished) {
    // has to finish in 60 seconds
    const {score, timeout} = yield race({
      score: call(play, getState),
      timeout: delay(60000)
    })

    if (!timeout) {
      finished = true
      yield put(showScore(score))
    }
  }
}
```

# Concurrency

In the basics section, we saw how to use the helper effects `takeEvery` and `takeLatest` in order to manage concurrency between Effects.

In this section we'll see how those helpers could be implemented using the low-level Effects.

## `takeEvery`

```javascript
import {fork, take} from "redux-saga/effects"

const takeEvery = (pattern, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(pattern)
    yield fork(saga, ...args.concat(action))
  }
})
```

`takeEvery` allows multiple `saga` tasks to be forked concurrently.

## `takeLatest`

```javascript
import {cancel, fork, take} from "redux-saga/effects"

const takeLatest = (pattern, saga, ...args) => fork(function*() {
  let lastTask
  while (true) {
    const action = yield take(pattern)
    if (lastTask) {
      yield cancel(lastTask) // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})
```

`takeLatest` doesn't allow multiple Saga tasks to be fired concurrently. As soon as it gets a new dispatched action, it cancels any previously-forked task (if still running).

`takeLatest` can be useful to handle AJAX requests where we want to only have the response to the latest request.

# redux-saga's fork model

In `redux-saga` you can dynamically fork tasks that execute in the background using 2 Effects

- `fork` is used to create *attached forks*
- `spawn` is used to create *detached forks*

## Attached forks (using `fork`)

Attached forks remain attached to their parent by the following rules

### Completion

- A Saga terminates only after
  - It terminates its own body of instructions
  - All attached forks are themselves terminated

For example say we have the following

```js
import { fork, call, put, delay } from 'redux-saga/effects'
import api from './somewhere/api' // app specific
import { receiveData } from './somewhere/actions' // app specific

function* fetchAll() {
  const task1 = yield fork(fetchResource, 'users')
  const task2 = yield fork(fetchResource, 'comments')
  yield delay(1000)
}

function* fetchResource(resource) {
  const {data} = yield call(api.fetch, resource)
  yield put(receiveData(data))
}

function* main() {
  yield call(fetchAll)
}
```

`call(fetchAll)` will terminate after:

- The `fetchAll` body itself terminates, this means all 3 effects are performed. Since `fork` effects are non blocking, the
task will block on `delay(1000)`

- The 2 forked tasks terminate, i.e. after fetching the required resources and putting the corresponding `receiveData` actions

So the whole task will block until a delay of 1000 millisecond passed *and* both `task1` and `task2` finished their business.

Say for example, the delay of 1000 milliseconds elapsed and the 2 tasks haven't yet finished, then `fetchAll` will still wait
for all forked tasks to finish before terminating the whole task.

The attentive reader might have noticed the `fetchAll` saga could be rewritten using the parallel Effect

```js
function* fetchAll() {
  yield all([
    call(fetchResource, 'users'),     // task1
    call(fetchResource, 'comments'),  // task2,
    delay(1000)
  ])
}
```

In fact, attached forks share the same semantics with the parallel Effect:

- We're executing tasks in parallel
- The parent will terminate after all launched tasks terminate


And this applies for all other semantics as well (error and cancellation propagation). You can understand how
attached forks behave by considering it as a *dynamic parallel* Effect.

## Error propagation

Following the same analogy, Let's examine in detail how errors are handled in parallel Effects

for example, let's say we have this Effect

```js
yield all([
  call(fetchResource, 'users'),
  call(fetchResource, 'comments'),
  delay(1000)
])
```

The above effect will fail as soon as any one of the 3 child Effects fails. Furthermore, the uncaught error will cause
the parallel Effect to cancel all the other pending Effects. So for example if `call(fetchResource, 'users')` raises an
uncaught error, the parallel Effect will cancel the 2 other tasks (if they are still pending) then aborts itself with the
same error from the failed call.

Similarly for attached forks, a Saga aborts as soon as

- Its main body of instructions throws an error

- An uncaught error was raised by one of its attached forks

So in the previous example

```js
//... imports

function* fetchAll() {
  const task1 = yield fork(fetchResource, 'users')
  const task2 = yield fork(fetchResource, 'comments')
  yield delay(1000)
}

function* fetchResource(resource) {
  const {data} = yield call(api.fetch, resource)
  yield put(receiveData(data))
}

function* main() {
  try {
    yield call(fetchAll)
  } catch (e) {
    // handle fetchAll errors
  }
}
```

If at a moment, for example, `fetchAll` is blocked on the `delay(1000)` Effect, and say, `task1` failed, then the whole
`fetchAll` task will fail causing

- Cancellation of all other pending tasks. This includes:
  - The *main task* (the body of `fetchAll`): cancelling it means cancelling the current Effect `delay(1000)`
  - The other forked tasks which are still pending. i.e. `task2` in our example.

- The `call(fetchAll)` will raise itself an error which will be caught in the `catch` body of `main`

Note we're able to catch the error from `call(fetchAll)` inside `main` only because we're using a blocking call. And that
we can't catch the error directly from `fetchAll`. This is a rule of thumb, **you can't catch errors from forked tasks**. A failure
in an attached fork will cause the forking parent to abort (Just like there is no way to catch an error *inside* a parallel Effect, only from
outside by blocking on the parallel Effect).


## Cancellation

Cancelling a Saga causes the cancellation of:

- The *main task* this means cancelling the current Effect where the Saga is blocked

- All attached forks that are still executing


**WIP**

## Detached forks (using `spawn`)

Detached forks live in their own execution context. A parent doesn't wait for detached forks to terminate. Uncaught
errors from spawned tasks are not bubbled up to the parent. And cancelling a parent doesn't automatically cancel detached
forks (you need to cancel them explicitly).

In short, detached forks behave like root Sagas started directly using the `middleware.run` API.


**WIP**

# Pulling future actions

Until now we've used the helper effect `takeEvery` in order to spawn a new task on each incoming action. This mimics somewhat the behavior of `redux-thunk`: each time a Component, for example, invokes a `fetchProducts` Action Creator, the Action Creator will dispatch a thunk to execute the control flow.

In reality, `takeEvery` is just a wrapper effect for internal helper function built on top of the lower-level and more powerful API. In this section we'll see a new Effect, `take`, which makes it possible to build complex control flow by allowing total control of the action observation process.

## A basic logger

Let's take a basic example of a Saga that watches all actions dispatched to the store and logs them to the console.

Using `takeEvery('*')` (with the wildcard `*` pattern), we can catch all dispatched actions regardless of their types.

```javascript
import { select, takeEvery } from 'redux-saga/effects'

function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  })
}
```

Now let's see how to use the `take` Effect to implement the same flow as above:

```javascript
import { select, take } from 'redux-saga/effects'

function* watchAndLog() {
  while (true) {
    const action = yield take('*')
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}
```

The `take` is just like `call` and `put` we saw earlier. It creates another command object that tells the middleware to wait for a specific action. The resulting behavior of the `call` Effect is the same as when the middleware suspends the Generator until a Promise resolves. In the `take` case, it'll suspend the Generator until a matching action is dispatched. In the above example, `watchAndLog` is suspended until any action is dispatched.

Note how we're running an endless loop `while (true)`. Remember, this is a Generator function, which doesn't have a run-to-completion behavior. Our Generator will block on each iteration waiting for an action to happen.

Using `take` has a subtle impact on how we write our code. In the case of `takeEvery`, the invoked tasks have no control on when they'll be called. They will be invoked again and again on each matching action. They also have no control on when to stop the observation.

In the case of `take`, the control is inverted. Instead of the actions being *pushed* to the handler tasks, the Saga is *pulling* the action by itself. It looks as if the Saga is performing a normal function call `action = getNextAction()` which will resolve when the action is dispatched.

This inversion of control allows us to implement control flows that are non-trivial to do with the traditional *push* approach.

As a basic example, suppose that in our Todo application, we want to watch user actions and show a congratulation message after the user has created their first three todos.

```javascript
import { take, put } from 'redux-saga/effects'

function* watchFirstThreeTodosCreation() {
  for (let i = 0; i < 3; i++) {
    const action = yield take('TODO_CREATED')
  }
  yield put({type: 'SHOW_CONGRATULATION'})
}
```

Instead of a `while (true)`, we're running a `for` loop, which will iterate only three times. After taking the first three `TODO_CREATED` actions, `watchFirstThreeTodosCreation` will cause the application to display a congratulation message then terminate. This means the Generator will be garbage collected and no more observation will take place.

Another benefit of the pull approach is that we can describe our control flow using a familiar synchronous style. For example, suppose we want to implement a login flow with two actions: `LOGIN` and `LOGOUT`. Using `takeEvery` (or `redux-thunk`), we'll have to write two separate tasks (or thunks): one for `LOGIN` and the other for `LOGOUT`.

The result is that our logic is now spread in two places. In order for someone reading our code to understand it, they would have to read the source of the two handlers and make the link between the logic in both in their head. In other words, it means they would have to rebuild the model of the flow in their head by rearranging mentally the logic placed in various places of the code in the correct order.

Using the pull model, we can write our flow in the same place instead of handling the same action repeatedly.

```javascript
function* loginFlow() {
  while (true) {
    yield take('LOGIN')
    // ... perform the login logic
    yield take('LOGOUT')
    // ... perform the logout logic
  }
}
```

The `loginFlow` Saga more clearly conveys the expected action sequence. It knows that the `LOGIN` action should always be followed by a `LOGOUT` action, and that `LOGOUT` is always followed by a `LOGIN` (a good UI should always enforce a consistent order of the actions, by hiding or disabling unexpected actions).

# Non-blocking calls

In the previous section, we saw how the `take` Effect allows us to better describe a non-trivial flow in a central place.

Revisiting the login flow example:

```javascript
function* loginFlow() {
  while (true) {
    yield take('LOGIN')
    // ... perform the login logic
    yield take('LOGOUT')
    // ... perform the logout logic
  }
}
```

Let's complete the example and implement the actual login/logout logic. Suppose we have an API which permits us to authorize the user on a remote server. If the authorization is successful, the server will return an authorization token which will be stored by our application using DOM storage (assume our API provides another service for DOM storage).

When the user logs out, we'll delete the authorization token stored previously.

### First try

So far we have all Effects needed to implement the above flow. We can wait for specific actions in the store using the `take` Effect. We can make asynchronous calls using the `call` Effect. Finally, we can dispatch actions to the store using the `put` Effect.

Let's give it a try:

> Note: the code below has a subtle issue. Make sure to read the section until the end.

```javascript
import { take, call, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if (token) {
      yield call(Api.storeItem, {token})
      yield take('LOGOUT')
      yield call(Api.clearItem, 'token')
    }
  }
}
```

First, we created a separate Generator `authorize` which will perform the actual API call and notify the Store upon success.

The `loginFlow` implements its entire flow inside a `while (true)` loop, which means once we reach the last step in the flow (`LOGOUT`) we start a new iteration by waiting for a new `LOGIN_REQUEST` action.

`loginFlow` first waits for a `LOGIN_REQUEST` action. Then, it retrieves the credentials in the action payload (`user` and `password`) and makes a `call` to the `authorize` task.

As you noted, `call` isn't only for invoking functions returning Promises. We can also use it to invoke other Generator functions. In the above example, **`loginFlow` will wait for authorize until it terminates and returns** (i.e. after performing the api call, dispatching the action and then returning the token to `loginFlow`).

If the API call succeeds, `authorize` will dispatch a `LOGIN_SUCCESS` action then return the fetched token. If it results in an error, it'll dispatch a `LOGIN_ERROR` action.

If the call to `authorize` is successful, `loginFlow` will store the returned token in the DOM storage and wait for a `LOGOUT` action. When the user logs out, we remove the stored token and wait for a new user login.

If the `authorize` failed, it'll return `undefined`, which will cause `loginFlow` to skip the previous process and wait for a new `LOGIN_REQUEST` action.

Observe how the entire logic is stored in one place. A new developer reading our code doesn't have to travel between various places to understand the control flow. It's like reading a synchronous algorithm: steps are laid out in their natural order. And we have functions which call other functions and wait for their results.

### But there is still a subtle issue with the above approach

Suppose that when the `loginFlow` is waiting for the following call to resolve:

```javascript
function* loginFlow() {
  while (true) {
    // ...
    try {
      const token = yield call(authorize, user, password)
      // ...
    }
    // ...
  }
}
```

The user clicks on the `Logout` button causing a `LOGOUT` action to be dispatched.

The following example illustrates the hypothetical sequence of the events:

```
UI                              loginFlow
--------------------------------------------------------
LOGIN_REQUEST...................call authorize.......... waiting to resolve
........................................................
........................................................
LOGOUT.................................................. missed!
........................................................
................................authorize returned...... dispatch a `LOGIN_SUCCESS`!!
........................................................
```

When `loginFlow` is blocked on the `authorize` call, an eventual `LOGOUT` occurring in between the call and the response will be missed, because `loginFlow` hasn't yet performed the `yield take('LOGOUT')`.

The problem with the above code is that `call` is a blocking Effect. i.e. the Generator can't perform/handle anything else until the call terminates. But in our case we do not only want `loginFlow` to execute the authorization call, but also watch for an eventual `LOGOUT` action that may occur in the middle of this call. That's because `LOGOUT` is *concurrent* to the `authorize` call.

So what's needed is some way to start `authorize` without blocking so `loginFlow` can continue and watch for an eventual/concurrent `LOGOUT` action.

To express non-blocking calls, the library provides another Effect: [`fork`](https://redux-saga.js.org/docs/api/index.html#forkfn-args). When we fork a *task*, the task is started in the background and the caller can continue its flow without waiting for the forked task to terminate.

So in order for `loginFlow` to not miss a concurrent `LOGOUT`, we must not `call` the `authorize` task, instead we have to `fork` it.

```javascript
import { fork, call, take, put } from 'redux-saga/effects'

function* loginFlow() {
  while (true) {
    ...
    try {
      // non-blocking call, what's the returned value here ?
      const ?? = yield fork(authorize, user, password)
      ...
    }
    ...
  }
}
```

The issue now is since our `authorize` action is started in the background, we can't get the `token` result (because we'd have to wait for it). So we need to move the token storage operation into the `authorize` task.

```javascript
import { fork, call, take, put } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem, {token})
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    yield fork(authorize, user, password)
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    yield call(Api.clearItem, 'token')
  }
}
```

We're also doing `yield take(['LOGOUT', 'LOGIN_ERROR'])`. It means we are watching for 2 concurrent actions:

- If the `authorize` task succeeds before the user logs out, it'll dispatch a `LOGIN_SUCCESS` action, then terminate. Our `loginFlow` saga will then wait only for a future `LOGOUT` action (because `LOGIN_ERROR` will never happen).

- If the `authorize` fails before the user logs out, it will dispatch a `LOGIN_ERROR` action, then terminate. So `loginFlow` will take the `LOGIN_ERROR` before the `LOGOUT` then it will enter in a another `while` iteration and will wait for the next `LOGIN_REQUEST` action.

- If the user logs out before the `authorize` terminates, then `loginFlow` will take a `LOGOUT` action and also wait for the next `LOGIN_REQUEST`.

Note the call for `Api.clearItem` is supposed to be idempotent. It'll have no effect if no token was stored by the `authorize` call. `loginFlow` makes sure no token will be in the storage before waiting for the next login.

But we're not yet done. If we take a `LOGOUT` in the middle of an API call, we have to **cancel** the `authorize` process, otherwise we'll have 2 concurrent tasks evolving in parallel: The `authorize` task will continue running and upon a successful (resp. failed) result, will dispatch a `LOGIN_SUCCESS` (resp. a `LOGIN_ERROR`) action leading to an inconsistent state.

In order to cancel a forked task, we use a dedicated Effect [`cancel`](https://redux-saga.js.org/docs/api/index.html#canceltask)

```javascript
import { take, put, call, fork, cancel } from 'redux-saga/effects'

// ...

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    // fork return a Task object
    const task = yield fork(authorize, user, password)
    const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
    if (action.type === 'LOGOUT')
      yield cancel(task)
    yield call(Api.clearItem, 'token')
  }
}
```

`yield fork` results in a [Task Object](https://redux-saga.js.org/docs/api/index.html#task). We assign the returned object into a local constant `task`. Later if we take a `LOGOUT` action, we pass that task to the `cancel` Effect. If the task is still running, it'll be aborted. If the task has already completed then nothing will happen and the cancellation will result in a no-op. And finally, if the task completed with an error, then we do nothing, because we know the task already completed.

We are *almost* done (concurrency is not that easy; you have to take it seriously).

Suppose that when we receive a `LOGIN_REQUEST` action, our reducer sets some `isLoginPending` flag to true so it can display some message or spinner in the UI. If we get a `LOGOUT` in the middle of an API call and abort the task by *killing it* (i.e. the task is stopped right away), then we may end up again with an inconsistent state. We'll still have `isLoginPending` set to true and our reducer will be waiting for an outcome action (`LOGIN_SUCCESS` or `LOGIN_ERROR`).

Fortunately, the `cancel` Effect won't brutally kill our `authorize` task. Instead, it'll give it a chance to perform its cleanup logic. The cancelled task can handle any cancellation logic (as well as any other type of completion) in its `finally` block. Since a finally block execute on any type of completion (normal return, error, or forced cancellation), there is an Effect `cancelled` which you can use if you want handle cancellation in a special way:

```javascript
import { take, call, put, cancelled } from 'redux-saga/effects'
import Api from '...'

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem, {token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}
```

You may have noticed that we haven't done anything about clearing our `isLoginPending` state. For that, there are at least two possible solutions:

- dispatch a dedicated action `RESET_LOGIN_PENDING`
- make the reducer clear the `isLoginPending` on a `LOGOUT` action

## Starting a race between multiple Effects

Sometimes we start multiple tasks in parallel but we don't want to wait for all of them, we just need
to get the *winner*: the first one that resolves (or rejects). The `race` Effect offers a way of
triggering a race between multiple Effects.

The following sample shows a task that triggers a remote fetch request, and constrains the response within a
1 second timeout.

```javascript
import { race, call, put, delay } from 'redux-saga/effects'

function* fetchPostsWithTimeout() {
  const {posts, timeout} = yield race({
    posts: call(fetchApi, '/posts'),
    timeout: delay(1000)
  })

  if (posts)
    yield put({type: 'POSTS_RECEIVED', posts})
  else
    yield put({type: 'TIMEOUT_ERROR'})
}
```

Another useful feature of `race` is that it automatically cancels the loser Effects. For example,
suppose we have 2 UI buttons:

- The first starts a task in the background that runs in an endless loop `while (true)`
(e.g. syncing some data with the server each x seconds).

- Once the background task is started, we enable a second button which will cancel the task


```javascript
import { race, take, call } from 'redux-saga/effects'

function* backgroundTask() {
  while (true) { ... }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
```

In the case a `CANCEL_TASK` action is dispatched, the `race` Effect will automatically cancel
`backgroundTask` by throwing a cancellation error inside it.

# Root Saga Patterns

A root Saga aggregates multiple Sagas to a single entry point for the sagaMiddleware to run.

In the [beginner tutorial](../introduction/BeginnerTutorial.md), it is shown that your root saga will look something like this:

```javascript
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
  // code after all-effect
}
```

This is one of a few ways to implement your root. Here, the `all` effect is used with an array and your sagas will be executed in parallel. Other root implementations may help you better handle errors and more complex data flow.

## Non-blocking fork effects

Contributor @slorber mentioned in [issue#760](https://github.com/redux-saga/redux-saga/issues/760) several other common root implementations. To start, there is one popular implementation that behaves similarly to the tutorial root saga behavior:

```javascript
export default function* rootSaga() {
  yield fork(saga1)
  yield fork(saga2)
  yield fork(saga3)
  // code after fork-effect
}
```

Using three unique `yield fork` will give back a task descriptor three times. The resulting behavior in your app is that all of your sub-sagas are started and executed in the same order. Since `fork` is non-blocking, the `rootSaga` can finish while the child sagas continue to run and be blocked by their internal effects.

The difference between one big all effect and several fork effects is that the `all` effect is blocking, so *code after all-effect* (see comments in above code) is executed when all children sagas complete, while `fork` effects are non-blocking so *code after fork-effect* is executed immediately after yielding the fork effects. Another difference is that you can get task descriptors when using fork effects, so in the subsequent code you can cancel/join the forked task via task descriptors.

## Nesting fork effects in all effect

```javascript
const [task1, task2, task3] = yield all([ fork(saga1), fork(saga2), fork(saga3) ])
```

There is another popular pattern when designing root saga: nesting `fork` effects in an `all` effect. By doing so, you can get an array of task descriptors, and the code after the `all` effect will be executed immediately because each `fork` effect is non-blocking and synchronously returning a task descriptor.

Note that though `fork` effects are nested in an `all` effect, they are always connected to the parent task through the underlying forkQueue. Uncaught errors from forked tasks bubble to the parent task and thus abort it (and all its child tasks) - they cannot be caught by the parent task.

## Avoid nesting fork effects in race effect

```javascript
// DO NOT DO THIS. The fork effect always wins the race immediately.
yield race([
  fork(someSaga),
  take('SOME-ACTION'),
  somePromise,
])
```

On the other hand, `fork` effects in a `race` effect is most likely a bug. In the above code, since `fork` effects are non-blocking, they will always win the race immediately.

## Keeping the root alive

In practice, these implementations aren't terribly practical because your `rootSaga` will terminate on the first error in any individual child effect or saga and crash your whole app! Ajax requests in particular would put your app at the mercy of the status of any endpoints your app makes requests to.

`spawn` is an effect that will *disconnect* your child saga from its parent, allowing it to fail without crashing its parent. Obviously, this does not relieve us from our responsibility as developers to still handle errors as they arise. In fact, it's possible that this might obscure certain failures from the developer's viewpoint and cause problems further down the road.

The [`spawn`](../API.md#spawnfn-args) effect might be considered similar to [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) in React in that it can be used as an extra safety measure at some level of the saga tree, cutting off the failing feature and not letting the whole app crash. The difference is that there is no special syntax like the `componentDidCatch` that exists for React Error Boundaries. You must still write your own error handling and recovery code.

```javascript
export default function* rootSaga() {
  yield spawn(saga1)
  yield spawn(saga2)
  yield spawn(saga3)
}
```

In this implementation, even if one saga were to fail, the `rootSaga` and other sagas will not be killed. However, this can also be problematic since the failing saga would be unavailable for the app's lifetime.

## Keeping everything alive

In some cases, it may be desirable for your sagas to be able to restart in the event of failure. The benefit is that your app and sagas may continue to work after failing, i.e. a saga that `yield takeEvery(myActionType)`. But we do not recommend this as a blanket solution to keep all sagas alive. It is very likely that it makes more sense to let your saga fail in sanely and predictably and handle/log your error.

For example, @ajwhite offered this scenario as a case where keeping your saga alive would cause more problems than it solves:

```javascript
function* sagaThatMayCrash () {
  // wait for something that happens _during app startup_
  yield take('APP_INITIALIZED')

  // assume it dies here
  yield call(doSomethingThatMayCrash)
}
```

> If the sagaThatMayCrash is restarted, it will restart and wait for an action that only happens once when the application starts up. In this scenario, it restarts, but it never recovers.

But for the specific situations that would benefit from starting, user @granmoe proposed an implementation like this in [issue#570](https://github.com/redux-saga/redux-saga/issues/570):

```javascript
function* rootSaga () {
  const sagas = [
    saga1,
    saga2,
    saga3,
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );
}
```

This strategy maps our child sagas to spawned generators (detaching them from the root parent) which start our sagas as subtasks in a `try` block. Our saga will run until termination, and then be automatically restarted. The `catch` block harmlessly handles any error that may have been thrown by, and terminated, our saga.

# Running Tasks In Parallel

The `yield` statement is great for representing asynchronous control flow in a linear style, but we also need to do things in parallel. We can't write:

```javascript
// wrong, effects will be executed in sequence
const users = yield call(fetch, '/users')
const repos = yield call(fetch, '/repos')
```

Because the 2nd effect will not get executed until the first call resolves. Instead we have to write:

```javascript
import { all, call } from 'redux-saga/effects'

// correct, effects will get executed in parallel
const [users, repos] = yield all([
  call(fetch, '/users'),
  call(fetch, '/repos')
])
```

When we yield an array of effects, the generator is blocked until all the effects are resolved or as soon as one is rejected (just like how `Promise.all` behaves).

# Task cancellation

We saw already an example of cancellation in the [Non blocking calls](NonBlockingCalls.md) section. In this section we'll review cancellation in more detail.

Once a task is forked, you can abort its execution using `yield cancel(task)`.

To see how it works, let's consider a basic example: A background sync which can be started/stopped by some UI commands. Upon receiving a `START_BACKGROUND_SYNC` action, we fork a background task that will periodically sync some data from a remote server.

The task will execute continually until a `STOP_BACKGROUND_SYNC` action is triggered. Then we cancel the background task and wait again for the next `START_BACKGROUND_SYNC` action.

```javascript
import { take, put, call, fork, cancel, cancelled, delay } from 'redux-saga/effects'
import { someApi, actions } from 'somewhere'

function* bgSync() {
  try {
    while (true) {
      yield put(actions.requestStart())
      const result = yield call(someApi)
      yield put(actions.requestSuccess(result))
      yield delay(5000)
    }
  } finally {
    if (yield cancelled())
      yield put(actions.requestFailure('Sync cancelled!'))
  }
}

function* main() {
  while ( yield take('START_BACKGROUND_SYNC') ) {
    // starts the task in the background
    const bgSyncTask = yield fork(bgSync)

    // wait for the user stop action
    yield take('STOP_BACKGROUND_SYNC')
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask)
  }
}
```

In the above example, cancellation of `bgSyncTask` will use [Generator.prototype.return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/return) to make the Generator jump directly to the finally block. Here you can use `yield cancelled()` to check if the Generator has been cancelled or not.

Cancelling a running task will also cancel the current Effect where the task is blocked at the moment of cancellation.

For example, suppose that at a certain point in an application's lifetime, we have this pending call chain:

```javascript
function* main() {
  const task = yield fork(subtask)
  ...
  // later
  yield cancel(task)
}

function* subtask() {
  ...
  yield call(subtask2) // currently blocked on this call
  ...
}

function* subtask2() {
  ...
  yield call(someApi) // currently blocked on this call
  ...
}
```

`yield cancel(task)` triggers a cancellation on `subtask`, which in turn triggers a cancellation on `subtask2`.

So we saw that Cancellation propagates downward (in contrast returned values and uncaught errors propagates upward). You can see it as a *contract* between the caller (which invokes the async operation) and the callee (the invoked operation). The callee is responsible for performing the operation. If it has completed (either success or error) the outcome propagates up to its caller and eventually to the caller of the caller and so on. That is, callees are responsible for *completing the flow*.

Now if the callee is still pending and the caller decides to cancel the operation, it triggers a kind of a signal that propagates down to the callee (and possibly to any deep operations called by the callee itself). All deeply pending operations will be cancelled.

There is another direction where the cancellation propagates to as well: the joiners of a task (those blocked on a `yield join(task)`) will also be cancelled if the joined task is cancelled. Similarly, any potential callers of those joiners will be cancelled as well (because they are blocked on an operation that has been cancelled from outside).

## Testing generators with fork effect

When `fork` is called it starts the task in the background and also returns task object like we have learned previously. When testing this we have to use utility function `createMockTask`. Object returned from this function should be passed to next `next` call after fork test. Mock task can then be passed to `cancel` for example. Here is test for `main` generator which is on top of this page.

```javascript
import { createMockTask } from '@redux-saga/testing-utils';

describe('main', () => {
  const generator = main();

  it('waits for start action', () => {
    const expectedYield = take('START_BACKGROUND_SYNC');
    expect(generator.next().value).to.deep.equal(expectedYield);
  });

  it('forks the service', () => {
    const expectedYield = fork(bgSync);
    const mockedAction = { type: 'START_BACKGROUND_SYNC' };
    expect(generator.next(mockedAction).value).to.deep.equal(expectedYield);
  });

  it('waits for stop action and then cancels the service', () => {
    const mockTask = createMockTask();

    const expectedTakeYield = take('STOP_BACKGROUND_SYNC');
    expect(generator.next(mockTask).value).to.deep.equal(expectedTakeYield);

    const expectedCancelYield = cancel(mockTask);
    expect(generator.next().value).to.deep.equal(expectedCancelYield);
  });
});
```

You can also use mock task's functions `setRunning`, `setResult` and `setError` to set mock task's state. For example `mockTask.setRunning(false)`.

### Note

It's important to remember that `yield cancel(task)` doesn't wait for the cancelled task to finish (i.e. to perform its finally block). The cancel effect behaves like fork. It returns as soon as the cancel was initiated. Once cancelled, a task should normally return as soon as it finishes its cleanup logic.

## Automatic cancellation

Besides manual cancellation there are cases where cancellation is triggered automatically

1. In a `race` effect. All race competitors, except the winner, are automatically cancelled.

2. In a parallel effect (`yield all([...])`). The parallel effect is rejected as soon as one of the sub-effects is rejected (as implied by `Promise.all`). In this case, all the other sub-effects are automatically cancelled.

# Testing Sagas

There are two main ways to test Sagas: testing the saga generator function step-by-step or running the full saga and
asserting the side effects.

## Testing the Saga Generator Function

Suppose we have the following actions:

```javascript
const CHOOSE_COLOR = 'CHOOSE_COLOR';
const CHANGE_UI = 'CHANGE_UI';

const chooseColor = (color) => ({
  type: CHOOSE_COLOR,
  payload: {
    color,
  },
});

const changeUI = (color) => ({
  type: CHANGE_UI,
  payload: {
    color,
  },
});
```

We want to test the saga:

```javascript
function* changeColorSaga() {
  const action = yield take(CHOOSE_COLOR);
  yield put(changeUI(action.payload.color));
}
```

Since Sagas always yield an Effect, and these effects have basic factory functions (e.g. put, take etc.) a test may
inspect the yielded effect and compare it to an expected effect. To get the first yielded value from a saga,
call its `next().value`:

```javascript
  const gen = changeColorSaga();

  assert.deepEqual(
    gen.next().value,
    take(CHOOSE_COLOR),
    'it should wait for a user to choose a color'
  );
```

A value must then be returned to assign to the `action` constant, which is used for the argument to the `put` effect:

```javascript
  const color = 'red';
  assert.deepEqual(
    gen.next(chooseColor(color)).value,
    put(changeUI(color)),
    'it should dispatch an action to change the ui'
  );
```

Since there are no more `yield`s, then next time `next()` is called, the generator will be done:

```javascript
  assert.deepEqual(
    gen.next().done,
    true,
    'it should be done'
  );
```

### Branching Saga

Sometimes your saga will have different outcomes. To test the different branches without repeating all the steps that lead to it you can use the utility function **cloneableGenerator**

This time we add two new actions, `CHOOSE_NUMBER` and `DO_STUFF`, with a related action creators:

```javascript
const CHOOSE_NUMBER = 'CHOOSE_NUMBER';
const DO_STUFF = 'DO_STUFF';

const chooseNumber = (number) => ({
  type: CHOOSE_NUMBER,
  payload: {
    number,
  },
});

const doStuff = () => ({
  type: DO_STUFF,
});
```

Now the saga under test will put two `DO_STUFF` actions before waiting for a `CHOOSE_NUMBER` action and then putting
either `changeUI('red')` or `changeUI('blue')`, depending on whether the number is even or odd.

```javascript
function* doStuffThenChangeColor() {
  yield put(doStuff());
  yield put(doStuff());
  const action = yield take(CHOOSE_NUMBER);
  if (action.payload.number % 2 === 0) {
    yield put(changeUI('red'));
  } else {
    yield put(changeUI('blue'));
  }
}
```

The test is as follows:

```javascript
import { put, take } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';

test('doStuffThenChangeColor', assert => {
  const gen = cloneableGenerator(doStuffThenChangeColor)();
  gen.next(); // DO_STUFF
  gen.next(); // DO_STUFF
  gen.next(); // CHOOSE_NUMBER

  assert.test('user choose an even number', a => {
    // cloning the generator before sending data
    const clone = gen.clone();
    a.deepEqual(
      clone.next(chooseNumber(2)).value,
      put(changeUI('red')),
      'should change the color to red'
    );

    a.equal(
      clone.next().done,
      true,
      'it should be done'
    );

    a.end();
  });

  assert.test('user choose an odd number', a => {
    const clone = gen.clone();
    a.deepEqual(
      clone.next(chooseNumber(3)).value,
      put(changeUI('blue')),
      'should change the color to blue'
    );

    a.equal(
      clone.next().done,
      true,
      'it should be done'
    );

    a.end();
  });
});
```

See also: [Task cancellation](TaskCancellation.md) for testing fork effects

## Testing the full Saga

Although it may be useful to test each step of a saga, in practise this makes for brittle tests. Instead, it may be
preferable to run the whole saga and assert that the expected effects have occurred.

Suppose we have a basic saga which calls an HTTP API:

```javascript
function* callApi(url) {
  const someValue = yield select(somethingFromState);
  try {
    const result = yield call(myApi, url, someValue);
    yield put(success(result.json()));
    return result.status;
  } catch (e) {
    yield put(error(e));
    return -1;
  }
}
```

We can run the saga with mocked values:

```javascript
const dispatched = [];

const saga = runSaga({
  dispatch: (action) => dispatched.push(action),
  getState: () => ({ value: 'test' }),
}, callApi, 'http://url');
```

A test could then be written to assert the dispatched actions and mock calls:

```javascript
import sinon from 'sinon';
import * as api from './api';

test('callApi', async (assert) => {
  const dispatched = [];
  sinon.stub(api, 'myApi').callsFake(() => ({
    json: () => ({
      some: 'value'
    })
  }));
  const url = 'http://url';
  const result = await runSaga({
    dispatch: (action) => dispatched.push(action),
    getState: () => ({ state: 'test' }),
  }, callApi, url).toPromise();

  assert.true(myApi.calledWith(url, somethingFromState({ state: 'test' })));
  assert.deepEqual(dispatched, [success({ some: 'value' })]);
});
```

See also: Repository Examples:

https://github.com/redux-saga/redux-saga/blob/master/examples/counter/test/sagas.js

https://github.com/redux-saga/redux-saga/blob/master/examples/shopping-cart/test/sagas.js

## Testing libraries

While both of the above testing methods can be written natively, there exist several libraries to make both methods easier. Additionally, some libraries can be used to test sagas in a *third* way: recording specific side-effects (but not all).

Sam Hogarth's (@sh1989) [article](http://blog.scottlogic.com/2018/01/16/evaluating-redux-saga-test-libraries.html) summarizes the different options well.

For testing each generator yield step-by-step there is [`redux-saga-test`][1] and [`redux-saga-testing`][2]. [`redux-saga-test-engine`][3] is for recording and testing for specific side effects. For an integration test, [`redux-saga-tester`][4]. And [`redux-saga-test-plan`][5] can actually cover all three bases.

### `redux-saga-test` and `redux-saga-testing` for step-by-step testing

The `redux-saga-test` library provides syntactic sugar for your step-by-step tests. The `fromGenerator` function returns a value that can be iterated manually with `.next()` and have an assertion made using the relevant saga effect method.

```javascript
import fromGenerator from 'redux-saga-test';

test('with redux-saga-test', () => {
  const generator = callApi('url');
  /*
  * The assertions passed to fromGenerator
  * requires a `deepEqual` method
  */
  const expect = fromGenerator(assertions, generator);

  expect.next().select(somethingFromState);
  expect.next(selectedData).call(myApi, 'url', selectedData);
  expect.next(result).put(success(result.json));
});
```

`redux-saga-testing` library provides a method `sagaHelper` that takes your generator and returns a value that works a lot like Jest's `it()` function, but also advances the generator being tested. The `result` parameter passed into the callback is the value yielded by the generater

```javascript
import sagaHelper from 'redux-saga-testing';

test('with redux-saga-testing', () => {
  const it = sagaHelper(callApi());

  it('should select from state', selectResult => {
    // with Jest's `expect`
    expect(selectResult).toBe(value);
  });

  it('should select from state', apiResponse => {
    // without tape's `test`
    assert.deepEqual(apiResponse.json(), jsonResponse);
  });

  // an empty call to `it` can be used to skip an effect
  it('', () => {});
});
```

### `redux-saga-test-plan`

This is the most versatile library. The `testSaga` API is used for exact order testing and `expectSaga` is for both recording side-effects and integration testing.

```javascript
import { expectSaga, testSaga } from 'redux-saga-test-plan';

test('exact order with redux-saga-test-plan', () => {
  return testSaga(callApi, 'url')
    .next()
    .select(selectFromState)
    .next()
    .call(myApi, 'url', valueFromSelect);

    ...
});

test('recorded effects with redux-saga-test-plan', () => {
  /*
  * With expectSaga, you can assert that any yield from
  * your saga occurs as expected, *regardless of order*.
  * You must call .run() at the end.
  */
  return expectSaga(callApi, 'url')
    .put(success(value)) // last effect from our saga, first one tested

    .call(myApi, 'url', value)
    .run();
    /* notice no assertion for the select call */
});

test('test only final effect with .provide()', () => {
  /*
  * With the .provide() method from expectSaga
  * you can by pass in all expected values
  * and test only your saga's final effect.
  */
  return expectSaga(callApi, 'url')
    .provide([
      [select(selectFromState), selectedValue],
      [call(myApi, 'url', selectedValue), response]
    ])
    .put(success(response))
    .run();
});

test('integration test with withReducer', () => {
  /*
  * Using `withReducer` allows you to test
  * the state shape upon completion of your reducer -
  * a true integration test for your Redux store management.
  */

  return expectSaga(callApi, 'url')
    .withReducer(myReducer)
    .provide([
      [call(myApi, 'url', value), response]
    ])
    .hasFinalState({
      data: response
    })
    .run();
});
```


### redux-saga-test-engine

This library functions very similarly in setup to `redux-saga-test-plan`, but is best used to record effects. Provide a collection of saga generic effects to be watched by `createSagaTestEngine` function which in turn returns a function. Then provide your saga and specific effects and their arguments.

```javascript
const collectedEffects  = createSagaTestEngine(['SELECT', 'CALL', 'PUT']);
const actualEffects = collectEffects(mySaga, [ [myEffect(arg), value], ... ], argsToMySaga);
```

The value of `actualEffects` is an array containing elements equal to the yielded values from all *collected* effects, in order of occurence.

```javascript
import createSagaTestEngine from 'redux-saga-test-engine';

test('testing with redux-saga-test-engine', () => {
  const collectEffects = createSagaTestEngine(['CALL', 'PUT']);

  const actualEffects = collectEffects(
    callApi,
    [
      [select(selectFromState), selectedValue],
      [call(myApi, 'url', selectedValue), response]
    ],
    // Any further args are passed to the saga
    // Here it is our URL, but typically would be the dispatched action
    'url'
  );

  // assert that the effects you care about occurred as expected, in order
  assert.equal(actualEffects[0], call(myApi, 'url', selectedValue));
  assert.equal(actualEffects[1], put(success, response));

  // assert that your saga does nothing unexpected
  assert.true(actualEffects.length === 2);
});
```

### redux-saga-tester

A final library to consider for integration testing. this library provides a `sagaTester` class, to which you instantiate with your store's initial state and your reducer.

To test your saga, the `sagaTester` instance `start()` method with your saga and its argument(s). This runs your saga to its end. Then you may assert that effects occured, actions were dispatched and the state was updated as expected.

```javascript
import SagaTester from 'redux-saga-tester';

test('with redux-saga-tester', () => {
  const sagaTester = new SagaTester({
    initialState: defaultState,
    reducers: reducer
  });

  sagaTester.start(callApi);

  sagaTester.dispatch(actionToTriggerSaga());

  await sagaTester.waitFor(success);

  assert.true(sagaTester.wasCalled(success(response)));

  assert.deepEqual(sagaTester.getState(), { data: response });
});
```

## `effectMiddlewares`
Provides a native way to perform integration like testing without one of the above libraries.

The idea is that you can create a real redux store with saga middleware in your test file. The saga middleware takes an object as an argument. That object would have an `effectMiddlewares` value: a function where you can intercept/hijack any effect and resolve it on your own - passing it very redux-style to the next middleware.

In your test, you would start a saga, intercept/resolve async effects with effectMiddlewares and assert on things like state updates to test integration between your saga and a store.

Here's an example from the [docs](https://github.com/redux-saga/redux-saga/blob/34c9093684323ab92eacdf2df958f31d9873d3b1/test/interpreter/effectMiddlewares.js#L88):

```javascript
test('effectMiddleware', assert => {
  assert.plan(1);

  let actual = [];

  function rootReducer(state = {}, action) {
    return action;
  }

  const effectMiddleware = next => effect => {
    if (effect === apiCall) {
      Promise.resolve().then(() => next('injected value'));
      return;
    }
    return next(effect);
  };

  const middleware = sagaMiddleware({ effectMiddlewares: [effectMiddleware] });
  const store = createStore(rootReducer, {}, applyMiddleware(middleware));

  const apiCall = call(() => new Promise(() => {}));

  function* root() {
    actual.push(yield all([call(fnA), apiCall]));
  }

  function* fnA() {
    const result = [];
    result.push((yield take('ACTION-1')).val);
    result.push((yield take('ACTION-2')).val);
    return result;
  }

  const task = middleware.run(root)

  Promise.resolve()
    .then(() => store.dispatch({ type: 'ACTION-1', val: 1 }))
    .then(() => store.dispatch({ type: 'ACTION-2', val: 2 }));

  const expected = [[[1, 2], 'injected value']];

  task
    .toPromise()
    .then(() => {
      assert.deepEqual(
        actual,
        expected,
        'effectMiddleware must be able to intercept and resolve effect in a custom way',
      )
    })
    .catch(err => assert.fail(err));
});
```

 [1]: https://github.com/stoeffel/redux-saga-test
 [2]: https://github.com/antoinejaussoin/redux-saga-testing/
 [3]: https://github.com/DNAinfo/redux-saga-test-engine
 [4]: https://github.com/wix/redux-saga-tester
 [5]: https://github.com/jfairbank/redux-saga-test-plan

# Connecting Sagas to external Input/Output

We saw that `take` Effects are resolved by waiting for actions to be dispatched to the Store. And that `put` Effects are resolved by dispatching the actions provided as argument.

When a Saga is started (either at startup or later dynamically), the middleware automatically connects its `take`/`put` to the store. The 2 Effects can be seen as a sort of Input/Output to the Saga.

`redux-saga` provides a way to run a Saga outside of the Redux middleware environment and connect it to a custom Input/Output.

```js
import { runSaga, stdChannel } from 'redux-saga'

const emitter = new EventEmitter()
const channel = stdChannel()
emitter.on("action", channel.put)

const myIO = {
  // this will be used to orchestrate take and put Effects
  channel,
  // this will be used to resolve put Effects
  dispatch(output) {
    emitter.emit("action", output)
  },
  // this will be used to resolve select Effects
  getState() {
    return state
  }
}

runSaga(
  myIO,
  function* saga() { ... },
)
```

For more info, see the [API docs](https://redux-saga.js.org/docs/api/index.html##runsagaoptions-saga-args), [Channels](./Channels.md), [demo](https://codesandbox.io/s/1yq1lx77jq)

# Recipes

## Throttling

You can throttle a sequence of dispatched actions by using a handy built-in `throttle` helper. For example, suppose the UI fires an `INPUT_CHANGED` action while the user is typing in a text field.

```javascript
import { throttle } from 'redux-saga/effects'

function* handleInput(input) {
  // ...
}

function* watchInput() {
  yield throttle(500, 'INPUT_CHANGED', handleInput)
}
```

By using this helper the `watchInput` won't start a new `handleInput` task for 500ms, but in the same time it will still be accepting the latest `INPUT_CHANGED` actions into its underlaying `buffer`, so it'll miss all `INPUT_CHANGED` actions happening in-between. This ensures that the Saga will take at most one `INPUT_CHANGED` action during each period of 500ms and still be able to process trailing action.

## Debouncing

From redux-saga@v1 [debounce](API.md#debouncems-pattern-saga-args) is built-in effect.

Let's consider how the effect could be implemented as a combination of other base effects.

To debounce a sequence, put the built-in `delay` helper in the forked task:

```javascript

import { call, cancel, fork, take, delay } from 'redux-saga/effects'

function* handleInput(input) {
  // debounce by 500ms
  yield delay(500)
  ...
}

function* watchInput() {
  let task
  while (true) {
    const { input } = yield take('INPUT_CHANGED')
    if (task) {
      yield cancel(task)
    }
    task = yield fork(handleInput, input)
  }
}
```

In the above example `handleInput` waits for 500ms before performing its logic. If the user types something during this period we'll get more `INPUT_CHANGED` actions. Since `handleInput` will still be blocked in the `delay` call, it'll be cancelled by `watchInput` before it can start performing its logic.

Example above could be rewritten with redux-saga `takeLatest` helper:

```javascript

import { call, takeLatest, delay } from 'redux-saga/effects'

function* handleInput({ input }) {
  // debounce by 500ms
  yield delay(500)
  ...
}

function* watchInput() {
  // will cancel current running handleInput task
  yield takeLatest('INPUT_CHANGED', handleInput);
}
```

## Retrying XHR calls

From redux-saga@v1 [retry](API.md#retrymaxtries-delay-fn-args) is built-in effect.

Let's consider how the effect could be implemented as a combination of other base effects.

To retry an XHR call for a specific amount of times, use a for loop with a delay:

```javascript
import { call, put, take, delay } from 'redux-saga/effects'

function* updateApi(data) {
  for (let i = 0; i < 5; i++) {
    try {
      const apiResponse = yield call(apiRequest, { data })
      return apiResponse
    } catch (err) {
      if (i < 4) {
        yield delay(2000)
      }
    }
  }
  // attempts failed after 5 attempts
  throw new Error('API request failed')
}

export default function* updateResource() {
  while (true) {
    const { data } = yield take('UPDATE_START')
    try {
      const apiResponse = yield call(updateApi, data)
      yield put({
        type: 'UPDATE_SUCCESS',
        payload: apiResponse.body,
      })
    } catch (error) {
      yield put({
        type: 'UPDATE_ERROR',
        error,
      })
    }
  }
}
```

In the above example the `apiRequest` will be retried for 5 times, with a delay of 2 seconds in between. After the 5th failure, the exception thrown will get caught by the parent saga, which will dispatch the `UPDATE_ERROR` action.

If you want unlimited retries, then the `for` loop can be replaced with a `while (true)`. Also instead of `take` you can use `takeLatest`, so only the last request will be retried. By adding an `UPDATE_RETRY` action in the error handling, we can inform the user that the update was not successful but it will be retried.

```javascript
import { delay } from 'redux-saga/effects'

function* updateApi(data) {
  while (true) {
    try {
      const apiResponse = yield call(apiRequest, { data })
      return apiResponse
    } catch (error) {
      yield put({
        type: 'UPDATE_RETRY',
        error,
      })
      yield delay(2000)
    }
  }
}

function* updateResource({ data }) {
  const apiResponse = yield call(updateApi, data)
  yield put({
    type: 'UPDATE_SUCCESS',
    payload: apiResponse.body,
  })
}

export function* watchUpdateResource() {
  yield takeLatest('UPDATE_START', updateResource)
}
```

## Undo

The ability to undo respects the user by allowing the action to happen smoothly
first and foremost before assuming they don't know what they are doing ([link](https://goodui.org/#8)).
The [redux documentation](https://redux.js.org/recipes/implementing-undo-history#understanding-undo-history) describes a
robust way to implement an undo based on modifying the reducer to contain `past`, `present`,
and `future` state. There is even a library [redux-undo](https://github.com/omnidan/redux-undo) that
creates a higher order reducer to do most of the heavy lifting for the developer.

However, this method comes with overhead because it stores references to the previous state(s) of the application.

Using redux-saga's `delay` and `race` we can implement a basic, one-time undo without enhancing
our reducer or storing the previous state.

```javascript
import { take, put, call, spawn, race, delay } from 'redux-saga/effects'
import { updateThreadApi, actions } from 'somewhere'

function* onArchive(action) {
  const { threadId } = action
  const undoId = `UNDO_ARCHIVE_${threadId}`

  const thread = { id: threadId, archived: true }

  // show undo UI element, and provide a key to communicate
  yield put(actions.showUndo(undoId))

  // optimistically mark the thread as `archived`
  yield put(actions.updateThread(thread))

  // allow the user 5 seconds to perform undo.
  // after 5 seconds, 'archive' will be the winner of the race-condition
  const { undo, archive } = yield race({
    undo: take(action => action.type === 'UNDO' && action.undoId === undoId),
    archive: delay(5000),
  })

  // hide undo UI element, the race condition has an answer
  yield put(actions.hideUndo(undoId))

  if (undo) {
    // revert thread to previous state
    yield put(actions.updateThread({ id: threadId, archived: false }))
  } else if (archive) {
    // make the API call to apply the changes remotely
    yield call(updateThreadApi, thread)
  }
}

function* main() {
  while (true) {
    // wait for an ARCHIVE_THREAD to happen
    const action = yield take('ARCHIVE_THREAD')
    // use spawn to execute onArchive in a non-blocking fashion, which also
    // prevents cancellation when main saga gets cancelled.
    // This helps us in keeping state in sync between server and client
    yield spawn(onArchive, action)
  }
}
```

# External Resources

### Articles on Generators

- [The Definitive Guide to the JavaScript Generators](https://github.com/gajus/gajus.com-blog/blob/master/posts/the-definitive-guide-to-the-javascript-generators/index.md) by Gajus Kuizinas
- [The Basics Of ES6 Generators](https://davidwalsh.name/es6-generators) by Kyle Simpson
- [ES6 generators in depth](http://www.2ality.com/2015/03/es6-generators.html) by Axel Rauschmayer
- [3 cases where JavaScript generators rock (+ understanding them)](https://goshakkk.name/javascript-generators-understanding-sample-use-cases/) by Gosha Arinich

### Articles on redux-saga

- [Redux nowadays: From actions creators to sagas](https://riad.blog/2015/12/28/redux-nowadays-from-actions-creators-to-sagas/) by Riad Benguella
- [Managing Side Effects In React + Redux Using Sagas](http://jaysoo.ca/2016/01/03/managing-processes-in-redux-using-sagas/) by Jack Hsu
- [Using redux-saga To Simplify Your Growing React Native Codebase](https://medium.com/infinite-red/using-redux-saga-to-simplify-your-growing-react-native-codebase-2b8036f650de#.7wl4wr1tk) by Steve Kellock
- [Master Complex Redux Workflows with Sagas](http://konkle.us/master-complex-redux-workflows-with-sagas/) by Brandon Konkle
- [Handling async in Redux with Sagas](https://wecodetheweb.com/2016/10/01/handling-async-in-redux-with-sagas/) by Niels Gerritsen
- [Tips to handle Authentication in Redux](https://medium.com/@MattiaManzati/tips-to-handle-authentication-in-redux-2-introducing-redux-saga-130d6872fbe7#.g49x2gj1g) by Mattia Manzati
- [Build an Image Gallery Using React, Redux and redux-saga](http://joelhooks.com/blog/2016/03/20/build-an-image-gallery-using-redux-saga/?utm_content=bufferbadc3&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer) by Joel Hooks
- [Async Operations using redux saga](https://medium.com/@andresmijares25/async-operations-using-redux-saga-2ba02ae077b3#.556ey5blj) by Andrés Mijares
- [Vuex meets Redux-saga](https://medium.com/@xanf/vuex-meets-redux-saga-e9c6b46555e#.d4318am40) by Illya Klymov
- [3 common approaches to side-effects in Redux apps](https://goshakkk.name/redux-side-effect-approaches/) by Gosha Arinich
- [Lazy registration with Redux and Sagas](https://goshakkk.name/lazy-auth-redux-saga-flow/) by Gosha Arinich
- [Writing more testable code with Redux Saga](https://medium.com/grey-frogs/writing-more-testable-code-with-redux-saga-c1561f995225) by Luiz Guilherme D’Abruzzo Pereira
- [Redux Hero Part 4: Every Hero Needs a Villain (A Fun Introduction to redux-saga.js)](https://decembersoft.com/posts/redux-hero-part-4-every-hero-needs-a-villain-a-fun-introduction-to-redux-saga-js/)
- [Modelling common patterns with redux-saga](https://medium.com/@chanakyabhardwaj/modelling-common-patterns-with-redux-saga-464a380a37ce) by Chanakya Bhardwaj
- [Analytics on easy mode with Redux-Saga](https://goshakkk.name/analytics-easy-redux-saga/) by Gosha Arinich
- [Redux Saga common Patterns](https://medium.com/shiftgig-blog/redux-saga-common-patterns-48437892e11c) by Andres Mijares
- [Keep Trying: Redux Saga Style](https://medium.com/@bryanfillmer/keep-trying-redux-saga-style-b273882b9ec) by Bryan Fillmer
- [Try Again: More Redux Saga Patterns](https://codeburst.io/try-again-more-redux-saga-patterns-bfbc3ffcdc) by Bryan Fillmer
- [A Redux First Router Saga](https://medium.com/@bryanfillmer/a-redux-first-router-saga-67c2cda9252e) by Bryan Fillmer
- [What is Redux-Saga?](https://engineering.universe.com/what-is-redux-saga-c1252fc2f4d1) by Alex Richardson
- [Lost with Redux and sagas? Implement them yourself!](https://blog.castiel.me/posts/2019-08-03-lost-redux-saga-reimplement-them/) by Sébastien Castiel
- [Assembling Robust Web Chat Applications with JavaScript: An In-depth Guide](https://medium.com/carousell-insider/assembling-robust-web-chat-applications-with-javascript-an-in-depth-guide-9f36685fc1bc) by Yao-Hui Chua

### Videos on redux-saga
- [Async React with Redux Saga](https://egghead.io/courses/async-react-with-redux-saga) by Tyler Clark
- [Learn Redux Saga series](https://www.youtube.com/playlist?list=PLMV09mSPNaQlWvqEwF6TfHM-CVM6lXv39) by Divyanshu Maithani and Deepak Grover

### Addons
- [redux-saga-sc](https://www.npmjs.com/package/redux-saga-sc) – Provides sagas to easily dispatch redux actions over SocketCluster websockets
- [redux-form-saga](https://www.npmjs.com/package/redux-form-saga) – An action creator and saga for integrating Redux Form and Redux Saga
- [redux-electron-enhancer](https://www.npmjs.com/package/redux-electron-enhancer) – Redux store which synchronizes between instances in multiple process
- [eslint-plugin-redux-saga](https://www.npmjs.com/package/eslint-plugin-redux-saga) - ESLint rules that help you to write error free sagas
- [redux-saga-router](https://www.npmjs.com/package/redux-saga-router) - Helper for running sagas in response to route changes.
- [vuex-redux-saga](https://github.com/xanf/vuex-redux-saga) - Bridge between Vuex and Redux-Saga
- [esdoc-saga-plugin](https://www.npmjs.com/package/esdoc-saga-plugin) - ESDoc plugin for documenting sagas effects.
- [redux-saga-compose](https://www.npmjs.com/package/redux-saga-compose) - Compose sagas as middleware in the style of koa-compose
- [redux-saga-requests](https://github.com/klis87/redux-saga-requests) - Tremendously simplifies AJAX requests with sagas, supports Axios and Fetch API

# Troubleshooting

### App freezes after adding a saga

Make sure that you `yield` the effects from the generator function.

Consider this example:

```js
import { take } from 'redux-saga/effects'

function* logActions() {
  while (true) {
    const action = take() // wrong
    console.log(action)
  }
}
```

It will put the application into an infinite loop because `take()` only creates a description of the effect. Unless you `yield` it for the middleware to execute, the `while` loop will behave like a regular `while` loop, and freeze your application.

Adding `yield` will pause the generator and return control to the Redux Saga middleware which will execute the effect. In case of `take()`, Redux Saga will wait for the next action matching the pattern, and only then will resume the generator.

To fix the example above, `yield` the effect returned by `take()`:

```js
import { take } from 'redux-saga/effects'

function* logActions() {
  while (true) {
    const action = yield take() // correct
    console.log(action)
  }
}
```

### My Saga is missing dispatched actions

Make sure the Saga is not blocked on some effect. When a Saga is waiting for an Effect to
resolve, it will not be able to take dispatched actions until the Effect is resolved.

For example, consider this example

```javascript
function* watchRequestActions() {
  while (true) {
    const {url, params} = yield take('REQUEST')
    yield call(handleRequestAction, url, params) // The Saga will block here
  }
}

function* handleRequestAction(url, params) {
  const response = yield call(someRemoteApi, url, params)
  yield put(someAction(response))
}
```

When `watchRequestActions` performs `yield call(handleRequestAction, url, params)`, it'll wait
for `handleRequestAction` until it terminates an returns before continuing on the next
`yield take`. For example suppose we have this sequence of events

```
UI                     watchRequestActions             handleRequestAction
-----------------------------------------------------------------------------
.......................take('REQUEST').......................................
dispatch(REQUEST)......call(handleRequestAction).......call(someRemoteApi)... Wait server resp.
.............................................................................
.............................................................................
dispatch(REQUEST)............................................................ Action missed!!
.............................................................................
.............................................................................
.......................................................put(someAction).......
.......................take('REQUEST')....................................... saga is resumed
```

As illustrated above, when a Saga is blocked on a **blocking call** then it will miss
all the actions dispatched in-between.

To avoid blocking the Saga, you can use a **non-blocking call** using `fork` instead of `call`

```javascript
function* watchRequestActions() {
  while (true) {
    const {url, params} = yield take('REQUEST')
    yield fork(handleRequestAction, url, params) // The Saga will resume immediately
  }
}
```

### Error stack for errors bubbling to root saga is unreadable
Tasks in saga are asynchronous by their nature, so we have to make some
additional work to show "saga stack" as it was a chain of synchronous calls. So staring with `redux-saga@v1`, when error bubbles to root saga, the library builds that "saga stack" and passes it as a property `sagaStack: string` of the second argument of `onError` callback (also see [Middleware options](https://redux-saga.js.org/docs/api/index.html#createsagamiddlewareoptions)), so you can send it to your error tracking system or make other additional work.

As a result, you can see something like this in your console.

![saga-error-stack.png](https://redux-saga.js.org/assets/images/saga-error-stack-28d091caba535307d7fc80064b8bfcdb.png)

If you want to have those "saga stack" with file names and line numbers for **development purposes**, you can add [babel-plugin](https://www.npmjs.com/package/babel-plugin-redux-saga), which allows you to have enhanced information.
Docs are available [here](https://github.com/redux-saga/redux-saga/tree/master/packages/babel-plugin-redux-saga).
For babel-plugin usage example check [this example](https://github.com/redux-saga/redux-saga/tree/master/examples/error-demo).

After adding `babel-plugin-redux-saga` the same output looks like

![saga-error-stack-with-babel-plugin.png](https://redux-saga.js.org/assets/images/saga-error-stack-with-babel-plugin-4b99ed376df0958b8ff7d12532d6d552.png)

Note: [It works for testing as well](https://github.com/redux-saga/redux-saga/blob/master/examples/error-demo/test/sagas.js), just make sure you (or your runner) run saga via `sagaMiddleware`.

![saga-error-stack-node.png](data:image/png;base64,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)


# Glossary

This is a glossary of the core terms in Redux Saga.

### Effect

An effect is a plain JavaScript Object containing some instructions to be executed by the saga middleware.

You create effects using factory functions provided by the redux-saga library. For example you use
`call(myfunc, 'arg1', 'arg2')` to instruct the middleware to invoke `myfunc('arg1', 'arg2')` and return
the result back to the Generator that yielded the effect

### Task

A task is like a process running in background. In a redux-saga based application there can be
multiple tasks running in parallel. You create tasks by using the `fork` function

```javascript
import {fork} from "redux-saga/effects"

function* saga() {
  ...
  const task = yield fork(otherSaga, ...args)
  ...
}
```

### Blocking/Non-blocking call

A Blocking call means that the Saga yielded an Effect and will wait for the outcome of its execution before
resuming to the next instruction inside the yielding Generator.

A Non-blocking call means that the Saga will resume immediately after yielding the Effect.

For example

```javascript
import {call, cancel, join, take, put} from "redux-saga/effects"

function* saga() {
  yield take(ACTION)              // Blocking: will wait for the action
  yield call(ApiFn, ...args)      // Blocking: will wait for ApiFn (If ApiFn returns a Promise)
  yield call(otherSaga, ...args)  // Blocking: will wait for otherSaga to terminate

  yield put(...)                   // Non-Blocking: will dispatch within internal scheduler

  const task = yield fork(otherSaga, ...args)  // Non-blocking: will not wait for otherSaga
  yield cancel(task)                           // Non-blocking: will resume immediately
  // or
  yield join(task)                              // Blocking: will wait for the task to terminate
}
```

### Watcher/Worker

refers to a way of organizing the control flow using two separate Sagas

- The watcher: will watch for dispatched actions and fork a worker on every action

- The worker: will handle the action and terminate

example

```javascript
function* watcher() {
  while (true) {
    const action = yield take(ACTION)
    yield fork(worker, action.payload)
  }
}

function* worker(payload) {
  // ... do some stuff
}
```

# API Reference

## Middleware API

### `createSagaMiddleware(options)`

Creates a Redux middleware and connects the Sagas to the Redux Store

- `options: Object` - A list of options to pass to the middleware. Currently supported options are:
  - `context: Object` - initial value of the saga's context.

  - `sagaMonitor` : [SagaMonitor](#sagamonitor) - If a Saga Monitor is provided, the middleware will deliver monitoring events to the monitor.

  - `onError: (error: Error, { sagaStack: string })` - if provided, the middleware will call it with uncaught errors from Sagas. useful for sending uncaught exceptions to error tracking services.
  - `effectMiddlewares` : Function [] - allows you to intercept any effect, resolve it on your own and pass to the next middleware. See [this section](advanced/Testing.md#effectmiddlewares) for a detailed example


#### Example

Below we will create a function `configureStore` which will enhance the Store with a new method `runSaga`. Then in our main module, we will use the method to start the root Saga of the application.

**configureStore.js**
```javascript
import createSagaMiddleware from 'redux-saga'
import reducer from './path/to/reducer'

export default function configureStore(initialState) {
  // Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(reducer, initialState, applyMiddleware(/* other middleware, */sagaMiddleware)),
    runSaga: sagaMiddleware.run
  }
}
```

**main.js**
```javascript
import configureStore from './configureStore'
import rootSaga from './sagas'
// ... other imports

const store = configureStore()
store.runSaga(rootSaga)
```

#### Notes

See below for more information on the `sagaMiddleware.run` method.

### `middleware.run(saga, ...args)`

Dynamically run `saga`. Can be used to run Sagas **only after** the `applyMiddleware` phase.

- `saga: Function`: a Generator function
- `args: Array<any>`: arguments to be provided to `saga`

The method returns a [Task descriptor](#task-descriptor).

#### Notes

`saga` must be a function which returns a [Generator Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator). The middleware will then iterate over the Generator and execute all yielded Effects.

`saga` may also start other sagas using the various Effects provided by the library. The iteration process described below is also applied to all child sagas.

In the first iteration, the middleware invokes the `next()` method to retrieve the next Effect. The middleware then executes the yielded Effect as specified by the Effects API below. Meanwhile, the Generator will be suspended until the effect execution terminates. Upon receiving the result of the execution, the middleware calls `next(result)` on the Generator passing it the retrieved result as an argument. This process is repeated until the Generator terminates normally or by throwing some error.

If the execution results in an error (as specified by each Effect creator) then the `throw(error)` method of the Generator is called instead. If the Generator function defines a `try/catch` surrounding the current yield instruction, then the `catch` block will be invoked by the underlying Generator runtime. The runtime will also invoke any corresponding finally block.

In the case a Saga is cancelled (either manually or using the provided Effects), the middleware will invoke `return()` method of the Generator. This will cause the Generator to skip directly to the finally block.

## Effect creators

> Notes:

> - Each function below returns a plain JavaScript object and does not perform any execution.
> - The execution is performed by the middleware during the Iteration process described above.
> - The middleware examines each Effect description and performs the appropriate action.

### `take(pattern)`

Creates an Effect description that instructs the middleware to wait for a specified action on the Store.
The Generator is suspended until an action that matches `pattern` is dispatched.

The result of `yield take(pattern)` is an action object being dispatched.

`pattern` is interpreted using the following rules:

- If `take` is called with no arguments or `'*'` all dispatched actions are matched (e.g. `take()` will match all actions)

- If it is a function, the action is matched if `pattern(action)` is true (e.g. `take(action => action.entities)` will match all actions having a (truthy) `entities` field.)
> Note: if the pattern function has `toString` defined on it, `action.type` will be tested against `pattern.toString()` instead. This is useful if you're using an action creator library like redux-act or redux-actions.

- If it is a String, the action is matched if `action.type === pattern` (e.g. `take(INCREMENT_ASYNC)`)

- If it is an array, each item in the array is matched with aforementioned rules, so the mixed array of strings and function predicates is supported. The most common use case is an array of strings though, so that `action.type` is matched against all items in the array (e.g. `take([INCREMENT, DECREMENT])` and that would match either actions of type `INCREMENT` or `DECREMENT`).

The middleware provides a special action `END`. If you dispatch the END action, then all Sagas blocked on a take Effect will be terminated regardless of the specified pattern. If the terminated Saga has still some forked tasks which are still running, it will wait for all the child tasks to terminate before terminating the Task.

### `takeMaybe(pattern)`

Same as `take(pattern)` but does not automatically terminate the Saga on an `END` action. Instead all Sagas blocked on a take Effect will get the `END` object.

#### Notes

`takeMaybe` got its name from the FP analogy - it's like instead of having a return type of `ACTION` (with automatic handling) we can have a type of `Maybe(ACTION)` so we can handle both cases:

- case when there is a `Just(ACTION)` (we have an action)
- the case of `NOTHING` (channel was closed*). i.e. we need some way to map over `END`

* internally all `dispatch`ed actions are going through the `stdChannel` which is getting closed when `dispatch(END)` happens

### `take(channel)`

Creates an Effect description that instructs the middleware to wait for a specified message from the provided Channel. If the channel is already closed, then the Generator will immediately terminate following the same process described above for `take(pattern)`.

### `takeMaybe(channel)`

Same as `take(channel)` but does not automatically terminate the Saga on an `END` action. Instead all Sagas blocked on a take Effect will get the `END` object. See more [here](#takemaybepattern)

### `takeEvery(pattern, saga, ...args)`

Spawns a `saga` on each action dispatched to the Store that matches `pattern`.

- `pattern: String | Array | Function` - for more information see docs for [`take(pattern)`](#takepattern)

- `saga: Function` - a Generator function

- `args: Array<any>` - arguments to be passed to the started task. `takeEvery` will add the incoming action to the argument list (i.e. the action will be the last argument provided to `saga`)

#### Example

In the following example, we create a basic task `fetchUser`. We use `takeEvery` to start a new `fetchUser` task on each dispatched `USER_REQUESTED` action:

```javascript
import { takeEvery } from `redux-saga/effects`

function* fetchUser(action) {
  ...
}

function* watchFetchUser() {
  yield takeEvery('USER_REQUESTED', fetchUser)
}
```

#### Notes

`takeEvery` is a high-level API built using `take` and `fork`. Here is how the helper could be implemented using the low-level Effects

```javascript
const takeEvery = (patternOrChannel, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(patternOrChannel)
    yield fork(saga, ...args.concat(action))
  }
})
```

`takeEvery` allows concurrent actions to be handled. In the example above, when a `USER_REQUESTED`
action is dispatched, a new `fetchUser` task is started even if a previous `fetchUser` is still pending
(for example, the user clicks on a `Load User` button 2 consecutive times at a rapid rate, the 2nd
click will dispatch a `USER_REQUESTED` action while the `fetchUser` fired on the first one hasn't yet terminated)

`takeEvery` doesn't handle out of order responses from tasks. There is no guarantee that the tasks will
terminate in the same order they were started. To handle out of order responses, you may consider `takeLatest`
below.

### `takeEvery(channel, saga, ...args)`

You can also pass in a channel as argument and the behaviour is the same as [takeEvery(pattern, saga, ...args)](#takeeverypattern-saga-args).

### `takeLatest(pattern, saga, ...args)`

Forks a `saga` on each action dispatched to the Store that matches `pattern`. And automatically cancels
any previous `saga` task started previously if it's still running.

Each time an action is dispatched to the store. And if this action matches `pattern`, `takeLatest`
starts a new `saga` task in the background. If a `saga` task was started previously (on the last action dispatched
before the actual action), and if this task is still running, the task will be cancelled.

- `pattern: String | Array | Function` - for more information see docs for [`take(pattern)`](#takepattern)

- `saga: Function` - a Generator function

- `args: Array<any>` - arguments to be passed to the started task. `takeLatest` will add the
incoming action to the argument list (i.e. the action will be the last argument provided to `saga`)

#### Example

In the following example, we create a basic task `fetchUser`. We use `takeLatest` to
start a new `fetchUser` task on each dispatched `USER_REQUESTED` action. Since `takeLatest`
cancels any pending task started previously, we ensure that if a user triggers multiple consecutive
`USER_REQUESTED` actions rapidly, we'll only conclude with the latest action

```javascript
import { takeLatest } from `redux-saga/effects`

function* fetchUser(action) {
  ...
}

function* watchLastFetchUser() {
  yield takeLatest('USER_REQUESTED', fetchUser)
}
```

#### Notes

`takeLatest` is a high-level API built using `take` and `fork`. Here is how the helper could be implemented using the low-level Effects

```javascript
const takeLatest = (patternOrChannel, saga, ...args) => fork(function*() {
  let lastTask
  while (true) {
    const action = yield take(patternOrChannel)
    if (lastTask) {
      yield cancel(lastTask) // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(saga, ...args.concat(action))
  }
})
```

### `takeLatest(channel, saga, ...args)`

You can also pass in a channel as argument and the behaviour is the same as [takeLatest(pattern, saga, ...args)](#takelatestpattern-saga-args).

### `takeLeading(pattern, saga, ...args)`

Spawns a `saga` on each action dispatched to the Store that matches `pattern`.
After spawning a task once, it blocks until spawned saga completes and then starts to listen for a `pattern` again.

In short, `takeLeading` is listening for the actions when it doesn't run a saga.

- `pattern: String | Array | Function` - for more information see docs for [`take(pattern)`](#takepattern)

- `saga: Function` - a Generator function

- `args: Array<any>` - arguments to be passed to the started task. `takeLeading` will add the
incoming action to the argument list (i.e. the action will be the last argument provided to `saga`)

#### Example

In the following example, we create a basic task `fetchUser`. We use `takeLeading` to
start a new `fetchUser` task on each dispatched `USER_REQUESTED` action. Since `takeLeading`
ignores any new coming task after it's started, we ensure that if a user triggers multiple consecutive
`USER_REQUESTED` actions rapidly, we'll only keep on running with the leading action

```javascript
import { takeLeading } from `redux-saga/effects`

function* fetchUser(action) {
  ...
}

function* watchLastFetchUser() {
  yield takeLeading('USER_REQUESTED', fetchUser)
}
```

#### Notes

`takeLeading` is a high-level API built using `take` and `call`. Here is how the helper could be implemented using the low-level Effects

```javascript
const takeLeading = (patternOrChannel, saga, ...args) => fork(function*() {
  while (true) {
    const action = yield take(patternOrChannel);
    yield call(saga, ...args.concat(action));
  }
})
```

### `takeLeading(channel, saga, ...args)`

You can also pass in a channel as argument and the behavior is the same as [takeLeading(pattern, saga, ...args)](#takeleadingpattern-saga-args).

### `put(action)`

Creates an Effect description that instructs the middleware to schedule the dispatching of an action to the store. This dispatch may not be immediate since other tasks might lie ahead in the saga task queue or still be in progress.

You can, however, expect the store to be updated in the current stack frame (i.e. by the next line of code after `yield put(action)`) unless you have other Redux middlewares with asynchronous flows that delay the propagation of the action.

Downstream errors (e.g. from the reducer) will be bubbled up.

- `action: Object` - [see Redux `dispatch` documentation for complete info](https://redux.js.org/api/store#dispatchaction)

### `putResolve(action)`

Just like [`put`](#putaction) but the effect is blocking (if promise is returned from `dispatch` it will wait for its resolution) and will bubble up errors from downstream.

- `action: Object` - [see Redux `dispatch` documentation for complete info](https://redux.js.org/api/store/#dispatchaction)

### `put(channel, action)`

Creates an Effect description that instructs the middleware to put an action into the provided channel.

- `channel: Channel` - a [`Channel`](#channel) Object.
- `action: Object` - [see Redux `dispatch` documentation for complete info](https://redux.js.org/api/store/#dispatchaction)

This effect is blocking if the put is *not* buffered but immediately consumed by takers. If an error
is thrown in any of these takers it will bubble back into the saga.

### `call(fn, ...args)`

Creates an Effect description that instructs the middleware to call the function `fn` with `args` as arguments.

- `fn: Function` - A Generator function, or normal function which either returns a Promise as result, or any other value.
- `args: Array<any>` - An array of values to be passed as arguments to `fn`

#### Notes

`fn` can be either a *normal* or a Generator function.

The middleware invokes the function and examines its result.

If the result is an Iterator object, the middleware will run that Generator function, just like it did with the
startup Generators (passed to the middleware on startup). The parent Generator will be
suspended until the child Generator terminates normally, in which case the parent Generator
is resumed with the value returned by the child Generator. Or until the child aborts with some
error, in which case an error will be thrown inside the parent Generator.

If `fn` is a normal function and returns a Promise, the middleware will suspend the Generator until the Promise is
settled. After the promise is resolved the Generator is resumed with the resolved value, or if the Promise
is rejected an error is thrown inside the Generator.

If the result is not an Iterator object nor a Promise, the middleware will immediately return that value back to the saga,
so that it can resume its execution synchronously.

When an error is thrown inside the Generator, if it has a `try/catch` block surrounding the
current `yield` instruction, the control will be passed to the `catch` block. Otherwise,
the Generator aborts with the raised error, and if this Generator was called by another
Generator, the error will propagate to the calling Generator.

### `call([context, fn], ...args)`

Same as `call(fn, ...args)` but supports passing a `this` context to `fn`. This is useful to
invoke object methods.

### `call([context, fnName], ...args)`

Same as `call([context, fn], ...args)` but supports passing a `fn` as string. Useful for invoking object's methods, i.e. `yield call([localStorage, 'getItem'], 'redux-saga')`

### `call({context, fn}, ...args)`

Same as `call([context, fn], ...args)` but supports passing `context` and `fn` as properties of an object, i.e. `yield call({context: localStorage, fn: localStorage.getItem}, 'redux-saga')`. `fn` can be a string or a function.

### `apply(context, fn, [args])`

Alias for `call([context, fn], ...args)`.

### `cps(fn, ...args)`

Creates an Effect description that instructs the middleware to invoke `fn` as a Node style function.

- `fn: Function` - a Node style function. i.e. a function which accepts in addition to its arguments,
an additional callback to be invoked by `fn` when it terminates. The callback accepts two parameters,
where the first parameter is used to report errors while the second is used to report successful results

- `args: Array<any>` - an array to be passed as arguments for `fn`

#### Notes

The middleware will perform a call `fn(...arg, cb)`. The `cb` is a callback passed by the middleware to
`fn`. If `fn` terminates normally, it must call `cb(null, result)` to notify the middleware
of a successful result. If `fn` encounters some error, then it must call `cb(error)` in order to
notify the middleware that an error has occurred.

The middleware remains suspended until `fn` terminates.

### `cps([context, fn], ...args)`

Supports passing a `this` context to `fn` (object method invocation)

### `cps({context, fn}, ...args)`

Same as `cps([context, fn], ...args)` but supports passing `context` and `fn` as properties of an object. `fn` can be a string or a function.

### `fork(fn, ...args)`

Creates an Effect description that instructs the middleware to perform a *non-blocking call* on `fn`

#### Arguments

- `fn: Function` - A Generator function, or normal function which returns a Promise as result
- `args: Array<any>` - An array of values to be passed as arguments to `fn`

returns a [Task](#task) object.

#### Notes

`fork`, like `call`, can be used to invoke both normal and Generator functions. But, the calls are
non-blocking, the middleware doesn't suspend the Generator while waiting for the result of `fn`.
Instead as soon as `fn` is invoked, the Generator resumes immediately.

`fork`, alongside `race`, is a central Effect for managing concurrency between Sagas.

The result of `yield fork(fn ...args)` is a [Task](#task) object.  An object with some useful
methods and properties.

All forked tasks are *attached* to their parents. When the parent terminates the execution of its
own body of instructions, it will wait for all forked tasks to terminate before returning.

#### Error propagation
Errors from child tasks automatically bubble up to their parents. If any forked task raises an uncaught error, then
the parent task will abort with the child Error, and the whole Parent's execution tree (i.e. forked tasks + the
*main task* represented by the parent's body if it's still running) will be cancelled.

Cancellation of a forked Task will automatically cancel all forked tasks that are still executing. It'll
also cancel the current Effect where the cancelled task was blocked (if any).

If a forked task fails *synchronously* (ie: fails immediately after its execution before performing any
async operation), then no Task is returned, instead the parent will be aborted as soon as possible (since both
parent and child execute in parallel, the parent will abort as soon as it takes notice of the child failure).

To create *detached* forks, use `spawn` instead.

### `fork([context, fn], ...args)`

Supports invoking forked functions with a `this` context

### `fork({context, fn}, ...args)`

Same as `fork([context, fn], ...args)` but supports passing `context` and `fn` as properties of an object. `fn` can be a string or a function.

### `spawn(fn, ...args)`

Same as `fork(fn, ...args)` but creates a *detached* task. A detached task remains independent from its parent and acts like
a top-level task. The parent will not wait for detached tasks to terminate before returning and all events which may affect the
parent or the detached task are completely independents (error, cancellation).

### `spawn([context, fn], ...args)`

Supports spawning functions with a `this` context

### `join(task)`

Creates an Effect description that instructs the middleware to wait for the result
of a previously forked task.

- `task: Task` - A [Task](#task) object returned by a previous `fork`

#### Notes

`join` will resolve to the same outcome of the joined task (success or error). If the joined
task is cancelled, the cancellation will also propagate to the Saga executing the join
effect. Similarly, any potential callers of those joiners will be cancelled as well.

### `join([...tasks])`

Creates an Effect description that instructs the middleware to wait for the results of previously forked tasks.

- `tasks: Array<Task>` - A [Task](#task) is the object returned by a previous `fork`

#### Notes

It wraps the array of tasks in [join effects](#jointask), roughly becoming the equivalent of
`yield tasks.map(t => join(t))`.

### `cancel(task)`

Creates an Effect description that instructs the middleware to cancel a previously forked task.

- `task: Task` - A [Task](#task) object returned by a previous `fork`

#### Notes

To cancel a running task, the middleware will invoke `return` on the underlying Generator
object. This will cancel the current Effect in the task and jump to the finally block (if defined).

Inside the finally block, you can execute any cleanup logic or dispatch some action to keep the
store in a consistent state (e.g. reset the state of a spinner to false when an ajax request
is cancelled). You can check inside the finally block if a Saga was cancelled by issuing
a `yield cancelled()`.

Cancellation propagates downward to child sagas. When cancelling a task, the middleware will also
cancel the current Effect (where the task is currently blocked). If the current Effect
is a call to another Saga, it will be also cancelled. When cancelling a Saga, all *attached
forks* (sagas forked using `yield fork()`) will be cancelled. This means that cancellation
effectively affects the whole execution tree that belongs to the cancelled task.

`cancel` is a non-blocking Effect. i.e. the Saga executing it will resume immediately after
performing the cancellation.

For functions which return Promise results, you can plug your own cancellation logic
by attaching a `[CANCEL]` to the promise.

The following example shows how to attach cancellation logic to a Promise result:

```javascript
import { CANCEL } from 'redux-saga'
import { fork, cancel } from 'redux-saga/effects'

function myApi() {
  const promise = myXhr(...)

  promise[CANCEL] = () => myXhr.abort()
  return promise
}

function* mySaga() {

  const task = yield fork(myApi)

  // ... later
  // will call promise[CANCEL] on the result of myApi
  yield cancel(task)
}
```

redux-saga will automatically cancel jqXHR objects using their `abort` method.

### `cancel([...tasks])`

Creates an Effect description that instructs the middleware to cancel previously forked tasks.

- `tasks: Array<Task>` - A [Task](#task) is the object returned by a previous `fork`

#### Notes

It wraps the array of tasks in [cancel effects](#canceltask), roughly becoming the equivalent of
`yield tasks.map(t => cancel(t))`.

### `cancel()`

Creates an Effect description that instructs the middleware to cancel a task in which it has been yielded (self-cancellation).
It allows to reuse destructor-like logic inside a `finally` blocks for both outer (`cancel(task)`) and self (`cancel()`) cancellations.

#### Example

```javascript
function* deleteRecord({ payload }) {
  try {
    const { confirm, deny } = yield call(prompt);
    if (confirm) {
      yield put(actions.deleteRecord.confirmed())
    }
    if (deny) {
      yield cancel()
    }
  } catch(e) {
    // handle failure
  } finally {
    if (yield cancelled()) {
      // shared cancellation logic
      yield put(actions.deleteRecord.cancel(payload))
    }
  }
}
```

### `select(selector, ...args)`

Creates an effect that instructs the middleware to invoke the provided selector on the
current Store's state (i.e. returns the result of `selector(getState(), ...args)`).

- `selector: Function` - a function `(state, ...args) => args`. It takes the
current state and optionally some arguments and returns a slice of the current Store's state

- `args: Array<any>` - optional arguments to be passed to the selector in addition of `getState`.

If `select` is called without argument (i.e. `yield select()`) then the effect is resolved
with the entire state (the same result of a `getState()` call).

> It's important to note that when an action is dispatched to the store, the middleware first
forwards the action to the reducers and then notifies the Sagas. This means that when you query the
Store's State, you get the State **after** the action has been applied.
> However, this behavior is only guaranteed if all subsequent middlewares call `next(action)` synchronously.  If any subsequent middleware calls `next(action)` asynchronously (which is unusual but possible), then the sagas will get the state from **before** the action is applied.  Therefore it is recommended to review the source of each subsequent middleware to ensure it calls `next(action)` synchronously, or else ensure that redux-saga is the last middleware in the call chain.

#### Notes

Preferably, a Saga should be autonomous and should not depend on the Store's state. This makes
it easy to modify the state implementation without affecting the Saga code. A saga should preferably
depend only on its own internal control state when possible. But sometimes, one could
find it more convenient for a Saga to query the state instead of maintaining the needed data by itself
(for example, when a Saga duplicates the logic of invoking some reducer to compute a state that was
already computed by the Store).

For example, suppose we have this state shape in our application:

```javascript
state = {
  cart: {...}
}
```

We can create a *selector*, i.e. a function which knows how to extract the `cart` data from the State:

`./selectors`
```javascript
export const getCart = state => state.cart
```

Then we can use that selector from inside a Saga using the `select` Effect:

`./sagas.js`
```javascript
import { take, fork, select } from 'redux-saga/effects'
import { getCart } from './selectors'

function* checkout() {
  // query the state using the exported selector
  const cart = yield select(getCart)

  // ... call some API endpoint then dispatch a success/error action
}

export default function* rootSaga() {
  while (true) {
    yield take('CHECKOUT_REQUEST')
    yield fork(checkout)
  }
}
```

`checkout` can get the needed information directly by using `select(getCart)`. The Saga is coupled only with the `getCart` selector. If we have many Sagas (or React Components) that needs to access the `cart` slice, they will all be coupled to the same function `getCart`. And if we now change the state shape, we need only to update `getCart`.

### `actionChannel(pattern, [buffer])`

Creates an effect that instructs the middleware to queue the actions matching `pattern` using an event channel. Optionally, you can provide a buffer to control buffering of the queued actions.

- `pattern:` - see API for `take(pattern)`
- `buffer: Buffer` - a [Buffer](#buffer) object

#### Example

The following code creates a channel to buffer all `USER_REQUEST` actions. Note that even the Saga may be blocked
on the `call` effect. All actions that come while it's blocked are automatically buffered. This causes the Saga
to execute the API calls one at a time

```javascript
import { actionChannel, call } from 'redux-saga/effects'
import api from '...'

function* takeOneAtMost() {
  const chan = yield actionChannel('USER_REQUEST')
  while (true) {
    const {payload} = yield take(chan)
    yield call(api.getUser, payload)
  }
}
```

### `flush(channel)`

Creates an effect that instructs the middleware to flush all buffered items from the channel. Flushed items are returned back to the saga, so they can be utilized if needed.

- `channel: Channel` - a [`Channel`](#channel) Object.

#### Example

```javascript

function* saga() {
  const chan = yield actionChannel('ACTION')

  try {
    while (true) {
      const action = yield take(chan)
      // ...
    }
  } finally {
    const actions = yield flush(chan)
    // ...
  }

}
```

### `cancelled()`

Creates an effect that instructs the middleware to return whether this generator has been cancelled. Typically
you use this Effect in a finally block to run Cancellation specific code

#### Example

```javascript

function* saga() {
  try {
    // ...
  } finally {
    if (yield cancelled()) {
      // logic that should execute only on Cancellation
    }
    // logic that should execute in all situations (e.g. closing a channel)
  }
}
```

### `setContext(props)`

Creates an effect that instructs the middleware to update its own context. This effect extends
saga's context instead of replacing it.

### `getContext(prop)`

Creates an effect that instructs the middleware to return a specific property of saga's context.

### `delay(ms, [val])`

Returns an effect descriptor to block execution for `ms` milliseconds and return `val` value.

### `throttle(ms, pattern, saga, ...args)`

Spawns a `saga` on an action dispatched to the Store that matches `pattern`. After spawning a task it's still accepting incoming actions into the underlying `buffer`, keeping at most 1 (the most recent one), but in the same time holding up with spawning new task for `ms` milliseconds (hence its name - `throttle`). Purpose of this is to ignore incoming actions for a given period of time while processing a task.

- `ms: Number` - length of a time window in milliseconds during which actions will be ignored after the action starts processing

- `pattern: String | Array | Function` - for more information see docs for [`take(pattern)`](#takepattern)

- `saga: Function` - a Generator function

- `args: Array<any>` - arguments to be passed to the started task. `throttle` will add the
incoming action to the argument list (i.e. the action will be the last argument provided to `saga`)

#### Example

In the following example, we create a basic task `fetchAutocomplete`. We use `throttle` to
start a new `fetchAutocomplete` task on dispatched `FETCH_AUTOCOMPLETE` action. However since `throttle` ignores consecutive `FETCH_AUTOCOMPLETE` for some time, we ensure that user won't flood our server with requests.

```javascript
import { call, put, throttle } from `redux-saga/effects`

function* fetchAutocomplete(action) {
  const autocompleteProposals = yield call(Api.fetchAutocomplete, action.text)
  yield put({type: 'FETCHED_AUTOCOMPLETE_PROPOSALS', proposals: autocompleteProposals})
}

function* throttleAutocomplete() {
  yield throttle(1000, 'FETCH_AUTOCOMPLETE', fetchAutocomplete)
}
```

#### Notes

`throttle` is a high-level API built using `take`, `fork` and `actionChannel`. Here is how the helper could be implemented using the low-level Effects

```javascript
const throttle = (ms, pattern, task, ...args) => fork(function*() {
  const throttleChannel = yield actionChannel(pattern, buffers.sliding(1))

  while (true) {
    const action = yield take(throttleChannel)
    yield fork(task, ...args, action)
    yield delay(ms)
  }
})
```

### `throttle(ms, channel, saga, ...args)`
You can also handle a channel as argument and the behaviour is the same as [`throttle(ms, pattern, saga, ..args)`](#throttlems-pattern-saga-args)

### `debounce(ms, pattern, saga, ...args)`

Spawns a `saga` on an action dispatched to the Store that matches `pattern`. Saga will be called after it stops taking `pattern` actions for `ms` milliseconds. Purpose of this is to prevent calling saga until the actions are settled off.

- `ms: Number` - defines how many milliseconds should elapse since the last time `pattern` action was fired to call the `saga`

- `pattern: String | Array | Function` - for more information see docs for [`take(pattern)`](#takepattern)

- `saga: Function` - a Generator function

- `args: Array<any>` - arguments to be passed to the started task. `debounce` will add the
incoming action to the argument list (i.e. the action will be the last argument provided to `saga`)

#### Example

In the following example, we create a basic task `fetchAutocomplete`. We use `debounce` to
delay calling `fetchAutocomplete` saga until we stop receive any `FETCH_AUTOCOMPLETE` events for at least `1000` ms.

```javascript
import { call, put, debounce } from `redux-saga/effects`

function* fetchAutocomplete(action) {
  const autocompleteProposals = yield call(Api.fetchAutocomplete, action.text)
  yield put({type: 'FETCHED_AUTOCOMPLETE_PROPOSALS', proposals: autocompleteProposals})
}

function* debounceAutocomplete() {
  yield debounce(1000, 'FETCH_AUTOCOMPLETE', fetchAutocomplete)
}
```

#### Notes

`debounce` is a high-level API built using `take`, `delay`, `race` and `fork`. Here is how the helper could be implemented using the low-level Effects

```javascript
const debounce = (ms, pattern, task, ...args) => fork(function*() {
  while (true) {
    let action = yield take(pattern)

    while (true) {
      const { debounced, latestAction } = yield race({
        debounced: delay(ms),
        latestAction: take(pattern)
      })

      if (debounced) {
        yield fork(task, ...args, action)
        break
      }

      action = latestAction
    }
  }
})
```

### `debounce(ms, channel, saga, ...args)`
You can also handle a channel as argument and the behaviour is the same as [`debounce(ms, pattern, saga, ..args)`](#debouncems-pattern-saga-args)

### `retry(maxTries, delay, fn, ...args)`
Creates an Effect description that instructs the middleware to call the function `fn` with `args` as arguments.
In case of failure will try to make another call after `delay` milliseconds, if a number of attempts < `maxTries`.

- `maxTries: Number` - maximum calls count.
- `delay: Number` - length of a time window in milliseconds between `fn` calls.
- `fn: Function` - A Generator function, or normal function which either returns a Promise as a result, or any other value.
- `args: Array<any>` - An array of values to be passed as arguments to `fn`

#### Example

In the following example, we create a basic task `retrySaga`. We use `retry` to try to fetch our API 3 times with 10 second interval. If `request` fails first time than `retry` will call `request` one more time while calls count less than 3.

```javascript
import { put, retry } from 'redux-saga/effects'
import { request } from 'some-api';

function* retrySaga(data) {
  try {
    const SECOND = 1000
    const response = yield retry(3, 10 * SECOND, request, data)
    yield put({ type: 'REQUEST_SUCCESS', payload: response })
  } catch(error) {
    yield put({ type: 'REQUEST_FAIL', payload: { error } })
  }
}
```

#### Notes
`retry` is a high-level API built using `delay` and `call`. [Here is how the helper could be implemented using the low-level Effects](/docs/recipes/#retrying-xhr-calls)

## Effect combinators

### `race(effects)`

Creates an Effect description that instructs the middleware to run a *Race* between
multiple Effects (this is similar to how [`Promise.race([...])`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) behaves).

`effects: Object` - a dictionary Object of the form {label: effect, ...}

#### Example

The following example runs a race between two effects:

1. A call to a function `fetchUsers` which returns a Promise
2. A `CANCEL_FETCH` action which may be eventually dispatched on the Store

```javascript
import { take, call, race } from `redux-saga/effects`
import fetchUsers from './path/to/fetchUsers'

function* fetchUsersSaga() {
  const { response, cancel } = yield race({
    response: call(fetchUsers),
    cancel: take(CANCEL_FETCH)
  })
}
```

If `call(fetchUsers)` resolves (or rejects) first, the result of `race` will be an object
with a single keyed object `{response: result}` where `result` is the resolved result of `fetchUsers`.

If an action of type `CANCEL_FETCH` is dispatched on the Store before `fetchUsers` completes, the result
will be a single keyed object `{cancel: action}`, where action is the dispatched action.

#### Notes

When resolving a `race`, the middleware automatically cancels all the losing Effects.

### `race([...effects]) (with Array)`

The same as [`race(effects)`](#raceeffects) but lets you pass in an array of effects.

#### Example

The following example runs a race between two effects:

1. A call to a function `fetchUsers` which returns a Promise
2. A `CANCEL_FETCH` action which may be eventually dispatched on the Store

```javascript
import { take, call, race } from `redux-saga/effects`
import fetchUsers from './path/to/fetchUsers'

function* fetchUsersSaga() {
  const [response, cancel] = yield race([
    call(fetchUsers),
    take(CANCEL_FETCH)
  ])
}
```

If `call(fetchUsers)` resolves (or rejects) first, `response` will be an result of `fetchUsers` and `cancel` will be `undefined`.

If an action of type `CANCEL_FETCH` is dispatched on the Store before `fetchUsers` completes, `response` will be
`undefined` and `cancel` will be the dispatched action.

### `all([...effects]) - parallel effects`

Creates an Effect description that instructs the middleware to run multiple Effects
in parallel and wait for all of them to complete. It's quite the corresponding API to standard [`Promise#all`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

#### Example

The following example runs two blocking calls in parallel:

```javascript
import { fetchCustomers, fetchProducts } from './path/to/api'
import { all, call } from `redux-saga/effects`

function* mySaga() {
  const [customers, products] = yield all([
    call(fetchCustomers),
    call(fetchProducts)
  ])
}
```

### `all(effects)`

The same as [`all([...effects])`](#alleffects-parallel-effects) but lets you to pass in a dictionary object of effects with labels, just like [`race(effects)`](#raceeffects)

- `effects: Object` - a dictionary Object of the form {label: effect, ...}

#### Example

The following example runs two blocking calls in parallel:

```javascript
import { fetchCustomers, fetchProducts } from './path/to/api'
import { all, call } from `redux-saga/effects`

function* mySaga() {
  const { customers, products } = yield all({
    customers: call(fetchCustomers),
    products: call(fetchProducts)
  })
}
```

#### Notes

When running Effects in parallel, the middleware suspends the Generator until one of the following occurs:

- All the Effects completed with success: resumes the Generator with an array containing the results of all Effects.

- One of the Effects was rejected before all the effects complete: throws the rejection error inside the Generator.

## Interfaces

### Task

The Task interface specifies the result of running a Saga using `fork`, `middleware.run` or `runSaga`.

<table id="task-descriptor">
  <tr>
    <th>method</th>
    <th>return value</th>
  </tr>
  <tr>
    <td>task.isRunning()</td>
    <td>true if the task hasn't yet returned or thrown an error</td>
  </tr>
  <tr>
    <td>task.isCancelled()</td>
    <td>true if the task has been cancelled</td>
  </tr>
  <tr>
    <td>task.result()</td>
    <td>task return value. `undefined` if task is still running</td>
  </tr>
  <tr>
    <td>task.error()</td>
    <td>task thrown error. `undefined` if task is still running</td>
  </tr>
  <tr>
    <td>task.toPromise()</td>
    <td>
      a Promise which is either:
        <ul>
          <li>resolved with task's return value</li>
          <li>rejected with task's thrown error</li>
        </ul>
      </td>
  </tr>
  <tr>
    <td>task.cancel()</td>
    <td>Cancels the task (If it is still running)</td>
  </tr>
</table>

### Channel

A channel is an object used to send and receive messages between tasks. Messages from senders are queued until an interested receiver request a message, and registered receiver is queued until a message is available.

Every channel has an underlying buffer which defines the buffering strategy (fixed size, dropping, sliding)

The Channel interface defines 3 methods: `take`, `put` and `close`

`Channel.take(callback):` used to register a taker. The take is resolved using the following rules

- If the channel has buffered messages, then `callback` will be invoked with the next message from the underlying buffer (using `buffer.take()`)
- If the channel is closed and there are no buffered messages, then `callback` is invoked with `END`
- Otherwise`callback` will be queued until a message is put into the channel

`Channel.put(message):` Used to put message on the buffer. The put will be handled using the following rules

- If the channel is closed, then the put will have no effect.
- If there are pending takers, then invoke the oldest taker with the message.
- Otherwise put the message on the underlying buffer

`Channel.flush(callback):` Used to extract all buffered messages from the channel. The flush is resolved using the following rules

- If the channel is closed and there are no buffered messages, then `callback` is invoked with `END`
- Otherwise `callback` is invoked with all buffered messages.

`Channel.close():` closes the channel which means no more puts will be allowed. All pending takers will be invoked with `END`.

### Buffer

Used to implement the buffering strategy for a channel. The Buffer interface defines 3 methods: `isEmpty`, `put` and `take`

- `isEmpty()`: returns true if there are no messages on the buffer. A channel calls this method whenever a new taker is registered
- `put(message)`: used to put new message in the buffer. Note the Buffer can choose to not store the message
(e.g. a dropping buffer can drop any new message exceeding a given limit)
- `take()` used to retrieve any buffered message. Note the behavior of this method has to be consistent with `isEmpty`

### SagaMonitor

Used by the middleware to dispatch monitoring events. Actually the middleware dispatches 6 events:

- When a root saga is started (via `runSaga` or `sagaMiddleware.run`) the middleware invokes `sagaMonitor.rootSagaStarted`

- When an effect is triggered (via `yield someEffect`) the middleware invokes `sagaMonitor.effectTriggered`

- If the effect is resolved with success the middleware invokes `sagaMonitor.effectResolved`

- If the effect is rejected with an error the middleware invokes `sagaMonitor.effectRejected`

- If the effect is cancelled the middleware invokes `sagaMonitor.effectCancelled`

- Finally, the middleware invokes `sagaMonitor.actionDispatched` when a Redux action is dispatched.

Below the signature for each method

- `sagaMonitor.rootSagaStarted(options)` : where options is an object with the following fields

  - `effectId` : Number - Unique ID assigned to this root saga execution

  - `saga` : Function - The generator function that starts to run

  - `args` : Array - The arguments passed to the generator function

- `effectTriggered(options)`

  - `effectId` : Number - Unique ID assigned to the yielded effect

  - `parentEffectId` : Number - ID of the parent Effect. In the case of a `race` or `parallel` effect, all
  effects yielded inside will have the direct race/parallel effect as a parent. In case of a top-level effect, the
  parent will be the containing Saga

  - `label` : String - In case of a `race`/`all` effect, all child effects will be assigned as label the corresponding
  keys of the object passed to `race`/`all`

  - `effect` : Object - the yielded effect itself

- `effectResolved(effectId, result)`

    - `effectId` : Number - The ID of the yielded effect

    - `result` : any - The result of the successful resolution of the effect. In case of `fork` or `spawn` effects,
    the result will be a `Task` object.

- `effectRejected(effectId, error)`

    - `effectId` : Number - The ID of the yielded effect

    - `error` : any - Error raised with the rejection of the effect

- `effectCancelled(effectId)`

    - `effectId` : Number - The ID of the yielded effect

- `actionDispatched(action)`

    - `action` : Object - The dispatched Redux action. If the action was dispatched by a Saga
    then the action will have a property `SAGA_ACTION` set to true (`SAGA_ACTION` can be imported from
    `@redux-saga/symbols`).


## External API
------------------------

### `runSaga(options, saga, ...args)`

Allows starting sagas outside the Redux middleware environment. Useful if you want to
connect a Saga to external input/output, other than store actions.

`runSaga` returns a Task object. Just like the one returned from a `fork` effect.

- `options: Object` - currently supported options are:
  - `channel` - see docs for [`channel`](#channel) (preferably you should use `stdChannel` here)

  - `dispatch(output): Function` - used to fulfill `put` effects.
    - `output: any` -  argument provided by the Saga to the `put` Effect (see Notes below).

  - `getState(): Function` - used to fulfill `select` and `getState` effects

  - `sagaMonitor` : [SagaMonitor](#sagamonitor) - see docs for [`createSagaMiddleware(options)`](#createsagamiddlewareoptions)

  - `onError: Function` - see docs for [`createSagaMiddleware(options)`](#createsagamiddlewareoptions)

  - `context` : {} - see docs for [`createSagaMiddleware(options)`](#createsagamiddlewareoptions)
  - `effectMiddlewares` : Function[] - see docs for [`createSagaMiddleware(options)`](#createsagamiddlewareoptions)

- `saga: Function` - a Generator function

- `args: Array<any>` - arguments to be provided to `saga`

#### Notes

The `{channel, dispatch}` is used to fulfill `take` and `put` Effects. This defines the Input/Output
interface of the Saga.

`channel` is used to fulfill `take(PATTERN)` effects. Every time something gets put on the channel it's
notifying all pending internal listeners. If the Saga is blocked on a `take` effect, and
if the take pattern matches the currently incoming input, the Saga is resumed with that input.

`dispatch` is used to fulfill `put` effects. Each time the Saga emits a `yield put(output)`, `dispatch`
is invoked with output.

An example how to use this API may be found [here](advanced/UsingRunSaga.md).

## Utils

### `channel([buffer])`

A factory method that can be used to create Channels. You can optionally pass it a buffer
to control how the channel buffers the messages.

By default, if no buffer is provided, the channel will queue incoming messages up to 10 until interested takers are registered. The default buffering will deliver message using a FIFO strategy: a new taker will be delivered the oldest message in the buffer.

### `eventChannel(subscribe, [buffer])`

Creates channel that will subscribe to an event source using the `subscribe` method. Incoming events from the event source will be queued in the channel until interested takers are registered.

- `subscribe: Function` used to subscribe to the underlying event source. The function must return an unsubscribe function to terminate the subscription.

- `buffer: Buffer` optional Buffer object to buffer messages on this channel. If not provided, messages will not be buffered
on this channel.

To notify the channel that the event source has terminated, you can notify the provided subscriber with an `END`

#### Example

In the following example we create an event channel that will subscribe to a `setInterval`

```javascript
const countdown = (secs) => {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        console.log('countdown', secs)
        secs -= 1
        if (secs > 0) {
          emitter(secs)
        } else {
          emitter(END)
          clearInterval(iv)
          console.log('countdown terminated')
        }
      }, 1000);
      return () => {
        clearInterval(iv)
        console.log('countdown cancelled')
      }
    }
  )
}
```

### `buffers`

Provides some common buffers

- `buffers.none()`: no buffering, new messages will be lost if there are no pending takers

- `buffers.fixed(limit)`: new messages will be buffered up to `limit`. Overflow will raise an Error. Omitting a `limit` value will result in a limit of 10.

- `buffers.expanding(initialSize)`: like `fixed` but Overflow will cause the buffer to expand dynamically.

- `buffers.dropping(limit)`: same as `fixed` but Overflow will silently drop the messages.

- `buffers.sliding(limit)`: same as `fixed` but Overflow will insert the new message at the end and drop the oldest message in the buffer.


### `cloneableGenerator(generatorFunc)`

Takes a generator function (function*) and returns a generator function.
All generators instanciated from this function will be cloneable.
For testing purpose only.

#### Example

This is useful when you want to test a different branch of a saga without having to replay the actions that lead to it.

```javascript
import { cloneableGenerator } from '@redux-saga/testing-utils';

function* oddOrEven() {
  // some stuff are done here
  yield 1;
  yield 2;
  yield 3;

  const userInput = yield 'enter a number';
  if (userInput % 2 === 0) {
    yield 'even';
  } else {
    yield 'odd'
  }
}

test('my oddOrEven saga', assert => {
  const data = {};
  data.gen = cloneableGenerator(oddOrEven)();

  assert.equal(
    data.gen.next().value,
    1,
    'it should yield 1'
  );

  assert.equal(
    data.gen.next().value,
    2,
    'it should yield 2'
  );

  assert.equal(
    data.gen.next().value,
    3,
    'it should yield 3'
  );

  assert.equal(
    data.gen.next().value,
    'enter a number',
    'it should ask for a number'
  );

  assert.test('even number is given', a => {
    // we make a clone of the generator before giving the number;
    data.clone = data.gen.clone();

    a.equal(
      data.gen.next(2).value,
      'even',
      'it should yield "even"'
    );

    a.equal(
      data.gen.next().done,
      true,
      'it should be done'
    );

    a.end();
  });

  assert.test('odd number is given', a => {

    a.equal(
      data.clone.next(1).value,
      'odd',
      'it should yield "odd"'
    );

    a.equal(
      data.clone.next().done,
      true,
      'it should be done'
    );

    a.end();
  });

  assert.end();
});

```
### `createMockTask()`

Returns an object that mocks a task.
For testing purposes only.
[See Task Cancellation docs for more information.](advanced/TaskCancellation.md#testing-generators-with-fork-effect)
)

## Cheatsheets

### Blocking / Non-blocking

| Name                 | Blocking                                                    |
| -------------------- | ------------------------------------------------------------|
| takeEvery            | No                                                          |
| takeLatest           | No                                                          |
| takeLeading          | No                                                          |
| throttle             | No                                                          |
| debounce             | No                                                          |
| retry                | Yes                                                         |
| take                 | Yes                                                         |
| take(channel)        | Sometimes (see API reference)                               |
| takeMaybe            | Yes                                                         |
| put                  | No                                                          |
| putResolve           | Yes                                                         |
| put(channel, action) | No                                                          |
| call                 | Yes                                                         |
| apply                | Yes                                                         |
| cps                  | Yes                                                         |
| fork                 | No                                                          |
| spawn                | No                                                          |
| join                 | Yes                                                         |
| cancel               | No                                                          |
| select               | No                                                          |
| actionChannel        | No                                                          |
| flush                | Yes                                                         |
| cancelled            | Yes                                                         |
| race                 | Yes                                                         |
| delay                | Yes                                                         |
| all                  | Blocks if there is a blocking effect in the array or object |