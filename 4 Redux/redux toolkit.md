https://youtu.be/XwGNhppX4as
https://youtu.be/bbkBuqC1rU4

# Getting Started with Redux Toolkit

## Purpose

The **Redux Toolkit** package is intended to be the standard way to write [Redux](https://redux.js.org) logic. It was originally created to help address three common concerns about Redux:

- "Configuring a Redux store is too complicated"
- "I have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"

We can't solve every use case, but in the spirit of [`create-react-app`](https://github.com/facebook/create-react-app), we can try to provide some tools that abstract over the setup process and handle the most common use cases, as well as include some useful utilities that will let the user simplify their application code.

Redux Toolkit also includes a powerful data fetching and caching capability that we've dubbed ["RTK Query"](#rtk-query). It's included in the package as a separate set of entry points. It's optional, but can eliminate the need to hand-write data fetching logic yourself.

**These tools should be beneficial to all Redux users**. Whether you're a brand new Redux user setting up your
first project, or an experienced user who wants to simplify an existing application, **Redux Toolkit** can help
you make your Redux code better.

## Installation

### Using Create React App

The recommended way to start new apps with React and Redux is by using the [official Redux+JS template](https://github.com/reduxjs/cra-template-redux) or [Redux+TS template](https://github.com/reduxjs/cra-template-redux-typescript) for [Create React App](https://github.com/facebook/create-react-app), which takes advantage of **[Redux Toolkit](https://redux-toolkit.js.org/)** and React Redux's integration with React components.

```bash
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```

### An Existing App

Redux Toolkit is available as a package on NPM for use with a module bundler or in a Node application:

```bash
# NPM
npm install @reduxjs/toolkit
```

or

```bash
# Yarn
yarn add @reduxjs/toolkit
```

It is also available as a precompiled UMD package that defines a `window.RTK` global variable.
The UMD package can be used as a [`<script>` tag](https://unpkg.com/@reduxjs/toolkit/dist/redux-toolkit.umd.js) directly.

## What's Included

Redux Toolkit includes these APIs:

- [`configureStore()`](../api/configureStore.mdx): wraps `createStore` to provide simplified configuration options and good defaults. It can automatically combine your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the Redux DevTools Extension.
- [`createReducer()`](../api/createReducer.mdx): that lets you supply a lookup table of action types to case reducer functions, rather than writing switch statements. In addition, it automatically uses the [`immer` library](https://github.com/immerjs/immer) to let you write simpler immutable updates with normal mutative code, like `state.todos[3].completed = true`.
- [`createAction()`](../api/createAction.mdx): generates an action creator function for the given action type string. The function itself has `toString()` defined, so that it can be used in place of the type constant.
- [`createSlice()`](../api/createSlice.mdx): accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- [`createAsyncThunk`](../api/createAsyncThunk.mdx): accepts an action type string and a function that returns a promise, and generates a thunk that dispatches `pending/fulfilled/rejected` action types based on that promise
- [`createEntityAdapter`](../api/createEntityAdapter.mdx): generates a set of reusable reducers and selectors to manage normalized data in the store
- The [`createSelector` utility](../api/createSelector.mdx) from the [Reselect](https://github.com/reduxjs/reselect) library, re-exported for ease of use.

## RTK Query

[**RTK Query**](../rtk-query/overview.md) is provided as an optional addon within the `@reduxjs/toolkit` package. It is purpose-built to solve the use case of data fetching and caching, supplying a compact, but powerful toolset to define an API interface layer for your app. It is intended to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

RTK Query is built on top of the Redux Toolkit core for its implementation, using [Redux](https://redux.js.org/) internally for its architecture. Although knowledge of Redux and RTK are not required to use RTK Query, you should explore all of the additional global store management capabilities they provide, as well as installing the [Redux DevTools browser extension](https://github.com/reduxjs/redux-devtools), which works flawlessly with RTK Query to traverse and replay a timeline of your request & cache behavior.

RTK Query is included within the installation of the core Redux Toolkit package. It is available via either of the two entry points below:

```ts no-transpile
import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react'
```

### What's included

RTK Query includes these APIs:

- [`createApi()`](../rtk-query/api/createApi.mdx): The core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.
- [`fetchBaseQuery()`](../rtk-query/api/fetchBaseQuery.mdx): A small wrapper around [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that aims to simplify requests. Intended as the recommended `baseQuery` to be used in `createApi` for the majority of users.
- [`<ApiProvider />`](../rtk-query/api/ApiProvider.mdx): Can be used as a `Provider` if you **do not already have a Redux store**.
- [`setupListeners()`](../rtk-query/api/setupListeners.mdx): A utility used to enable `refetchOnMount` and `refetchOnReconnect` behaviors.

See the [**RTK Query Overview**](../rtk-query/overview.md) page for more details on what RTK Query is, what problems it solves, and how to use it.

## Learn Redux

We have a variety of resources available to help you learn Redux.

### Redux Essentials Tutorial

The [**Redux Essentials tutorial**](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) is a "top-down" tutorial that teaches "how to use Redux the right way", using our latest recommended APIs and best practices. We recommend starting there.

### Redux Fundamentals Tutorial

The [**Redux Fundamentals tutorial**](https://redux.js.org/tutorials/fundamentals/part-1-overview) is a "bottom-up" tutorial that teaches "how Redux works" from first principles and without any abstractions, and why standard Redux usage patterns exist.

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

# Tutorials Overview

**The Redux core docs site at https://redux.js.org contains the primary tutorials for learning Redux**, including how to use Redux Toolkit and React-Redux together.

:::tip

To avoid duplicating explanations between the Redux core and Redux Toolkit documentation, we've focused on making the Redux core docs tutorials comprehensive, and point to them instead of having extended tutorials here in the Redux Toolkit docs.

:::

See these linked tutorials to learn how to use Redux Toolkit effectively.

## Redux Toolkit Quick Starts

The [**Redux Toolkit Quick Start tutorial**](./quick-start.mdx) briefly shows how to add and use Redux Toolkit in a React application.

**If you just want the fastest way to get a basic example running, read the Quick Start tutorial.**

We also have a [**TypeScript Quick Start tutorial**](./typescript.md) that briefly shows how to set up and use TypeScript with Redux Toolkit and React-Redux.

## Redux Essentials: A Real-World Example

The [**Redux Essentials tutorial**](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) teaches you "how to use Redux the right way", using Redux Toolkit as the standard approach for writing Redux logic.

It shows how to build a "real world"-style example application, and teaches Redux concepts along the way.

**If you've never used Redux before, and just want to know "how do I use this to build something useful?", start with the Redux Essentials tutorial.**

## Redux Fundamentals: Redux from the Ground Up

The [**Redux Fundamentals tutorial**](https://redux.js.org/tutorials/fundamentals/part-1-overview) teaches "how Redux works, from the bottom up", by showing how to write Redux code by hand and why standard usage patterns exist. It then shows how Redux Toolkit simplifies those Redux usage patterns.

Since Redux Toolkit is an abstraction layer that wraps around the Redux core, it's helpful to know what RTK's APIs are actually doing for you under the hood. **If you want to understand how Redux really works and why RTK is the recommended approach, read the Redux Fundamentals tutorial.**

## Learn Modern Redux Livestream

Redux maintainer Mark Erikson appeared on the "Learn with Jason" show to explain how we recommend using Redux today. The show includes a live-coded example app that shows how to use Redux Toolkit and React-Redux hooks with Typescript, as well as the new RTK Query data fetching APIs.

See [the "Learn Modern Redux" show notes page](https://www.learnwithjason.dev/let-s-learn-modern-redux) for a transcript and links to the example app source.

<LiteYouTubeEmbed 
    id="9zySeP5vH9c"
    title="Learn Modern Redux - Redux Toolkit, React-Redux Hooks, and RTK Query"
/>

## Using Redux Toolkit

The RTK [**Usage Guide** docs page](../usage/usage-guide.md) explains the standard usage patterns for each of RTK's APIs. The [API Reference](../api/configureStore.mdx) section describes each API function and has additional usage examples.

The [Redux Essentials tutorial](https://redux.js.org/tutorials/essentials/part-1-overview-concepts) also shows how to use each of the APIs while building an application.

## Migrating Vanilla Redux to Redux Toolkit

If you already know Redux and just want to know how to migrate an existing application to use Redux Toolkit, the [**"Modern Redux with Redux Toolkit" page in the Redux Fundamentals tutorial**](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux) shows how RTK's APIs simplify Redux usage patterns and how to handle that migration.

## Using Redux Toolkit with TypeScript

The RTK docs page on [**Usage with TypeScript**](../usage/usage-with-typescript.md) shows the basic pattern for setting up Redux Toolkit with TypeScript and React, and documents specific TS patterns for each of the RTK APIs.

In addition, the [Redux + TS template for Create-React-App](https://github.com/reduxjs/cra-template-redux-typescript) comes with RTK already configured to use those TS patterns, and serves as a good example of how this should work.

## Legacy Redux Toolkit Tutorials

We previously had a set of "Basic/Intermediate/Advanced" tutorials directly in the Redux Toolkit docs. They were helpful, but we've removed them in favor of pointing to the "Essentials" and "Fundamentals" tutorials in the Redux core docs.

If you'd like to browse the old tutorials, you can see the content files in our repo's history:

[Redux Toolkit repo: legacy "Basic/Intermediate/Advanced" tutorial files](https://github.com/reduxjs/redux-toolkit/tree/e85eb17b39/docs/tutorials)

# Redux Toolkit Quick Start

:::tip What You'll Learn

- How to set up and use Redux Toolkit with React-Redux

:::

:::info Prerequisites

- Familiarity with [ES6 syntax and features](https://www.taniarascia.com/es6-syntax-and-feature-overview/)
- Knowledge of React terminology: [JSX](https://reactjs.org/docs/introducing-jsx.html), [State](https://reactjs.org/docs/state-and-lifecycle.html), [Function Components, Props](https://reactjs.org/docs/components-and-props.html), and [Hooks](https://reactjs.org/docs/hooks-intro.html)
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

:::

## Introduction

Welcome to the Redux Toolkit Quick Start tutorial! **This tutorial will briefly introduce you to Redux Toolkit and teach you how to start using it correctly**.

### How to Read This Tutorial

This page will focus on just how to set up a Redux application with Redux Toolkit and the main APIs you'll use. For explanations of what Redux is, how it works, and full examples of how to use Redux Toolkit, [see the tutorials linked in the "Tutorials Overview" page](./overview.md).

For this tutorial, we assume that you're using Redux Toolkit with React, but you can also use it with other UI layers as well. The examples are based on [a typical Create-React-App folder structure](https://create-react-app.dev/docs/folder-structure) where all the application code is in a `src`, but the patterns can be adapted to whatever project or folder setup you're using.

The [Redux+JS template for Create-React-App](https://github.com/reduxjs/cra-template-redux) comes with this same project setup already configured.

## Usage Summary

### Install Redux Toolkit and React-Redux

Add the Redux Toolkit and React-Redux packages to your project:

```sh
npm install @reduxjs/toolkit react-redux
```

### Create a Redux Store

Create a file named `src/app/store.js`. Import the `configureStore` API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:

```ts title="app/store.js"
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.

### Provide the Redux Store to React

Once the store is created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application in `src/index.js`. Import the Redux store we just created, put a `<Provider>` around your `<App>`, and pass the store as a prop:

```ts title="index.js"
// file: App.tsx noEmit
import React from 'react'
export default function App() {
  return <div>...</div>
}

// file: app/store.ts noEmit
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// file: index.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// highlight-start
import { store } from './app/store'
import { Provider } from 'react-redux'
// highlight-end

ReactDOM.render(
  // highlight-next-line
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### Create a Redux State Slice

Add a new file named `src/features/counter/counterSlice.js`. In that file, import the `createSlice` API from Redux Toolkit.

Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

Redux requires that [we write all state updates immutably, by making copies of data and updating the copies](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#immutability). However, Redux Toolkit's `createSlice` and `createReducer` APIs use [Immer](https://immerjs.github.io/immer/) inside to allow us to [write "mutating" update logic that becomes correct immutable updates](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#immutable-updates-with-immer).

```ts title="features/counter/counterSlice.js"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
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
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

### Add Slice Reducers to the Store

Next, we need to import the reducer function from the counter slice and add it to our store. By defining a field inside the `reducer` parameter, we tell the store to use this slice reducer function to handle all updates to that state.

```ts title="app/store.js"
// file: features/counter/counterSlice.ts noEmit
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {},
  reducers: {},
})

export default counterSlice.reducer

// file: app/store.ts
import { configureStore } from '@reduxjs/toolkit'
// highlight-next-line
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    // highlight-next-line
    counter: counterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

### Use Redux State and Actions in React Components

Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data from the store with `useSelector`, and dispatch actions using `useDispatch`. Create a `src/features/counter/Counter.js` file with a `<Counter>` component inside, then import that component into `App.js` and render it inside of `<App>`.

```ts title="features/counter/Counter.js"
// file: features/counter/counterSlice.ts noEmit
import { createSlice } from '@reduxjs/toolkit'
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {},
    decrement: (state) => {},
  },
})

export const { increment, decrement } = counterSlice.actions
export default counterSlice.reducer

// file: app/store.ts noEmit
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>

// file: index.tsx noEmit
import React from 'react'
import ReactDOM from 'react-dom'
import { Counter } from './features/counter/Counter'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  // highlight-next-line
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById('root')
)

// file: features/counter/Counter.tsx
import React from 'react'
import { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
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
  - Put a React-Redux `<Provider>` component around your `<App />`
  - Pass the Redux store as `<Provider store={store}>`
- **Create a Redux "slice" reducer with `createSlice`**
  - Call `createSlice` with a string name, an initial state, and named reducer functions
  - Reducer functions may "mutate" the state using Immer
  - Export the generated slice reducer and action creators
- **Use the React-Redux `useSelector/useDispatch` hooks in React components**
  - Read data from the store with the `useSelector` hook
  - Get the `dispatch` function with the `useDispatch` hook, and dispatch actions as needed

:::

### Full Counter App Example

The counter example app shown here is also the

Here's the complete counter application as a running CodeSandbox:

<iframe
  className="codesandbox"
  src="https://codesandbox.io/embed/github/reduxjs/redux-essentials-counter-example/tree/master/?fontsize=14&hidenavigation=1&module=%2Fsrc%2Ffeatures%2Fcounter%2FcounterSlice.js&theme=dark&runonclick=1"
  title="redux-essentials-example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## What's Next?

We recommend going through [**the "Redux Essentials" and "Redux Fundamentals" tutorials in the Redux core docs**](https://redux.js.org/tutorials/index), which will give you a complete understanding of how Redux works, what Redux Toolkit does, and how to use it correctly.


# Redux Toolkit TypeScript Quick Start

:::tip What You'll Learn

- How to set up and use Redux Toolkit and React-Redux with TypeScript

:::

:::info Prerequisites

- Knowledge of React [Hooks](https://reactjs.org/docs/hooks-intro.html)
- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)
- Understanding of TypeScript syntax and concepts

:::

## Introduction

Welcome to the Redux Toolkit TypeScript Quick Start tutorial! **This tutorial will briefly show how to use TypeScript with Redux Toolkit**.

This page focuses on just how to set up the TypeScript aspects . For explanations of what Redux is, how it works, and full examples of how to use Redux Toolkit, [see the tutorials linked in the "Tutorials Overview" page](./overview.md).

Redux Toolkit is already written in TypeScript, so its TS type definitions are built in.

[React Redux](https://react-redux.js.org) has its type definitions in a separate [`@types/react-redux` typedefs package](https://npm.im/@types/react-redux) on NPM. In addition to typing the library functions, the types also export some helpers to make it easier to write typesafe interfaces between your Redux store and your React components.

As of React Redux v7.2.3, the `react-redux` package has a dependency on `@types/react-redux`, so the type definitions will be automatically installed with the library. Otherwise, you'll need to manually install them yourself (typically `npm install @types/react-redux` ).

The [Redux+TS template for Create-React-App](https://github.com/reduxjs/cra-template-redux-typescript) comes with a working example of these patterns already configured.

## Project Setup

### Define Root State and Dispatch Types

Using [configureStore](../api/configureStore.mdx) should not need any additional typings. You will, however, want to extract the `RootState` type and the `Dispatch` type so that they can be referenced as needed. Inferring these types from the store itself means that they correctly update as you add more state slices or modify middleware settings.

Since those are types, it's safe to export them directly from your store setup file such as `app/store.ts` and import them directly into other files.

```ts title="app/store.ts"
import { configureStore } from '@reduxjs/toolkit'
// ...

export const store = configureStore({
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

While it's possible to import the `RootState` and `AppDispatch` types into each component, it's **better to create typed versions of the `useDispatch` and `useSelector` hooks for usage in your application**. This is important for a couple reasons:

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

See [the "Usage with TypeScript" page](../usage/usage-with-typescript.md) for extended details on how to use Redux Toolkit's APIs with TypeScript.


# RTK Query Quick Start

:::tip What You'll Learn

- How to set up and use Redux Toolkit's "RTK Query" data fetching functionality

:::

:::info Prerequisites

- Understanding of [Redux terms and concepts](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

:::

## Introduction

Welcome to the Redux Toolkit Query tutorial! **This tutorial will briefly introduce you to Redux Toolkit's "RTK Query" data fetching capability and teach you how to start using it correctly**. 

:::info

For a more in-depth tutorial on RTK Query, see the full ["Redux Essentials" tutorial](https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics) on the Redux core docs site.

:::

RTK Query is an advanced data fetching and caching tool, designed to simplify common cases for loading data in a web application. RTK Query itself is built on top of the Redux Toolkit core, and leverages RTK's APIs like [`createSlice`](../api/createSlice.mdx) and [`createAsyncThunk`](../api/createAsyncThunk.mdx) to implement its capabilities.

RTK Query is included in the `@reduxjs/toolkit` package as an additional addon. You are not required to use the RTK Query APIs when you use Redux Toolkit, but we think many users will benefit from RTK Query's data fetching and caching in their apps.

### How to Read This Tutorial

For this tutorial, we assume that you're using Redux Toolkit with React, but you can also use it with other UI layers as well. The examples are based on [a typical Create-React-App folder structure](https://create-react-app.dev/docs/folder-structure) where all the application code is in a `src`, but the patterns can be adapted to whatever project or folder setup you're using.

## Setting up your store and API service

To see how RTK Query works, let's walk through a basic usage example. For this example, we'll assume you're using React and want to make use of RTK Query's auto-generated React hooks.

### Create an API service

First, we'll create a service definition that queries the publicly available [PokeAPI](https://pokeapi.co/).

```ts title="src/services/pokemon.ts"
// file: services/types.ts noEmit
export type Pokemon = {}

// file: services/pokemon.ts
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

// highlight-start
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})
//highlight-end

// highlight-start
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
// highlight-end
```

With RTK Query, you usually define your entire API definition in one place. This is most likely different from what you see with other libraries such as `swr` or `react-query`, and there are several reasons for that. Our perspective is that it's _much_ easier to keep track of how requests, cache invalidation, and general app configuration behave when they're all in one central location in comparison to having X number of custom hooks in different files throughout your application.

:::tip

Typically, you should only have one API slice per base URL that your application needs to communicate with. For example, if your site fetches data from both `/api/posts` and `/api/users`, you would have a single API slice with `/api/` as the base URL, and separate endpoint definitions for `posts` and `users`. This allows you to effectively take advantage of [automated re-fetching](./rtk-query/usage/automated-refetching.mdx) by defining [tag](./rtk-query/usage/automated-refetching.mdx#tags) relationships across endpoints.

For maintainability purposes, you may wish to split up endpoint definitions across multiple files, while still maintaining a single API slice which includes all of these endpoints. See [code splitting](./rtk-query/usage/code-splitting.mdx) for how you can use the `injectEndpoints` property to inject API endpoints from other files into a single API slice definition.

:::

### Add the service to your store

An RTKQ service generates a "slice reducer" that should be included in the Redux root reducer, and a custom middleware that handles the data fetching. Both need to be added to the Redux store.

```ts title="src/store.ts"
// file: services/pokemon.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
})

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    // highlight-start
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    // highlight-end
  },
  // highlight-start
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
  // highlight-end
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
```

### Wrap your application with the `Provider`

If you haven't already done so, follow the standard pattern for providing the Redux store to the rest of your React application component tree:

```ts title="src/index.tsx"
// file: App.tsx noEmit
import React from 'react'
export default function App() {
  return <div>...</div>
}

// file: app/store.ts noEmit
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})

// file: index.tsx
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './app/store'

const rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

## Use the query in a component

Once a service has been defined, you can import the hooks to make a request.

```ts title="src/App.tsx"
// file: services/pokemon.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = pokemonApi

// file: App.tsx
import * as React from 'react'
// highlight-next-line
import { useGetPokemonByNameQuery } from './services/pokemon'

export default function App() {
  // highlight-start
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
  // highlight-end

  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  )
}
```

When making a request, you're able to track the state in several ways. You can always check `data`, `status`, and `error` to determine the right UI to render. In addition, `useQuery` also provides utility booleans like `isLoading`, `isFetching`, `isSuccess`, and `isError` for the latest request.

#### Basic Example

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/basic?fontsize=12&runonclick=1&hidenavigation=1&theme=dark"
  style={{
    width: '100%',
    height: '500px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="rtk-query-getting-started-basic"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

Okay, that's interesting... but what if you wanted to show multiple pokemon at the same time? What happens if multiple components load the same pokemon?

#### Advanced example

RTK Query ensures that any component that subscribes to the same query will always use the same data. RTK Query automatically de-dupes requests so you don't have to worry about checking in-flight requests and performance optimizations on your end. Let's evaluate the sandbox below - make sure to check the Network panel in your browser's dev tools. You will see 3 requests, even though there are 4 subscribed components - `bulbasaur` only makes one request, and the loading state is synchronized between the two components. For fun, try changing the value of the dropdown from `Off` to `1s` to see this behavior continue when a query is re-ran.

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/advanced?file=/src/App.tsx?fontsize=12&runonclick=1&hidenavigation=1&theme=dark"
  style={{
    width: '100%',
    height: '600px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="rtk-query-getting-started-advanced"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>


# Usage Guide

The Redux core library is deliberately unopinionated. It lets you decide how you want to handle everything, like store setup, what your state contains, and how you want to build your reducers.

This is good in some cases, because it gives you flexibility, but that flexibility isn't always needed. Sometimes we just want the simplest possible way to get started, with some good default behavior out of the box. Or, maybe you're writing a larger application and finding yourself writing some similar code, and you'd like to cut down on how much of that code you have to write by hand.

As described in the [Quick Start](../introduction/getting-started.md) page, the goal of Redux Toolkit is to help simplify common Redux use cases. It is not intended to be a complete solution for everything you might want to do with Redux, but it should make a lot of the Redux-related code you need to write a lot simpler (or in some cases, eliminate some of the hand-written code entirely).

Redux Toolkit exports several individual functions that you can use in your application, and adds dependencies on some other packages that are commonly used with Redux (like Reselect and Redux-Thunk). This lets you decide how to use these in your own application, whether it be a brand new project or updating a large existing app.

Let's look at some of the ways that Redux Toolkit can help make your Redux-related code better.

## Store Setup

Every Redux app needs to configure and create a Redux store. This usually involves several steps:

- Importing or creating the root reducer function
- Setting up middleware, likely including at least one middleware to handle asynchronous logic
- Configuring the [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
- Possibly altering some of the logic based on whether the application is being built for development or production

### Manual Store Setup

The following example from the [Configuring Your Store](https://redux.js.org/recipes/configuring-your-store) page in the Redux docs shows a typical store setup process:

```js
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
```

This example is readable, but the process isn't always straightforward:

- The basic Redux `createStore` function takes positional arguments: `(rootReducer, preloadedState, enhancer)`. Sometimes it's easy to forget which parameter is which.
- The process of setting up middleware and enhancers can be confusing, especially if you're trying to add several pieces of configuration.
- The Redux DevTools Extension docs initially suggest using [some hand-written code that checks the global namespace to see if the extension is available](https://github.com/zalmoxisus/redux-devtools-extension#11-basic-store). Many users copy and paste those snippets, which make the setup code harder to read.

### Simplifying Store Setup with `configureStore`

`configureStore` helps with those issues by:

- Having an options object with "named" parameters, which can be easier to read
- Letting you provide arrays of middleware and enhancers you want to add to the store, and calling `applyMiddleware` and `compose` for you automatically
- Enabling the Redux DevTools Extension automatically

In addition, `configureStore` adds some middleware by default, each with a specific goal:

- [`redux-thunk`](https://github.com/reduxjs/redux-thunk) is the most commonly used middleware for working with both synchronous and async logic outside of components
- In development, middleware that check for common mistakes like mutating the state or using non-serializable values.

This means the store setup code itself is a bit shorter and easier to read, and also that you get good default behavior out of the box.

The simplest way to use it is to just pass the root reducer function as a parameter named `reducer`:

```js
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
})

export default store
```

You can also pass an object full of ["slice reducers"](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic), and `configureStore` will call [`combineReducers`](https://redux.js.org/api/combinereducers) for you:

```js
import { configureStore } from '@reduxjs/toolkit'
// highlight-start
import usersReducer from './usersReducer'
import postsReducer from './postsReducer'

const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
  },
})
// highlight-end

export default store
```

Note that this only works for one level of reducers. If you want to nest reducers, you'll need to call `combineReducers` yourself to handle the nesting.

If you need to customize the store setup, you can pass additional options. Here's what the hot reloading example might look like using Redux Toolkit:

```js
import { configureStore } from '@reduxjs/toolkit'

import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
    preloadedState,
    enhancers: [monitorReducersEnhancer],
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
```

If you provide the `middleware` argument, `configureStore` will only use whatever middleware you've listed.
If you want to have some custom middleware _and_ the defaults all together, you can use the callback notation,
call [`getDefaultMiddleware`](../api/getDefaultMiddleware.mdx) and include the results in the `middleware` array you return.

## Writing Reducers

[Reducers](https://redux.js.org/basics/reducers) are the most important Redux concept. A typical reducer function needs to:

- Look at the `type` field of the action object to see how it should respond
- Update its state immutably, by making copies of the parts of the state that need to change and only modifying those copies

While you can [use any conditional logic you want](https://blog.isquaredsoftware.com/2017/05/idiomatic-redux-tao-of-redux-part-2/#switch-statements) in a reducer, the most common approach is a `switch` statement, because it's a straightforward way to handle multiple possible values for a single field. However, many people don't like switch statements. The Redux docs show an example of [writing a function that acts as a lookup table based on action types](https://redux.js.org/recipes/reducing-boilerplate#generating-reducers), but leave it up to users to customize that function themselves.

The other common pain points around writing reducers have to do with updating state immutably. JavaScript is a mutable language, [updating nested immutable data by hand is hard](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns), and it's easy to make mistakes.

### Simplifying Reducers with `createReducer`

Since the "lookup table" approach is popular, Redux Toolkit includes a `createReducer` function similar to the one shown in the Redux docs. However, our `createReducer` utility has some special "magic" that makes it even better. It uses the [Immer](https://github.com/mweststrate/immer) library internally, which lets you write code that "mutates" some data, but actually applies the updates immutably. This makes it effectively impossible to accidentally mutate state in a reducer.

In general, any Redux reducer that uses a `switch` statement can be converted to use `createReducer` directly. Each `case` in the switch becomes a key in the object passed to `createReducer`. Immutable update logic, like spreading objects or copying arrays, can probably be converted to direct "mutation". It's also fine to keep the immutable updates as-is and return the updated copies, too.

Here's some examples of how you can use `createReducer`. We'll start with a typical "todo list" reducer that uses switch statements and immutable updates:

```js
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO': {
      return state.concat(action.payload)
    }
    case 'TOGGLE_TODO': {
      const { index } = action.payload
      return state.map((todo, i) => {
        if (i !== index) return todo

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }
    case 'REMOVE_TODO': {
      return state.filter((todo, i) => i !== action.payload.index)
    }
    default:
      return state
  }
}
```

Notice that we specifically call `state.concat()` to return a copied array with the new todo entry, `state.map()` to return a copied array for the toggle case, and use the object spread operator to make a copy of the todo that needs to be updated.

With `createReducer`, we can shorten that example considerably:

```js
const todosReducer = createReducer([], (builder) => {
  builder
    .addCase('ADD_TODO', (state, action) => {
      // "mutate" the array by calling push()
      state.push(action.payload)
    })
    .addCase('TOGGLE_TODO', (state, action) => {
      const todo = state[action.payload.index]
      // "mutate" the object by overwriting a field
      todo.completed = !todo.completed
    })
    .addCase('REMOVE_TODO', (state, action) => {
      // Can still return an immutably-updated value if we want to
      return state.filter((todo, i) => i !== action.payload.index)
    })
})
```

The ability to "mutate" the state is especially helpful when trying to update deeply nested state. This complex and painful code:

```js
case "UPDATE_VALUE":
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue
        }
      }
    }
  }
```

Can be simplified down to just:

```js
updateValue(state, action) {
    const {someId, someValue} = action.payload;
    state.first.second[someId].fourth = someValue;
}
```

Much better!

### Considerations for Using `createReducer`

While the Redux Toolkit `createReducer` function can be really helpful, keep in mind that:

- The "mutative" code only works correctly inside of our `createReducer` function
- Immer won't let you mix "mutating" the draft state and also returning a new state value

See the [`createReducer` API reference](../api/createReducer.mdx) for more details.

## Writing Action Creators

Redux encourages you to [write "action creator" functions](https://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/) that encapsulate the process of creating an action object. While this is not strictly required, it's a standard part of Redux usage.

Most action creators are very simple. They take some parameters, and return an action object with a specific `type` field and the parameters inside the action. These parameters are typically put in a field called `payload`, which is part of the [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) convention for organizing the contents of action objects. A typical action creator might look like:

```js
function addTodo(text) {
  return {
    type: 'ADD_TODO',
    payload: { text },
  }
}
```

### Defining Action Creators with `createAction`

Writing action creators by hand can get tedious. Redux Toolkit provides a function called `createAction`, which simply generates an action creator that uses the given action type, and turns its argument into the `payload` field:

```js
const addTodo = createAction('ADD_TODO')
addTodo({ text: 'Buy milk' })
// {type : "ADD_TODO", payload : {text : "Buy milk"}})
```

`createAction` also accepts a "prepare callback" argument, which allows you to customize the resulting `payload` field and optionally add a `meta` field. See the [`createAction` API reference](../api/createAction.mdx#using-prepare-callbacks-to-customize-action-contents) for details on defining action creators with a prepare callback.

### Using Action Creators as Action Types

Redux reducers need to look for specific action types to determine how they should update their state. Normally, this is done by defining action type strings and action creator functions separately. Redux Toolkit `createAction` function uses a couple tricks to make this easier.

First, `createAction` overrides the `toString()` method on the action creators it generates. **This means that the action creator itself can be used as the "action type" reference in some places**, such as the keys provided to `builder.addCase` or the `createReducer` object notation.

Second, the action type is also defined as a `type` field on the action creator.

```js
const actionCreator = createAction('SOME_ACTION_TYPE')

console.log(actionCreator.toString())
// "SOME_ACTION_TYPE"

console.log(actionCreator.type)
// "SOME_ACTION_TYPE"

const reducer = createReducer({}, (builder) => {
  // actionCreator.toString() will automatically be called here
  // also, if you use TypeScript, the action type will be correctly inferred
  builder.addCase(actionCreator, (state, action) => {})

  // Or, you can reference the .type field:
  // if using TypeScript, the action type cannot be inferred that way
  builder.addCase(actionCreator.type, (state, action) => {})
})
```

This means you don't have to write or use a separate action type variable, or repeat the name and value of an action type like `const SOME_ACTION_TYPE = "SOME_ACTION_TYPE"`.

Unfortunately, the implicit conversion to a string doesn't happen for switch statements. If you want to use one of these action creators in a switch statement, you need to call `actionCreator.toString()` yourself:

```js
const actionCreator = createAction('SOME_ACTION_TYPE')

const reducer = (state = {}, action) => {
  switch (action.type) {
    // ERROR: this won't work correctly!
    case actionCreator: {
      break
    }
    // CORRECT: this will work as expected
    case actionCreator.toString(): {
      break
    }
    // CORRECT: this will also work right
    case actionCreator.type: {
      break
    }
  }
}
```

If you are using Redux Toolkit with TypeScript, note that the TypeScript compiler may not accept the implicit `toString()` conversion when the action creator is used as an object key. In that case, you may need to either manually cast it to a string (`actionCreator as string`), or use the `.type` field as the key.

## Creating Slices of State

Redux state is typically organized into "slices", defined by the reducers that are passed to `combineReducers`:

```js
import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import postsReducer from './postsReducer'

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
})
```

In this example, both `users` and `posts` would be considered "slices". Both of the reducers:

- "Own" a piece of state, including what the initial value is
- Define how that state is updated
- Define which specific actions result in state updates

The common approach is to define a slice's reducer function in its own file, and the action creators in a second file. Because both functions need to refer to the same action types, those are usually defined in a third file and imported in both places:

```js
// postsConstants.js
const CREATE_POST = 'CREATE_POST'
const UPDATE_POST = 'UPDATE_POST'
const DELETE_POST = 'DELETE_POST'

// postsActions.js
import { CREATE_POST, UPDATE_POST, DELETE_POST } from './postConstants'

export function addPost(id, title) {
  return {
    type: CREATE_POST,
    payload: { id, title },
  }
}

// postsReducer.js
import { CREATE_POST, UPDATE_POST, DELETE_POST } from './postConstants'

const initialState = []

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST: {
      // omit implementation
    }
    default:
      return state
  }
}
```

The only truly necessary part here is the reducer itself. Consider the other parts:

- We could have written the action types as inline strings in both places
- The action creators are good, but they're not _required_ to use Redux - a component could skip supplying a `mapDispatch` argument to `connect`, and just call `this.props.dispatch({type : "CREATE_POST", payload : {id : 123, title : "Hello World"}})` itself
- The only reason we're even writing multiple files is because it's common to separate code by what it does

The ["ducks" file structure](https://github.com/erikras/ducks-modular-redux) proposes putting all of your Redux-related logic for a given slice into a single file, like this:

```js
// postsDuck.js
const CREATE_POST = 'CREATE_POST'
const UPDATE_POST = 'UPDATE_POST'
const DELETE_POST = 'DELETE_POST'

export function addPost(id, title) {
  return {
    type: CREATE_POST,
    payload: { id, title },
  }
}

const initialState = []

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST: {
      // Omit actual code
      break
    }
    default:
      return state
  }
}
```

That simplifies things because we don't need to have multiple files, and we can remove the redundant imports of the action type constants. But, we still have to write the action types and the action creators by hand.

### Defining Functions in Objects

In modern JavaScript, there are several legal ways to define both keys and functions in an object (and this isn't specific to Redux), and you can mix and match different key definitions and function definitions. For example, these are all legal ways to define a function inside an object:

```js
const keyName = "ADD_TODO4";

const reducerObject = {
	// Explicit quotes for the key name, arrow function for the reducer
	"ADD_TODO1" : (state, action) => { }

	// Bare key with no quotes, function keyword
	ADD_TODO2 : function(state, action){  }

	// Object literal function shorthand
	ADD_TODO3(state, action) { }

	// Computed property
	[keyName] : (state, action) => { }
}
```

Using the ["object literal function shorthand"](https://www.sitepoint.com/es6-enhanced-object-literals/) is probably the shortest code, but feel free to use whichever of those approaches you want.

### Simplifying Slices with `createSlice`

To simplify this process, Redux Toolkit includes a `createSlice` function that will auto-generate the action types and action creators for you, based on the names of the reducer functions you provide.

Here's how that posts example would look with `createSlice`:

```js
const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {},
  },
})

console.log(postsSlice)
/*
{
    name: 'posts',
    actions : {
        createPost,
        updatePost,
        deletePost,
    },
    reducer
}
*/

const { createPost } = postsSlice.actions

console.log(createPost({ id: 123, title: 'Hello World' }))
// {type : "posts/createPost", payload : {id : 123, title : "Hello World"}}
```

`createSlice` looked at all of the functions that were defined in the `reducers` field, and for every "case reducer" function provided, generates an action creator that uses the name of the reducer as the action type itself. So, the `createPost` reducer became an action type of `"posts/createPost"`, and the `createPost()` action creator will return an action with that type.

### Exporting and Using Slices

Most of the time, you'll want to define a slice, and export its action creators and reducers. The recommended way to do this is using ES6 destructuring and export syntax:

```js
const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    createPost(state, action) {},
    updatePost(state, action) {},
    deletePost(state, action) {},
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = postsSlice
// Extract and export each action creator by name
export const { createPost, updatePost, deletePost } = actions
// Export the reducer, either as a default or named export
export default reducer
```

You could also just export the slice object itself directly if you prefer.

Slices defined this way are very similar in concept to the ["Redux Ducks" pattern](https://github.com/erikras/ducks-modular-redux) for defining and exporting action creators and reducers. However, there are a couple potential downsides to be aware of when importing and exporting slices.

First, **Redux action types are not meant to be exclusive to a single slice**. Conceptually, each slice reducer "owns" its own piece of the Redux state, but it should be able to listen to any action type and update its state appropriately. For example, many different slices might want to respond to a "user logged out" action by clearing data or resetting back to initial state values. Keep that in mind as you design your state shape and create your slices.

Second, **JS modules can have "circular reference" problems if two modules try to import each other**. This can result in imports being undefined, which will likely break the code that needs that import. Specifically in the case of "ducks" or slices, this can occur if slices defined in two different files both want to respond to actions defined in the other file.

This CodeSandbox example demonstrates the problem:

<iframe src="https://codesandbox.io/embed/rw7ppj4z0m/?runonclick=1" style={{ width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden' }} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

If you encounter this, you may need to restructure your code in a way that avoids the circular references. This will usually require extracting shared code to a separate common file that both modules can import and use. In this case, you might define some common action types in a separate file using `createAction`, import those action creators into each slice file, and handle them using the `extraReducers` argument.

The article [How to fix circular dependency issues in JS](https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de) has additional info and examples that can help with this issue.

## Asynchronous Logic and Data Fetching

### Using Middleware to Enable Async Logic

By itself, a Redux store doesn't know anything about async logic. It only knows how to synchronously dispatch actions, update the state by calling the root reducer function, and notify the UI that something has changed. Any asynchronicity has to happen outside the store.

But, what if you want to have async logic interact with the store by dispatching or checking the current store state? That's where [Redux middleware](https://redux.js.org/advanced/middleware) come in. They extend the store, and allow you to:

- Execute extra logic when any action is dispatched (such as logging the action and state)
- Pause, modify, delay, replace, or halt dispatched actions
- Write extra code that has access to `dispatch` and `getState`
- Teach `dispatch` how to accept other values besides plain action objects, such as functions and promises, by intercepting them and dispatching real action objects instead

[The most common reason to use middleware is to allow different kinds of async logic to interact with the store](https://redux.js.org/faq/actions#how-can-i-represent-side-effects-such-as-ajax-calls-why-do-we-need-things-like-action-creators-thunks-and-middleware-to-do-async-behavior). This allows you to write code that can dispatch actions and check the store state, while keeping that logic separate from your UI.

There are many kinds of async middleware for Redux, and each lets you write your logic using different syntax. The most common async middleware are:

- [`redux-thunk`](https://github.com/reduxjs/redux-thunk), which lets you write plain functions that may contain async logic directly
- [`redux-saga`](https://github.com/redux-saga/redux-saga), which uses generator functions that return descriptions of behavior so they can be executed by the middleware
- [`redux-observable`](https://github.com/redux-observable/redux-observable/), which uses the RxJS observable library to create chains of functions that process actions

[Each of these libraries has different use cases and tradeoffs](https://redux.js.org/faq/actions#what-async-middleware-should-i-use-how-do-you-decide-between-thunks-sagas-observables-or-something-else).

:::tip

Redux Toolkit's [**RTK Query data fetching API**](../rtk-query/overview.md) is a purpose built data fetching and caching solution for Redux apps, and can **eliminate the need to write _any_ thunks or reducers to manage data fetching**. We encourage you to try it out and see if it can help simplify the data fetching code in your own apps!

:::

If you do need to write data fetching logic yourself, we recommend [using the Redux Thunk middleware as the standard approach](https://github.com/reduxjs/redux-thunk), as it is sufficient for most typical use cases (such as basic AJAX data fetching). In addition, use of the `async/await` syntax in thunks makes them easier to read.

**The Redux Toolkit `configureStore` function [automatically sets up the thunk middleware by default](../api/getDefaultMiddleware.mdx)**, so you can immediately start writing thunks as part of your application code.

### Defining Async Logic in Slices

Redux Toolkit does not currently provide any special APIs or syntax for writing thunk functions. In particular, **they cannot be defined as part of a `createSlice()` call**. You have to write them separate from the reducer logic, exactly the same as with plain Redux code.

Thunks typically dispatch plain actions, such as `dispatch(dataLoaded(response.data))`.

Many Redux apps have structured their code using a "folder-by-type" approach. In that structure, thunk action creators are usually defined in an "actions" file, alongside the plain action creators.

Because we don't have separate "actions" files, **it makes sense to write these thunks directly in our "slice" files**. That way, they have access to the plain action creators from the slice, and it's easy to find where the thunk function lives.

A typical slice file that includes thunks would look like this:

```js
// First, define the reducer and action creators via `createSlice`
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: 'idle',
    users: [],
  },
  reducers: {
    usersLoading(state, action) {
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    usersReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.users = action.payload
      }
    },
  },
})

// Destructure and export the plain action creators
export const { usersLoading, usersReceived } = usersSlice.actions

// Define a thunk that dispatches those action creators
const fetchUsers = () => async (dispatch) => {
  dispatch(usersLoading())
  const response = await usersAPI.fetchAll()
  dispatch(usersReceived(response.data))
}
```

### Redux Data Fetching Patterns

Data fetching logic for Redux typically follows a predictable pattern:

- A "start" action is dispatched before the request to indicate that the request is in progress. This may be used to track loading state, to allow skipping duplicate requests, or show loading indicators in the UI.
- The async request is made
- Depending on the request result, the async logic dispatches either a "success" action containing the result data, or a "failure" action containing error details. The reducer logic clears the loading state in both cases, and either processes the result data from the success case, or stores the error value for potential display.

These steps are not required, but are [recommended in the Redux tutorials as a suggested pattern](https://redux.js.org/advanced/async-actions).

A typical implementation might look like:

```js
const getRepoDetailsStarted = () => ({
  type: "repoDetails/fetchStarted"
})
const getRepoDetailsSuccess = (repoDetails) => ({
  type: "repoDetails/fetchSucceeded",
  payload: repoDetails
})
const getRepoDetailsFailed = (error) => ({
  type: "repoDetails/fetchFailed",
  error
})
const fetchIssuesCount = (org, repo) => async dispatch => {
  dispatch(getRepoDetailsStarted())
  try {
    const repoDetails = await getRepoDetails(org, repo)
    dispatch(getRepoDetailsSuccess(repoDetails))
  } catch (err) {
    dispatch(getRepoDetailsFailed(err.toString()))
  }
}
```

However, writing code using this approach is tedious. Each separate type of request needs repeated similar implementation:

- Unique action types need to be defined for the three different cases
- Each of those action types usually has a corresponding action creator function
- A thunk has to be written that dispatches the correct actions in the right sequence

`createAsyncThunk` abstracts this pattern by generating the action types and action creators and generating a thunk that dispatches those actions.

### Async Requests with `createAsyncThunk`

As a developer, you are probably most concerned with the actual logic needed to make an API request, what action type names show up in the Redux action history log, and how your reducers should process the fetched data. The repetitive details of defining the multiple action types and dispatching the actions in the right sequence aren't what matters.

`createAsyncThunk` simplifies this process - you only need to provide a string for the action type prefix and a payload creator callback that does the actual async logic and returns a promise with the result. In return, `createAsyncThunk` will give you a thunk that will take care of dispatching the right actions based on the promise you return, and action types that you can handle in your reducers:

```js {5-11,22-25,30}
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
  },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))
```

The thunk action creator accepts a single argument, which will be passed as the first argument to your payload creator callback.

The payload creator will also receive a `thunkAPI` object containing the parameters that are normally passed to a standard Redux thunk function, as well as an auto-generated unique random request ID string and an [`AbortController.signal` object](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal):

```ts
interface ThunkAPI {
  dispatch: Function
  getState: Function
  extra?: any
  requestId: string
  signal: AbortSignal
}
```

You can use any of these as needed inside the payload callback to determine what the final result should be.

## Managing Normalized Data

Most applications typically deal with data that is deeply nested or relational. The goal of normalizing data is to efficiently organize the data in your state. This is typically done by storing collections as objects with the key of an `id`, while storing a sorted array of those `ids`. For a more in-depth explanation and further examples, there is a great reference in the [Redux docs page on "Normalizing State Shape"](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape).

### Normalizing by hand

Normalizing data doesn't require any special libraries. Here's a basic example of how you might normalize the response from a `fetchAll` API request that returns data in the shape of `{ users: [{id: 1, first_name: 'normalized', last_name: 'person'}] }`, using some hand-written logic:

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userAPI from './userAPI'

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await userAPI.fetchAll()
  return response.data
})

export const slice = createSlice({
  name: 'users',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // reduce the collection by the id property into a shape of { 1: { ...user }}
      const byId = action.payload.users.reduce((byId, user) => {
        byId[user.id] = user
        return byId
      }, {})
      state.entities = byId
      state.ids = Object.keys(byId)
    })
  },
})
```

Although we're capable of writing this code, it does become repetitive, especially if you're handling multiple types of data. In addition, this example only handles loading entries into the state, not updating them.

### Normalizing with `normalizr`

[`normalizr`](https://github.com/paularmstrong/normalizr) is a popular existing library for normalizing data. You can use it on its own without Redux, but it is very commonly used with Redux. The typical usage is to format collections from an API response and then process them in your reducers.

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'

import userAPI from './userAPI'

const userEntity = new schema.Entity('users')

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await userAPI.fetchAll()
  // Normalize the data before passing it to our reducer
  const normalized = normalize(response.data, [userEntity])
  return normalized.entities
})

export const slice = createSlice({
  name: 'users',
  initialState: {
    ids: [],
    entities: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.entities = action.payload.users
      state.ids = Object.keys(action.payload.users)
    })
  },
})
```

As with the hand-written version, this doesn't handle adding additional entries into the state, or updating them later - it's just loading in everything that was received.

### Normalizing with `createEntityAdapter`

Redux Toolkit's `createEntityAdapter` API provides a standardized way to store your data in a slice by taking a collection and putting it into the shape of `{ ids: [], entities: {} }`. Along with this predefined state shape, it generates a set of reducer functions and selectors that know how to work with the data.

```js
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import userAPI from './userAPI'

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await userAPI.fetchAll()
  // In this case, `response.data` would be:
  // [{id: 1, first_name: 'Example', last_name: 'User'}]
  return response.data
})

export const updateUser = createAsyncThunk('users/updateOne', async (arg) => {
  const response = await userAPI.updateUser(arg)
  // In this case, `response.data` would be:
  // { id: 1, first_name: 'Example', last_name: 'UpdatedLastName'}
  return response.data
})

export const usersAdapter = createEntityAdapter()

// By default, `createEntityAdapter` gives you `{ ids: [], entities: {} }`.
// If you want to track 'loading' or other keys, you would initialize them here:
// `getInitialState({ loading: false, activeRequestId: null })`
const initialState = usersAdapter.getInitialState()

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeUser: usersAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.upsertMany)
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      const { id, ...changes } = payload
      usersAdapter.updateOne(state, { id, changes })
    })
  },
})

const reducer = slice.reducer
export default reducer

export const { removeUser } = slice.actions
```

You can [view the full code of this example usage on CodeSandbox](https://codesandbox.io/s/rtk-entities-basic-example-1xubt)

### Using `createEntityAdapter` with Normalization Libraries

If you're already using `normalizr` or another normalization library, you could consider using it along with `createEntityAdapter`. To expand on the examples above, here is a demonstration of how we could use `normalizr` to format a payload, then leverage the utilities `createEntityAdapter` provides.

By default, the `setAll`, `addMany`, and `upsertMany` CRUD methods expect an array of entities. However, they also allow you to pass in an object that is in the shape of `{ 1: { id: 1, ... }}` as an alternative, which makes it easier to insert pre-normalized data.

```js
// features/articles/articlesSlice.js
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit'
import fakeAPI from '../../services/fakeAPI'
import { normalize, schema } from 'normalizr'

// Define normalizr entity schemas
export const userEntity = new schema.Entity('users')
export const commentEntity = new schema.Entity('comments', {
  commenter: userEntity,
})
export const articleEntity = new schema.Entity('articles', {
  author: userEntity,
  comments: [commentEntity],
})

const articlesAdapter = createEntityAdapter()

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (id) => {
    const data = await fakeAPI.articles.show(id)
    // Normalize the data so reducers can load a predictable payload, like:
    // `action.payload = { users: {}, articles: {}, comments: {} }`
    const normalized = normalize(data, articleEntity)
    return normalized.entities
  }
)

export const slice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      // Handle the fetch result by inserting the articles here
      articlesAdapter.upsertMany(state, action.payload.articles)
    })
  },
})

const reducer = slice.reducer
export default reducer

// features/users/usersSlice.js

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { fetchArticle } from '../articles/articlesSlice'

const usersAdapter = createEntityAdapter()

export const slice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      // And handle the same fetch result by inserting the users here
      usersAdapter.upsertMany(state, action.payload.users)
    })
  },
})

const reducer = slice.reducer
export default reducer

// features/comments/commentsSlice.js

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { fetchArticle } from '../articles/articlesSlice'

const commentsAdapter = createEntityAdapter()

export const slice = createSlice({
  name: 'comments',
  initialState: commentsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      // Same for the comments
      commentsAdapter.upsertMany(state, action.payload.comments)
    })
  },
})

const reducer = slice.reducer
export default reducer
```

You can [view the full code of this example `normalizr` usage on CodeSandbox](https://codesandbox.io/s/rtk-entities-basic-example-with-normalizr-bm3ie)

### Using selectors with `createEntityAdapter`

The entity adapter provides a selector factory that generates the most common selectors for you. Taking the examples above, we can add selectors to our `usersSlice` like this:

```js
// Rename the exports for readability in component usage
export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors((state) => state.users)
```

You could then use these selectors in a component like this:

```js
import React from 'react'
import { useSelector } from 'react-redux'
import { selectTotalUsers, selectAllUsers } from './usersSlice'

import styles from './UsersList.module.css'

export function UsersList() {
  const count = useSelector(selectTotalUsers)
  const users = useSelector(selectAllUsers)

  return (
    <div>
      <div className={styles.row}>
        There are <span className={styles.value}>{count}</span> users.{' '}
        {count === 0 && `Why don't you fetch some more?`}
      </div>
      {users.map((user) => (
        <div key={user.id}>
          <div>{`${user.first_name} ${user.last_name}`}</div>
        </div>
      ))}
    </div>
  )
}
```

### Specifying Alternate ID Fields

By default, `createEntityAdapter` assumes that your data has unique IDs in an `entity.id` field. If your data set stores its ID in a different field, you can pass in a `selectId` argument that returns the appropriate field.

```js
// In this instance, our user data always has a primary key of `idx`
const userData = {
  users: [
    { idx: 1, first_name: 'Test' },
    { idx: 2, first_name: 'Two' },
  ],
}

// Since our primary key is `idx` and not `id`,
// pass in an ID selector to return that field instead
export const usersAdapter = createEntityAdapter({
  selectId: (user) => user.idx,
})
```

### Sorting Entities

`createEntityAdapter` provides a `sortComparer` argument that you can leverage to sort the collection of `ids` in state. This can be very useful for when you want to guarantee a sort order and your data doesn't come presorted.

```js
// In this instance, our user data always has a primary key of `id`, so we do not need to provide `selectId`.
const userData = {
  users: [
    { id: 1, first_name: 'Test' },
    { id: 2, first_name: 'Banana' },
  ],
}

// Sort by `first_name`. `state.ids` would be ordered as
// `ids: [ 2, 1 ]`, since 'B' comes before 'T'.
// When using the provided `selectAll` selector, the result would be sorted:
// [{ id: 2, first_name: 'Banana' }, { id: 1, first_name: 'Test' }]
export const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.first_name.localeCompare(b.first_name),
})
```

## Working with Non-Serializable Data

One of the core usage principles for Redux is that [you should not put non-serializable values in state or actions](https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions).

However, like most rules, there are exceptions. There may be occasions when you have to deal with actions that need to accept non-serializable data. This should be done very rarely and only if necessary, and these non-serializable payloads shouldn't ever make it into your application state through a reducer.

The [serializability dev check middleware](../api/serializabilityMiddleware.mdx) will automatically warn anytime it detects non-serializable values in your actions or state. We encourage you to leave this middleware active to help avoid accidentally making mistakes. However, if you _do_ need to turnoff those warnings, you can customize the middleware by configuring it to ignore specific action types, or fields in actions and state:

```js
configureStore({
  //...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
})
```

### Use with Redux-Persist

If using Redux-Persist, you should specifically ignore all the action types it dispatches:

```jsx
import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
```

Additionally, you can purge any persisted state by adding an extra reducer to the specific slice that you would like to clear when calling persistor.purge(). This is especially helpful when you are looking to clear persisted state on a dispatched logout action.

```ts
import { PURGE } from "redux-persist";

...
extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
        customEntityAdapter.removeAll(state);
    });
}
```

It is also strongly recommended to blacklist any api(s) that you have configured with RTK Query. If the api slice reducer is not blacklisted, the api cache will be automatically persisted and restored which could leave you with phantom subscriptions from components that do not exist any more. Configuring this should look something like this:

```ts
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [pokemonApi.reducerPath],
};
```

See [Redux Toolkit #121: How to use this with Redux-Persist?](https://github.com/reduxjs/redux-toolkit/issues/121) and [Redux-Persist #988: non-serializable value error](https://github.com/rt2zz/redux-persist/issues/988#issuecomment-552242978) for further discussion.

### Use with React-Redux-Firebase

RRF includes timestamp values in most actions and state as of 3.x, but there are PRs that may improve that behavior as of 4.x.

A possible configuration to work with that behavior could look like:

```ts
import { configureStore } from '@reduxjs/toolkit'
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from 'react-redux-firebase'
import { constants as rfConstants } from 'redux-firestore'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          ...Object.keys(rfConstants.actionTypes).map(
            (type) => `${rfConstants.actionsPrefix}/${type}`
          ),
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
        ],
        ignoredPaths: ['firebase', 'firestore'],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }),
})

export default store
```

# Usage With TypeScript

:::tip What You'll Learn

- Details on how to use each Redux Toolkit API with TypeScript

:::

## Introduction

Redux Toolkit is written in TypeScript, and its API is designed to enable great integration with TypeScript applications.

This page provides specific details for each of the different APIs included in Redux Toolkit and how to type them correctly with TypeScript.

**See the [TypeScript Quick Start tutorial page](../tutorials/typescript.md) for a brief overview of how to set up and use Redux Toolkit and React Redux to work with TypeScript**.

:::info

If you encounter any problems with the types that are not described on this page, please [open an issue](https://github.com/reduxjs/redux-toolkit/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) for discussion.

:::

## `configureStore`

The basics of using `configureStore` are shown in [TypeScript Quick Start tutorial page](../tutorials/typescript.md). Here are some additional details that you might find useful.

### Getting the `State` type

The easiest way of getting the `State` type is to define the root reducer in advance and extract its `ReturnType`.  
It is recommended to give the type a different name like `RootState` to prevent confusion, as the type name `State` is usually overused.

```typescript
import { combineReducers } from '@reduxjs/toolkit'
const rootReducer = combineReducers({})
// highlight-start
export type RootState = ReturnType<typeof rootReducer>
// highlight-end
```

Alternatively, if you choose to not create a `rootReducer` yourself and instead pass the slice reducers directly to `configureStore()`, you need to slightly modify the typing to correctly infer the root reducer:

```ts
import { configureStore } from '@reduxjs/toolkit'
// ...
const store = configureStore({
  reducer: {
    one: oneSlice.reducer,
    two: twoSlice.reducer,
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store
```

If you pass the reducers directly to `configureStore()` and do not define the root reducer explicitly, there is no reference to `rootReducer`. 
Instead, you can refer to `store.getState`, in order to get the `State` type.

```typescript
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
const store = configureStore({
  reducer: rootReducer
})
export type RootState = ReturnType<typeof store.getState>
```


### Getting the `Dispatch` type

If you want to get the `Dispatch` type from your store, you can extract it after creating the store. It is recommended to give the type a different name like `AppDispatch` to prevent confusion, as the type name `Dispatch` is usually overused. You may also find it to be more convenient to export a hook like `useAppDispatch` shown below, then using it wherever you'd call `useDispatch`.

```typescript
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

// highlight-start
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
// highlight-end

export default store
```

### Correct typings for the `Dispatch` type

The type of the `dispatch` function type will be directly inferred from the `middleware` option. So if you add _correctly typed_ middlewares, `dispatch` should already be correctly typed.

As TypeScript often widens array types when combining arrays using the spread operator, we suggest using the `.concat(...)` and `.prepend(...)` methods of the `MiddlewareArray` returned by `getDefaultMiddleware()`.

```ts
import { configureStore } from '@reduxjs/toolkit'
import additionalMiddleware from 'additional-middleware'
import logger from 'redux-logger'
// @ts-ignore
import untypedMiddleware from 'untyped-middleware'
import rootReducer from './rootReducer'

export type RootState = ReturnType<typeof rootReducer>
const store = configureStore({
  reducer: rootReducer,
  // highlight-start
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // correctly typed middlewares can just be used
        additionalMiddleware,
        // you can also type middlewares manually
        untypedMiddleware as Middleware<
          (action: Action<'specialAction'>) => number,
          RootState
        >
      )
      // prepend and concat calls can be chained
      .concat(logger),
  // highlight-end
})

export type AppDispatch = typeof store.dispatch

export default store
```

#### Using `MiddlewareArray` without `getDefaultMiddleware`

If you want to skip the usage of `getDefaultMiddleware` altogether, you can still use `MiddlewareArray` for type-safe concatenation of your `middleware` array. This class extends the default JavaScript `Array` type, only with modified typings for `.concat(...)` and the additional `.prepend(...)` method.

This is generally not required though, as you will probably not run into any array-type-widening issues as long as you are using `as const` and do not use the spread operator.

So the following two calls would be equivalent:

```ts
import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'

configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(additionalMiddleware, logger),
})

configureStore({
  reducer: rootReducer,
  middleware: [additionalMiddleware, logger] as const,
})
```

### Using the extracted `Dispatch` type with React Redux

By default, the React Redux `useDispatch` hook does not contain any types that take middlewares into account. If you need a more specific type for the `dispatch` function when dispatching, you may specify the type of the returned `dispatch` function, or create a custom-typed version of `useSelector`. See [the React Redux documentation](https://react-redux.js.org/using-react-redux/static-typing#typing-the-usedispatch-hook) for details.

## `createAction`

For most use cases, there is no need to have a literal definition of `action.type`, so the following can be used:

```typescript
createAction<number>('test')
```

This will result in the created action being of type `PayloadActionCreator<number, string>`.

In some setups, you will need a literal type for `action.type`, though.
Unfortunately, TypeScript type definitions do not allow for a mix of manually-defined and inferred type parameters, so you'll have to specify the `type` both in the Generic definition as well as in the actual JavaScript code:

```typescript
createAction<number, 'test'>('test')
```

If you are looking for an alternate way of writing this without the duplication, you can use a prepare callback so that both type parameters can be inferred from arguments, removing the need to specify the action type.

```typescript
function withPayloadType<T>() {
  return (t: T) => ({ payload: t })
}
createAction('test', withPayloadType<string>())
```

### Alternative to using a literally-typed `action.type`

If you are using `action.type` as a discriminator on a discriminated union, for example to correctly type your payload in `case` statements, you might be interested in this alternative:

Created action creators have a `match` method that acts as a [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates):

```typescript
const increment = createAction<number>('increment')
function test(action: Action) {
  if (increment.match(action)) {
    // action.payload inferred correctly here
    action.payload
  }
}
```

This `match` method is also very useful in combination with `redux-observable` and RxJS's `filter` method.

## `createReducer`

The default way of calling `createReducer` would be with a "lookup table" / "map object", like this:

```typescript
createReducer(0, {
  increment: (state, action: PayloadAction<number>) => state + action.payload,
})
```

Unfortunately, as the keys are only strings, using that API TypeScript can neither infer nor validate the action types for you:

```typescript
{
  const increment = createAction<number, 'increment'>('increment')
  const decrement = createAction<number, 'decrement'>('decrement')
  createReducer(0, {
    [increment.type]: (state, action) => {
      // action is any here
    },
    [decrement.type]: (state, action: PayloadAction<string>) => {
      // even though action should actually be PayloadAction<number>, TypeScript can't detect that and won't give a warning here.
    },
  })
}
```

As an alternative, RTK includes a type-safe reducer builder API.

### Building Type-Safe Reducer Argument Objects

Instead of using a simple object as an argument to `createReducer`, you can also use a callback that receives a `ActionReducerMapBuilder` instance:

```typescript {3-10}
const increment = createAction<number, 'increment'>('increment')
const decrement = createAction<number, 'decrement'>('decrement')
createReducer(0, (builder) =>
  builder
    .addCase(increment, (state, action) => {
      // action is inferred correctly here
    })
    .addCase(decrement, (state, action: PayloadAction<string>) => {
      // this would error out
    })
)
```

We recommend using this API if stricter type safety is necessary when defining reducer argument objects.

#### Typing `builder.addMatcher`

As the first `matcher` argument to `builder.addMatcher`, a [type predicate](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) function should be used.
As a result, the `action` argument for the second `reducer` argument can be inferred by TypeScript:

```ts
function isNumberValueAction(action: AnyAction): action is PayloadAction<{ value: number }> {
  return typeof action.payload.value === 'number'
}

createReducer({ value: 0 }, builder =>
   builder.addMatcher(isNumberValueAction, (state, action) => {
      state.value += action.payload.value
   })
})
```

## `createSlice`

As `createSlice` creates your actions as well as your reducer for you, you don't have to worry about type safety here.
Action types can just be provided inline:

```typescript
const slice = createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
  },
})
// now available:
slice.actions.increment(2)
// also available:
slice.caseReducers.increment(0, { type: 'increment', payload: 5 })
```

If you have too many case reducers and defining them inline would be messy, or you want to reuse case reducers across slices, you can also define them outside the `createSlice` call and type them as `CaseReducer`:

```typescript
type State = number
const increment: CaseReducer<State, PayloadAction<number>> = (state, action) =>
  state + action.payload

createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment,
  },
})
```

### Defining the Initial State Type

You might have noticed that it is not a good idea to pass your `SliceState` type as a generic to `createSlice`. This is due to the fact that in almost all cases, follow-up generic parameters to `createSlice` need to be inferred, and TypeScript cannot mix explicit declaration and inference of generic types within the same "generic block".

The standard approach is to declare an interface or type for your state, create an initial state value that uses that type, and pass the initial state value to `createSlice`. You can also use the construct `initialState: myInitialState as SliceState`.

```ts {1,4,8,15}
type SliceState = { state: 'loading' } | { state: 'finished'; data: string }

// First approach: define the initial state using that type
const initialState: SliceState = { state: 'loading' }

createSlice({
  name: 'test1',
  initialState, // type SliceState is inferred for the state of the slice
  reducers: {},
})

// Or, cast the initial state as necessary
createSlice({
  name: 'test2',
  initialState: { state: 'loading' } as SliceState,
  reducers: {},
})
```

which will result in a `Slice<SliceState, ...>`.

### Defining Action Contents with `prepare` Callbacks

If you want to add a `meta` or `error` property to your action, or customize the `payload` of your action, you have to use the `prepare` notation.

Using this notation with TypeScript looks like this:

```ts {5-16}
const blogSlice = createSlice({
  name: 'blogData',
  initialState,
  reducers: {
    receivedAll: {
      reducer(
        state,
        action: PayloadAction<Page[], string, { currentPage: number }>
      ) {
        state.all = action.payload
        state.meta = action.meta
      },
      prepare(payload: Page[], currentPage: number) {
        return { payload, meta: { currentPage } }
      },
    },
  },
})
```

### Generated Action Types for Slices

As TS cannot combine two string literals (`slice.name` and the key of `actionMap`) into a new literal, all actionCreators created by `createSlice` are of type 'string'. This is usually not a problem, as these types are only rarely used as literals.

In most cases that `type` would be required as a literal, the `slice.action.myAction.match` [type predicate](https://www.typescriptlang.org/docs/handbook/advanced-types.html#using-type-predicates) should be a viable alternative:

```ts {10}
const slice = createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
  },
})

function myCustomMiddleware(action: Action) {
  if (slice.actions.increment.match(action)) {
    // `action` is narrowed down to the type `PayloadAction<number>` here.
  }
}
```

If you actually _need_ that type, unfortunately there is no other way than manual casting.

### Type safety with `extraReducers`

Reducer lookup tables that map an action `type` string to a reducer function are not easy to fully type correctly. This affects both `createReducer` and the `extraReducers` argument for `createSlice`. So, like with `createReducer`, [you may also use the "builder callback" approach](#building-type-safe-reducer-argument-objects) for defining the reducer object argument.

This is particularly useful when a slice reducer needs to handle action types generated by other slices, or generated by specific calls to `createAction` (such as the actions generated by [`createAsyncThunk`](../api/createAsyncThunk.mdx)).

```ts {27-30}
const fetchUserById = createAsyncThunk(
  'users/fetchById',
  // if you type your function argument here
  async (userId: number) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`)
    return (await response.json()) as Returned
  }
)

interface UsersState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  entities: [],
  loading: 'idle',
} as UsersState

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // fill in primary logic here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state, action) => {
      // both `state` and `action` are now correctly typed
      // based on the slice state and the `pending` action creator
    })
  },
})
```

Like the `builder` in `createReducer`, this `builder` also accepts `addMatcher` (see [typing `builder.matcher`](#typing-builderaddmatcher)) and `addDefaultCase`.

### Wrapping `createSlice`

If you need to reuse reducer logic, it is common to write ["higher-order reducers"](https://redux.js.org/recipes/structuring-reducers/reusing-reducer-logic#customizing-behavior-with-higher-order-reducers) that wrap a reducer function with additional common behavior. This can be done with `createSlice` as well, but due to the complexity of the types for `createSlice`, you have to use the `SliceCaseReducers` and `ValidateSliceCaseReducers` types in a very specific way.

Here is an example of such a "generic" wrapped `createSlice` call:

```ts
interface GenericState<T> {
  data?: T
  status: 'loading' | 'finished' | 'error'
}

const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
  name = '',
  initialState,
  reducers,
}: {
  name: string
  initialState: GenericState<T>
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = 'loading'
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload
        state.status = 'finished'
      },
      ...reducers,
    },
  })
}

const wrappedSlice = createGenericSlice({
  name: 'test',
  initialState: { status: 'loading' } as GenericState<string>,
  reducers: {
    magic(state) {
      state.status = 'finished'
      state.data = 'hocus pocus'
    },
  },
})
```

## `createAsyncThunk`

In the most common use cases, you should not need to explicitly declare any types for the `createAsyncThunk` call itself.

Just provide a type for the first argument to the `payloadCreator` argument as you would for any function argument, and the resulting thunk will accept the same type as its input parameter.
The return type of the `payloadCreator` will also be reflected in all generated action types.

```ts
interface MyData {
  // ...
}

const fetchUserById = createAsyncThunk(
  'users/fetchById',
  // highlight-start
  // Declare the type your function argument here:
  async (userId: number) => {
    // highlight-end
    const response = await fetch(`https://reqres.in/api/users/${userId}`)
    // Inferred return type: Promise<MyData>
    // highlight-next-line
    return (await response.json()) as MyData
  }
)

// the parameter of `fetchUserById` is automatically inferred to `number` here
// and dispatching the resulting thunkAction will return a Promise of a correctly
// typed "fulfilled" or "rejected" action.
const lastReturnedAction = await store.dispatch(fetchUserById(3))
```

The second argument to the `payloadCreator`, known as `thunkApi`, is an object containing references to the `dispatch`, `getState`, and `extra` arguments from the thunk middleware as well as a utility function called `rejectWithValue`. If you want to use these from within the `payloadCreator`, you will need to define some generic arguments, as the types for these arguments cannot be inferred. Also, as TS cannot mix explicit and inferred generic parameters, from this point on you'll have to define the `Returned` and `ThunkArg` generic parameter as well.

To define the types for these arguments, pass an object as the third generic argument, with type declarations for some or all of these fields:

```ts
type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: unknown
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown
}
```

```ts
const fetchUserById = createAsyncThunk<
  // highlight-start
  // Return type of the payload creator
  MyData,
  // First argument to the payload creator
  number,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    state: State
    extra: {
      jwt: string
    }
  }
  // highlight-end
>('users/fetchById', async (userId, thunkApi) => {
  const response = await fetch(`https://reqres.in/api/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
    },
  })
  return (await response.json()) as MyData
})
```

If you are performing a request that you know will typically either be a success or have an expected error format, you can pass in a type to `rejectValue` and `return rejectWithValue(knownPayload)` in the action creator. This allows you to reference the error payload in the reducer as well as in a component after dispatching the `createAsyncThunk` action.

```ts
interface MyKnownError {
  errorMessage: string
  // ...
}
interface UserAttributes {
  id: string
  first_name: string
  last_name: string
  email: string
}

const updateUser = createAsyncThunk<
  // Return type of the payload creator
  MyData,
  // First argument to the payload creator
  UserAttributes,
  // Types for ThunkAPI
  {
    extra: {
      jwt: string
    }
    rejectValue: MyKnownError
  }
>('users/update', async (user, thunkApi) => {
  const { id, ...userData } = user
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${thunkApi.extra.jwt}`,
    },
    body: JSON.stringify(userData),
  })
  if (response.status === 400) {
    // Return the known error for future handling
    return thunkApi.rejectWithValue((await response.json()) as MyKnownError)
  }
  return (await response.json()) as MyData
})
```

While this notation for `state`, `dispatch`, `extra` and `rejectValue` might seem uncommon at first, it allows you to provide only the types for these you actually need - so for example, if you are not accessing `getState` within your `payloadCreator`, there is no need to provide a type for `state`. The same can be said about `rejectValue` - if you don't need to access any potential error payload, you can ignore it.

In addition, you can leverage checks against `action.payload` and `match` as provided by `createAction` as a type-guard for when you want to access known properties on defined types. Example:

- In a reducer

```ts
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error
      }
    })
  },
})
```

- In a component

```ts
const handleUpdateUser = async (userData) => {
  const resultAction = await dispatch(updateUser(userData))
  if (updateUser.fulfilled.match(resultAction)) {
    const user = resultAction.payload
    showToast('success', `Updated ${user.name}`)
  } else {
    if (resultAction.payload) {
      // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
      // Note: this would also be a good place to do any handling that relies on the `rejectedWithValue` payload, such as setting field errors
      showToast('error', `Update failed: ${resultAction.payload.errorMessage}`)
    } else {
      showToast('error', `Update failed: ${resultAction.error.message}`)
    }
  }
}
```

## `createEntityAdapter`

Typing `createEntityAdapter` only requires you to specify the entity type as the single generic argument.

The example from the `createEntityAdapter` documentation would look like this in TypeScript:

```ts
interface Book {
  bookId: number
  title: string
  // ...
}

// highlight-next-line
const booksAdapter = createEntityAdapter<Book>({
  selectId: (book) => book.bookId,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {
    bookAdded: booksAdapter.addOne,
    booksReceived(state, action: PayloadAction<{ books: Book[] }>) {
      booksAdapter.setAll(state, action.payload.books)
    },
  },
})
```

### Using `createEntityAdapter` with `normalizr`

When using a library like [`normalizr`](https://github.com/paularmstrong/normalizr/), your normalized data will resemble this shape:

```js
{
  result: 1,
  entities: {
    1: { id: 1, other: 'property' },
    2: { id: 2, other: 'property' }
  }
}
```

The methods `addMany`, `upsertMany`, and `setAll` all allow you to pass in the `entities` portion of this directly with no extra conversion steps. However, the `normalizr` TS typings currently do not correctly reflect that multiple data types may be included in the results, so you will need to specify that type structure yourself.

Here is an example of how that would look:

```ts
type Author = { id: number; name: string }
type Article = { id: number; title: string }
type Comment = { id: number; commenter: number }

export const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (id: number) => {
    const data = await fakeAPI.articles.show(id)
    // Normalize the data so reducers can responded to a predictable payload.
    // Note: at the time of writing, normalizr does not automatically infer the result,
    // so we explicitly declare the shape of the returned normalized data as a generic arg.
    const normalized = normalize<
      any,
      {
        articles: { [key: string]: Article }
        users: { [key: string]: Author }
        comments: { [key: string]: Comment }
      }
    >(data, articleEntity)
    return normalized.entities
  }
)

export const slice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticle.fulfilled, (state, action) => {
      // The type signature on action.payload matches what we passed into the generic for `normalize`, allowing us to access specific properties on `payload.articles` if desired
      articlesAdapter.upsertMany(state, action.payload.articles)
    })
  },
})
```

# Writing Reducers with Immer

Redux Toolkit's [`createReducer`](../api/createReducer.mdx) and [`createSlice`](../api/createSlice.mdx) automatically use [Immer](https://immerjs.github.io/immer/) internally to let you write simpler immutable update logic using "mutating" syntax. This helps simplify most reducer implementations.

Because Immer is itself an abstraction layer, it's important to understand why Redux Toolkit uses Immer, and how to use it correctly.

## Immutability and Redux

### Basics of Immutability

"Mutable" means "changeable". If something is "immutable", it can never be changed.

JavaScript objects and arrays are all mutable by default. If I create an object, I can change the contents of its fields. If I create an array, I can change the contents as well:

```js
const obj = { a: 1, b: 2 }
// still the same object outside, but the contents have changed
obj.b = 3

const arr = ['a', 'b']
// In the same way, we can change the contents of this array
arr.push('c')
arr[1] = 'd'
```

This is called _mutating_ the object or array. It's the same object or array reference in memory, but now the contents inside the object have changed.

**In order to update values immutably, your code must make _copies_ of existing objects/arrays, and then modify the copies**.

We can do this by hand using JavaScript's array / object spread operators, as well as array methods that return new copies of the array instead of mutating the original array:

```js
const obj = {
  a: {
    // To safely update obj.a.c, we have to copy each piece
    c: 3,
  },
  b: 2,
}

const obj2 = {
  // copy obj
  ...obj,
  // overwrite a
  a: {
    // copy obj.a
    ...obj.a,
    // overwrite c
    c: 42,
  },
}

const arr = ['a', 'b']
// Create a new copy of arr, with "c" appended to the end
const arr2 = arr.concat('c')

// or, we can make a copy of the original array:
const arr3 = arr.slice()
// and mutate the copy:
arr3.push('c')
```

:::info Want to Know More?

For more info on how immutability works in JavaScript, see:

- [A Visual Guide to References in JavaScript](https://daveceddia.com/javascript-references/)
- [Immutability in React and Redux: The Complete Guide](https://daveceddia.com/react-redux-immutability-guide/)

:::

### Reducers and Immutable Updates

One of the primary rules of Redux is that **our reducers are _never_ allowed to mutate the original / current state values!**

:::warning

```js
// ❌ Illegal - by default, this will mutate the state!
state.value = 123
```

:::

There are several reasons why you must not mutate state in Redux:

- It causes bugs, such as the UI not updating properly to show the latest values
- It makes it harder to understand why and how the state has been updated
- It makes it harder to write tests
- It breaks the ability to use "time-travel debugging" correctly
- It goes against the intended spirit and usage patterns for Redux

So if we can't change the originals, how do we return an updated state?

:::tip

**Reducers can only make _copies_ of the original values, and then they can mutate the copies.**

```js
// ✅ This is safe, because we made a copy
return {
  ...state,
  value: 123,
}
```

:::

We already saw that we can write immutable updates by hand, by using JavaScript's array / object spread operators and other functions that return copies of the original values.

This becomes harder when the data is nested. **A critical rule of immutable updates is that you must make a copy of _every_ level of nesting that needs to be updated.**

A typical example of this might look like:

```js
function handwrittenReducer(state, action) {
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue,
        },
      },
    },
  }
}
```

However, if you're thinking that "writing immutable updates by hand this way looks hard to remember and do correctly"... yeah, you're right! :)

Writing immutable update logic by hand _is_ hard, and **accidentally mutating state in reducers is the single most common mistake Redux users make**.

## Immutable Updates with Immer

[Immer](https://immerjs.github.io/immer/) is a library that simplifies the process of writing immutable update logic.

Immer provides a function called `produce`, which accepts two arguments: your original `state`, and a callback function. The callback function is given a "draft" version of that state, and inside the callback, it is safe to write code that mutates the draft value. Immer tracks all attempts to mutate the draft value and then replays those mutations using their immutable equivalents to create a safe, immutably updated result:

```js
import produce from 'immer'

const baseState = [
  {
    todo: 'Learn typescript',
    done: true,
  },
  {
    todo: 'Try immer',
    done: false,
  },
]

const nextState = produce(baseState, (draftState) => {
  // "mutate" the draft array
  draftState.push({ todo: 'Tweet about it' })
  // "mutate" the nested state
  draftState[1].done = true
})

console.log(baseState === nextState)
// false - the array was copied
console.log(baseState[0] === nextState[0])
// true - the first item was unchanged, so same reference
console.log(baseState[1] === nextState[1])
// false - the second item was copied and updated
```

### Redux Toolkit and Immer

Redux Toolkit's [`createReducer` API](../api/createReducer.mdx) uses Immer internally automatically. So, it's already safe to "mutate" state inside of any case reducer function that is passed to `createReducer`:

```js
const todosReducer = createReducer([], (builder) => {
  builder.addCase('todos/todoAdded', (state, action) => {
    // "mutate" the array by calling push()
    state.push(action.payload)
  })
})
```

In turn, `createSlice` uses `createReducer` inside, so it's also safe to "mutate" state there as well:

```js
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      state.push(action.payload)
    },
  },
})
```

This even applies if the case reducer functions are defined outside of the `createSlice/createReducer` call. For example, you could have a reusable case reducer function that expects to "mutate" its state, and include it as needed:

```js
const addItemToArray = (state, action) => {
  state.push(action.payload)
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded: addItemToArray,
  },
})
```

This works because the "mutating" logic is wrapped in Immer's `produce` method internally when it executes.

:::caution

Remember, **the "mutating" logic _only_ works correctly when wrapped inside of Immer!** Otherwise, that code _will_ really mutate the data.

:::

## Immer Usage Patterns

There are several useful patterns to know about and gotchas to watch out for when using Immer in Redux Toolkit.

### Mutating and Returning State

Immer works by tracking attempts to mutate an existing drafted state value, either by assigning to nested fields or by calling functions that mutate the value. That means that **the `state` must be a JS object or array in order for Immer to see the attempted changes**. (You can still have a slice's state be a primitive like a string or a boolean, but since primitives can never be mutated anyway, all you can do is just return a new value.)

In any given case reducer, **Immer expects that you will either _mutate_ the existing state, _or_ construct a new state value yourself and return it, but _not_ both in the same function!** For example, both of these are valid reducers with Immer:

```js
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    todoAdded(state, action) {
      // "Mutate" the existing state, no return value needed
      state.push(action.payload)
    },
    todoDeleted(state, action.payload) {
      // Construct a new result array immutably and return it
      return state.filter(todo => todo.id !== action.payload)
    }
  }
})
```

However, it _is_ possible to use immutable updates to do part of the work and then save the results via a "mutation". An example of this might be filtering a nested array:

```js
const todosSlice = createSlice({
  name: 'todos',
  initialState: {todos: [], status: 'idle'}
  reducers: {
    todoDeleted(state, action.payload) {
      // Construct a new array immutably
      const newTodos = state.todos.filter(todo => todo.id !== action.payload)
      // "Mutate" the existing state to save the new array
      state.todos = newTodos
    }
  }
})
```

Note that **mutating state in an arrow function with an implicit return breaks this rule and causes an error!** This is because statements and function calls may return a value, and Immer sees both the attempted mutation and _and_ the new returned value and doesn't know which to use as the result. Some potential solutions are using the `void` keyword to skip having a return value, or using curly braces to give the arrow function a body and no return value:

```js
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    // ❌ ERROR: mutates state, but also returns new array size!
    brokenReducer: (state, action) => state.push(action.payload),
    // ✅ SAFE: the `void` keyword prevents a return value
    fixedReducer1: (state, action) => void state.push(action.payload),
    // ✅ SAFE: curly braces make this a function body and no return
    fixedReducer2: (state, action) => {
      state.push(action.payload)
    },
  },
})
```

While writing nested immutable update logic is hard, there are times when it _is_ simpler to do an object spread operation to update multiple fields at once, vs assigning individual fields:

```js
function objectCaseReducer1(state, action) {
  const { a, b, c, d } = action.payload
  return {
    ...state,
    a,
    b,
    c,
    d,
  }
}

function objectCaseReducer2(state, action) {
  const { a, b, c, d } = action.payload
  // This works, but we keep having to repeat `state.x =`
  state.a = a
  state.b = b
  state.c = c
  state.d = d
}
```

As an alternative, you can use `Object.assign` to mutate multiple fields at once, since `Object.assign` always mutates the first object that it's given:

```js
function objectCaseReducer3(state, action) {
  const { a, b, c, d } = action.payload
  Object.assign(state, { a, b, c, d })
}
```

### Resetting and Replacing State

Sometimes you may want to replace the entire existing `state`, either because you've loaded some new data, or you want to reset the state back to its initial value.

:::warning

**A common mistake is to try assigning `state = someValue` directly. This will not work!** This only points the local `state` variable to a different reference. That is neither mutating the existing `state` object/array in memory, nor returning an entirely new value, so Immer does not make any actual changes.

:::

Instead, to replace the existing state, you should return the new value directly:

```js
const initialState = []
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    brokenTodosLoadedReducer(state, action) {
      // ❌ ERROR: does not actually mutate or return anything new!
      state = action.payload
    },
    fixedTodosLoadedReducer(state, action) {
      // ✅ CORRECT: returns a new value to replace the old one
      return action.payload
    },
    correctResetTodosReducer(state, action) {
      // ✅ CORRECT: returns a new value to replace the old one
      return initialState
    },
  },
})
```

### Debugging and Inspecting Drafted State

It's common to want to log in-progress state from a reducer to see what it looks like as it's being updated, like `console.log(state)`. Unfortunately, browsers display logged Proxy instances in a format that is hard to read or understand:

![Logged proxy draft](/img/usage/immer-reducers/logged-proxy.png)

To work around this, [Immer includes a `current` function that extracts a copy of the wrapped data](https://immerjs.github.io/immer/current), and RTK re-exports `current`. You can use this in your reducers if you need to log or inspect the work-in-progress state:

```js
import { current } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosAdapter.getInitialState(),
  reducers: {
    todoToggled(state, action) {
      // ❌ ERROR: logs the Proxy-wrapped data
      console.log(state)
      // ✅ CORRECT: logs a plain JS copy of the current data
      console.log(current(state))
    },
  },
})
```

The correct output would look like this instead:

![Logged current value](/img/usage/immer-reducers/logged-current-state.png)

Immer also provides [`original` and `isDraft` functions](https://immerjs.github.io/immer/original), which retrieves the original data without any updates applied and check to see if a given value is a Proxy-wrapped draft. As of RTK 1.5.1, both of those are re-exported from RTK as well.

### Updating Nested Data

Immer greatly simplifies updating nested data. Nested objects and arrays are also wrapped in Proxies and drafted, and it's safe to pull out a nested value into its own variable and then mutate it.

However, this still only applies to objects and arrays. If we pull out a primitive value into its own variable and try to update it, Immer has nothing to wrap and cannot track any updates:

```js
const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    brokenTodoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        // ❌ ERROR: Immer can't track updates to a primitive value!
        let { completed } = todo
        completed = !completed
      }
    },
    fixedTodoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload)
      if (todo) {
        // ✅ CORRECT: This object is still wrapped in a Proxy, so we can "mutate" it
        todo.completed = !todo.completed
      }
    },
  },
})
```

There _is_ a gotcha here. [Immer will not wrap objects that are newly inserted into the state](https://immerjs.github.io/immer/pitfalls#data-not-originating-from-the-state-will-never-be-drafted). Most of the time this shouldn't matter, but there may be occasions when you want to insert a value and then make further updates to it.

Related to this, RTK's [`createEntityAdapter` update functions](../api/createEntityAdapter.mdx#crud-functions) can either be used as standalone reducers, or "mutating" update functions. These functions determine whether to "mutate" or return a new value by checking to see if the state they're given is wrapped in a draft or not. If you are calling these functions yourself inside of a case reducer, be sure you know whether you're passing them a draft value or a plain value.

Finally, it's worth noting that **Immer does not automatically create nested objects or arrays for you - you have to create them yourself**. As an example, say we have a lookup table containing nested arrays, and we want to insert an item into one of those arrays. If we unconditionally try to insert without checking for the existence of that array, the logic will crash when the array doesn't exist. Instead, you'd need to ensure the array exists first:

```js
const itemsSlice = createSlice({
  name: 'items',
  initialState: { a: [], b: [] },
  reducers: {
    brokenNestedItemAdded(state, action) {
      const { id, item } = action.payload
      // ❌ ERROR: will crash if no array exists for `id`!
      state[id].push(item)
    },
    fixedNestedItemAdded(state, action) {
      const { id, item } = action.payload
      // ✅ CORRECT: ensures the nested array always exists first
      if (!state[id]) {
        state[id] = []
      }

      state[id].push(item)
    },
  },
})
```

### Linting State Mutations

Many ESLint configs include the https://eslint.org/docs/rules/no-param-reassign rule, which may also warn about mutations to nested fields. That can cause the rule to warn about mutations to `state` in Immer-powered reducers, which is not helpful.

To resolve this, you can tell the ESLint rule to ignore mutations to a parameter named `state`:

```js
{
  'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }]
}

```

## Why Immer is Built In

We've received a number of requests over time to make Immer an optional part of RTK's `createSlice` and `createReducer` APIs, rather than strictly required.

Our answer is always the same: **Immer _is required_ in RTK, and that is not going to change**.

It's worth going over the reasons why we consider Immer to be a critical part of RTK and why we will not make it optional.

### Benefits of Immer

Immer has two primary benefits. First, **Immer drastically simplifies immutable update logic**. [Proper immutable updates are extremely verbose](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns#updating-nested-objects). Those verbose operations are hard to read overall, and also obfuscate what the actual intent of the update statement is. Immer eliminates all the nested spreads and array slices. Not only is the code shorter and easier to read, it's much more clear what actual update is supposed to happen.

Second, [writing immutable updates correctly is _hard_](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns), and it is really easy to make mistakes (like forgetting to copy a level of nesting in a set of object spreads, copying a top-level array and not the item to be updated inside the array, or forgetting that `array.sort()` mutates the array). This is part of why [accidental mutations has always been the most common cause of Redux bugs](https://redux.js.org/faq/react-redux#why-isnt-my-component-re-rendering-or-my-mapstatetoprops-running). **Immer effectively _eliminates_ accidental mutations**. Not only are there no more spread operations that can be mis-written, but Immer freezes state automatically as well. This causes errors to be thrown if you do accidentally mutate, even outside of a reducer. **Eliminating the #1 cause of Redux bugs is a _huge_ improvement.**

Additionally, RTK Query uses Immer's patch capabilities to enable [optimistic updates and manual cache updates](../rtk-query/usage/manual-cache-updates.mdx) as well.

### Tradeoffs and Concerns

Like any tool, using Immer does have tradeoffs, and users have expressed a number of concerns about using it.

Immer does add to the overall app bundle size. It's about 8K min, 3.3K min+gz (ref: [Immer docs: Installation](https://immerjs.github.io/immer/installation), [Bundle.js.org analysis](https://bundle.js.org/?q=immer&treeshake=[{default+as+produce+}])). However, that library bundle size starts to pay for itself by shrinking the amount of reducer logic in your app. Additionally, the benefits of more readable code and eliminating mutation bugs are worth the size.

Immer also adds a bit of overhead in runtime performance. However, [per the Immer "Performance" docs page, the overhead is not meaningful in practice](https://immerjs.github.io/immer/performance/). Additionally, [reducers are almost never a perf bottleneck in a Redux app anyway](https://github.com/reduxjs/redux-toolkit/issues/242#issuecomment-583296008). Instead, the cost of updating the UI is much more important.

So, while using Immer isn't "free", the bundle and perf costs are small enough to be worth it.

The most realistic pain point with using Immer is that browser debuggers show Proxies in a confusing way, which makes it hard to inspect state variables while debugging. This is certainly an annoyance. However, this doesn't actually affect runtime behavior, and we've [documented the use of `current` to create a viewable plain JS version of the data](#debugging-and-inspecting-drafted-state) above in this page. (Given the increasingly wide use of Proxies as part of libraries like Mobx and Vue 3, this is also not unique to Immer.)

Another issue is education and understanding. Redux has always required immutability in reducers, and so seeing "mutating" code can be confusing. It's certainly possible that new Redux users might see those "mutations" in example code, assume that it's normal for Redux usage, and later try to do the same thing outside of `createSlice`. This would indeed cause real mutations and bugs, because it's outside of Immer's ability to wrap the updates.

We've addressed this by [repeatedly emphasizing the important of immutability throughout our docs](https://redux.js.org/tutorials/essentials/part-1-overview-concepts#immutability), including multiple highlighted sections emphasizing that [the "mutations" only work right thanks to Immer's "magic" inside](https://redux.js.org/tutorials/essentials/part-2-app-structure#reducers-and-immutable-updates) and adding this specific docs page you're reading now.

### Architecture and Intent

There's two more reasons why Immer is not optional.

One is RTK's architecture. `createSlice` and `createReducer` are implemented by directly importing Immer. There's no easy way to create a version of either of them that would have a hypothetical `immer: false` option. You can't do optional imports, and we need Immer available immediately and synchronously during the initial load of the app.

Additionally, RTK currently calls [Immer's `enableES5` plugin](https://immerjs.github.io/immer/installation#pick-your-immer-version) immediately on import, in order to ensure that Immer works correctly in environments without ES6 Proxy support (such as IE11 and older React Native versions). This is necessary because Immer split out the ES5 behavior into a plugin around version 6.0, but dropping the ES5 support would have been a major breaking change for RTK and broken our users. Because RTK itself calls `enableES5` from the entry point, Immer is _always_ pulled in.

And finally: **Immer is built into RTK by default because we believe it is the best choice for our users!** We _want_ our users to be using Immer, and consider it to be a critical non-negotiable component of RTK. The great benefits like simpler reducer code and preventing accidental mutations far outweigh the relatively small concerns.

## Further Information

See [the Immer documentation](https://immerjs.github.io/immer/) for more details on Immer's APIs, edge cases, and behavior.

For historical discussion on why Immer is required, see these issues:

- [RTK #5: Why Immer inside a starter kit?](https://github.com/reduxjs/redux-toolkit/issues/5)
- [RTK #183: Consider adding an option to remove Immer](https://github.com/reduxjs/redux-toolkit/issues/183)
- [RTK #242: make `immer` optional for `createReducer`](https://github.com/reduxjs/redux-toolkit/issues/242)


# `configureStore`

A friendly abstraction over the standard Redux `createStore` function that adds good defaults
to the store setup for a better development experience.

## Parameters

`configureStore` accepts a single configuration object parameter, with the following options:

```ts no-transpile
type ConfigureEnhancersCallback = (
  defaultEnhancers: StoreEnhancer[]
) => StoreEnhancer[]

interface ConfigureStoreOptions<
  S = any,
  A extends Action = AnyAction,
  M extends Middlewares<S> = Middlewares<S>
> {
  /**
   * A single reducer function that will be used as the root reducer, or an
   * object of slice reducers that will be passed to `combineReducers()`.
   */
  reducer: Reducer<S, A> | ReducersMapObject<S, A>

  /**
   * An array of Redux middleware to install. If not supplied, defaults to
   * the set of middleware returned by `getDefaultMiddleware()`.
   */
  middleware?: ((getDefaultMiddleware: CurriedGetDefaultMiddleware<S>) => M) | M

  /**
   * Whether to enable Redux DevTools integration. Defaults to `true`.
   *
   * Additional configuration can be done by passing Redux DevTools options
   */
  devTools?: boolean | DevToolsOptions

  /**
   * The initial state, same as Redux's createStore.
   * You may optionally specify it to hydrate the state
   * from the server in universal apps, or to restore a previously serialized
   * user session. If you use `combineReducers()` to produce the root reducer
   * function (either directly or indirectly by passing an object as `reducer`),
   * this must be an object with the same shape as the reducer map keys.
   */
  preloadedState?: DeepPartial<S extends any ? S : S>

  /**
   * The store enhancers to apply. See Redux's `createStore()`.
   * All enhancers will be included before the DevTools Extension enhancer.
   * If you need to customize the order of enhancers, supply a callback
   * function that will receive the original array (ie, `[applyMiddleware]`),
   * and should return a new array (such as `[applyMiddleware, offline]`).
   * If you only need to add middleware, you can use the `middleware` parameter instead.
   */
  enhancers?: StoreEnhancer[] | ConfigureEnhancersCallback
}

function configureStore<S = any, A extends Action = AnyAction>(
  options: ConfigureStoreOptions<S, A>
): EnhancedStore<S, A>
```

### `reducer`

If this is a single function, it will be directly used as the root reducer for the store.

If it is an object of slice reducers, like `{users : usersReducer, posts : postsReducer}`,
`configureStore` will automatically create the root reducer by passing this object to the
[Redux `combineReducers` utility](https://redux.js.org/api/combinereducers).

### `middleware`

An optional array of Redux middleware functions

If this option is provided, it should contain all the middleware functions you
want added to the store. `configureStore` will automatically pass those to `applyMiddleware`.

If not provided, `configureStore` will call `getDefaultMiddleware` and use the
array of middleware functions it returns.

Where you wish to add onto or customize the default middleware,
you may pass a callback function that will receive `getDefaultMiddleware` as its argument,
and should return a middleware array.

For more details on how the `middleware` parameter works and the list of middleware that are added by default, see the
[`getDefaultMiddleware` docs page](./getDefaultMiddleware.mdx).

### `devTools`

If this is a boolean, it will be used to indicate whether `configureStore` should automatically enable support for [the Redux DevTools browser extension](https://github.com/zalmoxisus/redux-devtools-extension).

If it is an object, then the DevTools Extension will be enabled, and the options object will be passed to `composeWithDevtools()`. See
the DevTools Extension docs for [`EnhancerOptions`](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md#windowdevtoolsextensionconfig) for
a list of the specific options that are available.

Defaults to `true`.

The Redux DevTools Extension recently added [support for showing action stack traces](https://github.com/zalmoxisus/redux-devtools-extension/blob/d4ef75691ad294646f74bca38b973b19850a37cf/docs/Features/Trace.md) that show exactly where each action was dispatched. Capturing the traces can add a bit of overhead, so the DevTools Extension allows users to configure whether action stack traces are captured.

If the DevTools are enabled by passing `true` or an object, then `configureStore` will default to enabling capturing action stack traces in development mode only.

### `preloadedState`

An optional initial state value to be passed to the Redux `createStore` function.

### `enhancers`

An optional array of Redux store enhancers, or a callback function to customize the array of enhancers.

If defined as an array, these will be passed to [the Redux `compose` function](https://redux.js.org/api/compose), and the combined enhancer will be passed to `createStore`.

This should _not_ include `applyMiddleware()` or the Redux DevTools Extension `composeWithDevTools`, as those are already handled by `configureStore`.

Example: `enhancers: [offline]` will result in a final setup of `[applyMiddleware, offline, devToolsExtension]`.

If defined as a callback function, it will be called with the existing array of enhancers _without_ the DevTools Extension (currently `[applyMiddleware]`),
and should return a new array of enhancers. This is primarily useful for cases where a store enhancer needs to be added
in front of `applyMiddleware`, such as `redux-first-router` or `redux-offline`.

Example: `enhancers: (defaultEnhancers) => [offline, ...defaultEnhancers]` will result in a final setup
of `[offline, applyMiddleware, devToolsExtension]`.

## Usage

### Basic Example

```ts
// file: reducers.ts noEmit
import { Reducer } from '@reduxjs/toolkit'
declare const rootReducer: Reducer<{}>
export default rootReducer

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers'

const store = configureStore({ reducer: rootReducer })
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
```

### Full Example

```ts no-transpile
// file: todos/todosReducer.ts noEmit
import { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export default reducer

// file: visibility/visibilityReducer.ts noEmit
import { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export default reducer

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

// And use redux-batch as an example of adding enhancers
import { reduxBatch } from '@manaflair/redux-batch'

import todosReducer from './todos/todosReducer'
import visibilityReducer from './visibility/visibilityReducer'

const reducer = {
  todos: todosReducer,
  visibility: visibilityReducer,
}

const preloadedState = {
  todos: [
    {
      text: 'Eat food',
      completed: true,
    },
    {
      text: 'Exercise',
      completed: false,
    },
  ],
  visibilityFilter: 'SHOW_COMPLETED',
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch],
})

// The store has been created with these options:
// - The slice reducers were automatically passed to combineReducers()
// - redux-thunk and redux-logger were added as middleware
// - The Redux DevTools Extension is disabled for production
// - The middleware, batch, and devtools enhancers were composed together
```

# `getDefaultMiddleware`

Returns an array containing the default list of middleware.

## Intended Usage

By default, [`configureStore`](./configureStore.mdx) adds some middleware to the Redux store setup automatically.

```js
const store = configureStore({
  reducer: rootReducer,
})

// Store has middleware added, because the middleware list was not customized
```

If you want to customize the list of middleware, you can supply an array of middleware functions to `configureStore`:

```js
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, logger],
})

// Store specifically has the thunk and logger middleware applied
```

However, when you supply the `middleware` option, you are responsible for defining _all_ the middleware you want added
to the store. `configureStore` will not add any extra middleware beyond what you listed.

`getDefaultMiddleware` is useful if you want to add some custom middleware, but also still want to have the default
middleware added as well:

```ts
// file: reducer.ts noEmit

export default function rootReducer(state = {}, action: any) {
  return state
}

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

import logger from 'redux-logger'

import rootReducer from './reducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// Store has all of the default middleware added, _plus_ the logger middleware
```

It is preferable to use the chainable `.concat(...)` and `.prepend(...)` methods of the returned `MiddlewareArray` instead of the array spread operator, as the latter can lose valuable type information under some circumstances.

## Included Default Middleware

### Development

One of the goals of Redux Toolkit is to provide opinionated defaults and prevent common mistakes. As part of that,
`getDefaultMiddleware` includes some middleware that are added **in development builds of your app only** to
provide runtime checks for two common issues:

- [Immutability check middleware](./immutabilityMiddleware.mdx): deeply compares
  state values for mutations. It can detect mutations in reducers during a dispatch, and also mutations that occur between
  dispatches (such as in a component or a selector). When a mutation is detected, it will throw an error and indicate the key
  path for where the mutated value was detected in the state tree. (Forked from [`redux-immutable-state-invariant`](https://github.com/leoasis/redux-immutable-state-invariant).)

- [Serializability check middleware](./serializabilityMiddleware.mdx): a custom middleware created specifically for use in Redux Toolkit. Similar in
  concept to `immutable-state-invariant`, but deeply checks your state tree and your actions for non-serializable values
  such as functions, Promises, Symbols, and other non-plain-JS-data values. When a non-serializable value is detected, a
  console error will be printed with the key path for where the non-serializable value was detected.

In addition to these development tool middleware, it also adds [`redux-thunk`](https://github.com/reduxjs/redux-thunk)
by default, since thunks are the basic recommended side effects middleware for Redux.

Currently, the return value is:

```js
const middleware = [thunk, immutableStateInvariant, serializableStateInvariant]
```

### Production

Currently, the return value is:

```js
const middleware = [thunk]
```

## Customizing the Included Middleware

`getDefaultMiddleware` accepts an options object that allows customizing each middleware in two ways:

- Each middleware can be excluded the result array by passing `false` for its corresponding field
- Each middleware can have its options customized by passing the matching options object for its corresponding field

This example shows excluding the serializable state check middleware, and passing a specific value for the thunk
middleware's "extra argument":

```ts
// file: reducer.ts noEmit

export default function rootReducer(state = {}, action: any) {
  return state
}

// file: api.ts noEmit

export declare const myCustomApiService: any

// file: store.ts

import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import { myCustomApiService } from './api'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: myCustomApiService,
      },
      serializableCheck: false,
    }),
})
```

## API Reference

```ts no-transpile
interface ThunkOptions<E = any> {
  extraArgument: E
}

interface ImmutableStateInvariantMiddlewareOptions {
  // See "Immutability Middleware" page for definition
}

interface SerializableStateInvariantMiddlewareOptions {
  // See "Serializability Middleware" page for definition
}

interface GetDefaultMiddlewareOptions {
  thunk?: boolean | ThunkOptions
  immutableCheck?: boolean | ImmutableStateInvariantMiddlewareOptions
  serializableCheck?: boolean | SerializableStateInvariantMiddlewareOptions
}

function getDefaultMiddleware<S = any>(
  options: GetDefaultMiddlewareOptions = {}
): Middleware<{}, S>[]
```

# Immutability Middleware

A port of the [`redux-immutable-state-invariant`](https://github.com/leoasis/redux-immutable-state-invariant) middleware, customized for use with Redux Toolkit. Any detected mutations will be thrown as errors.

This middleware is added to the store by default by [`configureStore`](./configureStore.mdx) and [`getDefaultMiddleware`](./getDefaultMiddleware.mdx).

You can customize the behavior of this middleware by passing any of the supported options as the `immutableCheck` value for `getDefaultMiddleware`.

## Options

```ts no-transpile
type IsImmutableFunc = (value: any) => boolean

interface ImmutableStateInvariantMiddlewareOptions {
  /**
    Callback function to check if a value is considered to be immutable.
    This function is applied recursively to every value contained in the state.
    The default implementation will return true for primitive types 
    (like numbers, strings, booleans, null and undefined).
   */
  isImmutable?: IsImmutableFunc
  /** 
    An array of dot-separated path strings that match named nodes from 
    the root state to ignore when checking for immutability.
    Defaults to undefined
   */
  ignoredPaths?: string[]
  /** Print a warning if checks take longer than N ms. Default: 32ms */
  warnAfter?: number
  // @deprecated. Use ignoredPaths
  ignore?: string[]
}
```

## Exports

### `createImmutableStateInvariantMiddleware`

Creates an instance of the immutability check middleware, with the given options.

You will most likely not need to call this yourself, as `getDefaultMiddleware` already does so.

Example:

```ts
// file: exampleSlice.ts

import { createSlice } from '@reduxjs/toolkit'

export const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    user: 'will track changes',
    ignoredPath: 'single level',
    ignoredNested: {
      one: 'one',
      two: 'two',
    },
  },
  reducers: {},
})

export default exampleSlice.reducer

// file: store.ts

import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from '@reduxjs/toolkit'

import exampleSliceReducer from './exampleSlice'

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
})

const store = configureStore({
  reducer: exampleSliceReducer,
  // Note that this will replace all default middleware
  middleware: [immutableInvariantMiddleware],
})
```

doing the same without removing all other middlewares, using [getDetfaultMiddleware](./getDefaultMiddleware):

```ts
// file: exampleSlice.ts noEmit

import { createSlice } from '@reduxjs/toolkit'

export const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    user: 'will track changes',
    ignoredPath: 'single level',
    ignoredNested: {
      one: 'one',
      two: 'two',
    },
  },
  reducers: {},
})

export default exampleSlice.reducer

// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

import exampleSliceReducer from './exampleSlice'

const store = configureStore({
  reducer: exampleSliceReducer,
  // This replaces the original default middleware with the customized versions
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: ['ignoredPath', 'ignoredNested.one', 'ignoredNested.two'],
      },
    }),
})
```

### `isImmutableDefault`

Default implementation of the "is this value immutable?" check. Currently implemented as:

```js
return (
  typeof value !== 'object' || value === null || typeof value === 'undefined'
)
```

This will return true for primitive types (like numbers, strings, booleans, null and undefined)

# Serializability Middleware

A custom middleware that detects if any non-serializable values have been included in state or dispatched actions, modeled after `redux-immutable-state-invariant`. Any detected non-serializable values will be logged to the console.

This middleware is added to the store by default by [`configureStore`](./configureStore.mdx) and [`getDefaultMiddleware`](./getDefaultMiddleware.mdx).

You can customize the behavior of this middleware by passing any of the supported options as the `serializableCheck` value for `getDefaultMiddleware`.

## Options

```ts no-transpile
interface SerializableStateInvariantMiddlewareOptions {
  /**
   * The function to check if a value is considered serializable. This
   * function is applied recursively to every value contained in the
   * state. Defaults to `isPlain()`.
   */
  isSerializable?: (value: any) => boolean
  /**
   * The function that will be used to retrieve entries from each
   * value.  If unspecified, `Object.entries` will be used. Defaults
   * to `undefined`.
   */
  getEntries?: (value: any) => [string, any][]

  /**
   * An array of action types to ignore when checking for serializability.
   * Defaults to []
   */
  ignoredActions?: string[]

  /**
   * An array of dot-separated path strings to ignore when checking
   * for serializability, Defaults to ['meta.arg', 'meta.baseQueryMeta']
   */
  ignoredActionPaths?: string[]

  /**
   * An array of dot-separated path strings to ignore when checking
   * for serializability, Defaults to []
   */
  ignoredPaths?: string[]
  /**
   * Execution time warning threshold. If the middleware takes longer
   * than `warnAfter` ms, a warning will be displayed in the console.
   * Defaults to 32ms.
   */
  warnAfter?: number

  /**
   * Opt out of checking state. When set to `true`, other state-related params will be ignored.
   */
  ignoreState?: boolean

  /**
   * Opt out of checking actions. When set to `true`, other action-related params will be ignored.
   */
  ignoreActions?: boolean
}
```

## Exports

### `createSerializableStateInvariantMiddleware`

Creates an instance of the serializability check middleware, with the given options.

You will most likely not need to call this yourself, as `getDefaultMiddleware` already does so.

Example:

```ts
// file: reducer.ts noEmit

export default function (state = {}, action: any) {
  return state
}

// file: store.ts

import { Iterable } from 'immutable'
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit'
import reducer from './reducer'

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) =>
  Iterable.isIterable(value) || isPlain(value)

const getEntries = (value: any) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  isSerializable,
  getEntries,
})

const store = configureStore({
  reducer,
  middleware: [serializableMiddleware],
})
```

### `isPlain`

Checks whether the given value is considered a "plain value" or not.

Currently implemented as:

```ts
// file: src/isPlainObject.ts noEmit

declare function isPlainObject(value: unknown): value is object
export default isPlainObject

// file: src/serializableStateInvariantMiddleware.ts
import isPlainObject from './isPlainObject'

export function isPlain(val: any) {
  return (
    typeof val === 'undefined' ||
    val === null ||
    typeof val === 'string' ||
    typeof val === 'boolean' ||
    typeof val === 'number' ||
    Array.isArray(val) ||
    isPlainObject(val)
  )
}
```

This will accept all standard JS objects, arrays, and primitives, but return false for `Date`s, `Map`s, and other similar class instances.

# `createListenerMiddleware`

## Overview

A Redux middleware that lets you define "listener" entries that contain an "effect" callback with additional logic, and a way to specify when that callback should run based on dispatched actions or state changes.

It's intended to be a lightweight alternative to more widely used Redux async middleware like sagas and observables. While similar to thunks in level of complexity and concept, it can be used to replicate some common saga usage patterns.

Conceptually, you can think of this as being similar to React's `useEffect` hook, except that it runs logic in response to Redux store updates instead of component props/state updates.

Listener effect callbacks have access to `dispatch` and `getState`, similar to thunks. The listener also receives a set of async workflow functions like `take`, `condition`, `pause`, `fork`, and `unsubscribe`, which allow writing more complex async logic.

Listeners can be defined statically by calling `listenerMiddleware.startListening()` during setup, or added and removed dynamically at runtime with special `dispatch(addListener())` and `dispatch(removeListener())` actions.

### Basic Usage

```js
import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import todosReducer, {
  todoAdded,
  todoToggled,
  todoDeleted,
} from '../features/todos/todosSlice'

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware()

// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: todoAdded,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log('Todo added: ', action.payload.text)

    // Can cancel other running instances
    listenerApi.cancelActiveListeners()

    // Run async logic
    const data = await fetchData()

    // Pause until action dispatched or state changed
    if (await listenerApi.condition(matchSomeAction)) {
      // Use the listener API methods to dispatch, get state,
      // unsubscribe the listener, start child tasks, and more
      listenerApi.dispatch(todoAdded('Buy pet food'))

      // Spawn "child tasks" that can do more work and return results
      const task = listenerApi.fork(async (forkApi) => {
        // Can pause execution
        await forkApi.delay(5)
        // Complete the child by returning a value
        return 42
      })

      const result = await task.result
      // Unwrap the child result in the listener
      if (result.status === 'ok') {
        // Logs the `42` result value that was returned
        console.log('Child succeeded: ', result.value)
      }
    }
  },
})

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
```

## `createListenerMiddleware`

Creates an instance of the middleware, which should then be added to the store via `configureStore`'s `middleware` parameter.

```ts no-transpile
const createListenerMiddleware = (options?: CreateMiddlewareOptions) =>
  ListenerMiddlewareInstance

interface CreateListenerMiddlewareOptions<ExtraArgument = unknown> {
  extra?: ExtraArgument
  onError?: ListenerErrorHandler
}

type ListenerErrorHandler = (
  error: unknown,
  errorInfo: ListenerErrorInfo
) => void

interface ListenerErrorInfo {
  raisedBy: 'effect' | 'predicate'
}
```

### Middleware Options

- `extra`: an optional "extra argument" that will be injected into the `listenerApi` parameter of each listener. Equivalent to [the "extra argument" in the Redux Thunk middleware](https://redux.js.org/usage/writing-logic-thunks#injecting-config-values-into-thunks)
- `onError`: an optional error handler that gets called with synchronous and async errors raised by `listener` and synchronous errors thrown by `predicate`.

## Listener Middleware Instance

The "listener middleware instance" returned from `createListenerMiddleware` is an object similar to the "slice" objects generated by `createSlice`. The instance object is _not_ the actual Redux middleware itself. Rather, it contains the middleware and some instance methods used to add and remove listener entries within the middleware.

```ts no-transpile
interface ListenerMiddlewareInstance<
  State = unknown,
  Dispatch extends ThunkDispatch<State, unknown, AnyAction> = ThunkDispatch<
    State,
    unknown,
    AnyAction
  >,
  ExtraArgument = unknown
> {
  middleware: ListenerMiddleware<State, Dispatch, ExtraArgument>
  startListening: (options: AddListenerOptions) => Unsubscribe
  stopListening: (
    options: AddListenerOptions & UnsubscribeListenerOptions
  ) => boolean
  clearListeners: () => void
}
```

### `middleware`

The actual Redux middleware. Add this to the Redux store via [the `configureStore.middleware` option](./configureStore.mdx#middleware).

Since the listener middleware can receive "add" and "remove" actions containing functions, this should normally be added as the first middleware in the chain so that it is before the serializability check middleware.

```js
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  // Add the listener middleware to the store.
  // NOTE: Since this can receive actions with functions inside,
  // it should go before the serializability check middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
```

### `startListening`

Adds a new listener entry to the middleware. Typically used to "statically" add new listeners during application setup.

```ts no-transpile
const startListening = (options: AddListenerOptions) => UnsubscribeListener

interface AddListenerOptions {
  // Four options for deciding when the listener will run:

  // 1) Exact action type string match
  type?: string

  // 2) Exact action type match based on the RTK action creator
  actionCreator?: ActionCreator

  // 3) Match one of many actions using an RTK matcher
  matcher?: Matcher

  // 4) Return true based on a combination of action + state
  predicate?: ListenerPredicate

  // The actual callback to run when the action is matched
  effect: (action: Action, listenerApi: ListenerApi) => void | Promise<void>
}

type ListenerPredicate<Action extends AnyAction, State> = (
  action: Action,
  currentState?: State,
  originalState?: State
) => boolean

type UnsubscribeListener = (
  unsubscribeOptions?: UnsubscribeListenerOptions
) => void

interface UnsubscribeListenerOptions {
  cancelActive?: true
}
```

**You must provide exactly _one_ of the four options for deciding when the listener will run: `type`, `actionCreator`, `matcher`, or `predicate`**. Every time an action is dispatched, each listener will be checked to see if it should run based on the current action vs the comparison option provided.

These are all acceptable:

```js
// 1) Action type string
listenerMiddleware.startListening({ type: 'todos/todoAdded', effect })
// 2) RTK action creator
listenerMiddleware.startListening({ actionCreator: todoAdded, effect })
// 3) RTK matcher function
listenerMiddleware.startListening({
  matcher: isAnyOf(todoAdded, todoToggled),
  effect,
})
// 4) Listener predicate
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    // return true when the listener should run
  },
  effect,
})
```

Note that the `predicate` option actually allows matching solely against state-related checks, such as "did `state.x` change" or "the current value of `state.x` matches some criteria", regardless of the actual action.

The ["matcher" utility functions included in RTK](./matching-utilities.mdx) are acceptable as either the `matcher` or `predicate` option.

The return value is an `unsubscribe()` callback that will remove this listener. By default, unsubscribing will _not_ cancel any active instances of the listener. However, you may also pass in `{cancelActive: true}` to cancel running instances.

If you try to add a listener entry but another entry with this exact function reference already exists, no new entry will be added, and the existing `unsubscribe` method will be returned.

The `effect` callback will receive the current action as its first argument, as well as a "listener API" object similar to the "thunk API" object in `createAsyncThunk`.

All listener predicates and callbacks are checked _after_ the root reducer has already processed the action and updated the state. The `listenerApi.getOriginalState()` method can be used to get the state value that existed before the action that triggered this listener was processed.

### `stopListening`

Removes a given listener entry.

It accepts the same arguments as `startListening()`. It checks for an existing listener entry by comparing the function references of `listener` and the provided `actionCreator/matcher/predicate` function or `type` string.

By default, this does _not_ cancel any active running instances. However, you may also pass in `{cancelActive: true}` to cancel running instances.

```ts no-transpile
const stopListening = (
  options: AddListenerOptions & UnsubscribeListenerOptions
) => boolean

interface UnsubscribeListenerOptions {
  cancelActive?: true
}
```

Returns `true` if the listener entry has been removed, or `false` if no subscription matching the input provided has been found.

```js
// Examples:
// 1) Action type string
listenerMiddleware.stopListening({
  type: 'todos/todoAdded',
  listener,
  cancelActive: true,
})
// 2) RTK action creator
listenerMiddleware.stopListening({ actionCreator: todoAdded, effect })
// 3) RTK matcher function
listenerMiddleware.stopListening({ matcher, effect, cancelActive: true })
// 4) Listener predicate
listenerMiddleware.stopListening({ predicate, effect })
```

### `clearListeners`

Removes all current listener entries. It also cancels all active running instances of those listeners as well.

This is most likely useful for test scenarios where a single middleware or store instance might be used in multiple tests, as well as some app cleanup situations.

```ts no-transpile
const clearListeners = () => void;
```

## Action Creators

In addition to adding and removing listeners by directly calling methods on the listener instance, you can dynamically add and remove listeners at runtime by dispatching special "add" and "remove" actions. These are exported from the main RTK package as standard RTK-generated action creators.

### `addListener`

A standard RTK action creator, imported from the package. Dispatching this action tells the middleware to dynamically add a new listener at runtime. It accepts exactly the same options as `startListening()`

Dispatching this action returns an `unsubscribe()` callback from `dispatch`.

```js
// Per above, provide `predicate` or any of the other comparison options
const unsubscribe = store.dispatch(addListener({ predicate, effect }))
```

### `removeListener`

A standard RTK action creator, imported from the package. Dispatching this action tells the middleware to dynamically remove a listener at runtime. Accepts the same arguments as `stopListening()`.

By default, this does _not_ cancel any active running instances. However, you may also pass in `{cancelActive: true}` to cancel running instances.

Returns `true` if the listener entry has been removed, `false` if no subscription matching the input provided has been found.

```js
const wasRemoved = store.dispatch(
  removeListener({ predicate, effect, cancelActive: true })
)
```

### `clearAllListeners`

A standard RTK action creator, imported from the package. Dispatching this action tells the middleware to remove all current listener entries. It also cancels all active running instances of those listeners as well.

```js
store.dispatch(clearAllListeners())
```

## Listener API

The `listenerApi` object is the second argument to each listener callback. It contains several utility functions that may be called anywhere inside the listener's logic.

```ts no-transpile
export interface ListenerEffectAPI<
  State,
  Dispatch extends ReduxDispatch<AnyAction>,
  ExtraArgument = unknown
> extends MiddlewareAPI<Dispatch, State> {
  // NOTE: MiddlewareAPI contains `dispatch` and `getState` already

  /**
   * Returns the store state as it existed when the action was originally dispatched, _before_ the reducers ran.
   * This function can **only** be invoked **synchronously**, it throws error otherwise.
   */
  getOriginalState: () => State
  /**
   * Removes the listener entry from the middleware and prevent future instances of the listener from running.
   * It does **not** cancel any active instances.
   */
  unsubscribe(): void
  /**
   * It will subscribe a listener if it was previously removed, noop otherwise.
   */
  subscribe(): void
  /**
   * Returns a promise that resolves when the input predicate returns `true` or
   * rejects if the listener has been cancelled or is completed.
   *
   * The return value is `true` if the predicate succeeds or `false` if a timeout is provided and expires first.
   */
  condition: ConditionFunction<State>
  /**
   * Returns a promise that resolves when the input predicate returns `true` or
   * rejects if the listener has been cancelled or is completed.
   *
   * The return value is the `[action, currentState, previousState]` combination that the predicate saw as arguments.
   *
   * The promise resolves to null if a timeout is provided and expires first.
   */
  take: TakePattern<State>
  /**
   * Cancels all other running instances of this same listener except for the one that made this call.
   */
  cancelActiveListeners: () => void
  /**
   * An abort signal whose `aborted` property is set to `true`
   * if the listener execution is either aborted or completed.
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
   */
  signal: AbortSignal
  /**
   * Returns a promise that resolves after `timeoutMs` or
   * rejects if the listener has been cancelled or is completed.
   */
  delay(timeoutMs: number): Promise<void>
  /**
   * Queues in the next microtask the execution of a task.
   */
  fork<T>(executor: ForkedTaskExecutor<T>): ForkedTask<T>
  /**
   * Returns a promise that resolves when `waitFor` resolves or
   * rejects if the listener has been cancelled or is completed.
   * @param promise
   */
  pause<M>(promise: Promise<M>): Promise<M>
  extra: ExtraArgument
}
```

These can be divided into several categories.

### Store Interaction Methods

- `dispatch: Dispatch`: the standard `store.dispatch` method
- `getState: () => State`: the standard `store.getState` method
- `getOriginalState: () => State`: returns the store state as it existed when the action was originally dispatched, _before_ the reducers ran. (**Note**: this method can only be called synchronously, during the initial dispatch call stack, to avoid memory leaks. Calling it asynchronously will throw an error.)
- `extra: unknown`: the "extra argument" that was provided as part of the middleware setup, if any

`dispatch` and `getState` are exactly the same as in a thunk. `getOriginalState` can be used to compare the original state before the listener was started.

`extra` can be used to inject a value such as an API service layer into the middleware at creation time, and is accessible here.

### Listener Subscription Management

- `unsubscribe: () => void`: removes the listener entry from the middleware, and prevent future instances of the listener from running. (This does _not_ cancel any active instances.)
- `subscribe: () => void`: will re-subscribe the listener entry if it was previously removed, or no-op if currently subscribed
- `cancelActiveListeners: () => void`: cancels all other running instances of this same listener _except_ for the one that made this call. (The cancellation will only have a meaningful effect if the other instances are paused using one of the cancellation-aware APIs like `take/cancel/pause/delay` - see "Cancelation and Task Management" in the "Usage" section for more details)
- `signal: AbortSignal`: An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) whose `aborted` property will be set to `true` if the listener execution is aborted or completed.

Dynamically unsubscribing and re-subscribing this listener allows for more complex async workflows, such as avoiding duplicate running instances by calling `listenerApi.unsubscribe()` at the start of a listener, or calling `listenerApi.cancelActiveListeners()` to ensure that only the most recent instance is allowed to complete.

### Conditional Workflow Execution

- `take: (predicate: ListenerPredicate, timeout?: number) => Promise<[Action, State, State] | null>`: returns a promise that will resolve when the `predicate` returns `true`. The return value is the `[action, currentState, previousState]` combination that the predicate saw as arguments. If a `timeout` is provided and expires first, the promise resolves to `null`.
- `condition: (predicate: ListenerPredicate, timeout?: number) => Promise<boolean>`: Similar to `take`, but resolves to `true` if the predicate succeeds, and `false` if a `timeout` is provided and expires first. This allows async logic to pause and wait for some condition to occur before continuing. See "Writing Async Workflows" below for details on usage.
- `delay: (timeoutMs: number) => Promise<void>`: returns a cancellation-aware promise that resolves after the timeout, or rejects if cancelled before the expiration
- `pause: (promise: Promise<T>) => Promise<T>`: accepts any promise, and returns a cancellation-aware promise that either resolves with the argument promise or rejects if cancelled before the resolution

These methods provide the ability to write conditional logic based on future dispatched actions and state changes. Both also accept an optional `timeout` in milliseconds.

`take` resolves to a `[action, currentState, previousState]` tuple or `null` if it timed out, whereas `condition` resolves to `true` if it succeeded or `false` if timed out.

`take` is meant for "wait for an action and get its contents", while `condition` is meant for checks like `if (await condition(predicate))`.

Both these methods are cancellation-aware, and will throw a `TaskAbortError` if the listener instance is cancelled while paused.

### Child Tasks

- `fork: (executor: (forkApi: ForkApi) => T | Promise<T>) => ForkedTask<T>`: Launches a "child task" that may be used to accomplish additional work. Accepts any sync or async function as its argument, and returns a `{result, cancel}` object that can be used to check the final status and return value of the child task, or cancel it while in-progress.

Child tasks can be launched, and waited on to collect their return values. The provided `executor` function will be called asynchronously with a `forkApi` object containing `{pause, delay, signal}`, allowing it to pause or check cancellation status. It can also make use of the `listenerApi` from the listener's scope.

An example of this might be a listener that forks a child task containing an infinite loop that listens for events from a server. The parent then uses `listenerApi.condition()` to wait for a "stop" action, and cancels the child task.

The task and result types are:

```ts no-transpile
interface ForkedTaskAPI {
  pause<W>(waitFor: Promise<W>): Promise<W>
  delay(timeoutMs: number): Promise<void>
  signal: AbortSignal
}

export type TaskResolved<T> = {
  readonly status: 'ok'
  readonly value: T
}

export type TaskRejected = {
  readonly status: 'rejected'
  readonly error: unknown
}

export type TaskCancelled = {
  readonly status: 'cancelled'
  readonly error: TaskAbortError
}

export type TaskResult<Value> =
  | TaskResolved<Value>
  | TaskRejected
  | TaskCancelled

export interface ForkedTask<T> {
  result: Promise<TaskResult<T>>
  cancel(): void
}
```

## TypeScript Usage

The middleware code is fully TS-typed. However, the `startListening` and `addListener` functions do not know what the store's `RootState` type looks like by default, so `getState()` will return `unknown`.

To fix this, the middleware provides types for defining "pre-typed" versions of those methods, similar to the pattern used for defing pre-typed React-Redux hooks. We specifically recommend creating the middleware instance in a separate file from the actual `configureStore()` call:

```ts no-transpile
// listenerMiddleware.ts
import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'
import type { TypedStartListening, TypedAddListener } from '@reduxjs/toolkit'

import type { RootState, AppDispatch } from './store'

export const listenerMiddleware = createListenerMiddleware()

export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export const startAppListening =
  listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch
>
```

Then import and use those pre-typed methods in your components.

## Usage Guide

### Overall Purpose

This middleware lets you run additional logic when some action is dispatched, as a lighter-weight alternative to middleware like sagas and observables that have both a heavy runtime bundle cost and a large conceptual overhead.

This middleware is not intended to handle all possible use cases. Like thunks, it provides you with a basic set of primitives (including access to `dispatch` and `getState`), and gives you freedom to write any sync or async logic you want. This is both a strength (you can do anything!) and a weakness (you can do anything, with no guard rails!).

The middleware includes several async workflow primitives that are sufficient to write equivalents to many Redux-Saga effects operators like `takeLatest`, `takeLeading`, and `debounce`, although none of those methods are directly included. (See [the listener middleware tests file for examples of how to write code equivalent to those effects](https://github.com/reduxjs/redux-toolkit/blob/03eafd5236f16574935cdf1c5958e32ee8cf3fbe/packages/toolkit/src/listenerMiddleware/tests/effectScenarios.test.ts#L74-L363).)

### Standard Usage Patterns

The most common expected usage is "run some logic after a given action was dispatched". For example, you could set up a simple analytics tracker by looking for certain actions and sending extracted data to the server, including pulling user details from the store:

```js
listenerMiddleware.startListening({
  matcher: isAnyOf(action1, action2, action3),
  effect: (action, listenerApi) => {
    const user = selectUserDetails(listenerApi.getState())

    const { specialData } = action.meta

    analyticsApi.trackUsage(action.type, user, specialData)
  },
})
```

However, the `predicate` option also allows triggering logic when some state value has changed, or when the state matches a particular condition:

```js
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    // Trigger logic whenever this field changes
    return currentState.counter.value !== previousState.counter.value
  },
  effect,
})

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    // Trigger logic after every action if this condition is true
    return currentState.counter.value > 3
  },
  effect,
})
```

You could also implement a generic API fetching capability, where the UI dispatches a plain action describing the type of resource to be requested, and the middleware automatically fetches it and dispatches a result action:

```js
listenerMiddleware.startListening({
  actionCreator: resourceRequested,
  effect: async (action, listenerApi) => {
    const { name, args } = action.payload
    listenerApi.dispatch(resourceLoading())

    const res = await serverApi.fetch(`/api/${name}`, ...args)
    listenerApi.dispatch(resourceLoaded(res.data))
  },
})
```

(That said, we would recommend use of RTK Query for any meaningful data fetching behavior - this is primarily an example of what you _could_ do in a listener.)

The `listenerApi.unsubscribe` method may be used at any time, and will remove the listener from handling any future actions. As an example, you could create a one-shot listener by unconditionally calling `unsubscribe()` in the body - the effect callback would run the first time the relevant action is seen, then immediately unsubscribe and never run again. (The middleware actually uses this technique internally for the `take/condition` methods)

### Writing Async Workflows with Conditions

One of the great strengths of both sagas and observables is their support for complex async workflows, including stopping and starting behavior based on specific dispatched actions. However, the weakness is that both require mastering a complex API with many unique operators (effects methods like `call()` and `fork()` for sagas, RxJS operators for observables), and both add a significant amount to application bundle size.

While the listener middleware is _not_ meant to fully replace sagas or observables, it does provide a carefully chosen set of APIs to implement long-running async workflows as well.

Listeners can use the `condition` and `take` methods in `listenerApi` to wait until some action is dispatched or state check is met. The `condition` method is directly inspired by [the `condition` function in Temporal.io's workflow API](https://docs.temporal.io/docs/typescript/workflows/#condition) (credit to [@swyx](https://twitter.com/swyx) for the suggestion!), and `take` is inspired by [the `take` effect from Redux-Saga](https://redux-saga.js.org/docs/api#takepattern).

The signatures are:

```ts no-transpile
type ConditionFunction<Action extends AnyAction, State> = (
  predicate: ListenerPredicate<Action, State> | (() => boolean),
  timeout?: number
) => Promise<boolean>

type TakeFunction<Action extends AnyAction, State> = (
  predicate: ListenerPredicate<Action, State> | (() => boolean),
  timeout?: number
) => Promise<[Action, State, State] | null>
```

You can use `await condition(somePredicate)` as a way to pause execution of your listener callback until some criteria is met.

The `predicate` will be called after every action is processed by the reducers, and should return `true` when the condition should resolve. (It is effectively a one-shot listener itself.) If a `timeout` number (in ms) is provided, the promise will resolve `true` if the `predicate` returns first, or `false` if the timeout expires. This allows you to write comparisons like `if (await condition(predicate, timeout))`.

This should enable writing longer-running workflows with more complex async logic, such as [the "cancellable counter" example from Redux-Saga](https://github.com/redux-saga/redux-saga/blob/1ecb1bed867eeafc69757df8acf1024b438a79e0/examples/cancellable-counter/src/sagas/index.js).

An example of `condition` usage, from the test suite:

```ts no-transpile
test('condition method resolves promise when there is a timeout', async () => {
  let finalCount = 0
  let listenerStarted = false

  listenerMiddleware.startListening({
    predicate: (action, currentState: CounterState) => {
      return increment.match(action) && currentState.value === 0
    },
    effect: async (action, listenerApi) => {
      listenerStarted = true
      // Wait for either the counter to hit 3, or 50ms to elapse
      const result = await listenerApi.condition(
        (action, currentState: CounterState) => {
          return currentState.value === 3
        },
        50
      )

      // In this test, we expect the timeout to happen first
      expect(result).toBe(false)
      // Save the state for comparison outside the listener
      const latestState = listenerApi.getState()
      finalCount = latestState.value
    },
  })

  store.dispatch(increment())
  // The listener should have started right away
  expect(listenerStarted).toBe(true)

  store.dispatch(increment())

  // If we wait 150ms, the condition timeout will expire first
  await delay(150)
  // Update the state one more time to confirm the listener isn't checking it
  store.dispatch(increment())

  // Handled the state update before the delay, but not after
  expect(finalCount).toBe(2)
})
```

### Cancellation and Task Management

The listener middleware supports cancellation of running listener instances, `take/condition/pause/delay` functions, and "child tasks", with an implementation based on [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

The `listenerApi.pause/delay()` functions provide a cancellation-aware way to have the current listener sleep. `pause()` accepts a promise, while `delay` accepts a timeout value. If the listener is cancelled while waiting, a `TaskAbortError` will be thrown. In addition, both `take` and `condition` support cancellation interruption as well.

`listenerApi.fork()` can used to launch "child tasks" that can do additional work. These can be waited on to collect their results. An example of this might look like:

```ts no-transpile
listenerMiddleware.startListening({
  actionCreator: increment,
  effect: async (action, listenerApi) => {
    // Spawn a child task and start it immediately
    const task = listenerApi.fork(async (forkApi) => {
      // Artificially wait a bit inside the child
      await forkApi.delay(5)
      // Complete the child by returning a value
      return 42
    })

    const result = await task.result
    // Unwrap the child result in the listener
    if (result.status === 'ok') {
      // Logs the `42` result value that was returned
      console.log('Child succeeded: ', result.value)
    }
  },
})
```

### Complex Async Workflows

The provided async workflow primitives (`cancelActiveListeners`, `unsubscribe`, `subscribe`, `take`, `condition`, `pause`, `delay`) can be used to implement behavior that is equivalent to many of the more complex async workflow capabilities found in the Redux-Saga library. This includes effects such as `throttle`, `debounce`, `takeLatest`, `takeLeading`, and `fork/join`. Some examples from the test suite:

```js
test('debounce / takeLatest', async () => {
  // Repeated calls cancel previous ones, no work performed
  // until the specified delay elapses without another call
  // NOTE: This is also basically identical to `takeLatest`.
  // Ref: https://redux-saga.js.org/docs/api#debouncems-pattern-saga-args
  // Ref: https://redux-saga.js.org/docs/api#takelatestpattern-saga-args

  listenerMiddleware.startListening({
    actionCreator: increment,
    effect: async (action, listenerApi) => {
      // Cancel any in-progress instances of this listener
      listenerApi.cancelActiveListeners()

      // Delay before starting actual work
      await listenerApi.delay(15)

      // do work here
    },
  })
}

test('takeLeading', async () => {
  // Starts listener on first action, ignores others until task completes
  // Ref: https://redux-saga.js.org/docs/api#takeleadingpattern-saga-args

  listenerMiddleware.startListening({
    actionCreator: increment,
    effect: async (action, listenerApi) => {
      listenerCalls++

      // Stop listening for this action
      listenerApi.unsubscribe()

      // Pretend we're doing expensive work

      // Re-enable the listener
      listenerApi.subscribe()
    },
  })
})

test('cancelled', async () => {
  // cancelled allows checking if the current task was cancelled
  // Ref: https://redux-saga.js.org/docs/api#cancelled

  let canceledAndCaught = false
  let canceledCheck = false

  // Example of canceling prior instances conditionally and checking cancellation
  listenerMiddleware.startListening({
    matcher: isAnyOf(increment, decrement, incrementByAmount),
    effect: async (action, listenerApi) => {
      if (increment.match(action)) {
        // Have this branch wait around to be cancelled by the other
        try {
          await listenerApi.delay(10)
        } catch (err) {
          // Can check cancellation based on the exception and its reason
          if (err instanceof TaskAbortError) {
            canceledAndCaught = true
          }
        }
      } else if (incrementByAmount.match(action)) {
        // do a non-cancellation-aware wait
        await delay(15)
        if (listenerApi.signal.aborted) {
          canceledCheck = true
        }
      } else if (decrement.match(action)) {
        listenerApi.cancelActiveListeners()
      }
    },
  })
})
```

As a more practical example: [this saga-based "long polling" loop](https://gist.github.com/markerikson/5203e71a69fa9dff203c9e27c3d84154) repeatedly asks the server for a message and then processes each response. The child loop is started on demand when a "start polling" action is dispatched, and the loop is cancelled when a "stop polling" action is dispatched.

That approach can be implemented via the listener middleware:

```ts no-transpile
// Track how many times each message was processed by the loop
const receivedMessages = {
  a: 0,
  b: 0,
  c: 0,
}

const eventPollingStarted = createAction('serverPolling/started')
const eventPollingStopped = createAction('serverPolling/stopped')

listenerMiddleware.startListening({
  actionCreator: eventPollingStarted,
  effect: async (action, listenerApi) => {
    // Only allow one instance of this listener to run at a time
    listenerApi.unsubscribe()

    // Start a child job that will infinitely loop receiving messages
    const pollingTask = listenerApi.fork(async (forkApi) => {
      try {
        while (true) {
          // Cancellation-aware pause for a new server message
          const serverEvent = await forkApi.pause(pollForEvent())
          // Process the message. In this case, just count the times we've seen this message.
          if (serverEvent.type in receivedMessages) {
            receivedMessages[
              serverEvent.type as keyof typeof receivedMessages
            ]++
          }
        }
      } catch (err) {
        if (err instanceof TaskAbortError) {
          // could do something here to track that the task was cancelled
        }
      }
    })

    // Wait for the "stop polling" action
    await listenerApi.condition(eventPollingStopped.match)
    pollingTask.cancel()
  },
})
```

### Adding Listeners Inside Components

Listeners can be added at runtime via `dispatch(addListener())`. This means that you can add listeners anywhere you have access to `dispatch`, and that includes React components.

Since dispatching `addListener` returns an `unsubscribe` callback, this naturally maps to the behavior of React `useEffect` hooks, which let you return a cleanup function. You can add a listener in an effect, and remove the listener when the hook is cleaned up.

The basic pattern might look like:

```js
useEffect(() => {
  // Could also just `return dispatch(addListener())` directly, but showing this
  // as a separate variable to be clear on what's happening
  const unsubscribe = dispatch(
    addListener({
      actionCreator: todoAdded,
      effect: (action, listenerApi) => {
        // do some useful logic here
      },
    })
  )
  return unsubscribe
}, [])
```

While this pattern is _possible_, **we do not necessarily _recommend_ doing this!** The React and Redux communities have always tried to emphasize basing behavior on _state_ as much as possible. Having React components directly tie into the Redux action dispatch pipeline could potentialy lead to codebases that are more difficult to maintain.

At the same time, this _is_ a valid technique, both in terms of API behavior and potential use cases. It's been common to lazy-load sagas as part of a code-split app, and that has often required some complex additional setup work to "inject" sagas. In contrast, `dispatch(addListener())` fits naturally into a React component's lifecycle.

So, while we're not specifically encouraging use of this pattern, it's worth documenting here so that users are aware of it as a possibility.

### Organizing Listeners in Files

As a starting point, **it's best to create the listener middleware in a separate file, such as `app/listenerMiddleware.ts`, rather than in the same file as the store**. This avoids any potential circular import problems from other files trying to import `middleware.addListener`.

From there, so far we've come up with three different ways to organize listener functions and setup.

First, you can import effect callbacks from slice files into the middleware file, and add the listeners:

```ts no-transpile title="app/listenerMiddleware.ts"
import { action1, listener1 } from '../features/feature1/feature1Slice'
import { action2, listener2 } from '../features/feature2/feature1Slice'

listenerMiddleware.startListening({ actionCreator: action1, effect: listener1 })
listenerMiddleware.startListening({ actionCreator: action2, effect: listener2 })
```

This is probably the simplest option, and mirrors how the store setup pulls together all the slice reducers to create the app.

The second option is the opposite: have the slice files import the middleware and directly add their listeners:

```ts no-transpile  title="features/feature1/feature1Slice.ts"
import { listenerMiddleware } from '../../app/listenerMiddleware'

const feature1Slice = createSlice(/* */)
const { action1 } = feature1Slice.actions

export default feature1Slice.reducer

listenerMiddleware.startListening({
  actionCreator: action1,
  effect: () => {},
})
```

This keeps all the logic in the slice, although it does lock the setup into a single middleware instance.

The third option is to create a setup function in the slice, but let the listener file call that on startup:

```ts no-transpile  title="features/feature1/feature1Slice.ts"
import type { AppStartListening } from '../../app/listenerMiddleware'

const feature1Slice = createSlice(/* */)
const { action1 } = feature1Slice.actions

export default feature1Slice.reducer

export const addFeature1Listeners = (startListening: AppStartListening) => {
  startListening({
    actionCreator: action1,
    effect: () => {},
  })
}
```

```ts no-transpile title="app/listenerMiddleware.ts"
import { addFeature1Listeners } from '../features/feature1/feature1Slice'

addFeature1Listeners(listenerMiddleware.startListening)
```

Feel free to use whichever of these approaches works best in your app.

# `createReducer()`

## Overview

A utility that simplifies creating Redux reducer functions. It uses Immer internally to drastically simplify immutable update logic
by writing "mutative" code in your reducers, and supports directly mapping specific action types to case reducer functions
that will update the state when that action is dispatched.

Redux [reducers](https://redux.js.org/basics/reducers) are often implemented using a `switch` statement, with one `case` for every handled action type.

```js
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 }
    case 'decrement':
      return { ...state, value: state.value - 1 }
    case 'incrementByAmount':
      return { ...state, value: state.value + action.payload }
    default:
      return state
  }
}
```

This approach works well, but is a bit boilerplate-y and error-prone. For instance, it is easy to forget the `default` case or
setting the initial state.

The `createReducer` helper streamlines the implementation of such reducers. It supports two different forms of defining case
reducers to handle actions: a "builder callback" notation and a "map object" notation. Both are equivalent, but the "builder callback"
notation is preferred.

With `createReducer`, your reducers instead look like:

```ts
import { createAction, createReducer } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const increment = createAction('counter/increment')
const decrement = createAction('counter/decrement')
const incrementByAmount = createAction<number>('counter/incrementByAmount')

const initialState = { value: 0 } as CounterState

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      state.value++
    })
    .addCase(decrement, (state, action) => {
      state.value--
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload
    })
})
```

## Usage with the "Builder Callback" Notation

[overloadSummary](docblock://createReducer.ts?token=createReducer&overload=0)

The recommended way of using `createReducer` is the builder callback notation, as it works best with TypeScript and most IDEs.

### Parameters

[params](docblock://createReducer.ts?token=createReducer&overload=0)

### Example Usage

[examples](docblock://createReducer.ts?token=createReducer&overload=0)

### Builder Methods

### `builder.addCase`

[summary,remarks](docblock://mapBuilders.ts?token=ActionReducerMapBuilder.addCase)

#### Parameters

[params,examples](docblock://mapBuilders.ts?token=ActionReducerMapBuilder.addCase)

### `builder.addMatcher`

[summary,remarks](docblock://mapBuilders.ts?token=ActionReducerMapBuilder.addMatcher)

#### Parameters

[params,examples](docblock://mapBuilders.ts?token=ActionReducerMapBuilder.addMatcher)

### `builder.addDefaultCase`

[summary,remarks](docblock://mapBuilders.ts?token=ActionReducerMapBuilder.addDefaultCase)

#### Parameters

[params,examples](docblock://mapBuilders.ts?token=ActionReducerMapBuilder.addDefaultCase)

## Usage with the "Map Object" Notation

[overloadSummary](docblock://createReducer.ts?token=createReducer&overload=1)

While this notation is a bit shorter, it works only in JavaScript, not TypeScript and has less integration with IDEs,
so we recommend the "builder callback" notation in most cases.

### Parameters

[params](docblock://createReducer.ts?token=createReducer&overload=1)

### Returns

The generated reducer function.

The reducer will have a `getInitialState` function attached that will return the initial state when called. This may be useful for tests or usage with React's `useReducer` hook:

```js
const counterReducer = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload,
})

console.log(counterReducer.getInitialState()) // 0
```

### Example Usage

[examples](docblock://createReducer.ts?token=createReducer&overload=1)

### Matchers and Default Cases as Arguments

The most readable approach to define matcher cases and default cases is by using the `builder.addMatcher` and `builder.addDefaultCase` methods described above, but it is also possible to use these with the object notation by passing an array of `{matcher, reducer}` objects as the third argument, and a default case reducer as the fourth argument:

```js
const isStringPayloadAction = (action) => typeof action.payload === 'string'

const lengthOfAllStringsReducer = createReducer(
  // initial state
  { strLen: 0, nonStringActions: 0 },
  // normal reducers
  {
    /*...*/
  },
  //  array of matcher reducers
  [
    {
      matcher: isStringPayloadAction,
      reducer(state, action) {
        state.strLen += action.payload.length
      },
    },
  ],
  // default reducer
  (state) => {
    state.nonStringActions++
  }
)
```

## Direct State Mutation

Redux requires reducer functions to be pure and treat state values as immutable. While this is essential for making state updates predictable and observable, it can sometimes make the implementation of such updates awkward. Consider the following example:

```ts
import { createAction, createReducer } from '@reduxjs/toolkit'

interface Todo {
  text: string
  completed: boolean
}

const addTodo = createAction<Todo>('todos/add')
const toggleTodo = createAction<number>('todos/toggle')

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      const todo = action.payload
      return [...state, todo]
    })
    .addCase(toggleTodo, (state, action) => {
      const index = action.payload
      const todo = state[index]
      return [
        ...state.slice(0, index),
        { ...todo, completed: !todo.completed },
        ...state.slice(index + 1),
      ]
    })
})
```

The `addTodo` reducer is straightforward if you know the [ES6 spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax). However, the code for `toggleTodo` is much less straightforward, especially considering that it only sets a single flag.

To make things easier, `createReducer` uses [immer](https://github.com/mweststrate/immer) to let you write reducers as if they were mutating the state directly. In reality, the reducer receives a proxy state that translates all mutations into equivalent copy operations.

```ts
import { createAction, createReducer } from '@reduxjs/toolkit'

interface Todo {
  text: string
  completed: boolean
}

const addTodo = createAction<Todo>('todos/add')
const toggleTodo = createAction<number>('todos/toggle')

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      // This push() operation gets translated into the same
      // extended-array creation as in the previous example.
      const todo = action.payload
      state.push(todo)
    })
    .addCase(toggleTodo, (state, action) => {
      // The "mutating" version of this case reducer is much
      //  more direct than the explicitly pure one.
      const index = action.payload
      const todo = state[index]
      todo.completed = !todo.completed
    })
})
```

Writing "mutating" reducers simplifies the code. It's shorter, there's less indirection, and it eliminates common mistakes made while spreading nested state. However, the use of Immer does add some "magic", and Immer has its own nuances in behavior. You should read through [pitfalls mentioned in the immer docs](https://immerjs.github.io/immer/pitfalls) . Most importantly, **you need to ensure that you either mutate the `state` argument or return a new state, _but not both_**. For example, the following reducer would throw an exception if a `toggleTodo` action is passed:

```ts
import { createAction, createReducer } from '@reduxjs/toolkit'

interface Todo {
  text: string
  completed: boolean
}

const toggleTodo = createAction<number>('todos/toggle')

const todosReducer = createReducer([] as Todo[], (builder) => {
  builder.addCase(toggleTodo, (state, action) => {
    const index = action.payload
    const todo = state[index]

    // This case reducer both mutates the passed-in state...
    todo.completed = !todo.completed

    // ... and returns a new value. This will throw an
    // exception. In this example, the easiest fix is
    // to remove the `return` statement.
    return [...state.slice(0, index), todo, ...state.slice(index + 1)]
  })
})
```

## Multiple Case Reducer Execution

Originally, `createReducer` always matched a given action type to a single case reducer, and only that one case reducer would execute for a given action.

Using action matchers changes that behavior, as multiple matchers may handle a single action.

For any dispatched action, the behavior is:

- If there is an exact match for the action type, the corresponding case reducer will execute first
- Any matchers that return `true` will execute in the order they were defined
- If a default case reducer is provided, and _no_ case or matcher reducers ran, the default case reducer will execute
- If no case or matcher reducers ran, the original existing state value will be returned unchanged

The executing reducers form a pipeline, and each of them will receive the output of the previous reducer:

```ts
import { createReducer } from '@reduxjs/toolkit'

const reducer = createReducer(0, (builder) => {
  builder
    .addCase('increment', (state) => state + 1)
    .addMatcher(
      (action) => action.type.startsWith('i'),
      (state) => state * 5
    )
    .addMatcher(
      (action) => action.type.endsWith('t'),
      (state) => state + 2
    )
})

console.log(reducer(0, { type: 'increment' }))
// Returns 7, as the 'increment' case and both matchers all ran in sequence:
// - case 'increment": 0 => 1
// - matcher starts with 'i': 1 => 5
// - matcher ends with 't': 5 => 7
```

## Logging Draft State Values

It's very common for a developer to call `console.log(state)` during the development process. However, browsers display Proxies in a format that is hard to read, which can make console logging of Immer-based state difficult.

When using either `createSlice` or `createReducer`, you may use the [`current`](./otherExports.mdx#current) utility that we re-export from the [`immer` library](https://immerjs.github.io/immer/current). This utility creates a separate plain copy of the current Immer `Draft` state value, which can then be logged for viewing as normal.

```ts
import { createSlice, current } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'todos',
  initialState: [{ id: 1, title: 'Example todo' }],
  reducers: {
    addTodo: (state, action) => {
      console.log('before', current(state))
      state.push(action.payload)
      console.log('after', current(state))
    },
  },
})
```

# `createAction`

A helper function for defining a Redux [action](https://redux.js.org/basics/actions) type and creator.

```js
function createAction(type, prepareAction?)
```

The usual way to define an action in Redux is to separately declare an _action type_ constant and an _action creator_ function for constructing actions of that type.

```ts
const INCREMENT = 'counter/increment'

function increment(amount: number) {
  return {
    type: INCREMENT,
    payload: amount,
  }
}

const action = increment(3)
// { type: 'counter/increment', payload: 3 }
```

The `createAction` helper combines these two declarations into one. It takes an action type and returns an action creator for that type. The action creator can be called either without arguments or with a `payload` to be attached to the action. Also, the action creator overrides [toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) so that the action type becomes its string representation.

```ts
import { createAction } from '@reduxjs/toolkit'

const increment = createAction<number | undefined>('counter/increment')

let action = increment()
// { type: 'counter/increment' }

action = increment(3)
// returns { type: 'counter/increment', payload: 3 }

console.log(increment.toString())
// 'counter/increment'

console.log(`The action type is: ${increment}`)
// 'The action type is: counter/increment'
```

## Using Prepare Callbacks to Customize Action Contents

By default, the generated action creators accept a single argument, which becomes `action.payload`. This requires the caller to construct the entire payload correctly and pass it in.

In many cases, you may want to write additional logic to customize the creation of the `payload` value, such as accepting multiple parameters for the action creator, generating a random ID, or getting the current timestamp. To do this, `createAction` accepts an optional second argument: a "prepare callback" that will be used to construct the payload value.

```ts
import { createAction, nanoid } from '@reduxjs/toolkit'

const addTodo = createAction('todos/add', function prepare(text: string) {
  return {
    payload: {
      text,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    },
  }
})

console.log(addTodo('Write more docs'))
/**
 * {
 *   type: 'todos/add',
 *   payload: {
 *     text: 'Write more docs',
 *     id: '4AJvwMSWEHCchcWYga3dj',
 *     createdAt: '2019-10-03T07:53:36.581Z'
 *   }
 * }
 **/
```

If provided, all arguments from the action creator will be passed to the prepare callback, and it should return an object with the `payload` field (otherwise the payload of created actions will be `undefined`). Additionally, the object can have a `meta` and/or an `error` field that will also be added to created actions. `meta` may contain extra information about the action, `error` may contain details about the action failure. These three fields (`payload`, `meta` and `error`) adhere to the specification of [Flux Standard Actions](https://github.com/redux-utilities/flux-standard-action#actions).

**Note:** The type field will be added automatically.

## Usage with createReducer()

Because of their `toString()` override, action creators returned by `createAction()` can be used directly as keys for the case reducers passed to [createReducer()](createReducer.mdx).

```ts
import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction<number>('counter/increment')
const decrement = createAction<number>('counter/decrement')

const counterReducer = createReducer(0, (builder) => {
  builder.addCase(increment, (state, action) => state + action.payload)
  builder.addCase(decrement, (state, action) => state - action.payload)
})
```

## Non-String Action Types

In principle, Redux lets you use any kind of value as an action type. Instead of strings, you could theoretically use numbers, [symbols](https://developer.mozilla.org/en-US/docs/Glossary/Symbol), or anything else ([although it's recommended that the value should at least be serializable](https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)).

However, Redux Toolkit rests on the assumption that you use string action types. Specifically, some of its features rely on the fact that with strings, the `toString()` method of an `createAction()` action creator returns the matching action type. This is not the case for non-string action types because `toString()` will return the string-converted type value rather than the type itself.

```js
const INCREMENT = Symbol('increment')
const increment = createAction(INCREMENT)

increment.toString()
// returns the string 'Symbol(increment)',
// not the INCREMENT symbol itself

increment.toString() === INCREMENT
// false
```

This means that, for instance, you cannot use a non-string-type action creator as a case reducer key for [createReducer()](createReducer.mdx).

```js
const INCREMENT = Symbol('increment')
const increment = createAction(INCREMENT)

const counterReducer = createReducer(0, {
  // The following case reducer will NOT trigger for
  // increment() actions because `increment` will be
  // interpreted as a string, rather than being evaluated
  // to the INCREMENT symbol.
  [increment]: (state, action) => state + action.payload,

  // You would need to use the action type explicitly instead.
  [INCREMENT]: (state, action) => state + action.payload,
})
```

For this reason, **we strongly recommend you to only use string action types**.

## actionCreator.match

Every generated actionCreator has a `.match(action)` method that can be used to determine if the passed action is of the same type as an action that would be created by the action creator.

This has different uses:

### As a TypeScript Type Guard

This `match` method is a [TypeScript type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) and can be used to discriminate the `payload` type of an action.

This behavior can be particularly useful when used in custom middlewares, where manual casts might be neccessary otherwise.

```ts
import { createAction, Action } from '@reduxjs/toolkit'

const increment = createAction<number>('INCREMENT')

function someFunction(action: Action) {
  // accessing action.payload would result in an error here
  if (increment.match(action)) {
    // action.payload can be used as `number` here
  }
}
```

### With redux-observable

The `match` method can also be used as a filter method, which makes it powerful when used with redux-observable:

```ts
import { createAction, Action } from '@reduxjs/toolkit'
import { Observable } from 'rxjs'
import { map, filter } from 'rxjs/operators'

const increment = createAction<number>('INCREMENT')

export const epic = (actions$: Observable<Action>) =>
  actions$.pipe(
    filter(increment.match),
    map((action) => {
      // action.payload can be safely used as number here (and will also be correctly inferred by TypeScript)
      // ...
    })
  )
```

# `createSlice`

A function that accepts an initial state, an object of reducer functions, and a "slice name",
and automatically generates action creators and action types that correspond to the reducers and state.

This API is the standard approach for writing Redux logic.

Internally, it uses [`createAction`](./createAction.mdx) and [`createReducer`](./createReducer.mdx), so
you may also use [Immer](https://immerjs.github.io/immer/) to write "mutating" immutable updates:

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState = { value: 0 } as CounterState

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

## Parameters

`createSlice` accepts a single configuration object parameter, with the following options:

```ts no-transpile
function createSlice({
    // A name, used in action types
    name: string,
    // The initial state for the reducer
    initialState: any,
    // An object of "case reducers". Key names will be used to generate actions.
    reducers: Object<string, ReducerFunction | ReducerAndPrepareObject>
    // A "builder callback" function used to add more reducers, or
    // an additional object of "case reducers", where the keys should be other
    // action types
    extraReducers?:
    | Object<string, ReducerFunction>
    | ((builder: ActionReducerMapBuilder<State>) => void)
})
```

### `initialState`

The initial state value for this slice of state.

This may also be a "lazy initializer" function, which should return an initial state value when called. This will be used whenever the reducer is called with `undefined` as its state value, and is primarily useful for cases like reading initial state from `localStorage`.

### `name`

A string name for this slice of state. Generated action type constants will use this as a prefix.

### `reducers`

An object containing Redux "case reducer" functions (functions intended to handle a specific action type, equivalent
to a single case statement in a switch).

The keys in the object will be used to generate string action type constants, and these will show up in the Redux
DevTools Extension when they are dispatched. Also, if any other part of the application happens to dispatch an action
with the exact same type string, the corresponding reducer will be run. Therefore, you should give the functions
descriptive names.

This object will be passed to [`createReducer`](./createReducer.mdx), so the reducers may safely "mutate" the
state they are given.

```ts
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
})
// Will handle the action type `'counter/increment'`
```

#### Customizing Generated Action Creators

If you need to customize the creation of the payload value of an action creator by means of a [`prepare callback`](./createAction.mdx#using-prepare-callbacks-to-customize-action-contents), the value of the appropriate field of the `reducers` argument object should be an object instead of a function. This object must contain two properties: `reducer` and `prepare`. The value of the `reducer` field should be the case reducer function while the value of the `prepare` field should be the prepare callback function:

```ts
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit'

interface Item {
  id: string
  text: string
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Item[],
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Item>) => {
        state.push(action.payload)
      },
      prepare: (text: string) => {
        const id = nanoid()
        return { payload: { id, text } }
      },
    },
  },
})
```

### `extraReducers`

One of the key concepts of Redux is that each slice reducer "owns" its slice of state, and that many slice reducers
can independently respond to the same action type. `extraReducers` allows `createSlice` to respond to other action types
besides the types it has generated.

As case reducers specified with `extraReducers` are meant to reference "external" actions, they will not have actions generated in `slice.actions`.

As with `reducers`, these case reducers will also be passed to `createReducer` and may "mutate" their state safely.

If two fields from `reducers` and `extraReducers` happen to end up with the same action type string,
the function from `reducers` will be used to handle that action type.

### The `extraReducers` "builder callback" notation

The recommended way of using `extraReducers` is to use a callback that receives a `ActionReducerMapBuilder` instance.

This builder notation is also the only way to add matcher reducers and default case reducers to your slice.

[examples](docblock://createSlice.ts?token=CreateSliceOptions.extraReducers)

We recommend using this API as it has better TypeScript support (and thus, IDE autocomplete even for JavaScript users), as it will correctly infer the action type in the reducer based on the provided action creator.
It's particularly useful for working with actions produced by `createAction` and `createAsyncThunk`.

See [the "Builder Callback Notation" section of the `createReducer` reference](./createReducer.mdx#usage-with-the-builder-callback-notation) for details on how to use `builder.addCase`, `builder.addMatcher`, and `builder.addDefault`

### The `extraReducers` "map object" notation

Like `reducers`, `extraReducers` can be an object containing Redux case reducer functions. However, the keys should
be other Redux string action type constants, and `createSlice` will _not_ auto-generate action types or action creators
for reducers included in this parameter.

Action creators that were generated using [`createAction`](./createAction.mdx) may be used directly as the keys here, using
computed property syntax.

```js
const incrementBy = createAction('incrementBy')

createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {},
  extraReducers: {
    [incrementBy]: (state, action) => {
      return state + action.payload
    },
    'some/other/action': (state, action) => {},
  },
})
```

:::tip

We recommend using the `builder callback` API as the default, especially if you are using TypeScript. If you do not use the `builder callback` and are using TypeScript, you will need to use `actionCreator.type` or `actionCreator.toString()` to force the TS compiler to accept the computed property. Please see [Usage With TypeScript](./../usage/usage-with-typescript.md#type-safety-with-extraReducers) for further details.

:::

## Return Value

`createSlice` will return an object that looks like:

```ts no-transpile
{
    name : string,
    reducer : ReducerFunction,
    actions : Record<string, ActionCreator>,
    caseReducers: Record<string, CaseReducer>.
    getInitialState: () => State
}
```

Each function defined in the `reducers` argument will have a corresponding action creator generated using [`createAction`](./createAction.mdx)
and included in the result's `actions` field using the same function name.

The generated `reducer` function is suitable for passing to the Redux `combineReducers` function as a "slice reducer".

You may want to consider destructuring the action creators and exporting them individually, for ease of searching
for references in a larger codebase.

> **Note**: the result object is conceptually similar to a
> ["Redux duck" code structure](https://redux.js.org/faq/code-structure#what-should-my-file-structure-look-like-how-should-i-group-my-action-creators-and-reducers-in-my-project-where-should-my-selectors-go).
> The actual code structure you use is up to you, but there are a couple caveats to keep in mind:
>
> - Actions are not exclusively limited to a single slice. Any part of the reducer logic can (and should!) respond
>   to any dispatched action.
> - At the same time, circular references can cause import problems. If slices A and B are defined in
>   separate files, and each file tries to import the other so it can listen to other actions, unexpected
>   behavior may occur.

## Examples

```ts
import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import { createStore, combineReducers } from 'redux'

const incrementBy = createAction<number>('incrementBy')
const decrementBy = createAction<number>('decrementBy')

const counter = createSlice({
  name: 'counter',
  initialState: 0 as number,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    multiply: {
      reducer: (state, action: PayloadAction<number>) => state * action.payload,
      prepare: (value?: number) => ({ payload: value || 2 }), // fallback if the payload is a falsy value
    },
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: (builder) => {
    builder.addCase(incrementBy, (state, action) => {
      return state + action.payload
    })
    builder.addCase(decrementBy, (state, action) => {
      return state - action.payload
    })
  },
})

const user = createSlice({
  name: 'user',
  initialState: { name: '', age: 20 },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload // mutate the state all you want with immer
    },
  },
  // "map object API"
  extraReducers: {
    // @ts-expect-error in TypeScript, this would need to be [counter.actions.increment.type]
    [counter.actions.increment]: (
      state,
      action /* action will be inferred as "any", as the map notation does not contain type information */
    ) => {
      state.age += 1
    },
  },
})

const reducer = combineReducers({
  counter: counter.reducer,
  user: user.reducer,
})

const store = createStore(reducer)

store.dispatch(counter.actions.increment())
// -> { counter: 1, user: {name : '', age: 21} }
store.dispatch(counter.actions.increment())
// -> { counter: 2, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply(3))
// -> { counter: 6, user: {name: '', age: 22} }
store.dispatch(counter.actions.multiply())
// -> { counter: 12, user: {name: '', age: 22} }
console.log(`${counter.actions.decrement}`)
// -> "counter/decrement"
store.dispatch(user.actions.setUserName('eric'))
// -> { counter: 12, user: { name: 'eric', age: 22} }
```

# `createAsyncThunk`

## Overview

A function that accepts a Redux action type string and a callback function that should return a promise. It generates promise lifecycle action types based on the action type prefix that you pass in, and returns a thunk action creator that will run the promise callback and dispatch the lifecycle actions based on the returned promise.

This abstracts the standard recommended approach for handling async request lifecycles.

It does not generate any reducer functions, since it does not know what data you're fetching, how you want to track loading state, or how the data you return needs to be processed. You should write your own reducer logic that handles these actions, with whatever loading state and processing logic is appropriate for your own app.

:::tip

Redux Toolkit's [**RTK Query data fetching API**](../rtk-query/overview.md) is a purpose built data fetching and caching solution for Redux apps, and can **eliminate the need to write _any_ thunks or reducers to manage data fetching**. We encourage you to try it out and see if it can help simplify the data fetching code in your own apps!

:::

Sample usage:

```ts no-transpile {5-11,22-25,30}
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// First, create the thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

interface UsersState {
  entities: []
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState = {
  entities: [],
  loading: 'idle',
} as UsersState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
  },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))
```

## Parameters

`createAsyncThunk` accepts three parameters: a string action `type` value, a `payloadCreator` callback, and an `options` object.

### `type`

A string that will be used to generate additional Redux action type constants, representing the lifecycle of an async request:

For example, a `type` argument of `'users/requestStatus'` will generate these action types:

- `pending`: `'users/requestStatus/pending'`
- `fulfilled`: `'users/requestStatus/fulfilled'`
- `rejected`: `'users/requestStatus/rejected'`

### `payloadCreator`

A callback function that should return a promise containing the result of some asynchronous logic. It may also return a value synchronously. If there is an error, it should either return a rejected promise containing an `Error` instance or a plain value such as a descriptive error message or otherwise a resolved promise with a `RejectWithValue` argument as returned by the `thunkAPI.rejectWithValue` function.

The `payloadCreator` function can contain whatever logic you need to calculate an appropriate result. This could include a standard AJAX data fetch request, multiple AJAX calls with the results combined into a final value, interactions with React Native `AsyncStorage`, and so on.

The `payloadCreator` function will be called with two arguments:

- `arg`: a single value, containing the first parameter that was passed to the thunk action creator when it was dispatched. This is useful for passing in values like item IDs that may be needed as part of the request. If you need to pass in multiple values, pass them together in an object when you dispatch the thunk, like `dispatch(fetchUsers({status: 'active', sortBy: 'name'}))`.
- `thunkAPI`: an object containing all of the parameters that are normally passed to a Redux thunk function, as well as additional options:
  - `dispatch`: the Redux store `dispatch` method
  - `getState`: the Redux store `getState` method
  - `extra`: the "extra argument" given to the thunk middleware on setup, if available
  - `requestId`: a unique string ID value that was automatically generated to identify this request sequence
  - `signal`: an [`AbortController.signal` object](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal) that may be used to see if another part of the app logic has marked this request as needing cancelation.
  - `rejectWithValue(value, [meta])`: rejectWithValue is a utility function that you can `return` (or `throw`) in your action creator to return a rejected response with a defined payload and meta. It will pass whatever value you give it and return it in the payload of the rejected action. If you also pass in a `meta`, it will be merged with the existing `rejectedAction.meta`.
  - `fulfillWithValue(value, meta)`: fulfillWithValue is a utility function that you can `return` in your action creator to `fulfill` with a value while having the ability of adding to `fulfilledAction.meta`.

The logic in the `payloadCreator` function may use any of these values as needed to calculate the result.

### Options

An object with the following optional fields:

- `condition(arg, { getState, extra } ): boolean | Promise<boolean>`: a callback that can be used to skip execution of the payload creator and all action dispatches, if desired. See [Canceling Before Execution](#canceling-before-execution) for a complete description.
- `dispatchConditionRejection`: if `condition()` returns `false`, the default behavior is that no actions will be dispatched at all. If you still want a "rejected" action to be dispatched when the thunk was canceled, set this flag to `true`.
- `idGenerator(arg): string`: a function to use when generating the `requestId` for the request sequence. Defaults to use [nanoid](./otherExports.mdx/#nanoid), but you can implement your own ID generation logic.
- `serializeError(error: unknown) => any` to replace the internal `miniSerializeError` method with your own serialization logic.
- `getPendingMeta({ arg, requestId }, { getState, extra }): any`: a function to create an object that will be merged into the `pendingAction.meta` field.

## Return Value

`createAsyncThunk` returns a standard Redux thunk action creator. The thunk action creator function will have plain action creators for the `pending`, `fulfilled`, and `rejected` cases attached as nested fields.

Using the `fetchUserById` example above, `createAsyncThunk` will generate four functions:

- `fetchUserById`, the thunk action creator that kicks off the async payload callback you wrote
  - `fetchUserById.pending`, an action creator that dispatches an `'users/fetchByIdStatus/pending'` action
  - `fetchUserById.fulfilled`, an action creator that dispatches an `'users/fetchByIdStatus/fulfilled'` action
  - `fetchUserById.rejected`, an action creator that dispatches an `'users/fetchByIdStatus/rejected'` action

When dispatched, the thunk will:

- dispatch the `pending` action
- call the `payloadCreator` callback and wait for the returned promise to settle
- when the promise settles:
  - if the promise resolved successfully, dispatch the `fulfilled` action with the promise value as `action.payload`
  - if the promise resolved with a `rejectWithValue(value)` return value, dispatch the `rejected` action with the value passed into `action.payload` and 'Rejected' as `action.error.message`
  - if the promise failed and was not handled with `rejectWithValue`, dispatch the `rejected` action with a serialized version of the error value as `action.error`
- Return a fulfilled promise containing the final dispatched action (either the `fulfilled` or `rejected` action object)

## Promise Lifecycle Actions

`createAsyncThunk` will generate three Redux action creators using [`createAction`](./createAction.mdx): `pending`, `fulfilled`, and `rejected`. Each lifecycle action creator will be attached to the returned thunk action creator so that your reducer logic can reference the action types and respond to the actions when dispatched. Each action object will contain the current unique `requestId` and `arg` values under `action.meta`.

The action creators will have these signatures:

```ts no-transpile
interface SerializedError {
  name?: string
  message?: string
  code?: string
  stack?: string
}

interface PendingAction<ThunkArg> {
  type: string
  payload: undefined
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string
  payload: PromiseResult
  meta: {
    requestId: string
    arg: ThunkArg
  }
}

interface RejectedAction<ThunkArg> {
  type: string
  payload: undefined
  error: SerializedError | any
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
    condition: boolean
  }
}

interface RejectedWithValueAction<ThunkArg, RejectedValue> {
  type: string
  payload: RejectedValue
  error: { message: 'Rejected' }
  meta: {
    requestId: string
    arg: ThunkArg
    aborted: boolean
  }
}

type Pending = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => PendingAction<ThunkArg>

type Fulfilled = <ThunkArg, PromiseResult>(
  payload: PromiseResult,
  requestId: string,
  arg: ThunkArg
) => FulfilledAction<ThunkArg, PromiseResult>

type Rejected = <ThunkArg>(
  requestId: string,
  arg: ThunkArg
) => RejectedAction<ThunkArg>

type RejectedWithValue = <ThunkArg, RejectedValue>(
  requestId: string,
  arg: ThunkArg
) => RejectedWithValueAction<ThunkArg, RejectedValue>
```

To handle these actions in your reducers, reference the action creators in `createReducer` or `createSlice` using either the object key notation or the "builder callback" notation. (Note that if you use TypeScript, you [should use the "builder callback" notation to ensure the types are inferred correctly](../usage/usage-with-typescript.md#type-safety-with-extrareducers)):

```ts no-transpile {2,6,14,23}
const reducer1 = createReducer(initialState, {
  [fetchUserById.fulfilled]: (state, action) => {},
})

const reducer2 = createReducer(initialState, (builder) => {
  builder.addCase(fetchUserById.fulfilled, (state, action) => {})
})

const reducer3 = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserById.fulfilled]: (state, action) => {},
  },
})

const reducer4 = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {})
  },
})
```

## Handling Thunk Results

### Unwrapping Result Actions

Thunks may return a value when dispatched. A common use case is to return a promise from the thunk, dispatch the thunk from a component, and then wait for the promise to resolve before doing additional work:

```ts no-transpile
const onClick = () => {
  dispatch(fetchUserById(userId)).then(() => {
    // do additional work
  })
}
```

The thunks generated by `createAsyncThunk` **will always return a resolved promise** with either the `fulfilled` action object or `rejected` action object inside, as appropriate.

The calling logic may wish to treat these actions as if they were the original promise contents. The promise returned by the dispatched thunk has an `unwrap` property which can be called to extract the `payload` of a `fulfilled` action or to throw either the `error` or, if available, `payload` created by `rejectWithValue` from a `rejected` action:

```ts no-transpile
// in the component

const onClick = () => {
  dispatch(fetchUserById(userId))
    .unwrap()
    .then((originalPromiseResult) => {
      // handle result here
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle error here
    })
}
```

Or with async/await syntax:

```ts no-transpile
// in the component

const onClick = async () => {
  try {
    const originalPromiseResult = await dispatch(fetchUserById(userId)).unwrap()
    // handle result here
  } catch (rejectedValueOrSerializedError) {
    // handle error here
  }
}
```

Using the attached `.unwrap()` property is preferred in most cases, however Redux Toolkit also exports an `unwrapResult` function that can be used for a similar purpose:

```ts no-transpile
import { unwrapResult } from '@reduxjs/toolkit'

// in the component
const onClick = () => {
  dispatch(fetchUserById(userId))
    .then(unwrapResult)
    .then((originalPromiseResult) => {
      // handle result here
    })
    .catch((rejectedValueOrSerializedError) => {
      // handle result here
    })
}
```

Or with async/await syntax:

```ts no-transpile
import { unwrapResult } from '@reduxjs/toolkit'

// in the component
const onClick = async () => {
  try {
    const resultAction = await dispatch(fetchUserById(userId))
    const originalPromiseResult = unwrapResult(resultAction)
    // handle result here
  } catch (rejectedValueOrSerializedError) {
    // handle error here
  }
}
```

### Checking Errors After Dispatching

Note that this means **a failed request or error in a thunk will _never_ return a _rejected_ promise**. We assume that any failure is more of a handled error than an unhandled exception at this point. This is due to the fact that we want to prevent uncaught promise rejections for those who do not use the result of `dispatch`.

If your component needs to know if the request failed, use `.unwrap` or `unwrapResult` and handle the re-thrown error accordingly.

## Handling Thunk Errors

When your `payloadCreator` returns a rejected promise (such as a thrown error in an `async` function), the thunk will dispatch a `rejected` action containing an automatically-serialized version of the error as `action.error`. However, to ensure serializability, everything that does not match the `SerializedError` interface will have been removed from it:

```ts no-transpile
export interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}
```

If you need to customize the contents of the `rejected` action, you should catch any errors yourself, and then **return** a new value using the `thunkAPI.rejectWithValue` utility. Doing `return rejectWithValue(errorPayload)` will cause the `rejected` action to use that value as `action.payload`.

The `rejectWithValue` approach should also be used if your API response "succeeds", but contains some kind of additional error details that the reducer should know about. This is particularly common when expecting field-level validation errors from an API.

```ts no-transpile
const updateUser = createAsyncThunk(
  'users/update',
  async (userData, { rejectWithValue }) => {
    const { id, ...fields } = userData
    try {
      const response = await userAPI.updateById(id, fields)
      return response.data.user
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err.response.data)
    }
  }
)
```

## Cancellation

### Canceling Before Execution

If you need to cancel a thunk before the payload creator is called, you may provide a `condition` callback as an option after the payload creator. The callback will receive the thunk argument and an object with `{getState, extra}` as parameters, and use those to decide whether to continue or not. If the execution should be canceled, the `condition` callback should return a literal `false` value or a promise that should resolve to `false`. If a promise is returned, the thunk waits for it to get fulfilled before dispatching the `pending` action, otherwise it proceeds with dispatching synchronously.

```ts no-transpile
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  },
  {
    condition: (userId, { getState, extra }) => {
      const { users } = getState()
      const fetchStatus = users.requests[userId]
      if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    },
  }
)
```

If `condition()` returns `false`, the default behavior is that no actions will be dispatched at all. If you still want a "rejected" action to be dispatched when the thunk was canceled, pass in `{condition, dispatchConditionRejection: true}`.

### Canceling While Running

If you want to cancel your running thunk before it has finished, you can use the `abort` method of the promise returned by `dispatch(fetchUserById(userId))`.

A real-life example of that would look like this:

```ts no-transpile
// file: store.ts noEmit
import { configureStore, Reducer } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

declare const reducer: Reducer<{}>
const store = configureStore({ reducer })
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

// file: slice.ts noEmit
import { createAsyncThunk } from '@reduxjs/toolkit'
export const fetchUserById = createAsyncThunk(
  'fetchUserById',
  (userId: string) => {
    /* ... */
  }
)

// file: MyComponent.ts
import { fetchUserById } from './slice'
import { useAppDispatch } from './store'
import React from 'react'

function MyComponent(props: { userId: string }) {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    // Dispatching the thunk returns a promise
    const promise = dispatch(fetchUserById(props.userId))
    return () => {
      // `createAsyncThunk` attaches an `abort()` method to the promise
      promise.abort()
    }
  }, [props.userId])
}
```

After a thunk has been cancelled this way, it will dispatch (and return) a `"thunkName/rejected"` action with an `AbortError` on the `error` property. The thunk will not dispatch any further actions.

Additionally, your `payloadCreator` can use the `AbortSignal` it is passed via `thunkAPI.signal` to actually cancel a costly asynchronous action.

The `fetch` api of modern browsers already comes with support for an `AbortSignal`:

```ts no-transpile
import { createAsyncThunk } from '@reduxjs/toolkit'

const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: string, thunkAPI) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`, {
      signal: thunkAPI.signal,
    })
    return await response.json()
  }
)
```

### Checking Cancellation Status

### Reading the Signal Value

You can use the `signal.aborted` property to regularly check if the thunk has been aborted and in that case stop costly long-running work:

```ts no-transpile
import { createAsyncThunk } from '@reduxjs/toolkit'

const readStream = createAsyncThunk(
  'readStream',
  async (stream: ReadableStream, { signal }) => {
    const reader = stream.getReader()

    let done = false
    let result = ''

    while (!done) {
      if (signal.aborted) {
        throw new Error('stop the work, this has been aborted!')
      }
      const read = await reader.read()
      result += read.value
      done = read.done
    }
    return result
  }
)
```

#### Listening for Abort Events

You can also call `signal.addEventListener('abort', callback)` to have logic inside the thunk be notified when `promise.abort()` was called.
This can for example be used in conjunction with an axios `CancelToken`:

```ts no-transpile
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: string, { signal }) => {
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })
    const response = await axios.get(`https://reqres.in/api/users/${userId}`, {
      cancelToken: source.token,
    })
    return response.data
  }
)
```

## Examples

- Requesting a user by ID, with loading state, and only one request at a time:

```ts no-transpile
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: string, { getState, requestId }) => {
    const { currentRequestId, loading } = getState().users
    if (loading !== 'pending' || requestId !== currentRequestId) {
      return
    }
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.entities.push(action.payload)
          state.currentRequestId = undefined
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        const { requestId } = action.meta
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle'
          state.error = action.error
          state.currentRequestId = undefined
        }
      })
  },
})

const UsersComponent = () => {
  const { entities, loading, error } = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const fetchOneUser = async (userId) => {
    try {
      const user = await dispatch(fetchUserById(userId)).unwrap()
      showToast('success', `Fetched ${user.name}`)
    } catch (err) {
      showToast('error', `Fetch failed: ${err.message}`)
    }
  }

  // render UI here
}
```

- Using rejectWithValue to access a custom rejected payload in a component

  _Note: this is a contrived example assuming our userAPI only ever throws validation-specific errors_

```ts no-transpile
// file: store.ts noEmit
import { configureStore, Reducer } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import usersReducer from './user/slice'

const store = configureStore({ reducer: { users: usersReducer } })
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type RootState = ReturnType<typeof store.getState>

// file: user/userAPI.ts noEmit

export declare const userAPI: {
  updateById<Response>(id: string, fields: {}): { data: Response }
}

// file: user/slice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'
import { AxiosError } from 'axios'

// Sample types that will be used
export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}

interface ValidationErrors {
  errorMessage: string
  field_errors: Record<string, string>
}

interface UpdateUserResponse {
  user: User
  success: boolean
}

export const updateUser = createAsyncThunk<
  User,
  { id: string } & Partial<User>,
  {
    rejectValue: ValidationErrors
  }
>('users/update', async (userData, { rejectWithValue }) => {
  try {
    const { id, ...fields } = userData
    const response = await userAPI.updateById<UpdateUserResponse>(id, fields)
    return response.data.user
  } catch (err) {
    let error: AxiosError<ValidationErrors> = err // cast the error for access
    if (!error.response) {
      throw err
    }
    // We got validation errors, let's return those so we can reference in our component and set form errors
    return rejectWithValue(error.response.data)
  }
})

interface UsersState {
  error: string | null | undefined
  entities: Record<string, User>
}

const initialState = {
  entities: {},
  error: null,
} as UsersState

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error.message
      }
    })
  },
})

export default usersSlice.reducer

// file: externalModules.d.ts noEmit

declare module 'some-toast-library' {
  export function showToast(type: string, message: string)
}

// file: user/UsersComponent.ts

import React from 'react'
import { useAppDispatch, RootState } from '../store'
import { useSelector } from 'react-redux'
import { User, updateUser } from './slice'
import { FormikHelpers } from 'formik'
import { showToast } from 'some-toast-library'

interface FormValues extends Omit<User, 'id'> {}

const UsersComponent = (props: { id: string }) => {
  const { entities, error } = useSelector((state: RootState) => state.users)
  const dispatch = useAppDispatch()

  // This is an example of an onSubmit handler using Formik meant to demonstrate accessing the payload of the rejected action
  const handleUpdateUser = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    const resultAction = await dispatch(updateUser({ id: props.id, ...values }))
    if (updateUser.fulfilled.match(resultAction)) {
      // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
      const user = resultAction.payload
      showToast('success', `Updated ${user.first_name} ${user.last_name}`)
    } else {
      if (resultAction.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, those types will be available here.
        formikHelpers.setErrors(resultAction.payload.field_errors)
      } else {
        showToast('error', `Update failed: ${resultAction.error}`)
      }
    }
  }

  // render UI here
}
```

# `createEntityAdapter`

## Overview

A function that generates a set of prebuilt reducers and selectors for performing CRUD operations on a [normalized state structure](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape) containing instances of a particular type of data object. These reducer functions may be passed as case reducers to `createReducer` and `createSlice`. They may also be used as "mutating" helper functions inside of `createReducer` and `createSlice`.

This API was ported from [the `@ngrx/entity` library](https://ngrx.io/guide/entity) created by the NgRx maintainers, but has been significantly modified for use with Redux Toolkit. We'd like to thank the NgRx team for originally creating this API and allowing us to port and adapt it for our needs.

> **Note**: The term "Entity" is used to refer to a unique type of data object in an application. For example, in a blogging application, you might have `User`, `Post`, and `Comment` data objects, with many instances of each being stored in the client and persisted on the server. `User` is an "entity" - a unique type of data object that the application uses. Each unique instance of an entity is assumed to have a unique ID value in a specific field.
>
> As with all Redux logic, [_only_ plain JS objects and arrays should be passed in to the store - **no class instances!**](https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions)
>
> For purposes of this reference, we will use `Entity` to refer to the specific data type that is being managed by a copy of the reducer logic in a specific portion of the Redux state tree, and `entity` to refer to a single instance of that type. Example: in `state.users`, `Entity` would refer to the `User` type, and `state.users.entities[123]` would be a single `entity`.

The methods generated by `createEntityAdapter` will all manipulate an "entity state" structure that looks like:

```js
{
  // The unique IDs of each item. Must be strings or numbers
  ids: []
  // A lookup table mapping entity IDs to the corresponding entity objects
  entities: {
  }
}
```

`createEntityAdapter` may be called multiple times in an application. If you are using it with plain JavaScript, you may be able to reuse a single adapter definition with multiple entity types if they're similar enough (such as all having an `entity.id` field). For [TypeScript usage](../usage/usage-with-typescript.md#createentityadapter), you will need to call `createEntityAdapter` a separate time for each distinct `Entity` type, so that the type definitions are inferred correctly.

Sample usage:

```ts
import {
  createEntityAdapter,
  createSlice,
  configureStore,
} from '@reduxjs/toolkit'

type Book = { bookId: string; title: string }

const booksAdapter = createEntityAdapter<Book>({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (book) => book.bookId,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    bookAdded: booksAdapter.addOne,
    booksReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      booksAdapter.setAll(state, action.payload.books)
    },
  },
})

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>

console.log(store.getState().books)
// { ids: [], entities: {} }

// Can create a set of memoized selectors based on the location of this entity state
const booksSelectors = booksAdapter.getSelectors<RootState>(
  (state) => state.books
)

// And then use the selectors to retrieve values
const allBooks = booksSelectors.selectAll(store.getState())
```

## Parameters

`createEntityAdapter` accepts a single options object parameter, with two optional fields inside.

### `selectId`

A function that accepts a single `Entity` instance, and returns the value of whatever unique ID field is inside. If not provided, the default implementation is `entity => entity.id`. If your `Entity` type keeps its unique ID values in a field other than `entity.id`, you **must** provide a `selectId` function.

### `sortComparer`

A callback function that accepts two `Entity` instances, and should return a standard `Array.sort()` numeric result (1, 0, -1) to indicate their relative order for sorting.

If provided, the `state.ids` array will be kept in sorted order based on comparisons of the entity objects, so that mapping over the IDs array to retrieve entities by ID should result in a sorted array of entities.

If not provided, the `state.ids` array will not be sorted, and no guarantees are made about the ordering. In other words, `state.ids` can be expected to behave like a standard Javascript array.

Note that sorting only kicks in when state is changed via one of the CRUD functions below (for example, `addOne()`, `updateMany()`).

## Return Value

A "entity adapter" instance. An entity adapter is a plain JS object (not a class) containing the generated reducer functions, the original provided `selectId` and `sortComparer` callbacks, a method to generate an initial "entity state" value, and functions to generate a set of globalized and non-globalized memoized selector functions for this entity type.

The adapter instance will include the following methods (additional referenced TypeScript types included):

```ts no-transpile
export type EntityId = number | string

export type Comparer<T> = (a: T, b: T) => number

export type IdSelector<T> = (model: T) => EntityId

export interface DictionaryNum<T> {
  [id: number]: T | undefined
}

export interface Dictionary<T> extends DictionaryNum<T> {
  [id: string]: T | undefined
}

export type Update<T> = { id: EntityId; changes: Partial<T> }

export interface EntityState<T> {
  ids: EntityId[]
  entities: Dictionary<T>
}

export interface EntityDefinition<T> {
  selectId: IdSelector<T>
  sortComparer: false | Comparer<T>
}

export interface EntityStateAdapter<T> {
  addOne<S extends EntityState<T>>(state: S, entity: T): S
  addOne<S extends EntityState<T>>(state: S, action: PayloadAction<T>): S

  addMany<S extends EntityState<T>>(state: S, entities: T[]): S
  addMany<S extends EntityState<T>>(state: S, entities: PayloadAction<T[]>): S

  setAll<S extends EntityState<T>>(state: S, entities: T[]): S
  setAll<S extends EntityState<T>>(state: S, entities: PayloadAction<T[]>): S

  removeOne<S extends EntityState<T>>(state: S, key: EntityId): S
  removeOne<S extends EntityState<T>>(state: S, key: PayloadAction<EntityId>): S

  removeMany<S extends EntityState<T>>(state: S, keys: EntityId[]): S
  removeMany<S extends EntityState<T>>(
    state: S,
    keys: PayloadAction<EntityId[]>
  ): S

  removeAll<S extends EntityState<T>>(state: S): S

  updateOne<S extends EntityState<T>>(state: S, update: Update<T>): S
  updateOne<S extends EntityState<T>>(
    state: S,
    update: PayloadAction<Update<T>>
  ): S

  updateMany<S extends EntityState<T>>(state: S, updates: Update<T>[]): S
  updateMany<S extends EntityState<T>>(
    state: S,
    updates: PayloadAction<Update<T>[]>
  ): S

  upsertOne<S extends EntityState<T>>(state: S, entity: T): S
  upsertOne<S extends EntityState<T>>(state: S, entity: PayloadAction<T>): S

  upsertMany<S extends EntityState<T>>(state: S, entities: T[]): S
  upsertMany<S extends EntityState<T>>(
    state: S,
    entities: PayloadAction<T[]>
  ): S
}

export interface EntitySelectors<T, V> {
  selectIds: (state: V) => EntityId[]
  selectEntities: (state: V) => Dictionary<T>
  selectAll: (state: V) => T[]
  selectTotal: (state: V) => number
  selectById: (state: V, id: EntityId) => T | undefined
}

export interface EntityAdapter<T> extends EntityStateAdapter<T> {
  selectId: IdSelector<T>
  sortComparer: false | Comparer<T>
  getInitialState(): EntityState<T>
  getInitialState<S extends object>(state: S): EntityState<T> & S
  getSelectors(): EntitySelectors<T, EntityState<T>>
  getSelectors<V>(
    selectState: (state: V) => EntityState<T>
  ): EntitySelectors<T, V>
}
```

### CRUD Functions

The primary content of an entity adapter is a set of generated reducer functions for adding, updating, and removing entity instances from an entity state object:

- `addOne`: accepts a single entity, and adds it if it's not already present.
- `addMany`: accepts an array of entities or an object in the shape of `Record<EntityId, T>`, and adds them if not already present.
- `setOne`: accepts a single entity and adds or replaces it
- `setMany`: accepts an array of entities or an object in the shape of `Record<EntityId, T>`, and adds or replaces them.
- `setAll`: accepts an array of entities or an object in the shape of `Record<EntityId, T>`, and replaces all existing entities with the values in the array.
- `removeOne`: accepts a single entity ID value, and removes the entity with that ID if it exists.
- `removeMany`: accepts an array of entity ID values, and removes each entity with those IDs if they exist.
- `removeAll`: removes all entities from the entity state object.
- `updateOne`: accepts an "update object" containing an entity ID and an object containing one or more new field values to update inside a `changes` field, and performs a shallow update on the corresponding entity.
- `updateMany`: accepts an array of update objects, and performs shallow updates on all corresponding entities.
- `upsertOne`: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values. If the entity does not exist, it will be added.
- `upsertMany`: accepts an array of entities or an object in the shape of `Record<EntityId, T>` that will be shallowly upserted.

:::info Should I add, set or upsert my entity?

All three options will insert _new_ entities into the list. However they differ in how they handle entities that already exist. If an entity **already exists**:

- `addOne` and `addMany` will do nothing with the new entity
- `setOne` and `setMany` will completely replace the old entity with the new one. This will also get rid of any properties on the entity that are not present in the new version of said entity.
- `upsertOne` and `upsertMany` will do a shallow copy to merge the old and new entities overwriting existing values, adding any that were not there and not touching properties not provided in the new entity.

:::


Each method has a signature that looks like:

```ts no-transpile
(state: EntityState<T>, argument: TypeOrPayloadAction<Argument<T>>) => EntityState<T>
```

In other words, they accept a state that looks like `{ids: [], entities: {}}`, and calculate and return a new state.

These CRUD methods may be used in multiple ways:

- They may be passed as case reducers directly to `createReducer` and `createSlice`.
- They may be used as "mutating" helper methods when called manually, such as a separate hand-written call to `addOne()` inside of an existing case reducer, if the `state` argument is actually an Immer `Draft` value.
- They may be used as immutable update methods when called manually, if the `state` argument is actually a plain JS object or array.

> **Note**: These methods do _not_ have corresponding Redux actions created - they are just standalone reducers / update logic. **It is entirely up to you to decide where and how to use these methods!** Most of the time, you will want to pass them to `createSlice` or use them inside another reducer.

Each method will check to see if the `state` argument is an Immer `Draft` or not. If it is a draft, the method will assume that it's safe to continue mutating that draft further. If it is not a draft, the method will pass the plain JS value to Immer's `createNextState()`, and return the immutably updated result value.

The `argument` may be either a plain value (such as a single `Entity` object for `addOne()` or an `Entity[]` array for `addMany()`, or a `PayloadAction` action object with that same value as `action.payload`. This enables using them as both helper functions and reducers.

> **Note on shallow updates:** `updateOne`, `updateMany`, `upsertOne`, and `upsertMany` only perform shallow updates in a mutable manner. This means that if your update/upsert consists of an object that includes nested properties, the value of the incoming change will overwrite the **entire** existing nested object. This may be unintended behavior for your application. As a general rule, these methods are best used with [normalized data](../usage/usage-guide.md#managing-normalized-data) that _do not_ have nested properties.

### `getInitialState`

Returns a new entity state object like `{ids: [], entities: {}}`.

It accepts an optional object as an argument. The fields in that object will be merged into the returned initial state value. For example, perhaps you want your slice to also track some loading state:

```js
const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {
    booksLoadingStarted(state, action) {
      // Can update the additional state field
      state.loading = 'pending'
    },
  },
})
```

### Selector Functions

The entity adapter will contain a `getSelectors()` function that returns a set of selectors that know how to read the contents of an entity state object:

- `selectIds`: returns the `state.ids` array.
- `selectEntities`: returns the `state.entities` lookup table.
- `selectAll`: maps over the `state.ids` array, and returns an array of entities in the same order.
- `selectTotal`: returns the total number of entities being stored in this state.
- `selectById`: given the state and an entity ID, returns the entity with that ID or `undefined`.

Each selector function will be created using the `createSelector` function from Reselect, to enable memoizing calculation of the results.

Because selector functions are dependent on knowing where in the state tree this specific entity state object is kept, `getSelectors()` can be called in two ways:

- If called without any arguments, it returns an "unglobalized" set of selector functions that assume their `state` argument is the actual entity state object to read from.
- It may also be called with a selector function that accepts the entire Redux state tree and returns the correct entity state object.

For example, the entity state for a `Book` type might be kept in the Redux state tree as `state.books`. You can use `getSelectors()` to read from that state in two ways:

```js
const store = configureStore({
  reducer: {
    books: booksReducer,
  },
})

const simpleSelectors = booksAdapter.getSelectors()
const globalizedSelectors = booksAdapter.getSelectors((state) => state.books)

// Need to manually pass the correct entity state object in to this selector
const bookIds = simpleSelectors.selectIds(store.getState().books)

// This selector already knows how to find the books entity state
const allBooks = globalizedSelectors.selectAll(store.getState())
```

## Notes

### Applying Multiple Updates

If `updateMany()` is called with multiple updates targeted to the same ID, they will be merged into a single update, with later updates overwriting the earlier ones.

For both `updateOne()` and `updateMany()`, changing the ID of one existing entity to match the ID of a second existing entity will cause the first to replace the second completely.

## Examples

Exercising several of the CRUD methods and selectors:

```js
import {
  createEntityAdapter,
  createSlice,
  configureStore,
} from '@reduxjs/toolkit'

// Since we don't provide `selectId`, it defaults to assuming `entity.id` is the right field
const booksAdapter = createEntityAdapter({
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

const booksSlice = createSlice({
  name: 'books',
  initialState: booksAdapter.getInitialState({
    loading: 'idle',
  }),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    bookAdded: booksAdapter.addOne,
    booksLoading(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    booksReceived(state, action) {
      if (state.loading === 'pending') {
        // Or, call them as "mutating" helpers in a case reducer
        booksAdapter.setAll(state, action.payload)
        state.loading = 'idle'
      }
    },
    bookUpdated: booksAdapter.updateOne,
  },
})

const {
  bookAdded,
  booksLoading,
  booksReceived,
  bookUpdated,
} = booksSlice.actions

const store = configureStore({
  reducer: {
    books: booksSlice.reducer,
  },
})

// Check the initial state:
console.log(store.getState().books)
// {ids: [], entities: {}, loading: 'idle' }

const booksSelectors = booksAdapter.getSelectors((state) => state.books)

store.dispatch(bookAdded({ id: 'a', title: 'First' }))
console.log(store.getState().books)
// {ids: ["a"], entities: {a: {id: "a", title: "First"}}, loading: 'idle' }

store.dispatch(bookUpdated({ id: 'a', changes: { title: 'First (altered)' } }))
store.dispatch(booksLoading())
console.log(store.getState().books)
// {ids: ["a"], entities: {a: {id: "a", title: "First (altered)"}}, loading: 'pending' }

store.dispatch(
  booksReceived([
    { id: 'b', title: 'Book 3' },
    { id: 'c', title: 'Book 2' },
  ])
)

console.log(booksSelectors.selectIds(store.getState()))
// "a" was removed due to the `setAll()` call
// Since they're sorted by title, "Book 2" comes before "Book 3"
// ["c", "b"]

console.log(booksSelectors.selectAll(store.getState()))
// All book entries in sorted order
// [{id: "c", title: "Book 2"}, {id: "b", title: "Book 3"}]
```

# `createSelector`

The `createSelector` utility from the [Reselect library](https://github.com/reduxjs/reselect), re-exported for ease of use.

For more details on using `createSelector`, see:

- The [Reselect API documentation](https://github.com/reduxjs/reselect)
- [React-Redux docs: Hooks API - Using memoizing selectors](https://react-redux.js.org/next/api/hooks#using-memoizing-selectors)
- [Idiomatic Redux: Using Reselect Selectors for Encapsulation and Performance](https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/)
- [React/Redux Links: Reducers and Selectors](https://github.com/markerikson/react-redux-links/blob/master/redux-reducers-selectors.md)

> **Note**: Prior to v0.7, RTK re-exported `createSelector` from [`selectorator`](https://github.com/planttheidea/selectorator), which
> allowed using string keypaths as input selectors. This was removed, as it ultimately did not provide enough benefits, and
> the string keypaths made static typing for selectors difficult.

# `createDraftSafeSelector`

In general, we recommend against using selectors inside of reducers:

- Selectors typically expect the entire Redux state object as an argument, while slice reducers only have access to a specific subset of the entire Redux state
- Reselect's `createSelector` relies on reference comparisons to determine if inputs have changed, and if an Immer Proxy-wrapped draft value is passed in to a selector, the selector may see the same reference and think nothing has changed.

However, some users have requested the ability to create selectors that will work correctly inside of Immer-powered reducers. One use case for this might be collecting an ordered set of items when using `createEntityAdapter`, such as `const orderedTodos = todosSelectors.selectAll(todosState)`, and then using `orderedTodos` in the rest of the reducer logic.

Besides re-exporting `createSelector`, RTK also exports a wrapped version of `createSelector` named `createDraftSafeSelector` that allows you to create selectors that can safely be used inside of `createReducer` and `createSlice` reducers with Immer-powered mutable logic. When used with plain state values, the selector will still memoize normally based on the inputs. But, when used with Immer draft values, the selector will err on the side of recalculating the results, just to be safe.

All selectors created by `entityAdapter.getSelectors` are "draft safe" selectors by default.

Example:

```js
const selectSelf = (state: State) => state
const unsafeSelector = createSelector(selectSelf, (state) => state.value)
const draftSafeSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.value
)

// in your reducer:

state.value = 1

const unsafe1 = unsafeSelector(state)
const safe1 = draftSafeSelector(state)

state.value = 2

const unsafe2 = unsafeSelector(state)
const safe2 = draftSafeSelector(state)
```

After executing that, `unsafe1` and `unsafe2` will be of the same value, because the memoized selector was
executed on the same object - but `safe2` will actually be different from `safe1` (with the updated value of `2`),
because the safe selector detected that it was executed on a Immer draft object and recalculated using the current
value instead of returning a cached value.

# Matching Utilities

Redux Toolkit exports several type-safe action matching utilities that you can leverage when checking for specific kinds of actions. These are primarily useful for the `builder.addMatcher()` cases in `createSlice` and `createReducer`, as well as when writing custom middleware.

### General Purpose

- [`isAllOf`](#isallof) - returns true when **all** conditions are met
- [`isAnyOf`](#isanyof) - returns true when **at least one of** the conditions are met

### `createAsyncThunk`-specific matchers

All these matchers can either be called with one or more thunks as arguments, in which case they will return a matcher function for that condition and thunks, or with one actions, in which case they will match for any thunk action with said condition.

- [`isAsyncThunkAction`](#isasyncthunkaction) - accepts one or more action creators and returns true when all match
- [`isPending`](#ispending) - accepts one or more action creators and returns true when all match
- [`isFulfilled`](#isfulfilled) - accepts one or more action creators and returns true when all match
- [`isRejected`](#isrejected) - accepts one or more action creators and returns true when all match
- [`isRejectedWithValue`](#isrejectedwithvalue) - accepts one or more action creators and returns true when all match

## `isAllOf`

A higher-order function that accepts one or more of:

- `redux-toolkit` action creator functions such as the ones produced by:
  - [`createAction`](./createAction)
  - [`createSlice`](./createSlice#return-value)
  - [`createAsyncThunk`](./createAsyncThunk#promise-lifecycle-actions)
- type guard functions
- custom action creator functions that have a `.match` property that is a type guard

It will return a type guard function that returns `true` if _all_ of the provided functions match.

## `isAnyOf`

Accepts the same inputs as `isAllOf` and will return a type guard function that returns `true` if at least one of the provided functions match.

## `isAsyncThunkAction`

A higher-order function that returns a type guard function that may be used to check whether an action was created by [`createAsyncThunk`](./createAsyncThunk).

```ts title="isAsyncThunkAction usage"
import { isAsyncThunkAction, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isARequestAction = isAsyncThunkAction(requestThunk1, requestThunk2)

function handleRequestAction(action: AnyAction) {
  if (isARequestAction(action)) {
    // action is an action dispatched by either `requestThunk1` or `requestThunk2`
  }
}
```

## `isPending`

A higher-order function that returns a type guard function that may be used to check whether an action is a 'pending' action creator from the `createAsyncThunk` promise lifecycle.

```ts title="isPending usage"
import { isPending, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isAPendingAction = isPending(requestThunk1, requestThunk2)

function handlePendingAction(action: AnyAction) {
  if (isAPendingAction(action)) {
    // action is a pending action dispatched by either `requestThunk1` or `requestThunk2`
  }
}
```

## `isFulfilled`

A higher-order function that returns a type guard function that may be used to check whether an action is a 'fulfilled'' action creator from the `createAsyncThunk` promise lifecycle.

```ts title="isFulfilled usage"
import { isFulfilled, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isAFulfilledAction = isFulfilled(requestThunk1, requestThunk2)

function handleFulfilledAction(action: AnyAction) {
  if (isAFulfilledAction(action)) {
    // action is a fulfilled action dispatched by either `requestThunk1` or `requestThunk2`
  }
}
```

## `isRejected`

A higher-order function that returns a type guard function that may be used to check whether an action is a 'rejected' action creator from the `createAsyncThunk` promise lifecycle.

```ts title="isRejected usage"
import { isRejected, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isARejectedAction = isRejected(requestThunk1, requestThunk2)

function handleRejectedAction(action: AnyAction) {
  if (isARejectedAction(action)) {
    // action is a rejected action dispatched by either `requestThunk1` or `requestThunk2`
  }
}
```

## `isRejectedWithValue`

A higher-order function that returns a type guard function that may be used to check whether an action is a 'rejected' action creator from the `createAsyncThunk` promise lifecycle that was created by [`rejectWithValue`](./createAsyncThunk#handling-thunk-errors).

```ts title="isRejectedWithValue usage"
import { isRejectedWithValue, AnyAction } from '@reduxjs/toolkit'
import { requestThunk1, requestThunk2 } from '@virtual/matchers'

const isARejectedWithValueAction = isRejectedWithValue(
  requestThunk1,
  requestThunk2
)

function handleRejectedWithValueAction(action: AnyAction) {
  if (isARejectedWithValueAction(action)) {
    // action is a rejected action dispatched by either `requestThunk1` or `requestThunk2`
    // where rejectWithValue was used
  }
}
```

## Using matchers to reduce code complexity, duplication and boilerplate

When using the `builder` pattern to construct a reducer, we add cases or matchers one at a time. However, by using `isAnyOf` or `isAllOf`,
we're able to easily use the same matcher for several cases in a type-safe manner.

First, let's examine an unnecessarily complex example:

```ts title="Example without using a matcher utility"
import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit'

interface Data {
  isInteresting: boolean
  isSpecial: boolean
}

interface Special extends Data {
  isSpecial: true
}

interface Interesting extends Data {
  isInteresting: true
}

function isSpecial(
  action: PayloadAction<Data>
): action is PayloadAction<Special> {
  return action.payload.isSpecial
}

function isInteresting(
  action: PayloadAction<Data>
): action is PayloadAction<Interesting> {
  return action.payload.isInteresting
}

interface ExampleState {
  isSpecial: boolean
  isInteresting: boolean
}

const initialState = {
  isSpecial: false,
  isInteresting: false,
} as ExampleState

export const isSpecialAndInterestingThunk = createAsyncThunk(
  'isSpecialAndInterestingThunk',
  () => {
    return {
      isSpecial: true,
      isInteresting: true,
    }
  }
)

// This has unnecessary complexity
const loadingReducer = createReducer(initialState, (builder) => {
  builder.addCase(isSpecialAndInterestingThunk.fulfilled, (state, action) => {
    if (isSpecial(action)) {
      state.isSpecial = true
    }
    if (isInteresting(action)) {
      state.isInteresting = true
    }
  })
})
```

In this scenario, we can use `isAllOf` to simplify our code and reduce some of the boilerplate.

```ts title="Refactoring with isAllOf"
import { createReducer, isAllOf } from '@reduxjs/toolkit'
import {
  isSpecialAndInterestingThunk,
  initialState,
  isSpecial,
  isInteresting,
  Data,
} from '@virtual/matchers' // This is a fake pkg that provides the types shown above

const loadingReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      isAllOf(isSpecialAndInterestingThunk.fulfilled, isSpecial),
      (state, action) => {
        state.isSpecial = true
      }
    )
    .addMatcher(
      isAllOf(isSpecialAndInterestingThunk.fulfilled, isInteresting),
      (state, action) => {
        state.isInteresting = true
      }
    )
})
```

## Using matchers as a TypeScript Type Guard

The function returned by `isAllOf` and `isAnyOf` can also be used as a TypeScript type guard in other contexts.

```ts title="Using isAllOf as a type guard"
import { isAllOf, PayloadAction } from '@reduxjs/toolkit'
import { Data, isSpecial, isInteresting } from '@virtual/matchers' // This is a fake pkg that provides the types shown above

const isSpecialAndInteresting = isAllOf(isSpecial, isInteresting)

function someFunction(action: PayloadAction<Data>) {
  if (isSpecialAndInteresting(action)) {
    // "action" will be correctly typed as:
    // `PayloadAction<Special> & PayloadAction<Interesting>`
  }
}
```

```ts title="Using isAnyOf as a type guard"
import { isAnyOf, PayloadAction } from '@reduxjs/toolkit'
import { Data, isSpecial, isInteresting } from '@virtual/matchers' // this is a fake pkg that provides the types shown above

const isSpecialOrInteresting = isAnyOf(isSpecial, isInteresting)

function someFunction(action: PayloadAction<Data>) {
  if (isSpecialOrInteresting(action)) {
    // "action" will be correctly typed as:
    // `PayloadAction<Special> | PayloadAction<Interesting>`
  }
}
```

## Example

<iframe
  src="https://codesandbox.io/embed/redux-toolkit-matchers-example-e765q?fontsize=14&hidenavigation=1&module=%2Fsrc%2Ffeatures%2Fcounter%2FcounterSlice.ts&theme=dark&runonclick=1"
  style={{
    width: '100%',
    height: '500px',
    border: 0,
    borderRadius: 4,
    overflow: 'hidden',
  }}
  title="redux-toolkit-matchers-example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

# Other Exports

Redux Toolkit exports some of its internal utilities, and re-exports additional functions from other dependencies as well.

### `nanoid`

An inlined copy of [`nanoid/nonsecure`](https://github.com/ai/nanoid). Generates a non-cryptographically-secure random ID string. `createAsyncThunk` uses this by default for request IDs. May also be useful for other cases as well.

```ts
import { nanoid } from '@reduxjs/toolkit'

console.log(nanoid())
// 'dgPXxUz_6fWIQBD8XmiSy'
```

### `miniSerializeError`

The default error serialization function used by `createAsyncThunk`, based on https://github.com/sindresorhus/serialize-error. If its argument is an object (such as an `Error` instance), it returns a plain JS `SerializedError` object that copies over any of the listed fields. Otherwise, it returns a stringified form of the value: `{ message: String(value) }`.

```ts no-transpile
export interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}

export function miniSerializeError(value: any): SerializedError {}
```

### `copyWithStructuralSharing`

A utility that will recursively merge two similar objects together, preserving existing references if the values appear to be the same. This is used internally to help ensure that re-fetched data keeps using the same references unless the new data has actually changed, to avoid unnecessary re-renders. Otherwise, every re-fetch would likely cause the entire dataset to be replaced and all consuming components to always re-render.

If either of the inputs are not plain JS objects or arrays, the new value is returned.

```ts no-transpile
export function copyWithStructuralSharing<T>(oldObj: any, newObj: T): T
export function copyWithStructuralSharing(oldObj: any, newObj: any): any {}
```

## Exports from Other Libraries

### `createNextState`

The default immutable update function from the [`immer` library](https://immerjs.github.io/immer/), re-exported here as `createNextState` (also commonly referred to as [`produce`](https://immerjs.github.io/immer/produce))

### `current`

[The `current` function](https://immerjs.github.io/immer/current) from the [`immer` library](https://immerjs.github.io/immer/), which takes a snapshot of the current state of a draft and finalizes it (but without freezing). Current is a great utility to print the current state during debugging, and the output of `current` can also be safely leaked outside the producer.

### `original`

[The `original` function](https://immerjs.github.io/immer/original) from the [`immer` library](https://immerjs.github.io/immer/), which returns the original object. This is particularly useful for referential equality check in reducers.

```ts
import { createReducer, createAction, current } from '@reduxjs/toolkit'

interface Todo {
  //...
}
const addTodo = createAction<Todo>('addTodo')

const initialState = [] as Todo[]

const todosReducer = createReducer(initialState, (builder) => {
  builder.addCase(addTodo, (state, action) => {
    state.push(action.payload)
    console.log(current(state))
  })
})
```

### `isDraft`

[The `isDraft` function](https://immerjs.github.io/immer/original) from the [`immer` library](https://immerjs.github.io/immer/), which checks to see if a given value is a Proxy-wrapped "draft" state.

### `freeze`

[The `freeze` function](https://immerjs.github.io/immer/api) from the [`immer` library](https://immerjs.github.io/immer/), which [freezes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) draftable objects.

### `combineReducers`

Redux's [`combineReducers`](https://redux.js.org/api/combinereducers), re-exported for convenience. While `configureStore` calls this internally, you may wish to call it yourself to compose multiple levels of slice reducers.

### `compose`

Redux's [`compose`](https://redux.js.org/api/compose). It composes functions from right to left.
This is a functional programming utility. You might want to use it to apply several store custom enhancers/ functions in a row.

### `bindActionCreators`

Redux's [`bindActionCreators`](https://redux.js.org/api/bindactioncreators). It wraps action creators with `dispatch()` so that they dispatch immediately when called.

### `createStore`

Redux's [`createStore`](https://redux.js.org/api/createstore). You should not need to use this directly.

### `applyMiddleware`

Redux's [`applyMiddleware`](https://redux.js.org/api/applymiddleware). You should not need to use this directly.


# RTK Query Overview

:::tip What You'll Learn

- What RTK Query is and what problems it solves
- What APIs are included in RTK Query
- Basic RTK Query usage

:::

**RTK Query** is a powerful data fetching and caching tool. It is designed to simplify common cases for loading data in a web application, **eliminating the need to hand-write data fetching & caching logic yourself**.

RTK Query is **an optional addon included in the Redux Toolkit package**, and its functionality is built on top of the other APIs in Redux Toolkit.

:::info

To learn how to use RTK Query, see the full ["Redux Essentials" tutorial](https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics) on the Redux core docs site.

:::

## Motivation

Web applications normally need to fetch data from a server in order to display it. They also usually need to make updates to that data, send those updates to the server, and keep the cached data on the client in sync with the data on the server. This is made more complicated by the need to implement other behaviors used in today's applications:

- Tracking loading state in order to show UI spinners
- Avoiding duplicate requests for the same data
- Optimistic updates to make the UI feel faster
- Managing cache lifetimes as the user interacts with the UI

The Redux core has always been very minimal - it's up to developers to write all the actual logic. That means that Redux has never included anything built in to help solve these use cases. The Redux docs have taught [some common patterns for dispatching actions around the request lifecycle to track loading state and request results](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#async-request-status), and [Redux Toolkit's `createAsyncThunk` API](../api/createAsyncThunk.mdx) was designed to abstract that typical pattern. However, users still have to write significant amounts of reducer logic to manage the loading state and the cached data.

Over the last couple years, the React community has come to realize that **"data fetching and caching" is really a different set of concerns than "state management"**. While you can use a state management library like Redux to cache data, the use cases are different enough that it's worth using tools that are purpose-built for the data fetching use case.

RTK Query takes inspiration from other tools that have pioneered solutions for data fetching, like Apollo Client, React Query, Urql, and SWR, but adds a unique approach to its API design:

- The data fetching and caching logic is built on top of Redux Toolkit's `createSlice` and `createAsyncThunk` APIs
- Because Redux Toolkit is UI-agnostic, RTK Query's functionality can be used with any UI layer
- API endpoints are defined ahead of time, including how to generate query parameters from arguments and transform responses for caching
- RTK Query can also generate React hooks that encapsulate the entire data fetching process, provide `data` and `isLoading` fields to components, and manage the lifetime of cached data as components mount and unmount
- RTK Query provides "cache entry lifecycle" options that enable use cases like streaming cache updates via websocket messages after fetching the initial data
- We have early working examples of code generation of API slices from OpenAPI and GraphQL schemas
- Finally, RTK Query is completely written in TypeScript, and is designed to provide an excellent TS usage experience

## What's included

### APIs

RTK Query is included within the installation of the core Redux Toolkit package. It is available via either of the two entry points below:

```ts no-transpile
import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react'
```

RTK Query includes these APIs:

- [`createApi()`](./api/createApi.mdx): The core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.
- [`fetchBaseQuery()`](./api/fetchBaseQuery.mdx): A small wrapper around [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that aims to simplify requests. Intended as the recommended `baseQuery` to be used in `createApi` for the majority of users.
- [`<ApiProvider />`](./api/ApiProvider.mdx): Can be used as a `Provider` if you **do not already have a Redux store**.
- [`setupListeners()`](./api/setupListeners.mdx): A utility used to enable `refetchOnMount` and `refetchOnReconnect` behaviors.

### Bundle Size

RTK Query adds a fixed one-time amount to your app's bundle size. Since RTK Query builds on top of Redux Toolkit and React-Redux, the added size varies depending on whether you are already using those in your app. The estimated min+gzip bundle sizes are:

- If you are using RTK already: ~9kb for RTK Query and ~2kb for the hooks.
- If you are not using RTK already:
  - Without React: 17 kB for RTK+dependencies+RTK Query
  - With React: 19kB + React-Redux, which is a peer dependency

Adding additional endpoint definitions should only increase size based on the actual code inside the `endpoints` definitions, which will typically be just a few bytes.

The functionality included in RTK Query quickly pays for the added bundle size, and the elimination of hand-written data fetching logic should be a net improvement in size for most meaningful applications.

## Basic Usage

### Create an API Slice

RTK Query is included within the installation of the core Redux Toolkit package. It is available via either of the two entry points below:

```ts
import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react'
```

For typical usage with React, start by importing `createApi` and defining an "API slice" that lists the server's base URL and which endpoints we want to interact with:

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
```

### Configure the Store

The "API slice" also contains an auto-generated Redux slice reducer and a custom middleware that manages subscription lifetimes. Both of those need to be added to the Redux store:

```ts
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
```

### Use Hooks in Components

Finally, import the auto-generated React hooks from the API slice into your component file, and call the hooks in your component with any needed parameters. RTK Query will automatically fetch data on mount, re-fetch when parameters change, provide `{data, isFetching}` values in the result, and re-render the component as those values change:

```ts
import * as React from 'react'
import { useGetPokemonByNameQuery } from './services/pokemon'

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')
  
  // render UI based on data and loading state
}
```

## Further Information

See the [**RTK Query Quick Start tutorial**](../tutorials/rtk-query.mdx/) for examples of how to add RTK Query to a project that uses Redux Toolkit, set up an "API slice" with endpoint definitions, and how to use the auto-generated React hooks in your components.

The [**RTK Query usage guide section**](./usage/queries.mdx) has information on topics like [querying data](./usage/queries.mdx), [using mutations to send updates to the server](./usage/mutations.mdx), [streaming cache updates](./usage/streaming-updates.mdx), and much more.

The [**Examples page**](./usage/examples.mdx) has runnable CodeSandboxes that demonstrate topics like [making queries with GraphQL](./usage/examples.mdx#react-with-graphql), [authentication](./usage/examples.mdx#authentication), and even [using RTK Query with other UI libraries like Svelte](./usage/examples.mdx#svelte).

# Comparison with Other Tools

**RTK Query takes inspiration from many other data fetching libraries in the ecosystem**. Much like [the Redux core library was inspired by tools like Flux and Elm](https://redux.js.org/understanding/history-and-design/prior-art), RTK Query builds on API design patterns and feature concepts popularized by libraries like [React Query](https://react-query.tanstack.com/), [SWR](https://swr.vercel.app/), [Apollo](https://www.apollographql.com/), and [Urql](https://formidable.com/open-source/urql/). RTK Query has been written from scratch, but tries to use the best concepts from those libraries and other data fetching tools, with an eye towards leveraging the unique strengths and capabilities of Redux.

We think that all of those tools are great! If you're using one of them, you're happy with it, and it solves the problems you are facing in your app, keep using that tool. The information on this page is meant to help show **where there are differences in features, implementation approaches, and API design**. The goal is to help you **make informed decisions and understand tradeoffs**, rather than argue that tool X is better than tool Y.

## When Should You Use RTK Query?

In general, the main reasons to use RTK Query are:

- You already have a Redux app and you want to simplify your existing data fetching logic
- You want to be able to use the Redux DevTools to see the history of changes to your state over time
- You want to be able to integrate the RTK Query behavior with the rest of the Redux ecosystem
- Your app logic needs to work outside of React

### Unique Capabilities

RTK Query has some unique API design aspects and capabilities that are worth considering.

- With React Query and SWR, you usually define your hooks yourself, and you can do that all over the place and on the fly. With RTK Query, you do so in one central place by defining an "API slice" with multiple endpoints ahead of time. This allows for a more tightly integrated model of mutations automatically invalidating/refetching queries on trigger.
- Because RTK Query dispatches normal Redux actions as requests are processed, all actions are visible in the Redux DevTools. Additionally, every request is automatically visible to your Redux reducers and can easily update the global application state if necessary ([see example](https://github.com/reduxjs/redux-toolkit/issues/958#issuecomment-809570419)). You can use the endpoint [matcher functionality](./api/created-api/endpoints#matchers) to do additional processing of cache-related actions in your own reducers.
- Like Redux itself, the main RTK Query functionality is UI-agnostic and can be used with any UI layer
- You can easily invalidate entities or patch existing query data (via `util.updateQueryData`) from middleware.
- RTK Query enables [streaming cache updates](./usage/streaming-updates.mdx), such as updating the initial fetched data as messages are received over a websocket, and has built in support for [optimistic updates](./usage/manual-cache-updates.mdx#optimistic-updates) as well.
- RTK Query ships a very tiny and flexible fetch wrapper: [`fetchBaseQuery`](./api/fetchBaseQuery.mdx). It's also very easy to [swap our client with your own](./usage/customizing-queries.mdx), such as using `axios`, `redaxios`, or something custom.
- RTK Query has [a (currently experimental) code-gen tool](https://github.com/reduxjs/redux-toolkit/tree/master/packages/rtk-query-codegen-openapi) that will take an OpenAPI spec or GraphQL schema and give you a typed API client, as well as provide methods for enhancing the generated client after the fact.

## Tradeoffs

### No Normalized or Deduplicated Cache

RTK Query deliberately **does _not_ implement a cache that would deduplicate identical items across multiple requests**. There are several reasons for this:

- A fully normalized shared-across-queries cache is a _hard_ problem to solve
- We don't have the time, resources, or interest in trying to solve that right now
- In many cases, simply refetching data when it's invalidated works well and is easier to understand
- At a minimum, RTKQ can help solve the general use case of "fetch some data", which is a big pain point for a lot of people

### Bundle Size

RTK Query adds a fixed one-time amount to your app's bundle size. Since RTK Query builds on top of Redux Toolkit and React-Redux, the added size varies depending on whether you are already using those in your app. The estimated min+gzip bundle sizes are:

- If you are using RTK already: ~9kb for RTK Query and ~2kb for the hooks.
- If you are not using RTK already:
  - Without React: 17 kB for RTK+dependencies+RTK Query
  - With React: 19kB + React-Redux, which is a peer dependency

Adding additional endpoint definitions should only increase size based on the actual code inside the `endpoints` definitions, which will typically be just a few bytes.

The functionality included in RTK Query quickly pays for the added bundle size, and the elimination of hand-written data fetching logic should be a net improvement in size for most meaningful applications.

## Comparing Feature Sets

It's worth comparing the feature sets of all these tools to get a sense of their similarities and differences.

:::info

This comparison table strives to be as accurate and as unbiased as possible. If you use any of these libraries and feel the information could be improved, feel free to suggest changes (with notes or evidence of claims) by [opening an issue](https://github.com/reduxjs/redux-toolkit/issues/new).

:::

| Feature                                | rtk-query                               | [react-query]            | [apollo]                                                                            | [urql]                                                                                                      |
| -------------------------------------- | --------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Supported Protocols**                | any, REST included                      | any, none included       | GraphQL                                                                             | GraphQL                                                                                                     |
| **API Definition**                     | declarative                             | on use, declarative      | GraphQL schema                                                                      | GraphQL schema                                                                                              |
| **Cache by**                           | endpoint + serialized arguments         | user-defined query-key   | type/id                                                                             | type/id?                                                                                                    |
| **Invalidation Strategy + Refetching** | declarative, by type and/or type/id     | manual by cache key      | automatic cache updates on per-entity level, manual query invalidation by cache key | declarative, by type OR automatic cache updates on per-entity level, manual query invalidation by cache key |
| **Polling **                           | yes                                     | yes                      | yes                                                                                 | yes                                                                                                         |
| **Parallel queries **                  | yes                                     | yes                      | yes                                                                                 | yes                                                                                                         |
| **Dependent queries**                  | yes                                     | yes                      | yes                                                                                 | yes                                                                                                         |
| **Skip queries**                       | yes                                     | yes                      | yes                                                                                 | yes                                                                                                         |
| **Lagged queries**                     | yes                                     | yes                      | no                                                                                  | ?                                                                                                           |
| **Auto garbage collection**            | yes                                     | yes                      | no                                                                                  | ?                                                                                                           |
| **Normalized caching**                 | no                                      | no                       | yes                                                                                 | yes                                                                                                         |
| **Infinite scrolling**                 | TODO                                    | yes                      | requires manual code                                                                | ?                                                                                                           |
| **Prefetching**                        | yes                                     | yes                      | yes                                                                                 | yes?                                                                                                        |
| **Retrying**                           | yes                                     | yes                      | requires manual code                                                                | ?                                                                                                           |
| **Optimistic updates**                 | can update cache by hand                | can update cache by hand | `optimisticResponse`                                                                | ?                                                                                                           |
| **Manual cache manipulation**          | yes                                     | yes                      | yes                                                                                 | yes                                                                                                         |
| **Platforms**                          | hooks for React, everywhere Redux works | hooks for React          | various                                                                             | various                                                                                                     |

[react-query]: https://react-query.tanstack.com/
[apollo]: https://www.apollographql.com/
[urql]: https://formidable.com/open-source/urql/

## Further Information

- The [React Query "Comparison" page](https://react-query.tanstack.com/comparison) has an additional detailed feature set comparison table and discussion of capabilities
- Urql maintainer Phil Pluckthun wrote [an excellent explanation of what a "normalized cache" is and how Urql's cache works](https://kitten.sh/graphql-normalized-caching)
- The [RTK Query "Cache Behavior" page](./usage/cache-behavior.mdx#tradeoffs) has further details on why RTK Query does not implement a normalized cache

# Usage With TypeScript

:::tip What You'll Learn

- Details on how to use various RTK Query APIs with TypeScript

:::

## Introduction

As with the rest of the Redux Toolkit package, RTK Query is written in TypeScript, and its API is designed for seamless use in TypeScript applications.

This page provides details for using APIs included in RTK Query with TypeScript and how to type them correctly.

:::info

**We strongly recommend using TypeScript 4.1+ with RTK Query for best results.**

If you encounter any problems with the types that are not described on this page, please [open an issue](https://github.com/reduxjs/redux-toolkit/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) for discussion.

:::

## `createApi`

### Using auto-generated React Hooks

The React-specific entry point for RTK Query exports a version of [`createApi`](./api/createApi.mdx) which automatically generates React hooks for each of the defined query & mutation [`endpoints`](./api/createApi.mdx#endpoints).

To use the auto-generated React Hooks as a TypeScript user, **you'll need to use TS4.1+**.

```ts
// file: src/services/types.ts noEmit
export type Pokemon = {}

// file: src/services/pokemon.ts
// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// highlight-start
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
// highlight-end
```

For older versions of TS, you can use `api.endpoints.[endpointName].useQuery/useMutation` to access the same hooks.

```ts title="Accessing api hooks directly"
// file: src/services/types.ts noEmit
export type Pokemon = {}

// file: src/services/pokemon.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = pokemonApi

// file: src/services/manual-query.ts
import { pokemonApi } from './pokemon'

const useGetPokemonByNameQuery = pokemonApi.endpoints.getPokemonByName.useQuery
```

### Typing a `baseQuery`

Typing a custom [`baseQuery`](./api/createApi.mdx#basequery) can be done using the `BaseQueryFn` type exported by RTK Query.

```ts title="Base Query signature" no-transpile
export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = {},
  Meta = {}
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>

export interface BaseQueryApi {
  signal: AbortSignal
  dispatch: ThunkDispatch<any, any, any>
  getState: () => unknown
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E
      data?: undefined
      meta?: M
    }
  | {
      error?: undefined
      data: T
      meta?: M
    }
```

The `BaseQueryFn` type accepts the following generics:

- `Args` - The type for the first parameter of the function. The result returned by a [`query`](./api/createApi.mdx#query) property on an endpoint will be passed here.
- `Result` - The type to be returned in the `data` property for the success case. Unless you expect all queries and mutations to return the same type, it is recommended to keep this typed as `unknown`, and specify the types individually as shown [below](#typing-query-and-mutation-endpoints).
- `Error` - The type to be returned for the `error` property in the error case. This type also applies to all [`queryFn`](#typing-a-queryfn) functions used in endpoints throughout the API definition.
- `DefinitionExtraOptions` - The type for the third parameter of the function. The value provided to the [`extraOptions`](./api/createApi.mdx#extraoptions) property on an endpoint will be passed here.
- `Meta` - the type of the `meta` property that may be returned from calling the `baseQuery`. The `meta` property is accessible as the second argument to [`transformResponse`](./api/createApi.mdx#transformresponse).

:::note

The `meta` property returned from a `baseQuery` will always be considered as potentially undefined, as a `throw` in the error case may result in it not being provided. When accessing values from the `meta` property, this should be accounted for, e.g. using [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

:::

```ts title="Simple baseQuery TypeScript example"
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query'

const simpleBaseQuery: BaseQueryFn<
  string, // Args
  unknown, // Result
  { reason: string }, // Error
  { shout?: boolean }, // DefinitionExtraOptions
  { timestamp: number } // Meta
> = (arg, api, extraOptions) => {
  // `arg` has the type `string`
  // `api` has the type `BaseQueryApi` (not configurable)
  // `extraOptions` has the type `{ shout?: boolean }

  const meta = { timestamp: Date.now() }

  if (arg === 'forceFail') {
    return {
      error: {
        reason: 'Intentionally requested to fail!',
        meta,
      },
    }
  }

  if (extraOptions.shout) {
    return { data: 'CONGRATULATIONS', meta }
  }

  return { data: 'congratulations', meta }
}

const api = createApi({
  baseQuery: simpleBaseQuery,
  endpoints: (builder) => ({
    getSupport: builder.query({
      query: () => 'support me',
      extraOptions: {
        shout: true,
      },
    }),
  }),
})
```

### Typing query and mutation `endpoints`

`endpoints` for an api are defined as an object using the builder syntax. Both `query` and `mutation` endpoints can be typed by providing types to the generics in `<ResultType, QueryArg>` format.

- `ResultType` - The type of the final data returned by the query, factoring an optional [`transformResponse`](./api/createApi.mdx#transformresponse).
  - If `transformResponse` is not provided, then it is treated as though a successful query will return this type instead.
  - If `transformResponse` _is_ provided, the input type for `transformResponse` must also be specified, to indicate the type that the initial query returns. The return type for `transformResponse` must match `ResultType`.
  - If `queryFn` is used rather than `query`, then it must return the following shape for the success case:
    ```ts no-transpile
    {
      data: ResultType
    }
    ```
- `QueryArg` - The type of the input that will be passed as the only parameter to the `query` property of the endpoint, or the first parameter of a `queryFn` property if used instead.
  - If `query` doesn't have a parameter, then `void` type has to be provided explicitly.
  - If `query` has an optional parameter, then a union type with the type of parameter, and `void` has to be provided, e.g. `number | void`.

```ts title="Defining endpoints with TypeScript"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Post {
  id: number
  name: string
}

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    // highlight-start
    //              ResultType  QueryArg
    //                    v       v
    getPost: build.query<Post, number>({
      // inferred as `number` from the `QueryArg` type
      //       v
      query: (id) => `post/${id}`,
      // An explicit type must be provided to the raw result that the query returns
      // when using `transformResponse`
      //                             v
      transformResponse: (rawResult: { result: { post: Post } }, meta) => {
        //                                                        ^
        // The optional `meta` property is available based on the type for the `baseQuery` used

        // The return value for `transformResponse` must match `ResultType`
        return rawResult.result.post
      },
    }),
    // highlight-end
  }),
})
```

:::note

`queries` and `mutations` can also have their return type defined by a [`baseQuery`](#typing-a-basequery) rather than the method shown above, however, unless you expect all of your queries and mutations to return the same type, it is recommended to leave the return type of the `baseQuery` as `unknown`.

:::

### Typing a `queryFn`

As mentioned in [Typing query and mutation endpoints](#typing-query-and-mutation-endpoints), a `queryFn` will receive its result & arg types from the generics provided to the corresponding built endpoint.

```ts
// file: randomData.ts noEmit
export declare const getRandomName: () => string

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getRandomName } from './randomData'

interface Post {
  id: number
  name: string
}

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    // highlight-start
    //              ResultType  QueryArg
    //                    v       v
    getPost: build.query<Post, number>({
      // inferred as `number` from the `QueryArg` type
      //         v
      queryFn: (arg, queryApi, extraOptions, baseQuery) => {
        const post: Post = {
          id: arg,
          name: getRandomName(),
        }
        // For the success case, the return type for the `data` property
        // must match `ResultType`
        //              v
        return { data: post }
      },
    }),
    // highlight-end
  }),
})
```

The error type that a `queryFn` must return is determined by the [`baseQuery`](#typing-a-basequery) provided to `createApi`.

With [`fetchBaseQuery`](./api/fetchBaseQuery.mdx), the error type is like so:

```ts title="fetchBaseQuery error shape" no-transpile
{
  status: number
  data: any
}
```

An error case for the example above using `queryFn` and the error type from `fetchBaseQuery` could look like:

```ts title="queryFn error example with error type from fetchBaseQuery"
// file: randomData.ts noEmit
export declare const getRandomName: () => string

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getRandomName } from './randomData'

interface Post {
  id: number
  name: string
}

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    // highlight-start
    getPost: build.query<Post, number>({
      queryFn: (arg, queryApi, extraOptions, baseQuery) => {
        // highlight-start
        if (arg <= 0) {
          return {
            error: {
              status: 500,
              statusText: 'Internal Server Error',
              data: 'Invalid ID provided.',
            },
          }
        }
        // highlight-end
        const post: Post = {
          id: arg,
          name: getRandomName(),
        }
        return { data: post }
      },
    }),
  }),
})
```

For users who wish to _only_ use `queryFn` for each endpoint and not include a `baseQuery` at all, RTK Query provides a `fakeBaseQuery` function that can be used to easily specify the error type each `queryFn` should return.

```ts title="Excluding baseQuery for all endpoints"
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query'

// highlight-start
type CustomErrorType = { reason: 'too cold' | 'too hot' }
// highlight-end

const api = createApi({
  // highlight-start
  // This type will be used as the error type for all `queryFn` functions provided
  //                              v
  baseQuery: fakeBaseQuery<CustomErrorType>(),
  // highlight-end
  endpoints: (build) => ({
    eatPorridge: build.query<'just right', 1 | 2 | 3>({
      // highlight-start
      queryFn(seat) {
        if (seat === 1) {
          return { error: { reason: 'too cold' } }
        }

        if (seat === 2) {
          return { error: { reason: 'too hot' } }
        }

        return { data: 'just right' }
      },
      // highlight-end
    }),
    microwaveHotPocket: build.query<'delicious!', number>({
      // highlight-start
      queryFn(duration) {
        if (duration < 110) {
          return { error: { reason: 'too cold' } }
        }
        if (duration > 140) {
          return { error: { reason: 'too hot' } }
        }

        return { data: 'delicious!' }
      },
      // highlight-end
    }),
  }),
})
```

### Typing `providesTags`/`invalidatesTags`

RTK Query utilizes a cache tag invalidation system in order to provide [automated re-fetching](./usage/automated-refetching.mdx) of stale data.

When using the function notation, both the `providesTags` and `invalidatesTags` properties on endpoints are called with the following arguments:

- result: `ResultType` | `undefined` - The result returned by a successful query. The type corresponds with `ResultType` as [supplied to the built endpoint](#typing-query-and-mutation-endpoints). In the error case for a query, this will be `undefined`.
- error: `ErrorType` | `undefined` - The error returned by an errored query. The type corresponds with `Error` as [supplied to the `baseQuery` for the api](#typing-a-basequery). In the success case for a query, this will be `undefined`.
- arg: `QueryArg` - The argument supplied to the `query` property when the query itself is called. The type corresponds with `QueryArg` as [supplied to the built endpoint](#typing-query-and-mutation-endpoints).

A recommended use-case with `providesTags` when a query returns a list of items is to provide a tag for each item in the list using the entity ID, as well as a 'LIST' ID tag (see [Advanced Invalidation with abstract tag IDs](./usage/automated-refetching.mdx#advanced-invalidation-with-abstract-tag-ids)).

This is often written by spreading the result of mapping the received data into an array, as well as an additional item in the array for the `'LIST'` ID tag. When spreading the mapped array, by default, TypeScript will broaden the `type` property to `string`. As the tag `type` must correspond to one of the string literals provided to the [`tagTypes`](./api/createApi.mdx#tagtypes) property of the api, the broad `string` type will not satisfy TypeScript. In order to alleviate this, the tag `type` can be cast `as const` to prevent the type being broadened to `string`.

```ts title="providesTags TypeScript example"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Post {
  id: number
  name: string
}
type PostsResponse = Post[]

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [
              // highlight-start
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
              // highlight-end
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
})
```

<!-- when mapping, needs the tag `type` cast `as const` to prevent being broadened to `string` -->

## Skipping queries with TypeScript using `skipToken`

<!-- good for scenarios where you never want to send the query for a nullish value (skipping the query), but want the param itself to be typed correctly. Passing `skipToken` as the param will prevents the query from firing, with the same effect as `{ skip: true }`  -->

RTK Query provides the ability to conditionally skip queries from automatically running using the `skip` parameter as part of query hook options (see [Conditional Fetching](./usage/conditional-fetching.mdx)).

TypeScript users may find that they encounter invalid type scenarios when a query argument is typed to not be `undefined`, and they attempt to `skip` the query when an argument would not be valid.

```ts title="API definition"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    // Query argument is required to be `number`, and can't be `undefined`
    //                            V
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
    }),
  }),
})

export const { useGetPostQuery } = api
```

```tsx title="Using skip in a component"
import { useGetPostQuery } from './api'

function MaybePost({ id }: { id?: number }) {
  // This will produce a typescript error:
  // Argument of type 'number | undefined' is not assignable to parameter of type 'number | unique symbol'.
  // Type 'undefined' is not assignable to type 'number | unique symbol'.

  // @ts-expect-error id passed must be a number, but we don't call it when it isn't a number
  const { data } = useGetPostQuery(id, { skip: !id })

  return <div>...</div>
}
```

While you might be able to convince yourself that the query won't be called unless the `id` arg is a `number` at the time, TypeScript won't be convinced so easily.

RTK Query provides a `skipToken` export which can be used as an alternative to the `skip` option in order to skip queries, while remaining type-safe. When `skipToken` is passed as the query argument to `useQuery`, `useQueryState` or `useQuerySubscription`, it provides the same effect as setting `skip: true` in the query options, while also being a valid argument in scenarios where the `arg` might be undefined otherwise.

```tsx title="Using skipToken in a component"
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useGetPostQuery } from './api'

function MaybePost({ id }: { id?: number }) {
  // When `id` is nullish, we will still skip the query.
  // TypeScript is also happy that the query will only ever be called with a `number` now
  const { data } = useGetPostQuery(id ?? skipToken)

  return <div>...</div>
}
```

## Type safe error handling

When an error is gracefully provided from a [`base query`](./api/createApi.mdx#baseQuery), RTK query will provide the error
directly. If an unexpected error is thrown by user code rather than a handled error,
that error will be transformed into a `SerializedError` shape. Users should make sure that they are checking which kind of error they are dealing with before attempting to access its properties. This can be done in a type safe manner either
by using a type guard, e.g. by checking for [discriminated properties](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing),
or using a [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates).

When using [`fetchBaseQuery`](./api/fetchBaseQuery.mdx), as your base query,
errors will be of type `FetchBaseQueryError | SerializedError`. The specific shapes of those types can be seen below.

```ts title="FetchBaseQueryError type"
export type FetchBaseQueryError =
  | {
      /**
       * * `number`:
       *   HTTP status code
       */
      status: number
      data: unknown
    }
  | {
      /**
       * * `"FETCH_ERROR"`:
       *   An error that occurred during execution of `fetch` or the `fetchFn` callback option
       **/
      status: 'FETCH_ERROR'
      data?: undefined
      error: string
    }
  | {
      /**
       * * `"PARSING_ERROR"`:
       *   An error happened during parsing.
       *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
       *   or an error occurred while executing a custom `responseHandler`.
       **/
      status: 'PARSING_ERROR'
      originalStatus: number
      data: string
      error: string
    }
  | {
      /**
       * * `"CUSTOM_ERROR"`:
       *   A custom error type that you can return from your `queryFn` where another error might not make sense.
       **/
      status: 'CUSTOM_ERROR'
      data?: unknown
      error: string
    }
```

```ts title="SerializedError type"
export interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}
```

### Error result example

When using `fetchBaseQuery`, the `error` property returned from a hook will have the type `FetchBaseQueryError | SerializedError | undefined`.
If an error is present, you can access error properties after narrowing the type to either `FetchBaseQueryError` or `SerializedError`.

```tsx
import { api } from './services/api'

function PostDetail() {
  const { data, error, isLoading } = usePostsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    if ('status' in error) {
      // you can access all properties of `FetchBaseQueryError` here
      const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

      return (
        <div>
          <div>An error has occurred:</div>
          <div>{errMsg}</div>
        </div>
      )
    }
    else {
        // you can access all properties of `SerializedError` here
        return <div>{error.message}</div>
    }
  }

  if (data) {
    return (
      <div>
        {data.map((post) => (
          <div key={post.id}>Name: {post.name}</div>
        ))}
      </div>
    )
  }

  return null
}
```

### Inline error handling example

When handling errors inline after [`unwrapping`](../api/createAsyncThunk.mdx#unwrapping-result-actions) a mutation call,
a thrown error will have a type of `any` for typescript versions below 4.4,
or [`unknown` for versions 4.4+](https://devblogs.microsoft.com/typescript/announcing-typescript-4-4/#use-unknown-catch-variables).
In order to safely access properties of the error, you must first narrow the type to a known type.
This can be done using a [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)
as shown below.

```tsx title="services/helpers.ts"
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}
```

```tsx title="addPost.tsx"
import { useState } from 'react'
import { useSnackbar } from 'notistack'
import { api } from './services/api'
import { isFetchBaseQueryError, isErrorWithMessage } from './services/helpers'

function AddPost() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const [name, setName] = useState('')
  const [addPost] = useAddPostMutation()

  async function handleAddPost() {
    try {
      await addPost(name).unwrap()
      setName('')
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // you can access all properties of `FetchBaseQueryError` here
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data)
        enqueueSnackbar(errMsg, { variant: 'error' })
      } else if (isErrorWithMessage(err)) {
        // you can access a string 'message' property here
        enqueueSnackbar(err.message, { variant: 'error' })
      }
    }
  }

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button>Add post</button>
    </div>
  )
}
```

# Queries

## Overview

This is the most common use case for RTK Query. A query operation can be performed with any data fetching library of your choice, but the general recommendation is that you only use queries for requests that retrieve data. For anything that alters data on the server or will possibly invalidate the cache, you should use a [Mutation](./mutations).

By default, RTK Query ships with [`fetchBaseQuery`](../api/fetchBaseQuery), which is a lightweight [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like `axios`. See [Customizing Queries](./customizing-queries) if `fetchBaseQuery` does not handle your requirements.

:::info

Depending on your environment, you may need to polyfill `fetch` with `node-fetch` or `cross-fetch` if you choose to use `fetchBaseQuery` or `fetch` on its own.

:::

See [`useQuery`](../api/created-api/hooks.mdx#usequery) for the hook signature and additional details.

## Defining Query Endpoints

Query endpoints are defined by returning an object inside the `endpoints` section of `createApi`, and defining the fields using the `builder.query()` method.

Query endpoints should define either a `query` callback that constructs the URL (including any URL query params), or [a `queryFn` callback](./customizing-queries.mdx#customizing-queries-with-queryfn) that may do arbitrary async logic and return a result.

If the `query` callback needs additional data to generate the URL, it should be written to take a single argument. If you need to pass in multiple parameters, pass them formatted as a single "options object".

Query endpoints may also modify the response contents before the result is cached, define "tags" to identify cache invalidation, and provide cache entry lifecycle callbacks to run additional logic as cache entries are added and removed.

```ts title="Example of all query endpoint options"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: api.ts
// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPost: build.query<Post, number>({
      // highlight-start
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({ url: `post/${id}` }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: Post }, meta, arg) => response.data,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
      // The 2nd parameter is the destructured `QueryLifecycleApi`
      async onQueryStarted(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          updateCachedData,
        }
      ) {},
      // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
          updateCachedData,
        }
      ) {},
      // highlight-end
    }),
  }),
})
```

## Performing Queries with React Hooks

If you're using React Hooks, RTK Query does a few additional things for you. The primary benefit is that you get a render-optimized hook that allows you to have 'background fetching' as well as [derived booleans](#frequently-used-query-hook-return-values) for convenience.

Hooks are automatically generated based on the name of the `endpoint` in the service definition. An endpoint field with `getPost: builder.query()` will generate a hook named `useGetPostQuery`.

### Hook types

There are 5 query-related hooks:

1. [`useQuery`](../api/created-api/hooks.mdx#usequery)
   - Composes `useQuerySubscription` and `useQueryState` and is the primary hook. Automatically triggers fetches of data from an endpoint, 'subscribes' the component to the cached data, and reads the request status and cached data from the Redux store.
2. [`useQuerySubscription`](../api/created-api/hooks.mdx#usequerysubscription)
   - Returns a `refetch` function and accepts all hook options. Automatically triggers fetches of data from an endpoint, and 'subscribes' the component to the cached data.
3. [`useQueryState`](../api/created-api/hooks.mdx#usequerystate)
   - Returns the query state and accepts `skip` and `selectFromResult`. Reads the request status and cached data from the Redux store.
4. [`useLazyQuery`](../api/created-api/hooks.mdx#uselazyquery)
   - Returns a tuple with a `trigger` function, the query result, and last promise info. Similar to `useQuery`, but with manual control over when the data fetching occurs. **Note: the `trigger` function takes a second argument of `preferCacheValue?: boolean` in the event you want to skip making a request if cached data already exists.**
5. [`useLazyQuerySubscription`](../api/created-api/hooks.mdx#uselazyquerysubscription)
   - Returns a tuple with a `trigger` function, and last promise info. Similar to `useQuerySubscription`, but with manual control over when the data fetching occurs. **Note: the `trigger` function takes a second argument of `preferCacheValue?: boolean` in the event you want to skip making a request if cached data already exists.**

In practice, the standard `useQuery`-based hooks such as `useGetPostQuery` will be the primary hooks used in your application, but the other hooks are available for specific use cases.

### Query Hook Options

The query hooks expect two parameters: `(queryArg?, queryOptions?)`.

The `queryArg` param will be passed through to the underlying `query` callback to generate the URL.

The `queryOptions` object accepts several additional parameters that can be used to control the behavior of the data fetching:

- [skip](./conditional-fetching) - Allows a query to 'skip' running for that render. Defaults to `false`
- [pollingInterval](./polling) - Allows a query to automatically refetch on a provided interval, specified in milliseconds. Defaults to `0` _(off)_
- [selectFromResult](#selecting-data-from-a-query-result) - Allows altering the returned value of the hook to obtain a subset of the result, render-optimized for the returned subset.
- [refetchOnMountOrArgChange](../api/createApi#refetchonmountorargchange) - Allows forcing the query to always refetch on mount (when `true` is provided). Allows forcing the query to refetch if enough time (in seconds) has passed since the last query for the same cache (when a `number` is provided). Defaults to `false`
- [refetchOnFocus](../api/createApi#refetchonfocus) - Allows forcing the query to refetch when the browser window regains focus. Defaults to `false`
- [refetchOnReconnect](../api/createApi#refetchonreconnect) - Allows forcing the query to refetch when regaining a network connection. Defaults to `false`

:::info

All `refetch`-related options will override the defaults you may have set in [createApi](../api/createApi)

:::

### Frequently Used Query Hook Return Values

The query hook returns an object containing properties such as the latest `data` for the query request, as well as status booleans for the current request lifecycle state. Below are some of the most frequently used properties. Refer to [`useQuery`](../api/created-api/hooks.mdx#usequery) for an extensive list of all returned properties.

- `data` - The latest returned result regardless of hook arg, if present.
- `currentData` - The latest returned result for the current hook arg, if present.
- `error` - The error result if present.
- `isUninitialized` - When true, indicates that the query has not started yet.
- `isLoading` - When true, indicates that the query is currently loading for the first time, and has no data yet. This will be `true` for the first request fired off, but _not_ for subsequent requests.
- `isFetching` - When true, indicates that the query is currently fetching, but might have data from an earlier request. This will be `true` for both the first request fired off, as well as subsequent requests.
- `isSuccess` - When true, indicates that the query has data from a successful request.
- `isError` - When true, indicates that the query is in an `error` state.
- `refetch` - A function to force refetch the query

In most cases, you will probably read `data` and either `isLoading` or `isFetching` in order to render your UI.

### Query Hook Usage Example

Here is an example of a `PostDetail` component:

```tsx title="Example"
export const PostDetail = ({ id }: { id: string }) => {
  const {
    data: post,
    isFetching,
    isLoading,
  } = useGetPostQuery(id, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  if (isLoading) return <div>Loading...</div>
  if (!post) return <div>Missing post!</div>

  return (
    <div>
      {post.name} {isFetching ? '...refetching' : ''}
    </div>
  )
}
```

The way that this component is setup would have some nice traits:

1. It only shows 'Loading...' on the **initial load**
   - **Initial load** is defined as a query that is pending and does not have data in the cache
2. When the request is re-triggered by the polling interval, it will add '...refetching' to the post name
3. If a user closed this `PostDetail`, but then re-opened it within [the allowed time](../api/createApi#keepunuseddatafor), they would immediately be served a cached result and polling would resume with the previous behavior.

### Query Loading State

The auto-generated React hooks created by the React-specific version of `createApi` provide [derived booleans](#frequently-used-query-hook-return-values) that reflect the current state of a given query. Derived booleans are preferred for the generated React hooks as opposed to a `status` flag, as the derived booleans are able to provide a greater amount of detail which would not be possible with a single `status` flag, as multiple statuses may be true at a given time (such as `isFetching` and `isSuccess`).

For query endpoints, RTK Query maintains a semantic distinction between `isLoading` and `isFetching` in order to provide more flexibility with the derived information provided.

- `isLoading` refers to a query being in flight for the _first time_ for the given hook. No data will be available at this time.
- `isFetching` refers to a query being in flight for the given endpoint + query param combination, but not necessarily for the first time. Data may be available from an earlier request done by this hook, maybe with the previous query param.

This distinction allows for greater control when handling UI behavior. For example, `isLoading` can be used to display a skeleton while loading for the first time, while `isFetching` can be used to grey out old data when changing from page 1 to page 2 or when data is invalidated and re-fetched.

```tsx title="Managing UI behavior with Query Loading States"
import { Skeleton } from './Skeleton'
import { useGetPostsQuery } from './api'

function App() {
  const { data = [], isLoading, isFetching, isError } = useGetPostsQuery()

  if (isError) return <div>An error has occurred!</div>

  if (isLoading) return <Skeleton />

  return (
    <div className={isFetching ? 'posts--disabled' : ''}>
      {data.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.name}
          disabled={isFetching}
        />
      ))}
    </div>
  )
}
```

While `data` is expected to used in the majority of situations, `currentData` is also provided,
which allows for a further level of granularity. For example, if you wanted to show data in the UI
as translucent to represent a re-fetching state, you can use `data` in combination with `isFetching`
to achieve this. However, if you also wish to _only_ show data corresponding to the current arg,
you can instead use `currentData` to achieve this.

In the example below, if posts are being fetched for the first time, a loading skeleton will be
shown. If posts for the current user have previously been fetched, and are re-fetching (e.g. as a
result of a mutation), the UI will show the previous data, but will grey out the data. If the user
changes, it will instead show the skeleton again as opposed to greying out data for the previous user.

```tsx title="Managing UI behavior with currentData"
import { Skeleton } from './Skeleton'
import { useGetPostsByUserQuery } from './api'

function PostsList({ userName }: { userName: string }) {
  const { currentData, isFetching, isError } = useGetPostsByUserQuery(userName)

  if (isError) return <div>An error has occurred!</div>

  if (isFetching && !currentData) return <Skeleton />

  return (
    <div className={isFetching ? 'posts--disabled' : ''}>
      {currentData
        ? currentData.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              name={post.name}
              disabled={isFetching}
            />
          ))
        : 'No data available'}
    </div>
  )
}
```

### Query Cache Keys

When you perform a query, RTK Query automatically serializes the request parameters and creates an internal `queryCacheKey` for the request. Any future request that produces the same `queryCacheKey` will be de-duped against the original, and will share updates if a `refetch` is trigged on the query from any subscribed component.

### Selecting data from a query result

Sometimes you may have a parent component that is subscribed to a query, and then in a child component you want to pick an item from that query. In most cases you don't want to perform an additional request for a `getItemById`-type query when you know that you already have the result.

`selectFromResult` allows you to get a specific segment from a query result in a performant manner. When using this feature, the component will not rerender unless the underlying data of the selected item has changed. If the selected item is one element in a larger collection, it will disregard changes to elements in the same collection.

```tsx title="Using selectFromResult to extract a single result"
function PostsList() {
  const { data: posts } = api.useGetPostsQuery()

  return (
    <ul>
      {posts?.data?.map((post) => (
        <PostById key={post.id} id={post.id} />
      ))}
    </ul>
  )
}

function PostById({ id }: { id: number }) {
  // Will select the post with the given id, and will only rerender if the given posts data changes
  const { post } = api.useGetPostsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      post: data?.find((post) => post.id === id),
    }),
  })

  return <li>{post?.name}</li>
}
```

Note that a shallow equality check is performed on the overall return value of `selectFromResult` to determine whether to force a rerender. i.e. it will trigger a rerender if any of the returned object values change reference. If a new array/object is created and used as a return value within the callback, it will hinder the performance benefits due to being identified as a new item each time the callback is run. When intentionally providing an empty array/object, in order to avoid re-creating it each time the callback runs, you can declare an empty array/object outside of the component in order to maintain a stable reference.

```tsx title="Using selectFromResult with a stable empty array"
// An array declared here will maintain a stable reference rather than be re-created again
const emptyArray: Post[] = []

function PostsList() {
  // This call will result in an initial render returning an empty array for `posts`,
  // and a second render when the data is received.
  // It will trigger additional rerenders only if the `posts` data changes
  const { posts } = api.useGetPostsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      posts: data ?? emptyArray,
    }),
  })

  return (
    <ul>
      {posts.map((post) => (
        <PostById key={post.id} id={post.id} />
      ))}
    </ul>
  )
}
```

To summarize the above behaviour - the returned values must be correctly memoized. See also [Deriving Data with Selectors](https://redux.js.org/usage/deriving-data-selectors) and [Redux Essentials - RTK Query Advanced Patterns](https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#selecting-values-from-results) for additional information.

### Avoiding unnecessary requests

By default, if you add a component that makes the same query as an existing one, no request will be performed.

In some cases, you may want to skip this behavior and force a refetch - in that case, you can call `refetch` that is returned by the hook.

:::info

If you're not using React Hooks, you can access `refetch` like this:

```ts no-transpile
const { status, data, error, refetch } = dispatch(
  pokemonApi.endpoints.getPokemon.initiate('bulbasaur')
)
```

:::

## Example: Observing caching behavior

This example demonstrates request deduplication and caching behavior:

1. The first `Pokemon` component mounts and immediately fetches 'bulbasaur'
2. A second later, another `Pokemon` component is rendered with 'bulbasaur'
   - Notice that this one doesn't ever show 'Loading...' and no new network request happens? It's using the cache here.
3. A moment after that, a `Pokemon` component for 'pikachu' is added, and a new request happens.
4. When you click 'Refetch' of a particular pokemon type, it'll update all of them with one request.

:::note Try it out
Click the 'Add bulbasaur' button. You'll observe the same behavior described above until you click the 'Refetch' button on one of the components.
:::

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/deduping-queries?fontsize=12&runonclick=1&hidenavigation=1&theme=dark"
  style={{
    width: '100%',
    height: '800px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="RTK Query - Basic query deduplication example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

# Mutations

## Overview

Mutations are used to send data updates to the server and apply the changes to the local cache. Mutations can also invalidate cached data and force re-fetches.

## Defining Mutation Endpoints

Mutation endpoints are defined by returning an object inside the `endpoints` section of `createApi`, and defining the fields using the `build.mutation()` method.

Mutation endpoints should define either a `query` callback that constructs the URL (including any URL query params), or [a `queryFn` callback](./customizing-queries.mdx#customizing-queries-with-queryfn) that may do arbitrary async logic and return a result. The `query` callback may also return an object containing the URL, the HTTP method to use and a request body.

If the `query` callback needs additional data to generate the URL, it should be written to take a single argument. If you need to pass in multiple parameters, pass them formatted as a single "options object".

Mutation endpoints may also modify the response contents before the result is cached, define "tags" to identify cache invalidation, and provide cache entry lifecycle callbacks to run additional logic as cache entries are added and removed.

```ts title="Example of all mutation endpoint options"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    updatePost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      // highlight-start
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: Post }, meta, arg) => response.data,
      invalidatesTags: ['Post'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
      // highlight-end
    }),
  }),
})
```

:::info

The `onQueryStarted` method can be used for [optimistic updates](./manual-cache-updates.mdx#optimistic-updates)

:::

## Performing Mutations with React Hooks

### Mutation Hook Behavior

Unlike `useQuery`, `useMutation` returns a tuple. The first item in the tuple is the "trigger" function and the second element contains an object with `status`, `error`, and `data`.

Unlike the `useQuery` hook, the `useMutation` hook doesn't execute automatically. To run a mutation you have to call the trigger function returned as the first tuple value from the hook.

See [`useMutation`](../api/created-api/hooks.mdx#usemutation) for the hook signature and additional details.

### Frequently Used Mutation Hook Return Values

The `useMutation` hook returns a tuple containing a "mutation trigger" function, as well as an object containing properties about the "mutation result".

The "mutation trigger" is a function that when called, will fire off the mutation request for that endpoint. Calling the "mutation trigger" returns a promise with an `unwrap` property, which can be called to unwrap the mutation call and provide the raw response/error. This can be useful if you wish to determine whether the mutation succeeds/fails inline at the call-site.

The "mutation result" is an object containing properties such as the latest `data` for the mutation request, as well as status booleans for the current request lifecycle state.

Below are some of the most frequently used properties on the "mutation result" object. Refer to [`useMutation`](../api/created-api/hooks.mdx#usemutation) for an extensive list of all returned properties.

- `data` - The data returned from the latest trigger response, if present. If subsequent triggers from the same hook instance are called, this will return undefined until the new data is received. Consider component level caching if the previous response data is required for a smooth transition to new data.
- `error` - The error result if present.
- `isUninitialized` - When true, indicates that the mutation has not been fired yet.
- `isLoading` - When true, indicates that the mutation has been fired and is awaiting a response.
- `isSuccess` - When true, indicates that the last mutation fired has data from a successful request.
- `isError` - When true, indicates that the last mutation fired resulted in an error state.
- `reset` - A method to reset the hook back to it's original state and remove the current result from the cache

:::note

With RTK Query, a mutation does not contain a semantic distinction between 'loading' and 'fetching' in the way that a [query does](./queries.mdx#frequently-used-query-hook-return-values). For a mutation, subsequent calls are not assumed to be necessarily related, so a mutation is either 'loading' or 'not loading', with no concept of 're-fetching'.

:::

### Shared Mutation Results

By default, separate instances of a `useMutation` hook are not inherently related to each other.
Triggering one instance will not affect the result for a separate instance. This applies regardless
of whether the hooks are called within the same component, or different components.

```tsx no-transpile
export const ComponentOne = () => {
  // Triggering `updatePostOne` will affect the result in this component,
  // but not the result in `ComponentTwo`, and vice-versa
  const [updatePost, result] = useUpdatePostMutation()

  return <div>...</div>
}

export const ComponentTwo = () => {
  const [updatePost, result] = useUpdatePostMutation()

  return <div>...</div>
}
```

RTK Query provides an option to share results across mutation hook instances using the
`fixedCacheKey` option.
Any `useMutation` hooks with the same `fixedCacheKey` string will share results between each other
when any of the trigger functions are called. This should be a unique string shared between each
mutation hook instance you wish to share results.

```tsx no-transpile
export const ComponentOne = () => {
  // Triggering `updatePostOne` will affect the result in both this component,
  // but as well as the result in `ComponentTwo`, and vice-versa
  const [updatePost, result] = useUpdatePostMutation({
    fixedCacheKey: 'shared-update-post',
  })

  return <div>...</div>
}

export const ComponentTwo = () => {
  const [updatePost, result] = useUpdatePostMutation({
    fixedCacheKey: 'shared-update-post',
  })

  return <div>...</div>
}
```

:::note

When using `fixedCacheKey`, the `originalArgs` property is not able to be shared and will always be `undefined`.

:::

### Standard Mutation Example

This is a modified version of the complete example you can see at the bottom of the page to highlight the `updatePost` mutation. In this scenario, a post is fetched with `useQuery`, and then an `EditablePostName` component is rendered that allows us to edit the name of the post.

```tsx title="src/features/posts/PostDetail.tsx"
export const PostDetail = () => {
  const { id } = useParams<{ id: any }>()

  const { data: post } = useGetPostQuery(id)

  // highlight-start
  const [
    updatePost, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdatePostMutation()
  // highlight-end

  return (
    <Box p={4}>
      <EditablePostName
        name={post.name}
        onUpdate={(name) => {
          // If you want to immediately access the result of a mutation, you need to chain `.unwrap()`
          // if you actually want the payload or to catch the error.
          // Example: `updatePost().unwrap().then(fulfilled => console.log(fulfilled)).catch(rejected => console.error(rejected))

          return (
            // highlight-start
            // Execute the trigger with the `id` and updated `name`
            updatePost({ id, name })
            // highlight-end
          )
        }}
        // highlight-start
        isLoading={isUpdating}
        // highlight-end
      />
    </Box>
  )
}
```

## Advanced Mutations with Revalidation

In the real world, it's very common that a developer would want to resync their local data cache with the server after performing a mutation (aka "revalidation"). RTK Query takes a more centralized approach to this and requires you to configure the invalidation behavior in your API service definition. See [Advanced Invalidation with abstract tag IDs](./automated-refetching#advanced-invalidation-with-abstract-tag-ids) for details on advanced invalidation handling with RTK Query.

### Revalidation Example

This is an example of a [CRUD service](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) for Posts. This implements the [Selectively invalidating lists](./automated-refetching#selectively-invalidating-lists) strategy and will most likely serve as a good foundation for real applications.

```ts title="src/app/services/posts.ts"
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Post {
  id: number
  name: string
}

type PostsResponse = Post[]

export const postApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => 'posts',
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Posts', id: 'LIST' }],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query(body) {
        return {
          url: `post`,
          method: 'POST',
          body,
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    updatePost: build.mutation<Post, Partial<Post>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `post/${id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `post/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi
```

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/mutations?fontsize=14&runonclick=1&hidenavigation=1&module=%2Fsrc%2Fapp%2Fservices%2Fposts.ts&theme=dark"
  style={{
    width: '100%',
    height: '600px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="RTK Query - Mutations Example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>


# Cache Behavior

A key feature of RTK Query is its management of cached data. When data is fetched from the server, RTK Query will store the data in the Redux store as a 'cache'. When an additional request is performed for the same data, RTK Query will provide the existing cached data rather than sending an additional request to the server.

RTK Query provides a number of concepts and tools to manipulate the cache behaviour and adjust it to your needs.

## Default Cache Behavior

With RTK Query, caching is based on:

- API endpoint definitions
- The serialized query parameters used when components subscribe to data from an endpoint
- Active subscription reference counts

When a subscription is started, the parameters used with the endpoint are serialized and stored internally as a `queryCacheKey` for the request. Any future request that produces the same `queryCacheKey` (i.e. called with the same parameters, factoring serialization) will be de-duped against the original, and will share the same data and updates. i.e. two separate components performing the same request will use the same cached data.

When a request is attempted, if the data already exists in the cache, then that data is served and no new request is sent to the server. Otherwise, if the data does not exist in the cache, then a new request is sent, and the returned response is stored in the cache.

Subscriptions are reference-counted. Additional subscriptions that ask for the same endpoint+params increment the reference count. As long as there is an active 'subscription' to the data (e.g. if a component is mounted that calls a `useQuery` hook for the endpoint), then the data will remain in the cache. Once the subscription is removed (e.g. when last component subscribed to the data unmounts), after an amount of time (default 60 seconds), the data will be removed from the cache. The expiration time can be configured with the `keepUnusedDataFor` property for the [API definition as a whole](../api/createApi.mdx#keepunuseddatafor), as well as on a [per-endpoint](../api/createApi.mdx#keepunuseddatafor-1) basis.

### Cache lifetime & subscription example

Imagine an endpoint that expects an `id` as the query param, and 4 components mounted which are requesting data from this same endpoint:

```ts no-transpile
import { useGetUserQuery } from './api.ts'

function ComponentOne() {
  // component subscribes to the data
  const { data } = useGetUserQuery(1)

  return <div>...</div>
}

function ComponentTwo() {
  // component subscribes to the data
  const { data } = useGetUserQuery(2)

  return <div>...</div>
}

function ComponentThree() {
  // component subscribes to the data
  const { data } = useGetUserQuery(3)

  return <div>...</div>
}

function ComponentFour() {
  // component subscribes to the *same* data as ComponentThree,
  // as it has the same query parameters
  const { data } = useGetUserQuery(3)

  return <div>...</div>
}
```

While four components are subscribed to the endpoint, there are only three distinct combinations of endpoint + query parameters. Query parameters `1` and `2` will each have a single subscriber, while query parameter `3` has two subscribers. RTK Query will make three distinct fetches; one for each unique set of query parameters per endpoint.

Data is kept in the cache as long as at least one active subscriber is interested in that endpoint + parameter combination. When the subscriber reference count reaches zero, a timer is set, and if there are no new subscriptions to that data by the time the timer expires, the cached data will be removed. The default expiration is 60 seconds, which can be configured both for the [API definition as a whole](../api/createApi.mdx#keepunuseddatafor), as well as on a [per-endpoint](../api/createApi.mdx#keepunuseddatafor-1) basis.

If 'ComponentThree' is unmounted in the example above, regardless of how much time passes, the data will remain in the cache due to 'ComponentFour' still being subscribed to the same data, and the subscribe reference count will be `1`. However, once 'ComponentFour' unmounts, the subscriber reference count will be `0`. The data will remain in the cache for the remainder of the expiration time. If no new subscription has been created before the timer expires, the cached data will finally be removed.

## Manipulating Cache Behavior

On top of the default behaviour, RTK Query provides a number of methods to re-fetch data earlier in scenarios where it should be considered invalid, or is otherwise deemed suitable to be 'refreshed'.

### Reducing subscription time with `keepUnusedDataFor`

As mentioned above under [Default Cache Behavior](#default-cache-behavior) and [Cache lifetime & subscription example](#cache-lifetime--subscription-example), by default, data will remain in the cache for 60 seconds after the subscriber reference count hits zero.

This value can be configured using the `keepUnusedDataFor` option for both the API definition, as well as per-endpoint. Note that the per-endpoint version, if provided, will overrule a setting on the API definition.

Providing a value to `keepUnusedDataFor` as a number in seconds specifies how long the data should be kept in the cache after the subscriber reference count reaches zero.

```ts title="keepUnusedDataFor configuration"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // highlight-start
  // global configuration for the api
  keepUnusedDataFor: 30,
  // highlight-end
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: () => `posts`,
      // highlight-start
      // configuration for an individual endpoint, overriding the api setting
      keepUnusedDataFor: 5,
      // highlight-end
    }),
  }),
})
```

### Re-fetching on demand with `refetch`/`initiate`

In order to achieve complete granular control over re-fetching data, you can use the `refetch` function returned as a result property from a [`useQuery`](../api/created-api/hooks.mdx#usequery) or [`useQuerySubscription`](../api/created-api/hooks.mdx#usequerysubscription) hook.

Calling the `refetch` function will force refetch the associated query.

Alternatively, you can dispatch the `initiate` thunk action for an endpoint, passing the option `forceRefetch: true` to the thunk action creator for the same effect.

```tsx title="Force refetch example"
import { useDispatch } from 'react-redux'
import { useGetPostsQuery } from './api'

const Component = () => {
  const dispatch = useDispatch()
  const { data, refetch } = useGetPostsQuery({ count: 5 })

  function handleRefetchOne() {
    // force re-fetches the data
    refetch()
  }

  function handleRefetchTwo() {
    // has the same effect as `refetch` for the associated query
    dispatch(
      api.endpoints.getPosts.initiate(
        { count: 5 },
        { subscribe: false, forceRefetch: true }
      )
    )
  }

  return (
    <div>
      <button onClick={handleRefetchOne}>Force re-fetch 1</button>
      <button onClick={handleRefetchTwo}>Force re-fetch 2</button>
    </div>
  )
}
```

### Encouraging re-fetching with `refetchOnMountOrArgChange`

Queries can be encouraged to re-fetch more frequently than usual via the [`refetchOnMountOrArgChange`](../api/createApi.mdx#refetchonmountorargchange) property. This can be passed to the endpoint as a whole, to individual hook calls, or when dispatching the [`initiate`](../api/created-api/endpoints.mdx#initiate) action (the name of the action creator's option is `forceRefetch`).

`refetchOnMountOrArgChange` is used to encourage re-fetching in additional situations where the default behavior would instead serve cached data.

`refetchOnMountOrArgChange` accepts either a boolean value, or a number as time in seconds.

Passing `false` (the default value) for this property will use the default behavior [described above](#default-cache-behavior).

Passing `true` for this property will cause the endpoint to always refetch when a new subscriber to the query is added. If passed to an individual hook call and not the api definition itself, then this applies only to that hook call. I.e., when the component calling the hook mounts, or the argument changes, it will always refetch, regardless of whether cached data for the endpoint + arg combination already exists.

Passing a `number` as a value in seconds will use the following behavior:

- At the time a query subscription is created:
  - if there is an existing query in the cache, it will compare the current time vs the last fulfilled timestamp for that query,
  - It will refetch if the provided amount of time in seconds has elapsed.
- If there is no query, it will fetch the data.
- If there is an existing query, but the amount of time specified since the last query has not elapsed, it will serve the existing cached data.

```ts title="Configuring re-fetching on subscription if data exceeds a given time"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // highlight-start
  // global configuration for the api
  refetchOnMountOrArgChange: 30,
  // highlight-end
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: () => `posts`,
    }),
  }),
})
```

```tsx title="Forcing refetch on component mount"
import { useGetPostsQuery } from './api'

const Component = () => {
  const { data } = useGetPostsQuery(
    { count: 5 },
    // highlight-start
    // this overrules the api definition setting,
    // forcing the query to always fetch when this component is mounted
    { refetchOnMountOrArgChange: true }
    // highlight-end
  )

  return <div>...</div>
}
```

### Re-fetching on window focus with `refetchOnFocus`

The [`refetchOnFocus`](../api/createApi.mdx#refetchonfocus) option allows you to control whether RTK Query will try to refetch all subscribed queries after the application window regains focus.

If you specify this option alongside `skip: true`, this will not be evaluated until skip is false.

Note that this requires [`setupListeners`](../api/setupListeners.mdx) to have been called.

This option is available on both the api definition with [`createApi`](../api/createApi.mdx), as well as on the [`useQuery`](../api/created-api/hooks.mdx#usequery), [`useQuerySubscription`](../api/created-api/hooks.mdx#usequerysubscription), [`useLazyQuery`](../api/created-api/hooks.mdx#uselazyquery), and [`useLazyQuerySubscription`](../api/created-api/hooks.mdx#uselazyquerysubscription) hooks.

```ts title="src/services/api.ts"
// file: src/services/types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // highlight-start
  // global configuration for the api
  refetchOnFocus: true,
  // highlight-end
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: () => `posts`,
    }),
  }),
})
```

```ts title="src/store.ts"
// file: src/services/types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: src/services/api.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // highlight-start
  // global configuration for the api
  refetchOnFocus: true,
  // highlight-end
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: () => `posts`,
    }),
  }),
})

// file: src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './services/api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})

// highlight-start
// enable listener behavior for the store
setupListeners(store.dispatch)
// highlight-end

export type RootState = ReturnType<typeof store.getState>
```

### Re-fetching on network reconnection with `refetchOnReconnect`

The [`refetchOnReconnect`](../api/createApi.mdx#refetchonreconnect) option on [`createApi`](../api/createApi.mdx) allows you to control whether RTK Query will try to refetch all subscribed queries after regaining a network connection.

If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.

Note that this requires [`setupListeners`](../api/setupListeners.mdx) to have been called.

This option is available on both the api definition with [`createApi`](../api/createApi.mdx), as well as on the [`useQuery`](../api/created-api/hooks.mdx#usequery), [`useQuerySubscription`](../api/created-api/hooks.mdx#usequerysubscription), [`useLazyQuery`](../api/created-api/hooks.mdx#uselazyquery), and [`useLazyQuerySubscription`](../api/created-api/hooks.mdx#uselazyquerysubscription) hooks.

```ts title="src/services/api.ts"
// file: src/services/types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // highlight-start
  // global configuration for the api
  refetchOnReconnect: true,
  // highlight-end
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: () => `posts`,
    }),
  }),
})
```

```ts title="src/store.ts"
// file: src/services/types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: src/services/api.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // highlight-start
  // global configuration for the api
  refetchOnReconnect: true,
  // highlight-end
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: () => `posts`,
    }),
  }),
})

// file: src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './services/api'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(api.middleware),
})

// highlight-start
// enable listener behavior for the store
setupListeners(store.dispatch)
// highlight-end

export type RootState = ReturnType<typeof store.getState>
```

### Re-fetching after mutations by invalidating cache tags

RTK Query uses an optional [cache tag](./automated-refetching.mdx#cache-tags) system to automate re-fetching for query endpoints that have data affected by mutation endpoints.

See [Automated Re-fetching](./automated-refetching.mdx) for full details on this concept.

## Tradeoffs

### No Normalized or De-duplicated Cache

RTK Query deliberately **does _not_ implement a cache that would deduplicate identical items across multiple requests**. There are several reasons for this:

- A fully normalized shared-across-queries cache is a _hard_ problem to solve
- We don't have the time, resources, or interest in trying to solve that right now
- In many cases, simply re-fetching data when it's invalidated works well and is easier to understand
- At a minimum, RTKQ can help solve the general use case of "fetch some data", which is a big pain point for a lot of people

As an example, say that we have an API slice with `getTodos` and `getTodo` endpoints, and our components make the following queries:

- `getTodos()`
- `getTodos({filter: 'odd'})`
- `getTodo({id: 1})`

Each of these query results would include a Todo object that looks like `{id: 1}`.

In a fully normalized de-duplicating cache, only a single copy of this Todo object would be stored. However, RTK Query saves each query result independently in the cache. So, this would result in three separate copies of this Todo being cached in the Redux store. However, if all the endpoints are consistently providing the same tags (such as `{type: 'Todo', id: 1}`), then invalidating that tag will force all the matching endpoints to refetch their data for consistency.

The Redux docs have always recommended [keeping data in a normalized lookup table](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape) to enable easily finding items by ID and updating them in the store, and [RTK's `createEntityAdapter`](../../api/createEntityAdapter.mdx) was designed to help manage normalized state. Those concepts are still valuable and don't go away. However, if you're using RTK Query to manage caching data, there's less need to manipulate the data that way yourself.

There are a couple additional points that can help here:

- The generated query hooks have [a `selectFromResult` option](../api/created-api/hooks.mdx#selectfromresult) that allow components to read individual pieces of data from a query result. As an example, a `<TodoList>` component might call `useTodosQuery()`, and each individual `<TodoListItem>` could use the same query hook but select from the result to get the right todo object.
- You can use the [`transformResponse` endpoint option](../api/createApi.mdx#transformresponse) to modify the fetched data so that it's [stored in a different shape](./customizing-queries.mdx#customizing-query-responses-with-transformresponse), such as using `createEntityAdapter` to normalize the data _for this one response_ before it's inserted into the cache.

### Further information

- [Reddit: discussion of why RTKQ doesn't have a normalized cache, and tradeoffs](https://www.reddit.com/r/reactjs/comments/my9vrq/redux_toolkit_v16_alpha1_rtk_query_apis/gvxi5t7/)

## Examples

### Cache Subscription Lifetime Demo

This example is a live demo of how the subscriber reference count and the value of `keepUnusedDataFor` interact with each other. The `Subscriptions` and `Queries` (including the cached data) are shown in the demo for you to visualize (note that this can also be viewed in the [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension)).

Two components are mounted, each with the same endpoints query (`useGetUsersQuery(2)`). You will be able to observe that when toggling off the components, the subscriber reference count will be reduced. After toggling off both components such that the subscriber reference count reaches zero, you will observe the cached data under the `Queries` section will persist for 5 seconds (the value of `keepUnusedDataFor` provided for the endpoint in this demo). If the subscriber reference count remains at 0 for the full duration, the cached data will then be removed from the store.

<iframe
  src="https://codesandbox.io/embed/rtk-query-cache-subscription-lifetime-example-77tn4?fontsize=12&runonclick=1&hidenavigation=1&theme=dark&module=%2Fsrc%2Fservice%2Findex.ts"
  style={{
    width: '100%',
    height: '800px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="rtk-query-cache-subscription-lifetime-example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>


# Automated Re-fetching

As seen under [Default Cache Behavior](./cache-behavior.mdx#default-cache-behavior), when a subscription is added for a query endpoint, a request will be sent only if the cache data does not already exist. If it exists, the existing data will be served instead.

RTK Query uses a "cache tag" system to automate re-fetching for query endpoints that have data affected by mutation endpoints. This enables designing your api such that firing a specific mutation will cause a certain query endpoint to consider its cached data _invalid_, and re-fetch the data if there is an active subscription.

Each endpoint + parameter combination contributes its own `queryCacheKey`. The cache tag system enables the ability to inform RTK Query that a particular query cache has _provided_ specific tags. If a mutation is fired which is said to `invalidate` tags that a query cache has _provided_, the cached data will be considered _invalidated_, and re-fetch if there is an active subscription to the cached data.

For triggering re-fetching through other means, see [Manipulating Cache Behavior](./cache-behavior.mdx#manipulating-cache-behavior).

## Definitions

### Tags

_see also: [tagTypes API reference](../api/createApi.mdx#tagtypes)_

For RTK Query, _tags_ are just a name that you can give to a specific collection of data to control caching and invalidation behavior for re-fetching purposes. It can be considered as a 'label' attached to cached data that is read after a mutation, to decide whether the data should be affected by the mutation.

Tags are defined in the `tagTypes` argument when defining an api. For example, in an application that has both `Posts` and `Users`, you might define `tagTypes: ['Post', 'User']` when calling `createApi`.

An individual `tag` has a `type`, represented as a `string` name, and an optional `id`, represented as a `string` or `number`. It can be represented as a plain string (such as `'Post'`), or an object in the shape `{type: string, id?: string|number}` (such as `[{type: 'Post', id: 1}]`).

### Providing tags

_see also: [providesTags API reference](../api/createApi.mdx#providestags)_

A _query_ can have its cached data _provide_ tags. Doing so determines which 'tag' is attached to the cached data returned by the query.

The `providesTags` argument can either be an array of `string` (such as `['Post']`), `{type: string, id?: string|number}` (such as `[{type: 'Post', id: 1}]`), or a callback that returns such an array. That function will be passed the result as the first argument, the response error as the second argument, and the argument originally passed into the `query` method as the third argument. Note that either the result or error arguments may be undefined based on whether the query was successful or not.

### Invalidating tags

_see also: [invalidatesTags API reference](../api/createApi.mdx#invalidatestags)_

A _mutation_ can _invalidate_ specific cached data based on the tags. Doing so determines which cached data will be either refetched or removed from the cache.

The `invalidatesTags` argument can either be an array of `string` (such as `['Post']`), `{type: string, id?: string|number}` (such as `[{type: 'Post', id: 1}]`), or a callback that returns such an array. That function will be passed the result as the first argument, the response error as the second argument, and the argument originally passed into the `query` method as the third argument. Note that either the result or error arguments may be undefined based on whether the mutation was successful or not.

## Cache tags

RTK Query uses the concept of 'tags' to determine whether a mutation for one endpoint intends to _invalidate_ some data that was _provided_ by a query from another endpoint.

If cache data is being invalidated, it will either refetch the providing query (if components are still using that data) or remove the data from the cache.

When defining an API slice, `createApi` accepts an array of tag type names for the `tagTypes` property, which is a list of possible tag name options that the queries for the API slice could provide.

The example below declares that endpoints can possibly provide 'Posts' and/or 'Users' to the cache:

```ts title="Example of declaring cache tags"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, User } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  // highlight-start
  tagTypes: ['Post', 'User'],
  // highlight-end
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => '/posts',
    }),
    getUsers: build.query<User[], void>({
      query: () => '/users',
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => ({
        url: 'post',
        method: 'POST',
        body,
      }),
    }),
    editPost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: (body) => ({
        url: `post/${body.id}`,
        method: 'POST',
        body,
      }),
    }),
  }),
})
```

By declaring these tags as what can possibly be provided to the cache, it enables control for individual mutation endpoints to claim whether they affect specific portions of the cache or not, in conjunction with `providesTags` and `invalidatesTags` on individual endpoints.

### Providing cache data

Each individual `query` endpoint can have its cached data _provide_ particular tags. Doing so enables a relationship between cached data from one or more query endpoints and the behaviour of one or more mutation endpoints.

The `providesTags` property on a `query` endpoint is used for this purpose.

:::info

Provided tags have no inherent relationship across separate `query` endpoints. Provided tags are used to determine whether cached data returned by an endpoint should be `invalidated` and either be refetched or removed from the cache. If two separate endpoints provide the same tags, they will still contribute their own distinct cached data, which could later both be invalidated by a single tag declared from a mutation.

:::

The example below declares that the `getPosts` `query` endpoint `provides` the `'Post'` tag to the cache, using the `providesTags` property for a `query` endpoint.

```ts title="Example of providing tags to the cache"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, User } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => '/posts',
      // highlight-start
      providesTags: ['Post'],
      // highlight-end
    }),
    getUsers: build.query<User[], void>({
      query: () => '/users',
      // highlight-start
      providesTags: ['User'],
      // highlight-end
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
    }),
    editPost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: (body) => ({
        url: `post/${body.id}`,
        method: 'POST',
        body,
      }),
    }),
  }),
})
```

For more granular control over the provided data, provided `tags` can have an associated `id`. This enables a distinction between 'any of a particular tag type', and 'a specific instance of a particular tag type'.

The example below declares that the provided posts are associated with particular IDs as determined by the result returned by the endpoint:

```ts title="Example of providing tags with IDs to the cache"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, User } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => '/posts',
      // highlight-start
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), 'Post']
          : ['Post'],
      // highlight-end
    }),
    getUsers: build.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => ({
        url: 'post',
        method: 'POST',
        body,
      }),
    }),
    editPost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: (body) => ({
        url: `post/${body.id}`,
        method: 'POST',
        body,
      }),
    }),
  }),
})
```

Note that for the example above, the `id` is used where possible on a successful result. In the case of an error, no result is supplied, and we still consider that it has provided the general `'Post'` tag type rather than any specific instance of that tag.

:::tip Advanced List Invalidation
In order to provide stronger control over invalidating the appropriate data, you can use an arbitrary ID such a `'LIST'` for a given tag. See [Advanced Invalidation with abstract tag IDs](#advanced-invalidation-with-abstract-tag-ids) for additional details.
:::

### Invalidating cache data

Each individual mutation endpoint can `invalidate` particular tags for existing cached data. Doing so enables a relationship between cached data from one or more query endpoints and the behaviour of one or more mutation endpoints.

The `invalidatesTags` property on a mutation endpoint is used for this purpose.

The example below declares that the `addPost` and `editPost` mutation endpoints `invalidate` any cached data with the `'Post'` tag, using the `invalidatesTags` property for a mutation endpoint:

```ts title="Example of invalidating tags in the cache"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, User } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), 'Post']
          : ['Post'],
    }),
    getUsers: build.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => ({
        url: 'post',
        method: 'POST',
        body,
      }),
      // highlight-start
      invalidatesTags: ['Post'],
      // highlight-end
    }),
    editPost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: (body) => ({
        url: `post/${body.id}`,
        method: 'POST',
        body,
      }),
      // highlight-start
      invalidatesTags: ['Post'],
      // highlight-end
    }),
  }),
})
```

For the example above, this tells RTK Query that after the `addPost` and/or `editPost` mutations are called and completed, any cache data supplied with the `'Post'` tag is no longer valid. If a component is currently subscribed to the cached data for a `'Post'` tag after the above mutations are called and complete, it will automatically re-fetch in order to retrieve up to date data from the server.

An example scenario would be like so:

1. A component is rendered which is using the `useGetPostsQuery()` hook to subscribe to that endpoint's cached data
2. The `/posts` request is fired off, and server responds with posts with IDs 1, 2 & 3
3. The `getPosts` endpoint stores the received data in the cache, and internally registers that the following tags have been provided:
   <!-- prettier-ignore -->
   ```js
   [
     { type: 'Post', id: 1 },
     { type: 'Post', id: 2 },
     { type: 'Post', id: 3 },
   ]
   ```
4. The `editPost` mutation is fired off to alter a particular post
5. Upon completion, RTK Query internally registers that the `'Post'` tag is now invalidated, and removes the previously provided `'Post'` tags from the cache
6. Since the `getPosts` endpoint has provided tags of type `'Post'` which now has invalid cache data, and the component is still subscribed to the data, the `/posts` request is automatically fired off again, fetching new data and registering new tags for the updated cached data

For more granular control over the invalidated data, invalidated `tags` can have an associated `id` in the same manner as `providesTags`. This enables a distinction between 'any of a particular tag type' and 'a specific instance of a particular tag type'.

The example below declares that the `editPost` mutation invalidates a specific instance of a `Post` tag, using the ID passed in when calling the mutation function:

```ts title="Example of invalidating tags with IDs to the cache"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, User } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => '/posts',
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Post' as const, id })), 'Post']
          : ['Post'],
    }),
    getUsers: build.query<User[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => ({
        url: 'post',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: (body) => ({
        url: `post/${body.id}`,
        method: 'POST',
        body,
      }),
      // highlight-start
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
      // highlight-end
    }),
  }),
})
```

For the example above, rather than invalidating any tag with the type `'Post'`, calling the `editPost` mutation function will now only invalidate a tag for the provided `id`. I.e. if cached data from an endpoint does not provide a `'Post'` for that same `id`, it will remain considered as 'valid', and will not be triggered to automatically re-fetch.

:::tip Using abstract tag IDs
In order to provide stronger control over invalidating the appropriate data, you can use an arbitrary ID such a `'LIST'` for a given tag. See [Advanced Invalidation with abstract tag IDs](#advanced-invalidation-with-abstract-tag-ids) for additional details.
:::

## Tag Invalidation Behavior

The matrix below shows examples of which invalidated tags will affect and invalidate which provided tags:

<table className="checkbox-table">
  <thead>
    <tr>
      <th className="diagonal-cell">
        <div className="diagonal-cell--content">
          <div className="diagonal-cell--topRight">Provided</div>
          <div className="diagonal-cell--bottomLeft">Invalidated</div>
        </div>
      </th>
      <th>
        <div>General tag A</div>
        <div style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>
          {"['Post']"}
          <br />
          {'/'}
          <br />
          {"[{ type: 'Post' }]"}
        </div>
      </th>
      <th>
        <div>General tag B</div>
        <div style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>
          {"['User']"}
          <br />
          {'/'}
          <br />
          {"[{ type: 'User' }]"}
        </div>
      </th>
      <th>
        <div>Specific tag A1</div>
        <div style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>
          {"[{ type: 'Post',"}
          <br />
          {' id: 1 }]'}
        </div>
      </th>
      <th>
        <div>Specific tag A2</div>
        <div style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>
          {"[{ type: 'Post', id: 'LIST' }]"}
        </div>
      </th>
      <th>
        <div>Specific tag B1</div>
        <div style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>
          {"[{ type: 'User',"}
          <br />
          {' id: 1 }]'}
        </div>
      </th>
      <th>
        <div>Specific tag B2</div>
        <div style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>
          {"[{ type: 'User',"}
          <br />
          {' id: 2 }]'}
        </div>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div style={{ fontWeight: 'bold' }}>General tag A</div>
        <div style={{ fontSize: '0.9rem' }}>
          {"['Post'] / [{ type: 'Post' }]"}
        </div>
      </td>
      <td>✔️</td>
      <td></td>
      <td>✔️</td>
      <td>✔️</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>
        <div style={{ fontWeight: 'bold' }}>General tag B</div>
        <div style={{ fontSize: '0.9rem' }}>
          {"['User'] /"}
          <br />
          {"[{ type: 'User' }]"}
        </div>
      </td>
      <td></td>
      <td>✔️</td>
      <td></td>
      <td></td>
      <td>✔️</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td>
        <div style={{ fontWeight: 'bold' }}>Specific tag A1</div>
        <div style={{ fontSize: '0.9rem' }}>{"[{ type: 'Post', id: 1 }]"}</div>
      </td>
      <td></td>
      <td></td>
      <td>✔️</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>
        <div style={{ fontWeight: 'bold' }}>Specific tag A2</div>
        <div style={{ fontSize: '0.9rem' }}>
          {"[{ type: 'Post', id: 'LIST' }]"}
        </div>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td>✔️</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>
        <div style={{ fontWeight: 'bold' }}>Specific tag B1</div>
        <div style={{ fontSize: '0.9rem' }}>{"[{ type: 'User', id: 1 }]"}</div>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✔️</td>
      <td></td>
    </tr>
    <tr>
      <td>
        <div style={{ fontWeight: 'bold' }}>Specific tag B2</div>
        <div style={{ fontSize: '0.9rem' }}>{"[{ type: 'User', id: 2 }]"}</div>
      </td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>✔️</td>
    </tr>
  </tbody>
</table>

The invalidation behavior is summarized based on tag specificity in the sections below.

### General tag

e.g. `['Post'] / [{ type: 'Post' }]`

Will `invalidate` any `provided` tag with the matching type, including general and specific tags.

Example:  
If a general tag of `Post` was invalidated, endpoints whose data `provided` the following tags would all have their data invalidated:

- `['Post']`
- `[{ type: 'Post' }]`
- `[{ type: 'Post' }, { type: 'Post', id: 1 }]`
- `[{ type: 'Post', id: 1 }]`
- `[{ type: 'Post', id: 1 }, { type: 'User' }]`
- `[{ type: 'Post', id: 'LIST' }]`
- `[{ type: 'Post', id: 1 }, { type: 'Post', id: 'LIST' }]`

Endpoints whose data `provided` the following tags would _not_ have their data invalidated:

- `['User']`
- `[{ type: 'User' }]`
- `[{ type: 'User', id: 1 }]`
- `[{ type: 'User', id: 'LIST' }]`
- `[{ type: 'User', id: 1 }, { type: 'User', id: 'LIST' }]`

### Specific tag

e.g. `[{ type: 'Post', id: 1 }]`

Will `invalidate` any `provided` tag with both the matching type, _and_ matching id. Will not cause a `general` tag to be invalidated directly, but _might_ invalidate data for an endpoint that provides a `general` tag _if_ it also provides a matching `specific` tag.

Example 1:
If a specific tag of `{ type: 'Post', id: 1 }` was invalidated, endpoints whose data `provided` the following tags would all have their data invalidated:

- `[{ type: 'Post' }, { type: 'Post', id: 1 }]`
- `[{ type: 'Post', id: 1 }]`
- `[{ type: 'Post', id: 1 }, { type: 'User' }]`
- `[{ type: 'Post', id: 1 }, { type: 'Post', id: 'LIST' }]`

Endpoints whose data `provided` the following tags would _not_ have their data invalidated:

- `['Post']`
- `[{ type: 'Post' }]`
- `[{ type: 'Post', id: 'LIST' }]`
- `['User']`
- `[{ type: 'User' }]`
- `[{ type: 'User', id: 1 }]`
- `[{ type: 'User', id: 'LIST' }]`
- `[{ type: 'User', id: 1 }, { type: 'User', id: 'LIST' }]`

Example 2:
If a specific tag of `{ type: 'Post', id: 'LIST' }` was invalidated, endpoints whose data `provided` the following tags would all have their data invalidated:

- `[{ type: 'Post', id: 'LIST' }]`
- `[{ type: 'Post', id: 1 }, { type: 'Post', id: 'LIST' }]`

Endpoints whose data `provided` the following tags would _not_ have their data invalidated:

- `['Post']`
- `[{ type: 'Post' }]`
- `[{ type: 'Post' }, { type: 'Post', id: 1 }]`
- `[{ type: 'Post', id: 1 }]`
- `[{ type: 'Post', id: 1 }, { type: 'User' }]`
- `['User']`
- `[{ type: 'User' }]`
- `[{ type: 'User', id: 1 }]`
- `[{ type: 'User', id: 'LIST' }]`
- `[{ type: 'User', id: 1 }, { type: 'User', id: 'LIST' }]`

## Recipes

### Advanced Invalidation with abstract tag IDs

While using an 'entity ID' for a tag `id` is a common use case, the `id` property is not intended to be limited to database IDs alone. The `id` is simply a way to label a subset of a particular collection of data for a particular `tag type`.

A powerful use-case is to use an ID like `'LIST'` as a label for data provided by a bulk query, _as well as_ using entity IDs for the individual items. Doing so allows future `mutations` to declare whether they invalidate the data only if it contains a particular item (e.g. `{ type: 'Post', id: 5 }`), or invalidate the data if it is a `'LIST'` (e.g. `{ type: 'Post', id: 'LIST' }`).

:::info 'LIST' Tag and IDs

1. `LIST` is an arbitrary string - technically speaking, you could use anything you want here, such as `ALL` or `*`. The important thing when choosing a custom id is to make sure there is no possibility of it colliding with an id that is returned by a query result. If you have unknown ids in your query results and don't want to risk it, you can go with point 3 below.
2. You can add _many_ tag types for even more control
   - `[{ type: 'Posts', id: 'LIST' }, { type: 'Posts', id: 'SVELTE_POSTS' }, { type: 'Posts', id: 'REACT_POSTS' }]`
3. If the concept of using an `id` like 'LIST' seems strange to you, you can always add another `tagType` and invalidate its root, but we recommend using the `id` approach as shown.

:::

We can compare the scenarios below to see how using a `'LIST'` id can be leveraged to optimize behaviour.

#### Invalidating everything of a type

```ts title="API Definition"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post, User } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Posts', id })) : ['Posts'],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `post`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
})

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation } = api
```

```tsx title="App.tsx"
function App() {
  const { data: posts } = useGetPostsQuery()
  const [addPost] = useAddPostMutation()

  return (
    <div>
      <AddPost onAdd={addPost} />
      <PostsList />
      {/* Assume each PostDetail is subscribed via `const {data} = useGetPostQuery(id)` */}
      <PostDetail id={1} />
      <PostDetail id={2} />
      <PostDetail id={3} />
    </div>
  )
}
```

**What to expect**

When `addPost` is triggered, it would cause each `PostDetail` component to go back into a `isFetching` state because `addPost` invalidates the root tag, which causes _every query_ that provides 'Posts' to be re-run. In most cases, this may not be what you want to do. Imagine if you had 100 posts on the screen that all subscribed to a `getPost` query – in this case, you'd create 100 requests and send a ton of unnecessary traffic to your server, which we're trying to avoid in the first place! Even though the user would still see the last good cached result and potentially not notice anything other than their browser hiccuping, you still want to avoid this.

#### Selectively invalidating lists

```ts title="API Definition"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post, User } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query(body) {
        return {
          url: `post`,
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
})

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery } = api
```

```tsx title="App.tsx"
function App() {
  const { data: posts } = useGetPostsQuery()
  const [addPost] = useAddPostMutation()

  return (
    <div>
      <AddPost onAdd={addPost} />
      <PostsList />
      {/* Assume each PostDetail is subscribed via `const {data} = useGetPostQuery(id)` */}
      <PostDetail id={1} />
      <PostDetail id={2} />
      <PostDetail id={3} />
    </div>
  )
}
```

**What to expect**

When `addPost` is fired, it will only cause the `PostsList` to go into an `isFetching` state because `addPost` only invalidates the `'LIST'` id, which causes `getPosts` to rerun (because it provides that specific id). So in your network tab, you would only see 1 new request fire for `GET /posts`. As the singular `getPost` queries have not been invalidated, they will not re-run as a result of `addPost`.

:::info

If you intend for the `addPost` mutation to refresh all posts including individual `PostDetail` components while still only making 1 new `GET /posts` request, this can be done by selecting a part of the data using [`selectFromResult`](./queries.mdx#selecting-data-from-a-query-result).

:::

### Providing errors to the cache

The information provided to the cache is not limited to successful data fetches. The concept can be used to inform RTK Query that when a particular failure has been encountered, to `provide` a specific `tag` for that failed cache data. A separate endpoint can then `invalidate` the data for that `tag`, telling RTK Query to re-attempt the previously failed endpoints if a component is still subscribed to the failed data.

The example below demonstrates an example with the following behaviour:

- Provides an `UNAUTHORIZED` cache tag if a query fails with an error code of `401 UNAUTHORIZED`
- Provides an `UNKNOWN_ERROR` cache tag if a query fails with a different error
- Enables a 'login' mutation, which when _successful_, will `invalidate` the data with the `UNAUTHORIZED` tag.  
  This will trigger the `postById` endpoint to re-fire if:
  1. The last call for `postById` had encountered an unauthorized error, and
  2. A component is still subscribed to the cached data
- Enables a 'refetchErroredQueries' mutation which when _called_, will `invalidate` the data with the `UNKNOWN_ERROR` tag.  
  This will trigger the `postById` endpoint to re-fire if:
  1. The last call for `postById` had encountered an unknown error, and
  2. A component is still subscribed to the cached data

```ts
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}
export interface LoginResponse {}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, LoginResponse } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://example.com' }),
  tagTypes: ['Post', 'UNAUTHORIZED', 'UNKNOWN_ERROR'],
  endpoints: (build) => ({
    postById: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) =>
        result
          ? [{ type: 'Post', id }]
          : error?.status === 401
          ? ['UNAUTHORIZED']
          : ['UNKNOWN_ERROR'],
    }),
    login: build.mutation<LoginResponse, void>({
      query: () => '/login',
      // on successful login, will refetch all currently
      // 'UNAUTHORIZED' queries
      invalidatesTags: (result) => (result ? ['UNAUTHORIZED'] : []),
    }),
    refetchErroredQueries: build.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ['UNKNOWN_ERROR'],
    }),
  }),
})
```

### Abstracting common provides/invalidates usage

The code written to `provide` & `invalidate` tags for a given API slice will be dependent on multiple factors, including:

- The shape of the data returned by your backend
- Which tags you expect a given query endpoint to provide
- Which tags you expect a given mutation endpoint to invalidate
- The extent that you wish to use the invalidation feature for

When declaring your API slice, you may feel as though you're duplicating your code. For instance, for two separate endpoints that both provide a list of a particular entity, the `providesTags` declaration may only differ in the `tagType` provided.

e.g.

```ts
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, User } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://example.com' }),
  tagTypes: ['Post', 'User'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => `posts`,
      // highlight-start
      providesTags: (result) =>
        result
          ? [
              { type: 'Post', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Post' as const, id })),
            ]
          : [{ type: 'Post', id: 'LIST' }],
      // highlight-end
    }),
    getUsers: build.query<User[], void>({
      query: () => `users`,
      // highlight-start
      providesTags: (result) =>
        result
          ? [
              { type: 'User', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
            ]
          : [{ type: 'User', id: 'LIST' }],
      // highlight-end
    }),
  }),
})
```

You may find it beneficial to define helper functions designed for your particular api to reduce this boilerplate across endpoint definitions, e.g.

```ts
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, User } from './types'

// highlight-start
function providesList<R extends { id: string | number }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: 'LIST' }]
}
// highlight-end

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://example.com' }),
  tagTypes: ['Post', 'User'],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => `posts`,
      // highlight-start
      providesTags: (result) => providesList(result, 'Post'),
      // highlight-end
    }),
    getUsers: build.query({
      query: () => `users`,
      // highlight-start
      providesTags: (result) => providesList(result, 'User'),
      // highlight-end
    }),
  }),
})
```

An example of various abstractions for tag providing/invalidating designed for common rest data formats can be seen in the following gist, including typescript support, and factoring both ['LIST' style advanced tag invalidation](#advanced-invalidation-with-abstract-tag-ids) and ['error' style tag invalidation](#providing-errors-to-the-cache): **[RTK Query cache utils](https://gist.github.com/Shrugsy/6b6af02aef1f783df9d636526c1e05fa)**.

# Manual Cache Updates

## Overview

For most cases, in order to receive up to date data after a triggering a change in the backend,
you can take advantage of `cache tag invalidation` to perform
[automated re-fetching](./automated-refetching), which will cause a query to re-fetch its data
when it has been told that a mutation has occurred which would cause its data to become out of date.
In most cases, we recommend using `automated re-fetching` as a preference over `manual cache updates`,
unless you encounter the need to do so.

However, in some cases, you may want to update the cache manually. When you wish to update cache
data that _already exists_ for query endpoints, you can do so using the
[`updateQueryData`](../api/created-api/api-slice-utils.mdx#updatequerydata) thunk action
available on the `util` object of your created API.

Anywhere you have access to the `dispatch` method for the store instance, you can dispatch the
result of calling `updateQueryData` in order to update the cache data for a query endpoint,
if the corresponding cache entry exists.

Use cases for manual cache updates include:

- Providing immediate feedback to the user when a mutation is attempted
- After a mutation, updating a single item in a large list of items that is already cached,
  rather than re-fetching the whole list
- Debouncing a large number of mutations with immediate feedback as though they are being
  applied, followed by a single request sent to the server to update the debounced attempts

:::note
`updateQueryData` is strictly intended to perform _updates_ to existing cache entries,
not create new entries. If an `updateQueryData` thunk action is dispatched that corresponds to
no existing cache entry for the provided `endpointName` + `args` combination, the provided `recipe`
will not be called, and no `patches` or `inversePatches` will be returned.
:::

## Recipes

### Optimistic Updates

When you wish to perform an update to cache data immediately after a [`mutation`](./mutations) is
triggered, you can apply an `optimistic update`. This can be a useful pattern for when you want to
give the user the impression that their changes are immediate, even while the mutation request is
still in flight.

The core concepts for an optimistic update are:

- when you start a query or mutation, `onQueryStarted` will be executed
- you manually update the cached data by dispatching `api.util.updateQueryData` within `onQueryStarted`
- then, in the case that `queryFulfilled` rejects:
  - you roll it back via the `.undo` property of the object you got back from the earlier dispatch,  
    OR
  - you invalidate the cache data via `api.util.invalidateTags` to trigger a full re-fetch of the data

:::tip
Where many mutations are potentially triggered in short succession causing overlapping requests,
you may encounter race conditions if attempting to roll back patches using the `.undo` property
on failures. For these scenarios, it is often simplest and safest to invalidate the tags on error
instead, and re-fetch truly up-to-date data from the server.
:::

```ts title="Optimistic update mutation example (async await)"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: ['Post'],
    }),
    updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // highlight-start
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getPost', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      },
      // highlight-end
    }),
  }),
})
```

or, if you prefer the slightly shorter version with `.catch`

```diff
-      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
+      onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getPost', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
-       try {
-         await queryFulfilled
-       } catch {
-         patchResult.undo()
-       }
+       queryFulfilled.catch(patchResult.undo)
      }
```

#### Example

[React Optimistic Updates](./examples#react-optimistic-updates)

### Pessimistic Updates

When you wish to perform an update to cache data based on the response received from the server
after a [`mutation`](./mutations) is triggered, you can apply a `pessimistic update`.
The distinction between a `pessimistic update` and an `optimistic update` is that the
`pessimistic update` will instead wait for the response from the server prior to updating
the cached data.

The core concepts for a pessimistic update are:

- when you start a query or mutation, `onQueryStarted` will be executed
- you await `queryFulfilled` to resolve to an object containing the transformed response from the
  server in the `data` property
- you manually update the cached data by dispatching `api.util.updateQueryData` within
  `onQueryStarted`, using the data in the response from the server for your draft updates

```ts title="Pessimistic update mutation example (async await)"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: ['Post'],
    }),
    updatePost: build.mutation<Post, Pick<Post, 'id'> & Partial<Post>>({
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // highlight-start
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled
          const patchResult = dispatch(
            api.util.updateQueryData('getPost', id, (draft) => {
              Object.assign(draft, updatedPost)
            })
          )
        } catch {}
      },
      // highlight-end
    }),
  }),
})
```

### General Updates

If you find yourself wanting to update cache data elsewhere in your application, you can do so
anywhere you have access to the `store.dispatch` method, including within React components via
the [useDispatch](https://react-redux.js.org/api/hooks#usedispatch) hook (or a typed version such
as [useAppDispatch](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks)
for typescript users).

:::info
You should generally avoid manually updating the cache outside of the `onQueryStarted`
callback for a mutation without a good reason, as RTK Query is intended to be used by considering
your cached data as a reflection of the server-side state.
:::

```tsx title="General manual cache update example"
import { api } from './api'
import { useAppDispatch } from './store/hooks'

function App() {
  const dispatch = useAppDispatch()

  function handleClick() {
    /**
     * This will update the cache data for the query corresponding to the `getPosts` endpoint,
     * when that endpoint is used with no argument (undefined).
     */
    const patchCollection = dispatch(
      api.util.updateQueryData('getPosts', undefined, (draftPosts) => {
        draftPosts.push({ id: 1, name: 'Teddy' })
      })
    )
  }

  return <button onClick={handleClick}>Add post to cache</button>
}
```

# Conditional Fetching

## Overview

Query hooks automatically begin fetching data as soon as the component is mounted. But, there are use cases where you may want to delay fetching data until some condition becomes true. RTK Query supports conditional fetching to enable that behavior.

If you want to prevent a query from automatically running, you can use the `skip` parameter in a hook.

[examples](docblock://query/react/buildHooks.ts?token=UseQuerySubscriptionOptions.skip)

[remarks](docblock://query/react/buildHooks.ts?token=UseQuerySubscriptionOptions.skip)

:::tip
Typescript users may wish to use [`skipToken`](../api/created-api/hooks.mdx#skiptoken) as an alternative to the `skip` option in order to skip running a query, while still keeping types for the endpoint accurate.
:::

## Conditional Fetching Example

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/conditional-fetching?fontsize=12&runonclick=1&hidenavigation=1&module=%2Fsrc%2FPokemon.tsx&moduleview=1&theme=dark"
  style={{
    width: '100%',
    height: '600px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="Conditional Fetching Example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

# Error Handling

## Overview

If your query or mutation happens to throw an error when using [fetchBaseQuery](../api/fetchBaseQuery), it will be returned in the `error` property of the respective hook. The component will re-render when that occurs, and you can show appropriate UI based on the error data if desired.

### Error Display Examples

```tsx title="Query Error"
function PostsList() {
  const { data, error } = useGetPostsQuery()

  return (
    <div>
      {error.status} {JSON.stringify(error.data)}
    </div>
  )
}
```

```tsx title="Mutation Error"
function AddPost() {
  const [addPost, { error }] = useAddPostMutation()

  return (
    <div>
      {error.status} {JSON.stringify(error.data)}
    </div>
  )
}
```

:::tip
If you need to access the error or success payload immediately after a mutation, you can chain `.unwrap()`.

```ts title="Using .unwrap" no-transpile
addPost({ id: 1, name: 'Example' })
  .unwrap()
  .then((payload) => console.log('fulfilled', payload))
  .catch((error) => console.error('rejected', error))
```

:::

```tsx title="Manually selecting an error"
function PostsList() {
  const { error } = useSelector(api.endpoints.getPosts.select())

  return (
    <div>
      {error.status} {JSON.stringify(error.data)}
    </div>
  )
}
```

## Errors with a custom `baseQuery`

Whether a response is returned as `data` or `error` is dictated by the `baseQuery` provided.

Ultimately, you can choose whatever library you prefer to use with your `baseQuery`, but it's important that you return the correct response format. If you haven't tried [`fetchBaseQuery`](../api/fetchBaseQuery) yet, give it a chance! Otherwise, see [Customizing Queries](./customizing-queries) for information on how to alter the returned errors.

## Handling errors at a macro level

There are quite a few ways that you can manage your errors, and in some cases, you may want to show a generic toast notification for any async error. Being that RTK Query is built on top of Redux and Redux-Toolkit, you can easily add a middleware to your store for this purpose.

:::tip

Redux Toolkit has [action matching utilities](../../api/matching-utilities.mdx#matching-utilities) that we can leverage for additional custom behaviors.

:::

```ts title="Error catching middleware example"
import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit'
import { toast } from 'your-cool-library'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (
  next
) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!')
    toast.warn({ title: 'Async error!', message: action.error.data.message })
  }

  return next(action)
}
```

# Pagination

RTK Query does not include any built-in pagination behavior. However, RTK Query does make it straightforward to integrate with a standard index-based pagination API. This is the most common form of pagination that you'll need to implement.

## Pagination Recipes

### Setup an endpoint to accept a page `arg`

```ts title="src/app/services/posts.ts"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Post {
  id: number
  name: string
}
interface ListResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    listPosts: builder.query<ListResponse<Post>, number | void>({
      query: (page = 1) => `posts?page=${page}`,
    }),
  }),
})

export const { useListPostsQuery } = api
```

### Trigger the next page by incrementing the `page` state variable

```tsx title="src/features/posts/PostsManager.tsx"
const PostList = () => {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, isFetching } = useListPostsQuery(page);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!posts?.data) {
    return <div>No posts :(</div>;
  }

  return (
    <div>
        {posts.data.map(({ id, title, status }) => (
          <div key={id}>{title} - {status}</div>
        ))}
        <button onClick={() => setPage(page - 1)} isLoading={isFetching}>
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          isLoading={isFetching}
        >
         Next
        </button>
    </div>
  );
};
```

### Automated Re-fetching of Paginated Queries

It is a common use-case to utilize tag invalidation to perform
[automated re-fetching](./automated-refetching.mdx) with RTK Query.

A potential pitfall when combining this with pagination is that your paginated query may only
provide a _partial_ list at any given time, and hence not `provide` tags for entity IDs that
fall on pages which aren't currently shown. If a specific entity is deleted that falls on an
earlier page, the paginated query will not be providing a tag for that specific ID, and will
not be invalidated to trigger re-fetching data. As a result, items on the current page that
should shift one item up will not have done so, and the total count of items and/or pages
may be incorrect.

A strategy to overcome this is to ensure that the `delete` mutation always `invalidates` the
paginated query, even if the deleted item is not _currently_ provided on that page. We can
leverage the concept of
[advanced invalidation with abstract tag ids](./automated-refetching.mdx#advanced-invalidation-with-abstract-tag-ids)
to do this by `providing` a `'Posts'` tag with the `'PARTIAL-LIST'` ID in our paginated query,
and `invalidating` that corresponding tag for any mutation that should affect it.

```ts title="Example of invalidating cache for paginated queries"
// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Post {
  id: number
  name: string
}
interface ListResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}

export const postApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    listPosts: build.query<ListResponse<Post>, number | void>({
      query: (page = 1) => `posts?page=${page}`,
      // highlight-start
      providesTags: (result, error, page) =>
        result
          ? [
              // Provides a tag for each post in the current page,
              // as well as the 'PARTIAL-LIST' tag.
              ...result.data.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
      // highlight-end
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `post/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates the tag for this Post `id`, as well as the `PARTIAL-LIST` tag,
      // causing the `listPosts` query to re-fetch if a component is subscribed to the query.
      // highlight-start
      invalidatesTags: (result, error, id) => [
        { type: 'Posts', id },
        { type: 'Posts', id: 'PARTIAL-LIST' },
      ],
      // highlight-end
    }),
  }),
})
```
## General Pagination Example

In the following example, you'll see `Loading` on the initial query, but then as you move forward we'll use the next/previous buttons as a _fetching_ indicator while any non-cached query is performed. When you go back, the cached data will be served instantaneously.

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/pagination?fontsize=12&runonclick=1&hidenavigation=1&theme=dark"
  style={{
    width: '100%',
    height: '600px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="RTK Query Pagination Example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

# Prefetching

The goal of prefetching is to make data fetch _before_ the user navigates to a page or attempts to load some known content.

There are a handful of situations that you may want to do this, but some very common use cases are:

1. User hovers over a navigation element
2. User hovers over a list element that is a link
3. User hovers over a next pagination button
4. User navigates to a page and you know that some components down the tree will require said data. This way, you can prevent fetching waterfalls.

## Prefetching with React Hooks

Similar to the [`useMutation`](./mutations) hook, the `usePrefetch` hook will not run automatically — it returns a "trigger function" that can be used to initiate the behavior.

It accepts two arguments: the first is the key of a query action that you [defined in your API service](../api/createApi#endpoints), and the second is an object of two optional parameters:

```ts title="usePrefetch Signature" no-transpile
export type PrefetchOptions =
  | { force?: boolean }
  | {
      ifOlderThan?: false | number;
    };

usePrefetch<EndpointName extends QueryKeys<Definitions>>(
    endpointName: EndpointName,
    options?: PrefetchOptions
  ): (arg: QueryArgFrom<Definitions[EndpointName]>, options?: PrefetchOptions) => void;
```

### Customizing the Hook Behavior

You can specify these prefetch options when declaring the hook or at the call site. The call site will take priority over the defaults.

1. [summary](docblock://query/core/module.ts?token=PrefetchOptions)
2. [overloadSummary](docblock://query/core/module.ts?token=PrefetchOptions)

### Trigger Function Behavior

1. The trigger function _always_ returns `void`.
2. If `force: true` is set during the declaration or at the call site, the query will be run no matter what. The one exception to that is if the same query is already in-flight.
3. If no options are specified and the query exists in the cache, the query will not be performed.
4. If no options are specified and the query _does not exist_ in the cache, the query will be performed.
   - **Assuming** you have a `useQuery` hook in the tree that is subscribed to the same query that you are prefetching:
     - `useQuery` will return `{isLoading: true, isFetching: true, ...rest`}
5. If `ifOlderThan` is specified but evaluates to false and the query is in the cache, the query will not be performed.
6. If `ifOlderThan` is specified and evaluates to true, the query will be performed even if there is an existing cache entry.
   - **Assuming** you have a `useQuery` hook in the tree that is subscribed to the same query that you are prefetching:
     - `useQuery` will return `{isLoading: false, isFetching: true, ...rest`}

```tsx title="usePrefetch Example"
function User() {
  const prefetchUser = usePrefetch('getUser')

  // Low priority hover will not fire unless the last request happened more than 35s ago
  // High priority hover will _always_ fire
  return (
    <div>
      <button onMouseEnter={() => prefetchUser(4, { ifOlderThan: 35 })}>
        Low priority
      </button>
      <button onMouseEnter={() => prefetchUser(4, { force: true })}>
        High priority
      </button>
    </div>
  )
}
```

### Recipe: Prefetch Immediately

In some cases, you may want to prefetch a resource immediately. You can implement this in just a few lines of code:

```ts title="hooks/usePrefetchImmediately.ts" no-transpile
type EndpointNames = keyof typeof api.endpoints

export function usePrefetchImmediately<T extends EndpointNames>(
  endpoint: T,
  arg: Parameters<typeof api.endpoints[T]['initiate']>[0],
  options: PrefetchOptions = {}
) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(api.util.prefetch(endpoint, arg as any, options))
  }, [])
}

// In a component
usePrefetchImmediately('getUser', 5)
```

## Prefetching Without Hooks

If you're not using the `usePrefetch` hook, you can recreate the same behavior on your own in any framework.

When dispatching the `prefetch` thunk as shown below you will see the same exact behavior as [described here](#trigger-function-behavior).

```ts title="Non-hook prefetching example" no-transpile
store.dispatch(
  api.util.prefetch(endpointName, arg, { force: false, ifOlderThan: 10 })
)
```

You can also dispatch the query action, but you would be responsible for implementing any additional logic.

```ts title="Alternate method of manual prefetching" no-transpile
dispatch(api.endpoints[endpointName].initiate(arg, { forceRefetch: true }))
```

## Prefetching Examples

### Basic Prefetching

This is a very basic example that shows how you can prefetch when a user hovers over the next arrow. This is probably not the optimal solution, because if they hover, click, then change pages without moving their mouse, we wouldn't know to prefetch the next page because we wouldn't see the next `onMouseEnter` event. In this case, you would need to handle this on your own. You could also consider automatically prefetching the next page...

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/prefetching?fontsize=12&runonclick=1&hidenavigation=1&theme=dark"
  style={{
    width: '100%',
    height: '600px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="RTK Query - Prefetching Example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### Automatic Prefetching

Picking up on our last example, we automatically `prefetch` the next page, giving the appearance of no network delay.

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/prefetching-automatic?fontsize=12&runonclick=1&hidenavigation=1&theme=dark"
  style={{
    width: '100%',
    height: '600px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="RTK Query - Automatic Prefetching Example (on hover)"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

### Prefetching All Known Pages

After the first query initialized by `useQuery` runs, we automatically fetch all remaining pages.

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/prefetching-automatic-waterfall?fontsize=12&runonclick=1&hidenavigation=1&theme=dark&module=%2Fsrc%2Ffeatures%2Fposts%2FPostsManager.tsx"
  style={{
    width: '100%',
    height: '600px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="RTK Query - Automatic Prefetching Waterfall Example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

# Polling

## Polling Overview

Polling gives you the ability to have a 'real-time' effect by causing a query to run at a specified interval. To enable polling for a query, pass a `pollingInterval` to the `useQuery` hook or action creator with an interval in milliseconds:

```tsx title="src/Pokemon.tsx" no-transpile
import * as React from 'react'
import { useGetPokemonByNameQuery } from './services/pokemon'

export const Pokemon = ({ name }: { name: string }) => {
  // Automatically refetch every 3s
  const { data, status, error, refetch } = useGetPokemonByNameQuery(name, {
    pollingInterval: 3000,
  })

  return <div>{data}</div>
}
```

In an action creator without React Hooks:

```ts no-transpile
const { data, status, error, refetch } = store.dispatch(
  endpoints.getCountById.initiate(id, {
    subscriptionOptions: { pollingInterval: 3000 },
  })
)
```

## Polling Without React Hooks

If you use polling without the convenience of React Hooks, you will need to manually call `updateSubscriptionOptions` on the promise ref to update the interval. This approach varies by framework but is possible everywhere. See the [Svelte Example](./examples#svelte) for one possibility, and the [Usage Without React Hooks](./usage-without-react-hooks.mdx) page for more details on working with subscriptions manually.

```ts no-transpile
queryRef.updateSubscriptionOptions({ pollingInterval: 0 })
```

## Polling Example

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/polling?fontsize=12&runonclick=1&hidenavigation=1&theme=dark"
  style={{
    width: '100%',
    height: '600px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="rtk-query-react-hooks-example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

# Streaming Updates

## Overview

RTK Query gives you the ability to receive **streaming updates** for persistent queries. This enables a query to establish an ongoing connection to the server (typically using WebSockets), and apply updates to the cached data as additional information is received from the server.

Streaming updates can be used to enable the API to receive real-time updates to the back-end data, such as new entries being created, or important properties being updated.

To enable streaming updates for a query, pass the asynchronous `onCacheEntryAdded` function to the query, including the logic for how to update the query when streamed data is received. See [`onCacheEntryAdded` API reference](../api/createApi#oncacheentryadded) for more details.

## When to use streaming updates

Primarily updates to query data should be done via [`polling`](./polling) intermittently on an interval, using [`cache invalidation`](./automated-refetching#advanced-invalidation-with-abstract-tag-ids) to invalidate data based on tags associated with queries & mutations, or with [`refetchOnMountOrArgChange`](../api/createApi#refetchonmountorargchange) to fetch fresh data when a component using the data mounts.

However, streaming updates is particularly useful for scenarios involving:

- _Small, frequent changes to large objects_. Rather than repeatedly polling for a large object, the object can be fetched with an initial query, and streaming updates can update individual properties as updates are received.
- _External event-driven updates_. Where data may be changed by the server or otherwise external users and where real-time updates are expected to be shown to an active user, polling alone would result in periods of stale data in between queries, causing state to easily get out of sync. Streaming updates can update all active clients as the updates occur rather than waiting for the next interval to elapse.

Example use cases that benefit from streaming updates are:

- GraphQL subscriptions
- Real-time chat applications
- Real-time multiplayer games
- Collaborative document editing with multiple concurrent users

## Using the `onCacheEntryAdded` Lifecycle

The `onCacheEntryAdded` lifecycle callback lets you write arbitrary async logic that will be executed after a new cache entry is added to the RTK Query cache (ie, after a component has created a new subscription to a given endpoint+params combination).

`onCacheEntryAdded` will be called with two arguments: the `arg` that was passed to the subscription, and an options object containing "lifecycle promises" and utility functions. You can use these to write sequenced logic that waits for data to be added, initiates server connections, applies partial updates, and cleans up the connection when the query subscription is removed.

Typically, you will `await cacheDataLoaded` to determine when the first data has been fetched, then use the `updateCacheData` utility to apply streaming updates as messages are received. `updateCacheData` is an Immer-powered callback that receives a `draft` of the current cache value. You may "mutate" the draft value to update it as needed based on the received values. RTK Query will then dispatch an action that applies a diffed patch based on those changes.

Finally, you can `await cacheEntryRemoved` to know when to clean up any server connections.

## Streaming Update Examples

### Websocket Chat API

```ts
// file: schemaValidators.ts noEmit
import type { Message } from './api'

export function isMessage(message: unknown): message is Message {
  // in real code this would check `message` to ensure it is a `Message`
  return true
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { isMessage } from './schemaValidators'

export type Channel = 'redux' | 'general'

export interface Message {
  id: number
  channel: Channel
  userName: string
  text: string
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getMessages: build.query<Message[], Channel>({
      query: (channel) => `messages/${channel}`,
      // highlight-start
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create a websocket connection when the cache subscription starts
        const ws = new WebSocket('ws://localhost:8080')
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data)
            if (!isMessage(data) || data.channel !== arg) return

            updateCachedData((draft) => {
              draft.push(data)
            })
          }

          ws.addEventListener('message', listener)
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        ws.close()
      },
      // highlight-end
    }),
  }),
})

export const { useGetMessagesQuery } = api
```

#### What to expect

When the `getMessages` query is triggered (e.g. via a component mounting with the `useGetMessagesQuery()` hook), a `cache entry` will be added based on the serialized arguments for the endpoint. The associated query will be fired off based on the `query` property to fetch the initial data for the cache. Meanwhile, the asynchronous `onCacheEntryAdded` callback will begin, and create a new WebSocket connection. Once the response for the initial query is received, the cache will be populated with the response data, and the `cacheDataLoaded` promise will resolve. After awaiting the `cacheDataLoaded` promise, the `message` event listener will be added to the WebSocket connection, which updates the cache data when an associated message is received.

When there are no more active subscriptions to the data (e.g. when the subscribed components remain unmounted for a sufficient amount of time), the `cacheEntryRemoved` promise will resolve, allowing the remaining code to run and close the websocket connection. RTK Query will also remove the associated data from the cache.

If a query for the corresponding cache entry runs later, it will overwrite the whole cache entry, and the streaming update listeners will continue to work on the updated data.

### Websocket Chat API with a transformed response shape

```ts
// file: schemaValidators.ts noEmit
import type { Message } from './api'

export function isMessage(message: unknown): message is Message {
  // in real code this would check `message` to ensure it is a `Message`

  return true
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { isMessage } from './schemaValidators'

export type Channel = 'redux' | 'general'

export interface Message {
  id: number
  channel: Channel
  userName: string
  text: string
}

// highlight-start
const messagesAdapter = createEntityAdapter<Message>()
// highlight-end
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    // highlight-start
    getMessages: build.query<EntityState<Message>, Channel>({
      // highlight-end
      query: (channel) => `messages/${channel}`,
      // highlight-start
      transformResponse(response: Message[]) {
        return messagesAdapter.addMany(
          messagesAdapter.getInitialState(),
          response
        )
      },
      // highlight-end
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket('ws://localhost:8080')
        try {
          await cacheDataLoaded

          const listener = (event: MessageEvent) => {
            const data = JSON.parse(event.data)
            if (!isMessage(data) || data.channel !== arg) return

            updateCachedData((draft) => {
              // highlight-start
              messagesAdapter.upsertOne(draft, data)
              // highlight-end
            })
          }

          ws.addEventListener('message', listener)
        } catch {}
        await cacheEntryRemoved
        ws.close()
      },
    }),
  }),
})

export const { useGetMessagesQuery } = api
```

This example demonstrates how the [previous example](#websocket-chat-api) can be altered to allow for transforming the response shape when adding data to the cache.

For example, the data is transformed from this shape:

```ts no-transpile
[
  {
    id: 0
    channel: 'redux'
    userName: 'Mark'
    text: 'Welcome to #redux!'
  },
  {
    id: 1
    channel: 'redux'
    userName: 'Lenz'
    text: 'Glad to be here!'
  },
]
```

To this:

```ts no-transpile
{
  // The unique IDs of each item. Must be strings or numbers
  ids: [0, 1],
  // A lookup table mapping entity IDs to the corresponding entity objects
  entities: {
    0: {
      id: 0,
      channel: "redux",
      userName: "Mark",
      text: "Welcome to #redux!",
    },
    1: {
      id: 1,
      channel: "redux",
      userName: "Lenz",
      text: "Glad to be here!",
    },
  },
};
```

A key point to keep in mind is that updates to the cached data within the `onCacheEntryAdded` callback must respect the transformed data shape which will be present for the cached data. The example shows how [`createEntityAdapter`](../../api/createEntityAdapter) can be used for the initial `transformResponse`, and again when streamed updates are received to upsert received items into the cached data, while maintaining the normalized state structure.

# Code Splitting

RTK Query makes it possible to trim down your initial bundle size by allowing you to inject additional endpoints after you've set up your initial service definition. This can be very beneficial for larger applications that may have _many_ endpoints.

`injectEndpoints` accepts a collection of endpoints, as well as an optional `overrideExisting` parameter.

Calling `injectEndpoints` will inject the endpoints into the original API, but also give you that same API with correct types for these endpoints back. (Unfortunately, it cannot modify the types for the original definition.)

A typical approach would be to have one empty central API slice definition:

```ts title="Basic setup"
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
})
```

and then inject the api endpoints in other files and export them from there - that way you will be sure to always import the endpoints in a way that they are definitely injected.

```ts title="Injecting & exporting additional endpoints"
// file: emptySplitApi.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
})

// file: extendedApi.ts
import { emptySplitApi } from './emptySplitApi'

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    example: build.query({
      query: () => 'test',
    }),
  }),
  overrideExisting: false,
})

export const { useExampleQuery } = extendedApi
```

:::tip
You will get a warning if you inject an endpoint that already exists in development mode when you don't explicitly specify `overrideExisting: true`. You **will not see this in production** and the existing endpoint will just be overriden, so make sure to account for this in your tests.
:::

# Code Generation

RTK Query's API and architecture is oriented around declaring API endpoints up front. This lends itself well to automatically generating API slice definitions from external API schema definitions, such as OpenAPI and GraphQL.

We have early previews of code generation capabilities available as separate tools.

## GraphQL

We provide a [Plugin for GraphQL Codegen](https://www.graphql-code-generator.com/docs/plugins/typescript-rtk-query). You can find the documentation to that on the graphql-codegen homepage.

For a full example on how to use it, you can see [this example project](https://github.com/reduxjs/redux-toolkit/tree/master/examples/query/react/graphql-codegen).

## OpenAPI

We provide a package for RTK Query code generation from OpenAPI schemas. It is published as `@rtk-query/codegen-openapi` and you can find the source code at [`packages/rtk-query-codegen-openapi`](https://github.com/reduxjs/redux-toolkit/tree/master/packages/rtk-query-codegen-openapi).

### Usage

Create an empty api using `createApi` like

```ts no-transpile title="src/store/emptyApi.ts"
// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
})
```

Generate a config file (json, js or ts) with contents like

```ts no-transpile title="openapi-config.ts"
import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://petstore3.swagger.io/api/v3/openapi.json',
  apiFile: './src/store/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/store/petApi.ts',
  exportName: 'petApi',
  hooks: true,
}

export default config
```

and then call the code generator:

```bash
npx @rtk-query/codegen-openapi openapi-config.ts
```

### Programmatic usage

```ts no-transpile title="src/store/petApi.ts"
import { generateEndpoints } from '@rtk-query/codegen-openapi'

const api = await generateEndpoints({
  apiFile: './fixtures/emptyApi.ts',
  schemaFile: resolve(__dirname, 'fixtures/petstore.json'),
  filterEndpoints: ['getPetById', 'addPet'],
  hooks: true,
})
```

### Config file options

#### Simple usage

```ts no-transpile
interface SimpleUsage {
  apiFile: string
  schemaFile: string
  apiImport?: string
  exportName?: string
  argSuffix?: string
  responseSuffix?: string
  hooks?: boolean
  outputFile: string
  filterEndpoints?:
    | string
    | RegExp
    | EndpointMatcherFunction
    | Array<string | RegExp | EndpointMatcherFunction>
  endpointOverrides?: EndpointOverrides[]
}

export type EndpointMatcherFunction = (
  operationName: string,
  operationDefinition: OperationDefinition
) => boolean
```

#### Filtering endpoints

If you only want to include a few endpoints, you can use the `filterEndpoints` config option to filter your endpoints.

```ts no-transpile title="openapi-config.ts"
const filteredConfig: ConfigFile = {
  // ...
  // should only have endpoints loginUser, placeOrder, getOrderById, deleteOrder
  filterEndpoints: ['loginUser', /Order/],
}
```

#### Endpoint overrides

If an endpoint is generated as a mutation instead of a query or the other way round, you can override that:

```ts no-transpile title="openapi-config.ts"
const withOverride: ConfigFile = {
  // ...
  endpointOverrides: [
    {
      pattern: 'loginUser',
      type: 'mutation',
    },
  ],
}
```

#### Multiple output files

```ts no-transpile title="openapi-config.ts"
const config: ConfigFile = {
  schemaFile: 'https://petstore3.swagger.io/api/v3/openapi.json',
  apiFile: './src/store/emptyApi.ts',
  outputFiles: {
    './src/store/user.ts': {
      filterEndpoints: [/user/i],
    },
    './src/store/order.ts': {
      filterEndpoints: [/order/i],
    },
    './src/store/pet.ts': {
      filterEndpoints: [/pet/i],
    },
  },
}
```

# Server Side Rendering

## Server Side Rendering with Next.js

RTK Query supports Server Side Rendering (SSR) with [Next.js](https://nextjs.org/) via
[rehydration](./persistence-and-rehydration.mdx) in combination with
[next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper).

The workflow is as follows:

- Set up `next-redux-wrapper`
- In `getStaticProps` or `getServerSideProps`:
  - Pre-fetch all queries via the `initiate` actions, e.g. `store.dispatch(api.endpoints.getPokemonByName.initiate(name))`
  - Wait for each query to finish using `await Promise.all(api.util.getRunningOperationPromises())`
- In your `createApi` call, configure rehydration using the `extractRehydrationInfo` option:

  [examples](docblock://query/createApi.ts?token=CreateApiOptions.extractRehydrationInfo)

An example repo using `next.js` is available [here](https://github.com/phryneas/ssr-experiments/tree/main/nextjs-blog).

:::tip
While memory leaks are not anticipated, once a render is sent to the client and the store is being
removed from memory, you may wish to also call `store.dispatch(api.util.resetApiState())` to
ensure that no rogue timers are left running.
:::

:::tip
In order to avoid providing stale data with Static Site Generation (SSG), you may wish to set
[`refetchOnMountOrArgChange`](../api/createApi.mdx#refetchonmountorargchange) to a reasonable value
such as 900 (seconds) in order to allow data to be re-fetched when accessed if it has been that
long since the page was generated.
:::

## Server Side Rendering elsewhere

If you are not using `next.js`, and the example above cannot be adapted to your SSR framework,
an `unstable__` marked approach is available to support SSR scenarios where you need to execute
async code during render and not safely in an effect.
This is a similar approach to using [`getDataFromTree`](https://www.apollographql.com/docs/react/performance/server-side-rendering/#executing-queries-with-getdatafromtree)
with [Apollo](https://www.apollographql.com/docs/).

The workflow is as follows:

- Create a version of `createApi` that performs asynchronous work during render:

  [examples](docblock://query/react/module.ts?token=ReactHooksModuleOptions.unstable__sideEffectsInRender)

- Use your custom `createApi` when calling `const api = createApi({...})`
- Wait for all queries to finish using `await Promise.all(api.util.getRunningOperationPromises())` before performing the next render cycle

# Persistence and Rehydration

RTK Query supports rehydration via the [`extractRehydrationInfo`](../api/createApi.mdx#extractrehydrationinfo)
option on [`createApi`](../api/createApi.mdx). This function is passed every dispatched action,
and where it returns a value other than `undefined`, that value is used to rehydrate the API state
for fulfilled & errored queries.

See also [Server Side Rendering](./server-side-rendering.mdx).

:::info

Generally, persisting API slices is not recommended and instead, mechanisms like
[`Cache-Control` Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
should be used in browsers to define cache behaviour.
Persisting and rehydrating an api slice might always leave the user with very stale data if the user
has not visited the page for some time.
Nonetheless, in environments like Native Apps, where there is no browser cache to take care of this,
persistance might still be a viable option.

:::

## Redux Persist

API state rehydration can be used in conjunction with [Redux Persist](https://github.com/rt2zz/redux-persist)
by leveraging the `REHYDRATE` action type imported from `redux-persist`. This can be used out of the
box with the `autoMergeLevel1` or `autoMergeLevel2` [state reconcilers](https://github.com/rt2zz/redux-persist#state-reconciler)
when persisting the root reducer, or with the `autoMergeLevel1` reconciler when persisting just the api reducer.

```ts title="redux-persist rehydration example"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { REHYDRATE } from 'redux-persist'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  // highlight-start
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath]
    }
  },
  // highlight-end
  endpoints: (build) => ({
    // omitted
  }),
})
```
# Customizing `createApi`

Currently, RTK Query includes two variants of `createApi`:

- `createBaseApi`, which contains only the UI-agnostic Redux logic (the core module)
- `createApi`, which contains both the core and React hooks modules

You can create your own versions of `createApi` by either specifying non-default options for the modules or by adding your own modules.

## Customizing the React-Redux Hooks

If you want the hooks to use different versions of `useSelector` or `useDispatch`, such as if you are using a custom context, you can pass these in at module creation:

```ts
import * as React from 'react'
import { createDispatchHook, ReactReduxContextValue } from 'react-redux'
import {
  buildCreateApi,
  coreModule,
  reactHooksModule,
} from '@reduxjs/toolkit/query/react'

const MyContext = React.createContext<ReactReduxContextValue>(null as any)
const customCreateApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ useDispatch: createDispatchHook(MyContext) })
)
```

## Creating your own module

If you want to create your own module, you should review [the react-hooks module](https://github.com/reduxjs/redux-toolkit/blob/b74a52935a5840bebca5acdc8e2265e3b6497afa/src/query/react/module.ts) to see what an implementation would look like.

Here is a very stripped down version:

```ts no-transpile
import { CoreModule } from '@internal/core/module'
import {
  BaseQueryFn,
  EndpointDefinitions,
  Api,
  Module,
  buildCreateApi,
  coreModule,
} from '@reduxjs/toolkit/query'

export const customModuleName = Symbol()
export type CustomModule = typeof customModuleName

declare module '../apiTypes' {
  export interface ApiModules<
    BaseQuery extends BaseQueryFn,
    Definitions extends EndpointDefinitions,
    ReducerPath extends string,
    TagTypes extends string
  > {
    [customModuleName]: {
      endpoints: {
        [K in keyof Definitions]: {
          myEndpointProperty: string
        }
      }
    }
  }
}

export const myModule = (): Module<CustomModule> => ({
  name: customModuleName,
  init(api, options, context) {
    // initialize stuff here if you need to

    return {
      injectEndpoint(endpoint, definition) {
        const anyApi = (api as any) as Api<
          any,
          Record<string, any>,
          string,
          string,
          CustomModule | CoreModule
        >
        anyApi.endpoints[endpoint].myEndpointProperty = 'test'
      },
    }
  },
})

export const myCreateApi = buildCreateApi(coreModule(), myModule())
```

# Customizing queries

RTK Query is agnostic as to how your requests resolve. You can use any library you like to handle requests, or no library at all. RTK Query provides reasonable defaults expected to cover the majority of use cases, while also allowing room for customization to alter query handling to fit specific needs.

## Customizing queries with `baseQuery`

The default method to handle queries is via the [`baseQuery`](../api/createApi#basequery) option on [`createApi`](../api/createApi), in combination with the [`query`](../api/createApi.mdx#query) option on an endpoint definition.

To process queries, endpoints are defined with a [`query`](../api/createApi.mdx#query) option, which passes its return value to a common [`baseQuery`](../api/createApi#basequery) function used for the API.

By default, RTK Query ships with [`fetchBaseQuery`](../api/fetchBaseQuery), which is a lightweight [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like `axios`. If `fetchBaseQuery` alone does not meet your needs, you can customize its behaviour with a wrapper function, or create your own [`baseQuery`](../api/createApi.mdx#basequery) function from scratch for [`createApi`](../api/createApi) to use.

See also [`baseQuery API Reference`](../api/createApi.mdx#basequery).

### Implementing a custom `baseQuery`

RTK Query expects a `baseQuery` function to be called with three arguments: `args`, `api`, and `extraOptions`. It is expected to return an object with either a `data` or `error` property, or a promise that resolves to return such an object.

#### baseQuery function arguments

```ts title="baseQuery example arguments" no-transpile
const customBaseQuery = (
  // highlight-start
  args,
  { signal, dispatch, getState },
  extraOptions
  // highlight-end
) => {
  // omitted
}
```

#### baseQuery function return value

1.  ```ts title="Expected success result format" no-transpile
    return { data: YourData }
    ```
2.  ```ts title="Expected error result format" no-transpile
    return { error: YourError }
    ```

```ts title="baseQuery example return value" no-transpile
const customBaseQuery = (
  args,
  { signal, dispatch, getState },
  extraOptions
) => {
  // highlight-start
  if (Math.random() > 0.5) return { error: 'Too high!' }
  return { data: 'All good!' }
  // highlight-end
}
```

:::note
This format is required so that RTK Query can infer the return types for your responses.
:::

At its core, a `baseQuery` function only needs to have the minimum return value to be valid; an object with a `data` or `error` property. It is up to the user to determine how they wish to use the provided arguments, and how requests are handled within the function itself.

#### fetchBaseQuery defaults

For [`fetchBaseQuery`](../api/fetchBaseQuery) specifically, the return type is as follows:

```ts title="Return types of fetchBaseQuery" no-transpile
Promise<{
    data: any;
    error?: undefined;
    meta?: { request: Request; response: Response };
} | {
    error: {
        status: number;
        data: any;
    };
    data?: undefined;
    meta?: { request: Request; response: Response };
}>
```

1.  ```ts title="Expected success result format with fetchBaseQuery" no-transpile
    return { data: YourData }
    ```
2.  ```ts title="Expected error result format with fetchBaseQuery" no-transpile
    return { error: { status: number, data: YourErrorData } }
    ```

## Customizing query responses with `transformResponse`

Individual endpoints on [`createApi`](../api/createApi.mdx) accept a [`transformResponse`](../api/createApi.mdx) property which allows manipulation of the data returned by a query or mutation before it hits the cache.

`transformResponse` is called with the data that a successful `baseQuery` returns for the corresponding endpoint, and the return value of `transformResponse` is used as the cached data associated with that endpoint call.

By default, the payload from the server is returned directly.

```ts
function defaultTransformResponse(
  baseQueryReturnValue: unknown,
  meta: unknown,
  arg: unknown
) {
  return baseQueryReturnValue
}
```

To change it, provide a function that looks like:

```ts title="Unpack a deeply nested collection" no-transpile
transformResponse: (response, meta, arg) =>
  response.some.deeply.nested.collection
```

`transformResponse` is called with the `meta` property returned from the `baseQuery` as its second
argument, which can be used while determining the transformed response. The value for `meta` is
dependent on the `baseQuery` used.

```ts title="transformResponse meta example" no-transpile
transformResponse: (response: { sideA: Tracks; sideB: Tracks }, meta, arg) => {
  if (meta?.coinFlip === 'heads') {
    return response.sideA
  }
  return response.sideB
}
```

`transformResponse` is called with the `arg` property provided to the endpoint as its third
argument, which can be used while determining the transformed response. The value for `arg` is
dependent on the `endpoint` used, as well as the argument used when calling the query/mutation.

```ts title="transformResponse arg example" no-transpile
transformResponse: (response: Posts, meta, arg) => {
  return {
    originalArg: arg,
    data: response,
  }
}
```

While there is less need to store the response in a [normalized lookup table](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape) with RTK Query managing caching data, `transformResponse` can be leveraged to do so if desired.

```ts title="Normalize the response data" no-transpile
transformResponse: (response) =>
  response.reduce((acc, curr) => {
    acc[curr.id] = curr
    return acc
  }, {})

/*
  will convert:
  [
    {id: 1, name: 'Harry'},
    {id: 2, name: 'Ron'},
    {id: 3, name: 'Hermione'},
  ]

  to:
  {
    1: { id: 1, name: "Harry" },
    2: { id: 2, name: "Ron" },
    3: { id: 3, name: "Hermione" },
  }
*/
```

[`createEntityAdapter`](../../api/createEntityAdapter.mdx) can also be used with `transformResponse` to normalize data, while also taking advantage of other features provided by `createEntityAdapter`, including providing an `ids` array, using [`sortComparer`](../../api/createEntityAdapter.mdx#sortcomparer) to maintain a consistently sorted list, as well as maintaining strong TypeScript support.

See also [Websocket Chat API with a transformed response shape](./streaming-updates.mdx#websocket-chat-api-with-a-transformed-response-shape) for an example of `transformResponse` normalizing response data in combination with `createEntityAdapter`, while also updating further data using [`streaming updates`](./streaming-updates.mdx).

## Customizing queries with `queryFn`

Individual endpoints on [`createApi`](../api/createApi.mdx) accept a [`queryFn`](../api/createApi.mdx#queryfn) property which allows a given endpoint to ignore `baseQuery` for that endpoint by providing an inline function determining how that query resolves.

This can be useful for scenarios where you want to have particularly different behaviour for a single endpoint, or where the query itself is not relevant. Such situations may include:

- One-off queries that use a different base URL
- One-off queries that use different request handling, such as automatic re-tries
- One-off queries that use different error handling behaviour
- Performing multiple requests with a single query ([example](#performing-multiple-requests-with-a-single-query))
- Leveraging invalidation behaviour with no relevant query ([example](#using-a-no-op-queryfn))
- Using [Streaming Updates](./streaming-updates) with no relevant initial request ([example](#streaming-data-with-no-initial-request))

See also [`queryFn API Reference`](../api/createApi.mdx#queryfn) for the type signature and available options.

### Implementing a `queryFn`

In order to use `queryFn`, it can be treated as an inline `baseQuery`. It will be called with the same arguments as `baseQuery`, as well as the provided `baseQuery` function itself (`arg`, `api`, `extraOptions`, and `baseQuery`). Similarly to `baseQuery`, it is expected to return an object with either a `data` or `error` property, or a promise that resolves to return such an object.

#### queryFn function arguments

```ts title="queryFn example arguments" no-transpile
const queryFn = (
  // highlight-start
  args,
  { signal, dispatch, getState },
  extraOptions,
  baseQuery
  // highlight-end
) => {
  // omitted
}
```

#### queryFn function return value

1.  ```ts title="Expected success result format" no-transpile
    return { data: YourData }
    ```
2.  ```ts title="Expected error result format" no-transpile
    return { error: YourError }
    ```

```ts title="queryFn example return value" no-transpile
const queryFn = (
  args,
  { signal, dispatch, getState },
  extraOptions,
  baseQuery
) => {
  // highlight-start
  if (Math.random() > 0.5) return { error: 'Too high!' }
  return { data: 'All good!' }
  // highlight-end
}
```

## Examples - `baseQuery`

### Axios baseQuery

This example implements a very basic axios-based `baseQuery` utility.

```ts title="Basic axios baseQuery"
import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

// highlight-start
const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        },
      }
    }
  }
// highlight-end

const api = createApi({
  // highlight-start
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://example.com',
  }),
  // highlight-end
  endpoints(build) {
    return {
      query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
      mutation: build.mutation({
        query: () => ({ url: '/mutation', method: 'post' }),
      }),
    }
  },
})
```

### GraphQL baseQuery

This example implements a very basic GraphQL-based `baseQuery`.

```ts title="Basic GraphQL baseQuery"
import { createApi } from '@reduxjs/toolkit/query'
import { request, gql, ClientError } from 'graphql-request'

// highlight-start
const graphqlBaseQuery =
  ({ baseUrl }: { baseUrl: string }) =>
  async ({ body }: { body: string }) => {
    try {
      const result = await request(baseUrl, body)
      return { data: result }
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { status: error.response.status, data: error } }
      }
      return { error: { status: 500, data: error } }
    }
  }
// highlight-end

export const api = createApi({
  // highlight-start
  baseQuery: graphqlBaseQuery({
    baseUrl: 'https://graphqlzero.almansi.me/api',
  }),
  // highlight-end
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        body: gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `,
      }),
      transformResponse: (response) => response.posts.data,
    }),
    getPost: builder.query({
      query: (id) => ({
        body: gql`
        query {
          post(id: ${id}) {
            id
            title
            body
          }
        }
        `,
      }),
      transformResponse: (response) => response.post,
    }),
  }),
})
```

### Automatic re-authorization by extending fetchBaseQuery

This example wraps [`fetchBaseQuery`](../api/fetchBaseQuery) such that when encountering a [`401 Unauthorized`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) error, an additional request is sent to attempt to refresh an authorization token, and re-try to initial query after re-authorizing.

```ts title="Simulating axios-like interceptors with a custom base query"
// file: authSlice.ts noEmit
declare function tokenReceived(args?: any): void
declare function loggedOut(): void
export { tokenReceived, loggedOut }
// file: baseQueryWithReauth.ts
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { tokenReceived, loggedOut } from './authSlice'

const baseQuery = fetchBaseQuery({ baseUrl: '/' })
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(loggedOut())
    }
  }
  return result
}
```

#### Preventing multiple unauthorized errors

Using [`async-mutex`](https://github.com/DirtyHairy/async-mutex) to prevent multiple calls to '/refreshToken' when multiple calls fail with [`401 Unauthorized`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401) errors.

```ts title="Preventing multiple calls to '/refreshToken'"
// file: authSlice.ts noEmit
declare function tokenReceived(args?: any): void
declare function loggedOut(): void
export { tokenReceived, loggedOut }
// file: baseQueryWithReauth.ts

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { tokenReceived, loggedOut } from './authSlice'
// highlight-start
import { Mutex } from 'async-mutex'
// highlight-end

// create a new mutex
// highlight-start
const mutex = new Mutex()
// highlight-end
const baseQuery = fetchBaseQuery({ baseUrl: '/' })
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  // highlight-start
  await mutex.waitForUnlock()
  // highlight-end
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    // highlight-start
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      // highlight-end
      try {
        const refreshResult = await baseQuery(
          '/refreshToken',
          api,
          extraOptions
        )
        if (refreshResult.data) {
          api.dispatch(tokenReceived(refreshResult.data))
          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(loggedOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        // highlight-start
        release()
        // highlight-end
      }
    } else {
      // wait until the mutex is available without locking it
      // highlight-start
      await mutex.waitForUnlock()
      // highlight-end
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
```

### Automatic retries

RTK Query exports a utility called `retry` that you can wrap the `baseQuery` in your API definition with. It defaults to 5 attempts with a basic exponential backoff.

The default behavior would retry at these intervals:

[remarks](docblock://query/retry.ts?token=defaultBackoff)

[examples](docblock://query/retry.ts?token=retry)

In the event that you didn't want to retry on a specific endpoint, you can just set `maxRetries: 0`.

:::info
It is possible for a hook to return `data` and `error` at the same time. By default, RTK Query will keep whatever the last 'good' result was in `data` until it can be updated or garbage collected.
:::

#### Bailing out of error re-tries

The `retry` utility has a `fail` method property attached which can be used to bail out of retries immediately. This can be used for situations where it is known that additional re-tries would be guaranteed to all fail and would be redundant.

```ts title="Bailing out of error re-tries"
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { FetchArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
interface Post {
  id: number
  name: string
}
type PostsResponse = Post[]

// highlight-start
const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({ baseUrl: '/api/' })(
      args,
      api,
      extraOptions
    )

    // bail out of re-tries immediately if unauthorized,
    // because we know successive re-retries would be redundant
    if (result.error?.status === 401) {
      retry.fail(result.error)
    }

    return result
  },
  {
    maxRetries: 5,
  }
)
// highlight-end

export const api = createApi({
  // highlight-start
  baseQuery: staggeredBaseQueryWithBailOut,
  // highlight-end
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => ({ url: 'posts' }),
    }),
    getPost: build.query<Post, string>({
      query: (id) => ({ url: `post/${id}` }),
      extraOptions: { maxRetries: 8 }, // You can override the retry behavior on each endpoint
    }),
  }),
})
export const { useGetPostsQuery, useGetPostQuery } = api
```

### Adding Meta information to queries

A `baseQuery` can also include a `meta` property in its return value. This can be beneficial in cases where you may wish to include additional information associated with the request such as a request ID or timestamp.

In such a scenario, the return value would look like so:

1.  ```ts title="Expected success result format with meta" no-transpile
    return { data: YourData, meta: YourMeta }
    ```
2.  ```ts title="Expected error result format with meta" no-transpile
    return { error: YourError, meta: YourMeta }
    ```

<!-- TODO: re-write below with a more realistic example -->

```ts title="baseQuery example with meta information"
// file: idGenerator.ts noEmit
export declare const uuid: () => string

// file: metaBaseQuery.ts
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  createApi,
} from '@reduxjs/toolkit/query'
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'
import { uuid } from './idGenerator'

// highlight-start
type Meta = {
  requestId: string
  timestamp: number
}
// highlight-end

// highlight-start
const metaBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  Meta & FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const requestId = uuid()
  const timestamp = Date.now()

  const baseResult = await fetchBaseQuery({ baseUrl: '/' })(
    args,
    api,
    extraOptions
  )

  return {
    ...baseResult,
    meta: baseResult.meta && { ...baseResult.meta, requestId, timestamp },
  }
}
// highlight-end

const DAY_MS = 24 * 60 * 60 * 1000

interface Post {
  id: number
  name: string
  timestamp: number
}
type PostsResponse = Post[]

const api = createApi({
  // highlight-start
  baseQuery: metaBaseQuery,
  // highlight-end
  endpoints: (build) => ({
    // a theoretical endpoint where we only want to return data
    // if request was performed past a certain date
    getRecentPosts: build.query<PostsResponse, void>({
      query: () => 'posts',
      // highlight-start
      transformResponse: (returnValue: PostsResponse, meta) => {
        // `meta` here contains our added `requestId` & `timestamp`, as well as
        // `request` & `response` from fetchBaseQuery's meta object.
        // These properties can be used to transform the response as desired.
        if (!meta) return []
        return returnValue.filter(
          (post) => post.timestamp >= meta.timestamp - DAY_MS
        )
      },
      // highlight-end
    }),
  }),
})
```

### Constructing a Dynamic Base URL using Redux state

In some cases, you may wish to have a dynamically altered base url determined from a property in your Redux state. A `baseQuery` has access to a [`getState`](../api/createApi.mdx#basequery-function-arguments) method that provides the current store state at the time it is called. This can be used to construct the desired url using a partial url string, and the appropriate data from your store state.

```ts title="Dynamically generated Base URL example"
// file: src/store.ts noEmit
export type RootState = {
  auth: {
    projectId: number | null
  }
}

// file: src/services/projectSlice.ts noEmit
import type { RootState } from '../store'
export const selectProjectId = (state: RootState) => state.auth.projectId

// file: src/services/types.ts noEmit
export interface Post {
  id: number
  name: string
}

// file: src/services/api.ts
import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import type { Post } from './types'
import { selectProjectId } from './projectSlice'
import type { RootState } from '../store'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: 'www.my-cool-site.com/',
})

const dynamicBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const projectId = selectProjectId(api.getState() as RootState)
  // gracefully handle scenarios where data to generate the URL is missing
  if (!projectId) {
    return {
      error: {
        status: 400,
        statusText: 'Bad Request',
        data: 'No project ID received',
      },
    }
  }

  const urlEnd = typeof args === 'string' ? args : args.url
  // construct a dynamically generated portion of the url
  const adjustedUrl = `project/${projectId}/${urlEnd}`
  const adjustedArgs =
    typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl }
  // provide the amended url and other params to the raw base query
  return rawBaseQuery(adjustedArgs, api, extraOptions)
}

export const api = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
    }),
  }),
})

export const { useGetPostsQuery } = api

/*
  Using `useGetPostsQuery()` where a `projectId` of 500 is in the redux state will result in
  a request being sent to www.my-cool-site.com/project/500/posts
*/
```

## Examples - `transformResponse`

### Unpacking deeply nested GraphQL data

```ts title="GraphQL transformation example"
// file: graphqlBaseQuery.ts noEmit
import { BaseQueryFn } from '@reduxjs/toolkit/query'
declare const graphqlBaseQuery: (args: { baseUrl: string }) => BaseQueryFn
declare const gql: (literals: TemplateStringsArray) => void
export { graphqlBaseQuery, gql }

// file: graphqlApi.ts
import { createApi } from '@reduxjs/toolkit/query'
import { graphqlBaseQuery, gql } from './graphqlBaseQuery'

interface Post {
  id: number
  title: string
}

export const api = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: '/graphql',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => ({
        body: gql`
          query {
            posts {
              data {
                id
                title
              }
            }
          }
        `,
      }),
      // highlight-start
      transformResponse: (response: { posts: { data: Post[] } }) =>
        response.posts.data,
      // highlight-end
    }),
  }),
})
```

### Normalizing data with `createEntityAdapter`

In the example below, `transformResponse` is used in conjunction with [`createEntityAdapter`](../../api/createEntityAdapter.mdx) to normalize the data before storing it in the cache.

For a response such as:

<!-- prettier-ignore -->
```ts no-transpile
[
  { id: 1, name: 'Harry' },
  { id: 2, name: 'Ron' },
  { id: 3, name: 'Hermione' },
]
```

The normalized cache data will be stored as:

```ts no-transpile
{
  ids: [1, 3, 2],
  entities: {
    1: { id: 1, name: "Harry" },
    2: { id: 2, name: "Ron" },
    3: { id: 3, name: "Hermione" },
  }
}
```

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'

export interface Post {
  id: number
  name: string
}

// highlight-start
const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})
// highlight-end

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    getPosts: build.query<EntityState<Post>, void>({
      query: () => `posts`,
      // highlight-start
      transformResponse(response: Post[]) {
        return postsAdapter.addMany(postsAdapter.getInitialState(), response)
      },
      // highlight-end
    }),
  }),
})

export const { useGetPostsQuery } = api
```

## Examples - `queryFn`

### Using a no-op queryFn

In certain scenarios, you may wish to have a `query` or `mutation` where sending a request or returning data is not relevant for the situation. Such a scenario would be to leverage the `invalidatesTags` property to force re-fetch specific `tags` that have been provided to the cache.

See also [`providing errors to the cache`](./automated-refetching.mdx#providing-data-to-the-cache) to see additional detail and an example for such a scenario to 'refetch errored queries'.

```ts title="Using a no-op queryFn"
// file: types.ts noEmit
export interface Post {
  id: number
  name: string
}
export interface User {
  id: number
  name: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post, User } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Post', 'User'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
      providesTags: ['Post'],
    }),

    getUsers: build.query<User[], void>({
      query: () => 'users',
      providesTags: ['User'],
    }),

    // highlight-start
    refetchPostsAndUsers: build.mutation<null, void>({
      // The query is not relevant here, so a `null` returning `queryFn` is used
      queryFn: () => ({ data: null }),
      // This mutation takes advantage of tag invalidation behaviour to trigger
      // any queries that provide the 'Post' or 'User' tags to re-fetch if the queries
      // are currently subscribed to the cached data
      invalidatesTags: ['Post', 'User'],
    }),
    // highlight-end
  }),
})
```

### Streaming data with no initial request

RTK Query provides the ability for an endpoint to send an initial request for data, followed up with recurring [streaming updates](./streaming-updates.mdx) that perform further updates to the cached data as the updates occur. However, the initial request is optional, and you may wish to use streaming updates without any initial request fired off.

In the example below, a `queryFn` is used to populate the cache data with an empty array, with no initial request sent. The array is later populated using streaming updates via the [`onCacheEntryAdded`](../api/createApi.mdx#oncacheentryadded) endpoint option, updating the cached data as it is received.

```ts title="Streaming data with no initial request"
// file: types.ts noEmit
export interface Message {
  id: number
  channel: 'general' | 'redux'
  userName: string
  text: string
}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Message } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Message'],
  endpoints: (build) => ({
    // highlight-start
    streamMessages: build.query<Message[], void>({
      // The query is not relevant here as the data will be provided via streaming updates.
      // A queryFn returning an empty array is used, with contents being populated via
      // streaming updates below as they are received.
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(arg, { updateCachedData, cacheEntryRemoved }) {
        const ws = new WebSocket('ws://localhost:8080')
        // populate the array with messages as they are received from the websocket
        ws.addEventListener('message', (event) => {
          updateCachedData((draft) => {
            draft.push(JSON.parse(event.data))
          })
        })
        await cacheEntryRemoved
        ws.close()
      },
    }),
    // highlight-end
  }),
})
```

### Performing multiple requests with a single query

In the example below, a query is written to fetch all posts for a random user. This is done using a first request for a random user, followed by getting all posts for that user. Using `queryFn` allows the two requests to be included within a single query, avoiding having to chain that logic within component code.

```ts title="Performing multiple requests with a single query"
// file: types.ts noEmit
export interface Post {}
export interface User {
  id: number
}

// file: api.ts
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { Post, User } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/ ' }),
  endpoints: (build) => ({
    getRandomUserPosts: build.query<Post, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const randomResult = await fetchWithBQ('users/random')
        if (randomResult.error) throw randomResult.error
        const user = randomResult.data as User
        const result = await fetchWithBQ(`user/${user.id}/posts`)
        return result.data
          ? { data: result.data as Post }
          : { error: result.error as FetchBaseQueryError }
      },
    }),
  }),
})
```

# Usage Without React Hooks

Like the Redux core and Redux Toolkit, RTK Query's primary functionality is UI-agnostic and can be used with any UI layer. RTK Query also includes a version of [`createApi`](../api/createApi.mdx) designed specifically for use with React, which [automatically generates React hooks](../api/created-api/hooks.mdx).

While React hooks are the primary way that the majority of users are expected to be using RTK Query, the library itself uses plain JS logic and can be used both with React Class components, and independent of React itself.

This page documents how to interact with RTK Query when used without React Hooks, in order to make proper use of RTK Query [`cache behavior`](./cache-behavior).

## Adding a subscription

Cache subscriptions are used to tell RTK Query that it needs to fetch data for an endpoint. A subscription for an endpoint can be added by dispatching the result of the [`initiate`](../api/created-api/endpoints.mdx#initiate) thunk action creator attached to a query endpoint.

With React hooks, this behavior is instead handled within [`useQuery`](../api/created-api/hooks.mdx#usequery), [`useQuerySubscription`](../api/created-api/hooks.mdx#usequerysubscription), [`useLazyQuery`](../api/created-api/hooks.mdx#uselazyquery), and [`useLazyQuerySubscription`](../api/created-api/hooks.mdx#uselazyquerysubscription).

```ts title="Subscribing to cached data" no-transpile
dispatch(api.endpoints.getPosts.initiate())
```

## Removing a subscription

Removing a cache subscription is necessary for RTK Query to identify that cached data is no longer required. This allows RTK Query to clean up and remove old cache data.

The result of dispatching the [`initiate`](../api/created-api/endpoints.mdx#initiate) thunk action creator of a query endpoint is an object with an `unsubscribe` property. This property is a function that when called, will remove the corresponding cache subscription.

With React hooks, this behavior is instead handled within [`useQuery`](../api/created-api/hooks.mdx#usequery), [`useQuerySubscription`](../api/created-api/hooks.mdx#usequerysubscription), [`useLazyQuery`](../api/created-api/hooks.mdx#uselazyquery), and [`useLazyQuerySubscription`](../api/created-api/hooks.mdx#uselazyquerysubscription).

```ts title="Unsubscribing from cached data" no-transpile
// Adding a cache subscription
const result = dispatch(api.endpoints.getPosts.initiate())

// Removing the corresponding cache subscription
result.unsubscribe()
```

## Accessing cached data & request status

Accessing cache data and request status information can be performed using the `select` function property of a query endpoint to create a selector and call that with the Redux state. This provides a snapshot of the cache data and request status information at the time it is called.

:::caution

The `endpoint.select()` function creates a _new_ selector instance - it isn't the actual selector function itself!

:::

With React hooks, this behaviour is instead handled within [`useQuery`](../api/created-api/hooks.mdx#usequery), [`useQueryState`](../api/created-api/hooks.mdx#usequerystate), and [`useLazyQuery`](../api/created-api/hooks.mdx#uselazyquery).

```ts title="Accessing cached data & request status" no-transpile
const result = api.endpoints.getPosts.select()(state)
const { data, status, error } = result
```

Note that unlike the auto-generated query hooks, derived booleans such as `isLoading`, `isFetching`, `isSuccess` are not available here. The raw `status` enum is provided instead.

## Performing mutations

[Mutations](./mutations.mdx) are used in order to update data on the server. Mutations can be performed by dispatching the result of the [`initiate`](../api/created-api/endpoints.mdx#initiate) thunk action creator attached to a mutation endpoint.

With React hooks, this behavior is instead handled within [`useMutation`](../api/created-api/hooks.mdx#usemutation).

```ts title="Triggering a mutation endpoint" no-transpile
dispatch(api.endpoints.addPost.initiate({ name: 'foo' }))
```

## Examples

Examples of usage without React hooks can be found under the following:

- The `PostDetail` component in the [`React Class Components` example](./examples.mdx#react-class-components)
- The [`Svelte` example](./examples.mdx#svelte)
- The below `Cache Lifetime Subscription Class Component` example:

<iframe
  src="https://codesandbox.io/embed/rtk-query-cache-lifetime-subscription-class-component-example-38mgd?fontsize=12&runonclick=1&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FUsersList.tsx&theme=dark&runonclick=1"
  style={{
    width: '100%',
    height: '800px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="RTK Query Cache Lietime Subscription Class Component Example"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## Further Information

- NgRx maintainer Brandon Roberts has written a post called [Cousins playing nicely: Experimenting with NgRx Store and RTK Query](https://dev.to/brandontroberts/cousins-playing-nicely-experimenting-with-ngrx-store-and-rtk-query-25f4), which demonstrates some approaches for integrating RTK Query into NgRx
- [`saulmoro/ngrx-rtk-query`](https://github.com/SaulMoro/ngrx-rtk-query) implements an NgRx equivalent of the subscription lifecycle managed in RTKQ's own React hooks]

# Migrating to RTK Query

:::tip What You'll Learn

- How to convert conventional data-fetching logic implemented with Redux Toolkit + `createAsyncThunk` to use Redux Toolkit Query

:::

## Overview

The most common use case for side effects in Redux apps is fetching data. Redux apps typically use a tool like thunks, sagas, or observables to make an AJAX request, and [dispatch actions based on the results of the request](https://redux.js.org/tutorials/fundamentals/part-7-standard-patterns#async-request-status). Reducers then listen for those actions to manage loading state and cache the fetched data.

RTK Query is purpose-built to solve the use case of data fetching. While it can't replace all of the situations where you'd use thunks or other side effects approaches, **using RTK Query should eliminate the need for most of that hand-written side effects logic**.

RTK Query is expected to cover a lot of overlapping behaviour that users may have previously used `createAsyncThunk` for, including caching purposes, and request lifecycle management (e.g. `isUninitialized`, `isLoading`, `isError` states).

In order to migrate data-fetching features from existing Redux tools to RTK Query, the appropriate endpoints should be added to an RTK Query API slice, and the previous feature code deleted. This generally will not include much common code kept between the two, as the tools work differently and one will replace the other.

If you're looking to get started with RTK Query from scratch, you may also wish to see [`RTK Query Quick Start`](../../tutorials/rtk-query.mdx).

## Example - Migrating data-fetching logic from Redux Toolkit to RTK Query

A common method used to implement simple, cached, data-fetching logic with Redux is to set up a slice using `createSlice`, with state containing the associated `data` and `status` for a query, using `createAsyncThunk` to handle the asynchronous request lifecycles. Below we will explore an example of such an implementation, and how we can later go about migrating that code to use RTK Query instead.

:::note
RTK Query also provides many more features than what is created with the thunk example shown below. The example is only intended to demonstrate how the particular implementation could be replaced with RTK Query.
:::

### Design specifications

For our example, the design specifications required for the tool are as follows:

- Provide a hook to fetch data for a `pokemon` using the api: https://pokeapi.co/api/v2/pokemon/bulbasaur, where bulbasaur can be any pokemon name
- A request for any given name should only be sent if it hasn't already done so for the session
- The hook should provide us with the current status of the request for the supplied pokemon name; whether it is in an 'uninitialized', 'pending', 'fulfilled', or 'rejected' state
- The hook should provide us with the current data for the supplied pokemon name

With the above specifications in mind, lets first look at an overview of how this could be implemented traditionally using `createAsyncThunk` combined with `createSlice`.

## Implementation using `createSlice` & `createAsyncThunk`

### Slice file

The three snippets below make up our slice file. This file is concerned with managing our asynchronous request lifecycles, as well as storing our data & request statuses for a given pokemon name.

#### Thunk action creator

Below we create a thunk action creator using [`createAsyncThunk`](../../api/createAsyncThunk.mdx) in order to manage asynchronous request lifecycles. This will be accessible within components & hooks to be dispatched, in order to fire off a request for some pokemon data. `createAsyncThunk` itself will handle dispatching lifecycle methods for our request: `pending`, `fulfilled`, and `rejected`, which we will handle within our slice.

```ts title="src/services/pokemonSlice.ts - Thunk Action Creator" no-transpile
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Pokemon } from './types'
import { RootState } from '../store'

// highlight-start
export const fetchPokemonByName = createAsyncThunk<Pokemon, string>(
  'pokemon/fetchByName',
  async (name, { rejectWithValue }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const data = await response.json()
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }
    return data
  }
)
// highlight-end

// slice & selectors omitted
```

#### Slice

Below we have our `slice` created with [`createSlice`](../../api/createSlice.mdx). We have our reducers containing our request handling logic defined here, storing the appropriate 'status' and 'data' in our state based on the name we search with.

```ts title="src/services/pokemonSlice.ts - slice logic" no-transpile
// imports & thunk action creator omitted

// highlight-start
type RequestState = 'pending' | 'fulfilled' | 'rejected'
// highlight-end

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    // highlight-start
    dataByName: {} as Record<string, Pokemon | undefined>,
    statusByName: {} as Record<string, RequestState | undefined>,
    // highlight-end
  },
  reducers: {},
  extraReducers: (builder) => {
    // highlight-start
    // When our request is pending:
    // - store the 'pending' state as the status for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.pending, (state, action) => {
      state.statusByName[action.meta.arg] = 'pending'
    })
    // When our request is fulfilled:
    // - store the 'fulfilled' state as the status for the corresponding pokemon name
    // - and store the received payload as the data for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      state.statusByName[action.meta.arg] = 'fulfilled'
      state.dataByName[action.meta.arg] = action.payload
    })
    // When our request is rejected:
    // - store the 'rejected' state as the status for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      state.statusByName[action.meta.arg] = 'rejected'
    })
    // highlight-end
  },
})

// selectors omitted
```

#### Selectors

Below we have our selectors defined, allowing us to later access the appropriate status & data for any given pokemon name.

```ts title="src/services/pokemonSlice.ts - selectors" no-transpile
// imports, thunk action creator & slice omitted

// highlight-start
export const selectStatusByName = (state: RootState, name: string) =>
  state.pokemon.statusByName[name]
export const selectDataByName = (state: RootState, name: string) =>
  state.pokemon.dataByName[name]
// highlight-end
```

### Store

In our `store` for our app, we include the corresponding reducer from our slice under the `pokemon` branch in our state tree. This lets our store handle the appropriate actions for our requests we will dispatch when running the app, using the logic defined previously.

```ts title="src/services/store.ts"
// file: src/services/pokemonSlice.ts noEmit
import { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export const pokemonSlice = {
  reducer,
}

// file: src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { pokemonSlice } from './services/pokemonSlice'

export const store = configureStore({
  reducer: {
    // highlight-start
    pokemon: pokemonSlice.reducer,
    // highlight-end
  },
})

export type RootState = ReturnType<typeof store.getState>
```

In order to have the store accessible within our app, we will wrap our `App` component with a [`Provider`](https://react-redux.js.org/api/provider) component from `react-redux`.

```tsx title="src/index.ts"
import { render } from 'react-dom'
// highlight-start
import { Provider } from 'react-redux'
// highlight-end

import App from './App'
// highlight-start
import { store } from './store'
// highlight-end

const rootElement = document.getElementById('root')
render(
  // highlight-start
  <Provider store={store}>
    <App />
  </Provider>,
  // highlight-end
  rootElement
)
```

### Custom hook

Below we create a hook to manage sending our request at the appropriate time, as well as obtaining the appropriate data & status from the store. [`useDispatch`](https://react-redux.js.org/api/hooks#usedispatch) and [`useSelector`](https://react-redux.js.org/api/hooks#useselector) are used from [`react-redux`](https://react-redux.js.org/introduction/getting-started) in order to communicate with the Redux store. At the end of our hook, we return the information in a neat, packaged object to be accessed in components.

```ts title="src/hooks.ts"
// file: src/services/pokemonSlice.ts noEmit
import { AsyncThunkAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
interface Pokemon {}
export declare const fetchPokemonByName: (
  arg: string
) => AsyncThunkAction<Pokemon, string, {}>

export const selectStatusByName = (state: RootState, name: string) =>
  state.pokemon.statusByName[name]
export const selectDataByName = (state: RootState, name: string) =>
  state.pokemon.dataByName[name]

// file: src/store.ts noEmit
interface Pokemon {}
type RequestState = 'pending' | 'fulfilled' | 'rejected'

const initialPokemonSlice = {
  dataByName: {} as Record<string, Pokemon | undefined>,
  statusByName: {} as Record<string, RequestState | undefined>,
}
export type RootState = {
  pokemon: typeof initialPokemonSlice
}

// file: src/hooks.ts
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import {
  fetchPokemonByName,
  selectStatusByName,
  selectDataByName,
} from './services/pokemonSlice'

// highlight-start
export function useGetPokemonByNameQuery(name: string) {
  const dispatch = useDispatch()
  // select the current status from the store state for the provided name
  const status = useSelector((state: RootState) =>
    selectStatusByName(state, name)
  )
  // select the current data from the store state for the provided name
  const data = useSelector((state: RootState) => selectDataByName(state, name))
  useEffect(() => {
    // upon mount or name change, if status is uninitialized, send a request
    // for the pokemon name
    if (status === undefined) {
      dispatch(fetchPokemonByName(name))
    }
  }, [status, name, dispatch])

  // derive status booleans for ease of use
  const isUninitialized = status === undefined
  const isLoading = status === 'pending' || status === undefined
  const isError = status === 'rejected'
  const isSuccess = status === 'fulfilled'

  // return the import data for the caller of the hook to use
  return { data, isUninitialized, isLoading, isError, isSuccess }
}
// highlight-end
```

### Using the custom hook

Our code above meets all of the design specifications, so let's use it! Below we can see how the hook can be called in a component, and return the relevant data & status booleans.

Our implementation below provides the following behaviour in the component:

- When our component is mounted, if a request for the provided pokemon name has not already been sent for the session, send the request off
- The hook always provides the latest received `data` when available, as well as the request status booleans `isUninitialized`, `isPending`, `isFulfilled` & `isRejected` in order to determine the current UI at any given moment as a function of our state.

```tsx title="src/App.tsx"
import * as React from 'react'
// highlight-start
import { useGetPokemonByNameQuery } from './hooks'
// highlight-end

export default function App() {
  // highlight-start
  const { data, isError, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // highlight-end

  return (
    <div className="App">
      {isError ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  )
}
```

A runnable example of the above code can be seen below:

<iframe
  src="https://codesandbox.io/s/data-fetchingcaching-example-rtk-with-thunks-5kf80?fontsize=12&runonclick=1&hidenavigation=1&module=%2Fsrc%2Fservices/pokemonSlice.ts&theme=dark&view=preview"
  style={{
    width: '100%',
    height: '800px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="Data Fetching Example - RTK with Thunks"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## Converting to RTK Query

Our implementation above _does_ work perfectly fine for the requirements specified, however, extending the code to include further endpoints could involve a lot of repetition. It also has some certain limitations that may not be immediately obvious. For example, multiple components rendering simultaneously calling our hook would each send off a request for bulbasaur at the same time!

Below we will walk through how a lot of the boilerplate can be avoided by migrating the above code to use RTK Query instead. RTK Query will also handle many other situations for us, including de-duping requests on a more granular level to prevent sending unnecessary duplicate requests like that brought up above.

### API Slice File

Our code below is for our API slice definition. This acts as our network API interface layer, and is created using [`createApi`](../api/createApi.mdx). This file will contain our endpoint definition, and `createApi` will provide us with an auto-generated hook which manages firing our request only when necessary, as well as providing us with request status lifecycle booleans.

This will completely cover our logic implemented above for the entire slice file, including the thunk, slice definition, selectors, _and_ our custom hook!

```ts title="src/services/api.ts"
// file: types.ts noEmit
export interface Pokemon {}

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  reducerPath: 'pokemonApi',
  endpoints: (build) => ({
    // highlight-start
    getPokemonByName: build.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
    // highlight-end
  }),
})

// highlight-start
export const { useGetPokemonByNameQuery } = api
// highlight-end
```

### Connecting the API slice to the store

Now that we have our API definition created, we need to hook it up to our store. In order to do that, we will need to use the [`reducerPath`](../api/created-api/redux-integration.mdx#reducerpath) and [`middleware`](../api/created-api/redux-integration.mdx#middleware) properties from our created `api`. This will allow the store to process the internal actions that the generated hook uses, allows the generated API logic to find the state correctly, and adds the logic for managing caching, invalidation, subscriptions, polling, and more.

```ts title="src/store.ts"
// file: src/services/pokemonSlice.ts noEmit
import { Reducer } from '@reduxjs/toolkit'
declare const reducer: Reducer<{}>
export const pokemonSlice = {
  reducer,
}

// file: src/services/api.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Pokemon {}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// file: src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { pokemonSlice } from './services/pokemonSlice'
// highlight-start
import { api } from './services/api'
// highlight-end

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
    // highlight-start
    [api.reducerPath]: api.reducer,
    // highlight-end
  },
  // highlight-start
  middleware: (gDM) => gDM().concat(api.middleware),
  // highlight-end
})

export type RootState = ReturnType<typeof store.getState>
```

### Using our auto-generated hook

At this basic level, the usage of the auto-generated hook is identical to our custom hook! All we need to do is change our import path and we're good to go!

```diff title="src/App.tsx"
  import * as React from 'react'
- import { useGetPokemonByNameQuery } from './hooks'
+ import { useGetPokemonByNameQuery } from './services/api'

  export default function App() {
    const { data, isError, isLoading } = useGetPokemonByNameQuery('bulbasaur')


    return (
      <div className="App">
        {isError ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </div>
    )
  }
```

### Cleaning up unused code

As mentioned previously, our `api` definition has replaced all of the logic that we implemented previously using `createAsyncThunk`, `createSlice`, and our custom hook definition.

Given that we're no longer using that slice any longer, we can remove the import and reducer from our store:

```diff title="src/store.ts"
  import { configureStore } from '@reduxjs/toolkit'
- import { pokemonSlice } from './services/pokemonSlice'
  import { api } from './services/api'


  export const store = configureStore({
    reducer: {
-     pokemon: pokemonSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (gDM) => gDM().concat(api.middleware),
  })

  export type RootState = ReturnType<typeof store.getState>
```

We can also remove the _entire slice and hook files_ completely!

```diff
- src/services/pokemonSlice.ts (-51 lines)
- src/hooks.ts (-34 lines)
```

We've now re-implemented the full set of design specifications (and more!) in less than 20 lines of code, with room to easily expand by adding additional endpoints onto our api definition.

A runnable example of our re-factored implementation using RTK Query can be seen below:

<iframe
  src="https://codesandbox.io/s/data-fetchingcaching-example-rtk-query-ndmwo?fontsize=12&runonclick=1&hidenavigation=1&module=%2Fsrc%2Fservices/api.ts&theme=dark&view=preview"
  style={{
    width: '100%',
    height: '800px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="Data Fetching Example - RTK with Thunks"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

# `createApi`

`createApi` is the core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. It generates [an "API slice" structure](./created-api/overview.mdx) that contains Redux logic (and optionally React hooks) that encapsulate the data fetching and caching process for you.

:::tip

Typically, you should only have one API slice per base URL that your application needs to communicate with. For example, if your site fetches data from both `/api/posts` and `/api/users`, you would have a single API slice with `/api/` as the base URL, and separate endpoint definitions for `posts` and `users`. This allows you to effectively take advantage of [automated re-fetching](../usage/automated-refetching.mdx) by defining [tag](../usage/automated-refetching.mdx#tags) relationships across endpoints.

For maintainability purposes, you may wish to split up endpoint definitions across multiple files, while still maintaining a single API slice which includes all of these endpoints. See [code splitting](../usage/code-splitting.mdx) for how you can use the `injectEndpoints` property to inject API endpoints from other files into a single API slice definition.

:::

```ts title="Example: src/services/pokemon.ts"
// file: src/services/types.ts noEmit
export type Pokemon = {}

// file: src/services/pokemon.ts
// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// highlight-start
// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})
//highlight-end

// highlight-start
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
// highlight-end
```

## Parameters

`createApi` accepts a single configuration object parameter with the following options:

```ts no-transpile
  baseQuery(args: InternalQueryArgs, api: BaseQueryApi, extraOptions?: DefinitionExtraOptions): any;
  endpoints(build: EndpointBuilder<InternalQueryArgs, TagTypes>): Definitions;
  extractRehydrationInfo?: (
    action: AnyAction,
    {
      reducerPath,
    }: {
      reducerPath: ReducerPath
    }
  ) =>
    | undefined
    | CombinedState<Definitions, TagTypes, ReducerPath>
  tagTypes?: readonly TagTypes[];
  reducerPath?: ReducerPath;
  serializeQueryArgs?: SerializeQueryArgs<InternalQueryArgs>;
  keepUnusedDataFor?: number; // value is in seconds
  refetchOnMountOrArgChange?: boolean | number; // value is in seconds
  refetchOnFocus?: boolean;
  refetchOnReconnect?: boolean;
```

### `baseQuery`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.baseQuery)

#### baseQuery function arguments

- `args` - The return value of the `query` function for a given endpoint
- `api` - The `BaseQueryApi` object, containing `signal`, `dispatch`, `getState` and `extra` properties
  - `signal` - An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) object that may be used to abort DOM requests and/or read whether the request is aborted.
  - `dispatch` - The `store.dispatch` method for the corresponding Redux store
  - `getState` - A function that may be called to access the current store state
  - `extra` - Provided as thunk.extraArgument to the configureStore getDefaultMiddleware option.
- `extraOptions` - The value of the optional `extraOptions` property provided for a given endpoint

#### baseQuery function signature

```ts title="Base Query signature" no-transpile
export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = {},
  Meta = {}
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>

export interface BaseQueryApi {
  signal: AbortSignal
  dispatch: ThunkDispatch<any, any, any>
  getState: () => unknown
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E
      data?: undefined
      meta?: M
    }
  | {
      error?: undefined
      data: T
      meta?: M
    }
```

[examples](docblock://query/createApi.ts?token=CreateApiOptions.baseQuery)

### `endpoints`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.endpoints)

See [Anatomy of an endpoint](#anatomy-of-an-endpoint) for details on individual properties.

#### Query endpoint definition

```ts title="Query endpoint definition" no-transpile
export type QueryDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  TagTypes extends string,
  ResultType,
  ReducerPath extends string = string
> = {
  query(arg: QueryArg): BaseQueryArg<BaseQuery>

  /* either `query` or `queryFn` can be present, but not both simultaneously */
  queryFn(
    arg: QueryArg,
    api: BaseQueryApi,
    extraOptions: BaseQueryExtraOptions<BaseQuery>,
    baseQuery: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>
  ): MaybePromise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>>

  /* transformResponse only available with `query`, not `queryFn` */
  transformResponse?(
    baseQueryReturnValue: BaseQueryResult<BaseQuery>,
    meta: BaseQueryMeta<BaseQuery>,
    arg: QueryArg
  ): ResultType | Promise<ResultType>

  extraOptions?: BaseQueryExtraOptions<BaseQuery>

  providesTags?: ResultDescription<
    TagTypes,
    ResultType,
    QueryArg,
    BaseQueryError<BaseQuery>
  >

  keepUnusedDataFor?: number

  onQueryStarted?(
    arg: QueryArg,
    {
      dispatch,
      getState,
      extra,
      requestId,
      queryFulfilled,
      getCacheEntry,
      updateCachedData, // available for query endpoints only
    }: QueryLifecycleApi
  ): Promise<void>

  onCacheEntryAdded?(
    arg: QueryArg,
    {
      dispatch,
      getState,
      extra,
      requestId,
      cacheEntryRemoved,
      cacheDataLoaded,
      getCacheEntry,
      updateCachedData, // available for query endpoints only
    }: QueryCacheLifecycleApi
  ): Promise<void>
}
```

#### Mutation endpoint definition

```ts title="Mutation endpoint definition" no-transpile
export type MutationDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  TagTypes extends string,
  ResultType,
  ReducerPath extends string = string,
  Context = Record<string, any>
> = {
  query(arg: QueryArg): BaseQueryArg<BaseQuery>

  /* either `query` or `queryFn` can be present, but not both simultaneously */
  queryFn(
    arg: QueryArg,
    api: BaseQueryApi,
    extraOptions: BaseQueryExtraOptions<BaseQuery>,
    baseQuery: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>
  ): MaybePromise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>>

  /* transformResponse only available with `query`, not `queryFn` */
  transformResponse?(
    baseQueryReturnValue: BaseQueryResult<BaseQuery>,
    meta: BaseQueryMeta<BaseQuery>,
    arg: QueryArg
  ): ResultType | Promise<ResultType>

  extraOptions?: BaseQueryExtraOptions<BaseQuery>

  invalidatesTags?: ResultDescription<TagTypes, ResultType, QueryArg>

  onQueryStarted?(
    arg: QueryArg,
    {
      dispatch,
      getState,
      extra,
      requestId,
      queryFulfilled,
      getCacheEntry,
    }: MutationLifecycleApi
  ): Promise<void>

  onCacheEntryAdded?(
    arg: QueryArg,
    {
      dispatch,
      getState,
      extra,
      requestId,
      cacheEntryRemoved,
      cacheDataLoaded,
      getCacheEntry,
    }: MutationCacheLifecycleApi
  ): Promise<void>
}
```

#### How endpoints get used

When defining a key like `getPosts` as shown below, it's important to know that this name will become exportable from `api` and be able to referenced under `api.endpoints.getPosts.useQuery()`, `api.endpoints.getPosts.initiate()` and `api.endpoints.getPosts.select()`. The same thing applies to `mutation`s but they reference `useMutation` instead of `useQuery`.

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Post {
  id: number
  name: string
}
type PostsResponse = Post[]

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => 'posts',
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Posts', id })) : [],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

// Auto-generated hooks
export const { useGetPostsQuery, useAddPostMutation } = api

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = api
// reducerPath, reducer, middleware are only used in store configuration
// endpoints will have:
// endpoints.getPosts.initiate(), endpoints.getPosts.select(), endpoints.getPosts.useQuery()
// endpoints.addPost.initiate(), endpoints.addPost.select(), endpoints.addPost.useMutation()
// see `createApi` overview for _all exports_
```

### `extractRehydrationInfo`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.extractRehydrationInfo)

[examples](docblock://query/createApi.ts?token=CreateApiOptions.extractRehydrationInfo)

See also [Server Side Rendering](../usage/server-side-rendering.mdx) and
[Persistence and Rehydration](../usage/persistence-and-rehydration.mdx).

### `tagTypes`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.tagTypes)

[examples](docblock://query/createApi.ts?token=CreateApiOptions.tagTypes)

### `reducerPath`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.reducerPath)

[examples](docblock://query/createApi.ts?token=CreateApiOptions.reducerPath)

### `serializeQueryArgs`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.serializeQueryArgs)

By default, this function will take the query arguments, sort object keys where applicable, stringify the result, and concatenate it with the endpoint name. This creates a cache key based on the combination of arguments + endpoint name (ignoring object key order), such that calling any given endpoint with the same arguments will result in the same cache key.

### `keepUnusedDataFor`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.keepUnusedDataFor)

### `refetchOnMountOrArgChange`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.refetchOnMountOrArgChange)

:::note
You can set this globally in `createApi`, but you can also override the default value and have more granular control by passing `refetchOnMountOrArgChange` to each individual hook call or similarly by passing `forceRefetch: true` when dispatching the [`initiate`](./created-api/endpoints.mdx#initiate) action.
:::

### `refetchOnFocus`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.refetchOnFocus)

:::note
You can set this globally in `createApi`, but you can also override the default value and have more granular control by passing `refetchOnFocus` to each individual hook call or when dispatching the [`initiate`](./created-api/endpoints.mdx#initiate) action.

If you specify `track: false` when manually dispatching queries, RTK Query will not be able to automatically refetch for you.
:::

### `refetchOnReconnect`

[summary](docblock://query/createApi.ts?token=CreateApiOptions.refetchOnReconnect)

:::note
You can set this globally in `createApi`, but you can also override the default value and have more granular control by passing `refetchOnReconnect` to each individual hook call or when dispatching the [`initiate`](./created-api/endpoints.mdx#initiate) action.

If you specify `track: false` when manually dispatching queries, RTK Query will not be able to automatically refetch for you.
:::

## Anatomy of an endpoint

### `query`

_(required if no `queryFn` provided)_

[summary](docblock://query/endpointDefinitions.ts?token=EndpointDefinitionWithQuery.query)

[examples](docblock://query/endpointDefinitions.ts?token=EndpointDefinitionWithQuery.query)

### `queryFn`

_(required if no `query` provided)_

[summary](docblock://query/endpointDefinitions.ts?token=EndpointDefinitionWithQueryFn.queryFn)

Called with the same arguments as `baseQuery`, as well as the provided `baseQuery` function itself. It is expected to return an object with either a `data` or `error` property, or a promise that resolves to return such an object.

See also [Customizing queries with queryFn](../usage/customizing-queries.mdx#customizing-queries-with-queryfn).

```ts title="queryFn signature" no-transpile
queryFn(
  arg: QueryArg,
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions<BaseQuery>,
  baseQuery: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>
): MaybePromise<
| {
    error: BaseQueryError<BaseQuery>
    data?: undefined
  }
| {
    error?: undefined
    data: ResultType
  }
>

export interface BaseQueryApi {
  signal: AbortSignal
  dispatch: ThunkDispatch<any, any, any>
  getState: () => unknown
}
```

#### queryFn function arguments

- `args` - The argument provided when the query itself is called
- `api` - The `BaseQueryApi` object, containing `signal`, `dispatch` and `getState` properties
  - `signal` - An [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) object that may be used to abort DOM requests and/or read whether the request is aborted.
  - `dispatch` - The `store.dispatch` method for the corresponding Redux store
  - `getState` - A function that may be called to access the current store state
- `extraOptions` - The value of the optional `extraOptions` property provided for the endpoint
- `baseQuery` - The `baseQuery` function provided to the api itself

[examples](docblock://query/endpointDefinitions.ts?token=EndpointDefinitionWithQueryFn.queryFn)

### `transformResponse`

_(optional, not applicable with `queryFn`)_

[summary](docblock://query/endpointDefinitions.ts?token=EndpointDefinitionWithQuery.transformResponse)

In some cases, you may want to manipulate the data returned from a query before you put it in the cache. In this instance, you can take advantage of `transformResponse`.

See also [Customizing query responses with `transformResponse`](../usage/customizing-queries.mdx#customizing-query-responses-with-transformresponse)

```ts title="Unpack a deeply nested collection" no-transpile
transformResponse: (response, meta, arg) =>
  response.some.deeply.nested.collection
```

### `extraOptions`

_(optional)_

Passed as the third argument to the supplied `baseQuery` function

### `providesTags`

_(optional, only for query endpoints)_

[summary](docblock://query/endpointDefinitions.ts?token=QueryExtraOptions.providesTags)

See also [Providing cache data](../usage/automated-refetching.mdx#providing-cache-data).

[examples](docblock://query/endpointDefinitions.ts?token=QueryExtraOptions.providesTags)

### `invalidatesTags`

_(optional, only for mutation endpoints)_

[summary](docblock://query/endpointDefinitions.ts?token=MutationExtraOptions.invalidatesTags)

See also [Invalidating cache data](../usage/automated-refetching.mdx#invalidating-cache-data).

[examples](docblock://query/endpointDefinitions.ts?token=MutationExtraOptions.invalidatesTags)

### `keepUnusedDataFor`

_(optional, only for query endpoints)_

Overrides the api-wide definition of `keepUnusedDataFor` for this endpoint only.

[summary](docblock://query/createApi.ts?token=CreateApiOptions.keepUnusedDataFor)

[examples](docblock://query/createApi.ts?token=CreateApiOptions.keepUnusedDataFor)

### `onQueryStarted`

_(optional)_

Available to both [queries](../usage/queries.mdx) and [mutations](../usage/mutations.mdx).

A function that is called when you start each individual query or mutation. The function is called with a lifecycle api object containing properties such as `queryFulfilled`, allowing code to be run when a query is started, when it succeeds, and when it fails (i.e. throughout the lifecycle of an individual query/mutation call).

Can be used in `mutations` for [optimistic updates](../usage/manual-cache-updates.mdx#optimistic-updates).

#### Lifecycle API properties

- `dispatch` - The dispatch method for the store.
- `getState` - A method to get the current state for the store.
- `extra` - `extra` as provided as `thunk.extraArgument` to the `configureStore` `getDefaultMiddleware` option.
- `requestId` - A unique ID generated for the query/mutation.
- `queryFulfilled` - A Promise that will resolve with a `data` property (the transformed query result),
  and a `meta` property (`meta` returned by the `baseQuery`).
  If the query fails, this Promise will reject with the error. This allows you to `await` for the query to finish.
- `getCacheEntry` - A function that gets the current value of the cache entry.
- `updateCachedData` _(query endpoints only)_ - A function that accepts a 'recipe' callback specifying how to update the data for the corresponding cache at the time it is called. This uses `immer` internally, and updates can be written 'mutably' while safely producing the next immutable state.

```ts title="Mutation onQueryStarted signature" no-transpile
async function onQueryStarted(
  arg: QueryArg,
  {
    dispatch,
    getState,
    extra,
    requestId,
    queryFulfilled,
    getCacheEntry,
  }: MutationLifecycleApi
): Promise<void>
```

```ts title="Query onQueryStarted signature" no-transpile
async function onQueryStarted(
  arg: QueryArg,
  {
    dispatch,
    getState,
    extra,
    requestId,
    queryFulfilled,
    getCacheEntry,
    updateCachedData, // available for query endpoints only
  }: QueryLifecycleApi
): Promise<void>
```

```ts title="onQueryStarted query lifecycle example"
// file: notificationsSlice.ts noEmit
export const messageCreated = (msg: string) => ({
  type: 'notifications/messageCreated',
  payload: msg,
})

// file: api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { messageCreated } from './notificationsSlice'

export interface Post {
  id: number
  name: string
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  endpoints: (build) => ({
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        dispatch(messageCreated('Fetching post...'))
        try {
          const { data } = await queryFulfilled
          // `onSuccess` side-effect
          dispatch(messageCreated('Post received!'))
        } catch (err) {
          // `onError` side-effect
          dispatch(messageCreated('Error fetching post!'))
        }
      },
    }),
  }),
})
```

### `onCacheEntryAdded`

_(optional)_

Available to both [queries](../usage/queries.mdx) and [mutations](../usage/mutations.mdx).

A function that is called when a new cache entry is added, i.e. when a new subscription for the endpoint + query parameters combination is created. The function is called with a lifecycle api object containing properties such as `cacheDataLoaded` & `cacheDataRemoved`, allowing code to be run when a cache entry is added, when cache data is loaded, and when the cache entry is removed (i.e. throughout the lifecycle of a cache entry).

Can be used for [streaming updates](../usage/streaming-updates.mdx).

#### Cache Lifecycle API properties

- `dispatch` - The dispatch method for the store.
- `getState` - A method to get the current state for the store.
- `extra` - `extra` as provided as `thunk.extraArgument` to the `configureStore` `getDefaultMiddleware` option.
- `requestId` - A unique ID generated for the cache entry.
- `cacheEntryRemoved` - A Promise that allows you to wait for the point in time when the cache entry has been removed from the cache, by not being used/subscribed to any more in the application for too long or by dispatching `api.util.resetApiState`.
- `cacheDataLoaded` - A Promise that will resolve with the first value for this cache key. This allows you to `await` until an actual value is in the cache.  
  Note: If the cache entry is removed from the cache before any value has ever been resolved, this Promise will reject with `new Error('Promise never resolved before cacheEntryRemoved.')` to prevent memory leaks. You can just re-throw that error (or not handle it at all) - it will be caught outside of `cacheEntryAdded`.
- `getCacheEntry` - A function that gets the current value of the cache entry.
- `updateCachedData` _(query endpoints only)_ - A function that accepts a 'recipe' callback specifying how to update the data at the time it is called. This uses `immer` internally, and updates can be written 'mutably' while safely producing the next immutable state.

```ts title="Mutation onCacheEntryAdded signature" no-transpile
async function onCacheEntryAdded(
  arg: QueryArg,
  {
    dispatch,
    getState,
    extra,
    requestId,
    cacheEntryRemoved,
    cacheDataLoaded,
    getCacheEntry,
  }: MutationCacheLifecycleApi
): Promise<void>
```

```ts title="Query onCacheEntryAdded signature" no-transpile
async function onCacheEntryAdded(
  arg: QueryArg,
  {
    dispatch,
    getState,
    extra,
    requestId,
    cacheEntryRemoved,
    cacheDataLoaded,
    getCacheEntry,
    updateCachedData, // available for query endpoints only
  }: QueryCacheLifecycleApi
): Promise<void>
```

## Return value

See [the "created Api" API reference](./created-api/overview)

# `fetchBaseQuery`

This is a very small wrapper around [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that aims to simplify requests. It is not a full-blown replacement for `axios`, `superagent`, or any other more heavy-weight library, but it will cover the large majority of your needs.

It takes all standard options from fetch's [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) interface, as well as `baseUrl`, a `prepareHeaders` function, an optional `fetch` function, and a `paramsSerializer` function.

- `baseUrl` _(required)_
  - Typically a string like `https://api.your-really-great-app.com/v1/`. If you don't provide a `baseUrl`, it defaults to a relative path from where the request is being made. You should most likely _always_ specify this.
- `prepareHeaders` _(optional)_

  - Allows you to inject headers on every request. You can specify headers at the endpoint level, but you'll typically want to set common headers like `authorization` here. As a convenience mechanism, the second argument allows you to use `getState` to access your redux store in the event you store information you'll need there such as an auth token. Additionally, it provides access to `extra`, `endpoint`, `type`, and `forced` to unlock more granular conditional behaviors.

  - ```ts title="prepareHeaders signature" no-transpile
    ;(
      headers: Headers,
      api: {
        getState: () => unknown
        extra: unknown
        endpoint: string
        type: 'query' | 'mutation'
        forced: boolean | undefined
      }
    ) => Headers
    ```

- `paramsSerializer` _(optional)_
  - A function that can be used to apply custom transformations to the data passed into [`params`](#setting-the-query-string). If you don't provide this, `params` will be given directly to `new URLSearchParms()`. With some API integrations, you may need to leverage this to use something like the [`query-string`](https://github.com/sindresorhus/query-string) library to support different array types.
- `fetchFn` _(optional)_
  - A fetch function that overrides the default on the window. Can be useful in SSR environments where you may need to leverage `isomorphic-fetch` or `cross-fetch`.

```ts title="Return types of fetchBaseQuery" no-transpile
Promise<{
    data: any;
    error?: undefined;
    meta?: { request: Request; response: Response };
} | {
    error: {
        status: number;
        data: any;
    };
    data?: undefined;
    meta?: { request: Request; response: Response };
}>
```

### Using `fetchBaseQuery`

To use it, import it when you are [creating an API service definition](../../tutorials/rtk-query#create-an-api-service).

```ts title="src/services/pokemon.ts"
// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }), // Set the baseUrl for every endpoint below
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name}`, // Will make a request like https://pokeapi.co/api/v2/pokemon/bulbasaur
    }),
    updatePokemon: builder.mutation({
      query: ({ name, patch }) => ({
        url: `pokemon/${name}`,
        method: 'PATCH', // When performing a mutation, you typically use a method of PATCH/PUT/POST/DELETE for REST endpoints
        body: patch, // fetchBaseQuery automatically adds `content-type: application/json` to the Headers and calls `JSON.stringify(patch)`
      }),
    }),
  }),
})
```

### Setting default headers on requests

The most common use case for `prepareHeaders` would be to automatically include `authorization` headers for your API requests.

```ts title="Setting a token from a redux store value
// file: store.ts noEmit
export type RootState = { auth: { token: string } }

// file: baseQuery.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { RootState } from './store'

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})
```

### Individual query options

There is more behavior that you can define on a per-request basis that extends the default options available to the `RequestInit` interface.

- [`params`](#setting-the-query-string)
- [`body`](#setting-the-body)
- [`responseHandler`](#parsing-a-Response)
- [`validateStatus`](#handling-non-standard-response-status-codes)

```ts title="endpoint request options"
interface FetchArgs extends RequestInit {
  url: string
  params?: Record<string, any>
  body?: any
  responseHandler?: 'json' | 'text' | ((response: Response) => Promise<any>)
  validateStatus?: (response: Response, body: any) => boolean
}

const defaultValidateStatus = (response: Response) =>
  response.status >= 200 && response.status <= 299
```

### Setting the body

By default, `fetchBaseQuery` assumes that every request you make will be `json`, so in those cases all you have to do is set the `url` and pass a `body` object when appropriate. For other implementations, you can manually set the `Headers` to specify the content type.

#### json

```ts no-transpile
 // omitted
  endpoints: (builder) => ({
    updateUser: builder.query({
      query: (user: Record<string, string>) => ({
        url: `users`,
        method: 'PUT',
        body: user // Body is automatically converted to json with the correct headers
      }),
    }),
```

#### text

```ts no-transpile
 // omitted
  endpoints: (builder) => ({
    updateUser: builder.query({
      query: (user: Record<string, string>) => ({
        url: `users`,
        method: 'PUT',
        headers: {
            'content-type': 'text/plain',
        },
        body: user
      }),
    }),
```

### Setting the query string

`fetchBaseQuery` provides a simple mechanism that converts an `object` to a serialized query string by passing the object to `new URLSearchParms()`. If this doesn't suit your needs, you have two options:

1. Pass the `paramsSerializer` option to `fetchBaseQuery` to apply custom transformations
2. Build your own querystring and set it in the `url`

```ts no-transpile
 // omitted
  endpoints: (builder) => ({
    updateUser: builder.query({
      query: (user: Record<string, string>) => ({
        url: `users`,
        // Assuming no `paramsSerializer` is specified, the user object is automatically converted
        // and produces a url like /api/users?first_name=test&last_name=example
        params: user
      }),
    }),
```

### Parsing a Response

By default, `fetchBaseQuery` assumes that every `Response` you get will be parsed as `json`. In the event that you don't want that to happen, you can specify an alternative response handler like `text`, or take complete control and use a custom function that accepts the raw `Response` object &mdash; allowing you to use any [`Response` method](https://developer.mozilla.org/en-US/docs/Web/API/Response).

```ts title="Parse a Response as text"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const customApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `users`,
        responseHandler: (response) => response.text(), // This is the same as passing 'text'
      }),
    }),
  }),
})
```

:::note Note about responses that return an undefined body
If you make a `json` request to an API that only returns a `200` with an undefined body, `fetchBaseQuery` will pass that through as `undefined` and will not try to parse it as `json`. This can be common with some APIs, especially on `delete` requests.
:::

### Handling non-standard Response status codes

By default, `fetchBaseQuery` will `reject` any `Response` that does not have a status code of `2xx` and set it to `error`. This is the same behavior you've most likely experienced with `axios` and other popular libraries. In the event that you have a non-standard API you're dealing with, you can use the `validateStatus` option to customize this behavior.

```ts title="Using a custom validateStatus"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const customApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // Set the baseUrl for every endpoint below
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `users`,
        validateStatus: (response, result) =>
          response.status === 200 && !result.isError, // Our tricky API always returns a 200, but sets an `isError` property when there is an error.
      }),
    }),
  }),
})
```

# `ApiProvider`

[summary](docblock://query/react/ApiProvider.tsx?token=ApiProvider)

[examples](docblock://query/react/ApiProvider.tsx?token=ApiProvider)

:::danger
Using this together with an existing Redux store will cause them to conflict with each other. If you are already using Redux, please follow the instructions as shown in the [Getting Started guide](../../introduction/getting-started).
:::

### Example

<iframe
  src="https://codesandbox.io/embed/github/reduxjs/redux-toolkit/tree/master/examples/query/react/with-apiprovider?fontsize=12&runonclick=1&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark"
  style={{
    width: '100%',
    height: '800px',
    border: 0,
    borderRadius: '4px',
    overflow: 'hidden',
  }}
  title="RTK Query ApiProvider"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

# `setupListeners`

A utility used to enable `refetchOnFocus` and `refetchOnReconnect` behaviors. It requires the `dispatch` method from your store. Calling `setupListeners(store.dispatch)` will configure listeners with the recommended defaults, but you have the option of providing a callback for more granular control.

```ts title="setupListeners default configuration" no-transpile
let initialized = false
export function setupListeners(
  dispatch: ThunkDispatch<any, any, any>,
  customHandler?: (
    dispatch: ThunkDispatch<any, any, any>,
    actions: {
      onFocus: typeof onFocus
      onFocusLost: typeof onFocusLost
      onOnline: typeof onOnline
      onOffline: typeof onOffline
    }
  ) => () => void
) {
  function defaultHandler() {
    const handleFocus = () => dispatch(onFocus())
    const handleFocusLost = () => dispatch(onFocusLost())
    const handleOnline = () => dispatch(onOnline())
    const handleOffline = () => dispatch(onOffline())
    const handleVisibilityChange = () => {
      if (window.document.visibilityState === 'visible') {
        handleFocus()
      } else {
        handleFocusLost()
      }
    }

    if (!initialized) {
      if (typeof window !== 'undefined' && window.addEventListener) {
        // Handle focus events
        window.addEventListener(
          'visibilitychange',
          handleVisibilityChange,
          false
        )
        window.addEventListener('focus', handleFocus, false)

        // Handle connection events
        window.addEventListener('online', handleOnline, false)
        window.addEventListener('offline', handleOffline, false)
        initialized = true
      }
    }
    const unsubscribe = () => {
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      initialized = false
    }
    return unsubscribe
  }

  return customHandler
    ? customHandler(dispatch, { onFocus, onFocusLost, onOffline, onOnline })
    : defaultHandler()
}
```

If you notice, `onFocus`, `onFocusLost`, `onOffline`, `onOnline` are all actions that are provided to the callback. Additionally, these actions are made available to `api.internalActions` and are able to be used by dispatching them like this:

```ts title="Manual onFocus event" no-transpile
dispatch(api.internalActions.onFocus())
```

# Generated API Slices

## API Slice Overview

When you call [`createApi`](../createApi.mdx), it automatically generates and returns an API service "slice" object structure containing Redux logic you can use to interact with the endpoints you defined. This slice object includes a reducer to manage cached data, a middleware to manage cache lifetimes and subscriptions, and selectors and thunks for each endpoint. If you imported `createApi` from the React-specific entry point, it also includes auto-generated React hooks for use in your components.

This section documents the contents of that API structure, with the different fields grouped by category. The API types and descriptions are listed on separate pages for each category.

:::tip

Typically, you should only have one API slice per base URL that your application needs to communicate with. For example, if your site fetches data from both `/api/posts` and `/api/users`, you would have a single API slice with `/api/` as the base URL, and separate endpoint definitions for `posts` and `users`. This allows you to effectively take advantage of [automated re-fetching](../../usage/automated-refetching.mdx) by defining [tag](../../usage/automated-refetching.mdx#tags) relationships across endpoints.

For maintainability purposes, you may wish to split up endpoint definitions across multiple files, while still maintaining a single API slice which includes all of these endpoints. See [code splitting](../../usage/code-splitting.mdx) for how you can use the `injectEndpoints` property to inject API endpoints from other files into a single API slice definition.

:::

```ts title="API Slice Contents" no-transpile
const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (build) => ({
    // ...
  }),
})

type Api = {
  // Redux integration
  reducerPath: string
  reducer: Reducer
  middleware: Middleware

  // Endpoint interactions
  endpoints: Record<string, EndpointDefinition>

  // Code splitting and generation
  injectEndpoints: (options: InjectEndpointsOptions) => UpdatedApi
  enhanceEndpoints: (options: EnhanceEndpointsOptions) => UpdatedApi

  // Utilities
  utils: {
    updateQueryData: UpdateQueryDataThunk
    patchQueryData: PatchQueryDataThunk
    prefetch: PrefetchThunk
    invalidateTags: ActionCreatorWithPayload<
      Array<TagTypes | FullTagDescription<TagTypes>>,
      string
    >
    resetApiState: SliceActions['resetApiState']
    getRunningOperationPromises: () => Array<Promise<unknown>>
    getRunningOperationPromise: <EndpointName extends QueryKeys<Definitions>>(
      endpointName: EndpointName,
      args: QueryArgFrom<Definitions[EndpointName]>
    ) =>
      | QueryActionCreatorResult<Definitions[EndpointName]>
      | undefined
    getRunningOperationPromise: <EndpointName extends MutationKeys<Definitions>>(
      endpointName: EndpointName,
      fixedCacheKeyOrRequestId: string
    ) =>
      | MutationActionCreatorResult<Definitions[EndpointName]>
      | undefined
  }

  // Internal actions
  internalActions: InternalActions

  // React hooks (if applicable)
  [key in GeneratedReactHooks]: GeneratedReactHooks[key]
}
```

## Redux Integration

Internally, `createApi` will call [the Redux Toolkit `createSlice` API](https://redux-toolkit.js.org/api/createSlice) to generate a slice reducer and corresponding action creators with the appropriate logic for caching fetched data. It also automatically generates a custom Redux middleware that manages subscription counts and cache lifetimes.

The generated slice reducer and the middleware both need to be adding to your Redux store setup in `configureStore` in order to work correctly.

:::info API Reference

- [API Slices: Redux Integration](./redux-integration.mdx)

:::

## Endpoints

The API slice object will have an `endpoints` field inside. This section maps the endpoint names you provided to `createApi` to the core Redux logic (thunks and selectors) used to trigger data fetches and read cached data for that endpoint. If you're using the React-specific version of `createApi`, each endpoint definition will also contain the auto-generated React hooks for that endpoint.

:::info API Reference

- [API Slices: Endpoints](./endpoints.mdx)

:::

## Code Splitting and Generation

Each API slice allows [additional endpoint definitions to be injected at runtime](../../usage/code-splitting.mdx) after the initial API slice has been defined. This can be beneficial for apps that may have _many_ endpoints.

The individual API slice endpoint definitions can also be split across multiple files. This is primarily useful for working with API slices that were [code-generated from an API schema file](../../usage/code-generation.mdx), allowing you to add additional custom behavior and configuration to a set of automatically-generated endpoint definitions.

Each API slice object has `injectEndpoints` and `enhanceEndpoints` functions to support these use cases.

:::info API Reference

- [API Slices: Code Splitting and Generation](./code-splitting.mdx)

:::

## API Slice Utilities

The `util` field includes various utility functions that can be used to manage the cache, including
manually updating query cache data, triggering pre-fetching of data, manually invalidating tags,
and manually resetting the api state, as well as other utility functions that can be used in
various scenarios, including SSR.

:::info API Reference

- [API Slices: Utilities](./api-slice-utils.mdx)

:::

## Internal Actions

The `internalActions` field contains a set of additional thunks that are used for internal behavior, such as managing updates based on focus.

## React Hooks

The core RTK Query `createApi` method is UI-agnostic, in the same way that the Redux core library and Redux Toolkit are UI-agnostic. They are all plain JS logic that can be used anywhere.

However, RTK Query also provides the ability to auto-generate React hooks for each of your endpoints. Since this specifically depends on React itself, RTK Query provides an alternate entry point that exposes a customized version of `createApi` that includes that functionality:

```js
import { createApi } from '@reduxjs/toolkit/query/react'
```

If you have used the React-specific version of `createApi`, the generated `Api` slice structure will also contain a set of React hooks. These endpoint hooks are available as `api.endpoints[endpointName].useQuery` or `api.endpoints[endpointName].useMutation`, matching how you defined that endpoint.

The same hooks are also added to the `Api` object itself, and given auto-generated names based on the endpoint name and query/mutation type.

For example, if you had endpoints for `getPosts` and `updatePost`, these options would be available:

```ts title="Generated React Hook names" no-transpile
// Hooks attached to the endpoint definition
const { data } = api.endpoints.getPosts.useQuery()
const { data } = api.endpoints.updatePost.useMutation()

// Same hooks, but given unique names and attached to the API slice object
const { data } = api.useGetPostsQuery()
const [updatePost] = api.useUpdatePostMutation()
```

The React-specific version of `createApi` also generates a `usePrefetch` hook, attached to the `Api` object, which can be used to initiate fetching data ahead of time.

:::info API Reference

- [API Slices: React Hooks](./hooks.mdx)

:::

# API Slices: Redux Integration

Internally, `createApi` will call [the Redux Toolkit `createSlice` API](https://redux-toolkit.js.org/api/createSlice) to generate a slice reducer and corresponding action creators with the appropriate logic for caching fetched data. It also automatically generates a custom Redux middleware that manages subscription counts and cache lifetimes.

The generated slice reducer and the middleware both need to be added to your Redux store setup in `configureStore` in order to work correctly:

```ts title="src/store.ts"
// file: src/services/pokemon.ts noEmit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: () => ({}),
})

// file: src/store.ts
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

// configure listeners using the provided defaults
setupListeners(store.dispatch)
```

## `reducerPath`

```ts no-transpile
reducerPath: string
```

Contains the `reducerPath` option provided to `createApi`. Use this as the root state key when adding the `reducer` function to the store so that the rest of the generated API logic can find the state correctly.

## `reducer`

```ts no-transpile
reducer: Reducer
```

A standard Redux slice reducer function containing the logic for updating the cached data. Add this to the Redux store using the `reducerPath` you provided as the root state key.

## `middleware`

```ts no-transpile
middleware: Middleware
```

A custom Redux middleware that contains logic for managing caching, invalidation, subscriptions, polling, and more. Add this to the store setup after other middleware.

# API Slices: Endpoints

The API slice object will have an `endpoints` field inside. This section maps the endpoint names you provided to `createApi` to the core Redux logic (thunks and selectors) used to trigger data fetches and read cached data for that endpoint. If you're using the React-specific version of `createApi`, each endpoint definition will also contain the auto-generated React hooks for that endpoint.

Each endpoint structure contains the following fields:

```ts no-transpile
type EndpointLogic = {
  initiate: InitiateRequestThunk
  select: CreateCacheSelectorFactory
  matchPending: Matcher<PendingAction>
  matchFulfilled: Matcher<FulfilledAction>
  matchRejected: Matcher<RejectedAction>
}
```

## `initiate`

#### Signature

```ts no-transpile
type InitiateRequestThunk = StartQueryActionCreator | StartMutationActionCreator;

type StartQueryActionCreator = (
  arg:any,
  options?: StartQueryActionCreatorOptions
) => ThunkAction<QueryActionCreatorResult, any, any, AnyAction>;

type StartMutationActionCreator<D extends MutationDefinition<any, any, any, any>> = (
  arg: any
  options?: StartMutationActionCreatorOptions
) => ThunkAction<MutationActionCreatorResult<D>, any, any, AnyAction>;

type SubscriptionOptions = {
  /**
   * How frequently to automatically re-fetch data (in milliseconds). Defaults to `0` (off).
   */
  pollingInterval?: number;
  /**
   * Defaults to `false`. This setting allows you to control whether RTK Query will try to refetch all subscribed queries after regaining a network connection.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   *
   * Note: requires `setupListeners` to have been called.
   */
  refetchOnReconnect?: boolean;
  /**
   * Defaults to `false`. This setting allows you to control whether RTK Query will try to refetch all subscribed queries after the application window regains focus.
   *
   * If you specify this option alongside `skip: true`, this **will not be evaluated** until `skip` is false.
   *
   * Note: requires `setupListeners` to have been called.
   */
  refetchOnFocus?: boolean;
};

interface StartQueryActionCreatorOptions {
  subscribe?: boolean;
  forceRefetch?: boolean | number;
  subscriptionOptions?: SubscriptionOptions;
}

interface StartMutationActionCreatorOptions {
  /**
   * If this mutation should be tracked in the store.
   * If you just want to manually trigger this mutation using `dispatch` and don't care about the
   * result, state & potential errors being held in store, you can set this to false.
   * (defaults to `true`)
   */
  track?: boolean;
}
```

#### Description

A Redux thunk action creator that you can dispatch to trigger data fetch queries or mutations.

React Hooks users will most likely never need to use these directly, as the hooks automatically dispatch these actions as needed.

:::note Usage of actions outside of React Hooks
When dispatching an action creator, you're responsible for storing a reference to the promise it returns in the event that you want to update that specific subscription. Also, you have to manually unsubscribe once your component unmounts. To get an idea of what that entails, see the [Svelte Example](../../usage/examples.mdx#svelte) or the [React Class Components Example](../../usage/examples.mdx#react-class-components)
:::

#### Example

```tsx title="initiate query example"
import { useState } from 'react'
import { useAppDispatch } from './store/hooks'
import { api } from './services/api'

function App() {
  const dispatch = useAppDispatch()
  const [postId, setPostId] = useState<number>(1)

  useEffect(() => {
    // highlight-start
    // Add a subscription
    const result = dispatch(api.endpoints.getPost.initiate(postId))

    // Return the `unsubscribe` callback to be called in the `useEffect` cleanup step
    return result.unsubscribe
    // highlight-end
  }, [dispatch, postId])

  return (
    <div>
      <div>Initiate query example</div>
    </div>
  )
}
```

```tsx title="initiate mutation example"
import { useState } from 'react'
import { useAppDispatch } from './store/hooks'
import { api, Post } from './services/api'

function App() {
  const dispatch = useAppDispatch()
  const [newPost, setNewPost] = useState<Omit<Post, 'id'>>({ name: 'Ash' })

  function handleClick() {
    // highlight-start
    // Trigger a mutation
    // The `track` property can be set `false` in situations where we aren't
    // interested in the result of the mutation
    dispatch(api.endpoints.addPost.initiate(newPost), { track: false })
    // highlight-end
  }

  return (
    <div>
      <div>Initiate mutation example</div>
      <button onClick={handleClick}>Add post</button>
    </div>
  )
}
```

## `select`

#### Signature

```ts no-transpile
type CreateCacheSelectorFactory =
  | QueryResultSelectorFactory
  | MutationResultSelectorFactory

type QueryResultSelectorFactory = (
  queryArg: QueryArg | SkipToken
) => (state: RootState) => QueryResultSelectorResult<Definition>

type MutationResultSelectorFactory<
  Definition extends MutationDefinition<any, any, any, any>,
  RootState
> = (
  requestId: string | SkipToken
) => (state: RootState) => MutationSubState<Definition> & RequestStatusFlags

type SkipToken = typeof Symbol
```

#### Description

A function that accepts a cache key argument, and generates a new memoized selector for reading cached data for this endpoint using the given cache key. The generated selector is memoized using [Reselect's `createSelector`](https://redux-toolkit.js.org/api/createSelector).

When selecting mutation results rather than queries, the function accepts a request ID instead.

RTKQ defines a `Symbol` named `skipToken` internally. If `skipToken` is passed as the query argument to these selectors, the selector will return a default uninitialized state. This can be used to avoid returning a value if a given query is supposed to be disabled.

React Hooks users will most likely never need to use these directly, as the hooks automatically use these selectors as needed.

:::caution

Each call to `.select(someCacheKey)` returns a _new_ selector function instance. In order for memoization to work correctly, you should create a given selector function once per cache key and reuse that selector function instance, rather than creating a new selector instance each time.

:::

#### Example

```tsx title="select query example"
import { useState, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { api } from './services/api'

function App() {
  const dispatch = useAppDispatch()
  const [postId, setPostId] = useState(1)
  // highlight-start
  // useMemo is used to only call `.select()` when required.
  // Each call will create a new selector function instance
  const selectPost = useMemo(() => api.endpoints.getPost.select(postId), [
    postId,
  ])
  const { data, isLoading } = useAppSelector(selectPost)
  // highlight-end

  useEffect(() => {
    // Add a subscription
    const result = dispatch(api.endpoints.getPost.initiate(postId))

    // Return the `unsubscribe` callback to be called in the cleanup step
    return result.unsubscribe
  }, [dispatch, postId])

  if (isLoading) return <div>Loading post...</div>

  return (
    <div>
      <div>Initiate query example</div>
      <div>Post name: {data.name}</div>
    </div>
  )
}
```

```tsx title="select mutation example"
import { useState, useMemo } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { api } from './services/api'

function App() {
  const dispatch = useAppDispatch()
  const [newPost, setNewPost] = useState({ name: 'Ash' })
  const [requestId, setRequestId] = useState<typeof skipToken | string>(
    skipToken
  )
  // highlight-start
  // useMemo is used to only call `.select(..)` when required.
  // Each call will create a new selector function instance
  const selectMutationResult = useMemo(
    () => api.endpoints.addPost.select(requestId),
    [requestId]
  )
  const { isLoading } = useAppSelector(selectMutationResult)
  // highlight-end

  function handleClick() {
    // Trigger a mutation
    const result = dispatch(api.endpoints.addPost.initiate(newPost))
    // store the requestId to select the mutation result elsewhere
    setRequestId(result.requestId)
  }

  if (isLoading) return <div>Adding post...</div>

  return (
    <div>
      <div>Select mutation example</div>
      <button onClick={handleClick}>Add post</button>
    </div>
  )
}
```

## Matchers

A set of [Redux Toolkit action matching utilities](https://redux-toolkit.js.org/api/matching-utilities) that match the `pending`, `fulfilled`, and `rejected` actions that will be dispatched by this thunk. These allow you to match on Redux actions for that endpoint, such as in `createSlice.extraReducers` or a custom middleware. Those are implemented as follows:

```ts no-transpile
 matchPending: isAllOf(isPending(thunk), matchesEndpoint(endpoint)),
 matchFulfilled: isAllOf(isFulfilled(thunk), matchesEndpoint(endpoint)),
 matchRejected: isAllOf(isRejected(thunk), matchesEndpoint(endpoint)),
```

# API Slices: Code Splitting and Generation

Each API slice allows [additional endpoint definitions to be injected at runtime](../../usage/code-splitting.mdx) after the initial API slice has been defined. This can be beneficial for apps that may have _many_ endpoints.

The individual API slice endpoint definitions can also be split across multiple files. This is primarily useful for working with API slices that were [code-generated from an API schema file](../../usage/code-generation.mdx), allowing you to add additional custom behavior and configuration to a set of automatically-generated endpoint definitions.

Each API slice object has `injectEndpoints` and `enhanceEndpoints` functions to support these use cases.

## `injectEndpoints`

#### Signature

```ts no-transpile
const injectEndpoints = (endpointOptions: InjectedEndpointOptions) =>
  EnhancedApiSlice

interface InjectedEndpointOptions {
  endpoints: (build: EndpointBuilder) => NewEndpointDefinitions
  overrideExisting?: boolean
}
```

#### Description

Accepts an options object containing the same `endpoints` builder callback you would pass to [`createApi.endpoints`](../createApi.mdx#endpoints). Any endpoint definitions defined using that builder will be merged into the existing endpoint definitions for this API slice using a shallow merge, so any new endpoint definitions will override existing endpoints with the same name.

Returns an updated and enhanced version of the API slice object, containing the combined endpoint definitions.

The `overrideExisting` flag controls a development-only warning that notifies you if there is a name clash between endpoint definitions. When set to `true`, the warning will not be printed.

This method is primarily useful for code splitting and hot reloading.

## `enhanceEndpoints`

#### Signature

```ts no-transpile
const enhanceEndpoints = (endpointOptions: EnhanceEndpointsOptions) =>
  EnhancedApiSlice

interface EnhanceEndpointsOptions {
  addTagTypes?: readonly string[]
  endpoints?: Record<string, Partial<EndpointDefinition>>
}
```

#### Description

Any provided tag types or endpoint definitions will be merged into the existing endpoint definitions for this API slice. Unlike `injectEndpoints`, the partial endpoint definitions will not _replace_ existing definitions, but are rather merged together on a per-definition basis (ie, `Object.assign(existingEndpoint, newPartialEndpoint)`).

Returns an updated and enhanced version of the API slice object, containing the combined endpoint definitions.

This is primarily useful for taking an API slice object that was code-generated from an API schema file like OpenAPI, and adding additional specific hand-written configuration for cache invalidation management on top of the generated endpoint definitions.

# API Slices: Utilities

The API slice object includes various utilities that can be used for cache management,
such as implementing [optimistic updates](../../usage/manual-cache-updates.mdx#optimistic-updates),
as well implementing [server side rendering](../../usage/server-side-rendering.mdx).

These are included in a `util` field inside the slice object.

### `updateQueryData`

#### Signature

```ts no-transpile
const updateQueryData = (
  endpointName: string,
  args: any,
  updateRecipe: (draft: Draft<CachedState>) => void
) => ThunkAction<PatchCollection, PartialState, any, AnyAction>;

interface PatchCollection {
  patches: Patch[];
  inversePatches: Patch[];
  undo: () => void;
}
```

- **Parameters**
  - `endpointName`: a string matching an existing endpoint name
  - `args`: an argument matching that used for a previous query call, used to determine which cached dataset needs to be updated
  - `updateRecipe`: an Immer `produce` callback that can apply changes to the cached state

#### Description

A Redux thunk action creator that, when dispatched, creates and applies a set of JSON diff/patch objects to the current state. This immediately updates the Redux state with those changes.

The thunk action creator accepts three arguments: the name of the endpoint we are updating (such as `'getPost'`), any relevant query arguments, and a callback function. The callback receives an Immer-wrapped `draft` of the current state, and may modify the draft to match the expected results after the mutation completes successfully.

The thunk returns an object containing `{patches: Patch[], inversePatches: Patch[], undo: () => void}`. The `patches` and `inversePatches` are generated using Immer's [`produceWithPatches` method](https://immerjs.github.io/immer/patches).

This is typically used as the first step in implementing optimistic updates. The generated `inversePatches` can be used to revert the updates by calling `dispatch(patchQueryData(endpointName, args, inversePatches))`. Alternatively, the `undo` method can be called directly to achieve the same effect.

Note that the first two arguments (`endpointName` and `args`) are used to determine which existing
cache entry to update. If no existing cache entry is found, the `updateRecipe` callback will not run.

#### Example 1

```ts no-transpile
const patchCollection = dispatch(
  api.util.updateQueryData('getPosts', undefined, (draftPosts) => {
    draftPosts.push({ id: 1, name: 'Teddy' })
  })
)
```

In the example above, `'getPosts'` is provided for the `endpointName`, and `undefined` is provided
for `args`. This will match a query cache key of `'getPosts(undefined)'`.

i.e. it will match a cache entry that may have been created via any of the following calls:

```ts no-transpile
api.endpoints.getPosts.useQuery()

useGetPostsQuery()

useGetPostsQuery(undefined, { ...options })

dispatch(api.endpoints.getPosts.initiate())

dispatch(api.endpoints.getPosts.initiate(undefined, { ...options }))
```

#### Example 2

```ts no-transpile
const patchCollection = dispatch(
  api.util.updateQueryData('getPostById', 1, (draftPost) => {
    draftPost.name = 'Lilly'
  })
)
```

In the example above, `'getPostById'` is provided for the `endpointName`, and `1` is provided
for `args`. This will match a query cache key of `'getPostById(1)'`.

i.e. it will match a cache entry that may have been created via any of the following calls:

```ts no-transpile
api.endpoints.getPostById.useQuery(1)

useGetPostByIdQuery(1)

useGetPostByIdQuery(1, { ...options })

dispatch(api.endpoints.getPostById.initiate(1))

dispatch(api.endpoints.getPostById.initiate(1, { ...options }))
```

### `patchQueryData`

#### Signature

```ts no-transpile
const patchQueryData = (
  endpointName: string,
  args: any
  patches: Patch[]
) => ThunkAction<void, PartialState, any, AnyAction>;
```

- **Parameters**
  - `endpointName`: a string matching an existing endpoint name
  - `args`: a cache key, used to determine which cached dataset needs to be updated
  - `patches`: an array of patches (or inverse patches) to apply to cached state. These would typically be obtained from the result of dispatching [`updateQueryData`](#updatequerydata)

#### Description

A Redux thunk action creator that applies a JSON diff/patch array to the cached data for a given query result. This immediately updates the Redux state with those changes.

The thunk action creator accepts three arguments: the name of the endpoint we are updating (such as `'getPost'`), any relevant query arguments, and a JSON diff/patch array as produced by Immer's `produceWithPatches`.

This is typically used as the second step in implementing optimistic updates. If a request fails, the optimistically-applied changes can be reverted by dispatching `patchQueryData` with the `inversePatches` that were generated by `updateQueryData` earlier.

In cases where it is desired to simply revert the previous changes, it may be preferable to call the `undo` method returned from dispatching `updateQueryData` instead.

#### Example

```ts no-transpile
const patchCollection = dispatch(
  api.util.updateQueryData('getPosts', undefined, (draftPosts) => {
    draftPosts.push({ id: 1, name: 'Teddy' })
  })
)

// later
dispatch(
  api.util.patchQueryData('getPosts', undefined, patchCollection.inversePatches)
)

// or
patchCollection.undo()
```

### `prefetch`

#### Signature

```ts no-transpile
type PrefetchOptions = { ifOlderThan?: false | number } | { force?: boolean };

const prefetch = (
  endpointName: string,
  arg: any,
  options: PrefetchOptions
) => ThunkAction<void, any, any, AnyAction>;
```

- **Parameters**

  - `endpointName`: a string matching an existing endpoint name
  - `args`: a cache key, used to determine which cached dataset needs to be updated
  - `options`: options to determine whether the request should be sent for a given situation:
    - `ifOlderThan`: if specified, only runs the query if the difference between `new Date()` and the last`fulfilledTimeStamp` is greater than the given value (in seconds)
    - `force`: if `true`, it will ignore the `ifOlderThan` value if it is set and the query will be run even if it exists in the cache.

#### Description

A Redux thunk action creator that can be used to manually trigger pre-fetching of data.

The thunk action creator accepts three arguments: the name of the endpoint we are updating (such as `'getPost'`), any relevant query arguments, and a set of options used to determine if the data actually should be re-fetched based on cache staleness.

React Hooks users will most likely never need to use this directly, as the `usePrefetch` hook will dispatch the thunk action creator result internally as needed when you call the prefetching function supplied by the hook.

#### Example

```ts no-transpile
dispatch(api.util.prefetch('getPosts', undefined, { force: true }))
```

### `invalidateTags`

#### Signature

```ts no-transpile
const invalidateTags = (
  tags: Array<TagTypes | FullTagDescription<TagTypes>>
) => ({
  type: string,
  payload: tags,
})
```

- **Parameters**
  - `tags`: an array of tags to be invalidated, where the provided `TagType` is one of the strings provided to the [`tagTypes`](../createApi.mdx#tagtypes) property of the api. e.g.
    - `[TagType]`
    - `[{ type: TagType }]`
    - `[{ type: TagType, id: number | string }]`

#### Description

A Redux action creator that can be used to manually invalidate cache tags for [automated re-fetching](../../usage/automated-refetching.mdx).

The action creator accepts one argument: the cache tags to be invalidated. It returns an action with those tags as a payload, and the corresponding `invalidateTags` action type for the api.

Dispatching the result of this action creator will [invalidate](../../usage/automated-refetching.mdx#invalidating-cache-data) the given tags, causing queries to automatically re-fetch if they are subscribed to cache data that [provides](../../usage/automated-refetching.mdx#providing-cache-data) the corresponding tags.

#### Example

```ts no-transpile
dispatch(api.util.invalidateTags(['Post']))
dispatch(api.util.invalidateTags([{ type: 'Post', id: 1 }]))
dispatch(
  api.util.invalidateTags([
    { type: 'Post', id: 1 },
    { type: 'Post', id: 'LIST' },
  ])
)
```

### `resetApiState`

#### Signature

```ts no-transpile
const resetApiState = () => ({
  type: string,
  payload: undefined,
})
```

#### Description

A Redux action creator that can be dispatched to manually reset the api state completely. This will immediately remove all existing cache entries, and all queries will be considered 'uninitialized'.

Note that [hooks](./hooks.mdx) also track state in local component state and might not fully be reset by `resetApiState`.

#### Example

```ts no-transpile
dispatch(api.util.resetApiState())
```

## `getRunningOperationPromises`

#### Signature

```ts no-transpile
getRunningOperationPromises: () => Array<Promise<unknown>>
```

#### Description

A function that returns all promises for running queries and mutations.

This is useful for SSR scenarios to await everything triggered in any way, including via hook calls,
or manually dispatching `initiate` actions.

```ts no-transpile title="Awaiting all currently running queries & mutations example"
await Promise.all(api.util.getRunningOperationPromises())
```

## `getRunningOperationPromise`

#### Signature

```ts no-transpile
getRunningOperationPromise: <EndpointName extends QueryKeys<Definitions>>(
  endpointName: EndpointName,
  args: QueryArgFrom<Definitions[EndpointName]>
) =>
  | QueryActionCreatorResult<Definitions[EndpointName]>
  | undefined

getRunningOperationPromise: <EndpointName extends MutationKeys<Definitions>>(
  endpointName: EndpointName,
  fixedCacheKeyOrRequestId: string
) =>
  | MutationActionCreatorResult<Definitions[EndpointName]>
  | undefined
```

#### Description

A function that returns a single promise for a given endpoint name + argument combination,
if it is currently running. If it is not currently running, the function returns `undefined`.

When used with mutation endpoints, it accepts a [fixed cache key](./hooks.mdx#signature-1)
or request ID rather than the argument.

This is primarily added to add experimental support for suspense in the future.
It enables writing custom hooks that look up if RTK Query has already got a running promise
for a certain endpoint/argument combination, and retrieving that promise to `throw` it.

# API Slices: React Hooks

## Hooks Overview

The core RTK Query `createApi` method is UI-agnostic, in the same way that the Redux core library and Redux Toolkit are UI-agnostic. They are all plain JS logic that can be used anywhere.

However, RTK Query also provides the ability to auto-generate React hooks for each of your endpoints. Since this specifically depends on React itself, RTK Query provides an alternate entry point that exposes a customized version of `createApi` that includes that functionality:

```ts no-transpile
import { createApi } from '@reduxjs/toolkit/query/react'
```

If you have used the React-specific version of `createApi`, the generated `Api` slice structure will also contain a set of React hooks. The primary endpoint hooks are available as `api.endpoints[endpointName].useQuery` or `api.endpoints[endpointName].useMutation`, matching how you defined that endpoint.

The same hooks are also added to the `Api` object itself, and given auto-generated names based on the endpoint name and query/mutation type.

For example, if you had endpoints for `getPosts` and `updatePost`, these options would be available:

```ts title="Generated React Hook names" no-transpile
// Hooks attached to the endpoint definition
const { data } = api.endpoints.getPosts.useQuery()
const [updatePost, { data }] = api.endpoints.updatePost.useMutation()

// Same hooks, but given unique names and attached to the API slice object
const { data } = api.useGetPostsQuery()
const [updatePost, { data }] = api.useUpdatePostMutation()
```

The general format is `use(Endpointname)(Query|Mutation)` - `use` is prefixed, the first letter of your endpoint name is capitalized, then `Query` or `Mutation` is appended depending on the type.

RTK Query provides additional hooks for more advanced use-cases, although not all are generated directly on the `Api` object as well. The full list of hooks generated in the React-specific version of `createApi` is as follows:

- [`useQuery`](#usequery) (endpoint-specific, also generated on the `Api` object)
- [`useMutation`](#usemutation) (endpoint-specific, also generated on the `Api` object)
- [`useQueryState`](#usequerystate) (endpoint-specific)
- [`useQuerySubscription`](#usequerysubscription) (endpoint-specific)
- [`useLazyQuery`](#uselazyquery) (endpoint-specific, also generated on the `Api` object)
- [`useLazyQuerySubscription`](#uselazyquerysubscription) (endpoint-specific)
- [`usePrefetch`](#useprefetch) (endpoint-agnostic)

For the example above, the full set of generated hooks for the api would be like so:

```ts title="Generated React Hooks" no-transpile
/* Hooks attached to the `getPosts` query endpoint definition */
api.endpoints.getPosts.useQuery(arg, options)
api.endpoints.getPosts.useQueryState(arg, options)
api.endpoints.getPosts.useQuerySubscription(arg, options)
api.endpoints.getPosts.useLazyQuery(options)
api.endpoints.getPosts.useLazyQuerySubscription(options)

/* Hooks attached to the `updatePost` mutation endpoint definition */
api.endpoints.updatePost.useMutation(options)

/* Hooks attached to the `Api` object */
api.useGetPostsQuery(arg, options) // same as api.endpoints.getPosts.useQuery
api.useLazyGetPostsQuery(options) // same as api.endpoints.getPosts.useLazyQuery
api.useUpdatePostMutation(options) // same as api.endpoints.updatePost.useMutation
api.usePrefetch(endpointName, options)
```

### Feature Comparison

The provided hooks have a degree of feature overlap in order to provide options optimized for a given situation. The table below provides a comparison of the core features for each hook.

<table style={{ 'overflow-y': 'hidden' }}>
  <thead>
    <tr style={{ height: '250px', border: 'none' }}>
      <th style={{ width: '300px' }}>Feature</th>
      <th style={{ 'white-space': 'nowrap', border: 'none' }}>
        <div
          style={{
            transform: 'translate(0px, 51px) rotate(315deg)',
            width: '20px',
          }}
        >
          <a href="#usequery">useQuery</a>
        </div>
      </th>
      <th style={{ 'white-space': 'nowrap', border: 'none' }}>
        <div
          style={{
            transform: 'translate(0px, 51px) rotate(315deg)',
            width: '20px',
          }}
        >
          <a href="#usemutation">useMutation</a>
        </div>
      </th>
      <th style={{ 'white-space': 'nowrap', border: 'none' }}>
        <div
          style={{
            transform: 'translate(0px, 51px) rotate(315deg)',
            width: '20px',
          }}
        >
          <a href="#usequerystate">useQueryState</a>
        </div>
      </th>
      <th style={{ 'white-space': 'nowrap', border: 'none' }}>
        <div
          style={{
            transform: 'translate(0px, 51px) rotate(315deg)',
            width: '20px',
          }}
        >
          <a href="#usequerysubscription">useQuerySubscription</a>
        </div>
      </th>
      <th style={{ 'white-space': 'nowrap', border: 'none' }}>
        <div
          style={{
            transform: 'translate(0px, 51px) rotate(315deg)',
            width: '20px',
          }}
        >
          <a href="#uselazyquery">useLazyQuery</a>
        </div>
      </th>
      <th style={{ 'white-space': 'nowrap', border: 'none' }}>
        <div
          style={{
            transform: 'translate(0px, 51px) rotate(315deg)',
            width: '20px',
          }}
        >
          <a href="#uselazyquerysubscription">useLazyQuerySubscription</a>
        </div>
      </th>
      <th style={{ 'white-space': 'nowrap', border: 'none' }}>
        <div
          style={{
            transform: 'translate(0px, 51px) rotate(315deg)',
            width: '20px',
          }}
        >
          <a href="#useprefetch">usePrefetch</a>
        </div>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style={{ width: '330px' }}>Automatically triggers query requests</td>
      <td>✔️</td>
      <td></td>
      <td></td>
      <td>✔️</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style={{ width: '330px' }}>
        Allows manually triggering query requests
      </td>
      <td>✔️</td>
      <td></td>
      <td></td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
    </tr>
    <tr>
      <td style={{ width: '330px' }}>
        Allows manually triggering mutation requests
      </td>
      <td></td>
      <td>✔️</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style={{ width: '330px' }}>
        Subscribes a component to keep cached data in the store
      </td>
      <td>✔️</td>
      <td>✔️</td>
      <td></td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td></td>
    </tr>
    <tr>
      <td style={{ width: '330px' }}>
        Returns request status and cached data from the store
      </td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td></td>
      <td>✔️</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style={{ width: '330px' }}>
        Re-renders as request status and data become available
      </td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td></td>
      <td>✔️</td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td style={{ width: '330px' }}>
        Accepts polling/re-fetching options to trigger automatic re-fetches
      </td>
      <td>✔️</td>
      <td></td>
      <td></td>
      <td>✔️</td>
      <td>✔️</td>
      <td>✔️</td>
      <td></td>
    </tr>
  </tbody>
</table>

## `useQuery`

```ts title="Accessing a useQuery hook" no-transpile
const useQueryResult = api.endpoints.getPosts.useQuery(arg, options)
// or
const useQueryResult = api.useGetPostsQuery(arg, options)
```

#### Signature

```ts no-transpile
type UseQuery = (
  arg: any | SkipToken,
  options?: UseQueryOptions
) => UseQueryResult

type UseQueryOptions = {
  pollingInterval?: number
  refetchOnReconnect?: boolean
  refetchOnFocus?: boolean
  skip?: boolean
  refetchOnMountOrArgChange?: boolean | number
  selectFromResult?: (result: UseQueryStateDefaultResult) => any
}

type UseQueryResult<T> = {
  // Base query state
  originalArgs?: unknown // Arguments passed to the query
  data?: T // The latest returned result regardless of hook arg, if present
  currentData?: T // The latest returned result for the current hook arg, if present
  error?: unknown // Error result if present
  requestId?: string // A string generated by RTK Query
  endpointName?: string // The name of the given endpoint for the query
  startedTimeStamp?: number // Timestamp for when the query was initiated
  fulfilledTimeStamp?: number // Timestamp for when the query was completed

  // Derived request status booleans
  isUninitialized: boolean // Query has not started yet.
  isLoading: boolean // Query is currently loading for the first time. No data yet.
  isFetching: boolean // Query is currently fetching, but might have data from an earlier request.
  isSuccess: boolean // Query has data from a successful load.
  isError: boolean // Query is currently in an "error" state.

  refetch: () => void // A function to force refetch the query
}
```

- **Parameters**
  - `arg`: The query argument to be used in constructing the query itself, and as a cache key for the query.
    You can also pass in `skipToken` here as an alternative way of skipping the query, see [skipToken](#skiptoken)
  - `options`: A set of options that control the fetching behavior of the hook
- **Returns**
  - A query result object containing the current loading state, the actual data or error returned from the API call, metadata about the request, and a function to `refetch` the data. Can be customized with `selectFromResult`

#### Description

[summary](docblock://query/react/buildHooks.ts?token=UseQuery)

#### `skipToken`

[summary](docblock://query/core/buildSelectors.ts?token=skipToken)

See also [Skipping queries with TypeScript using `skipToken`](../../usage-with-typescript.mdx#skipping-queries-with-typescript-using-skiptoken)

## `useMutation`

```ts title="Accessing a useMutation hook" no-transpile
const useMutationResult = api.endpoints.updatePost.useMutation(options)
// or
const useMutationResult = api.useUpdatePostMutation(options)
```

#### Signature

```ts no-transpile
type UseMutation = (
  options?: UseMutationStateOptions
) => [UseMutationTrigger, UseMutationResult | SelectedUseMutationResult]

type UseMutationStateOptions = {
  // A method to determine the contents of `UseMutationResult`
  selectFromResult?: (result: UseMutationStateDefaultResult) => any
  // A string used to enable shared results across hook instances which have the same key
  fixedCacheKey?: string
}

type UseMutationTrigger<T> = (arg: any) => Promise<
  { data: T } | { error: BaseQueryError | SerializedError }
> & {
  requestId: string // A string generated by RTK Query
  abort: () => void // A method to cancel the mutation promise
  unwrap: () => Promise<T> // A method to unwrap the mutation call and provide the raw response/error
  reset: () => void // A method to manually unsubscribe from the mutation call and reset the result to the uninitialized state
}

type UseMutationResult<T> = {
  // Base query state
  originalArgs?: unknown // Arguments passed to the latest mutation call. Not available if using the `fixedCacheKey` option
  data?: T // Returned result if present
  error?: unknown // Error result if present
  endpointName?: string // The name of the given endpoint for the mutation
  fulfilledTimestamp?: number // Timestamp for when the mutation was completed

  // Derived request status booleans
  isUninitialized: boolean // Mutation has not been fired yet
  isLoading: boolean // Mutation has been fired and is awaiting a response
  isSuccess: boolean // Mutation has data from a successful call
  isError: boolean // Mutation is currently in an "error" state
  startedTimeStamp?: number // Timestamp for when the latest mutation was initiated

  reset: () => void // A method to manually unsubscribe from the mutation call and reset the result to the uninitialized state
}
```

:::tip

The generated `UseMutation` hook will cause a component to re-render by default after the trigger callback is fired, as it affects the properties of the result. If you want to call the trigger but don't care about subscribing to the result with the hook, you can use the `selectFromResult` option to limit the properties that the hook cares about.

Returning a completely empty object will mean that any individual mutation call will cause only one re-render at most, e.g.

```ts no-transpile
selectFromResult: () => ({})
```

:::

- **Parameters**

  - `options`: A set of options that control the subscription behavior of the hook:
    - `selectFromResult`: A callback that can be used to customize the mutation result returned as the second item in the tuple
    - `fixedCacheKey`: An optional string used to enable shared results across hook instances

- **Returns**: A tuple containing:
  - `trigger`: A function that triggers an update to the data based on the provided argument. The trigger function returns a promise with the properties shown above that may be used to handle the behavior of the promise
  - `mutationState`: A query status object containing the current loading state and metadata about the request, or the values returned by the `selectFromResult` option where applicable.
    Additionally, this object will contain
    - a `reset` method to reset the hook back to it's original state and remove the current result from the cache
    - an `originalArgs` property that contains the argument passed to the last call of the `trigger` function.

#### Description

[summary](docblock://query/react/buildHooks.ts?token=UseMutation)

## `useQueryState`

```ts title="Accessing a useQuery hook" no-transpile
const useQueryStateResult = api.endpoints.getPosts.useQueryState(arg, options)
```

#### Signature

```ts no-transpile
type UseQueryState = (
  arg: any | SkipToken,
  options?: UseQueryStateOptions
) => UseQueryStateResult | SelectedQueryStateResult

type UseQueryStateOptions = {
  skip?: boolean
  selectFromResult?: (result: UseQueryStateDefaultResult) => any
}

type UseQueryStateResult<T> = {
  // Base query state
  originalArgs?: unknown // Arguments passed to the query
  data?: T // The latest returned result regardless of hook arg, if present
  currentData?: T // The latest returned result for the current hook arg, if present
  error?: unknown // Error result if present
  requestId?: string // A string generated by RTK Query
  endpointName?: string // The name of the given endpoint for the query
  startedTimeStamp?: number // Timestamp for when the query was initiated
  fulfilledTimeStamp?: number // Timestamp for when the query was completed

  isUninitialized: false // Query has not started yet.
  isLoading: false // Query is currently loading for the first time. No data yet.
  isFetching: false // Query is currently fetching, but might have data from an earlier request.
  isSuccess: false // Query has data from a successful load.
  isError: false // Query is currently in an "error" state.
}
```

- **Parameters**

  - `arg`: The argument passed to the query defined in the endpoint.
    You can also pass in `skipToken` here as an alternative way of skipping the selection, see [skipToken](#skiptoken)
  - `options`: A set of options that control the return value for the hook

- **Returns**
  - A query result object containing the current loading state, the actual data or error returned from the API call and metadata about the request. Can be customized with `selectFromResult`

#### Description

[summary](docblock://query/react/buildHooks.ts?token=UseQueryState)

## `useQuerySubscription`

```ts title="Accessing a useQuerySubscription hook" no-transpile
const { refetch } = api.endpoints.getPosts.useQuerySubscription(arg, options)
```

#### Signature

```ts no-transpile
type UseQuerySubscription = (
  arg: any | SkipToken,
  options?: UseQuerySubscriptionOptions
) => UseQuerySubscriptionResult

type UseQuerySubscriptionOptions = {
  skip?: boolean
  refetchOnMountOrArgChange?: boolean | number
  pollingInterval?: number
  refetchOnReconnect?: boolean
  refetchOnFocus?: boolean
}

type UseQuerySubscriptionResult = {
  refetch: () => void // A function to force refetch the query
}
```

- **Parameters**

  - `arg`: The argument passed to the query defined in the endpoint.
    You can also pass in `skipToken` here as an alternative way of skipping the query, see [skipToken](#skiptoken)
  - `options`: A set of options that control the fetching behaviour of the hook

- **Returns**
  - An object containing a function to `refetch` the data

#### Description

[summary](docblock://query/react/buildHooks.ts?token=UseQuerySubscription)

## `useLazyQuery`

```ts title="Accessing a useLazyQuery hook" no-transpile
const [trigger, result, lastPromiseInfo] =
  api.endpoints.getPosts.useLazyQuery(options)
// or
const [trigger, result, lastPromiseInfo] = api.useLazyGetPostsQuery(options)
```

#### Signature

```ts no-transpile
type UseLazyQuery = (
  options?: UseLazyQueryOptions
) => [UseLazyQueryTrigger, UseQueryStateResult, UseLazyQueryLastPromiseInfo]

type UseLazyQueryOptions = {
  pollingInterval?: number
  refetchOnReconnect?: boolean
  refetchOnFocus?: boolean
  selectFromResult?: (result: UseQueryStateDefaultResult) => any
}

type UseLazyQueryTrigger<T> = (arg: any, preferCacheValue?: boolean) => Promise<
  QueryResultSelectorResult
> & {
  arg: unknown // Whatever argument was provided to the query
  requestId: string // A string generated by RTK Query
  subscriptionOptions: SubscriptionOptions // The values used for the query subscription
  abort: () => void // A method to cancel the query promise
  unwrap: () => Promise<T> // A method to unwrap the query call and provide the raw response/error
  unsubscribe: () => void // A method used to manually unsubscribe from the query results
  refetch: () => void // A method used to re-run the query. In most cases when using a lazy query, you will never use this and should prefer to call the trigger again.
  updateSubscriptionOptions: (options: SubscriptionOptions) () => void // A method used to update the subscription options (eg. pollingInterval)
}

type UseQueryStateResult<T> = {
  // Base query state
  originalArgs?: unknown // Arguments passed to the query
  data?: T // The latest returned result regardless of trigger arg, if present
  currentData?: T // The latest returned result for the trigger arg, if present
  error?: unknown // Error result if present
  requestId?: string // A string generated by RTK Query
  endpointName?: string // The name of the given endpoint for the query
  startedTimeStamp?: number // Timestamp for when the query was initiated
  fulfilledTimeStamp?: number // Timestamp for when the query was completed

  isUninitialized: false // Query has not started yet.
  isLoading: false // Query is currently loading for the first time. No data yet.
  isFetching: false // Query is currently fetching, but might have data from an earlier request.
  isSuccess: false // Query has data from a successful load.
  isError: false // Query is currently in an "error" state.
}

type UseLazyQueryLastPromiseInfo = {
  lastArg: any
}
```

- **Parameters**

  - `options`: A set of options that control the fetching behavior and returned result value of the hook. Options affecting fetching behavior will only have an effect after the lazy query has been triggered at least once.

- **Returns**: A tuple containing:
  - `trigger`: A function that fetches the corresponding data for the endpoint when called
  - `result`: A query result object containing the current loading state, the actual data or error returned from the API call and metadata about the request. Can be customized with `selectFromResult`
  - `lastPromiseInfo`: An object containing the last argument used to call the trigger function

#### Description

[summary](docblock://query/react/buildHooks.ts?token=UseLazyQuery)

## `useLazyQuerySubscription`

```ts title="Accessing a useLazyQuerySubscription hook" no-transpile
const [trigger, lastArg] =
  api.endpoints.getPosts.useLazyQuerySubscription(options)
```

#### Signature

```ts no-transpile
type UseLazyQuerySubscription = (
  options?: UseLazyQuerySubscriptionOptions
) => [UseLazyQuerySubscriptionTrigger, LastArg]

type UseLazyQuerySubscriptionOptions = {
  pollingInterval?: number
  refetchOnReconnect?: boolean
  refetchOnFocus?: boolean
}

type UseLazyQuerySubscriptionTrigger = (
  arg: any,
  preferCacheValue?: boolean
) => void
```

- **Parameters**

  - `options`: A set of options that control the fetching behavior of the hook. The options will only have an effect after the lazy query has been triggered at least once.

- **Returns**: A tuple containing:
  - `trigger`: A function that fetches the corresponding data for the endpoint when called
  - `lastArg`: The last argument used to call the trigger function

#### Description

[summary](docblock://query/react/buildHooks.ts?token=UseLazyQuerySubscription)

## `usePrefetch`

```ts title="Accessing a usePrefetch hook" no-transpile
const prefetchCallback = api.usePrefetch(endpointName, options)
```

#### Signature

```ts no-transpile
type UsePrefetch = (
  endpointName: string,
  options?: UsePrefetchOptions
) => PrefetchCallback

type UsePrefetchOptions =
  | {
      // If specified, only runs the query if the difference between `new Date()` and the last
      // `fulfilledTimeStamp` is greater than the given value (in seconds)
      ifOlderThan?: false | number
    }
  | {
      // If `force: true`, it will ignore the `ifOlderThan` value if it is set and the query
      // will be run even if it exists in the cache.
      force?: boolean
    }

type PrefetchCallback = (arg: any, options?: UsePrefetchOptions) => void
```

- **Parameters**

  - `endpointName`: The name of the endpoint to prefetch data for
  - `options`: A set of options that control whether the prefetch request should occur

- **Returns**
  - A `prefetch` callback that when called, will initiate fetching the data for the provided endpoint

#### Description

A React hook which can be used to initiate fetching data ahead of time.

#### Features

- Manual control over firing a request to retrieve data