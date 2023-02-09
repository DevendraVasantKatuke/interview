# Getting Started with React Redux

[React Redux](https://github.com/reduxjs/react-redux) is the official [React](https://reactjs.org/) UI bindings layer for [Redux](https://redux.js.org/). It lets your React components read data from a Redux store, and dispatch actions to the store to update state.

## Installation

React Redux 8.x requires **React 16.8.3 or later** / **React Native 0.59 or later**, in order to make use of React Hooks.

### Using Create React App

The recommended way to start new apps with React and Redux is by using the [official Redux+JS template](https://github.com/reduxjs/cra-template-redux) or [Redux+TS template](https://github.com/reduxjs/cra-template-redux-typescript) for [Create React App](https://github.com/facebook/create-react-app), which takes advantage of **[Redux Toolkit](https://redux-toolkit.js.org/)** and React Redux's integration with React components.

```bash
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```

### An Existing React App

To use React Redux with your React app, install it as a dependency:

```bash
# If you use npm:
npm install react-redux

# Or if you use Yarn:
yarn add react-redux
```

You'll also need to [install Redux](https://redux.js.org/introduction/installation) and [set up a Redux store](https://redux.js.org/recipes/configuring-your-store/) in your app.

React-Redux v8 is written in TypeScript, so all types are automatically included.

## API Overview

### `Provider`

React Redux includes a `<Provider />` component, which makes the Redux store available to the rest of your app:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

### Hooks

React Redux provides a pair of custom React hooks that allow your React components to interact with the Redux store.

`useSelector` reads a value from the store state and subscribes to updates, while `useDispatch` returns the store's `dispatch` method to let you dispatch actions.

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      {/* omit additional rendering output here */}
    </div>
  )
}
```

## Learning React Redux

### Learn Modern Redux Livestream

Redux maintainer Mark Erikson appeared on the "Learn with Jason" show to explain how we recommend using Redux today. The show includes a live-coded example app that shows how to use Redux Toolkit and React-Redux hooks with Typescript, as well as the new RTK Query data fetching APIs.

See [the "Learn Modern Redux" show notes page](https://www.learnwithjason.dev/let-s-learn-modern-redux) for a transcript and links to the example app source.

<LiteYouTubeEmbed 
    id="9zySeP5vH9c"
    title="Learn Modern Redux - Redux Toolkit, React-Redux Hooks, and RTK Query"
/>

## Help and Discussion

The **[#redux channel](https://discord.gg/0ZcbPKXt5bZ6au5t)** of the **[Reactiflux Discord community](http://www.reactiflux.com)** is our official resource for all questions related to learning and using Redux. Reactiflux is a great place to hang out, ask questions, and learn - come join us!

You can also ask questions on [Stack Overflow](https://stackoverflow.com) using the **[#redux tag](https://stackoverflow.com/questions/tagged/redux)**.

## Docs Translations

- [Portuguese](https://fernandobelotto.github.io/react-redux)


# Why Use React Redux?

Redux itself is a standalone library that can be used with any UI layer or framework, including React, Angular, Vue, Ember, and vanilla JS. Although Redux and React are commonly used together, they are independent of each other.

If you are using Redux with any kind of UI framework, you will normally use a "UI binding" library to tie Redux together with your UI framework, rather than directly interacting with the store from your UI code.

**React Redux is the official Redux UI binding library for React**. If you are using Redux and React together, you should also use React Redux to bind these two libraries.

To understand why you should use React Redux, it may help to understand what a "UI binding library" does.

:::info

If you have questions about whether you should use Redux in general, please see these articles for discussion of when and why you might want to use Redux, and how it's intended to be used:

- [Redux docs: Motivation](https://redux.js.org/introduction/motivation)
- [Redux docs: FAQ - When should I use Redux?](https://redux.js.org/faq/general#when-should-i-use-redux)
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
- [Idiomatic Redux: The Tao of Redux, Part 1 - Implementation and Intent](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-1/)

:::

## Integrating Redux with a UI

Using Redux with _any_ UI layer requires [the same consistent set of steps](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/ui-layer.html#/4):

1. Create a Redux store
2. Subscribe to updates
3. Inside the subscription callback:
   1. Get the current store state
   2. Extract the data needed by this piece of UI
   3. Update the UI with the data
4. If necessary, render the UI with initial state
5. Respond to UI inputs by dispatching Redux actions

While it is possible to write this logic by hand, doing so would become very repetitive. In addition, optimizing UI performance would require complicated logic.

The process of subscribing to the store, checking for updated data, and triggering a re-render can be made more generic and reusable. **A UI binding library like React Redux handles the store interaction logic, so you don't have to write that code yourself.**

:::info

For a deeper look at how React Redux works internally and how it handles the store interaction for you, see **[Idiomatic Redux: The History and Implementation of React Redux](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)**.

:::

## Reasons to Use React Redux

### It is the Official Redux UI Bindings for React

While Redux can be used with any UI layer, it was originally designed and intended for use with React. There are [UI binding layers for many other frameworks](https://redux.js.org/introduction/ecosystem#library-integration-and-bindings), but React Redux is maintained directly by the Redux team.

As the official Redux binding for React, React Redux is kept up-to-date with any API changes from either library, to ensure that your React components behave as expected. Its intended usage adopts the design principles of React - writing declarative components.

### It Implements Performance Optimizations For You

React is generally fast, but by default any updates to a component will cause React to re-render all of the components inside that part of the component tree. This does require work, and if the data for a given component hasn't changed, then re-rendering is likely some wasted effort because the requested UI output would be the same.

If performance is a concern, the best way to improve performance is to skip unnecessary re-renders, so that components only re-render when their data has actually changed. **React Redux implements many performance optimizations internally, so that your own component only re-renders when it actually needs to.**

In addition, by connecting multiple components in your React component tree, you can ensure that each connected component only extracts the specific pieces of data from the store state that are needed by that component. This means that your own component will need to re-render less often, because most of the time those specific pieces of data haven't changed.

### Community Support

As the official binding library for React and Redux, React Redux has a large community of users. This makes it easier to ask for help, learn about best practices, use libraries that build on top of React Redux, and reuse your knowledge across different applications.

## Links and References

### Understanding React Redux

- [Idiomatic Redux: The History and Implementation of React Redux](https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/)
- [`connect.js` Explained](https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e)
- [Redux Fundamentals workshop slides](https://blog.isquaredsoftware.com/2018/06/redux-fundamentals-workshop-slides/)
  - [UI Layer Integration](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/ui-layer.html)
  - [Using React Redux](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/react-redux.html)

### Community Resources

- Discord channel: [#redux on Reactiflux](https://discord.gg/0ZcbPKXt5bZ6au5t) ([Reactiflux invite link](https://reactiflux.com))
- Stack Overflow topics: [Redux](https://stackoverflow.com/questions/tagged/redux), [React Redux](https://stackoverflow.com/questions/tagged/redux)
- Reddit: [/r/reactjs](https://www.reddit.com/r/reactjs/), [/r/reduxjs](https://www.reddit.com/r/reduxjs/)
- GitHub issues (bug reports and feature requests): https://github.com/reduxjs/react-redux/issues
- Tutorials, articles, and further resources: [React/Redux Links](https://github.com/markerikson/react-redux-links)

# React Redux Quick Start

:::tip What You'll Learn

- How to set up and use Redux Toolkit with React Redux

:::

:::info Prerequisites

- Familiarity with [ES6 syntax and features](https://www.taniarascia.com/es6-syntax-and-feature-overview/)
- Knowledge of React terminology: [JSX](https://reactjs.org/docs/introducing-jsx.html), [State](https://reactjs.org/docs/state-and-lifecycle.html), [Function Components, Props](https://reactjs.org/docs/components-and-props.html), and [Hooks](https://reactjs.org/docs/hooks-intro.html)
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

:::

## Introduction

Welcome to the React Redux Quick Start tutorial! **This tutorial will briefly introduce you to React Redux and teach you how to start using it correctly**.

### How to Read This Tutorial

This page will focus on just how to set up a Redux application with Redux Toolkit and the main APIs you'll use. For explanations of what Redux is, how it works, and full examples of how to use Redux Toolkit, see [the Redux core docs tutorials](https://redux.js.org/tutorials/index).

For this tutorial, we assume that you're using Redux Toolkit and React Redux together, as that is the standard Redux usage pattern. The examples are based on [a typical Create-React-App folder structure](https://create-react-app.dev/docs/folder-structure) where all the application code is in a `src`, but the patterns can be adapted to whatever project or folder setup you're using.

The [Redux+JS template for Create-React-App](https://github.com/reduxjs/cra-template-redux) comes with this same project setup already configured.

## Usage Summary

### Install Redux Toolkit and React Redux

Add the Redux Toolkit and React Redux packages to your project:

```sh
npm install @reduxjs/toolkit react-redux
```

### Create a Redux Store

Create a file named `src/app/store.js`. Import the `configureStore` API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:

```js title="app/store.js"
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})
```

This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.

### Provide the Redux Store to React

Once the store is created, we can make it available to our React components by putting a React Redux `<Provider>` around our application in `src/index.js`. Import the Redux store we just created, put a `<Provider>` around your `<App>`, and pass the store as a prop:

```js title="index.js"
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// highlight-start
import store from './app/store'
import { Provider } from 'react-redux'
// highlight-end

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  // highlight-next-line
  <Provider store={store}>
    <App />
  </Provider>
)
```

### Create a Redux State Slice

Add a new file named `src/features/counter/counterSlice.js`. In that file, import the `createSlice` API from Redux Toolkit.

Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

Redux requires that [we write all state updates immutably, by making copies of data and updating the copies](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#immutability). However, Redux Toolkit's `createSlice` and `createReducer` APIs use [Immer](https://immerjs.github.io/immer/) inside to allow us to [write "mutating" update logic that becomes correct immutable updates](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#immutable-updates-with-immer).

```js title="features/counter/counterSlice.js"
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

### Add Slice Reducers to the Store

Next, we need to import the reducer function from the counter slice and add it to our store. By defining a field inside the `reducers` parameter, we tell the store to use this slice reducer function to handle all updates to that state.

```js title="app/store.js"
import { configureStore } from '@reduxjs/toolkit'
// highlight-next-line
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    // highlight-next-line
    counter: counterReducer,
  },
})
```

### Use Redux State and Actions in React Components

Now we can use the React Redux hooks to let React components interact with the Redux store. We can read data from the store with `useSelector`, and dispatch actions using `useDispatch`. Create a `src/features/counter/Counter.js` file with a `<Counter>` component inside, then import that component into `App.js` and render it inside of `<App>`.

```jsx title="features/counter/Counter.js"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'
import styles from './Counter.module.css'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```

Now, any time you click the "Increment" and "Decrement buttons:

- The corresponding Redux action will be dispatched to the store
- The counter slice reducer will see the actions and update its state
- The `<Counter>` component will see the new state value from the store and re-render itself with the new data

## What You've Learned

That was a brief overview of how to set up and use Redux Toolkit with React. Recapping the details:

:::tip Summary

- **Create a Redux store with `configureStore`**
  - `configureStore` accepts a `reducer` function as a named argument
  - `configureStore` automatically sets up the store with good default settings
- **Provide the Redux store to the React application components**
  - Put a React Redux `<Provider>` component around your `<App />`
  - Pass the Redux store as `<Provider store={store}>`
- **Create a Redux "slice" reducer with `createSlice`**
  - Call `createSlice` with a string name, an initial state, and named reducer functions
  - Reducer functions may "mutate" the state using Immer
  - Export the generated slice reducer and action creators
- **Use the React Redux `useSelector/useDispatch` hooks in React components**
  - Read data from the store with the `useSelector` hook
  - Get the `dispatch` function with the `useDispatch` hook, and dispatch actions as needed

:::

### Full Counter App Example

The counter example app shown here is also the

Here's the complete counter application as a running CodeSandbox:

<iframe
  class="codesandbox"
  src="https://codesandbox.io/embed/github/reduxjs/redux-essentials-counter-example/tree/master/?fontsize=14&hidenavigation=1&module=%2Fsrc%2Ffeatures%2Fcounter%2FcounterSlice.js&theme=dark&runonclick=1"
  title="redux-essentials-example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## What's Next?

We recommend going through [**the "Redux Essentials" and "Redux Fundamentals" tutorials in the Redux core docs**](https://redux.js.org/tutorials/index), which will give you a complete understanding of how Redux works, what Redux Toolkit and React Redux do, and how to use it correctly.

# React Redux TypeScript Quick Start

:::tip What You'll Learn

- How to set up and use Redux Toolkit and React Redux with TypeScript

:::

:::info Prerequisites

- Knowledge of React [Hooks](https://reactjs.org/docs/hooks-intro.html)
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
- Understanding of TypeScript syntax and concepts

:::

## Introduction

Welcome to the React Redux TypeScript Quick Start tutorial! **This tutorial will briefly show how to use TypeScript with Redux Toolkit**.

This page focuses on just how to set up the TypeScript aspects . For explanations of what Redux is, how it works, and full examples of how to use Redux, see [the Redux core docs tutorials](https://redux.js.org/tutorials/index).

Both React-Redux and Redux Toolkit are already written in TypeScript, so their TS type definitions are built in.

[React Redux](https://react-redux.js.org) has its type definitions in a separate [`@types/react-redux` typedefs package](https://npm.im/@types/react-redux) on NPM. In addition to typing the library functions, the types also export some helpers to make it easier to write typesafe interfaces between your Redux store and your React components.

The [Redux+TS template for Create-React-App](https://github.com/reduxjs/cra-template-redux-typescript) comes with a working example of these patterns already configured.

:::info

The recently updated `@types/react@18` major version has changed component definitions to remove having `children` as a prop by default. This causes errors if you have multiple copies of `@types/react` in your project. To fix this, tell your package manager to resolve `@types/react` to a single version. Details:

https://github.com/facebook/react/issues/24304#issuecomment-1094565891

:::

## Project Setup

### Define Root State and Dispatch Types

[Redux Toolkit's `configureStore` API](https://redux-toolkit.js.org/api/configureStore) should not need any additional typings. You will, however, want to extract the `RootState` type and the `Dispatch` type so that they can be referenced as needed. Inferring these types from the store itself means that they correctly update as you add more state slices or modify middleware settings.

Since those are types, it's safe to export them directly from your store setup file such as `app/store.ts` and import them directly into other files.

```ts title="app/store.ts"
import { configureStore } from '@reduxjs/toolkit'
// ...

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

// highlight-start
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// highlight-end
```

### Define Typed Hooks

While it's possible to import the `RootState` and `AppDispatch` types into each component, it's **better to create typed versions of the `useDispatch` and `useSelector` hooks for usage in your application**. . This is important for a couple reasons:

- For `useSelector`, it saves you the need to type `(state: RootState)` every time
- For `useDispatch`, the default `Dispatch` type does not know about thunks. In order to correctly dispatch thunks, you need to use the specific customized `AppDispatch` type from the store that includes the thunk middleware types, and use that with `useDispatch`. Adding a pre-typed `useDispatch` hook keeps you from forgetting to import `AppDispatch` where it's needed.

Since these are actual variables, not types, it's important to define them in a separate file such as `app/hooks.ts`, not the store setup file. This allows you to import them into any component file that needs to use the hooks, and avoids potential circular import dependency issues.

```ts title="app/hooks.ts"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// highlight-start
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// highlight-end
```

## Application Usage

### Define Slice State and Action Types

Each slice file should define a type for its initial state value, so that `createSlice` can correctly infer the type of `state` in each case reducer.

All generated actions should be defined using the `PayloadAction<T>` type from Redux Toolkit, which takes the type of the `action.payload` field as its generic argument.

You can safely import the `RootState` type from the store file here. It's a circular import, but the TypeScript compiler can correctly handle that for types. This may be needed for use cases like writing selector functions.

```ts title="features/counter/counterSlice.ts"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// highlight-start
// Define a type for the slice state
interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
}
// highlight-end

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // highlight-start
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // highlight-end
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
```

The generated action creators will be correctly typed to accept a `payload` argument based on the `PayloadAction<T>` type you provided for the reducer. For example, `incrementByAmount` requires a `number` as its argument.

In some cases, [TypeScript may unnecessarily tighten the type of the initial state](https://github.com/reduxjs/redux-toolkit/pull/827). If that happens, you can work around it by casting the initial state using `as`, instead of declaring the type of the variable:

```ts
// Workaround: cast state instead of declaring variable type
const initialState = {
  value: 0,
} as CounterState
```

### Use Typed Hooks in Components

In component files, import the pre-typed hooks instead of the standard hooks from React-Redux.

```tsx title="features/counter/Counter.tsx"
import React, { useState } from 'react'

// highlight-next-line
import { useAppSelector, useAppDispatch } from 'app/hooks'

import { decrement, increment } from './counterSlice'

export function Counter() {
  // highlight-start
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  // highlight-end

  // omit rendering logic
}
```

## What's Next?

See [the "Usage with TypeScript" page](../using-react-redux/usage-with-typescript.md) for extended details on how to use Redux Toolkit's APIs with TypeScript.

# Tutorial: Using the `connect` API

:::tip

We now recommend using [the React-Redux hooks API as the default](../api/hooks.md). However, the `connect` API still works fine.

This tutorial also shows some older practices we no longer recommend, like separating Redux logic into folders by type. We've kept this tutorial as-is for completeness, but recommend reading through [the "Redux Essentials" tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) and the [Redux Style Guide](https://redux.js.org/style-guide/style-guide) in the Redux docs for our current best practices.

We're working on a new tutorial that will introduce the hooks APIs. Until then, we suggest reading [**Redux Fundamentals, Part 5: UI and React**](https://redux.js.org/tutorials/fundamentals/part-5-ui-react) for a hooks tutorial.

:::

To see how to use React Redux in practice, we’ll show a step-by-step example by creating a todo list app.

## A Todo List Example

**Jump to**

- 🤞 [Just show me the code](https://codesandbox.io/s/9on71rvnyo)
- 👆 [Providing the store](#providing-the-store)
- ✌️ [Connecting the Component](#connecting-the-components)

**The React UI Components**

We have implemented our React UI components as follows:

- `TodoApp` is the entry component for our app. It renders the header, the `AddTodo`, `TodoList`, and `VisibilityFilters` components.
- `AddTodo` is the component that allows a user to input a todo item and add to the list upon clicking its “Add Todo” button:
  - It uses a controlled input that sets state upon `onChange`.
  - When the user clicks on the “Add Todo” button, it dispatches the action (that we will provide using React Redux) to add the todo to the store.
- `TodoList` is the component that renders the list of todos:
  - It renders the filtered list of todos when one of the `VisibilityFilters` is selected.
- `Todo` is the component that renders a single todo item:
  - It renders the todo content, and shows that a todo is completed by crossing it out.
  - It dispatches the action to toggle the todo's complete status upon `onClick`.
- `VisibilityFilters` renders a simple set of filters: _all_, _completed_, and _incomplete._ Clicking on each one of them filters the todos:
  - It accepts an `activeFilter` prop from the parent that indicates which filter is currently selected by the user. An active filter is rendered with an underscore.
  - It dispatches the `setFilter` action to update the selected filter.
- `constants` holds the constants data for our app.
- And finally `index` renders our app to the DOM.

<br />

**The Redux Store**

The Redux portion of the application has been set up using the [patterns recommended in the Redux docs](https://redux.js.org):

- Store
  - `todos`: A normalized reducer of todos. It contains a `byIds` map of all todos and a `allIds` that contains the list of all ids.
  - `visibilityFilters`: A simple string `all`, `completed`, or `incomplete`.
- Action Creators
  - `addTodo` creates the action to add todos. It takes a single string variable `content` and returns an `ADD_TODO` action with `payload` containing a self-incremented `id` and `content`
  - `toggleTodo` creates the action to toggle todos. It takes a single number variable `id` and returns a `TOGGLE_TODO` action with `payload` containing `id` only
  - `setFilter` creates the action to set the app’s active filter. It takes a single string variable `filter` and returns a `SET_FILTER` action with `payload` containing the `filter` itself
- Reducers
  - The `todos` reducer
    - Appends the `id` to its `allIds` field and sets the todo within its `byIds` field upon receiving the `ADD_TODO` action
    - Toggles the `completed` field for the todo upon receiving the `TOGGLE_TODO` action
  - The `visibilityFilters` reducer sets its slice of store to the new filter it receives from the `SET_FILTER` action payload
- Action Types
  - We use a file `actionTypes.js` to hold the constants of action types to be reused
- Selectors
  - `getTodoList` returns the `allIds` list from the `todos` store
  - `getTodoById` finds the todo in the store given by `id`
  - `getTodos` is slightly more complex. It takes all the `id`s from `allIds`, finds each todo in `byIds`, and returns the final array of todos
  - `getTodosByVisibilityFilter` filters the todos according to the visibility filter

You may check out [this CodeSandbox](https://codesandbox.io/s/6vwyqrpqk3) for the source code of the UI components and the unconnected Redux store described above.

<br />

We will now show how to connect this store to our app using React Redux.

### Providing the Store

First we need to make the `store` available to our app. To do this, we wrap our app with the `<Provider />` API provided by React Redux.

```jsx
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import TodoApp from './TodoApp'

import { Provider } from 'react-redux'
import store from './redux/store'

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>
)
```

Notice how our `<TodoApp />` is now wrapped with the `<Provider />` with `store` passed in as a prop.

![](https://i.imgur.com/LV0XvwA.png)

### Connecting the Components

React Redux provides a `connect` function for you to read values from the Redux store (and re-read the values when the store updates).

The `connect` function takes two arguments, both optional:

- `mapStateToProps`: called every time the store state changes. It receives the entire store state, and should return an object of data this component needs.

- `mapDispatchToProps`: this parameter can either be a function, or an object.
  - If it’s a function, it will be called once on component creation. It will receive `dispatch` as an argument, and should return an object full of functions that use `dispatch` to dispatch actions.
  - If it’s an object full of action creators, each action creator will be turned into a prop function that automatically dispatches its action when called. **Note**: We recommend using this “object shorthand” form.

Normally, you’ll call `connect` in this way:

```js
const mapStateToProps = (state, ownProps) => ({
  // ... computed data from state and optionally ownProps
})

const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(mapStateToProps, mapDispatchToProps)
// and that function returns the connected, wrapper component:
const ConnectedComponent = connectToStore(Component)

// We normally do both in one step, like this:
connect(mapStateToProps, mapDispatchToProps)(Component)
```

Let’s work on `<AddTodo />` first. It needs to trigger changes to the `store` to add new todos. Therefore, it needs to be able to `dispatch` actions to the store. Here’s how we do it.

Our `addTodo` action creator looks like this:

```js
// redux/actions.js
import { ADD_TODO } from './actionTypes'

let nextTodoId = 0
export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content,
  },
})

// ... other actions
```

By passing it to `connect`, our component receives it as a prop, and it will automatically dispatch the action when it’s called.

```js
// components/AddTodo.js

// ... other imports
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'

class AddTodo extends React.Component {
  // ... component implementation
}

export default connect(null, { addTodo })(AddTodo)
```

Notice now that `<AddTodo />` is wrapped with a parent component called `<Connect(AddTodo) />`. Meanwhile, `<AddTodo />` now gains one prop: the `addTodo` action.

![](https://i.imgur.com/u6aXbwl.png)

We also need to implement the `handleAddTodo` function to let it dispatch the `addTodo` action and reset the input

```jsx
// components/AddTodo.js

import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions'

class AddTodo extends React.Component {
  // ...

  handleAddTodo = () => {
    // dispatches actions to add todo
    this.props.addTodo(this.state.input)

    // sets state back to empty string
    this.setState({ input: '' })
  }

  render() {
    return (
      <div>
        <input
          onChange={(e) => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className="add-todo" onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </div>
    )
  }
}

export default connect(null, { addTodo })(AddTodo)
```

Now our `<AddTodo />` is connected to the store. When we add a todo it would dispatch an action to change the store. We are not seeing it in the app because the other components are not connected yet. If you have the Redux DevTools Extension hooked up, you should see the action being dispatched:

![](https://i.imgur.com/kHvkqhI.png)

You should also see that the store has changed accordingly:

![](https://i.imgur.com/yx27RVC.png)

The `<TodoList />` component is responsible for rendering the list of todos. Therefore, it needs to read data from the store. We enable it by calling `connect` with the `mapStateToProps` parameter, a function describing which part of the data we need from the store.

Our `<Todo />` component takes the todo item as props. We have this information from the `byIds` field of the `todos`. However, we also need the information from the `allIds` field of the store indicating which todos and in what order they should be rendered. Our `mapStateToProps` function may look like this:

```js
// components/TodoList.js

// ...other imports
import { connect } from "react-redux";

const TodoList = // ... UI component implementation

const mapStateToProps = state => {
  const { byIds, allIds } = state.todos || {};
  const todos =
    allIds && allIds.length
      ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
      : null;
  return { todos };
};

export default connect(mapStateToProps)(TodoList);
```

Luckily we have a selector that does exactly this. We may simply import the selector and use it here.

```js
// redux/selectors.js

export const getTodosState = (store) => store.todos

export const getTodoList = (store) =>
  getTodosState(store) ? getTodosState(store).allIds : []

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {}

export const getTodos = (store) =>
  getTodoList(store).map((id) => getTodoById(store, id))
```

```js
// components/TodoList.js

// ...other imports
import { connect } from "react-redux";
import { getTodos } from "../redux/selectors";

const TodoList = // ... UI component implementation

export default connect(state => ({ todos: getTodos(state) }))(TodoList);
```

We recommend encapsulating any complex lookups or computations of data in selector functions. In addition, you can further optimize the performance by using [Reselect](https://github.com/reduxjs/reselect) to write “memoized” selectors that can skip unnecessary work. (See [the Redux docs page on Computing Derived Data](https://redux.js.org/recipes/computing-derived-data#sharing-selectors-across-multiple-components) and the blog post [Idiomatic Redux: Using Reselect Selectors for Encapsulation and Performance](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/) for more information on why and how to use selector functions.)

Now that our `<TodoList />` is connected to the store. It should receive the list of todos, map over them, and pass each todo to the `<Todo />` component. `<Todo />` will in turn render them to the screen. Now try adding a todo. It should come up on our todo list!

![](https://i.imgur.com/N68xvrG.png)

We will connect more components. Before we do this, let’s pause and learn a bit more about `connect` first.

### Common ways of calling `connect`

Depending on what kind of components you are working with, there are different ways of calling `connect` , with the most common ones summarized as below:

|                               | Do Not Subscribe to the Store                  | Subscribe to the Store                                    |
| ----------------------------- | ---------------------------------------------- | --------------------------------------------------------- |
| Do Not Inject Action Creators | `connect()(Component)`                         | `connect(mapStateToProps)(Component)`                     |
| Inject Action Creators        | `connect(null, mapDispatchToProps)(Component)` | `connect(mapStateToProps, mapDispatchToProps)(Component)` |

#### Do not subscribe to the store and do not inject action creators

If you call `connect` without providing any arguments, your component will:

- _not_ re-render when the store changes
- receive `props.dispatch` that you may use to manually dispatch action

```js
// ... Component
export default connect()(Component) // Component will receive `dispatch` (just like our <TodoList />!)
```

#### Subscribe to the store and do not inject action creators

If you call `connect` with only `mapStateToProps`, your component will:

- subscribe to the values that `mapStateToProps` extracts from the store, and re-render only when those values have changed
- receive `props.dispatch` that you may use to manually dispatch action

```js
// ... Component
const mapStateToProps = (state) => state.partOfState
export default connect(mapStateToProps)(Component)
```

#### Do not subscribe to the store and inject action creators

If you call `connect` with only `mapDispatchToProps`, your component will:

- _not_ re-render when the store changes
- receive each of the action creators you inject with `mapDispatchToProps` as props and automatically dispatch the actions upon being called

```js
import { addTodo } from './actionCreators'
// ... Component
export default connect(null, { addTodo })(Component)
```

#### Subscribe to the store and inject action creators

If you call `connect` with both `mapStateToProps` and `mapDispatchToProps`, your component will:

- subscribe to the values that `mapStateToProps` extracts from the store, and re-render only when those values have changed
- receive all of the action creators you inject with `mapDispatchToProps` as props and automatically dispatch the actions upon being called.

```js
import * as actionCreators from './actionCreators'
// ... Component
const mapStateToProps = (state) => state.partOfState
export default connect(mapStateToProps, actionCreators)(Component)
```

These four cases cover the most basic usages of `connect`. To read more about `connect`, continue reading our [API section](../api/connect.md) that explains it in more detail.

<!-- TODO: Put up link to the page that further explains connect -->

---

Now let’s connect the rest of our `<TodoApp />`.

How should we implement the interaction of toggling todos? A keen reader might already have an answer. If you have your environment set up and have followed through up until this point, now is a good time to leave it aside and implement the feature by yourself. There would be no surprise that we connect our `<Todo />` to dispatch `toggleTodo` in a similar way:

```js
// components/Todo.js

// ... other imports
import { connect } from "react-redux";
import { toggleTodo } from "../redux/actions";

const Todo = // ... component implementation

export default connect(
  null,
  { toggleTodo }
)(Todo);
```

Now our todo’s can be toggled complete. We’re almost there!

![](https://i.imgur.com/4UBXYtj.png)

Finally, let’s implement our `VisibilityFilters` feature.

The `<VisibilityFilters />` component needs to be able to read from the store which filter is currently active, and dispatch actions to the store. Therefore, we need to pass both a `mapStateToProps` and `mapDispatchToProps`. The `mapStateToProps` here can be a simple accessor of the `visibilityFilter` state. And the `mapDispatchToProps` will contain the `setFilter` action creator.

```js
// components/VisibilityFilters.js

// ... other imports
import { connect } from "react-redux";
import { setFilter } from "../redux/actions";

const VisibilityFilters = // ... component implementation

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};
export default connect(
  mapStateToProps,
  { setFilter }
)(VisibilityFilters);
```

Meanwhile, we also need to update our `<TodoList />` component to filter todos according to the active filter. Previously the `mapStateToProps` we passed to the `<TodoList />` `connect` function call was simply the selector that selects the whole list of todos. Let’s write another selector to help filtering todos by their status.

```js
// redux/selectors.js

// ... other selectors
export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
  const allTodos = getTodos(store)
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter((todo) => todo.completed)
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter((todo) => !todo.completed)
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos
  }
}
```

And connecting to the store with the help of the selector:

```js
// components/TodoList.js

// ...

const mapStateToProps = (state) => {
  const { visibilityFilter } = state
  const todos = getTodosByVisibilityFilter(state, visibilityFilter)
  return { todos }
}

export default connect(mapStateToProps)(TodoList)
```

Now we've finished a very simple example of a todo app with React Redux. All our components are connected! Isn't that nice? 🎉🎊

![](https://i.imgur.com/ONqer2R.png)

## Links

- [Usage with React](https://redux.js.org/basics/usage-with-react)
- [Using the React Redux Bindings](https://blog.isquaredsoftware.com/presentations/workshops/redux-fundamentals/react-redux.html)
- [Higher Order Components in Depth](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e)
- [Computing Derived Data](https://redux.js.org/recipes/computing-derived-data#sharing-selectors-across-multiple-components)
- [Idiomatic Redux: Using Reselect Selectors for Encapsulation and Performance](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/)

## Get More Help

- [Reactiflux](https://www.reactiflux.com) Redux channel
- [StackOverflow](https://stackoverflow.com/questions/tagged/react-redux)
- [GitHub Issues](https://github.com/reduxjs/react-redux/issues/)

# Usage with TypeScript

As of React-Redux v8, React-Redux is fully written in TypeScript, and the types are included in the published package. The types also export some helpers to make it easier to write typesafe interfaces between your Redux store and your React components.

:::info

The recently updated `@types/react@18` major version has changed component definitions to remove having `children` as a prop by default. This causes errors if you have multiple copies of `@types/react` in your project. To fix this, tell your package manager to resolve `@types/react` to a single version. Details:

https://github.com/facebook/react/issues/24304#issuecomment-1094565891

:::

## Standard Redux Toolkit Project Setup with TypeScript

We assume that a typical Redux project is using Redux Toolkit and React Redux together.

[Redux Toolkit](https://redux-toolkit.js.org) (RTK) is the standard approach for writing modern Redux logic. RTK is already written in TypeScript, and its API is designed to provide a good experience for TypeScript usage.

The [Redux+TS template for Create-React-App](https://github.com/reduxjs/cra-template-redux-typescript) comes with a working example of these patterns already configured.

### Define Root State and Dispatch Types

Using [configureStore](https://redux-toolkit.js.org/api/configureStore) should not need any additional typings. You will, however, want to extract the `RootState` type and the `Dispatch` type so that they can be referenced as needed. Inferring these types from the store itself means that they correctly update as you add more state slices or modify middleware settings.

Since those are types, it's safe to export them directly from your store setup file such as `app/store.ts` and import them directly into other files.

```ts title="app/store.ts"
import { configureStore } from '@reduxjs/toolkit'
// ...

const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
})

// highlight-start
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// highlight-end
```

### Define Typed Hooks

While it's possible to import the `RootState` and `AppDispatch` types into each component, it's better to **create pre-typed versions of the `useDispatch` and `useSelector` hooks for usage in your application**. This is important for a couple reasons:

- For `useSelector`, it saves you the need to type `(state: RootState)` every time
- For `useDispatch`, the default `Dispatch` type does not know about thunks or other middleware. In order to correctly dispatch thunks, you need to use the specific customized `AppDispatch` type from the store that includes the thunk middleware types, and use that with `useDispatch`. Adding a pre-typed `useDispatch` hook keeps you from forgetting to import `AppDispatch` where it's needed.

Since these are actual variables, not types, it's important to define them in a separate file such as `app/hooks.ts`, not the store setup file. This allows you to import them into any component file that needs to use the hooks, and avoids potential circular import dependency issues.

```ts title="app/hooks.ts"
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// highlight-start
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// highlight-end
```

## Typing Hooks Manually

We recommend using the pre-typed `useAppSelector` and `useAppDispatch` hooks shown above. If you prefer not to use those, here is how to type the hooks by themselves.

### Typing the `useSelector` hook

When writing selector functions for use with `useSelector`, you should explicitly define the type of the `state` parameter. TS should be able to then infer the return type of the selector, which will be reused as the return type of the `useSelector` hook:

```ts
interface RootState {
  isOn: boolean
}

// TS infers type: (state: RootState) => boolean
const selectIsOn = (state: RootState) => state.isOn

// TS infers `isOn` is boolean
const isOn = useSelector(selectIsOn)
```

This can also be done inline as well:

```ts
const isOn = useSelector((state: RootState) => state.isOn)
```

### Typing the `useDispatch` hook

By default, the return value of `useDispatch` is the standard `Dispatch` type defined by the Redux core types, so no declarations are needed:

```ts
const dispatch = useDispatch()
```

If you have a customized version of the `Dispatch` type, you may use that type explicitly:

```ts
// store.ts
export type AppDispatch = typeof store.dispatch

// MyComponent.tsx
const dispatch: AppDispatch = useDispatch()
```

## Typing the `connect` higher order component

### Inferring The Connected Props Automatically

`connect` consists of two functions that are called sequentially. The first function accepts `mapState` and `mapDispatch` as arguments, and returns a second function. The second function accepts the component to be wrapped, and returns a new wrapper component that passes down the props from `mapState` and `mapDispatch`. Normally, both functions are called together, like `connect(mapState, mapDispatch)(MyComponent)`.

The package includes a helper type, `ConnectedProps`, that can extract the return types of `mapStateToProps` and `mapDispatchToProps` from the first function. This means that if you split the `connect` call into two steps, all of the "props from Redux" can be inferred automatically without having to write them by hand. While this approach may feel unusual if you've been using React-Redux for a while, it does simplify the type declarations considerably.

```ts
import { connect, ConnectedProps } from 'react-redux'

interface RootState {
  isOn: boolean
}

const mapState = (state: RootState) => ({
  isOn: state.isOn,
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
}

const connector = connect(mapState, mapDispatch)

// The inferred type will look like:
// {isOn: boolean, toggleOn: () => void}
type PropsFromRedux = ConnectedProps<typeof connector>
```

The return type of `ConnectedProps` can then be used to type your props object.

```tsx
interface Props extends PropsFromRedux {
  backgroundColor: string
}

const MyComponent = (props: Props) => (
  <div style={{ backgroundColor: props.backgroundColor }}>
    <button onClick={props.toggleOn}>
      Toggle is {props.isOn ? 'ON' : 'OFF'}
    </button>
  </div>
)

export default connector(MyComponent)
```

Because types can be defined in any order, you can still declare your component before declaring the connector if you want.

```tsx
// alternately, declare `type Props = PropsFromRedux & {backgroundColor: string}`
interface Props extends PropsFromRedux {
  backgroundColor: string;
}

const MyComponent = (props: Props) => /* same as above */

const connector = connect(/* same as above*/)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(MyComponent)
```

### Manually Typing `connect`

The `connect` higher-order component is somewhat complex to type, because there are 3 sources of props: `mapStateToProps`, `mapDispatchToProps`, and props passed in from the parent component. Here's a full example of what it looks like to do that manually.

```tsx
import { connect } from 'react-redux'

interface StateProps {
  isOn: boolean
}

interface DispatchProps {
  toggleOn: () => void
}

interface OwnProps {
  backgroundColor: string
}

type Props = StateProps & DispatchProps & OwnProps

const mapState = (state: RootState) => ({
  isOn: state.isOn,
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
}

const MyComponent = (props: Props) => (
  <div style={{ backgroundColor: props.backgroundColor }}>
    <button onClick={props.toggleOn}>
      Toggle is {props.isOn ? 'ON' : 'OFF'}
    </button>
  </div>
)

// Typical usage: `connect` is called after the component is defined
export default connect<StateProps, DispatchProps, OwnProps>(
  mapState,
  mapDispatch
)(MyComponent)
```

It is also possible to shorten this somewhat, by inferring the types of `mapState` and `mapDispatch`:

```ts
const mapState = (state: RootState) => ({
  isOn: state.isOn,
})

const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),
}

type StateProps = ReturnType<typeof mapState>
type DispatchProps = typeof mapDispatch

type Props = StateProps & DispatchProps & OwnProps
```

However, inferring the type of `mapDispatch` this way will break if it is defined as an object and also refers to thunks.

## Recommendations

The hooks API is generally simpler to use with static types. **If you're looking for the easiest solution for using static types with React-Redux, use the hooks API.**

If you're using `connect`, **we recommend using the `ConnectedProps<T>` approach for inferring the props from Redux**, as that requires the fewest explicit type declarations.

## Resources

For additional information, see these additional resources:

- [Redux docs: Usage with TypeScript](https://redux.js.org/recipes/usage-with-typescript): Examples of how to use Redux Toolkit, the Redux core, and React Redux with TypeScript
- [Redux Toolkit docs: TypeScript Quick start](https://redux-toolkit.js.org/tutorials/typescript): shows how to use RTK and the React-Redux hooks API with TypeScript
- [React+TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet): a comprehensive guide to using React with TypeScript
- [React + Redux in TypeScript Guide](https://github.com/piotrwitek/react-redux-typescript-guide): extensive information on patterns for using React and Redux with TypeScript

# Connect: Extracting Data with `mapStateToProps`

As the first argument passed in to `connect`, `mapStateToProps` is used for selecting the part of the data from the store that the connected component needs. It’s frequently referred to as just `mapState` for short.

- It is called every time the store state changes.
- It receives the entire store state, and should return an object of data this component needs.

## Defining `mapStateToProps`

`mapStateToProps` should be defined as a function:

```js
function mapStateToProps(state, ownProps?)
```

It should take a first argument called `state`, optionally a second argument called `ownProps`, and return a plain object containing the data that the connected component needs.

This function should be passed as the first argument to `connect`, and will be called every time when the Redux store state changes. If you do not wish to subscribe to the store, pass `null` or `undefined` to `connect` in place of `mapStateToProps`.

**It does not matter if a `mapStateToProps` function is written using the `function` keyword (`function mapState(state) { }` ) or as an arrow function (`const mapState = (state) => { }` )** - it will work the same either way.

### Arguments

1. **`state`**
2. **`ownProps` (optional)**

#### `state`

The first argument to a `mapStateToProps` function is the entire Redux store state (the same value returned by a call to `store.getState()`). Because of this, the first argument is traditionally just called `state`. (While you can give the argument any name you want, calling it `store` would be incorrect - it's the "state value", not the "store instance".)

The `mapStateToProps` function should always be written with at least `state` passed in.

```js
// TodoList.js

function mapStateToProps(state) {
  const { todos } = state
  return { todoList: todos.allIds }
}

export default connect(mapStateToProps)(TodoList)
```

#### `ownProps` (optional)

You may define the function with a second argument, `ownProps`, if your component needs the data from its own props to retrieve data from the store. This argument will contain all of the props given to the wrapper component that was generated by `connect`.

```js
// Todo.js

function mapStateToProps(state, ownProps) {
  const { visibilityFilter } = state
  // ownProps would look like { "id" : 123 }
  const { id } = ownProps
  const todo = getTodoById(state, id)

  // component receives additionally:
  return { todo, visibilityFilter }
}

// Later, in your application, a parent component renders:
;<ConnectedTodo id={123} />
// and your component receives props.id, props.todo, and props.visibilityFilter
```

You do not need to include values from `ownProps` in the object returned from `mapStateToProps`. `connect` will automatically merge those different prop sources into a final set of props.

### Return

Your `mapStateToProps` function should return a plain object that contains the data the component needs:

- Each field in the object will become a prop for your actual component
- The values in the fields will be used to determine if your component needs to re-render

For example:

```js
function mapStateToProps(state) {
  return {
    a: 42,
    todos: state.todos,
    filter: state.visibilityFilter,
  }
}

// component will receive: props.a, props.todos, and props.filter
```

> Note: In advanced scenarios where you need more control over the rendering performance, `mapStateToProps` can also return a function. In this case, that function will be used as the final `mapStateToProps` for a particular component instance. This allows you to do per-instance memoization. See the [Advanced Usage: Factory Functions](../api/connect.md) section of the docs for more details, as well as [PR #279](https://github.com/reduxjs/react-redux/pull/279) and the tests it adds. Most apps never need this.

## Usage Guidelines

### Let `mapStateToProps` Reshape the Data from the Store

`mapStateToProps` functions can, and should, do a lot more than just `return state.someSlice`. **They have the responsibility of "re-shaping" store data as needed for that component.** This may include returning a value as a specific prop name, combining pieces of data from different parts of the state tree, and transforming the store data in different ways.

### Use Selector Functions to Extract and Transform Data

We highly encourage the use of "selector" functions to help encapsulate the process of extracting values from specific locations in the state tree. Memoized selector functions also play a key role in improving application performance (see the following sections in this page and the [Advanced Usage: Computing Derived Data](https://redux.js.org/recipes/computing-derived-data) page for more details on why and how to use selectors.)

### `mapStateToProps` Functions Should Be Fast

Whenever the store changes, all of the `mapStateToProps` functions of all of the connected components will run. Because of this, your `mapStateToProps` functions should run as fast as possible. This also means that a slow `mapStateToProps` function can be a potential bottleneck for your application.

As part of the "re-shaping data" idea, `mapStateToProps` functions frequently need to transform data in various ways (such as filtering an array, mapping an array of IDs to their corresponding objects, or extracting plain JS values from Immutable.js objects). These transformations can often be expensive, both in terms of cost to execute the transformation, and whether the component re-renders as a result. If performance is a concern, ensure that these transformations are only run if the input values have changed.

### `mapStateToProps` Functions Should Be Pure and Synchronous

Much like a Redux reducer, a `mapStateToProps` function should always be 100% pure and synchronous. It should only take `state` (and `ownProps`) as arguments, and return the data the component needs as props without mutating those arguments. It should _not_ be used to trigger asynchronous behavior like AJAX calls for data fetching, and the functions should not be declared as `async`.

## `mapStateToProps` and Performance

### Return Values Determine If Your Component Re-Renders

React Redux internally implements the `shouldComponentUpdate` method such that the wrapper component re-renders precisely when the data your component needs has changed. By default, React Redux decides whether the contents of the object returned from `mapStateToProps` are different using `===` comparison (a "shallow equality" check) on each fields of the returned object. If any of the fields have changed, then your component will be re-rendered so it can receive the updated values as props. Note that returning a mutated object of the same reference is a common mistake that can result in your component not re-rendering when expected.

To summarize the behavior of the component wrapped by `connect` with `mapStateToProps` to extract data from the store:

|                              | `(state) => stateProps`                | `(state, ownProps) => stateProps`                                                            |
| ---------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| `mapStateToProps` runs when: | store `state` changes                  | store `state` changes <br /> or <br />any field of `ownProps` is different                   |
| component re-renders when:   | any field of `stateProps` is different | any field of `stateProps` is different <br /> or <br /> any field of `ownProps` is different |

### Only Return New Object References If Needed

React Redux does shallow comparisons to see if the `mapStateToProps` results have changed. It’s easy to accidentally return new object or array references every time, which would cause your component to re-render even if the data is actually the same.

Many common operations result in new object or array references being created:

- Creating new arrays with `someArray.map()` or `someArray.filter()`
- Merging arrays with `array.concat`
- Selecting portion of an array with `array.slice`
- Copying values with `Object.assign`
- Copying values with the spread operator `{ ...oldState, ...newData }`

Put these operations in [memoized selector functions](https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector) to ensure that they only run if the input values have changed. This will also ensure that if the input values _haven't_ changed, `mapStateToProps` will still return the same result values as before, and `connect` can skip re-rendering.

### Only Perform Expensive Operations When Data Changes

Transforming data can often be expensive (_and_ usually results in new object references being created). In order for your `mapStateToProps` function to be as fast as possible, you should only re-run these complex transformations when the relevant data has changed.

There are a few ways to approach this:

- Some transformations could be calculated in an action creator or reducer, and the transformed data could be kept in the store
- Transformations can also be done in a component's `render()` method
- If the transformation does need to be done in a `mapStateToProps` function, then we recommend using [memoized selector functions](https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector) to ensure the transformation is only run when the input values have changed.

#### Immutable.js Performance Concerns

Immutable.js author Lee Byron on Twitter [explicitly advises avoiding `toJS` when performance is a concern](https://twitter.com/leeb/status/746733697093668864?lang=en):

> Perf tip for #immutablejs: avoid .toJS() .toObject() and .toArray() all slow full-copy operations which render structural sharing useless.

There's several other performance concerns to take into consideration with Immutable.js - see the list of links at the end of this page for more information.

## Behavior and Gotchas

### `mapStateToProps` Will Not Run if the Store State is the Same

The wrapper component generated by `connect` subscribes to the Redux store. Every time an action is dispatched, it calls `store.getState()` and checks to see if `lastState === currentState`. If the two state values are identical by reference, then it will _not_ re-run your `mapStateToProps` function, because it assumes that the rest of the store state hasn't changed either.

The Redux `combineReducers` utility function tries to optimize for this. If none of the slice reducers returned a new value, then `combineReducers` returns the old state object instead of a new one. This means that mutation in a reducer can lead to the root state object not being updated, and thus the UI won't re-render.

### The Number of Declared Arguments Affects Behavior

With just `(state)`, the function runs whenever the root store state object is different. With `(state, ownProps)`, it runs any time the store state is different and ALSO whenever the wrapper props have changed.

This means that **you should not add the `ownProps` argument unless you actually need to use it**, or your `mapStateToProps` function will run more often than it needs to.

There are some edge cases around this behavior. **The number of mandatory arguments determines whether `mapStateToProps` will receive `ownProps`**.

If the formal definition of the function contains one mandatory parameter, `mapStateToProps` will _not_ receive `ownProps`:

```js
function mapStateToProps(state) {
  console.log(state) // state
  console.log(arguments[1]) // undefined
}
const mapStateToProps = (state, ownProps = {}) => {
  console.log(state) // state
  console.log(ownProps) // {}
}
```

It _will_ receive `ownProps` when the formal definition of the function contains zero or two mandatory parameters:

```js
function mapStateToProps(state, ownProps) {
  console.log(state) // state
  console.log(ownProps) // ownProps
}

function mapStateToProps() {
  console.log(arguments[0]) // state
  console.log(arguments[1]) // ownProps
}

function mapStateToProps(...args) {
  console.log(args[0]) // state
  console.log(args[1]) // ownProps
}
```

## Links and References

**Tutorials**

- [Practical Redux Series, Part 6: Connected Lists, Forms, and Performance](https://blog.isquaredsoftware.com/2017/01/practical-redux-part-6-connected-lists-forms-and-performance/)
- [Idiomatic Redux: Using Reselect Selectors for Encapsulation and Performance](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/)

**Performance**

- [Lee Byron's Tweet Suggesting to avoid `toJS`, `toArray` and `toObject` for Performance](https://twitter.com/leeb/status/746733697093668864)
- [Improving React and Redux performance with Reselect](https://rangle.io/blog/react-and-redux-performance-with-reselect/)
- [Immutable data performance links](https://github.com/markerikson/react-redux-links/blob/master/react-performance.md#immutable-data)

**Q&A**

- [Why Is My Component Re-Rendering Too Often?](https://redux.js.org/faq/react-redux#why-is-my-component-re-rendering-too-often)
- [Why isn't my component re-rendering, or my mapStateToProps running](https://redux.js.org/faq/react-redux#why-isnt-my-component-re-rendering-or-my-mapstatetoprops-running)
- [How can I speed up my mapStateToProps?](https://redux.js.org/faq/react-redux#how-can-i-speed-up-my-mapstatetoprops)
- [Should I only connect my top component, or can I connect multiple components in my tree?](https://redux.js.org/faq/react-redux#should-i-only-connect-my-top-component-or-can-i-connect-multiple-components-in-my-tree)


# Connect: Dispatching Actions with `mapDispatchToProps`

As the second argument passed in to `connect`, `mapDispatchToProps` is used for dispatching actions to the store.

`dispatch` is a function of the Redux store. You call `store.dispatch` to dispatch an action.
This is the only way to trigger a state change.

With React Redux, your components never access the store directly - `connect` does it for you.
React Redux gives you two ways to let components dispatch actions:

- By default, a connected component receives `props.dispatch` and can dispatch actions itself.
- `connect` can accept an argument called `mapDispatchToProps`, which lets you create functions that dispatch when called, and pass those functions as props to your component.

The `mapDispatchToProps` functions are normally referred to as `mapDispatch` for short, but the actual variable name used can be whatever you want.

## Approaches for Dispatching

### Default: `dispatch` as a Prop

If you don't specify the second argument to `connect()`, your component will receive `dispatch` by default. For example:

```js
connect()(MyComponent)
// which is equivalent with
connect(null, null)(MyComponent)

// or
connect(mapStateToProps /** no second argument */)(MyComponent)
```

Once you have connected your component in this way, your component receives `props.dispatch`. You may use it to dispatch actions to the store.

```js
function Counter({ count, dispatch }) {
  return (
    <div>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>reset</button>
    </div>
  )
}
```

### Providing A `mapDispatchToProps` Parameter

Providing a `mapDispatchToProps` allows you to specify which actions your component might need to dispatch. It lets you provide action dispatching functions as props. Therefore, instead of calling `props.dispatch(() => increment())`, you may call `props.increment()` directly. There are a few reasons why you might want to do that.

#### More Declarative

First, encapsulating the dispatch logic into function makes the implementation more declarative.
Dispatching an action and letting the Redux store handle the data flow is _how to_ implement the behavior, rather than _what_ it does.

A good example would be dispatching an action when a button is clicked. Connecting the button directly probably doesn't make sense conceptually, and neither does having the button reference `dispatch`.

```js
// button needs to be aware of "dispatch"
<button onClick={() => dispatch({ type: "SOMETHING" })} />

// button unaware of "dispatch",
<button onClick={doSomething} />
```

Once you've wrapped all our action creators with functions that dispatch the actions, the component is free of the need of `dispatch`.
Therefore, **if you define your own `mapDispatchToProps`, the connected component will no longer receive `dispatch`.**

#### Pass Down Action Dispatching Logic to ( Unconnected ) Child Components

In addition, you also gain the ability to pass down the action dispatching functions to child ( likely unconnected ) components.
This allows more components to dispatch actions, while keeping them "unaware" of Redux.

```jsx
// pass down toggleTodo to child component
// making Todo able to dispatch the toggleTodo action
const TodoList = ({ todos, toggleTodo }) => (
  <div>
    {todos.map((todo) => (
      <Todo todo={todo} onClick={toggleTodo} />
    ))}
  </div>
)
```

This is what React Redux’s `connect` does — it encapsulates the logic of talking to the Redux store and lets you not worry about it. And this is what you should totally make full use of in your implementation.

## Two Forms of `mapDispatchToProps`

The `mapDispatchToProps` parameter can be of two forms. While the function form allows more customization, the object form is easy to use.

- **Function form**: Allows more customization, gains access to `dispatch` and optionally `ownProps`
- **Object shorthand form**: More declarative and easier to use

> ⭐ **Note:** We recommend using the object form of `mapDispatchToProps` unless you specifically need to customize dispatching behavior in some way.

## Defining `mapDispatchToProps` As A Function

Defining `mapDispatchToProps` as a function gives you the most flexibility in customizing the functions your component receives, and how they dispatch actions.
You gain access to `dispatch` and `ownProps`.
You may use this chance to write customized functions to be called by your connected components.

### Arguments

1. **`dispatch`**
2. **`ownProps` (optional)**

**`dispatch`**

The `mapDispatchToProps` function will be called with `dispatch` as the first argument.
You will normally make use of this by returning new functions that call `dispatch()` inside themselves, and either pass in a plain action object directly or pass in the result of an action creator.

```js
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}
```

You will also likely want to forward arguments to your action creators:

```js
const mapDispatchToProps = (dispatch) => {
  return {
    // explicitly forwarding arguments
    onClick: (event) => dispatch(trackClick(event)),

    // implicitly forwarding arguments
    onReceiveImpressions: (...impressions) =>
      dispatch(trackImpressions(impressions)),
  }
}
```

**`ownProps` ( optional )**

If your `mapDispatchToProps` function is declared as taking two parameters, it will be called with `dispatch` as the first parameter and the `props` passed to the connected component as the second parameter, and will be re-invoked whenever the connected component receives new props.

This means, instead of re-binding new `props` to action dispatchers upon component re-rendering, you may do so when your component's `props` change.

**Binds on component mount**

```js
render() {
  return <button onClick={() => this.props.toggleTodo(this.props.todoId)} />
}

const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: todoId => dispatch(toggleTodo(todoId))
  }
}
```

**Binds on `props` change**

```js
render() {
  return <button onClick={() => this.props.toggleTodo()} />
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleTodo: () => dispatch(toggleTodo(ownProps.todoId))
  }
}
```

### Return

Your `mapDispatchToProps` function should return a plain object:

- Each field in the object will become a separate prop for your own component, and the value should normally be a function that dispatches an action when called.
- If you use action creators ( as oppose to plain object actions ) inside `dispatch`, it is a convention to simply name the field key the same name as the action creator:

```js
const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching actions returned by action creators
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
  }
}
```

The return of the `mapDispatchToProps` function will be merged to your connected component as props. You may call them directly to dispatch its action.

```js
function Counter({ count, increment, decrement, reset }) {
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}
```

(Full code of the Counter example is [in this CodeSandbox](https://codesandbox.io/s/yv6kqo1yw9))

### Defining the `mapDispatchToProps` Function with `bindActionCreators`

Wrapping these functions by hand is tedious, so Redux provides a function to simplify that.

> `bindActionCreators` turns an object whose values are [action creators](https://redux.js.org/glossary#action-creator), into an object with the same keys, but with every action creator wrapped into a [`dispatch`](https://redux.js.org/api/store#dispatch) call so they may be invoked directly. See [Redux Docs on `bindActionCreators`](https://redux.js.org/api/bindactioncreators)

`bindActionCreators` accepts two parameters:

1. A **`function`** (an action creator) or an **`object`** (each field an action creator)
2. `dispatch`

The wrapper functions generated by `bindActionCreators` will automatically forward all of their arguments, so you don't need to do that by hand.

```js
import { bindActionCreators } from 'redux'

const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })

// binding an action creator
// returns (...args) => dispatch(increment(...args))
const boundIncrement = bindActionCreators(increment, dispatch)

// binding an object full of action creators
const boundActionCreators = bindActionCreators(
  { increment, decrement, reset },
  dispatch
)
// returns
// {
//   increment: (...args) => dispatch(increment(...args)),
//   decrement: (...args) => dispatch(decrement(...args)),
//   reset: (...args) => dispatch(reset(...args)),
// }
```

To use `bindActionCreators` in our `mapDispatchToProps` function:

```js
import { bindActionCreators } from 'redux'
// ...

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ increment, decrement, reset }, dispatch)
}

// component receives props.increment, props.decrement, props.reset
connect(null, mapDispatchToProps)(Counter)
```

### Manually Injecting `dispatch`

If the `mapDispatchToProps` argument is supplied, the component will no longer receive the default `dispatch`. You may bring it back by adding it manually to the return of your `mapDispatchToProps`, although most of the time you shouldn’t need to do this:

```js
import { bindActionCreators } from 'redux'
// ...

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ increment, decrement, reset }, dispatch),
  }
}
```

## Defining `mapDispatchToProps` As An Object

You’ve seen that the setup for dispatching Redux actions in a React component follows a very similar process: define an action creator, wrap it in another function that looks like `(…args) => dispatch(actionCreator(…args))`, and pass that wrapper function as a prop to your component.

Because this is so common, `connect` supports an “object shorthand” form for the `mapDispatchToProps` argument: if you pass an object full of action creators instead of a function, `connect` will automatically call `bindActionCreators` for you internally.

**We recommend always using the “object shorthand” form of `mapDispatchToProps`, unless you have a specific reason to customize the dispatching behavior.**

Note that:

- Each field of the `mapDispatchToProps` object is assumed to be an action creator
- Your component will no longer receive `dispatch` as a prop

```js
// React Redux does this for you automatically:
;(dispatch) => bindActionCreators(mapDispatchToProps, dispatch)
```

Therefore, our `mapDispatchToProps` can simply be:

```js
const mapDispatchToProps = {
  increment,
  decrement,
  reset,
}
```

Since the actual name of the variable is up to you, you might want to give it a name like `actionCreators`, or even define the object inline in the call to `connect`:

```js
import { increment, decrement, reset } from './counterActions'

const actionCreators = {
  increment,
  decrement,
  reset,
}

export default connect(mapState, actionCreators)(Counter)

// or
export default connect(mapState, { increment, decrement, reset })(Counter)
```

## Common Problems

### Why is my component not receiving `dispatch`?

Also known as

```js
TypeError: this.props.dispatch is not a function
```

This is a common error that happens when you try to call `this.props.dispatch` , but `dispatch` is not injected to your component.

`dispatch` is injected to your component _only_ when:

**1. You do not provide `mapDispatchToProps`**

The default `mapDispatchToProps` is simply `dispatch => ({ dispatch })`. If you do not provide `mapDispatchToProps`, `dispatch` will be provided as mentioned above.

In another words, if you do:

```js
// component receives `dispatch`
connect(mapStateToProps /** no second argument*/)(Component)
```

**2. Your customized `mapDispatchToProps` function return specifically contains `dispatch`**

You may bring back `dispatch` by providing your customized `mapDispatchToProps` function:

```js
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement()),
    reset: () => dispatch(reset()),
    dispatch,
  }
}
```

Or alternatively, with `bindActionCreators`:

```js
import { bindActionCreators } from 'redux'

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ increment, decrement, reset }, dispatch),
  }
}
```

See [this error in action in Redux’s GitHub issue #255](https://github.com/reduxjs/react-redux/issues/255).

There are discussions regarding whether to provide `dispatch` to your components when you specify `mapDispatchToProps` ( [Dan Abramov’s response to #255](https://github.com/reduxjs/react-redux/issues/255#issuecomment-172089874) ). You may read them for further understanding of the current implementation intention.

### Can I `mapDispatchToProps` without `mapStateToProps` in Redux?

Yes. You can skip the first parameter by passing `undefined` or `null`. Your component will not subscribe to the store, and will still receive the dispatch props defined by `mapDispatchToProps`.

```js
connect(null, mapDispatchToProps)(MyComponent)
```

### Can I call `store.dispatch`?

It's an anti-pattern to interact with the store directly in a React component, whether it's an explicit import of the store or accessing it via context (see the [Redux FAQ entry on store setup](https://redux.js.org/faq/storesetup#can-or-should-i-create-multiple-stores-can-i-import-my-store-directly-and-use-it-in-components-myself) for more details). Let React Redux’s `connect` handle the access to the store, and use the `dispatch` it passes to the props to dispatch actions.

## Links and References

**Tutorials**

- [You Might Not Need the `mapDispatchToProps` Function](https://daveceddia.com/redux-mapdispatchtoprops-object-form/)

**Related Docs**

- [Redux Doc on `bindActionCreators`](https://redux.js.org/api/bindactioncreators)

**Q&A**

- [How to get simple dispatch from `this.props` using connect with Redux?](https://stackoverflow.com/questions/34458261/how-to-get-simple-dispatch-from-this-props-using-connect-w-redux)
- [`this.props.dispatch` is `undefined` if using `mapDispatchToProps`](https://github.com/reduxjs/react-redux/issues/255)
- [Do not call `store.dispatch`, call `this.props.dispatch` injected by `connect` instead](https://github.com/reduxjs/redux/issues/916)
- [Can I `mapDispatchToProps` without `mapStateToProps` in Redux?](https://stackoverflow.com/questions/47657365/can-i-mapdispatchtoprops-without-mapstatetoprops-in-redux)
- [Redux Doc FAQ: React Redux](https://redux.js.org/faq/reactredux)


# Accessing the Store

React Redux provides APIs that allow your components to dispatch actions and subscribe to data updates from the store.

As part of that, React Redux abstracts away the details of which store you are using, and the exact details of how that
store interaction is handled. In typical usage, your own components should never need to care about those details, and
won't ever reference the store directly. React Redux also internally handles the details of how the store and state are
propagated to connected components, so that this works as expected by default.

However, there may be certain use cases where you may need to customize how the store and state are propagated to
connected components, or access the store directly. Here are some examples of how to do this.

## Understanding Context Usage

Internally, React Redux uses [React's "context" feature](https://reactjs.org/docs/context.html) to make the
Redux store accessible to deeply nested connected components. As of React Redux version 6, this is normally handled
by a single default context object instance generated by `React.createContext()`, called `ReactReduxContext`.

React Redux's `<Provider>` component uses `<ReactReduxContext.Provider>` to put the Redux store and the current store
state into context, and `connect` uses `<ReactReduxContext.Consumer>` to read those values and handle updates.

## Using the `useStore` Hook

The [`useStore` hook](../api/hooks.md#useStore) returns the current store instance from the default `ReactReduxContext`. If you truly need to access the store, this is the recommended approach.

## Providing Custom Context

Instead of using the default context instance from React Redux, you may supply your own custom context instance.

```jsx
<Provider context={MyContext} store={store}>
  <App />
</Provider>
```

If you supply a custom context, React Redux will use that context instance instead of the one it creates and exports by default.

After you’ve supplied the custom context to `<Provider />`, you will need to supply this context instance to all of your connected components that are expected to connect to the same store:

```js
// You can pass the context as an option to connect
export default connect(
  mapState,
  mapDispatch,
  null,
  { context: MyContext }
)(MyComponent)

// or, call connect as normal to start
const ConnectedComponent = connect(
  mapState,
  mapDispatch
)(MyComponent)

// Later, pass the custom context as a prop to the connected component
<ConnectedComponent context={MyContext} />
```

The following runtime error occurs when React Redux does not find a store in the context it is looking. For example:

- You provided a custom context instance to `<Provider />`, but did not provide the same instance (or did not provide any) to your connected components.
- You provided a custom context to your connected component, but did not provide the same instance (or did not provide any) to `<Provider />`.

> Invariant Violation
>
> Could not find "store" in the context of "Connect(MyComponent)". Either wrap the root component in a `<Provider>`, or pass a custom React context provider to `<Provider>` and the corresponding React context consumer to Connect(Todo) in connect options.

### Custom Context and the hooks API

To access the custom context via the hooks API, you can create custom hooks via the [hook creator functions](../api/hooks.md#custom-context).

## Multiple Stores

[Redux was designed to use a single store](https://redux.js.org/api/store#a-note-for-flux-users).
However, if you are in an unavoidable position of needing to use multiple stores, as of v6 you may do so by providing (multiple) custom contexts.
This also provides a natural isolation of the stores as they live in separate context instances.

```js
// a naive example
const ContextA = React.createContext();
const ContextB = React.createContext();

// assuming reducerA and reducerB are proper reducer functions
const storeA = createStore(reducerA);
const storeB = createStore(reducerB);

// supply the context instances to Provider
function App() {
  return (
    <Provider store={storeA} context={ContextA} />
      <Provider store={storeB} context={ContextB}>
        <RootModule />
      </Provider>
    </Provider>
  );
}

// fetch the corresponding store with connected components
// you need to use the correct context
connect(mapStateA, null, null, { context: ContextA })(MyComponentA)

// You may also pass the alternate context instance directly to the connected component instead
<ConnectedMyComponentA context={ContextA} />

// it is possible to chain connect()
// in this case MyComponent will receive merged props from both stores
compose(
  connect(mapStateA, null, null, { context: ContextA }),
  connect(mapStateB, null, null, { context: ContextB })
)(MyComponent);
```

## Using `ReactReduxContext` Directly

In rare cases, you may need to access the Redux store directly in your own components. This can be done by rendering
the appropriate context consumer yourself, and accessing the `store` field out of the context value.

:::caution

This is **_not_ considered part of the React Redux public API, and may break without notice**. We do recognize
that the community has use cases where this is necessary, and will try to make it possible for users to build additional
functionality on top of React Redux, but our specific use of context is considered an implementation detail.
If you have additional use cases that are not sufficiently covered by the current APIs, please file an issue to discuss
possible API improvements.

:::

```jsx
import { ReactReduxContext } from 'react-redux'

// Somewhere inside of a <Provider>
function MyConnectedComponent() {
  // Access the store via the `useContext` hook
  const { store } = useContext(ReactReduxContext)

  // alternately, use the render props form of the context
  /*
  return (
    <ReactReduxContext.Consumer>
      {({ store }) => {
        // do something useful with the store, like passing it to a child
        // component where it can be used in lifecycle methods
      }}
    </ReactReduxContext.Consumer>
  )
  */
}
```

## Further Resources

- CodeSandbox example: [A reading list app with theme using a separate store](https://codesandbox.io/s/92pm9n2kl4), implemented by providing (multiple) custom context(s).
- Related issues:
  - [#1132: Update docs for using a different store key](https://github.com/reduxjs/react-redux/issues/1132)
  - [#1126: `<Provider>` misses state changes that occur between when its constructor runs and when it mounts](https://github.com/reduxjs/react-redux/issues/1126)


# `Provider`

## Overview

The `<Provider>` component makes the Redux `store` available to any nested components that need to access the Redux store.

Since any React component in a React Redux app can be connected to the store, most applications will render a `<Provider>` at the top level, with the entire app’s component tree inside of it.

The [Hooks](./hooks.md) and [`connect`](./connect.md) APIs can then access the provided store instance via React's Context mechanism.

### Props

```ts
interface ProviderProps<A extends Action = AnyAction, S = any> {
  /**
   * The single Redux store in your application.
   */
  store: Store<S, A>

  /**
   * An optional server state snapshot. Will be used during initial hydration render
   * if available, to ensure that the UI output is consistent with the HTML generated on the server.
   * New in 8.0
   */
  serverState?: S

  /**
   * Optional context to be used internally in react-redux. Use React.createContext()
   * to create a context to be used.
   * If this is used, you'll need to customize `connect` by supplying the same
   * context provided to the Provider.
   * Initial value doesn't matter, as it is overwritten with the internal state of Provider.
   */
  context?: Context<ReactReduxContextValue<S, A>>

  /** The top-level React elements in your component tree, such as `<App />` **/
  children: ReactNode
}
```

Typically, you only need to pass `<Provider store={store}>`.

You may provide a context instance. If you do so, you will need to provide the same context instance to all of your connected components as well. Failure to provide the correct context results in this runtime error:

> Invariant Violation
>
> Could not find "store" in the context of "Connect(MyComponent)". Either wrap the root component in a `<Provider>`, or pass a custom React context provider to `<Provider>` and the corresponding React context consumer to Connect(Todo) in connect options.

## React 18 SSR Usage

As of React-Redux v8, `<Provider>` now accepts a `serverState` prop for use in SSR hydration scenarios. This is necessary if you are calling `hydrateRoot` in order to avoid hydration mismatches.

You should pass the entire serialized state from the server as the `serverState` prop, and React will use this state for the initial hydration render. After that, it will apply any updates from changes that occurred on the client during the setup process.

## Examples

### Basic Usage

In the example below, the `<App />` component is our root-level component. This means it’s at the very top of our component hierarchy.

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { App } from './App'
import createStore from './createReduxStore'

const store = createStore()

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

### React 18 SSR Hydration

In this example, the client has received HTML rendered by the server, as well as a serialized Redux state attached to `window`. The serialized state is used to both pre-fill the store's contents, _and_ passed as the `serverState` prop to `<Provider>`

```tsx title="src/index.ts"
import { hydrateRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const preloadedState = window.__PRELOADED_STATE__

const clientStore = configureStore({
  reducer: rootReducer,
  preloadedState,
})

hydrateRoot(
  document.getElementById('root'),
  <Provider store={clientStore} serverState={preloadedState}>
    <App />
  </Provider>
)
```

# Hooks

React's new ["hooks" APIs](https://reactjs.org/docs/hooks-intro.html) give function components the ability to use local component state, execute side effects, and more. React also lets us write [custom hooks](https://reactjs.org/docs/hooks-custom.html), which let us extract reusable hooks to add our own behavior on top of React's built-in hooks.

React Redux includes its own custom hook APIs, which allow your React components to subscribe to the Redux store and dispatch actions.

:::tip

**We recommend using the React-Redux hooks API as the default approach in your React components.**

The existing `connect` API still works and will continue to be supported, but the hooks API is simpler and works better with TypeScript.

:::

These hooks were first added in v7.1.0.

## Using Hooks in a React Redux App

As with `connect()`, you should start by wrapping your entire application in a `<Provider>` component to make the store available throughout the component tree:

```jsx
const store = createStore(rootReducer)

// As of React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

From there, you may import any of the listed React Redux hooks APIs and use them within your function components.

## `useSelector()`

```js
const result: any = useSelector(selector: Function, equalityFn?: Function)
```

Allows you to extract data from the Redux store state, using a selector function.

:::info

The selector function should be [pure](https://en.wikipedia.org/wiki/Pure_function) since it is potentially executed multiple times and at arbitrary points in time.

:::

The selector is approximately equivalent to the [`mapStateToProps` argument to `connect`](../using-react-redux/connect-extracting-data-with-mapStateToProps.md) conceptually. The selector will be called with the entire Redux store state as its only argument. The selector will be run whenever the function component renders (unless its reference hasn't changed since a previous render of the component so that a cached result can be returned by the hook without re-running the selector). `useSelector()` will also subscribe to the Redux store, and run your selector whenever an action is dispatched.

However, there are some differences between the selectors passed to `useSelector()` and a `mapState` function:

- The selector may return any value as a result, not just an object. The return value of the selector will be used as the return value of the `useSelector()` hook.
- When an action is dispatched, `useSelector()` will do a reference comparison of the previous selector result value and the current result value. If they are different, the component will be forced to re-render. If they are the same, the component will not re-render.
- The selector function does _not_ receive an `ownProps` argument. However, props can be used through closure (see the examples below) or by using a curried selector.
- Extra care must be taken when using memoizing selectors (see examples below for more details).
- `useSelector()` uses strict `===` reference equality checks by default, not shallow equality (see the following section for more details).

:::info

There are potential edge cases with using props in selectors that may cause issues. See the [Usage Warnings](#usage-warnings) section of this page for further details.

:::

You may call `useSelector()` multiple times within a single function component. Each call to `useSelector()` creates an individual subscription to the Redux store. Because of the React update batching behavior used in React Redux v7, a dispatched action that causes multiple `useSelector()`s in the same component to return new values _should_ only result in a single re-render.

### Equality Comparisons and Updates

When the function component renders, the provided selector function will be called and its result will be returned
from the `useSelector()` hook. (A cached result may be returned by the hook without re-running the selector if it's the same function reference as on a previous render of the component.)

However, when an action is dispatched to the Redux store, `useSelector()` only forces a re-render if the selector result
appears to be different than the last result. The default comparison is a strict `===` reference
comparison. This is different than `connect()`, which uses shallow equality checks on the results of `mapState` calls
to determine if re-rendering is needed. This has several implications on how you should use `useSelector()`.

With `mapState`, all individual fields were returned in a combined object. It didn't matter if the return object was
a new reference or not - `connect()` just compared the individual fields. With `useSelector()`, returning a new object
every time will _always_ force a re-render by default. If you want to retrieve multiple values from the store, you can:

- Call `useSelector()` multiple times, with each call returning a single field value
- Use Reselect or a similar library to create a memoized selector that returns multiple values in one object, but
  only returns a new object when one of the values has changed.
- Use the `shallowEqual` function from React-Redux as the `equalityFn` argument to `useSelector()`, like:

```js
import { shallowEqual, useSelector } from 'react-redux'

// later
const selectedData = useSelector(selectorReturningObject, shallowEqual)
```

The optional comparison function also enables using something like Lodash's `_.isEqual()` or Immutable.js's comparison capabilities.

### `useSelector` Examples

Basic usage:

```jsx
import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector((state) => state.counter)
  return <div>{counter}</div>
}
```

Using props via closure to determine what to extract:

```jsx
import React from 'react'
import { useSelector } from 'react-redux'

export const TodoListItem = (props) => {
  const todo = useSelector((state) => state.todos[props.id])
  return <div>{todo.text}</div>
}
```

#### Using memoizing selectors

When using `useSelector` with an inline selector as shown above, a new instance of the selector is created whenever the component is rendered. This works as long as the selector does not maintain any state. However, memoizing selectors (e.g. created via `createSelector` from `reselect`) do have internal state, and therefore care must be taken when using them. Below you can find typical usage scenarios for memoizing selectors.

When the selector does only depend on the state, simply ensure that it is declared outside of the component so that the same selector instance is used for each render:

```jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectNumCompletedTodos = createSelector(
  (state) => state.todos,
  (todos) => todos.filter((todo) => todo.completed).length
)

export const CompletedTodosCounter = () => {
  const numCompletedTodos = useSelector(selectNumCompletedTodos)
  return <div>{numCompletedTodos}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of completed todos:</span>
      <CompletedTodosCounter />
    </>
  )
}
```

The same is true if the selector depends on the component's props, but will only ever be used in a single instance of a single component:

```jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectCompletedTodosCount = createSelector(
  (state) => state.todos,
  (_, completed) => completed,
  (todos, completed) =>
    todos.filter((todo) => todo.completed === completed).length
)

export const CompletedTodosCount = ({ completed }) => {
  const matchingCount = useSelector((state) =>
    selectCompletedTodosCount(state, completed)
  )

  return <div>{matchingCount}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <CompletedTodosCount completed={true} />
    </>
  )
}
```

However, when the selector is used in multiple component instances and depends on the component's props, you need to ensure that each component instance gets its own selector instance (see [here](https://github.com/reduxjs/reselect#q-can-i-share-a-selector-across-multiple-component-instances) for a more thorough explanation of why this is necessary):

```jsx
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const makeSelectCompletedTodosCount = () =>
  createSelector(
    (state) => state.todos,
    (_, completed) => completed,
    (todos, completed) =>
      todos.filter((todo) => todo.completed === completed).length
  )

export const CompletedTodosCount = ({ completed }) => {
  const selectCompletedTodosCount = useMemo(makeSelectCompletedTodosCount, [])

  const matchingCount = useSelector((state) =>
    selectCompletedTodosCount(state, completed)
  )

  return <div>{matchingCount}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <CompletedTodosCount completed={true} />
      <span>Number of unfinished todos:</span>
      <CompletedTodosCount completed={false} />
    </>
  )
}
```

## `useDispatch()`

```js
const dispatch = useDispatch()
```

This hook returns a reference to the `dispatch` function from the Redux store. You may use it to dispatch actions as needed.

#### Examples

```jsx
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
```

When passing a callback using `dispatch` to a child component, you may sometimes want to memoize it with [`useCallback`](https://reactjs.org/docs/hooks-reference.html#usecallback). _If_ the child component is trying to optimize render behavior using `React.memo()` or similar, this avoids unnecessary rendering of child components due to the changed callback reference.

```jsx
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  )
}

export const MyIncrementButton = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
))
```

:::info

The `dispatch` function reference will be stable as long as the same store instance is being passed to the `<Provider>`.
Normally, that store instance never changes in an application.

However, the React hooks lint rules do not know that `dispatch` should be stable, and will warn that the `dispatch` variable
should be added to dependency arrays for `useEffect` and `useCallback`. The simplest solution is to do just that:

```js
export const Todos = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
    // highlight-start
    // Safe to add dispatch to the dependencies array
  }, [dispatch])
  // highlight-end
}
```

:::

## `useStore()`

```js
const store = useStore()
```

This hook returns a reference to the same Redux store that was passed in to the `<Provider>` component.

This hook should probably not be used frequently. Prefer `useSelector()` as your primary choice. However, this may be useful for less common scenarios that do require access to the store, such as replacing reducers.

#### Examples

```js
import React from 'react'
import { useStore } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const store = useStore()

  // EXAMPLE ONLY! Do not do this in a real app.
  // The component will not automatically update if the store state changes
  return <div>{store.getState()}</div>
}
```

## Custom context

The `<Provider>` component allows you to specify an alternate context via the `context` prop. This is useful if you're building a complex reusable component, and you don't want your store to collide with any Redux store your consumers' applications might use.

To access an alternate context via the hooks API, use the hook creator functions:

```js
import React from 'react'
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux'

const MyContext = React.createContext(null)

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)

const myStore = createStore(rootReducer)

export function MyProvider({ children }) {
  return (
    <Provider context={MyContext} store={myStore}>
      {children}
    </Provider>
  )
}
```

## Usage Warnings

### Stale Props and "Zombie Children"

:::info

The React-Redux hooks API has been production-ready since we released it in v7.1.0, and **we recommend using the hooks API as the default approach in your components**. However, there are a couple of edge cases that can occur, and **we're documenting those so that you can be aware of them**.

In practice, these are a rare concern - we've received far more comments about these being in the docs than actual reports of these being a real problem in an app.

:::

One of the most difficult aspects of React Redux's implementation is ensuring that if your `mapStateToProps` function is defined as `(state, ownProps)`, it will be called with the "latest" props every time. Up through version 4, there were recurring bugs reported involving edge case situations, such as errors thrown from a `mapState` function for a list item whose data had just been deleted.

Starting with version 5, React Redux has attempted to guarantee that consistency with `ownProps`. In version 7, that is implemented using a custom `Subscription` class internally in `connect()`, which forms a nested hierarchy. This ensures that connected components lower in the tree will only receive store update notifications once the nearest connected ancestor has been updated. However, this relies on each `connect()` instance overriding part of the internal React context, supplying its own unique `Subscription` instance to form that nesting, and rendering the `<ReactReduxContext.Provider>` with that new context value.

With hooks, there is no way to render a context provider, which means there's also no nested hierarchy of subscriptions. Because of this, the "stale props" and "zombie child" issues may potentially re-occur in an app that relies on using hooks instead of `connect()`.

Specifically, "stale props" means any case where:

- a selector function relies on this component's props to extract data
- a parent component _would_ re-render and pass down new props as a result of an action
- but this component's selector function executes before this component has had a chance to re-render with those new props

Depending on what props were used and what the current store state is, this _may_ result in incorrect data being returned from the selector, or even an error being thrown.

"Zombie child" refers specifically to the case where:

- Multiple nested connected components are mounted in a first pass, causing a child component to subscribe to the store before its parent
- An action is dispatched that deletes data from the store, such as a todo item
- The parent component _would_ stop rendering that child as a result
- However, because the child subscribed first, its subscription runs before the parent stops rendering it. When it reads a value from the store based on props, that data no longer exists, and if the extraction logic is not careful, this may result in an error being thrown.

`useSelector()` tries to deal with this by catching all errors that are thrown when the selector is executed due to a store update (but not when it is executed during rendering). When an error occurs, the component will be forced to render, at which point the selector is executed again. This works as long as the selector is a pure function and you do not depend on the selector throwing errors.

If you prefer to deal with this issue yourself, here are some possible options for avoiding these problems altogether with `useSelector()`:

- Don't rely on props in your selector function for extracting data
- In cases where you do rely on props in your selector function _and_ those props may change over time, _or_ the data you're extracting may be based on items that can be deleted, try writing the selector functions defensively. Don't just reach straight into `state.todos[props.id].name` - read `state.todos[props.id]` first, and verify that it exists before trying to read `todo.name`.
- Because `connect` adds the necessary `Subscription` to the context provider and delays evaluating child subscriptions until the connected component has re-rendered, putting a connected component in the component tree just above the component using `useSelector` will prevent these issues as long as the connected component gets re-rendered due to the same store update as the hooks component.

:::info

For a longer description of these scenarios, see:

- ["Stale props and zombie children in Redux" by Kai Hao](https://kaihao.dev/posts/Stale-props-and-zombie-children-in-Redux)
- [A chat log that describes the problems in more detail](https://gist.github.com/markerikson/faac6ae4aca7b82a058e13216a7888ec)
- [issue #1179](https://github.com/reduxjs/react-redux/issues/1179)

:::

### Performance

As mentioned earlier, by default `useSelector()` will do a reference equality comparison of the selected value when running the selector function after an action is dispatched, and will only cause the component to re-render if the selected value changed. However, unlike `connect()`, `useSelector()` does not prevent the component from re-rendering due to its parent re-rendering, even if the component's props did not change.

If further performance optimizations are necessary, you may consider wrapping your function component in `React.memo()`:

```jsx
const CounterComponent = ({ name }) => {
  const counter = useSelector((state) => state.counter)
  return (
    <div>
      {name}: {counter}
    </div>
  )
}

export const MemoizedCounterComponent = React.memo(CounterComponent)
```

## Hooks Recipes

We've pared down our hooks API from the original alpha release, focusing on a more minimal set of API primitives.
However, you may still wish to use some of the approaches we tried in your own apps. These examples should be ready
to copy and paste into your own codebase.

### Recipe: `useActions()`

This hook was in our original alpha release, but removed in `v7.1.0-alpha.4`, based on [Dan Abramov's suggestion](https://github.com/reduxjs/react-redux/issues/1252#issuecomment-488160930).
That suggestion was based on "binding action creators" not being as useful in a hooks-based use case, and causing too
much conceptual overhead and syntactic complexity.

You should probably prefer to call the [`useDispatch`](#usedispatch) hook in your components to retrieve a reference to `dispatch`,
and manually call `dispatch(someActionCreator())` in callbacks and effects as needed. You may also use the Redux
[`bindActionCreators`](https://redux.js.org/api/bindactioncreators) function in your own code to bind action creators,
or "manually" bind them like `const boundAddTodo = (text) => dispatch(addTodo(text))`.

However, if you'd like to still use this hook yourself, here's a copy-pastable version that supports passing in action
creators as a single function, an array, or an object.

```js
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

export function useActions(actions, deps) {
  const dispatch = useDispatch()
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch))
      }
      return bindActionCreators(actions, dispatch)
    },
    deps ? [dispatch, ...deps] : [dispatch]
  )
}
```

### Recipe: `useShallowEqualSelector()`

```js
import { useSelector, shallowEqual } from 'react-redux'

export function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual)
}
```

### Additional considerations when using hooks

There are some architectural trade offs to take into consideration when deciding whether to use hooks or not. Mark Erikson summarizes these nicely in his two blog posts [Thoughts on React Hooks, Redux, and Separation of Concerns](https://blog.isquaredsoftware.com/2019/07/blogged-answers-thoughts-on-hooks/) and [Hooks, HOCs, and Tradeoffs](https://blog.isquaredsoftware.com/2019/09/presentation-hooks-hocs-tradeoffs/).


# `connect()`

:::tip

`connect` still works and is supported in React-Redux 8.x. However, [**we recommend using the hooks API as the default**](./hooks.md).

:::

## Overview

The `connect()` function connects a React component to a Redux store.

It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store.

It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.

```js
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
```

The `mapStateToProps` and `mapDispatchToProps` deals with your Redux store’s `state` and `dispatch`, respectively. `state` and `dispatch` will be supplied to your `mapStateToProps` or `mapDispatchToProps` functions as the first argument.

The returns of `mapStateToProps` and `mapDispatchToProps` are referred to internally as `stateProps` and `dispatchProps`, respectively. They will be supplied to `mergeProps`, if defined, as the first and the second argument, where the third argument will be `ownProps`. The combined result, commonly referred to as `mergedProps`, will then be supplied to your connected component.

## `connect()` Parameters

`connect` accepts four different parameters, all optional. By convention, they are called:

1. `mapStateToProps?: Function`
2. `mapDispatchToProps?: Function | Object`
3. `mergeProps?: Function`
4. `options?: Object`

### `mapStateToProps?: (state, ownProps?) => Object`

If a `mapStateToProps` function is specified, the new wrapper component will subscribe to Redux store updates. This means that any time the store is updated, `mapStateToProps` will be called. The results of `mapStateToProps` must be a plain object, which will be merged into the wrapped component’s props. If you don't want to subscribe to store updates, pass `null` or `undefined` in place of `mapStateToProps`.

#### Parameters

1. `state: Object`
2. `ownProps?: Object`

A `mapStateToProps` function takes a maximum of two parameters. The number of declared function parameters (a.k.a. arity) affects when it will be called. This also determines whether the function will receive ownProps. See notes [here](#the-arity-of-maptoprops-functions).

##### `state`

If your `mapStateToProps` function is declared as taking one parameter, it will be called whenever the store state changes, and given the store state as the only parameter.

```js
const mapStateToProps = (state) => ({ todos: state.todos })
```

##### `ownProps`

If your `mapStateToProps` function is declared as taking two parameters, it will be called whenever the store state changes _or_ when the wrapper component receives new props (based on shallow equality comparisons). It will be given the store state as the first parameter, and the wrapper component's props as the second parameter.

The second parameter is normally referred to as `ownProps` by convention.

```js
const mapStateToProps = (state, ownProps) => ({
  todo: state.todos[ownProps.id],
})
```

#### Returns

Your `mapStateToProps` functions are expected to return an object. This object, normally referred to as `stateProps`, will be merged as props to your connected component. If you define `mergeProps`, it will be supplied as the first parameter to `mergeProps`.

The return of the `mapStateToProps` determine whether the connected component will re-render (details [here](../using-react-redux/connect-extracting-data-with-mapStateToProps.md#return-values-determine-if-your-component-re-renders)).

For more details on recommended usage of `mapStateToProps`, please refer to [our guide on using `mapStateToProps`](../using-react-redux/connect-extracting-data-with-mapStateToProps.md).

> You may define `mapStateToProps` and `mapDispatchToProps` as a factory function, i.e., you return a function instead of an object. In this case your returned function will be treated as the real `mapStateToProps` or `mapDispatchToProps`, and be called in subsequent calls. You may see notes on [Factory Functions](#factory-functions) or our guide on performance optimizations.

### `mapDispatchToProps?: Object | (dispatch, ownProps?) => Object`

Conventionally called `mapDispatchToProps`, this second parameter to `connect()` may either be an object, a function, or not supplied.

Your component will receive `dispatch` by default, i.e., when you do not supply a second parameter to `connect()`:

```js
// do not pass `mapDispatchToProps`
connect()(MyComponent)
connect(mapState)(MyComponent)
connect(mapState, null, mergeProps, options)(MyComponent)
```

If you define a `mapDispatchToProps` as a function, it will be called with a maximum of two parameters.

#### Parameters

1. `dispatch: Function`
2. `ownProps?: Object`

##### `dispatch`

If your `mapDispatchToProps` is declared as a function taking one parameter, it will be given the `dispatch` of your `store`.

```js
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    reset: () => dispatch({ type: 'RESET' }),
  }
}
```

##### `ownProps`

If your `mapDispatchToProps` function is declared as taking two parameters, it will be called with `dispatch` as the first parameter and the props passed to the wrapper component as the second parameter, and will be re-invoked whenever the connected component receives new props.

The second parameter is normally referred to as `ownProps` by convention.

```js
// binds on component re-rendering
<button onClick={() => this.props.toggleTodo(this.props.todoId)} />

// binds on `props` change
const mapDispatchToProps = (dispatch, ownProps) => ({
  toggleTodo: () => dispatch(toggleTodo(ownProps.todoId)),
})
```

The number of declared function parameters of `mapDispatchToProps` determines whether they receive ownProps. See notes [here](#the-arity-of-maptoprops-functions).

#### Returns

Your `mapDispatchToProps` functions are expected to return an object. Each fields of the object should be a function, calling which is expected to dispatch an action to the store.

The return of your `mapDispatchToProps` functions are regarded as `dispatchProps`. It will be merged as props to your connected component. If you define `mergeProps`, it will be supplied as the second parameter to `mergeProps`.

```js
const createMyAction = () => ({ type: 'MY_ACTION' })
const mapDispatchToProps = (dispatch, ownProps) => {
  const boundActions = bindActionCreators({ createMyAction }, dispatch)
  return {
    dispatchPlainObject: () => dispatch({ type: 'MY_ACTION' }),
    dispatchActionCreatedByActionCreator: () => dispatch(createMyAction()),
    ...boundActions,
    // you may return dispatch here
    dispatch,
  }
}
```

For more details on recommended usage, please refer to [our guide on using `mapDispatchToProps`](../using-react-redux/connect-mapdispatch).

> You may define `mapStateToProps` and `mapDispatchToProps` as a factory function, i.e., you return a function instead of an object. In this case your returned function will be treated as the real `mapStateToProps` or `mapDispatchToProps`, and be called in subsequent calls. You may see notes on [Factory Functions](#factory-functions) or our guide on performance optimizations.

#### Object Shorthand Form

`mapDispatchToProps` may be an object where each field is an [action creator](https://redux.js.org/glossary#action-creator).

```js
import { addTodo, deleteTodo, toggleTodo } from './actionCreators'

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  toggleTodo,
}

export default connect(null, mapDispatchToProps)(TodoApp)
```

In this case, React-Redux binds the `dispatch` of your store to each of the action creators using `bindActionCreators`. The result will be regarded as `dispatchProps`, which will be either directly merged to your connected components, or supplied to `mergeProps` as the second argument.

```js
// internally, React-Redux calls bindActionCreators
// to bind the action creators to the dispatch of your store
bindActionCreators(mapDispatchToProps, dispatch)
```

We also have a section in our `mapDispatchToProps` guide on the usage of object shorthand form [here](../using-react-redux/connect-mapdispatch#defining-mapdispatchtoprops-as-an-object).

### `mergeProps?: (stateProps, dispatchProps, ownProps) => Object`

If specified, defines how the final props for your own wrapped component are determined. If you do not provide `mergeProps`, your wrapped component receives `{ ...ownProps, ...stateProps, ...dispatchProps }` by default.

#### Parameters

`mergeProps` should be specified with maximum of three parameters. They are the result of `mapStateToProps()`, `mapDispatchToProps()`, and the wrapper component's `props`, respectively:

1. `stateProps`
2. `dispatchProps`
3. `ownProps`

The fields in the plain object you return from it will be used as the props for the wrapped component. You may specify this function to select a slice of the state based on props, or to bind action creators to a particular variable from props.

#### Returns

The return value of `mergeProps` is referred to as `mergedProps` and the fields will be used as the props for the wrapped component.

> Note: Creating new values in mergeProps will cause re-renders. It is recommended that you memoize fields in order to avoid unnecessary re-renders. 

### `options?: Object`

```js
{
  context?: Object,
  areStatesEqual?: Function,
  areOwnPropsEqual?: Function,
  areStatePropsEqual?: Function,
  areMergedPropsEqual?: Function,
  forwardRef?: boolean,
}
```

#### `context: Object`

> Note: This parameter is supported in >= v6.0 only

React-Redux v6 allows you to supply a custom context instance to be used by React-Redux.
You need to pass the instance of your context to both `<Provider />` and your connected component.
You may pass the context to your connected component either by passing it here as a field of option, or as a prop to your connected component in rendering.

```js
// const MyContext = React.createContext();
connect(mapStateToProps, mapDispatchToProps, null, { context: MyContext })(
  MyComponent
)
```

#### `areStatesEqual: (next: Object, prev: Object) => boolean`

- default value: `strictEqual: (next, prev) => prev === next`

Compares incoming store state to its previous value.

```js
const areStatesEqual = (next, prev) =>
  prev.entities.todos === next.entities.todos
```

You may wish to override `areStatesEqual` if your `mapStateToProps` function is computationally expensive and is also only concerned with a small slice of your state. The example above will effectively ignore state changes for everything but that slice of state.

This would likely impact the other equality checks as well, depending on your `mapStateToProps` function.

#### `areOwnPropsEqual: (next: Object, prev: Object) => boolean`

- default value: `shallowEqual: (objA, objB) => boolean`
  ( returns `true` when each field of the objects is equal )

Compares incoming props to its previous value.

You may wish to override `areOwnPropsEqual` as a way to whitelist incoming props. You'd also have to implement `mapStateToProps`, `mapDispatchToProps` and `mergeProps` to also whitelist props. (It may be simpler to achieve this other ways, for example by using [recompose's mapProps](https://github.com/acdlite/recompose/blob/master/docs/API.md#mapprops).)

#### `areStatePropsEqual: (next: Object, prev: Object) => boolean`

- type: `function`
- default value: `shallowEqual`

Compares the result of `mapStateToProps` to its previous value.

#### `areMergedPropsEqual: (next: Object, prev: Object) => boolean`

- default value: `shallowEqual`

Compares the result of `mergeProps` to its previous value.

You may wish to override `areStatePropsEqual` to use `strictEqual` if your `mapStateToProps` uses a memoized selector that will only return a new object if a relevant prop has changed. This would be a very slight performance improvement, since would avoid extra equality checks on individual props each time `mapStateToProps` is called.

You may wish to override `areMergedPropsEqual` to implement a `deepEqual` if your selectors produce complex props. ex: nested objects, new arrays, etc. (The deep equal check may be faster than just re-rendering.)

#### `forwardRef: boolean`

> Note: This parameter is supported in >= v6.0 only

If `{forwardRef : true}` has been passed to `connect`, adding a ref to the connected wrapper component will actually return the instance of the wrapped component.

## `connect()` Returns

The return of `connect()` is a wrapper function that takes your component and returns a wrapper component with the additional props it injects.

```js
import { login, logout } from './actionCreators'

const mapState = (state) => state.user
const mapDispatch = { login, logout }

// first call: returns a hoc that you can use to wrap any component
const connectUser = connect(mapState, mapDispatch)

// second call: returns the wrapper component with mergedProps
// you may use the hoc to enable different components to get the same behavior
const ConnectedUserLogin = connectUser(Login)
const ConnectedUserProfile = connectUser(Profile)
```

In most cases, the wrapper function will be called right away, without being saved in a temporary variable:

```js
import { login, logout } from './actionCreators'

const mapState = (state) => state.user
const mapDispatch = { login, logout }

// call connect to generate the wrapper function, and immediately call
// the wrapper function to generate the final wrapper component.

export default connect(mapState, mapDispatch)(Login)
```

## Example Usage

Because `connect` is so flexible, it may help to see some additional examples of how it can be called:

- Inject just `dispatch` and don't listen to store

```js
export default connect()(TodoApp)
```

- Inject all action creators (`addTodo`, `completeTodo`, ...) without subscribing to the store

```js
import * as actionCreators from './actionCreators'

export default connect(null, actionCreators)(TodoApp)
```

- Inject `dispatch` and every field in the global state

> Don’t do this! It kills any performance optimizations because `TodoApp` will rerender after every state change.
> It’s better to have more granular `connect()` on several components in your view hierarchy that each only listen to a relevant slice of the state.

```js
// don't do this!
export default connect((state) => state)(TodoApp)
```

- Inject `dispatch` and `todos`

```js
function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps)(TodoApp)
```

- Inject `todos` and all action creators

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

export default connect(mapStateToProps, actionCreators)(TodoApp)
```

- Inject `todos` and all action creators (`addTodo`, `completeTodo`, ...) as `actions`

```js
import * as actionCreators from './actionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- Inject `todos` and a specific action creator (`addTodo`)

```js
import { addTodo } from './actionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTodo }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- Inject `todos` and specific action creators (`addTodo` and `deleteTodo`) with shorthand syntax

```js
import { addTodo, deleteTodo } from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- Inject `todos`, `todoActionCreators` as `todoActions`, and `counterActionCreators` as `counterActions`

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return {
    todoActions: bindActionCreators(todoActionCreators, dispatch),
    counterActions: bindActionCreators(counterActionCreators, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- Inject `todos`, and todoActionCreators and counterActionCreators together as `actions`

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...todoActionCreators, ...counterActionCreators },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- Inject `todos`, and all `todoActionCreators` and `counterActionCreators` directly as props

```js
import * as todoActionCreators from './todoActionCreators'
import * as counterActionCreators from './counterActionCreators'
import { bindActionCreators } from 'redux'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { ...todoActionCreators, ...counterActionCreators },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)
```

- Inject `todos` of a specific user depending on props

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state, ownProps) {
  return { todos: state.todos[ownProps.userId] }
}

export default connect(mapStateToProps)(TodoApp)
```

- Inject `todos` of a specific user depending on props, and inject `props.userId` into the action

```js
import * as actionCreators from './actionCreators'

function mapStateToProps(state) {
  return { todos: state.todos }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text),
  })
}

export default connect(mapStateToProps, actionCreators, mergeProps)(TodoApp)
```

## Notes

### The Arity of `mapToProps` Functions

The number of declared function parameters of `mapStateToProps` and `mapDispatchToProps` determines whether they receive `ownProps`

> Note: `ownProps` is not passed to `mapStateToProps` and `mapDispatchToProps` if the formal definition of the function contains one mandatory parameter (function has length 1). For example, functions defined like below won't receive `ownProps` as the second argument. If the incoming value of `ownProps` is `undefined`, the default argument value will be used.

```js
function mapStateToProps(state) {
  console.log(state) // state
  console.log(arguments[1]) // undefined
}

const mapStateToProps = (state, ownProps = {}) => {
  console.log(state) // state
  console.log(ownProps) // {}
}
```

Functions with no mandatory parameters or two parameters\*will receive `ownProps`.

```js
const mapStateToProps = (state, ownProps) => {
  console.log(state) // state
  console.log(ownProps) // ownProps
}

function mapStateToProps() {
  console.log(arguments[0]) // state
  console.log(arguments[1]) // ownProps
}

const mapStateToProps = (...args) => {
  console.log(args[0]) // state
  console.log(args[1]) // ownProps
}
```

### Factory Functions

If your `mapStateToProps` or `mapDispatchToProps` functions return a function, they will be called once when the component instantiates, and their returns will be used as the actual `mapStateToProps`, `mapDispatchToProps`, functions respectively, in their subsequent calls.

The factory functions are commonly used with memoized selectors. This gives you the ability to create component-instance-specific selectors inside the closure:

```js
const makeUniqueSelectorInstance = () =>
  createSelector([selectItems, selectItemId], (items, itemId) => items[itemId])
const makeMapState = (state) => {
  const selectItemForThisComponent = makeUniqueSelectorInstance()
  return function realMapState(state, ownProps) {
    const item = selectItemForThisComponent(state, ownProps.itemId)
    return { item }
  }
}
export default connect(makeMapState)(SomeComponent)
```

## Legacy Version Docs

While the `connect` API has stayed almost entirely API-compatible between all of our major versions, there have been some small changes in options and behavior from version to version.

For details on the legacy 5.x and 6.x versions, please see these archived files in the React Redux repo:

- [5.x `connect` API reference](https://github.com/reduxjs/react-redux/blob/v7.2.2/website/versioned_docs/version-5.x/api/connect.md)
- [6.x `connect` API reference](https://github.com/reduxjs/react-redux/blob/v7.2.2/website/versioned_docs/version-6.x/api/connect.md)

# `batch()`

```js
batch((fn: () => void))
```

_added in v7.0.0_

:::info

**If you're using React 18, you do not need to use the `batch` API**. React 18 automatically batches _all_ state updates, no matter where they're queued.

:::

React's `unstable_batchedUpdates()` API allows any React updates in an event loop tick to be batched together into a single render pass. React already uses this internally for its own event handler callbacks. This API is actually part of the renderer packages like ReactDOM and React Native, not the React core itself.

Since React-Redux needs to work in both ReactDOM and React Native environments, we've taken care of importing this API from the correct renderer at build time for our own use. We also now re-export this function publicly ourselves, renamed to `batch()`. You can use it to ensure that multiple actions dispatched outside of React only result in a single render update, like this:

```ts
import { batch } from 'react-redux'

function myThunk() {
  return (dispatch, getState) => {
    // should only result in one combined re-render, not two
    batch(() => {
      dispatch(increment())
      dispatch(increment())
    })
  }
}
```

## References

- [`unstable_batchedUpdates()` API from React](https://github.com/facebook/react/commit/b41883fc708cd24d77dcaa767cde814b50b457fe)
- [React 18 Working Group: Automatic Batching for Fewer Renders in React 18](https://github.com/reactwg/react-18/discussions/21)

## Troubleshooting

The **[#redux channel](https://discord.gg/0ZcbPKXt5bZ6au5t)** of the **[Reactiflux Discord community](http://www.reactiflux.com)** is our official resource for all questions related to learning and using Redux. Reactiflux is a great place to hang out, ask questions, and learn - come join us!

You can also ask questions on [Stack Overflow](https://stackoverflow.com) using the **[#redux tag](https://stackoverflow.com/questions/tagged/redux)**.

### My views aren’t updating!

In short,

- Reducers should never mutate state, they must return new objects, or React Redux won’t see the updates.
- Make sure you are actually _dispatching_ actions. For example, if you have an action creator like `addTodo`, just calling the imported `addTodo()` function by itself won't do anything because it just _returns_ an action, but does not _dispatch_ it. You either need to call `dispatch(addTodo())` (if using the hooks API) or `props.addTodo()` (if using `connect` + `mapDispatch`).

### Could not find "store" in either the context or props

If you have context issues,

1. [Make sure you don’t have a duplicate instance of React](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375) on the page.
2. Make sure you don't have multiple instances/copies of React Redux in your project.
3. Make sure you didn’t forget to wrap your root or some other ancestor component in [`<Provider>`](#provider-store).
4. Make sure you’re running the latest versions of React and React Redux.

### Invariant Violation: addComponentAsRefTo(...): Only a ReactOwner can have refs. This usually means that you’re trying to add a ref to a component that doesn’t have an owner

If you’re using React for web, this usually means you have a [duplicate React](https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375). Follow the linked instructions to fix this.

### I'm getting a warning about useLayoutEffect in my unit tests

ReactDOM emits this warning if `useLayoutEffect` is used "on the server". React Redux tries to get around the issue by detecting whether it is running within a browser context. Jest, by default, defines enough of the browser environment that React Redux thinks it's running in a browser, causing these warnings.

You can prevent the warning by setting the `@jest-environment` for a single test file:

```jsx
// my.test.jsx
/**
 * @jest-environment node
 */
```

Or by setting it globally:

```js
// package.json
{
  "name": "my-project",
  "jest": {
    "testEnvironment": "node"
  }
}
```

See https://github.com/facebook/react/issues/14927#issuecomment-490426131