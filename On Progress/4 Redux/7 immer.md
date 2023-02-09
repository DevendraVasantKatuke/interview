# Immer

Winner of the "Breakthrough of the year" [React open source award](https://osawards.com/react/) and "Most impactful contribution" [JavaScript open source award](https://osawards.com/javascript/) in 2019.

- Introduction blogpost: [Immer: Immutability the easy way](https://medium.com/@mweststrate/introducing-immer-immutability-the-easy-way-9d73d8f71cb3)
- Short Egghead.io lesson covering the Immer essentials: [Simplify creating immutable data trees with Immer (7m)](https://egghead.io/lessons/redux-simplify-creating-immutable-data-trees-with-immer)
- Free in-depth Egghead.io course: [Immutable JavaScript Data Structures with Immer (58m)](https://egghead.io/courses/immutable-javascript-data-structures-with-immer)

---

Immer (German for: always) is a tiny package that allows you to work with immutable state in a more convenient way.

### Immer simplifies handling immutable data structures

Immer can be used in any context in which immutable data structures need to be used. For example in combination with React state, React or Redux reducers, or configuration management. Immutable data structures allow for (efficient) change detection: if the reference to an object didn't change, the object itself did not change. In addition, it makes cloning relatively cheap: Unchanged parts of a data tree don't need to be copied and are shared in memory with older versions of the same state.

Generally speaking, these benefits can be achieved by making sure you never change any property of an object, array or map, but by always creating an altered copy instead. In practice this can result in code that is quite cumbersome to write, and it is easy to accidentally violate those constraints. Immer will help you to follow the immutable data paradigm by addressing these pain points:

1. Immer will detect accidental mutations and throw an error.
2. Immer will remove the need for the typical boilerplate code that is needed when creating deep updates to immutable objects: Without Immer, object copies need to be made by hand at every level. Typically by using a lot of `...` spread operations. When using Immer, changes are made to a `draft` object, that records the changes and takes care of creating the necessary copies, without ever affecting the original object.
3. When using Immer, you don't need to learn dedicated APIs or data structures to benefit from the paradigm. With Immer you'll use plain JavaScript data structures, and use the well-known mutable JavaScript APIs, but safely.

### A quick example for comparison

```javascript
const baseState = [
	{
		title: "Learn TypeScript",
		done: true
	},
	{
		title: "Try Immer",
		done: false
	}
]
```

Imagine we have the above base state, and we'll need to update the second todo, and add a third one. However, we don't want to mutate the original `baseState`, and we want to avoid deep cloning as well (to preserve the first todo).

#### Without Immer

Without Immer, we'll have to carefully shallow copy every level of the state structure that is affected by our change:

```javascript
const nextState = baseState.slice() // shallow clone the array
nextState[1] = {
	// replace element 1...
	...nextState[1], // with a shallow clone of element 1
	done: true // ...combined with the desired update
}
// since nextState was freshly cloned, using push is safe here,
// but doing the same thing at any arbitrary time in the future would
// violate the immutability principles and introduce a bug!
nextState.push({title: "Tweet about it"})
```

#### With Immer

With Immer, this process is more straightforward. We can leverage the `produce` function, which takes as first argument the state we want to start from, and as second argument we pass a function, called the _recipe_, that is passed a `draft` to which we can apply straightforward mutations. Those mutations are recorded and used to produce the next state once the recipe is done. `produce` will take care of all the necessary copying, and protect against future accidental modifications as well by freezing the data.

```javascript
import produce from "immer"

const nextState = produce(baseState, draft => {
	draft[1].done = true
	draft.push({title: "Tweet about it"})
})
```

Looking for Immer in combination with React? Feel free to skip ahead to the [React + Immer](example-setstate) page.

### How Immer works

The basic idea is that with Immer you will apply all your changes to a temporary _draft_, which is a proxy of the _currentState_. Once all your mutations are completed, Immer will produce the _nextState_ based on the mutations to the draft state. This means that you can interact with your data by simply modifying it while keeping all the benefits of immutable data.

![immer-hd.png](https://immerjs.github.io/immer/assets/images/immer-4002b3fd2cfd3aa66c62ecc525663c0d.png)

Using Immer is like having a personal assistant. The assistant takes a letter (the current state) and gives you a copy (draft) to jot changes onto. Once you are done, the assistant will take your draft and produce the real immutable, final letter for you (the next state).

Head to the [next section](./produce.mdx) to further dive into `produce`.

## Benefits

- Follow the immutable data paradigm, while using normal JavaScript objects, arrays, Sets and Maps. No new APIs or "mutation patterns" to learn!
- Strongly typed, no string based paths selectors etc.
- Structural sharing out of the box
- Object freezing out of the box
- Deep updates are a breeze
- Boilerplate reduction. Less noise, more concise code.
- First class support for JSON patches
- Small: 3KB gzipped

# installation

Immer can be installed as a direct dependency, and will work in any ES5 environment:

- Yarn: `yarn add immer`
- NPM: `npm install immer`
- CDN: Exposed global is `immer`
  - Unpkg: `<script src="https://unpkg.com/immer"></script>`
  - JSDelivr: `<script src="https://cdn.jsdelivr.net/npm/immer"></script>`
  - ⚠️ When using a CDN, it is best to check the url in your browser and see what version it resolves to, so that your users aren't accidentally served a newer version in the future when updates are release. So use an url like: https://unpkg.com/immer@6.0.3/dist/immer.umd.production.min.js instead. Substitute `production.min` with `development` in the URL for a development build.

## Pick your Immer version

_This section only applies to version 6 and later_

To make sure Immer is as small as possible, features that are not required by every project has been made opt-in, and have to be enabled explicitly. This ensures that when bundling your application for production, unused features don't take any space.

The following features can be opt-in to:

| Feature | Description | Method to call |
| --- | --- | --- |
| ES 5 support | If your application needs to be able to run on older JavaScript environments, such as Internet Explorer or React Native, enable this feature. | `enableES5()` |
| [ES2015 Map and Set support](./complex-objects.md) | To enable Immer to operate on the native `Map` and `Set` collections, enable this feature | `enableMapSet()` |
| [JSON Patch support](./patches.mdx) | Immer can keep track of all the changes you make to draft objects. This can be useful for communicating changes using JSON patches | `enablePatches()` |
| **All of the above** | Unsure what features you need? We recommend to enable all of the features above by default on new projects. Premature optimization of a few KB might not be worth the initial trouble. Also, enabling or disabling features doesn't impact the performance of Immer itself | `enableAllPlugins()` |

For example, if you want to use `produce` on a `Map`, you need to enable this feature once during the start of your application:

```typescript
// In your application's entrypoint
import {enableMapSet} from "immer"

enableMapSet()

// ...later
import produce from "immer"

const usersById_v1 = new Map([
	["michel", {name: "Michel Weststrate", country: "NL"}]
])

const usersById_v2 = produce(usersById_v1, draft => {
	draft.get("michel").country = "UK"
})

expect(usersById_v1.get("michel").country).toBe("NL")
expect(usersById_v2.get("michel").country).toBe("UK")
```

Vanilla Immer kicks in at ~3KB gzipped. Every plugin that is enabled adds < 1 KB to that. The breakdown is as follows:

```
Import size report for immer:
┌───────────────────────┬───────────┬────────────┬───────────┐
│        (index)        │ just this │ cumulative │ increment │
├───────────────────────┼───────────┼────────────┼───────────┤
│ import * from 'immer' │   5662    │     0      │     0     │
│        produce        │   3100    │    3100    │     0     │
│       enableES5       │   3761    │    3770    │    670    │
│     enableMapSet      │   3885    │    4527    │    757    │
│     enablePatches     │   3891    │    5301    │    774    │
│   enableAllPlugins    │   5297    │    5348    │    47     │
└───────────────────────┴───────────┴────────────┴───────────┘
(this report was generated by npmjs.com/package/import-size)
```

## Immer on older JavaScript environments?

By default `produce` tries to use proxies for optimal performance. However, on older JavaScript engines `Proxy` is not available. For example, when running Microsoft Internet Explorer or React Native (if < v0.59 or when using the Hermes engine on React Native < 0.64) on Android. In such cases, Immer will fallback to an ES5 compatible implementation which works identically, but is a bit slower.

Since version 6, support for the fallback implementation has to be explicitly enabled by calling `enableES5()`.

# Using produce

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center> <details>
	<summary className="egghead-summary">
		egghead.io lesson 3: Simplifying deep updates with _produce_
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/javascript-simplify-deep-state-updates-using-immer-produce/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/javascript-simplify-deep-state-updates-using-immer-produce"
	>
		Hosted on egghead.io
	</a>
</details>

The Immer package exposes a default function that does all the work.

`produce(baseState, recipe: (draftState) => void): nextState`

`produce` takes a base state, and a _recipe_ that can be used to perform all the desired mutations on the `draft` that is passed in. The interesting thing about Immer is that the `baseState` will be untouched, but the `nextState` will reflect all changes made to `draftState`.

Inside the recipe, all standard JavaScript APIs can be used on the `draft` object, including field assignments, `delete` operations, and mutating array, Map and Set operations like `push`, `pop`, `splice`, `set`, `sort`, `remove`, etc.

Any of those mutations don't have to happen at the root, but it is allowed to modify anything anywhere deep inside the draft: `draft.todos[0].tags["urgent"].author.age = 56`

Note that the recipe function itself normally doesn't return anything. However, it is possible to return in case you want to replace the `draft` object in its entirety with another object, for more details see [returning new data](./return.mdx).

## Example

```javascript
import produce from "immer"

const baseState = [
	{
		title: "Learn TypeScript",
		done: true
	},
	{
		title: "Try Immer",
		done: false
	}
]

const nextState = produce(baseState, draftState => {
	draftState.push({title: "Tweet about it"})
	draftState[1].done = true
})
```

```javascript
// the new item is only added to the next state,
// base state is unmodified
expect(baseState.length).toBe(2)
expect(nextState.length).toBe(3)

// same for the changed 'done' prop
expect(baseState[1].done).toBe(false)
expect(nextState[1].done).toBe(true)

// unchanged data is structurally shared
expect(nextState[0]).toBe(baseState[0])
// ...but changed data isn't.
expect(nextState[1]).not.toBe(baseState[1])
```

### Terminology

- `(base)state`, the immutable state passed to `produce`
- `recipe`: the second argument of `produce`, that captures how the base state should be "mutated".
- `draft`: the first argument of any `recipe`, which is a proxy to the original base state that can be safely mutated.
- `producer`. A function that uses `produce` and is generally of the form `(baseState, ...arguments) => resultState`

Note that it isn't strictly necessary to name the first argument of the recipe `draft`. You can name it anything you want, for example `users`. Using `draft` as a name is just a convention to signal: "mutation is OK here".

# Curried producers

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center>
<details>
	<summary className="egghead-summary">
		egghead.io lesson 6: Simplify code by using curried _reduce_
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/javascript-simplify-immer-producer-functions-using-currying/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/javascript-simplify-immer-producer-functions-using-currying"
	>
		Hosted on egghead.io
	</a>
</details>

Passing a function as the first argument to `produce` creates a function that doesn't apply `produce` yet to a specific state, but rather creates a function that will apply `produce` to any state that is passed to it in the future. This generally is called _currying_. Take for example the following example:

```javascript
import produce from "immer"

function toggleTodo(state, id) {
	return produce(state, draft => {
		const todo = draft.find(todo => todo.id === id)
		todo.done = !todo.done
	})
}

const baseState = [
	{
		id: "JavaScript",
		title: "Learn TypeScript",
		done: true
	},
	{
		id: "Immer",
		title: "Try Immer",
		done: false
	}
]

const nextState = toggleTodo(baseState, "Immer")
```

The above pattern of `toggleTodo` is quite typical; pass an existing state to `produce`, modify the `draft`, and then return the result. Since `state` isn't used for anything else than passing it on to `produce`, the above example can be simplified by using the _curried_ form of `produce`, where you pass `produce` only the recipe function, and `produce` will return a new function that will apply recipe to the base state. This allows us to shorten the above `toggleTodo` definition.

```javascript
import produce from "immer"

// curried producer:
const toggleTodo = produce((draft, id) => {
	const todo = draft.find(todo => todo.id === id)
	todo.done = !todo.done
})

const baseState = [
	/* as is */
]

const nextState = toggleTodo(baseState, "Immer")
```

Note that the `id` param has now become part of the recipe function! This pattern of having curried producers combines really neatly with for example the `useState` hook from React, as we will see on the next page.

# React & Immer

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center>
<details>
	<summary className="egghead-summary">
		egghead.io lesson 8: Using Immer with _useState_. Or: _useImmer_
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-immutable-update-state-inside-react-components-with-useimmer/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-immutable-update-state-inside-react-components-with-useimmer"
	>
		Hosted on egghead.io
	</a>
</details>

## useState + Immer

The `useState` hook assumes any state that is stored inside it is treated as immutable. Deep updates in the state of React components can be greatly simplified as by using Immer. The following example shows how to use `produce` in combination with `useState`, and can be tried on [CodeSandbox](https://codesandbox.io/s/immer-usestate-ujkgg?file=/src/index.js).

```javascript
import React, { useCallback, useState } from "react";
import produce from "immer";

const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      id: "React",
      title: "Learn React",
      done: true
    },
    {
      id: "Immer",
      title: "Try Immer",
      done: false
    }
  ]);

  const handleToggle = useCallback((id) => {
    setTodos(
      produce((draft) => {
        const todo = draft.find((todo) => todo.id === id);
        todo.done = !todo.done;
      })
    );
  }, []);

  const handleAdd = useCallback(() => {
    setTodos(
      produce((draft) => {
        draft.push({
          id: "todo_" + Math.random(),
          title: "A new todo",
          done: false
        });
      })
    );
  }, []);

  return (<div>{*/ See CodeSandbox */}</div>)
}
```

## useImmer

Since all state updaters follow the same pattern where the update function is wrapped in `produce`, it is also possible to simplify the above by leveraging the [use-immer](https://www.npmjs.com/package/use-immer) package that will wrap updater functions in `produce` automatically:

```javascript
import React, { useCallback } from "react";
import { useImmer } from "use-immer";

const TodoList = () => {
  const [todos, setTodos] = useImmer([
    {
      id: "React",
      title: "Learn React",
      done: true
    },
    {
      id: "Immer",
      title: "Try Immer",
      done: false
    }
  ]);

  const handleToggle = useCallback((id) => {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id);
      todo.done = !todo.done;
    });
  }, []);

  const handleAdd = useCallback(() => {
    setTodos((draft) => {
      draft.push({
        id: "todo_" + Math.random(),
        title: "A new todo",
        done: false
      });
    });
  }, []);

  // etc
```

For the full demo see [CodeSandbox](https://codesandbox.io/s/use-immer-bvd5v?file=/src/index.js).

## useReducer + Immer

Similarly to `useState`, `useReducer` combines neatly with Immer as well, as demonstrated in this [CodeSandbox](https://codesandbox.io/s/immer-usereducer-bqpzn?file=/src/index.js:0-1018):

```javascript
import React, {useCallback, useReducer} from "react"
import produce from "immer"

const TodoList = () => {
	const [todos, dispatch] = useReducer(
		produce((draft, action) => {
			switch (action.type) {
				case "toggle":
					const todo = draft.find(todo => todo.id === action.id)
					todo.done = !todo.done
					break
				case "add":
					draft.push({
						id: action.id,
						title: "A new todo",
						done: false
					})
					break
				default:
					break
			}
		}),
		[
			/* initial todos */
		]
	)

	const handleToggle = useCallback(id => {
		dispatch({
			type: "toggle",
			id
		})
	}, [])

	const handleAdd = useCallback(() => {
		dispatch({
			type: "add",
			id: "todo_" + Math.random()
		})
	}, [])

	// etc
}
```

## useImmerReducer

...which again, can be slightly shorted by `useImmerReducer` from the `use-immer` package ([demo](https://codesandbox.io/s/useimmerreducer-sycpb?file=/src/index.js)):

```javascript
import React, { useCallback } from "react";
import { useImmerReducer } from "use-immer";

const TodoList = () => {
  const [todos, dispatch] = useImmerReducer(
    (draft, action) => {
      switch (action.type) {
        case "toggle":
          const todo = draft.find((todo) => todo.id === action.id);
          todo.done = !todo.done;
          break;
        case "add":
          draft.push({
            id: action.id,
            title: "A new todo",
            done: false
          });
          break;
        default:
          break;
      }
    },
    [ /* initial todos */ ]
  );

  //etc

```

## Redux + Immer

Redux + Immer is extensively covered in the documentation of [Redux Toolkit](https://redux-toolkit.js.org/usage/immer-reducers). For Redux without Redux Toolkit, the same trick as applied to `useReducer` above can be applied: wrap the reducer function with `produce`, and you can safely mutate the draft!

For example:

```javascript
import produce from "immer"

// Reducer with initial state
const INITIAL_STATE = [
	/* bunch of todos */
]

const todosReducer = produce((draft, action) => {
	switch (action.type) {
		case "toggle":
			const todo = draft.find(todo => todo.id === action.id)
			todo.done = !todo.done
			break
		case "add":
			draft.push({
				id: action.id,
				title: "A new todo",
				done: false
			})
			break
		default:
			break
	}
})
```

# Update patterns

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

Working with immutable data, before Immer, used to mean learning all the immutable update patterns.

To help 'unlearning' those patterns here is an overview how you can leverage the built-in JavaScript APIs to update objects and collections:

### Object mutations

```javascript
import produce from "immer"

const todosObj = {
	id1: {done: false, body: "Take out the trash"},
	id2: {done: false, body: "Check Email"}
}

// add
const addedTodosObj = produce(todosObj, draft => {
	draft["id3"] = {done: false, body: "Buy bananas"}
})

// delete
const deletedTodosObj = produce(todosObj, draft => {
	delete draft["id1"]
})

// update
const updatedTodosObj = produce(todosObj, draft => {
	draft["id1"].done = true
})
```

### Array mutations

```javascript
import produce from "immer"

const todosArray = [
	{id: "id1", done: false, body: "Take out the trash"},
	{id: "id2", done: false, body: "Check Email"}
]

// add
const addedTodosArray = produce(todosArray, draft => {
	draft.push({id: "id3", done: false, body: "Buy bananas"})
})

// delete by index
const deletedTodosArray = produce(todosArray, draft => {
	draft.splice(3 /*the index */, 1)
})

// update by index
const updatedTodosArray = produce(todosArray, draft => {
	draft[3].done = true
})

// insert at index
const updatedTodosArray = produce(todosArray, draft => {
	draft.splice(3, 0, {id: "id3", done: false, body: "Buy bananas"})
})

// remove last item
const updatedTodosArray = produce(todosArray, draft => {
	draft.pop()
})

// remove first item
const updatedTodosArray = produce(todosArray, draft => {
	draft.shift()
})

// add item at the beginning of the array
const addedTodosArray = produce(todosArray, draft => {
	draft.unshift({id: "id3", done: false, body: "Buy bananas"})
})

// delete by id
const deletedTodosArray = produce(todosArray, draft => {
	const index = draft.findIndex(todo => todo.id === "id1")
	if (index !== -1) draft.splice(index, 1)
})

// update by id
const updatedTodosArray = produce(todosArray, draft => {
	const index = draft.findIndex(todo => todo.id === "id1")
	if (index !== -1) draft[index].done = true
})

// filtering items
const updatedTodosArray = produce(todosArray, draft => {
	// creating a new state is simpler in this example
	// (note that we don't need produce in this case,
	// but as shown below, if the filter is not on the top
	// level produce is still pretty useful)
	return draft.filter(todo => todo.done)
})
```

### Nested data structures

```javascript
import produce from "immer"

// example complex data structure
const store = {
	users: new Map([
		[
			"17",
			{
				name: "Michel",
				todos: [
					{
						title: "Get coffee",
						done: false
					}
				]
			}
		]
	])
}

// updating something deeply in-an-object-in-an-array-in-a-map-in-an-object:
const nextStore = produce(store, draft => {
	draft.users.get("17").todos[0].done = true
})

// filtering out all unfinished todo's
const nextStore = produce(store, draft => {
	const user = draft.users.get("17")
	// when filtering, creating a fresh collection is simpler than
	// removing irrelevant items
	user.todos = user.todos.filter(todo => todo.done)
})
```

Note that many array operations can be used to insert multiple items at once by passing multiple arguments or using the spread operation: `todos.unshift(...items)`.

Note that when working with arrays that contain objects that are typically identified by some id, we recommend to use `Map` or index based objects (as shown above) instead of performing frequent find operations, lookup tables perform much better in general.

# API 

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

| Exported name | Description | Section |
| --- | --- | --- |
| `(default)` | The core API of Immer, typically named `produce`: `import produce from "immer"` | [Produce](./produce.mdx) |
| `applyPatches` | Given a base state or draft, and a set of patches, applies the patches | [Patches](./patches.mdx) |
| `castDraft` | Converts any immutable type to its mutable counterpart. This is just a cast and doesn't actually do anything. | [TypeScript](./typescript.mdx) |
| `castImmutable` | Converts any mutable type to its immutable counterpart. This is just a cast and doesn't actually do anything. | [TypeScript](./typescript.mdx) |
| `createDraft` | Given a base state, creates a mutable draft for which any modifications will be recorded | [Async](./async.mdx) |
| `current` | Given a draft object (doesn't have to be a tree root), takes a snapshot of the current state of the draft | [Current](./current.md) |
| `Draft<T>` | Exposed TypeScript type to convert an immutable type to a mutable type | [TypeScript](./typescript.mdx) |
| `enableAllPlugins()` | Enables all plugins mentioned below | [Installation](./installation.mdx#pick-your-immer-version) |
| `enableES5()` | Enables support for older JavaScript engines, such as Internet Explorer and React Native | [Installation](./installation.mdx#pick-your-immer-version) |
| `enableMapSet()` | Enables support for `Map` and `Set` collections. | [Installation](./installation.mdx#pick-your-immer-version) |
| `enablePatches()` | Enables support for JSON patches. | [Installation](./installation#pick-your-immer-version) |
| `finishDraft` | Given an draft created using `createDraft`, seals the draft and produces and returns the next immutable state that captures all the changes | [Async](./async.mdx) |
| `freeze(obj, deep?)` | Freezes draftable objects. Returns the original object. By default freezes shallowly, but if the second argument is `true` it will freeze recursively. |
| `Immer` | constructor that can be used to create a second "immer" instance (exposing all APIs listed in this instance), that doesn't share its settings with global instance. |
| `immerable` | Symbol that can be added to a constructor or prototype, to indicate that Immer should treat the class as something that can be safely drafted | [Classes](./complex-objects.md) |
| `Immutable<T>` | Exposed TypeScript type to convert mutable types to immutable types |  |
| `isDraft` | Returns true if the given object is a draft object |  |
| `isDraftable` | Returns true if Immer is capable of turning this object into a draft. Which is true for: arrays, objects without prototype, objects with `Object` as their prototype, objects that have the `immerable` symbol on their constructor or prototype |  |
| `nothing` | Value that can be returned from a recipe, to indicate that the value `undefined` should be produced | [Return](./return.mdx) |
| `original` | Given a draft object (doesn't have to be a tree root), returns the original object at the same path in the original state tree, if present | [Original](./original.md) |
| `Patch` | Exposed TypeScript type, describes the shape of an (inverse) patch object | [Patches](./patches.mdx) |
| `produce` | The core API of Immer, also exposed as the `default` export | [Produce](./produce.mdx) |
| `produceWithPatches` | Works the same as `produce`, but instead of just returning the produced object, it returns a tuple, consisting of `[result, patches, inversePatches]`. | [Patches](./patches.mdx) |
| `setAutoFreeze` | Enables / disables automatic freezing of the trees produces. By default enabled. | [Freezing](./freezing.mdx) |
| `setUseProxies` | Can be used to disable or force the use of `Proxy` objects. Useful when filing bug reports. |  |

## Importing immer

`produce` is exposed as the default export, but optionally it can be used as name import as well, as this benefits some older project setups. So the following imports are all correct, where the first is recommended:

```javascript
import produce from "immer"
import {produce} from "immer"

const {produce} = require("immer")
const produce = require("immer").produce
const produce = require("immer").default

import unleashTheMagic from "immer"
import {produce as unleashTheMagic} from "immer"
```

# Map and Set

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

_⚠ Since version 6 support for `Map`s and `Set`s has to be enabled explicitly by calling [`enableMapSet()`](./installation.mdx#pick-your-immer-version) once when starting your application._

Plain objects, arrays, `Map`s and `Set`s are always drafted by Immer. An example of using Maps with immer:

```javascript
test("Producers can update Maps", () => {
	const usersById_v1 = new Map()

	const usersById_v2 = produce(usersById_v1, draft => {
		// Modifying a map results in a new map
		draft.set("michel", {name: "Michel Weststrate", country: "NL"})
	})

	const usersById_v3 = produce(usersById_v2, draft => {
		// Making a change deep inside a map, results in a new map as well!
		draft.get("michel").country = "UK"
	})

	// We got a new map each time!
	expect(usersById_v2).not.toBe(usersById_v1)
	expect(usersById_v3).not.toBe(usersById_v2)
	// With different content obviously
	expect(usersById_v1).toMatchInlineSnapshot(`Map {}`)
	expect(usersById_v2).toMatchInlineSnapshot(`
		Map {
		  "michel" => Object {
		    "country": "NL",
		    "name": "Michel Weststrate",
		  },
		}
	`)
	expect(usersById_v3).toMatchInlineSnapshot(`
		Map {
		  "michel" => Object {
		    "country": "UK",
		    "name": "Michel Weststrate",
		  },
		}
	`)
	// The old one was never modified
	expect(usersById_v1.size).toBe(0)
	// And trying to change a Map outside a producers is going to: NO!
	expect(() => usersById_v3.clear()).toThrowErrorMatchingInlineSnapshot(
		`"This object has been frozen and should not be mutated"`
	)
})
```

Maps and Sets that are produced by Immer will be made artificially immutable. This means that they will throw an exception when trying mutative methods like `set`, `clear` etc. outside a producer.

_Note: The **keys** of a map are never drafted! This is done to avoid confusing semantics and keep keys always referentially equal_

# Classes

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

Plain objects (objects without a prototype), arrays, `Map`s and `Set`s are always drafted by Immer. Every other object must use the `immerable` symbol to mark itself as compatible with Immer. When one of these objects is mutated within a producer, its prototype is preserved between copies.

```js
import {immerable} from "immer"

class Foo {
	[immerable] = true // Option 1

	constructor() {
		this[immerable] = true // Option 2
	}
}

Foo[immerable] = true // Option 3
```

### Example

```js
import {immerable, produce} from "immer"

class Clock {
	[immerable] = true

	constructor(hour, minute) {
		this.hour = hour
		this.minute = minute
	}

	get time() {
		return `${this.hour}:${this.minute}`
	}

	tick() {
		return produce(this, draft => {
			draft.minute++
		})
	}
}

const clock1 = new Clock(12, 10)
const clock2 = clock1.tick()
console.log(clock1.time) // 12:10
console.log(clock2.time) // 12:11
console.log(clock2 instanceof Clock) // true
```

### Semantics in detail

The semantics on how classes are drafted are as follows:

1. A draft of a class is a fresh object but with the same prototype as the original object.
2. When creating a draft, Immer will copy all _own_ properties from the base to the draft.This includes non-enumerable and symbolic properties.
3. _Own_ getters will be invoked during the copy process, just like `Object.assign` would.
4. Inherited getters and methods will remain as is and be inherited by the draft.
5. Immer will not invoke constructor functions.
6. The final instance will be constructed with the same mechanism as the draft was created.
7. Only getters that have a setter as well will be writable in the draft, as otherwise the value can't be copied back.

Because Immer will dereference own getters of objects into normal properties, it is possible to use objects that use getter/setter traps on their fields, like MobX and Vue do.

Immer does not support exotic / engine native objects such as DOM Nodes or Buffers, nor is subclassing Map, Set or arrays supported and the `immerable` symbol can't be used on them.

So when working for example with `Date` objects, you should always create a new `Date` instance instead of mutating an existing `Date` object.

# Extracting the current state from a draft

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

Immer exposes a named export `current` that creates a copy of the current state of the draft. This can be very useful for debugging purposes (as those objects won't be Proxy objects and not be logged as such). Also, references to `current` can be safely leaked from a produce function. Put differently, `current` provides a snapshot of the current state of a draft.

Objects generated by `current` work similar to the objects created by produce itself.

1. Unmodified objects will be structurally shared with the original objects.
1. If no changes are made to a draft, generally it holds that `original(draft) === current(draft)`, but this is not guaranteed.
1. Future changes to the draft won't be reflected in the object produced by `current` (except for references to undraftable objects)
1. Unlike `produce` objects created by `current` will _not_ be frozen.

Use `current` sparingly, it can be a potentially expensive operation, especially when using ES5.

Note that `current` cannot be invoked on objects that aren't drafts.

### Example

The following example shows the effect of `current` (and `original`):

```js
const base = {
	x: 0
}

const next = produce(base, draft => {
	draft.x++
	const orig = original(draft)
	const copy = current(draft)
	console.log(orig.x)
	console.log(copy.x)

	setTimeout(() => {
		// this will execute after the produce has finised!
		console.log(orig.x)
		console.log(copy.x)
	}, 100)

	draft.x++
	console.log(draft.x)
})
console.log(next.x)

// This will print
// 0 (orig.x)
// 1 (copy.x)
// 2 (draft.x)
// 2 (next.x)
// 0 (after timeout, orig.x)
// 1 (after timeout, copy.x)
```

# Extracting the original state from a draft

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

Immer exposes a named export `original` that will get the original object from the proxied instance inside `produce` (or return `undefined` for unproxied values). A good example of when this can be useful is when searching for nodes in a tree-like state using strict equality.

```js
import {original, produce} from "immer"

const baseState = {users: [{name: "Richie"}]}
const nextState = produce(baseState, draftState => {
	original(draftState.users) // is === baseState.users
})
```

Just want to know if a value is a proxied instance? Use the `isDraft` function! Note that `original` cannot be invoked on objects that aren't drafts.

```js
import {isDraft, produce} from "immer"

const baseState = {users: [{name: "Bobby"}]}
const nextState = produce(baseState, draft => {
	isDraft(draft) // => true
	isDraft(draft.users) // => true
	isDraft(draft.users[0]) // => true
})
isDraft(nextState) // => false
```

# Patches

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center>
<details>
	<summary className="egghead-summary">
		egghead.io lesson 14: Capture patches using _produceWithPatches_
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-capture-patches-to-distribute-changes-in-app-state-with-immer-producewithpatches/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-capture-patches-to-distribute-changes-in-app-state-with-immer-producewithpatches"
	>
		Hosted on egghead.io
	</a>
</details>
<details>
	<summary className="egghead-summary">
		egghead.io lesson 16: Apply Patches using _applyPatches_
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-apply-patches-using-immer-applypatches-to-synchronize-state-across-clients/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-apply-patches-using-immer-applypatches-to-synchronize-state-across-clients"
	>
		Hosted on egghead.io
	</a>
</details>

_⚠ Since version 6 support for Patches has to be enabled explicitly by calling [`enablePatches()`](./installation.mdx#pick-your-immer-version) once when starting your application._

During the run of a producer, Immer can record all the patches that would replay the changes made by the reducer. This is a very powerful tool if you want to fork your state temporarily and replay the changes to the original.

Patches are useful in few scenarios:

- To exchange incremental updates with other parties, for example over websockets
- For debugging / traces, to see precisely how state is changed over time
- As basis for undo/redo or as an approach to replay changes on a slightly different state tree

To help with replaying patches, `applyPatches` comes in handy. Here is an example how patches could be used to record the incremental updates and (inverse) apply them:

```javascript
import produce, {applyPatches} from "immer"

// version 6
import {enablePatches} from "immer"
enablePatches()

let state = {
	name: "Micheal",
	age: 32
}

// Let's assume the user is in a wizard, and we don't know whether
// his changes should end up in the base state ultimately or not...
let fork = state
// all the changes the user made in the wizard
let changes = []
// the inverse of all the changes made in the wizard
let inverseChanges = []

fork = produce(
	fork,
	draft => {
		draft.age = 33
	},
	// The third argument to produce is a callback to which the patches will be fed
	(patches, inversePatches) => {
		changes.push(...patches)
		inverseChanges.push(...inversePatches)
	}
)

// In the meantime, our original state is replaced, as, for example,
// some changes were received from the server
state = produce(state, draft => {
	draft.name = "Michel"
})

// When the wizard finishes (successfully) we can replay the changes that were in the fork onto the *new* state!
state = applyPatches(state, changes)

// state now contains the changes from both code paths!
expect(state).toEqual({
	name: "Michel", // changed by the server
	age: 33 // changed by the wizard
})

// Finally, even after finishing the wizard, the user might change his mind and undo his changes...
state = applyPatches(state, inverseChanges)
expect(state).toEqual({
	name: "Michel", // Not reverted
	age: 32 // Reverted
})
```

The generated patches are similar (but not the same) to the [RFC-6902 JSON patch standard](https://datatracker.ietf.org/doc/html/rfc6902/#section-4.1), except that the `path` property is an array, rather than a string. This makes processing patches easier. If you want to normalize to the official specification, `patch.path = patch.path.join("/")` should do the trick. Anyway, this is what a bunch of patches and their inverse could look like:

```json
[
	{
		"op": "replace",
		"path": ["profile"],
		"value": {"name": "Veria", "age": 5}
	},
	{"op": "remove", "path": ["tags", 3]}
]
```

```json
[
	{"op": "replace", "path": ["profile"], "value": {"name": "Noa", "age": 6}},
	{"op": "add", "path": ["tags", 3], "value": "kiddo"}
]
```

⚠ Note: The set of patches generated by Immer should be correct, that is, applying them to an equal base object should result in the same end state. However Immer does not guarantee the generated set of patches will be optimal, that is, the minimum set of patches possible. It depends often on the use case what is considered 'optimal', and generating the optimal set of patches is potentially computationally very expensive. So in cases you might want to post process the generated patches, or compress them as explained below.

### `produceWithPatches`

<details>
	<summary className="egghead-summary">
		egghead.io lesson 19: Using inverse patches to build undo functionality
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-use-immer-inversepatches-to-build-undo-functionality/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-use-immer-inversepatches-to-build-undo-functionality"
	>
		Hosted on egghead.io
	</a>
</details>
<details>
	<summary className="egghead-summary">
		egghead.io lesson 20: Use patches to build redo functionality
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-use-immer-patches-to-build-redo-functionality/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-use-immer-patches-to-build-redo-functionality"
	>
		Hosted on egghead.io
	</a>
</details>

Instead of setting up a patch listener, an easier way to obtain the patches is to use `produceWithPatches`, which has the same signature as `produce`, except that it doesn't return just the next state, but a tuple consisting of `[nextState, patches, inversePatches]`. Like `produce`, `produceWithPatches` supports currying as well.

```javascript
import {produceWithPatches} from "immer"

const [nextState, patches, inversePatches] = produceWithPatches(
	{
		age: 33
	},
	draft => {
		draft.age++
	}
)
```

Which produces:

```javascript
;[
	{
		age: 34
	},
	[
		{
			op: "replace",
			path: ["age"],
			value: 34
		}
	],
	[
		{
			op: "replace",
			path: ["age"],
			value: 33
		}
	]
]
```

For a more in-depth study, see [Distributing patches and rebasing actions using Immer](https://medium.com/@mweststrate/distributing-state-changes-using-snapshots-patches-and-actions-part-2-2f50d8363988)

Tip: Check this trick to [compress patches](https://medium.com/@david.b.edelstein/using-immer-to-compress-immer-patches-f382835b6c69) produced over time.

# Auto freezing

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center> <details>
	<summary className="egghead-summary">
		egghead.io lesson 7: Immer automatically freezes data
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/javascript-produces-immutable-data-and-avoid-unnecessary-creation-of-new-data-trees-with-immer/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/javascript-produces-immutable-data-and-avoid-unnecessary-creation-of-new-data-trees-with-immer"
	>
		Hosted on egghead.io
	</a>
</details>

Immer automatically freezes any state trees that are modified using `produce`. This protects against accidental modifications of the state tree outside of a producer. In most cases this provides the most optimal behavior, but `setAutoFreeze(true / false)` can be used to explicitly turn this feature on or off.

Immer will never freeze (the contents of) non-enumerable, non-own or symbolic properties, unless their content was drafted.

_⚠️ Immer freezes everything recursively, for large data objects that won't be changed in the future this might be over-kill, in that case it can be more efficient to shallowly pre-freeze data using the `freeze` utility.⚠️_

_⚠️ If auto freezing is enabled, recipes are not entirely side-effect free: Any plain object or array that ends up in the produced result, will be frozen, even when these objects were not frozen before the start of the producer! ⚠️_

# Returning new data from producers

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center>
<details>
	<summary className="egghead-summary">
		egghead.io lesson 9: Returning completely new state
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-return-completely-new-state-from-an-immer-producer/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-return-completely-new-state-from-an-immer-producer"
	>
		Hosted on egghead.io
	</a>
</details>

It is not needed to return anything from a producer, as Immer will return the (finalized) version of the `draft` anyway. However, it is allowed to just `return draft`.

It is also allowed to return arbitrarily other data from the producer function. But _only_ if you didn't modify the draft. This can be useful to produce an entirely new state. Some examples:

```javascript
const userReducer = produce((draft, action) => {
	switch (action.type) {
		case "renameUser":
			// OK: we modify the current state
			draft.users[action.payload.id].name = action.payload.name
			return draft // same as just 'return'
		case "loadUsers":
			// OK: we return an entirely new state
			return action.payload
		case "adduser-1":
			// NOT OK: This doesn't do change the draft nor return a new state!
			// It doesn't modify the draft (it just redeclares it)
			// In fact, this just doesn't do anything at all
			draft = {users: [...draft.users, action.payload]}
			return
		case "adduser-2":
			// NOT OK: modifying draft *and* returning a new state
			draft.userCount += 1
			return {users: [...draft.users, action.payload]}
		case "adduser-3":
			// OK: returning a new state. But, unnecessary complex and expensive
			return {
				userCount: draft.userCount + 1,
				users: [...draft.users, action.payload]
			}
		case "adduser-4":
			// OK: the immer way
			draft.userCount += 1
			draft.users.push(action.payload)
			return
	}
})
```

_Note: It is not possible to return `undefined` this way, as it is indistinguishable from *not* updating the draft! Read on..._

## Producing `undefined` using `nothing`

So, in general, one can replace the current state by just `return`ing a new value from the producer, rather than modifying the draft. There is a subtle edge case however: if you try to write a producer that wants to replace the current state with `undefined`:

```javascript
produce({}, draft => {
	// don't do anything
})
```

Versus:

```javascript
produce({}, draft => {
	// Try to return undefined from the producer
	return undefined
})
```

The problem is that in JavaScript a function that doesn't return anything also returns `undefined`! So immer cannot differentiate between those different cases. So, by default, Immer will assume that any producer that returns `undefined` just tried to modify the draft.

However, to make it clear to Immer that you intentionally want to produce the value `undefined`, you can return the built-in token `nothing`:

```javascript
import produce, {nothing} from "immer"

const state = {
	hello: "world"
}

produce(state, draft => {})
produce(state, draft => undefined)
// Both return the original state: { hello: "world"}

produce(state, draft => nothing)
// Produces a new state, 'undefined'
```

N.B. Note that this problem is specific for the `undefined` value, any other value, including `null`, doesn't suffer from this issue.

Tip: to be able to return `nothing` from a recipe when using TypeScript, the `state`'s type must accept `undefined` as value.

## Inline shortcuts using `void`

<details>
	<summary className="egghead-summary">
		egghead.io lesson 10: Avoid accidental returns by using _void_
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-avoid-accidental-returns-of-new-state-by-using-the-void-keyword/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-avoid-accidental-returns-of-new-state-by-using-the-void-keyword"
	>
		Hosted on egghead.io
	</a>
</details>

Draft mutations in Immer usually warrant a code block, since a return denotes an overwrite. Sometimes that can stretch code a little more than you might be comfortable with.

In such cases, you can use javascripts [`void`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void) operator, which evaluates expressions and returns `undefined`.

```javascript
// Single mutation
produce(draft => void (draft.user.age += 1))

// Multiple mutations
produce(draft => void ((draft.user.age += 1), (draft.user.height = 186)))
```

Code style is highly personal, but for code bases that are to be understood by many, we recommend to stick to the classic `draft => { draft.user.age += 1}` to avoid cognitive overhead.

# Async producers & createDraft / finishDraft

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center> <details>
	<summary className="egghead-summary">
		egghead.io lesson 11: Creating <b>async</b> producers (and why you
		shouldn’t)
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-write-asynchronous-producers-in-immer-and-why-you-shouldn-t/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-write-asynchronous-producers-in-immer-and-why-you-shouldn-t"
	>
		Hosted on egghead.io
	</a>
</details>

It is allowed to return Promise objects from recipes. Or, in other words, to use `async / await`. This can be pretty useful for long running processes, that only produce the new object once the promise chain resolves. Note that `produce` itself (even in the curried form) will return a promise if the producer is async. Example:

```javascript
import produce from "immer"

const user = {
	name: "michel",
	todos: []
}

const loadedUser = await produce(user, async function(draft) {
	draft.todos = await (await window.fetch("http://host/" + draft.name)).json()
})
```

_Warning: please note that the draft shouldn't be 'leaked' from the async process and stored else where. The draft will still be revoked as soon as the async process completes._

## `createDraft` and `finishDraft`

`createDraft` and `finishDraft` are two low-level functions that are mostly useful for libraries that build abstractions on top of immer. It avoids the need to always create a function in order to work with drafts. Instead, one can create a draft, modify it, and at some time in the future finish the draft, in which case the next immutable state will be produced. We could for example rewrite our above example as:

```javascript
import {createDraft, finishDraft} from "immer"

const user = {
	name: "michel",
	todos: []
}

const draft = createDraft(user)
draft.todos = await (await window.fetch("http://host/" + draft.name)).json()
const loadedUser = finishDraft(draft)
```

Note: `finishDraft` takes a `patchListener` as second argument, which can be used to record the patches, similarly to `produce`.

_Warning: in general, we recommend to use `produce` instead of the `createDraft` / `finishDraft` combo, `produce` is less error prone in usage, and more clearly separates the concepts of mutability and immutability in your code base._

# Using TypeScript or Flow

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center> <details>
	<summary className="egghead-summary">
		egghead.io lesson 12: Immer + TypeScript
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-type-immutable-immer-data-with-typescript/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-type-immutable-immer-data-with-typescript"
	>
		Hosted on egghead.io
	</a>
</details>

The Immer package ships with type definitions inside the package, which should be picked up by TypeScript and Flow out of the box and without further configuration.

The TypeScript typings automatically remove `readonly` modifiers from your draft types and return a value that matches your original type. See this practical example:

```ts
import produce from "immer"

interface State {
	readonly x: number
}

// `x` cannot be modified here
const state: State = {
	x: 0
}

const newState = produce(state, draft => {
	// `x` can be modified here
	draft.x++
})

// `newState.x` cannot be modified here
```

This ensures that the only place you can modify your state is in your produce callbacks. It even works recursively and with `ReadonlyArray`.

## Best practices

1. Always define your states as `readonly` as much as possible. This best reflects the mental model and reality, since Immer will freeze all its returned values.
2. You can use the utility type `Immutable` to recursively make an entire type tree read-only, e.g.: `type ReadonlyState = Immutable<State>`.
3. Immer won't automatically wrap all returned types in `Immutable` if the original type of the input state wasn't immutable. This is to make sure it doesn't break code bases that don't use immutable types.

## Tips for curried producers

We try to inference as much as possible. So if a curried producer is created and directly passed to another function, we can infer the type from there. This works well with for example React:

```typescript
import {Immutable, produce} from "immer"

type Todo = Immutable<{
	title: string
	done: boolean
}>

// later...

const [todo, setTodo] = useState<Todo>({
	title: "test",
	done: true
})

// later...

setTodo(
	produce(draft => {
		// draft will be strongly typed and mutable!
		draft.done = !draft.done
	})
)
```

When a curried producer isn't passed directly somewhere else, Immer can infer the state type from the draft argument. For example when doing the following:

```typescript
// See below for a better solution!

const toggler = produce((draft: Draft<Todo>) => {
	draft.done = !draft.done
})

// typeof toggler = (state: Immutable<Todo>) => Writable<Todo>
```

Note that we did wrap the `Todo` type of the `draft` argument with `Draft`, because `Todo` is a readonly type. For non-readonly types this isn't needed.

For the returned curried function, `toggler`, We will _narrow_ the _input_ type to `Immutable<Todo>`, so that even though `Todo` is a mutable type, we will still accept an immutable todo as input argument to `toggler`.

In contrast, Immer will _widen_ the _output_ type of the curried function to `Writable<Todo>`, to make sure it's output state is also assignable to variables that are not explictly typed to be immutable.

This type narrowing / widening behavior might be unwelcome, maybe even for the simple reason that it results in quite noisy types. So we recommend to specify the generic state type for curried producers instead, in cases where it cannot be inferred directly, like `toggler` above. By doing so the automatic output widening / input narrowing will be skipped. However, the `draft` argument itself will still be inferred to be a writable `Draft<Todo>`:

```typescript
const toggler = produce<Todo>(draft => {
	draft.done = !draft.done
})

// typeof toggler = (state: Todo) => Todo
```

However, in case the curried producer is defined with an initial state, Immer can infer the state type from the initial state, so in that case the generic doesn't need to be specified either:

```typescript
const state0: Todo = {
	title: "test",
	done: false
}

// No type annotations needed, since we can infer from state0.
const toggler = produce(draft => {
	draft.done = !draft.done
}, state0)

// typeof toggler = (state: Todo) => Todo
```

In case the toggler has no initial state, and it has curried arguments, and you set the state generic explicitly, then type of any additional arguments should be defined explicitly as a tuple type as well:

```typescript
const toggler = produce<Todo, [boolean]>((draft, newState) => {
	draft.done = newState
})

// typeof toggler = (state: Todo, newState: boolean) => Todo
```

## Cast utilities

The types inside and outside a `produce` can be conceptually the same, but from a practical perspective different. For example, the `State` in the examples above should be considered immutable outside `produce`, but mutable inside `produce`.

Sometimes this leads to practical conflicts. Take the following example:

```typescript
type Todo = {readonly done: boolean}

type State = {
	readonly finishedTodos: readonly Todo[]
	readonly unfinishedTodos: readonly Todo[]
}

function markAllFinished(state: State) {
	produce(state, draft => {
		draft.finishedTodos = state.unfinishedTodos
	})
}
```

This will generate the error:

```
The type 'readonly Todo[]' is 'readonly' and cannot be assigned to the mutable type '{ done: boolean; }[]'
```

The reason for this error is that we assign our read only, immutable array to our draft, which expects a mutable type, with methods like `.push` etc etc. As far as TS is concerned, those are not exposed from our original `State`. To hint TypeScript that we want to upcast the collection here to a mutable array for draft purposes, we can use the utility `castDraft`:

`draft.finishedTodos = castDraft(state.unfinishedTodos)` will make the error disappear.

There is also the utility `castImmutable`, in case you ever need to achieve the opposite. Note that these utilities are for all practical purposes no-ops, they will just return their original value.

Tip: You can combine `castImmutable` with `produce` to type the return type of `produce` as something immutable, even when the original state was mutable:

```typescript
// a mutable data structure
const baseState = {
	todos: [{
		done: false
	}]
}

const nextState = castImmutable(produce(baseState, _draft => {}))

// inferred type of nextState is now:
{
	readonly todos: ReadonlyArray<{
		readonly done: boolean
	}>
})
```

## Compatibility

**Note:** Immer v5.3+ supports TypeScript v3.7+ only.

**Note:** Immer v3.0+ supports TypeScript v3.4+ only.

**Note:** Immer v1.9+ supports TypeScript v3.1+ only.

**Note:** Flow support might be removed in future versions and we recommend TypeScript

# Immer performance

<center>
	<div
		data-ea-publisher="immerjs"
		data-ea-type="image"
		className="horizontal bordered"
	></div>
</center> <details>
	<summary className="egghead-summary">
		egghead.io lesson 5: Leveraging Immer's structural sharing in React
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/react-profile-react-rendering-and-optimize-with-memo-to-leverage-structural-sharing/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/react-profile-react-rendering-and-optimize-with-memo-to-leverage-structural-sharing"
	>
		Hosted on egghead.io
	</a>
</details> <details>
	<summary className="egghead-summary">
		egghead.io lesson 7: Immer will try to re-cycle data if there was no
		semantic change
	</summary>
	<br />
	<div>
		<iframe
			width="760"
			height="427"
			scrolling="no"
			src="https://egghead.io/lessons/javascript-produces-immutable-data-and-avoid-unnecessary-creation-of-new-data-trees-with-immer/embed"
		></iframe>
	</div>
	<a
		className="egghead-link"
		href="https://egghead.io/lessons/javascript-produces-immutable-data-and-avoid-unnecessary-creation-of-new-data-trees-with-immer"
	>
		Hosted on egghead.io
	</a>
</details>

Here is a [simple benchmark](https://github.com/immerjs/immer/blob/master/__performance_tests__/todo.js) on the performance of Immer. This test takes 50,000 todo items and updates 5,000 of them. _Freeze_ indicates that the state tree has been frozen after producing it. This is a _development_ best practice, as it prevents developers from accidentally modifying the state tree.

Something that isn't reflected in the numbers above, but in reality, Immer is sometimes significantly _faster_ than a hand written reducer. The reason for that is that Immer will detect "no-op" state changes, and return the original state if nothing actually changed, which can avoid a lot of re-renderings for example. Cases are known where simply applying immer solved critical performance issues.

These tests were executed on Node 10.16.3. Use `yarn test:perf` to reproduce them locally.

![performance.png](https://immerjs.github.io/immer/assets/images/performance-c7f59d06ec36f4a05b6403daada96542.png)

Most important observation:

- Immer with proxies is roughly speaking twice to three times slower as a handwritten reducer (the above test case is worst case, see `yarn test:perf` for more tests). This is in practice negligible.
- Immer is roughly as fast as ImmutableJS. However, the _immutableJS + toJS_ makes clear the cost that often needs to be paid later; converting the immutableJS objects back to plain objects, to be able to pass them to components, over the network etc... (And there is also the upfront cost of converting data received from e.g. the server to immutable JS)
- Generating patches doesn't significantly slow down immer
- The ES5 fallback implementation is roughly twice as slow as the proxy implementation, in some cases worse.

## Performance tips

### Pre-freeze data

When adding a large data set to the state tree in an Immer producer (for example data received from a JSON endpoint), it is worth to call `freeze(json)` on the root of the data that is being added first. To _shallowly_ freeze it. This will allow Immer to add the new data to the tree faster, as it will avoid the need to _recursively_ scan and freeze the new data.

### You can always opt-out

Realize that immer is opt-in everywhere, so it is perfectly fine to manually write super performance critical reducers, and use immer for all the normal ones. Even from within a producer you opt-out from Immer for certain parts of your logic by using utilies `original` or `current` and perform some of your operations on plain JavaScript objects.

### For expensive search operations, read from the original state, not the draft

Immer will convert anything you read in a draft recursively into a draft as well. If you have expensive side effect free operations on a draft that involves a lot of reading, for example finding an index using `find(Index)` in a very large array, you can speed this up by first doing the search, and only call the `produce` function once you know the index. Thereby preventing Immer to turn everything that was searched for in a draft. Or, alternatively, perform the search on the original value of a draft, by using `original(someDraft)`, which boils to the same thing.

### Pull produce as far up as possible

Always try to pull produce 'up', for example `for (let x of y) produce(base, d => d.push(x))` is exponentially slower than `produce(base, d => { for (let x of y) d.push(x)})`

# External resources

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

- Blog: [The Rise of Immer in React](https://www.netlify.com/blog/2018/09/12/the-rise-of-immer-in-react/)
- Blog: by Workday Prism on why they picked Immer to manage immutable state [The Search for a Strongly-Typed, Immutable State](https://medium.com/workday-engineering/workday-prism-analytics-the-search-for-a-strongly-typed-immutable-state-a09f6768b2b5)
- Blog: [Immutability in React and Redux: The Complete Guide](https://daveceddia.com/react-redux-immutability-guide/)
- Video tutorial: [Using Immer with React.setState](https://codedaily.io/screencasts/86/Immutable-Data-with-Immer-and-React-setState)
- [Talk](https://www.youtube.com/watch?v=-gJbS7YjcSo) + [slides](http://immer.surge.sh/) on Immer at React Finland 2018 by Michel Weststrate
- [ForwardJS 2019: Immutability is Changing - From Immutable.js to Immer](https://www.youtube.com/watch?v=bFuRvcAEiHg&feature=youtu.be) by [shawn swyx wang](https://twitter.com/swyx/)
- [Talk: Immer, Immutability and the Wonderful World of Proxies](https://www.youtube.com/watch?v=4Nb9Gwp2L24) + [slides](https://jsnation-proxies.surge.sh/), JSNation 2019, Michel Weststrate
- Blog: [Distributing state changes using snapshots, patches and actions](https://medium.com/@mweststrate/distributing-state-changes-using-snapshots-patches-and-actions-part-1-2811a2fcd65f)
- Blog: [Implementing Undo-Redo Functionality in Redux](https://techinscribed.com/implementing-undo-redo-functionality-in-redux-using-immer/), Sep 2019
- Blog: [Synchronized immutable state with time travel](https://dev.to/oleg008/synchronized-immutable-state-with-time-travel-2c6o), Apr 2022, by [Oleg Isonen](https://twitter.com/oleg008)

# Frequently Asked Questions

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

## Q: How does Immer work?

Read the (second part of the) [introduction blog](https://medium.com/@mweststrate/introducing-immer-immutability-the-easy-way-9d73d8f71cb3).

## Q: Does Immer use structural sharing? So that my selectors can be memoized and such?

A: Yes

## Q: Does Immer support deep updates?

A: Yes

## Q: I can't rely on Proxies being present on my target environments. Can I use Immer?

A: Yes - [view details](./installation.mdx#immer-on-older-javascript-environments)

## Q: Can I typecheck my data structures when using Immer?

A: Yes

## Q: Can I store `Date` objects, functions etc in my state tree when using Immer?

A: Yes

## Q: Can I use Maps and Sets?

A: Yes

## Q: Is it fast?

A: Yes

## Q: Idea! Can Immer freeze the state for me?

A: Yes

# Pitfalls

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

### Performance tips

For performance tips, see [Performance Tips](./performance.mdx#performance-tips).

### Don't reassign the recipe argument

Never reassign the `draft` argument (example: `draft = myCoolNewState`). Instead, either modify the `draft` or return a new state. See [Returning data from producers](./return.mdx).

### Immer only supports unidirectional trees

Immer assumes your state to be a unidirectional tree. That is, no object should appear twice in the tree, there should be no circular references. There should be exactly one path from the root to any node of the tree.

### Never explicitly return `undefined` from a producer

It is possible to return values from producers, except, it is not possible to return `undefined` that way, as it is indistinguishable from not updating the draft at all! If you want to replace the draft with `undefined`, just return `nothing` from the producer.

### Don't mutate exotic objects

Immer [does not support exotic objects](https://github.com/immerjs/immer/issues/504) such as window.location.

### Classes should be made draftable or not mutated

You will need to enable your own classes to work properly with Immer. For docs on the topic, check out the section on [working with complex objects](./complex-objects.md).

### Only valid indices and length can be mutated on Arrays

For arrays, only numeric properties and the `length` property can be mutated. Custom properties are not preserved on arrays.

### Data not originating from the state will never be drafted

Note that data that comes from the closure, and not from the base state, will never be drafted, even when the data has become part of the new draft.

```javascript
function onReceiveTodo(todo) {
	const nextTodos = produce(todos, draft => {
		draft.todos[todo.id] = todo
		// Note, because 'todo' is coming from external, and not from the 'draft',
		// it isn't draft so the following modification affects the original todo!
		draft.todos[todo.id].done = true

		// The reason for this, is that it means that the behavior of the 2 lines above
		// is equivalent to code, making this whole process more consistent
		todo.done = true
		draft.todos[todo.id] = todo
	})
}
```

### Immer patches are not necessarily optimal

The set of patches generated by Immer should be correct, that is, applying them to an equal base object should result in the same end state. However Immer does not guarantee the generated set of patches will be optimal, that is, the minimum set of patches possible.

### Always use the result of nested producers

Nested `produce` calls are supported, but note that `produce` will _always_ produce a new state, so even when passing a draft to a nested produce, the changes made by the inner produce won't be visible in the draft that was passed it, but only in the output that is produced. In other words, when using nested produce, you get a draft of a draft and the result of the inner produce should be merged back into the original draft (or returned). For example `produce(state, draft => { produce(draft.user, userDraft => { userDraft.name += "!" })})` won't work as the output if the inner produce isn't used. The correct way to use nested producers is:

```javascript
produce(state, draft => {
	draft.user = produce(draft.user, userDraft => {
		userDraft.name += "!"
	})
})
```

### Drafts aren't referentially equal

Draft objects in Immer are wrapped in `Proxy`, so you cannot use `==` or `===` to test equality between an original object and its equivalent draft (eg. when matching a specific element in an array). Instead, you can use the `original` helper:

```javascript
const remove = produce((list, element) => {
	const index = list.indexOf(element) // this won't work!
	const index = original(list).indexOf(element) // do this instead
	if (index > -1) list.splice(index, 1)
})

const values = [a, b, c]
remove(values, a)
```

If possible, it's recommended to perform the comparison outside the `produce` function, or to use a unique identifier property like `.id` instead, to avoid needing to use `original`.

# Built with Immer

<center>
<div data-ea-publisher="immerjs" data-ea-type="image" class="horizontal bordered"></div>
</center>

- [react-copy-write](https://github.com/aweary/react-copy-write) _Immutable state with a mutable API_
- [redux-toolkit](https://github.com/reduxjs/redux-toolkit) _The official, opinionated, batteries-included toolset for efficient Redux development_
- [immer based handleActions](https://gist.github.com/kitze/fb65f527803a93fb2803ce79a792fff8) _Boilerplate free actions for Redux_
- [redux-box](https://github.com/anish000kumar/redux-box) _Modular and easy-to-grasp redux based state management, with least boilerplate_
- [quick-redux](https://github.com/jeffreyyoung/quick-redux) _tools to make redux development quicker and easier_
- [bey](https://github.com/jamiebuilds/bey) _Simple immutable state for React using Immer_
- [cool-store](https://github.com/Maxvien/cool-store) _CoolStore is an immutable state store built on top of ImmerJS and RxJS_
- [immer-wieder](https://github.com/drcmda/immer-wieder#readme) _State management lib that combines React 16 Context and immer for Redux semantics_
- [robodux](https://github.com/neurosnap/robodux) _flexible way to reduce redux boilerplate_
- [immer-reducer](https://github.com/epeli/immer-reducer) _Type-safe and terse React (useReducer()) and Redux reducers with Typescript_
- [redux-ts-utils](https://github.com/knpwrs/redux-ts-utils) _Everything you need to create type-safe applications with Redux with a strong emphasis on simplicity_
- [react-state-tree](https://github.com/suchipi/react-state-tree) _Drop-in replacement for useState that persists your state into a redux-like state tree_
- [redux-immer](https://github.com/salvoravida/redux-immer) _is used to create an equivalent function of Redux combineReducers that works with `immer` state. Like `redux-immutable` but for `immer`_
- [ngrx-wieder](https://github.com/nilsmehlhorn/ngrx-wieder) _Lightweight yet configurable solution for implementing undo-redo in Angular apps on top of NgRx and Immer_
- [immerhin](https://github.com/webstudio-is/immerhin) Sync state with undo/redo
- ... and [many more](https://www.npmjs.com/browse/depended/immer)