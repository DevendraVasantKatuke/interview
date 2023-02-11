- when to use 'type' vs 'interface':
  - use 'type' when building Applications
  - use 'interface' when building libraries
- 'types':
  - keys may be 'children'
  - values may be: string, number, boolean, {}, {}[], Union
  - styles: React.CSSProperties
  - children: React.ReactNode
  - name?: makes 'name' optional
  - handleClick: () => void
  - handleClick: (e: React.MouseEvent<HRMLButtonElement>) => void
    onClick={props.handleClick} // usage
  - handleClick: (e: React.MouseEvent<HRMLButtonElement>, id: number ) => void
    onClick={e => props.handleClick(e, 1)} // usage
  - handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e) }
- destructuring
  - `const { msgCount = 0 } = props;` default value
  - ({})
## Prerequisites

1. good understanding of [React](https://reactjs.org)
2. familiarity with [TypeScript Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) ([2ality's guide](http://2ality.com/2018/04/type-notation-typescript.html) is helpful. If you’re an absolute beginner in TypeScript, check out [chibicode’s tutorial](https://ts.chibicode.com/todo/).)
3. having read [the TypeScript section in the official React docs](https://reactjs.org/docs/static-type-checking.html#typescript).
4. having read [the React section of the new TypeScript playground](http://www.typescriptlang.org/play/index.html?jsx=2&esModuleInterop=true&e=181#example/typescript-with-react) (optional: also step through the 40+ examples under [the playground's](http://www.typescriptlang.org/play/index.html) Examples section)

This guide will always assume you are starting with the latest TypeScript and React versions. Notes for older versions will be in expandable `<details>` tags.

## VS Code Extensions

- refactoring help https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit
- R+TS Code Snippets (there are a few...)
  - https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript
  - https://www.digitalocean.com/community/tutorials/the-best-react-extension-for-vs-code
- TypeScript official extension https://code.visualstudio.com/docs/languages/typescript

## React + TypeScript Starter Kits

Cloud setups:

- [TypeScript Playground with React](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUKJLHAN5wCuqWAyjMhhYANFx4BRAgSz44AXzhES5Snhi1GjLAA8W8XBAB2qeAGEInQ0KjjtycABsscALxwAFAEpXAPnaM4OANjeABtA0sYUR4Yc0iAXVcxPgEhdwAGT3oGAOTJaXx3L19-BkDAgBMIXE4QLCsAOhhgGCckgAMATQsgh2BcAGssCrgAEjYIqwVmutR27MC5LM0yuEoYTihDD1zAgB4K4AA3H13yvbAfbs5e-qGRiYspuBmsVD2Aekuz-YAjThgMCMcCMpj6gxcbGKLj8MTiVnck3gAGo4ABGTxyU6rcrlMF3OB1H5wT7-QFGbG4z6HE65ZYMOSMIA) just if you are debugging types (and reporting issues), not for running code
- [CodeSandbox](http://ts.react.new) - cloud IDE, boots up super fast
- [Stackblitz](https://stackblitz.com/edit/react-typescript-base) - cloud IDE, boots up super fast

Local dev setups:

- [Next.js](https://nextjs.org/docs/basic-features/typescript): `npx create-next-app -e with-typescript` will create in your current folder
- [Create React App](https://facebook.github.io/create-react-app/docs/adding-typescript): `npx create-react-app name-of-app --template typescript` will create in new folder
- [Vite](https://vitejs.dev/): `npm create vite@latest my-react-ts-app -- --template react-ts`
- [Meteor](https://guide.meteor.com/build-tool.html#typescript): `meteor create --typescript name-of-my-new-typescript-app`
- [Ignite](https://github.com/infinitered/ignite#use-ignite-andross-infinite-red-andross-boilerplate) for React Native: `ignite new myapp`
- [TSDX](https://tsdx.io/): `npx tsdx create mylib` for Creating React+TS _libraries_. (in future: [TurboRepo](https://twitter.com/jaredpalmer/status/1346217789942591488))

<details>
<summary><b>Other tools</b></summary>

Less mature tools still worth checking out:

- [Snowpack](<https://www.snowpack.dev/#create-snowpack-app-(csa)>): `npx create-snowpack-app my-app --template app-template-react-typescript`
- [Docusaurus v2](https://v2.docusaurus.io/docs/installation) with [TypeScript Support](https://v2.docusaurus.io/docs/typescript-support)
- [Parcel](https://v2.parceljs.org/languages/typescript/)
- [JP Morgan's `modular`](https://github.com/jpmorganchase/modular): CRA + TS + Yarn Workspaces toolkit. `yarn create modular-react-app <project-name>`

Manual setup:

- [Basarat's guide](https://github.com/basarat/typescript-react/tree/master/01%20bootstrap) for **manual setup** of React + TypeScript + Webpack + Babel
- In particular, make sure that you have `@types/react` and `@types/react-dom` installed ([Read more about the DefinitelyTyped project if you are unfamiliar](https://definitelytyped.org/))
- There are also many React + TypeScript boilerplates, please see [our Other Resources list](https://react-typescript-cheatsheet.netlify.app/docs/basic/recommended/resources/).

</details>

## Video Tutorial

Have a look at the 7-part "React Typescript Course" video series below for an introduction to TypeScript with React.

<a href="https://www.youtube.com/watch?v=PL1NUl7fQ2I&list=PLG-Mk4wQm9_LyKE5EwoZz2_GGXR-zJ5Ml">
    <img
        width="200px"
        alt="react typescript course video series"
        src="https://i.imgur.com/IIG0Xu9.jpeg"
    />
</a>

---
id: basic_type_example
title: Typing Component Props
---

This is intended as a basic orientation and reference for React developers familiarizing with TypeScript.

## Basic Prop Types Examples

A list of TypeScript types you will likely use in a React+TypeScript app:

```tsx
type AppProps = {
  message: string;
  count: number;
  disabled: boolean;
  /** array of a type! */
  names: string[];
  /** string literals to specify exact string values, with a union type to join them together */
  status: "waiting" | "success";
  /** any object as long as you dont use its properties (NOT COMMON but useful as placeholder) */
  obj: object;
  obj2: {}; // almost the same as `object`, exactly the same as `Object`
  /** an object with any number of properties (PREFERRED) */
  obj3: {
    id: string;
    title: string;
  };
  /** array of objects! (common) */
  objArr: {
    id: string;
    title: string;
  }[];
  /** a dict object with any number of properties of the same type */
  dict1: {
    [key: string]: MyTypeHere;
  };
  dict2: Record<string, MyTypeHere>; // equivalent to dict1
  /** any function as long as you don't invoke it (not recommended) */
  onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  onClick: () => void;
  /** function with named prop (VERY COMMON) */
  onChange: (id: number) => void;
  /** function type syntax that takes an event (VERY COMMON) */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** alternative function type syntax that takes an event (VERY COMMON) */
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  /** an optional prop (VERY COMMON!) */
  optional?: OptionalType;
};
```

Notice we have used the TSDoc `/** comment */` style here on each prop. You can and are encouraged to leave descriptive comments on reusable components. For a fuller example and discussion, see our [Commenting Components](https://react-typescript-cheatsheet.netlify.app/docs/advanced/misc_concerns/#commenting-components) section in the Advanced Cheatsheet.

## Useful React Prop Type Examples

Relevant for components that accept other React components as props.

```tsx
export declare interface AppProps {
  children?: React.ReactNode; // best, accepts everything React can render
  childrenElement: JSX.Element; // A single React element
  style?: React.CSSProperties; // to pass through style props
  onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of event.target
  //  more info: https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase/#wrappingmirroring
  props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element and explicitly not forwarding its ref
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyButtonForwardedRef and explicitly forwarding its ref
}
```

<details>
<summary><b>Small <code>React.ReactNode</code> edge case before React 18</b></summary>

Before the [React 18 type updates](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210), this code typechecked but had a runtime error:

```tsx
type Props = {
  children?: React.ReactNode;
};

function Comp({ children }: Props) {
  return <div>{children}</div>;
}
function App() {
  // Before React 18: Runtime error "Objects are not valid as a React child"
  // After React 18: Typecheck error "Type '{}' is not assignable to type 'ReactNode'"
  return <Comp>{{}}</Comp>;
}
```

This is because `ReactNode` includes `ReactFragment` which allowed type `{}` before React 18.

[Thanks @pomle for raising this.](https://github.com/typescript-cheatsheets/react/issues/357)

</details>

<details>
 <summary><b>JSX.Element vs React.ReactNode?</b></summary>

Quote [@ferdaber](https://github.com/typescript-cheatsheets/react/issues/57): A more technical explanation is that a valid React node is not the same thing as what is returned by `React.createElement`. Regardless of what a component ends up rendering, `React.createElement` always returns an object, which is the `JSX.Element` interface, but `React.ReactNode` is the set of all possible return values of a component.

- `JSX.Element` -> Return value of `React.createElement`
- `React.ReactNode` -> Return value of a component

</details>

[More discussion: Where ReactNode does not overlap with JSX.Element](https://github.com/typescript-cheatsheets/react/issues/129)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Types or Interfaces?

You can use either Types or Interfaces to type Props and State, so naturally the question arises - which do you use?

### TL;DR

Use Interface until You Need Type - [orta](https://twitter.com/orta/status/1356129195835973632?s=20).

### More Advice

Here's a helpful rule of thumb:

- always use `interface` for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via _declaration merging_ if some definitions are missing.

- consider using `type` for your React Component Props and State, for consistency and because it is more constrained.

You can read more about the reasoning behind this rule of thumb in [Interface vs Type alias in TypeScript 2.7](https://medium.com/@martin_hotell/interface-vs-type-alias-in-typescript-2-7-2a8f1777af4c).

The TypeScript Handbook now also includes guidance on [Differences Between Type Aliases and Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces).

> Note: At scale, there are performance reasons to prefer interfaces ([see official Microsoft notes on this](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)) but [take this with a grain of salt](https://news.ycombinator.com/item?id=25201887)

Types are useful for union types (e.g. `type MyType = TypeA | TypeB`) whereas Interfaces are better for declaring dictionary shapes and then `implementing` or `extending` them.

### Useful table for Types vs Interfaces

It's a nuanced topic, don't get too hung up on it. Here's a handy table:

| Aspect                                          | Type | Interface |
| ----------------------------------------------- | :--: | :-------: |
| Can describe functions                          |  ✅  |    ✅     |
| Can describe constructors                       |  ✅  |    ✅     |
| Can describe tuples                             |  ✅  |    ✅     |
| Interfaces can extend it                        |  ⚠️  |    ✅     |
| Classes can extend it                           |  🚫  |    ✅     |
| Classes can implement it (`implements`)         |  ⚠️  |    ✅     |
| Can intersect another one of its kind           |  ✅  |    ⚠️     |
| Can create a union with another one of its kind |  ✅  |    🚫     |
| Can be used to create mapped types              |  ✅  |    🚫     |
| Can be mapped over with mapped types            |  ✅  |    ✅     |
| Expands in error messages and logs              |  ✅  |    🚫     |
| Can be augmented                                |  🚫  |    ✅     |
| Can be recursive                                |  ⚠️  |    ✅     |

⚠️ In some cases

(source: [Karol Majewski](https://twitter.com/karoljmajewski/status/1082413696075382785))

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

---
id: function_components
title: Function Components
---

These can be written as normal functions that take a `props` argument and return a JSX element.

```tsx
// Declaring type of props - see "Typing Component Props" for more examples
type AppProps = {
  message: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const App = ({ message }: AppProps) => <div>{message}</div>;

// you can choose annotate the return type so an error is raised if you accidentally return some other type
const App = ({ message }: AppProps): JSX.Element => <div>{message}</div>;

// you can also inline the type declaration; eliminates naming the prop types, but looks repetitive
const App = ({ message }: { message: string }) => <div>{message}</div>;
```

> Tip: You might use [Paul Shen's VS Code Extension](https://marketplace.visualstudio.com/items?itemName=paulshen.paul-typescript-toolkit) to automate the type destructure declaration (incl a [keyboard shortcut](https://twitter.com/_paulshen/status/1392915279466745857?s=20)).

<details>

<summary><b>Why is <code>React.FC</code> discouraged? What about <code>React.FunctionComponent</code>/<code>React.VoidFunctionComponent</code>?</b></summary>

You may see this in many React+TypeScript codebases:

```tsx
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
```

However, the general consensus today is that `React.FunctionComponent` (or the shorthand `React.FC`) is [discouraged](https://github.com/facebook/create-react-app/pull/8177). This is a nuanced opinion of course, but if you agree and want to remove `React.FC` from your codebase, you can use [this jscodeshift codemod](https://github.com/gndelia/codemod-replace-react-fc-typescript).

Some differences from the "normal function" version:

- `React.FunctionComponent` is explicit about the return type, while the normal function version is implicit (or else needs additional annotation).

- It provides typechecking and autocomplete for static properties like `displayName`, `propTypes`, and `defaultProps`.

  - Note that there are some known issues using `defaultProps` with `React.FunctionComponent`. See [this issue for details](https://github.com/typescript-cheatsheets/react/issues/87). We maintain a separate `defaultProps` section you can also look up.

- Before the [React 18 type updates](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56210), `React.FunctionComponent` provided an implicit definition of `children` (see below), which was heavily debated and is one of the reasons [`React.FC` was removed from the Create React App TypeScript template](https://github.com/facebook/create-react-app/pull/8177).

```tsx
// before React 18 types
const Title: React.FunctionComponent<{ title: string }> = ({
  children,
  title,
}) => <div title={title}>{children}</div>;
```

<details>
<summary>(Deprecated)<b>Using <code>React.VoidFunctionComponent</code> or <code>React.VFC</code> instead</b></summary>

In [@types/react 16.9.48](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/46643), the `React.VoidFunctionComponent` or `React.VFC` type was added for typing `children` explicitly.
However, please be aware that `React.VFC` and `React.VoidFunctionComponent` were deprecated in React 18 (https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59882), so this interim solution is no longer necessary or recommended in React 18+.

Please use regular function components or `React.FC` instead.

```ts
type Props = { foo: string };

// OK now, in future, error
const FunctionComponent: React.FunctionComponent<Props> = ({
  foo,
  children,
}: Props) => {
  return (
    <div>
      {foo} {children}
    </div>
  ); // OK
};

// Error now, in future, deprecated
const VoidFunctionComponent: React.VoidFunctionComponent<Props> = ({
  foo,
  children,
}) => {
  return (
    <div>
      {foo}
      {children}
    </div>
  );
};
```

</details>

- _In the future_, it may automatically mark props as `readonly`, though that's a moot point if the props object is destructured in the parameter list.

In most cases it makes very little difference which syntax is used, but you may prefer the more explicit nature of `React.FunctionComponent`.

</details>

<details>
<summary><b>Minor Pitfalls</b></summary>

These patterns are not supported:

**Conditional rendering**

```tsx
const MyConditionalComponent = ({ shouldRender = false }) =>
  shouldRender ? <div /> : false; // don't do this in JS either
const el = <MyConditionalComponent />; // throws an error
```

This is because due to limitations in the compiler, function components cannot return anything other than a JSX expression or `null`, otherwise it complains with a cryptic error message saying that the other type is not assignable to `Element`.

**Array.fill**

```tsx
const MyArrayComponent = () => Array(5).fill(<div />);
const el2 = <MyArrayComponent />; // throws an error
```

Unfortunately just annotating the function type will not help so if you really need to return other exotic types that React supports, you'd need to perform a type assertion:

```tsx
const MyArrayComponent = () => Array(5).fill(<div />) as any as JSX.Element;
```

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react/issues/57).

</details>

---
id: hooks
title: Hooks
---

Hooks are [supported in `@types/react` from v16.8 up](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L800-L1031).

## useState

Type inference works very well for simple values:

```tsx
const [state, setState] = useState(false);
// `state` is inferred to be a boolean
// `setState` only takes booleans
```

See also the [Using Inferred Types](https://react-typescript-cheatsheet.netlify.app/docs/basic/troubleshooting/types/#using-inferred-types) section if you need to use a complex type that you've relied on inference for.

However, many hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type, and use a union type:

```tsx
const [user, setUser] = useState<User | null>(null);

// later...
setUser(newUser);
```

You can also use type assertions if a state is initialized soon after setup and always has a value after:

```tsx
const [user, setUser] = useState<User>({} as User);

// later...
setUser(newUser);
```

This temporarily "lies" to the TypeScript compiler that `{}` is of type `User`. You should follow up by setting the `user` state — if you don't, the rest of your code may rely on the fact that `user` is of type `User` and that may lead to runtime errors.

## useReducer

You can use [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions) for reducer actions. Don't forget to define the return type of reducer, otherwise TypeScript will infer it.

```tsx
import { useReducer } from "react";

const initialState = { count: 0 };

type ACTIONTYPE =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: string };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - Number(action.payload) };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: "5" })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
    </>
  );
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play?#code/LAKFEsFsAcHsCcAuACAVMghgZ2QJQKYYDGKAZvLJMgOTyEnUDcooRsAdliuO+IuBgA2AZUQZE+ZAF5kAbzYBXdogBcyAAwBfZmBCIAntEkBBAMIAVAJIB5AHLmAmgAUAotOShkyAD5zkBozVqHiI6SHxlagAaZGgMfUFYDAATNXYFSAAjfHhNDxAvX1l-Q3wg5PxQ-HDImLiEpNTkLngeAHM8ll1SJRJwDmQ6ZIUiHIAKLnEykqNYUmQePgERMQkY4n4ONTMrO0dXAEo5T2aAdz4iAAtkMY3+9gA6APwj2ROvImxJYPYqmsRqCp3l5BvhEAp4Ow5IplGpJhIHjCUABqTB9DgPeqJFLaYGfLDfCp-CIAoEFEFeOjgyHQ2BKVTNVb4RF05TIAC0yFsGWy8Fu6MeWMaB1x5K8FVIGAUglUwK8iEuFFOyHY+GVLngFD5Bx0Xk0oH13V6myhplZEm1x3JbE4KAA2vD8DFkuAsHFEFcALruAgbB4KAkEYajPlDEY5GKLfhCURTHUnKkQqFjYEAHgAfHLkGb6WpZI6WfTDRSvKnMgpEIgBhxTIJwEQANZSWRjI5SdPIF1u8RXMayZ7lSphEnRWLxbFNagAVmomhF6fZqYA9OXKxxM2KQWWK1WoTW643m63pB2u+7e-3SkEQsPamOGik1FO55p08jl6vdxuKcvv8h4yAmhAA)

<details>

<summary><b>Usage with <code>Reducer</code> from <code>redux</code></b></summary>

In case you use the [redux](https://github.com/reduxjs/redux) library to write reducer function, It provides a convenient helper of the format `Reducer<State, Action>` which takes care of the return type for you.

So the above reducer example becomes:

```tsx
import { Reducer } from 'redux';

export function reducer: Reducer<AppState, Action>() {}
```

</details>

## useEffect / useLayoutEffect

Both of `useEffect` and `useLayoutEffect` are used for performing <b>side effects</b> and return an optional cleanup function which means if they don't deal with returning values, no types are necessary. When using `useEffect`, take care not to return anything other than a function or `undefined`, otherwise both TypeScript and React will yell at you. This can be subtle when using arrow functions:

```ts
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;

  useEffect(
    () =>
      setTimeout(() => {
        /* do stuff */
      }, timerMs),
    [timerMs]
  );
  // bad example! setTimeout implicitly returns a number
  // because the arrow function body isn't wrapped in curly braces
  return null;
}
```

<details>
<summary><b>Solution to the above example</b></summary>

```tsx
function DelayedEffect(props: { timerMs: number }) {
  const { timerMs } = props;

  useEffect(() => {
    setTimeout(() => {
      /* do stuff */
    }, timerMs);
  }, [timerMs]);
  // better; use the void keyword to make sure you return undefined
  return null;
}
```

</details>

## useRef

In TypeScript, `useRef` returns a reference that is either [read-only](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/abd69803c1b710db58d511f4544ec1b70bc9077c/types/react/v16/index.d.ts#L1025-L1039) or [mutable](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/abd69803c1b710db58d511f4544ec1b70bc9077c/types/react/v16/index.d.ts#L1012-L1023), depends on whether your type argument fully covers the initial value or not. Choose one that suits your use case.

### Option 1: DOM element ref

**[To access a DOM element](https://reactjs.org/docs/refs-and-the-dom.html):** provide only the element type as argument, and use `null` as initial value. In this case, the returned reference will have a read-only `.current` that is managed by React. TypeScript expects you to give this ref to an element's `ref` prop:

```tsx
function Foo() {
  // - If possible, prefer as specific as possible. For example, HTMLDivElement
  //   is better than HTMLElement and way better than Element.
  // - Technical-wise, this returns RefObject<HTMLDivElement>
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Note that ref.current may be null. This is expected, because you may
    // conditionally render the ref-ed element, or you may forgot to assign it
    if (!divRef.current) throw Error("divRef is not assigned");

    // Now divRef.current is sure to be HTMLDivElement
    doSomethingWith(divRef.current);
  });

  // Give the ref to an element so React can manage it for you
  return <div ref={divRef}>etc</div>;
}
```

If you are sure that `divRef.current` will never be null, it is also possible to use the non-null assertion operator `!`:

```tsx
const divRef = useRef<HTMLDivElement>(null!);
// Later... No need to check if it is null
doSomethingWith(divRef.current);
```

Note that you are opting out of type safety here - you will have a runtime error if you forget to assign the ref to an element in the render, or if the ref-ed element is conditionally rendered.

<details>
<summary><b>Tip: Choosing which <code>HTMLElement</code> to use</b></summary>
  
Refs demand specificity - it is not enough to just specify any old `HTMLElement`. If you don't know the name of the element type you need, you can check [lib.dom.ts](https://github.com/microsoft/TypeScript/blob/v3.9.5/lib/lib.dom.d.ts#L19224-L19343) or make an intentional type error and let the language service tell you:

![image](https://user-images.githubusercontent.com/6764957/116914284-1c436380-ac7d-11eb-9150-f52c571c5f07.png)

</details>

### Option 2: Mutable value ref

**[To have a mutable value](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables):** provide the type you want, and make sure the initial value fully belongs to that type:

```tsx
function Foo() {
  // Technical-wise, this returns MutableRefObject<number | null>
  const intervalRef = useRef<number | null>(null);

  // You manage the ref yourself (that's why it's called MutableRefObject!)
  useEffect(() => {
    intervalRef.current = setInterval(...);
    return () => clearInterval(intervalRef.current);
  }, []);

  // The ref is not passed to any element's "ref" prop
  return <button onClick={/* clearInterval the ref */}>Cancel timer</button>;
}
```

### See also

- [Related issue by @rajivpunjabi](https://github.com/typescript-cheatsheets/react/issues/388) - [Playground](https://www.typescriptlang.org/play#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwCwAUI7hAHarwCCYYcAvHAAUASn4A+OAG9GjOHAD0CBLLnKGcxHABiwKBzgQwMYGxS4WUACbBWAczgwIcSxFwBXEFlYxkxtgDoVTQBJVmBjZAAbOAA3KLcsOAB3YEjogCNE1jc0-zgAGQBPG3tHOAAVQrAsAGVcKGAjOHTCuDdUErhWNgBabLSUVFQsWBNWA2qoX2hA9VU4AGFKXyx0AFk3H3TIxOwCOAB5dIArLHwgpHcoSm84MGJJmFbgdG74ZcsDVkjC2Y01f7yFQsdjvLAEACM-EwVBg-naWD2AB4ABLlNb5GpgZCsACiO083jEgn6kQAhMJ6HMQfpKJCFpE2IkBNg8HCEci0RisTj8VhCTBiaSKVSVIoAaoLnBQuFgFFYvFEikBpkujkMps4FgAB7VfCdLmY7F4gleOFwAByEHg7U63VYfXVg2Go1MhhG0ygf3mAHVUtF6jgYLtwUdTvguta4Bstjs9mGznCpVcbvB7u7YM90B8vj9vYgLkDqWxaeCAEzQ1n4eHDTnoo2801EknqykyObii5SmpnNifA5GMZmCzWOwOJwudwC3xjKUyiLROKRBLJf3NLJO9KanV64xj0koVifQ08k38s1Sv0DJZBxIx5DbRGhk6J5Nua5mu4PEZPOAvSNgsgnxsHmXZzIgRZyDSYIEAAzJWsI1k+BCovWp58gKcAAD5qmkQqtqKHbyCexoYRecw7IQugcAs76ptCdIQv4KZmoRcjyMRaGkU28A4aSKiUXAwwgpYtEfrcAh0mWzF0ax7bsZx3Lceetx8eqAlYPAMAABa6KJskSXAdKwTJ4kwGxCjyKy-bfK05SrDA8mWVagHAbZeScOY0CjqUE6uOgqDaRAOSfKqOYgb8KiMaZ9GSeCEIMkyMVyUwRHWYc7nSvAgUQEk6AjMQXpReWyWGdFLHeBZHEuTCQEZT8xVwaV8BxZCzUWZQMDvuMghBHASJVnCWhTLYApiH1chIqgxpGeCfCSIxAC+Yj3o+8YvvgSLyNNOLjeBGhTTNdLzVJy3reGMBbTtrB7RoB3XbNBAneCsHLatcbPhdV3GrdB1WYhw3IKNZq-W2DCLYRO7QPAljgsgORcDwVJAA)
- [Example from Stefan Baumgartner](https://fettblog.eu/typescript-react/hooks/#useref) - [Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wFgAoCzAVwDsNgJa4AVJADxgElaxqYA6sBgALAGIQ01AM4AhfjCYAKAJRwA3hThwA9DrjBaw4CgA2waUjgB3YSLi1qp0wBo4AI35wYSZ6wCeYEgAymhQwGDw1lYoRHCmEBAA1oYA5nCY0HAozAASLACyADI8fDAAoqZIIEi0MFpwaEzS8IZllXAAvIjEMAB0MkjImAA8+cWl-JXVtTAAfEqOzioA3A1NtC1wTPIwirQAwuZoSV1wql1zGg3aenAt4RgOTqaNIkgn0g5ISAAmcDJvBA3h9TsBMAZeFNXjl-lIoEQ6nAOBZ+jddPpPPAmGgrPDEfAUS1pG5hAYvhAITBAlZxiUoRUqjU6m5RIDhOi7iIUF9RFYaqIIP9MlJpABCOCAUHJ0eDzm1oXAAGSKyHtUx9fGzNSacjaPWq6Ea6gI2Z9EUyVRrXV6gC+DRtVu0RBgxuYSnRIzm6O06h0ACpIdlfr9jExSQyOkxTP5GjkPFZBv9bKIDYSmbNpH04ABNFD+CV+nR2636kby+BETCddTlyo27w0zr4HycfC6L0lvUjLH7baHY5Jas7BRMI7AE42uYSUXed6pkY6HtMDulnQruCrCg2oA)

## useImperativeHandle

_We don't have much here, but this is from [a discussion in our issues](https://github.com/typescript-cheatsheets/react/issues/106). Please contribute if you have anything to add!_

```tsx
type ListProps<ItemType> = {
  items: ItemType[];
  innerRef?: React.Ref<{ scrollToItem(item: ItemType): void }>;
};

function List<ItemType>(props: ListProps<ItemType>) {
  useImperativeHandle(props.innerRef, () => ({
    scrollToItem() {},
  }));
  return null;
}
```

## Custom Hooks

If you are returning an array in your Custom Hook, you will want to avoid type inference as TypeScript will infer a union type (when you actually want different types in each position of the array). Instead, use [TS 3.4 const assertions](https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions):

```tsx
import { useState } from "react";

export function useLoading() {
  const [isLoading, setState] = useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as const; // infers [boolean, typeof load] instead of (boolean | typeof load)[]
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?target=5&jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCpAD0ljkwFcA7DYCZuRgZyQBkIKACbBmAcwAUASjgBvCnDhoO3eAG1g3AcNFiANHF4wAyjBQwkAXTgBeRMRgA6HklPmkEzCgA2vKQG4FJRV4b0EhWzgJFAAFHBBNJAAuODjcRIAeFGYATwA+GRs8uSDFIzcLCRgoRiQA0rgiGEYoTlj4xMdMUR9vHIlpW2Lys0qvXzr68kUAX0DpxqRm1rgNLXDdAzDhaxRuYOZVfzgAehO4UUwkKH21ACMICG9UZgMYHLAkCEw4baFrUSqVARb5RB5PF5wAA+cHen1BfykaksFBmQA)

This way, when you destructure you actually get the right types based on destructure position.

<details>
<summary><b>Alternative: Asserting a tuple return type</b></summary>

If you are [having trouble with const assertions](https://github.com/babel/babel/issues/9800), you can also assert or define the function return types:

```tsx
import { useState } from "react";

export function useLoading() {
  const [isLoading, setState] = useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load] as [
    boolean,
    (aPromise: Promise<any>) => Promise<any>
  ];
}
```

A helper function that automatically types tuples can also be helpful if you write a lot of custom hooks:

```tsx
function tuplify<T extends any[]>(...elements: T) {
  return elements;
}

function useArray() {
  const numberValue = useRef(3).current;
  const functionValue = useRef(() => {}).current;
  return [numberValue, functionValue]; // type is (number | (() => void))[]
}

function useTuple() {
  const numberValue = useRef(3).current;
  const functionValue = useRef(() => {}).current;
  return tuplify(numberValue, functionValue); // type is [number, () => void]
}
```

</details>

Note that the React team recommends that custom hooks that return more than two values should use proper objects instead of tuples, however.

## More Hooks + TypeScript reading:

- https://medium.com/@jrwebdev/react-hooks-in-typescript-88fce7001d0d
- https://fettblog.eu/typescript-react/hooks/#useref

If you are writing a React Hooks library, don't forget that you should also expose your types for users to use.

## Example React Hooks + TypeScript Libraries:

- https://github.com/mweststrate/use-st8
- https://github.com/palmerhq/the-platform
- https://github.com/sw-yx/hooks

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

---
id: class_components
title: Class Components
---

Within TypeScript, `React.Component` is a generic type (aka `React.Component<PropType, StateType>`), so you want to provide it with (optional) prop and state type parameters:

```tsx
type MyProps = {
  // using `interface` is also ok
  message: string;
};
type MyState = {
  count: number; // like this
};
class App extends React.Component<MyProps, MyState> {
  state: MyState = {
    // optional second annotation for better type inference
    count: 0,
  };
  render() {
    return (
      <div>
        {this.props.message} {this.state.count}
      </div>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgFlqAFHMAZzgF44BvCuHAD0QuAFd2wAHYBzOAANpMJFEzok8uME4oANuwhwIAawFwQSduxQykALjjsYUaTIDcFAL4fyNOo2oAZRgUZW4+MzQIMSkYBykxEAAjFTdhUV1gY3oYAAttLx80XRQrOABBMDA4JAAPZSkAE05kdBgAOgBhXEgpJFiAHiZWCA4AGgDg0KQAPgjyQSdphyYpsJ5+BcF0ozAYYAgpPUckKKa4FCkpCBD9w7hMaDgUmGUoOD96aUwVfrQkMyCKIxOJwAAMZm8ZiITRUAAoAJTzbZwIgwMRQKRwOGA7YDRrAABuM1xKN4eW07TAbHY7QsVhsSE8fAptKWynawNinlJcAGQgJxNxCJ8gh55E8QA)

Don't forget that you can export/import/extend these types/interfaces for reuse.

<details>
<summary><b>Why annotate <code>state</code> twice?</b></summary>

It isn't strictly necessary to annotate the `state` class property, but it allows better type inference when accessing `this.state` and also initializing the state.

This is because they work in two different ways, the 2nd generic type parameter will allow `this.setState()` to work correctly, because that method comes from the base class, but initializing `state` inside the component overrides the base implementation so you have to make sure that you tell the compiler that you're not actually doing anything different.

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react/issues/57).

</details>

<details>
  <summary><b>No need for <code>readonly</code></b></summary>

You often see sample code include `readonly` to mark props and state immutable:

```tsx
type MyProps = {
  readonly message: string;
};
type MyState = {
  readonly count: number;
};
```

This is not necessary as `React.Component<P,S>` already marks them as immutable. ([See PR and discussion!](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/26813))

</details>

**Class Methods**: Do it like normal, but just remember any arguments for your functions also need to be typed:

```tsx
class App extends React.Component<{ message: string }, { count: number }> {
  state = { count: 0 };
  render() {
    return (
      <div onClick={() => this.increment(1)}>
        {this.props.message} {this.state.count}
      </div>
    );
  }
  increment = (amt: number) => {
    // like this
    this.setState((state) => ({
      count: state.count + amt,
    }));
  };
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeAN5wQSBigDmSAFxw6MKMB5q4AXwA0cRWggBXHjG09rIAEZIoJgHwWKcHTBTccAC8FnBWtvZwAAwmANw+cET8bgAUAJTe5L6+RDDWUDxwKQnZcLJ8wABucBA8YtTAaADWQfLpwV4wABbAdCIGaETKdikAjGnGHiWlFt29ImA4YH3KqhrGsz19ugFIIuF2xtO+sgD0FZVTWdlp8ddH1wNDMsFFKCCRji5uGUFe8tNTqc4A0mkg4HM6NNISI6EgYABlfzcFI7QJ-IoA66lA6RNF7XFwADUcHeMGmxjStwSxjuxiAA)

**Class Properties**: If you need to declare class properties for later use, just declare it like `state`, but without assignment:

```tsx
class App extends React.Component<{
  message: string;
}> {
  pointer: number; // like this
  componentDidMount() {
    this.pointer = 3;
  }
  render() {
    return (
      <div>
        {this.props.message} and {this.pointer}
      </div>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeAN4U4cEEgYoA5kgBccOjCjAeGgNwUAvgD44i8sshHuUXTwCuIAEZIoJuAHo-OGpgAGskOBgAC2A6JTg0SQhpHhgAEWA+AFkIVxSACgBKGzjlKJiRBxTvOABeOABmMzs4cziifm9C4ublIhhXKB44PJLlOFk+YAA3S1GxmzK6CpwwJdV1LXM4FH4F6KXKp1aesdk-SZnRgqblY-MgA)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Typing getDerivedStateFromProps

Before you start using `getDerivedStateFromProps`, please go through the [documentation](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) and [You Probably Don't Need Derived State](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html). Derived State can be implemented using hooks which can also help set up memoization.

Here are a few ways in which you can annotate `getDerivedStateFromProps`

1. If you have explicitly typed your derived state and want to make sure that the return value from `getDerivedStateFromProps` conforms to it.

```tsx
class Comp extends React.Component<Props, State> {
  static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    //
  }
}
```

2. When you want the function's return value to determine your state.

```tsx
class Comp extends React.Component<
  Props,
  ReturnType<typeof Comp["getDerivedStateFromProps"]>
> {
  static getDerivedStateFromProps(props: Props) {}
}
```

3. When you want derived state with other state fields and memoization

```tsx
type CustomValue = any;
interface Props {
  propA: CustomValue;
}
interface DefinedState {
  otherStateField: string;
}
type State = DefinedState & ReturnType<typeof transformPropsToState>;
function transformPropsToState(props: Props) {
  return {
    savedPropA: props.propA, // save for memoization
    derivedState: props.propA,
  };
}
class Comp extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      otherStateField: "123",
      ...transformPropsToState(props),
    };
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    if (isEqual(props.propA, state.savedPropA)) return null;
    return transformPropsToState(props);
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWOYAZwFEBHAVxQBs5tcD2IATFHQAWAOnpJWHMuQowAnmCRwAwizoxcANQ4tlAXjgoAdvIDcFYMZhIomdMoAKOMHTgBvCnDhgXAQQAuVXVNEB12PQtyAF9La1t7NGUAESRMKyR+AGUYFBsPLzgIGGFbHLykADFgJHZ+II0oKwBzKNjyBSU4cvzDVPTjTJ7lADJEJBgWKGMAFUUkAB5OpAhMOBgoEzpMaBBnCFcZiGGAPijMFmMMYAhjdc3jbd39w+PcmwAKXwO6IJe6ACUBXI3iIk2mwO83joKAAbpkXoEfC46KJvmA-AAaOAAehxcBh8K40DgICQIAgwAAXnkbsZCt5+LZgPDsu8kEF0aj0X5CtE2hQ0OwhG4VLgwHAkAAPGzGfhuZDoGCiRxTJBi8C3JDWBb-bGnSFwNC3RosDDQL4ov4ooGeEFQugsJRQS0-AFRKHrYT0UQaCpwQx2z3eYqlKDDaq1epwABEAEYAEwAZhjmIZUNEmY2Wx2UD2KKOw1drgB6f5fMKfpgwDQcGaE1STVZEZw+Z+xd+cD1BPZQWGtvTwDWH3ozDY7A7aP82KrSF9cIR-gBQLBUzuxhY7HYHqhq4h2ceubbryLXPdFZiQA)


---
id: default_props
title: Typing defaultProps
---

## You May Not Need `defaultProps`

As per [this tweet](https://twitter.com/dan_abramov/status/1133878326358171650), defaultProps will eventually be deprecated. You can check the discussions here:

- [Original tweet](https://twitter.com/hswolff/status/1133759319571345408)
- More info can also be found in [this article](https://medium.com/@matanbobi/react-defaultprops-is-dying-whos-the-contender-443c19d9e7f1)

The consensus is to use object default values.

Function Components:

```tsx
type GreetProps = { age?: number };

const Greet = ({ age = 21 }: GreetProps) => // etc
```

Class Components:

```tsx
type GreetProps = {
  age?: number;
};

class Greet extends React.Component<GreetProps> {
  render() {
    const { age = 21 } = this.props;
    /*...*/
  }
}

let el = <Greet age={3} />;
```

## Typing `defaultProps`

Type inference improved greatly for `defaultProps` in [TypeScript 3.0+](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html), although [some edge cases are still problematic](https://github.com/typescript-cheatsheets/react/issues/61).

**Function Components**

```tsx
// using typeof as a shortcut; note that it hoists!
// you can also declare the type of DefaultProps if you choose
// e.g. https://github.com/typescript-cheatsheets/react/issues/415#issuecomment-841223219
type GreetProps = { age: number } & typeof defaultProps;

const defaultProps = {
  age: 21,
};

const Greet = (props: GreetProps) => {
  // etc
};
Greet.defaultProps = defaultProps;
```

_[See this in TS Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdMAnmFnAOKVYwAKxY6ALxwA3igDmWAFxwAdgFcQAIyxQ4AXzgAyOM1YQCcACZYCyeQBte-VPVwRZqeCbOXrEAXGEi6cCdLgAJgBGABo6dXo6e0d4TixuLzgACjAbGXjuPg9UAEovAD5RXzhKGHkoWTgAHiNgADcCkTScgDpkSTgAeiQFZVVELvVqrrrGiPpMmFaXcytsz2FZtwXbOiA)_

For **Class components**, there are [a couple ways to do it](https://github.com/typescript-cheatsheets/react/pull/103#issuecomment-481061483) (including using the `Pick` utility type) but the recommendation is to "reverse" the props definition:

```tsx
type GreetProps = typeof Greet.defaultProps & {
  age: number;
};

class Greet extends React.Component<GreetProps> {
  static defaultProps = {
    age: 21,
  };
  /*...*/
}

// Type-checks! No type assertions needed!
let el = <Greet age={3} />;
```

<details>
<summary><b><code>JSX.LibraryManagedAttributes</code> nuance for library authors</b></summary>

The above implementations work fine for App creators, but sometimes you want to be able to export `GreetProps` so that others can consume it. The problem here is that the way `GreetProps` is defined, `age` is a required prop when it isn't because of `defaultProps`.

The insight to have here is that [`GreetProps` is the _internal_ contract for your component, not the _external_, consumer facing contract](https://github.com/typescript-cheatsheets/react/issues/66#issuecomment-453878710). You could create a separate type specifically for export, or you could make use of the `JSX.LibraryManagedAttributes` utility:

```tsx
// internal contract, should not be exported out
type GreetProps = {
  age: number;
};

class Greet extends Component<GreetProps> {
  static defaultProps = { age: 21 };
}

// external contract
export type ApparentGreetProps = JSX.LibraryManagedAttributes<
  typeof Greet,
  GreetProps
>;
```

This will work properly, although hovering over`ApparentGreetProps`may be a little intimidating. You can reduce this boilerplate with the`ComponentProps` utility detailed below.

</details>

## Consuming Props of a Component with defaultProps

A component with `defaultProps` may seem to have some required props that actually aren't.

### Problem Statement

Here's what you want to do:

```tsx
interface IProps {
  name: string;
}
const defaultProps = {
  age: 25,
};
const GreetComponent = ({ name, age }: IProps & typeof defaultProps) => (
  <div>{`Hello, my name is ${name}, ${age}`}</div>
);
GreetComponent.defaultProps = defaultProps;

const TestComponent = (props: React.ComponentProps<typeof GreetComponent>) => {
  return <h1 />;
};

// Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
const el = <TestComponent name="foo" />;
```

### Solution

Define a utility that applies `JSX.LibraryManagedAttributes`:

```tsx
type ComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? JSX.LibraryManagedAttributes<T, P>
  : never;

const TestComponent = (props: ComponentProps<typeof GreetComponent>) => {
  return <h1 />;
};

// No error
const el = <TestComponent name="foo" />;
```

[_See this in TS Playground_](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdMAnmFnAMImQB2W3MABWJhUAHgAqAPjgBeOOLhYAHjD4ATdNjwwAdJ3ARe-cSyyjg3AlihwB0gD6Yqu-Tz4xzl67cl04cAH44ACkAZQANHQAZYAAjKGQoJgBZZG5kAHMsNQBBGBgoOIBXVTFxABofPzgALjheADdrejoLVSgCPDYASSEIETgAb2r0kCw61AKLDPoAXzpcQ0m4NSxOooAbQWF0OWH-TPG4ACYAVnK6WfpF7mWAcUosGFdDd1k4AApB+uQxysO4LM6r0dnAAGRwZisCAEFZrZCbbb9VAASlk0g+1VEamADUkgwABgAJLAbDYQSogJg-MZwYDoAAkg1GWFmlSZh1mBNmogA9Di8XQUfQHlgni8jLpVustn0BnJpQjZTsWrzeXANsh2gwbstxFhJhK3nIPmAdnUjfw5WIoVgYXBReKuK9+JI0TJpPs4JQYEUoNw4KIABYARjgvN8VwYargADkIIooMQoAslvBSe8JAbns7JTSsDIyAQIBAyOHJDQgA)

## Misc Discussions and Knowledge

<details>
<summary><b>Why does <code>React.FC</code> break <code>defaultProps</code>?</b></summary>

You can check the discussions here:

- https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680
- https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30695
- https://github.com/typescript-cheatsheets/react/issues/87

This is just the current state and may be fixed in future.

</details>

<details>
<summary><b>TypeScript 2.9 and earlier</b></summary>

For TypeScript 2.9 and earlier, there's more than one way to do it, but this is the best advice we've yet seen:

```ts
type Props = Required<typeof MyComponent.defaultProps> & {
  /* additional props here */
};

export class MyComponent extends React.Component<Props> {
  static defaultProps = {
    foo: "foo",
  };
}
```

Our former recommendation used the `Partial type` feature in TypeScript, which means that the current interface will fulfill a partial version on the wrapped interface. In that way we can extend defaultProps without any changes in the types!

```ts
interface IMyComponentProps {
  firstProp?: string;
  secondProp: IPerson[];
}

export class MyComponent extends React.Component<IMyComponentProps> {
  public static defaultProps: Partial<IMyComponentProps> = {
    firstProp: "default",
  };
}
```

The problem with this approach is it causes complex issues with the type inference working with `JSX.LibraryManagedAttributes`. Basically it causes the compiler to think that when creating a JSX expression with that component, that all of its props are optional.

[See commentary by @ferdaber here](https://github.com/typescript-cheatsheets/react/issues/57) and [here](https://github.com/typescript-cheatsheets/react/issues/61).

</details>

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

---
id: forms_and_events
title: Forms and Events
---

If performance is not an issue (and it usually isn't!), inlining handlers is easiest as you can just use [type inference and contextual typing](https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-typing):

```tsx
const el = (
  <button
    onClick={(event) => {
      /* event will be correctly typed automatically! */
    }}
  />
);
```

But if you need to define your event handler separately, IDE tooling really comes in handy here, as the @type definitions come with a wealth of typing. Type what you are looking for and usually the autocomplete will help you out. Here is what it looks like for an `onChange` for a form event:

```tsx
type State = {
  text: string;
};
class App extends React.Component<Props, State> {
  state = {
    text: "",
  };

  // typing on RIGHT hand side of =
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };
  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.onChange} />
      </div>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeCnDgBvAL4AaBcs2KA9Drg8IcMDjB1tcblwBccOjCjAeAcwDcmlRQB8W8ovso3HAAvL6KilYwtgBE0R7ulH5wepYAnmBOznAQPIgAkgDiABIAKnAAFij8dsB8SNmYIZo5YpUu9aEAFEi2QhgiAGLQIACiAG4ysqUAsgAyeTxgAK4wI9RIIDJeAJS2YxC1IT5KFjDlwHQidEgwAMowgUidSpacUewiaEtQRDwwJSgoM4biIxihqEt6iptglFCpYXBfnUoJ1tmFwkQYN9cp0LIpZHxgGMvHjwrInMt4DB0khgtFItE4GCIbSlGcLlcHtwRJEVNkeK0qsDgmzzpcWm1gXydCSkuE4LIdITiRYYR4KCogA)

Instead of typing the arguments and return values with `React.FormEvent<>` and `void`, you may alternatively apply types to the event handler itself (_contributed by @TomasHubelbauer_):

```tsx
  // typing on LEFT hand side of =
  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }
```

<details>

<summary><b>Why two ways to do the same thing?</b></summary>

The first method uses an inferred method signature `(e: React.FormEvent<HTMLInputElement>): void` and the second method enforces a type of the delegate provided by `@types/react`. So `React.ChangeEventHandler<>` is simply a "blessed" typing by `@types/react`, whereas you can think of the inferred method as more... _artisanally hand-rolled_. Either way it's a good pattern to know. [See our Github PR for more](https://github.com/typescript-cheatsheets/react/pull/24).

</details>

**Typing onSubmit, with Uncontrolled components in a Form**

If you don't quite care about the type of the event, you can just use React.SyntheticEvent. If your target form has custom named inputs that you'd like to access, you can use a type assertion:

```tsx
<form
  ref={formRef}
  onSubmit={(e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    // etc...
  }}
>
  <div>
    <label>
      Email:
      <input type="email" name="email" />
    </label>
  </div>
  <div>
    <label>
      Password:
      <input type="password" name="password" />
    </label>
  </div>
  <div>
    <input type="submit" value="Log in" />
  </div>
</form>
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGctoRlM4BeRYmAOgFc6kLABQBKClVoM4AMSbs4o9gD4FFOHAA8mJmrhFMbAN7aozJJgC+u2gGVeAIxDAYRoUgBcndDxsBPGjAAFkgwwGgAogBuSAEiynCGuupI3GBE0QEAIuYovAA2MKIA3Elw1PTwMChQAOYh8ilVtfUodHAwvmBIEKyN1XXwAGQJpckgKMB5noZwkSh5vB5wDFDANDVwFiXk6rtwYK10AO7QACbTs-OLnitrG1ulDzu75VJI45PyTQPc7xN53DmCyQRTgAHowe1Okg0ME0ABrOgAQlKr3gBzoxzOX36IVShxOUFOgKuIPBkI6XVhMMRKOe6ghcBCaG4rN0Fis5CUug0p2AkW59M0eRQ9iQeUFe3U4Q+U1GmjWYF4lWhbAARH9Jmq4DQUCAkOrNXltWDJbsNGCRWKJTywXyBTz7Wb1BoreLnbsAAoEs7ueUaRXKqFddUYrFE7W6-Whn0R8Eei1um3PC1Ox38hOBlUhtV0BxOGDaoGLdUAGQgGzWJrNqYzFAtJhAgpEQA)

Of course, if you're making any sort of significant form, [you should use Formik](https://jaredpalmer.com/formik) or [React Hook Form](https://react-hook-form.com/), which are written in TypeScript.

### List of event types

| Event Type       | Description                                                                                                                                                                                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AnimationEvent   | CSS Animations.                                                                                                                                                                                                                                                        |
| ChangeEvent      | Changing the value of `<input>`, `<select>` and `<textarea>` element.                                                                                                                                                                                                  |
| ClipboardEvent   | Using copy, paste and cut events.                                                                                                                                                                                                                                      |
| CompositionEvent | Events that occur due to the user indirectly entering text (e.g. depending on Browser and PC setup, a popup window may appear with additional characters if you e.g. want to type Japanese on a US Keyboard)                                                           |
| DragEvent        | Drag and drop interaction with a pointer device (e.g. mouse).                                                                                                                                                                                                          |
| FocusEvent       | Event that occurs when elements gets or loses focus.                                                                                                                                                                                                                   |
| FormEvent        | Event that occurs whenever a form or form element gets/loses focus, a form element value is changed or the form is submitted.                                                                                                                                          |
| InvalidEvent     | Fired when validity restrictions of an input fails (e.g `<input type="number" max="10">` and someone would insert number 20).                                                                                                                                          |
| KeyboardEvent    | User interaction with the keyboard. Each event describes a single key interaction.                                                                                                                                                                                     |
| MouseEvent       | Events that occur due to the user interacting with a pointing device (e.g. mouse)                                                                                                                                                                                      |
| PointerEvent     | Events that occur due to user interaction with a variety pointing of devices such as mouse, pen/stylus, a touchscreen and which also supports multi-touch. Unless you develop for older browsers (IE10 or Safari 12), pointer events are recommended. Extends UIEvent. |
| TouchEvent       | Events that occur due to the user interacting with a touch device. Extends UIEvent.                                                                                                                                                                                    |
| TransitionEvent  | CSS Transition. Not fully browser supported. Extends UIEvent                                                                                                                                                                                                           |
| UIEvent          | Base Event for Mouse, Touch and Pointer events.                                                                                                                                                                                                                        |
| WheelEvent       | Scrolling on a mouse wheel or similar input device. (Note: `wheel` event should not be confused with the `scroll` event)                                                                                                                                               |
| SyntheticEvent   | The base event for all above events. Should be used when unsure about event type                                                                                                                                                                                       |

<details>
<summary><b>What about <code>InputEvent</code>?</b></summary>

You've probably noticed that there is no `InputEvent`. This is because it is not supported by Typescript as the event itself has no fully browser support and may behave differently in different browsers. You can use `KeyboardEvent` instead.

Sources:

- https://github.com/microsoft/TypeScript/issues/29441
- https://developer.mozilla.org/en-US/docs/Web/API/InputEvent
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event

</details>

---
id: context
title: Context
---

## Basic Example

```tsx
import { createContext } from "react";

interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}

const AppCtx = createContext<AppContextInterface | null>(null);

// Provider in your app

const sampleAppContext: AppContextInterface = {
  name: "Using React Context in a Typescript App",
  author: "thehappybug",
  url: "http://www.example.com",
};

export const App = () => (
  <AppCtx.Provider value={sampleAppContext}>...</AppCtx.Provider>
);

// Consume in your app
import { useContext } from "react";

export const PostInfo = () => {
  const appContext = useContext(AppCtx);
  return (
    <div>
      Name: {appContext.name}, Author: {appContext.author}, Url:{" "}
      {appContext.url}
    </div>
  );
};
```

You can also use the [Class.contextType](https://reactjs.org/docs/context.html#classcontexttype) or [Context.Consumer](https://reactjs.org/docs/context.html#contextconsumer) API, let us know if you have trouble with that.

_[Thanks to @AlvSovereign](https://github.com/typescript-cheatsheets/react/issues/97)_

## Extended Example

Using `createContext` with an empty object as default value.

```tsx
interface ContextState {
  // set the type of state you want to handle with context e.g.
  name: string | null;
}
//set an empty object as default state
const Context = createContext({} as ContextState);
// set up context provider as you normally would in JavaScript [React Context API](https://reactjs.org/docs/context.html#api)
```

Using `createContext` and [context getters](https://kentcdodds.com/blog/application-state-management-with-react/) to make a `createCtx` with **no `defaultValue`, yet no need to check for `undefined`**:

```ts
import { createContext, useContext } from "react";

const currentUserContext = createContext<string | undefined>(undefined);

function EnthusasticGreeting() {
  const currentUser = useContext(currentUserContext);
  return <div>HELLO {currentUser!.toUpperCase()}!</div>;
}

function App() {
  return (
    <currentUserContext.Provider value="Anders">
      <EnthusasticGreeting />
    </currentUserContext.Provider>
  );
}
```

Notice the explicit type arguments which we need because we don't have a default `string` value:

```ts
const currentUserContext = createContext<string | undefined>(undefined);
//                                             ^^^^^^^^^^^^^^^^^^
```

along with the non-null assertion to tell TypeScript that `currentUser` is definitely going to be there:

```ts
return <div>HELLO {currentUser!.toUpperCase()}!</div>;
//                              ^
```

This is unfortunate because _we know_ that later in our app, a `Provider` is going to fill in the context.

There are a few solutions for this:

1. You can get around this by asserting non null:

   ```ts
   const currentUserContext = createContext<string>(undefined!);
   ```

   ([Playground here](https://www.typescriptlang.org/play/index.html?jsx=1#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQduEAdqvLgK5SXMwCqqLFADCLGFgAe8ALyYqMAHS5KycaN6SYAHjZRgzAOYA+ABQdmAEywF9WCwEIAlPQLn8wFnACivABYdUNBhgXABxSixgwxNHOABvOjg4JlZ2Lh5+QSg4WWw8RQCsdXEpE05uLF4BIWLNZ0S4ShguZjgtC2AANyMACS8AGX6AeXjyjOqoBRgIPjAwGrQsGIBfey0Aeg7u+mW6V2Z3TwBBOZj4hqaWtrHKzJqxTQUABWJO4CtszuQAGw4saTIAGVfMgAO7MMhGBpJLQ+GD+QJsELhLCRfQGODrKEw9Y3KpZWpSZ6vd5CIw7IA)) This is a quick and easy fix, but this loses type-safety, and if you forget to supply a value to the Provider, you will get an error.

2. We can write a helper function called `createCtx` that guards against accessing a `Context` whose value wasn't provided. By doing this, API instead, **we never have to provide a default and never have to check for `undefined`**:

   ```tsx
   import { createContext, useContext } from "react";

   /**
    * A helper to create a Context and Provider with no upfront default value, and
    * without having to check for undefined all the time.
    */
   function createCtx<A extends {} | null>() {
     const ctx = createContext<A | undefined>(undefined);
     function useCtx() {
       const c = useContext(ctx);
       if (c === undefined)
         throw new Error("useCtx must be inside a Provider with a value");
       return c;
     }
     return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
   }

   // Usage:

   // We still have to specify a type, but no default!
   export const [useCurrentUserName, CurrentUserProvider] = createCtx<string>();

   function EnthusasticGreeting() {
     const currentUser = useCurrentUserName();
     return <div>HELLO {currentUser.toUpperCase()}!</div>;
   }

   function App() {
     return (
       <CurrentUserProvider value="Anders">
         <EnthusasticGreeting />
       </CurrentUserProvider>
     );
   }
   ```

   [View in the TypeScript Playground](http://www.typescriptlang.org/play/index.html?jsx=1&ssl=1&ssc=1&pln=31&pc=2#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcARFDvmQNwBQdA9AgnYnAIJwAWWANmCxQ4MCHFyVkMLCjgBhCADtpAD3jJFAEzgAFYgDdgmoXADuwGNziKxAVzBEl8YwWS2+8fcj62sAGhQtNiRzSwhbeG5kQ0UAcxExXF5cAGs4Amg4Wy0sAmBFLG1vPhFeEVAsADpgxjoCbPxgJXFJaTkYFQAeLiw1LC10AG8AXzgAH2t3PgA+AAoASjhBtnElVHh8FTgAXkwqGEqJHDanXphu8aycvILNOeyXfML5+jh0hpgmxSzULHaVBZLFZvXBrDY7PZ4A62X4KZRnWabF7AuDAAhwRE7ba7B65J6aRaWYimaxYEkAUSgxCgszIML+HTgIBh8AARjJ8qgjDJkLoDNzhKErLyvD4sGRkW83pQYLYoN9cK84MMVjK5d8ANr0-4BTaVPQQQzGKAAXRQ6FBinWNDgjEYcAA5GhVlaYA6mcgUlh0AAVACeggAyhJgGB4PkCCZebKwHwsHQVUx7QBVVDIWJYABcDDtcAA6jJ1sA+CUovoZKI4KhBLg0X7ZDAA-44KyItYxC43B4AIR0XqQWAu9ZwLWwuWUZSpoQAOWQIGbcnH-RgU6gBqNQjNuyOUgZXXWUHysTmyLqHy+cHJym4MLQn1wAHFKFhPnFAcsQWDxEvJ79hDixypZdV1necFiVNV5TgTpNGAfRpgACXJAAZZCAHkllwH8Vz-SpRGTMBBCgOQ0CwBZhm7TpGFg+D6ETepFEaZoOEI99VRfdVoMXIDfyEdcBTgUVfG2MhAyiUxFDIaYUU6K9LFvItH2fV94kYaS3io7iJxwvj+WNaY6KAA)

3. You can go even further and combine this idea using `createContext` and [context getters](https://kentcdodds.com/blog/application-state-management-with-react/).

   ```tsx
   import { createContext, useContext } from "react";

   /**
    * A helper to create a Context and Provider with no upfront default value, and
    * without having to check for undefined all the time.
    */
   function createCtx<A extends {} | null>() {
     const ctx = createContext<A | undefined>(undefined);
     function useCtx() {
       const c = useContext(ctx);
       if (c === undefined)
         throw new Error("useCtx must be inside a Provider with a value");
       return c;
     }
     return [useCtx, ctx.Provider] as const; // 'as const' makes TypeScript infer a tuple
   }

   // usage

   export const [useCtx, SettingProvider] = createCtx<string>(); // specify type, but no need to specify value upfront!
   export function App() {
     const key = useCustomHook("key"); // get a value from a hook, must be in a component
     return (
       <SettingProvider value={key}>
         <Component />
       </SettingProvider>
     );
   }
   export function Component() {
     const key = useCtx(); // can still use without null check!
     return <div>{key}</div>;
   }
   ```

   [View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGd4BXOpAYWZlwAkIIBrOAF44ACj5IAngC44DKMBoBzAJRCAfHADeFOHGr14AbQYoYSADSykMAMoxTSALpDExGADpmSOw5GaAvso6cEQwjFA0svZmhuISjhT+FAD0yXpEDnq0ZgAe8ADuwDAAFnA0EHCMYNjZcAAmSJgojAA2MABqKC2MSClphSUQjPDFKABuCopwnPUVjDQNmApIdXrFSGgCXS3T69OgveSY8xjAtOmoZqwwOQA8AIJqIqra5Lr6DHo3LsjoHmgZK7ZJB5B5wAA+lQWjWWdSe80WsOUAG5gscaKdzl5rjlnlpgu9aJ80D83J4WKxgXkRBgciiCXBgJhRABCNCqEo4fJlJDcgCiUBwUBEACJsd8QBw4AAjJCM+jABpwFBwAAKOAmDSgcAGpRVYy6PRF9LeuhC1nCkTQqNNSVNoUtcEM4pyllp7nVEE1SCgzhQdCyBmRcFScBAKHEcAAKhIwN4AcAwPAFJgfcrplUWhYyhB4ChIihBSgJHAIMz5mdIjBY0g6IkKH1KnQUIpDhQQZBYIHPs6KTdLDZrDBJp7vb6XADLmwbrc5JMniiQ2k6HG0EyS9W45ZpcMczyVtMKiuNuu4AbunKqjUaDAWe2cp2sCdh+d7mAwHjXoSDHA4i5sRw3C8HwopxMawahq2eZnoaco1HgKrFMBliSp8sryum1DgLQSA3sEDoRKIDK3IOMDDkoo6Kmm549IImhxP4agMrotyUthNC4fAyRMaaLHJKR5GKJRWo8boJp2h20BPhiL6RGxkAcTen7BB88B-sILrPBBaRoPmUTAC0OxeDqRRIbuNCtDsaDrJsd72hahG3HUwBjGo9GSP4tzJM5rk2v4QA)

4. Using `createContext` and `useContext` to make a `createCtx` with [`unstated`](https://github.com/jamiebuilds/unstated)-like context setters:

   ```tsx
   import {
     createContext,
     Dispatch,
     PropsWithChildren,
     SetStateAction,
     useState,
   } from "react";

   export function createCtx<A>(defaultValue: A) {
     type UpdateType = Dispatch<SetStateAction<typeof defaultValue>>;
     const defaultUpdate: UpdateType = () => defaultValue;
     const ctx = createContext({
       state: defaultValue,
       update: defaultUpdate,
     });

     function Provider(props: PropsWithChildren<{}>) {
       const [state, update] = useState(defaultValue);
       return <ctx.Provider value={{ state, update }} {...props} />;
     }
     return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
   }

   // usage
   import { useContext } from "react";

   const [ctx, TextProvider] = createCtx("someText");
   export const TextContext = ctx;
   export function App() {
     return (
       <TextProvider>
         <Component />
       </TextProvider>
     );
   }
   export function Component() {
     const { state, update } = useContext(TextContext);
     return (
       <label>
         {state}
         <input type="text" onChange={(e) => update(e.target.value)} />
       </label>
     );
   }
   ```

   [View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCpAD0ljkwFcA7DYCZuNIlGJAYRjUAPAEEAfAAoAJkkwpGAGxgA1FIsZIAXHFEBKOAG8KcODACeYJHACqYabyQAVS9YC8iYjAB0AEWAAzmC8aAAWwsjoPgDKSDDRMI6ibBzCFlYQmHCy8kqq6pri4gDcJlwcAfA5Csp2Dnw6dY4uVnAekgZu4tlyNfkaSKXkpmgV8BjUbZ5R3tyofPwcfNQwksbDpnCVjjrVeWoDADRlpoz2Oz25ted8ZQC+ekOmTKww7JwACjgAbsCyUJIwDgwAEdJEMN4vhAQQB1YAwUL8ULARTSIjMYSGO7iAzrTblZiVOAAbW2fEOcDO9SQAF0puCfIwAkgEo4ZL19gUkI8TnAiDBGFBOMIJpCfn8kFA4N8uW5DIYtolyZSbtY7ncjN4tUDoQENQB6Er3Mr8wWcYkTClQ37-OkoAIEyrFOD6-VwdR8IW8YDfJCKcwU4npJCZLhCCnB0PWiVQGkUO4UCiuykBFAAcyQifIo0J8At4bgThoMGjtqmc0cgmokgARAFcM5izWeeQaHRxmNC8XFsxlvAPBMhm3oFgWClOKIwGAOkYTXEzXBJLzhEWVqXJeJeaZhItwBwkL2XZuNtv9auS+L-sfTC2E63aCOGGO3hw4LvIMwD6tcWUc0SFWSSAUlSjhwBqHgMt4TICEsxaSOePZ9i2pimkKi7LooKAAEZ+te+JGIBd74XAwjAMwYCMPAwZuDWfY1nAHBIigzAZnK7jdCBfCSEg3iJFAGY+DKAx6AaeGnphOGKHht5AA)

5. A [useReducer-based version](https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052) may also be helpful.

<details>

<summary><b>Mutable Context Using a Class component wrapper</b></summary>

_Contributed by: [@jpavon](https://github.com/typescript-cheatsheets/react/pull/13)_

```tsx
interface ProviderState {
  themeColor: string;
}

interface UpdateStateArg {
  key: keyof ProviderState;
  value: string;
}

interface ProviderStore {
  state: ProviderState;
  update: (arg: UpdateStateArg) => void;
}

const Context = createContext({} as ProviderStore); // type assertion on empty object

class Provider extends React.Component<
  { children?: ReactNode },
  ProviderState
> {
  public readonly state = {
    themeColor: "red",
  };

  private update = ({ key, value }: UpdateStateArg) => {
    this.setState({ [key]: value });
  };

  public render() {
    const store: ProviderStore = {
      state: this.state,
      update: this.update,
    };

    return (
      <Context.Provider value={store}>{this.props.children}</Context.Provider>
    );
  }
}

const Consumer = Context.Consumer;
```

</details>

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

---
id: forward_and_create_ref
title: forwardRef/createRef
---

Check the [Hooks section](https://github.com/typescript-cheatsheets/react/blob/main/README.md#hooks) for `useRef`.

`createRef`:

```tsx
import { createRef, PureComponent } from "react";

class CssThemeProvider extends PureComponent<Props> {
  private rootRef = createRef<HTMLDivElement>(); // like this
  render() {
    return <div ref={this.rootRef}>{this.props.children}</div>;
  }
}
```

`forwardRef`:

```tsx
import { forwardRef, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}
export type Ref = HTMLButtonElement;

export const FancyButton = forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyClassName" type={props.type}>
    {props.children}
  </button>
));
```

<details>
<summary><b>Side note: the <code>ref</code> you get from <code>forwardRef</code> is mutable so you can assign to it if needed.</b></summary>

This was done [on purpose](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/43265/). You can make it immutable if you have to - assign `React.Ref` if you want to ensure nobody reassigns it:

```tsx
import { forwardRef, ReactNode, Ref } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
}

export const FancyButton = forwardRef(
  (
    props: Props,
    ref: Ref<HTMLButtonElement> // <-- here!
  ) => (
    <button ref={ref} className="MyClassName" type={props.type}>
      {props.children}
    </button>
  )
);
```

</details>

If you are grabbing the props of a component that forwards refs, use [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L770).

## Generic forwardRefs

Read more context in https://fettblog.eu/typescript-react-generic-forward-refs/:

### Option 1 - Wrapper component

```ts
type ClickableListProps<T> = {
  items: T[];
  onSelect: (item: T) => void;
  mRef?: React.Ref<HTMLUListElement> | null;
};

export function ClickableList<T>(props: ClickableListProps<T>) {
  return (
    <ul ref={props.mRef}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}
```

### Option 2 - Redeclare forwardRef

```ts
// Redecalare forwardRef
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

// Just write your components like you're used to!
import { forwardRef, ForwardedRef } from "react";

interface ClickableListProps<T> {
  items: T[];
  onSelect: (item: T) => void;
}

function ClickableListInner<T>(
  props: ClickableListProps<T>,
  ref: ForwardedRef<HTMLUListElement>
) {
  return (
    <ul ref={ref}>
      {props.items.map((item, i) => (
        <li key={i}>
          <button onClick={(el) => props.onSelect(item)}>Select</button>
          {item}
        </li>
      ))}
    </ul>
  );
}

export const ClickableList = forwardRef(ClickableListInner);
```

## More Info

- https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315

You may also wish to do [Conditional Rendering with `forwardRef`](https://github.com/typescript-cheatsheets/react/issues/167).

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

---
id: portals
title: Portals
---

Using `ReactDOM.createPortal`:

```tsx
const modalRoot = document.getElementById("modal-root") as HTMLElement;
// assuming in your html file has a div with id 'modal-root';
export class Modal extends React.Component<{ children?: React.ReactNode }> {
  el: HTMLElement = document.createElement("div");
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWRYmAEQHkBZObXAo9GAWgBNcZchTQQAdgGd4ICHxQAbBBAjwAvHAFoAriCRiYAOgDmSGAFF5SXfoBCATwCSfABQAiGXPk8cK1wEo4FAk4AAkAFWYAGQsrPRgAbgoAeiTAiQkdYDEjOCy4OwgtKDgACxgQeTZgS1KgwI1gADc4AHdgGBLcvgIPBW9lGHxE4XIkAA9qeDR5IODmWQU4cZg9PmDkbgMAYVxIMTi4AG8KOCX5AC5QiOjLazUNCG07gzQuFZi7tz4m-2GTuFE4HEcXowD48y0+mcAWO5FOp16igGBhQYDAqy2JWqLg6wAkBiQ8j8w1OAF8KP9AXs4gB1aryACqYhkkJg0KO-wRCyRKgMRBkjSQmOxzlx+MJxP+5JGpyIYj4SCg7Nh8LgRBgRTEtG4TGYLzeSAACtAYApRVj8WAcGB8WgsfI+HKADRwMUEokkuDS0lAA)

<details>
  <summary><b>Using hooks</b></summary>

Same as above but using hooks

```tsx
import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
const modalRoot = document.querySelector("#modal-root") as HTMLElement;
interface ModalProps {
  children?: ReactNode;
}
const Modal = ({ children }: ModalProps) => {
  const el = useRef(document.createElement("div"));
  useEffect(() => {
    // Use this in case CRA throws an error about react-hooks/exhaustive-deps
    const current = el.current;
    // We assume `modalRoot` exists with '!'
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);
  return createPortal(children, el.current);
};
export default Modal;
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoUSWOAbzjSJRiQAVoYUAbOAXzmy4CTDAFoAJrjLkKAellwUAZyUBXEMAB2Aczha4ATwiqocABYwQPTMC5JzyxXHHAAbnADuwGGb3iCIBDi3KI4EDD4ANwUFGgQmkrwALJB3ABciMQwAHQAYgDCADy0vAB8cAC8cAAU9GhmtuJEmnwAlJXltBRwcPJwAKIgqlzM9j72aCMqDLiQmkiaEUp6CZyaaPauKFDAKABGdp7evihwRJjdM6twSDxVyOg5qkpIyJjVkmjqCzmMqCz9OwgH7VABELlcoNarWiMnIPQeGGyzyQ-UwmCQGGq1XaFU6lx6fQA6vZlGpgXAAAaBYJcBAQcKUm4AD2AiWWXh8BAAhNIej04tcadx6eFKs4IF9gYtsgBHVRIKAGADKt0xMGgYIAxMKuKEGTAoYplgAJAAqSQAMoCkNKYLD+XBdaKYNzsigwGAFuJ8g0uOJqrdsl8oM0YDCCWckDATC0cR04K4IMB-M6DW6iIFXEhfY1A1xgyYwxH4XwADRwADaAF0S5c+gBJVaofwQTBU26UivjK6cLSKvTLHuU86F0M-SmXIgxqAtP6jdiwbjVeqNZoVoMh4uw3iwuQKZ4obRIGLkTCqdYwYDxOAAQU98a6pcFiSrSjMEA8KVpFZeMGVH5fqkXDVuKiJPC8yqcCw1SYNwLwlj006xjUkaFBCpSRoSChGKoDAoC08EQHAYCqPAPhsishjGKYiTMMAaDmJY1i2CepaOuhbh+BUoK6vq4SgqUhSyBhWF0O+n7ftwcAAGQyah7GOnAhRSVwmGKUpykQmJmmJAYdgVLQT6aSZzhsmAIwGBkoLaDs4igmWOkmRZ6BIA2LAgEo1kbIsioOU5mlmEgwDaBY1kAIwAAyRa4Zj+RpplHOIPgZPgUUxWY+COQlpl7OgADWtnGJo4jWVA2h5dUkVltVtXZOFrTxYlSkAF5NuISDMhkACc3XZc1PS8LwAVwOpA1wA2+B4KcurcrQoJwKCw05UphR7GRGotHpBlGXlaCFTgF6lYtYAegYKAeA0YBLfw8T5FwDH5YZ8Z4nAf4AZJwGwfBSCtGUkwQC8wnrTAm1jYlwmiStwmqeDjp-WJa0bTed0Pftz24uU72Aap1QwFACp-aUEkeHAqnA8jmhw-yfREK+bbUSYiiemhIluODrQULwQA)

</details>

Modal Component Usage Example:

```tsx
import { useState } from "react";
function App() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      // you can also put this in your static html file
      <div id="modal-root"></div>
      {showModal && (
        <Modal>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "100vh",
              width: "100vh",
              background: "rgba(0,0,0,0.1)",
              zIndex: 99,
            }}
          >
            I'm a modal!{" "}
            <button
              style={{ background: "papyawhip" }}
              onClick={() => setShowModal(false)}
            >
              close
            </button>
          </div>
        </Modal>
      )}
      <button onClick={() => setShowModal(true)}>show Modal</button>
      // rest of your app
    </div>
  );
}
```

<details>

<summary><b>Context of Example</b></summary>

This example is based on the [Event Bubbling Through Portal](https://reactjs.org/docs/portals.html#event-bubbling-through-portals) example of React docs.

</details>

---
id: error_boundaries
title: Error Boundaries
---

### Option 1: Using react-error-boundary

[React-error-boundary](https://github.com/bvaughn/react-error-boundary) - is a lightweight package ready to use for this scenario with TS support built-in.
This approach also lets you avoid class components that are not that popular anymore.

### Options 2: Writing your custom error boundary component

If you don't want to add a new npm package for this, you can also write your own `ErrorBoundary` component.

```jsx
import React, { Component, ErrorInfo, ReactNode } from "react";
interface Props {
  children?: ReactNode;
}
interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }
  public render() {
    if (this.state.hasError) {
      return <h1>Sorry.. there was an error</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
```

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

---
id: concurrent
title: Concurrent React/React Suspense
---

_Not written yet._ watch <https://github.com/sw-yx/fresh-async-react> for more on React Suspense and Time Slicing.

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

---
id: types
title: "Troubleshooting Handbook: Types"
sidebar_label: Types
---

> ⚠️ Have you read [the TypeScript FAQ](https://github.com/microsoft/TypeScript/wiki/FAQ?) Your answer might be there!

Facing weird type errors? You aren't alone. This is the hardest part of using TypeScript with React. Be patient - you are learning a new language after all. However, the more you get good at this, the less time you'll be working _against_ the compiler and the more the compiler will be working _for_ you!

Try to avoid typing with `any` as much as possible to experience the full benefits of TypeScript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

## Union Types and Type Guarding

Union types are handy for solving some of these typing problems:

```tsx
class App extends React.Component<
  {},
  {
    count: number | null; // like this
  }
> {
  state = {
    count: null,
  };
  render() {
    return <div onClick={() => this.increment(1)}>{this.state.count}</div>;
  }
  increment = (amt: number) => {
    this.setState((state) => ({
      count: (state.count || 0) + amt,
    }));
  };
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BBMMOJADxiQDsATRsnQwAdAGFckHrxgAeCnDgBvAL4AaBcs2K0EAK48YALjg89IAEZIocAD6m91agG44AejdxqwANZI4MAAWwHSaKhQAfFrkinQwKNxwALzRijr6hiZmTmHOmkT81gAUAJSpaUQwelA8cLJ8wABucBA8Yt5oPklKpclRQSEiwDxoRCAyRQCMJSoRSgN0InEJSCK6BjAqsm4NjRF5MXDhh8OjSOOGyXBFKCDGDpbWZUlRStoBwYt0SDAAyvHcIrLRIva5vQ5pODrTLXYGraHwWz2AAMZQA1HBbjB3ioSiUDooVAcVEA)

**Type Guarding**: Sometimes Union Types solve a problem in one area but create another downstream. If `A` and `B` are both object types, `A | B` isn't "either A or B", it is "A or B or both at once", which causes some confusion if you expected it to be the former. Learn how to write checks, guards, and assertions (also see the Conditional Rendering section below). For example:

```ts
interface Admin {
  role: string;
}
interface User {
  email: string;
}

// Method 1: use `in` keyword
function redirect(user: Admin | User) {
  if ("role" in user) {
    // use the `in` operator for typeguards since TS 2.7+
    routeToAdminPage(user.role);
  } else {
    routeToHomePage(user.email);
  }
}

// Method 2: custom type guard, does the same thing in older TS versions or where `in` isnt enough
function isAdmin(user: Admin | User): user is Admin {
  return (user as any).role !== undefined;
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoC4AOxiSk3STgEEATEGuAbwrjhwAbJAC44AZxhQaAcwDcFAL5Va9RmmYBVcfR584SECmCCxk6dXlKKFTAFdqGYBGoCIdugBUI7TtQAKKDJIABTiwDLUwJjA9ACUeuT80XBhEVExugC8OQR2OlAIEML4CbxJ-AJIMHZQrvi+NGQVinDWlOT2jjDOrjgeSN4AErhIgcFpkdGxUGX6KZMZM3A5WQSGxoKliZVVNXUEIyBIYEFIzfzK5FcUAPS3cACy1QAWEGxwAIxi+cwABjQ-nAANZIACeAHdoGxbA4nC4qmxgEQMCFflAxI1XAAfODaeI7ODREIAIiESBJRNc6LKcHucF+cBgL3+gLgEDA9BQMGgcEwvJgYM5MjsKCgbHEEhoGjgngAynAAEwAOgA7ABqfT8fpeHwcGjjULo5XkuIKFoGQQ6Qna9y6o5jM5ogrKjYmM36K43cj057M95KsRofI8vCCzlwEVitgAGjgbAgSElzOY4hQxyZL1kVPZgjYunlcAAbvRwi5JbyISyiHAAdQgcBxLQDNR3DIXrDur0ieIsc76Jj9Ti8QU4j8Cj3WEPCUR9q5+1A4ChJShqGC4ibiswAIS5Bz5mLUJAw65AA)

Method 2 is also known as [User-Defined Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) and can be really handy for readable code. This is how TS itself refines types with `typeof` and `instanceof`.

If you need `if...else` chains or the `switch` statement instead, it should "just work", but look up [Discriminated Unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) if you need help. (See also: [Basarat's writeup](https://basarat.gitbook.io/typescript/type-system/discriminated-unions)). This is handy in typing reducers for `useReducer` or Redux.

## Optional Types

If a component has an optional prop, add a question mark and assign during destructure (or use defaultProps).

```tsx
class MyComponent extends React.Component<{
  message?: string; // like this
}> {
  render() {
    const { message = "default" } = this.props;
    return <div>{message}</div>;
  }
}
```

You can also use a `!` character to assert that something is not undefined, but this is not encouraged.

_Something to add? [File an issue](https://github.com/typescript-cheatsheets/react/issues/new) with your suggestions!_

## Enum Types

**We recommend avoiding using enums as far as possible**.

Enums have a few [documented issues](https://fettblog.eu/tidy-typescript-avoid-enums/) (the TS team [agrees](https://twitter.com/orta/status/1348966323271987201?s=20)). A simpler alternative to enums is just declaring a union type of string literals:

```tsx
export declare type Position = "left" | "right" | "top" | "bottom";
```

If you must use enums, remember that enums in TypeScript default to numbers. You will usually want to use them as strings instead:

```tsx
export enum ButtonSizes {
  default = "default",
  small = "small",
  large = "large",
}

// usage
export const PrimaryButton = (
  props: Props & React.HTMLProps<HTMLButtonElement>
) => <Button size={ButtonSizes.default} {...props} />;
```

## Type Assertion

Sometimes you know better than TypeScript that the type you're using is narrower than it thinks, or union types need to be asserted to a more specific type to work with other APIs, so assert with the `as` keyword. This tells the compiler you know better than it does.

```tsx
class MyComponent extends React.Component<{
  message: string;
}> {
  render() {
    const { message } = this.props;
    return (
      <Component2 message={message as SpecialMessageType}>{message}</Component2>
    );
  }
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgGU61gUAbAWSQGduUBzJABVa9ALwFuMKMAB2-fAG4KFOTCRRM6egAUcYbnADeFOHBA8+ggFxwpM+XAA+cAK6yAJkkxykH5eQAvirkaBCyUnAAwriQskiyMABMtsjoMAB0AGJRADx6EAYAfHASABRG5pYCSIEAlKUlZaZwuR7AAG5FLWa5ABYAjEVGFrw1gbkA9IPd5L2T7V0UdSFobCi8cBzUMeDhCfBIAB7qnoZpGBm7cQe5JnNVYzZ20nL8AYEl92ZEnhplDW+ZjgYQi8Eqoys9ECpTgMD6wG4GTA+m4AWBcCIMFcUFkcGaDwxuWu+0SSUeULEI2qgjgG0YzFYnBpwlEn2pT1qUxJ8TJswxdXRcGCQSAA)

Note that you cannot assert your way to anything - basically it is only for refining types. Therefore it is not the same as "casting" a type.

You can also assert a property is non-null, when accessing it:

```ts
element.parentNode!.removeChild(element); // ! before the period
myFunction(document.getElementById(dialog.id!)!); // ! after the property accessing
let userID!: string; // definite assignment assertion... be careful!
```

Of course, try to actually handle the null case instead of asserting :)

## Simulating Nominal Types

TS' structural typing is handy, until it is inconvenient. However you can simulate nominal typing with [`type branding`](https://basarat.gitbook.io/typescript/main-1/nominaltyping):

```ts
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = OrderID | UserID;
```

We can create these values with the Companion Object Pattern:

```ts
function OrderID(id: string) {
  return id as OrderID;
}
function UserID(id: string) {
  return id as UserID;
}
```

Now TypeScript will disallow you from using the wrong ID in the wrong place:

```ts
function queryForUser(id: UserID) {
  // ...
}
queryForUser(OrderID("foobar")); // Error, Argument of type 'OrderID' is not assignable to parameter of type 'UserID'
```

In future you can use the `unique` keyword to brand. [See this PR](https://github.com/microsoft/TypeScript/pull/33038).

## Intersection Types

Adding two types together can be handy, for example when your component is supposed to mirror the props of a native component like a `button`:

```tsx
export interface PrimaryButtonProps {
  label: string;
}
export const PrimaryButton = (
  props: PrimaryButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  // do custom buttony stuff
  return <button {...props}> {props.label} </button>;
};
```

_Playground [here](https://www.typescriptlang.org/play?ssl=4&ssc=1&pln=12&pc=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCipAD0ljmADsYkpN0k4AFKUFKAE8AQgFcYMCE14QwAZzgBvCnDgAbFACMkagFxw5MPkwDmAbgoBfanWjw0Uwzz4gBI8ZKZwAvHAAUKnBgOPL6vPxCYhJSMvJwAGSIxDAAdFGeABIAKgCyADIAghJ8muJIcgA82fnpUgCiakggSCwAfBQAlD6tSoEA9H1wACYQcGiihrhwpdFMggYwopiYgUSLUF4VM55KKXvBsnKWPYoH8ika2mqWcBV921KtFuSWQA)_

You can also use Intersection Types to make reusable subsets of props for similar components:

```tsx
type BaseProps = {
   className?: string,
   style?: React.CSSProperties
   name: string // used in both
}
type DogProps = {
  tailsCount: number
}
type HumanProps = {
  handsCount: number
}
export const Human = (props: BaseProps & HumanProps) => // ...
export const Dog = (props: BaseProps & DogProps) => // ...
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgCEUBnJABRzGbgF44BvCnGFoANi2YA5FCCQB+AFxxmMKMAB2AcwA0Q4Suqj5S5OhgA6AMIBlaxwh1YwJMz1x1MpEpVqtcAPT+cACurAAmcBpwAEYQMAAWFAC+VLT0ACIQmvZcvAJ6MCjAosyWEMHqMErqwSDRSFDJqXRwABK1KOo53HyC5MLxnWGl5ZXVtfWN5CnkSAAekLBwaBDqKm0d6ibEFgBilgA8TKzdcABkGyCd3QB8eQAUAJS8d-d6B2HAAG4BNxSPFAo80W8BWa3gmU02zM5n2RxY7E43AukNuD2ePFe70+P38f3IjyAA)

Make sure not to confuse Intersection Types (which are **and** operations) with Union Types (which are **or** operations).

## Union Types

This section is yet to be written (please contribute!). Meanwhile, see our [commentary on Union Types usecases](https://github.com/typescript-cheatsheets/react/blob/main/README.md#union-types-and-type-guarding).

The ADVANCED cheatsheet also has information on Discriminated Union Types, which are helpful when TypeScript doesn't seem to be narrowing your union type as you expect.

## Overloading Function Types

Specifically when it comes to functions, you may need to overload instead of union type. The most common way function types are written uses the shorthand:

```ts
type FunctionType1 = (x: string, y: number) => number;
```

But this doesn't let you do any overloading. If you have the implementation, you can put them after each other with the function keyword:

```ts
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
  // implementation with combined signature
  // ...
}
```

However, if you don't have an implementation and are just writing a `.d.ts` definition file, this won't help you either. In this case you can forego any shorthand and write them the old-school way. The key thing to remember here is as far as TypeScript is concerned, `functions are just callable objects with no key`:

```ts
type pickCard = {
  (x: { suit: string; card: number }[]): number;
  (x: number): { suit: string; card: number };
  // no need for combined signature in this form
  // you can also type static properties of functions here eg `pickCard.wasCalled`
};
```

Note that when you implement the actual overloaded function, the implementation will need to declare the combined call signature that you'll be handling, it won't be inferred for you. You can readily see examples of overloads in DOM APIs, e.g. `createElement`.

[Read more about Overloading in the Handbook.](https://www.typescriptlang.org/docs/handbook/functions.html#overloads)

## Using Inferred Types

Leaning on TypeScript's Type Inference is great... until you realize you need a type that was inferred, and have to go back and explicitly declare types/interfaces so you can export them for reuse.

Fortunately, with `typeof`, you won't have to do that. Just use it on any value:

```tsx
const [state, setState] = useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

const someMethod = (obj: typeof state) => {
  // grabbing the type of state even though it was inferred
  // some code using obj
  setState(obj); // this works
};
```

## Using Partial Types

Working with slicing state and props is common in React. Again, you don't really have to go and explicitly redefine your types if you use the `Partial` generic type:

```tsx
const [state, setState] = useState({
  foo: 1,
  bar: 2,
}); // state's type inferred to be {foo: number, bar: number}

// NOTE: stale state merging is not actually encouraged in useState
// we are just demonstrating how to use Partial here
const partialStateUpdate = (obj: Partial<typeof state>) =>
  setState({ ...state, ...obj });

// later on...
partialStateUpdate({ foo: 2 }); // this works
```

<details>
<summary><b>Minor caveats on using <code>Partial</code></b></summary>

Note that there are some TS users who don't agree with using `Partial` as it behaves today. See [subtle pitfalls of the above example here](https://twitter.com/ferdaber/status/1084798596027957248), and check out this long discussion on [why @types/react uses Pick instead of Partial](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18365).

</details>

## The Types I need weren't exported!

This can be annoying but here are ways to grab the types!

- Grabbing the Prop types of a component: Use `React.ComponentProps` and `typeof`, and optionally `Omit` any overlapping types

```tsx
import { Button } from "library"; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
type AlertButtonProps = Omit<ButtonProps, "onClick">; // modify
const AlertButton = (props: AlertButtonProps) => (
  <Button onClick={() => alert("hello")} {...props} />
);
```

You may also use [`ComponentPropsWithoutRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L774) (instead of ComponentProps) and [`ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a05cc538a42243c632f054e42eab483ebf1560ab/types/react/index.d.ts#L770) (if your component specifically forwards refs)

- Grabbing the return type of a function: use `ReturnType`:

```tsx
// inside some library - return type { baz: number } is inferred but not exported
function foo(bar: string) {
  return { baz: 1 };
}

//  inside your app, if you need { baz: number }
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```

In fact you can grab virtually anything public: [see this blogpost from Ivan Koshelev](http://ikoshelev.azurewebsites.net/search/id/11/Pragmatic-uses-of-TypeScript-type-system-My-type-of-type)

```ts
function foo() {
  return {
    a: 1,
    b: 2,
    subInstArr: [
      {
        c: 3,
        d: 4,
      },
    ],
  };
}

type InstType = ReturnType<typeof foo>;
type SubInstArr = InstType["subInstArr"];
type SubInstType = SubInstArr[0];

let baz: SubInstType = {
  c: 5,
  d: 6, // type checks ok!
};

//You could just write a one-liner,
//But please make sure it is forward-readable
//(you can understand it from reading once left-to-right with no jumps)
type SubInstType2 = ReturnType<typeof foo>["subInstArr"][0];
let baz2: SubInstType2 = {
  c: 5,
  d: 6, // type checks ok!
};
```

- TS also ships with a `Parameters` utility type for extracting the parameters of a function
- for anything more "custom", the `infer` keyword is the basic building block for this, but takes a bit of getting used to. Look at the source code for the above utility types, and [this example](https://twitter.com/mgechev/status/1211030455224422401?s=20) to get the idea. Basarat [also has a good video on `infer`](https://www.youtube.com/watch?v=ijK-1R-LFII&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=3&t=0s).

## The Types I need don't exist!

What's more annoying than modules with unexported types? Modules that are **untyped**!

> Before you proceed - make sure you have checked that types don't exist in [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) or [TypeSearch](https://microsoft.github.io/TypeSearch/)

Fret not! There are more than a couple of ways in which you can solve this problem.

### Slapping `any` on everything

A **lazier** way would be to create a new type declaration file, say `typedec.d.ts`– if you don't already have one. Ensure that the path to file is resolvable by TypeScript by checking the `include` array in the `tsconfig.json` file at the root of your directory.

```json
// inside tsconfig.json
{
  // ...
  "include": [
    "src" // automatically resolves if the path to declaration is src/typedec.d.ts
  ]
  // ...
}
```

Within this file, add the `declare` syntax for your desired module, say `my-untyped-module`– to the declaration file:

```ts
// inside typedec.d.ts
declare module "my-untyped-module";
```

This one-liner alone is enough if you just need it to work without errors. A even hackier, write-once-and-forget way would be to use `"*"` instead which would then apply the `Any` type for all existing and future untyped modules.

This solution works well as a workaround if you have less than a couple untyped modules. Anything more, you now have a ticking type-bomb in your hands. The only way of circumventing this problem would be to define the missing types for those untyped modules as explained in the following sections.

### Autogenerate types

You can use TypeScript with `--allowJs` and `--declaration` to see TypeScript's "best guess" at the types of the library.

If this doesn't work well enough, use [`dts-gen`](https://github.com/Microsoft/dts-gen) to use the runtime shape of the object to accurately enumerate all available properties. This tends to be very accurate, BUT the tool does not yet support scraping JSDoc comments to populate additional types.

```bash
npm install -g dts-gen
dts-gen -m <your-module>
```

There are other automated JS to TS conversion tools and migration strategies - see [our MIGRATION cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/migration/from_js).

### Typing Exported Hooks

Typing Hooks is just like typing pure functions.

The following steps work under two assumptions:

- You have already created a type declaration file as stated earlier in the section.
- You have access to the source code - specifically the code that directly exports the functions you will be using. In most cases, it would be housed in an `index.js` file.
  Typically you need a minimum of **two** type declarations (one for **Input Prop** and the other for **Return Prop**) to define a hook completely. Suppose the hook you wish to type follows the following structure,

```js
// ...
const useUntypedHook = (prop) => {
  // some processing happens here
  return {
    /* ReturnProps */
  };
};
export default useUntypedHook;
```

then, your type declaration should most likely follow the following syntax.

```ts
declare module 'use-untyped-hook' {
  export interface InputProps { ... }   // type declaration for prop
  export interface ReturnProps { ... } // type declaration for return props
  export default function useUntypedHook(
    prop: InputProps
    // ...
  ): ReturnProps;
}
```

<details>
<summary><b>For instance, the <a href="https://github.com/donavon/use-dark-mode">useDarkMode hook</a> exports the functions that follows a similar structure.</b></summary>

```js
// inside src/index.js
const useDarkMode = (
  initialValue = false, // -> input props / config props to be exported
  {
    // -> input props / config props to be exported
    element,
    classNameDark,
    classNameLight,
    onChange,
    storageKey = "darkMode",
    storageProvider,
    global,
  } = {}
) => {
  // ...
  return {
    // -> return props to be exported
    value: state,
    enable: useCallback(() => setState(true), [setState]),
    disable: useCallback(() => setState(false), [setState]),
    toggle: useCallback(() => setState((current) => !current), [setState]),
  };
};
export default useDarkMode;
```

As the comments suggest, exporting these config props and return props following the aforementioned structure will result in the following type export.

```ts
declare module "use-dark-mode" {
  /**
   * A config object allowing you to specify certain aspects of `useDarkMode`
   */
  export interface DarkModeConfig {
    classNameDark?: string; // A className to set "dark mode". Default = "dark-mode".
    classNameLight?: string; // A className to set "light mode". Default = "light-mode".
    element?: HTMLElement; // The element to apply the className. Default = `document.body`
    onChange?: (val?: boolean) => void; // Override the default className handler with a custom callback.
    storageKey?: string; // Specify the `localStorage` key. Default = "darkMode". Set to `null` to disable persistent storage.
    storageProvider?: WindowLocalStorage; // A storage provider. Default = `localStorage`.
    global?: Window; // The global object. Default = `window`.
  }
  /**
   * An object returned from a call to `useDarkMode`.
   */
  export interface DarkMode {
    readonly value: boolean;
    enable: () => void;
    disable: () => void;
    toggle: () => void;
  }
  /**
   * A custom React Hook to help you implement a "dark mode" component for your application.
   */
  export default function useDarkMode(
    initialState?: boolean,
    config?: DarkModeConfig
  ): DarkMode;
}
```

</details>

### Typing Exported Components

In case of typing untyped class components, there's almost no difference in approach except for the fact that after declaring the types, you export the extend the type using `class UntypedClassComponent extends React.Component<UntypedClassComponentProps, any> {}` where `UntypedClassComponentProps` holds the type declaration.

For instance, [sw-yx's Gist on React Router 6 types](https://gist.github.com/sw-yx/37a6a3d248c2d4031801f0d568904df8) implemented a similar method for typing the then untyped RR6.

```ts
declare module "react-router-dom" {
  import * as React from 'react';
  // ...
  type NavigateProps<T> = {
    to: string | number,
    replace?: boolean,
    state?: T
  }
  //...
  export class Navigate<T = any> extends React.Component<NavigateProps<T>>{}
  // ...
```

For more information on creating type definitions for class components, you can refer to this [post](https://templecoding.com/blog/2016/03/31/creating-typescript-typings-for-existing-react-components) for reference.

## Frequent Known Problems with TypeScript

Just a list of stuff that React developers frequently run into, that TS has no solution for. Not necessarily TSX only.

### TypeScript doesn't narrow after an object element null check

[![https://pbs.twimg.com/media/E0u6b9uUUAAgwAk?format=jpg&name=medium](https://pbs.twimg.com/media/E0u6b9uUUAAgwAk?format=jpg&name=medium)](https://mobile.twitter.com/tannerlinsley/status/1390409931627499523)

Ref: https://mobile.twitter.com/tannerlinsley/status/1390409931627499523. see also https://github.com/microsoft/TypeScript/issues/9998

### TypeScript doesn't let you restrict the type of children

Guaranteeing typesafety for this kind of API isn't possible:

```tsx
<Menu>
  <MenuItem/> {/* ok */}
  <MenuLink/> {/* ok */}
  <div> {/* error */}
</Menu>
```

Source: https://twitter.com/ryanflorence/status/1085745787982700544?s=20

---
id: operators
title: "Troubleshooting Handbook: Operators"
sidebar_label: Operators
---

- `typeof` and `instanceof`: type query used for refinement
- `keyof`: get keys of an object. `keyof T` is an operator to tell you what values of `k` can be used for `obj[k]`.
  - [Some misconceptions here](https://twitter.com/SeaRyanC/status/1418678670739218438?s=20).
- `O[K]`: property lookup
- `[K in O]`: mapped types
- `+` or `-` or `readonly` or `?`: addition and subtraction and readonly and optional modifiers
- `x ? Y : Z`: Conditional types for generic types, type aliases, function parameter types
- `!`: Nonnull assertion for nullable types
- `=`: Generic type parameter default for generic types
- `as`: type assertion
- `is`: type guard for function return types

Conditional Types are a difficult topic to get around so here are some extra resources:

- fully walked through explanation https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
- Bailing out and other advanced topics https://github.com/sw-yx/ts-spec/blob/master/conditional-types.md
- Basarat's video https://www.youtube.com/watch?v=SbVgPQDealg&list=PLYvdvJlnTOjF6aJsWWAt7kZRJvzw-en8B&index=2&t=0s
- [Generics, Conditional types and Mapped types](https://www.youtube.com/watch?v=PJjeHzvi_VQ&feature=youtu.be)

---
id: utilities
title: "Troubleshooting Handbook: Utilities"
sidebar_label: Utilities
---

These are all built in, [see source in es5.d.ts](https://github.com/microsoft/TypeScript/blob/2c458c0d1ccb96442bca9ce43aa987fb0becf8a9/src/lib/es5.d.ts#L1401-L1474):

- `ConstructorParameters`: a tuple of class constructor's parameter types
- `Exclude`: exclude a type from another type
- `Extract`: select a subtype that is assignable to another type
- `InstanceType`: the instance type you get from a `new`ing a class constructor
- `NonNullable`: exclude `null` and `undefined` from a type
- `Parameters`: a tuple of a function's parameter types
- `Partial`: Make all properties in an object optional
- `Readonly`: Make all properties in an object readonly
- `ReadonlyArray`: Make an immutable array of the given type
- `Pick`: A subtype of an object type with a subset of its keys
- `Record`: A map from a key type to a value type
- `Required`: Make all properties in an object required
- `ReturnType`: A function's return type

---
id: non_ts_files
title: "Troubleshooting Handbook: Globals, Images and other non-TS files"
sidebar_label: Globals, Images and other non-TS files
---

Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html).

If, say, you are using a third party JS script that attaches on to the `window` global, you can extend `Window`:

```ts
declare global {
  interface Window {
    MyVendorThing: MyVendorType;
  }
}
```

Likewise if you wish to "import" an image or other non TS/TSX file:

```ts
// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module "*.png";
// importing in a tsx file
import * as logo from "./logo.png";
```

Note that `tsc` cannot bundle these files for you, you will have to use Webpack or Parcel.

Related issue: https://github.com/Microsoft/TypeScript-React-Starter/issues/12 and [StackOverflow](https://stackoverflow.com/a/49715468/4216035)

---
id: tsconfig
title: "Troubleshooting Handbook: tsconfig.json"
sidebar_label: tsconfig.json
---

You can find [all the Compiler options in the TypeScript docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html). [The new TS docs also has per-flag annotations of what each does](https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports). This is the setup I roll with for APPS (not libraries - for libraries you may wish to see the settings we use in `tsdx`):

```json
{
  "compilerOptions": {
    "incremental": true,
    "outDir": "build/lib",
    "target": "es5",
    "module": "esnext",
    "lib": ["DOM", "ESNext"],
    "sourceMap": true,
    "importHelpers": true,
    "declaration": true,
    "rootDir": "src",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowJs": false,
    "jsx": "react",
    "moduleResolution": "node",
    "baseUrl": "src",
    "forceConsistentCasingInFileNames": true,
    "esModuleInterop": true,
    "suppressImplicitAnyIndexErrors": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "build", "scripts"]
}
```

You can find more [recommended TS config here](https://github.com/tsconfig/bases).

Please open an issue and discuss if there are better recommended choices for React.

Selected flags and why we like them:

- `esModuleInterop`: disables namespace imports (`import * as foo from "foo"`) and enables CJS/AMD/UMD style imports (`import fs from "fs"`)
- `strict`: `strictPropertyInitialization` forces you to initialize class properties or explicitly declare that they can be undefined. You can opt out of this with a definite assignment assertion.
- `"typeRoots": ["./typings", "./node_modules/@types"]`: By default, TypeScript looks in `node_modules/@types` and parent folders for third party type declarations. You may wish to override this default resolution so you can put all your global type declarations in a special `typings` folder.

Compilation time grows linearly with size of codebase. For large projects, you will want to use [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html). See our [ADVANCED](https://react-typescript-cheatsheet.netlify.app/docs/advanced/intro/) cheatsheet for commentary.

---
id: official_typings_bugs
title: Fixing bugs in official typings
sidebar_label: Fixing bugs in official typings
---

If you run into bugs with your library's official typings, you can copy them locally and tell TypeScript to use your local version using the "paths" field. In your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "mobx-react": ["../typings/modules/mobx-react"]
    }
  }
}
```

[Thanks to @adamrackis for the tip.](https://twitter.com/AdamRackis/status/1024827730452520963)

If you just need to add an interface, or add missing members to an existing interface, you don't need to copy the whole typing package. Instead, you can use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html):

```tsx
// my-typings.ts
declare module "plotly.js" {
  interface PlotlyHTMLElement {
    removeAllListeners(): void;
  }
}

// MyComponent.tsx
import { PlotlyHTMLElement } from "plotly.js";

const f = (e: PlotlyHTMLElement) => {
  e.removeAllListeners();
};
```

You dont always have to implement the module, you can simply import the module as `any` for a quick start:

```tsx
// my-typings.ts
declare module "plotly.js"; // each of its imports are `any`
```

Because you don't have to explicitly import this, this is known as an [ambient module declaration](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html#pitfalls-of-namespaces-and-modules). You can do AMD's in a script-mode `.ts` file (no imports or exports), or a `.d.ts` file anywhere in your project.

You can also do ambient variable and ambient type declarations:

```ts
// ambient utiltity type
type ToArray<T> = T extends unknown[] ? T : T[];
// ambient variable
declare let process: {
  env: {
    NODE_ENV: "development" | "production";
  };
};
process = {
  env: {
    NODE_ENV: "production",
  },
};
```

You can see examples of these included in the built in type declarations in the `lib` field of `tsconfig.json`

---
id: learn_ts
title: "Time to Really Learn TypeScript"
sidebar_label: Time to Really Learn TypeScript
---

Believe it or not, we have only barely introduced TypeScript here in this cheatsheet. If you are still facing TypeScript troubleshooting issues, it is likely that your understanding of TS is still too superficial.

There is a whole world of generic type logic that you will eventually get into, however it becomes far less dealing with React than just getting good at TypeScript so it is out of scope here. But at least you can get productive in React now :)

It is worth mentioning some resources to help you get started:

- Step through the 40+ examples under [the playground's](http://www.typescriptlang.org/play/index.html) Examples section, written by @Orta
- Anders Hejlsberg's overview of TS: https://www.youtube.com/watch?v=ET4kT88JRXs
- Marius Schultz: https://blog.mariusschulz.com/series/typescript-evolution with an [Egghead.io course](https://egghead.io/courses/advanced-static-types-in-typescript)
- Basarat's Deep Dive: https://basarat.gitbook.io/typescript/
- Axel Rauschmeyer's [Tackling TypeScript](https://exploringjs.com/tackling-ts/)
- Rares Matei: [Egghead.io course](https://egghead.io/courses/practical-advanced-typescript)'s advanced TypeScript course on Egghead.io is great for newer typescript features and practical type logic applications (e.g. recursively making all properties of a type `readonly`)
- Learn about [Generics, Conditional types and Mapped types](https://www.youtube.com/watch?v=PJjeHzvi_VQ&feature=youtu.be)
- Shu Uesugi: [TypeScript for Beginner Programmers](https://ts.chibicode.com/)
- Here is another [TypeScript Error Guide](https://github.com/threehams/typescript-error-guide/) that you can check for your errors.

---
id: codebases
title: Recommended React + TypeScript codebases to learn from
sidebar_label: Codebases
---

- Apps
  - https://github.com/devhubapp/devhub
  - https://github.com/benawad/codeponder (with [coding livestream!](https://www.youtube.com/watch?v=D8IJOwdNSkc&list=PLN3n1USn4xlnI6kwzI8WrNgSdG4Z6daCq))
  - https://github.com/cypress-io/cypress-realworld-app
  - https://github.com/alan2207/bulletproof-react
- Design Systems/Component Libraries
  - https://github.com/seek-oss/braid-design-system/ (see [how to use TS to validate props](https://twitter.com/markdalgleish/status/1339863859469955072?s=20))
  - https://github.com/palantir/blueprint
  - https://github.com/Shopify/polaris
  - https://github.com/microsoft/fluentui
- Libraries
  - https://github.com/formium/formik/
  - https://github.com/jaredpalmer/react-fns
- Misc
  - https://github.com/NullVoxPopuli/react-vs-ember/tree/master/testing/react
  - https://github.com/artsy/reaction
  - https://github.com/artsy/emission (React Native)
  - [@reach/ui's community typings](https://github.com/reach/reach-ui/pull/105)
  - https://github.com/pshrmn/curi/tree/master/packages/router

Older but still worth checking:

- https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/
- https://github.com/contiamo/operational-ui

React Boilerplates:

- https://github.com/rwieruch/nextjs-firebase-authentication: Next.js + Firebase Starter: styled, tested, typed, and authenticated
- [@jpavon/react-scripts-ts](https://github.com/jpavon/react-scripts-ts) alternative react-scripts with all TypeScript features using [ts-loader](https://github.com/TypeStrong/ts-loader)
- [webpack config tool](https://webpack.jakoblind.no/) is a visual tool for creating webpack projects with React and TypeScript
- <https://github.com/innFactory/create-react-app-material-typescript-redux> ready to go template with [Material-UI](https://material-ui.com/), routing and Redux

React Native Boilerplates: _contributed by [@spoeck](https://github.com/typescript-cheatsheets/react/pull/20)_

- https://github.com/GeekyAnts/react-native-seed
- https://github.com/lopezjurip/ReactNativeTS
- https://github.com/emin93/react-native-template-typescript
- <https://github.com/Microsoft/TypeScript-React-Native-Starter>

TS Library Codebases to study

- https://github.com/Azure/azure-sdk-for-js
- https://github.com/sindresorhus/is
- https://github.com/probot/probot
- https://github.com/intuit/auto
- https://github.com/polymer/tools
- https://github.com/nteract/nteract
- https://github.com/pgilad/leasot
- https://github.com/JasonEtco/actions-toolkit
- https://github.com/ferdaber/typescript-bootstrap/
- https://github.com/contiamo/operational-scripts
- https://github.com/nobrainr/morphism
- https://github.com/slackapi/node-slack-sdk

---
id: resources
title: Other React + TypeScript resources
sidebar_label: Other resources
---

- me! <https://twitter.com/swyx>
- https://www.freecodecamp.org/news/how-to-build-a-todo-app-with-react-typescript-nodejs-and-mongodb/
- <https://github.com/piotrwitek/react-redux-typescript-guide> - **HIGHLY HIGHLY RECOMMENDED**, i wrote this repo before knowing about this one, this has a lot of stuff I don't cover, including **REDUX** and **JEST**.
- [10 Bad TypeScript Habits](https://startup-cto.net/10-bad-typescript-habits-to-break-this-year/):
  1. not using `"strict": true`
  2. using `||` for default values when we have `??`
  3. Using `any` instead of `unknown` for API responses
  4. using `as` assertion instead of Type Guards (`function isFoo(obj: unknown): obj is Foo {}`)
  5. `as any` in tests
  6. Marking optional properties instead of modeling which combinations exist by extending interfaces
  7. One letter generics
  8. Non-boolean `if (nonboolean)` checks
  9. bangbang checks `if (!!nonboolean)`
  10. `!= null` to check for `null` and `undefined`
- [Ultimate React Component Patterns with TypeScript 2.8](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
- [Basarat's TypeScript gitbook has a React section](https://basarat.gitbook.io/typescript/tsx/react) with an [Egghead.io course](https://egghead.io/courses/use-typescript-to-develop-react-applications) as well.
- [Palmer Group's TypeScript + React Guidelines](https://github.com/palmerhq/typescript) as well as Jared's other work like [disco.chat](https://github.com/jaredpalmer/disco.chat)
- [Sindre Sorhus' TypeScript Style Guide](https://github.com/sindresorhus/typescript-definition-style-guide)
- [TypeScript React Starter Template by Microsoft](https://github.com/Microsoft/TypeScript-React-Starter) A starter template for TypeScript and React with a detailed README describing how to use the two together. Note: this doesn't seem to be frequently updated anymore.
- [Steve Kinney's React and TypeScript course on Frontend Masters (paid)](https://frontendmasters.com/courses/react-typescript/)
- [Brian Holt's Intermediate React course on Frontend Masters (paid)](https://frontendmasters.com/courses/intermediate-react/converting-the-app-to-typescript/) - Converting App To TypeScript Section
- [Mike North's Production TypeScript course on Frontend Masters (paid)](https://frontendmasters.com/courses/production-typescript/)
- [TSX Guide](https://jenil.github.io/chota/) by [gojutin](https://github.com/gojutin/www.tsx.guide)
- TypeScript conversion:
  - [Lyft's React-To-TypeScript conversion CLI](https://github.com/lyft/react-javascript-to-typescript-transform)
  - [Gustav Wengel's blogpost - converting a React codebase to TypeScript](http://www.gustavwengel.dk/converting-typescript-to-javascript-part-1)
  - [Microsoft React TypeScript conversion guide](https://github.com/Microsoft/TypeScript-React-Conversion-Guide#typescript-react-conversion-guide)
- [You?](https://github.com/typescript-cheatsheets/react/issues/new).

---
id: useful-hooks
title: Useful Hooks
---

Useful hooks to have with their TypeScript types :)

> ⚠️ This is a VERY new document - contributions are welcome!

Other useful resources:

- https://usehooks.com/

- https://usehooks-typescript.com/

## useLocalStorage

<details>
<summary>Persist useState in localstorage.</summary>

```tsx
import { useState } from "react";

// Usage
function App() {
  // Similar to useState but first arg is key to the value in local storage.
  const [name, setName] = useLocalStorage<string>("name", "Bob");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

// Hook
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
```

</details>

## useMedia

<details>
<summary>Media queries in JS</summary>

```tsx
import { useState, useEffect } from 'react';

function App() {
  const columnCount = useMedia<number>(
    // Media queries
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    // Column counts (relates to above media queries by array index)
    [5, 4, 3],
    // Default column count
    2
  );

  // Create array of column heights (start at 0)
  let columnHeights = new Array(columnCount).fill(0);

  // Create array of arrays that will hold each column's items
  let columns = new Array(columnCount).fill().map(() => []) as Array<DataProps[]>;

  (data as DataProps[]).forEach(item => {
    // Get index of shortest column
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    // Add item
    columns[shortColumnIndex].push(item);
    // Update height
    columnHeights[shortColumnIndex] += item.height;
  });

  // Render columns and items
  return (
    <div className="App">
      <div className="columns is-mobile">
        {columns.map(column => (
          <div className="column">
            {column.map(item => (
              <div
                className="image-container"
                style={{
                  // Size image container to aspect ratio of image
                  paddingTop: (item.height / item.width) * 100 + '%'
                }}
              >
                <img src={item.image} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Hook
const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  // Array containing a media query list for each query
  const mediaQueryLists = queries.map(q => window.matchMedia(q));

  // Function that gets value based on matching media query
  const getValue = () => {
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    // Return related value or defaultValue if none
    return values?.[index] || defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState<T>(getValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach(mql => mql.addListener(handler));
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
}
```

</details>

## useAsyncTask

This Hook is designed for users to make async calls and also know the current state of the request. _thanks to [Adnan S Husain](https://github.com/adnanhusain15) for contributing_!

<details>
<summary>
Example implementation
</summary>

```tsx
// Usage
const task = useAsyncTask(async (data: any) => await myApiRequest(data));
task.run(data);
useEffect(() => {
  console.log(task.status); // 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
}, [task.status]);

// Implementation

import { useCallback, useState } from "react";

type TStatus = "IDLE" | "PROCESSING" | "ERROR" | "SUCCESS";

function useAsyncTask<T extends any[], R = any>(
  task: (...args: T) => Promise<R>
) {
  const [status, setStatus] = useState<TStatus>("IDLE");
  const [message, setMessage] = useState("");

  const run = useCallback(async (...arg: T) => {
    setStatus("PROCESSING");
    try {
      const resp: R = await task(...arg);
      setStatus("SUCCESS");
      return resp;
    } catch (error) {
      let message = error?.response?.data?.error?.message || error.message;
      setMessage(message);
      setStatus("ERROR");
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setMessage("");
    setStatus("IDLE");
  }, []);

  return {
    run,
    status,
    message,
    reset,
  };
}

export default useAsyncTask;
```

</details>

See also: [useAsync](https://usehooks.com/useAsync/).

## useFetch

This Hook is useful to make fetch requests using `AbortController`

<details>
<summary>
Example implementation
</summary>

```tsx
export function useFetch(request: RequestInfo, init?: RequestInit) {
  const [response, setResponse] = useState<null | Response>(null);
  const [error, setError] = useState<Error | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    (async () => {
      try {
        const response = await fetch(request, {
          ...init,
          signal: abortController.signal,
        });
        setResponse(await response?.json());
        setIsLoading(false);
      } catch (error) {
        if (isAbortError(error)) {
          return;
        }
        setError(error as any);
        setIsLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [init, request]);

  return { response, error, isLoading };
}

// type guards
function isAbortError(error: any): error is DOMException {
  if (error && error.name === "AbortError") {
    return true;
  }
  return false;
}
```

[See this in TS Playground](https://www.typescriptlang.org/play?&q=400#code/PTAECUFMEMGMBdQEsDOpqgA4HtMFcAbaAJ1AKQCNiSBPUAM21NmJniQDsBzUPFSUp3gD6cSCgB0AWABQIUAElEmYtgBuSACbj0oAFLQ10AMoskmRNAop41BEmwcGTUCzaceGyAHdZ82NgAtjgckBzwaHweugZGpsTmiETceNBckKCQAB7CHCgOTrDQBASQmn5gesYAGtIyFaAAKjSYkPGJoCh4mDjEEfo1ADToHJpYqhraaBgJsAAWnZCI2PQN8C0Z8NjYBGhboLNzBHSB2NoEoHPY3q5BIWH9ARyhCHUNjdi8owI20KOX1yaG3aFlA3iYAGs0N4kPAFlA4IgAsFHA8UA0aNg8KBAtA6N4-pZxkhAgJQI5QOlQrMUAAuCoNAC0mSy0GCpVpVIESFgjPoeA49kc6LkYGZ2TZmA5XNmjNgRBQ-BFDQAYkhiDYwZAAOQlMjbCHoRBXG4ynnIcIiMTTVi8fhjfa4zANBEIW4o0LhSRNOaoZDTBjQPBZRmuxD8wXsRzFd33cL0+oydatUAqoOshAqgVCjgAYTuqPCAB4AAqqTBobK5TRoADeAF8AHygAC8oAAFLJQONcHTQGXe4Mu7dLTkAPy0kY0WQASlbzbTwcRWcjBXzHoeRb+NGbAB9QBxCBd91VagBRUqk8IAblkLqxXCONATIFV6eX2ajeYLnsQfowZqwAwn4FGCvrzAckDkDojgNH82BwmSyaQMMA4VhI-blmgczQHsnwUBkfzkhQABWkBuu2jrQBCGRdKwGJYqAmiONqyi4QGKgkrCSBqJAc5-A6cwZGhewbGCSB6gRDSsIyfBlOgexCQw6qaiQXB4Fef5OIhwGro4byik0nxycg8DDJi2KhPJGAqL2oDIQmshCFasAZAAItAwgiaAtbDqg2AABwAGwAAwAIwecIk42Ak3C3jI3akoqaSQNFtgePF9Z3oZADqGRFNpQmFKwnmEaAkWQOucaIN44ELHJimQA0FXec5xCiK5wwCZB3wavZSmaKVBlPJqFVVYW8CTouGbwCuObjb+RYtVhzZtrZFbzh2w5FuwpJMaVjQkpALa1utkj+cF4UVU2p1YRISUoCl9ZFsAu2QI2s7xe8vpoG4pUBhGOZgTyCx+oB4lwroIkNEYCRWKUwMQTheGgARIzEWRrw+vlP4PLpObSUseDEHkmSwkJpDwYhzC4+E+NfuSpCHiUBnyI0SkIRTsYTaAACCJYKP6ujyuxjIULh8mohhAASAg6tMDT5OySD0Eg8m8RqoErP1nl8wLjkyG1HUZNNiK5gqKALZu3lVmENY+fWwzGPApWtg7za+QlPYVpOInxd2vxRaAzulV9Xv8PAIdB+2KiQGoUepcHLvCMMZ2+1hc4ts2fvDkUJTi7AEITh2mfNmo2BaP7PXaMQ7YzlN74IOb7FW8W257geR6Zdl8gAELkUG-D9X6IuKq4RE4bxqOc5hdndQnoDMrCly4Ws4KUmE3JAWpGloojCwkBkcmCaoeCPliiA6aPkg92A7MZGGZCUNQxB0MiOgwpDsJoNc2lidoqsODcWFA0cgNF+riAyBQPAlhbSBDwBBU4tpkSxyKvkXiGEAAySxtRoCoB4NYVwh5CE+FiUgUo8RcFPv8bq2QpRMDKvQHw3Nfw30TCSXoiAwzDFrHaNoycUJ8LPPQJhbp6wMFUIEUAAAiEqCBpFhzoUwcMIEKRyRVEseY7ZWAAEc8DiEmhASAeiDEKA4IwYYnBYTFygCYmwZjYRzk9t2EaiAADarAUAhH4MMCOUAvHCkgAAXTdnJBORZmbHiMQEvI712yRJnFXVxoA3ECFUMQXxSwzzEHSSEtsYSBFFmyek0A+5ImNjrkk4U7jUCYOwNATQHhMnwAUCgOpDSPB5L4QnSixB9GJOyt2OSwjRHwHbHXTazjuwjlUhQZR+ZwiqBKGSNsoQbi8zmX0BZtgdilFrgMr2AclitPaY07gvT+lV27O2XCNBBQl0mcOaZ9lX4+Sec8mZiBPHeIyG2aABJl5MPgFo3R+ibA8PeR80AEgYVWLMpCj5+QuAcGKJOKw8zHA7OWcQCQSKUUECHIcj59YDlQqOfAfxPybkAq+eIH5Y4JAkRQI4OupKyURxOfUs5XB2yiF2HxK50zxFFGBQsdsaSmCTgFBCDgv8nEIu7CrDsqANnKOKUwcVOSmAznlUSqFrB4DEw4IK55WU9XTIjuq2uErKbTA4DQNlUKOVtK5R4XlxR+COqFe8kllT3kGqNQ8rObzzXoq2ZipZeyJBhrGV6+sVdHYpLhcMUFBigkHOHAGkmPlIIxJ8ZkLVGT-SnOiPG2QZq1hiXUiQGsshAYMxVZs+AVrNXpLRfa+uBaSl+jcgAeQALJniyK5CwoEplKtbS4AAZFOrtTAJAor2i2ZdMjVV9CtdI3Vzys3aT6ZABNmaibZr5fwTKQA)

</details>


---
id: linting
title: Linting
---

> ⚠️Note that [TSLint is now in maintenance and you should try to use ESLint instead](https://medium.com/palantir/tslint-in-2019-1a144c2317a9). If you are interested in TSLint tips, please check this PR from [@azdanov](https://github.com/typescript-cheatsheets/react/pull/14). The rest of this section just focuses on ESLint. [You can convert TSlint to ESlint with this tool](https://github.com/typescript-eslint/tslint-to-eslint-config).

> ⚠️This is an evolving topic. `typescript-eslint-parser` is no longer maintained and [work has recently begun on `typescript-eslint` in the ESLint community](https://eslint.org/blog/2019/01/future-typescript-eslint) to bring ESLint up to full parity and interop with TSLint.

Follow the TypeScript + ESLint docs at https://github.com/typescript-eslint/typescript-eslint:

```
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```

add a `lint` script to your `package.json`:

```json
  "scripts": {
    "lint": "eslint 'src/**/*.ts'"
  },
```

and a suitable `.eslintrc.js` (using `.js` over `.json` here so we can add comments):

```js
module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: "eslint:recommended",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    "no-console": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "@typescript-eslint/explicit-function-return-type": "warn", // Consider using explicit annotations for object literals and function return types even when they can be inferred.
    "no-empty": "warn",
  },
};
```

Most of this is taken from [the `tsdx` PR](https://github.com/palmerhq/tsdx/pull/70/files) which is for **libraries**.

More `.eslintrc.json` options to consider with more options you may want for **apps**:

```json
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:unicorn/recommended"
  ],
  "plugins": ["prettier", "jest", "unicorn"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  "overrides": [
    {
      "files": ["**/*.ts", "**/*.tsx"],
      "parser": "typescript-eslint-parser",
      "rules": {
        "no-undef": "off"
      }
    }
  ]
}
```

You can read a [fuller TypeScript + ESLint setup guide here](https://blog.matterhorn.dev/posts/learn-typescript-linting-part-1/) from Matterhorn, in particular check https://github.com/MatterhornDev/learn-typescript-linting.

Another great resource is ["Using ESLint and Prettier in a TypeScript Project"](https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb) by @robertcoopercode.

Wes Bos is also working on [TypeScript support for his eslint+prettier config.](https://github.com/wesbos/eslint-config-wesbos/issues/68)

If you're looking for information on Prettier, check out the [Prettier](https://github.com/typescript-cheatsheets/react/blob/main/docs/advanced/misc-concerns.md#prettier) guide.

---
id: examples
title: Example App
sidebar_label: Examples
---

- [Create React App TypeScript Todo Example 2021](https://github.com/laststance/create-react-app-typescript-todo-example-2021)
- [Ben Awad's 14 hour Fullstack React/GraphQL/TypeScript Tutorial](https://www.youtube.com/watch?v=I6ypD7qv3Z8)
- [Cypress Realworld App](https://github.com/cypress-io/cypress-realworld-app)


---
id: intro
sidebar_label: Intro
title: HOC Cheatsheet
---

**This HOC Cheatsheet** compiles all available knowledge for writing Higher Order Components with React and TypeScript.

- We will map closely to [the official docs on HOCs](https://reactjs.org/docs/higher-order-components.html) initially
- While hooks exist, many libraries and codebases still have a need to type HOCs.
- Render props may be considered in future
- The goal is to write HOCs that offer type safety while not getting in the way.

Here is a base HOC example you can copy right away:

```jsx

type PropsAreEqual<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>
) => boolean;

const withSampleHoC = <P extends {}>(
  component: {
    (props: P): Exclude<React.ReactNode, undefined>;
    displayName?: string;
  },
  propsAreEqual?: PropsAreEqual<P> | false,

  componentName = component.displayName ?? component.name
): {
  (props: P): JSX.Element;
  displayName: string;
} => {

  function WithSampleHoc(props: P) {
    //Do something special to justify the HoC.
    return component(props) as JSX.Element;
  }

  WithSampleHoc.displayName = `withSampleHoC(${componentName})`;

  let wrappedComponent = propsAreEqual === false ? WithSampleHoc : React.memo(WithSampleHoc, propsAreEqual);

  //copyStaticProperties(component, wrappedComponent);

  return wrappedComponent as typeof WithSampleHoc
};
```

This code meets these criteria:

1. Allows a component to return valid elements (`strings | array | boolean | null | number`) and not just `JSX.Element | null`.
2. Wraps it in a memo unless you opt out.
3. Removes the nested component, so React Dev tools will just show one component.
4. Indicates with `displayName` in React Dev Tool with an annotation that this is a component wrapped in two HoCs
5. Optional: Copies over static properties that might have been defined on the original component.

---
id: full_example
sidebar_label: Full HOC Example
title: "Full HOC Example"
---

> This is an HOC example for you to copy and paste. If certain pieces don't make sense for you, head to [the React HOC Docs intro](https://react-typescript-cheatsheet.netlify.app/docs/hoc/react_hoc_docs/) to get a detailed walkthrough via a complete translation of the React docs in TypeScript.

Sometimes you want a simple way to inject props from somewhere else (either a global store or a provider) and don't want to continually pass down the props for it. Context is great for it, but then the values from the context can only be used in your `render` function. A HoC will provide these values as props.

**The injected props**

```ts
interface WithThemeProps {
  primaryColor: string;
}
```

**Usage in the component**

The goal is to have the props available on the interface for the component, but subtracted out for the consumers of the component when wrapped in the HoC.

```ts
interface Props extends WithThemeProps {
  children?: React.ReactNode;
}

class MyButton extends React.Component<Props> {
  public render() {
    // Render an the element using the theme and other props.
  }

  private someInternalMethod() {
    // The theme values are also available as props here.
  }
}

export default withTheme(MyButton);
```

**Consuming the Component**

Now when consuming the component you can omit the `primaryColor` prop or override the one provided through context.

```tsx
<MyButton>Hello button</MyButton> // Valid
<MyButton primaryColor="#333">Hello Button</MyButton> // Also valid
```

**Declaring the HoC**

The actual HoC.

```tsx
export function withTheme<T extends WithThemeProps = WithThemeProps>(
  WrappedComponent: React.ComponentType<T>
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithTheme = (props: Omit<T, keyof WithThemeProps>) => {
    // Fetch the props you want to inject. This could be done with context instead.
    const themeProps = useTheme();

    // props comes afterwards so the can override the default ones.
    return <WrappedComponent {...themeProps} {...(props as T)} />;
  };

  ComponentWithTheme.displayName = `withTheme(${displayName})`;

  return ComponentWithTheme;
}
```

Note that the `{...(props as T)}` assertion is needed because of a current bug in TS 3.2 https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046

Here is a more advanced example of a dynamic higher order component that bases some of its parameters on the props of the component being passed in:

```tsx
// inject static values to a component so that they're always provided
export function inject<TProps, TInjectedKeys extends keyof TProps>(
  Component: React.JSXElementConstructor<TProps>,
  injector: Pick<TProps, TInjectedKeys>
) {
  return function Injected(props: Omit<TProps, TInjectedKeys>) {
    return <Component {...(props as TProps)} {...injector} />;
  };
}
```

### Using `forwardRef`

For "true" reusability you should also consider exposing a ref for your HOC. You can use `React.forwardRef<Ref, Props>` as documented in [the basic cheatsheet](https://github.com/typescript-cheatsheets/react/blob/main/README.md#forwardrefcreateref), but we are interested in more real world examples. [Here is a nice example in practice](https://gist.github.com/OliverJAsh/d2f462b03b3e6c24f5588ca7915d010e) from @OliverJAsh (note - it still has some rough edges, we need help to test this out/document this).

### Supporting `defaultProps` of Wrapped Component

If this is something you need, please see [the stale discussion we had](https://github.com/typescript-cheatsheets/react/issues/86) and comment with your requirements. We will pick this up again if needed.


---
id: react_hoc_docs
sidebar_label: React HOC docs in TypeScript
title: "Section 1: React HOC docs in TypeScript"
---

In this first section we refer closely to [the React docs on HOCs](https://reactjs.org/docs/higher-order-components.html) and offer direct TypeScript parallels.

## Docs Example: [Use HOCs For Cross-Cutting Concerns](https://reactjs.org/docs/higher-order-components.html#use-hocs-for-cross-cutting-concerns)

<details>

<summary>
<b>Misc variables referenced in the example below</b>
</summary>

```tsx
/** dummy child components that take anything */
const Comment = (_: any) => null;
const TextBlock = Comment;

/** dummy Data */
type CommentType = { text: string; id: number };
const comments: CommentType[] = [
  {
    text: "comment1",
    id: 1,
  },
  {
    text: "comment2",
    id: 2,
  },
];
const blog = "blogpost";

/** mock data source */
const DataSource = {
  addChangeListener(e: Function) {
    // do something
  },
  removeChangeListener(e: Function) {
    // do something
  },
  getComments() {
    return comments;
  },
  getBlogPost(id: number) {
    return blog;
  },
};
/** type aliases just to deduplicate */
type DataType = typeof DataSource;
// type TODO_ANY = any;

/** utility types we use */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// type Optionalize<T extends K, K> = Omit<T, keyof K>;

/** Rewritten Components from the React docs that just uses injected data prop */
function CommentList({ data }: WithDataProps<typeof comments>) {
  return (
    <div>
      {data.map((comment: CommentType) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
interface BlogPostProps extends WithDataProps<string> {
  id: number;
}
function BlogPost({ data, id }: BlogPostProps) {
  return (
    <div key={id}>
      <TextBlock text={data} />;
    </div>
  );
}
```

[View in TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCgeirhgAskBnJOFIuxuMHMJuiHABGrYADsAVkgxIAJsICenVgAkA8gGEK4mEiiZ0rAOrAGAERQwUABV5MAPABUAfHADeFOHFmWUALjhHAG44Gm9fOGB+AHMkMT1gNAoAX2paR0j+BlYYBTBWCExwqzS4a0zlbjs4QsqAdygUMHz5NFxIeLF4BksK8Uw9IllSjQrstgwAVxQAG0iuvQM0AqLxhqaWuDbwCE74AApJlnkYQWjGoW8kA0mZmFsIPjhsXEiYAEoKJAAPSFhnyZiDDAXZwOqmegAZUmQiYaCgwDAMBBYicABoynAfroxLJ+CZzL4HnwnM4MRpnPtPKFaAwonQ8qxZjMIHV+EcBPMBlAyhihJN4OcUJdxrl8jUikZGs05Bp2rs4vAWGB2JYkDMlOCGBABW95rp9AkxNEwRDKv09HFlhKytSpRtZfK9gFkOgYAA6ABSkIAGgBRGZIECKuViJgwKCTDDQezWVwAMjgGjR1LCLEDGAsVgqKABQNOPMw0ECqdoPEe-Hprtkuw1wmkKCOohg+H4RBQNbEdfETGAshWlTQMxQTCY1PT0hgWf8cCp5C8Xh8VkhOqgywCYqQtWnK8ma6QKfnC-LfBdqE7Gvs3p97oAMsAhI0oAoALIoMQoWKyACCMAjD4FZh7GTOA1BAUxYwxAAiJcUCg5wEOpd44AAXlcRwKGQjwjzCcYQE-RIKkYIgAmvO8HyfV930-ORf3-fldH4cEZjmKwAGsci4TcbXtFo5R2PY2FxOAiCYCAZgAN2bfh+xuO4qgrUs2GiFAe26LgT34WoCXoacMTqehEnoCoJCOdSCgRaJxFmTFuK1Yz8Fg-ARKDCApPkF48FMNskAAR0mYAiGDLoxyPbjiX4FC4DI+9H3YKiPy-OiEQYoCQLAiDrGg2D4OcIJqW4yErF0VD3GpRdfACYJqWSfKjyIGA9zELZh1HOAdOnLFvhxPFEGID1+I6RVYzsDEirVVxsIXLZdnDSNoygfZNICCKsPKhcmEmfJFs0946umrw6SYd16HfWRAw0U7jVYKKjpOs6Lqu2J3SEcRZH2I69vWw7DOO8M1VKqaDoqqwAgnTNfH2HdV2WDFdu+uBavW1JKCPLxtiGrozD7F8dS6Ur9mQtC4GhvdlndDtZEu99YnvcM4j0D7fvu3FHpppAvtR6aMYVLoTBYgBVMQQDx+AosJ1DnAR0n93dIK3KQanrrpnFGbuq7zsVp6Obq9aNbZ66CaJqW0YXO6WBgcbdH2IHgdgsH1Unacod8Xd9wxO74dNrxkk59aiFxRm1u9mlKjFcQTSLHkmB4c8I84KJ3U0zJ3VTuApOfGbwEDb53XrcMwRQJRLPoeAxFZMZBFMgvuNMNh+HfBQEbCWDTRYuBw2AduRAZfI0EYNAOOGEOGqa2cEa8exeL4p1FWKFAULcc3iqQd1YOSdxU-dJnE+TkchIUd4N6oE3gc56aUZ9-bQ9HqBmo63w6pR6gACoX7gdRRiOGjTQYJNZ5CnAF+VAvi-GgPANoYZ4D8WCjAFWOloSwnhIiZEoIor2UQXCBESIURzi8DAxUKtDxeBdsuGGSAAjTkcIyY2JNXbkPdLEGABCQqE0wrrcgPw-gQNmvAAAQiyaI1gIDhgQTCLBKCUSlQweI5BODdh4LgAIiAQiREwGIbOGW646FWGofkOGdgAgZRgPYZRqjwwRWyr4eCxt1paNXkwsxwjwxLTsO6PsnxyB7SAA)

</details>

Example HOC from React Docs translated to TypeScript

```tsx
// these are the props to be injected by the HOC
interface WithDataProps<T> {
  data: T; // data is generic
}
// T is the type of data
// P is the props of the wrapped component that is inferred
// C is the actual interface of the wrapped component (used to grab defaultProps from it)
export function withSubscription<T, P extends WithDataProps<T>, C>(
  // this type allows us to infer P, but grab the type of WrappedComponent separately without it interfering with the inference of P
  WrappedComponent: React.JSXElementConstructor<P> & C,
  // selectData is a functor for T
  // props is Readonly because it's readonly inside of the class
  selectData: (
    dataSource: typeof DataSource,
    props: Readonly<JSX.LibraryManagedAttributes<C, Omit<P, "data">>>
  ) => T
) {
  // the magic is here: JSX.LibraryManagedAttributes will take the type of WrapedComponent and resolve its default props
  // against the props of WithData, which is just the original P type with 'data' removed from its requirements
  type Props = JSX.LibraryManagedAttributes<C, Omit<P, "data">>;
  type State = {
    data: T;
  };
  return class WithData extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props),
      };
    }

    componentDidMount = () => DataSource.addChangeListener(this.handleChange);

    componentWillUnmount = () =>
      DataSource.removeChangeListener(this.handleChange);

    handleChange = () =>
      this.setState({
        data: selectData(DataSource, this.props),
      });

    render() {
      // the typing for spreading this.props is... very complex. best way right now is to just type it as any
      // data will still be typechecked
      return (
        <WrappedComponent data={this.state.data} {...(this.props as any)} />
      );
    }
  };
  // return WithData;
}

/** HOC usage with Components */
export const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource: DataType) => DataSource.getComments()
);

export const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource: DataType, props: Omit<BlogPostProps, "data">) =>
    DataSource.getBlogPost(props.id)
);
```

## Docs Example: [Don’t Mutate the Original Component. Use Composition.](https://reactjs.org/docs/higher-order-components.html#dont-mutate-the-original-component-use-composition)

This is pretty straightforward - make sure to assert the passed props as `T` [due to the TS 3.2 bug](https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046).

```tsx
function logProps<T>(WrappedComponent: React.ComponentType<T>) {
  return class extends React.Component {
    componentWillReceiveProps(
      nextProps: React.ComponentProps<typeof WrappedComponent>
    ) {
      console.log("Current props: ", this.props);
      console.log("Next props: ", nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...(this.props as T)} />;
    }
  };
}
```

## Docs Example: [Pass Unrelated Props Through to the Wrapped Component](https://reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-the-wrapped-component)

No TypeScript specific advice needed here.

## Docs Example: [Maximizing Composability](https://reactjs.org/docs/higher-order-components.html#convention-maximizing-composability)

HOCs can take the form of Functions that return Higher Order Components that return Components.

`connect` from `react-redux` has a number of overloads you can take inspiration [from in the source](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/bc0c933415466b34d2de5790f7cd6418f676801e/types/react-redux/v5/index.d.ts#L77).

Here we build our own mini `connect` to understand HOCs:

<details>

<summary>
<b>Misc variables referenced in the example below</b>
</summary>

```tsx
/** utility types we use */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** dummy Data */
type CommentType = { text: string; id: number };
const comments: CommentType[] = [
  {
    text: "comment1",
    id: 1,
  },
  {
    text: "comment2",
    id: 2,
  },
];
/** dummy child components that take anything */
const Comment = (_: any) => null;
/** Rewritten Components from the React docs that just uses injected data prop */
function CommentList({ data }: WithSubscriptionProps<typeof comments>) {
  return (
    <div>
      {data.map((comment: CommentType) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
```

</details>

```tsx
const commentSelector = (_: any, ownProps: any) => ({
  id: ownProps.id,
});
const commentActions = () => ({
  addComment: (str: string) =>
    comments.push({ text: str, id: comments.length }),
});

const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

// these are the props to be injected by the HOC
interface WithSubscriptionProps<T> {
  data: T;
}
function connect(mapStateToProps: Function, mapDispatchToProps: Function) {
  return function <T, P extends WithSubscriptionProps<T>, C>(
    WrappedComponent: React.ComponentType<T>
  ) {
    type Props = JSX.LibraryManagedAttributes<C, Omit<P, "data">>;
    // Creating the inner component. The calculated Props type here is the where the magic happens.
    return class ComponentWithTheme extends React.Component<Props> {
      public render() {
        // Fetch the props you want inject. This could be done with context instead.
        const mappedStateProps = mapStateToProps(this.state, this.props);
        const mappedDispatchProps = mapDispatchToProps(this.state, this.props);
        // this.props comes afterwards so the can override the default ones.
        return (
          <WrappedComponent
            {...this.props}
            {...mappedStateProps}
            {...mappedDispatchProps}
          />
        );
      }
    };
  };
}
```

[View in TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGd5qQQkaY64BeOAbQF0A3BSq0GcAMK4WbADLAx3ABQBKLgD44iinDgAeACbAAbnAD0aisuHlq9RlNYwAykgA2SDNC6aA+gC44FBoATwAaOAgAdxoABRwwOgCg4NVODUUAb204YH0AqNj4ugA6XIoAX2UhG1F7ZkcAQQxgUW8VdU0s8h0UfX1JerYAxQYoANHgGgBzVI0maXZisABXOgALTLgYJAAPGHGYKHDcgPnHEvdpmDW4Soqq61sxSRoaD23+hzZvWzeMLW6cDObBc7k8R2ywJgTRgLXolkUAwWcgYD0o5FMpi2ayQdCQgSI2PxYCKWwgcAARvjJgArd5IfSU4JEuAACQA8uIKJNtlBMOh8QB1YDXJzLCl0NBQYBgWG0OIQBK6AAqGi6On0KBgKACyuq5QomGWNGatCBtD+MEUIBQYCc2u2yogCoSAQAYsbTTRwjawAAReRgLVoNZOl2JOAek1ymiqdVwIgwZZQGhwI3RuEq8IxOC7bY0fQcYWi8WS6WyuHhlVqcLiNQAnQ6QVQW1gBkDSBvIaIYgwYod2iOZXBNvV7Jx7I6GAj-Hh7wAKScAA1inIKS2oMEALJBFBTBkNGCHYAU5bbOi6cThdkgEW6GLhABEmu1j7UamqjbMWPERC1kymFlJjeKBzXAQc2GKOBlRxIEUFcNBllcLUGTgOdpzbOAcUJeQWUibD8WufEbSmYA0Cw1tWBKScEyQJMUyBZC6A4AcuxgYtQxxFhcz2VhCx7dA+1Yxx7yKNUaJ0FYKVcMjaILJAoHaeMvx0TFIzokMWRJRUOGCCBljgSIgngWl3igmDcOoJDGSpOB9EHQyRRuWxtj2HI7FQfRigkxsnngX0230e0ULnbhfWCx1nSKRRrnkYoGBQ8JYpKbSEjRFTfNqOAAoZAM6CDGAQ1C7LbTygqQzDaLkvih0kCStY4tSuh0oy79sUa0kmFxQJMF5IyoH4uhySIuDUwgIwFOlfRCNg6b+SQ+BB2owEMsTZNUwbVqdF0ZtKM+cC2J8jKMmKU7qqag0Vq2uATtOnKgtq8NLuuxtbuKe6yuDNYnqOxtzF+lqv2extyk-W59SAA)

## Docs Example: [Wrap the Display Name for Easy Debugging](https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging)

This is pretty straightforward as well.

```tsx
interface WithSubscriptionProps {
  data: any;
}

function withSubscription<
  T extends WithSubscriptionProps = WithSubscriptionProps
>(WrappedComponent: React.ComponentType<T>) {
  class WithSubscription extends React.Component {
    /* ... */
    public static displayName = `WithSubscription(${getDisplayName(
      WrappedComponent
    )})`;
  }
  return WithSubscription;
}

function getDisplayName<T>(WrappedComponent: React.ComponentType<T>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
```

## Unwritten: [Caveats section](https://reactjs.org/docs/higher-order-components.html#caveats)

- Don’t Use HOCs Inside the render Method
- Static Methods Must Be Copied Over
- Refs Aren’t Passed Through

---
id: excluding_props
sidebar_label: Excluding Props
title: "Section 2: Excluding Props"
---

This is covered in passing in Section 1 but we focus on it here as it is such a common issue. HOCs often inject props to premade components. The problem we want to solve is having the HOC-wrapped-component exposing a type that reflects the reduced surface area of props - without manually retyping the HOC every time. This involves some generics, fortunately with some helper utilities.

Say we have a component:

```tsx
type DogProps {
  name: string
  owner: string
}
function Dog({name, owner}: DogProps) {
  return <div> Woof: {name}, Owner: {owner}</div>
}
```

And we have a `withOwner` HOC that injects the `owner`:

```tsx
const OwnedDog = withOwner("swyx")(Dog);
```

We want to type `withOwner` such that it will pass through the types of any component like `Dog`, into the type of `OwnedDog`, minus the `owner` property it injects:

```tsx
typeof OwnedDog; // we want this to be equal to { name: string }

<Dog name="fido" owner="swyx" />; // this should be fine
<OwnedDog name="fido" owner="swyx" />; // this should have a typeError
<OwnedDog name="fido" />; // this should be fine

// and the HOC should be reusable for completely different prop types!

type CatProps = {
  lives: number;
  owner: string;
};
function Cat({ lives, owner }: CatProps) {
  return (
    <div>
      {" "}
      Meow: {lives}, Owner: {owner}
    </div>
  );
}

const OwnedCat = withOwner("swyx")(Cat);

<Cat lives={9} owner="swyx" />; // this should be fine
<OwnedCat lives={9} owner="swyx" />; // this should have a typeError
<OwnedCat lives={9} />; // this should be fine
```

So how do we type `withOwner`?

1. We get the types of the component: `keyof T`
2. We `Exclude` the property we want to mask: `Exclude<keyof T, 'owner'>`, this leaves you with a list of names of properties you want on the wrapped component e.g. `name`
3. (optional) Use intersection types if you have more to exclude: `Exclude<keyof T, 'owner' | 'otherprop' | 'moreprop'>`
4. Names of properties aren't quite the same as properties themselves, which also have an associated type. So we use this generated list of names to `Pick` from the original props: `Pick<keyof T, Exclude<keyof T, 'owner'>>`, this leaves you with the new, filtered props, e.g. `{ name: string }`
5. (optional) Instead of writing this manually each time, we could use this utility: `type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>`
6. Now we write the HOC as a generic function:

```tsx
function withOwner(owner: string) {
  return function <T extends { owner: string }>(
    Component: React.ComponentType<T>
  ) {
    return function (props: Omit<T, "owner">): JSX.Element {
      const newProps = { ...props, owner } as T;
      return <Component {...newProps} />;
    };
  };
}
```

(_[Link to TS Playground](https://www.typescriptlang.org/play/?strictFunctionTypes=false&jsx=1&ssl=1&ssc=1&pln=47&pc=49#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wG4AoczAVwDsNgJa4B3YGACwHkXakoAFBF78AXHADOMKMFoBzAJRwA3uThwiMalGY16MRswA8AFThIAHjCS0AJhJVxhfKOKkz5cAL4A+AWvU4AGFcSD5aGHFkdBgAOhDwJhsYEwBPMCRTHwClVUCNJC0dOD0GJjgBMBwwCXEuEHZTABoCZ358HyVxACkAZQANWIBRABskEGSVAPyAehmAQTgYdKQ4NAh+NEM4YAc+NDQkCQkUKFS4ACMkNBRqCVW0jN60GTB4Ww2JWgByeABrWjCJYcFDwTireqNEwtfBtKAdOAAahUcPEsXRXjgAF44CZpoF1rQpHA+CwAArVBw45RwdGxKoQGotOHeOAoBwmCj5dSabTGBJhSbKOmkimMiSYmY+LmBLwyuXkLyUZYZYKgsU1bFTdQjYAANyO4lo1BAVygMtRkmksjkFAVpQM5SCoIENN1BokzJEUG84mdMA1ElyAV5xX8+SMtn12W5KnwBCVsYAskhhOJlO6jl4WjwXOm4YnAkYZlG9TG4Ao7ZRCcTc0hbP6tWxOHXBPgJCxUhZ8AoBP7K5QjI3MxIscoAJyYuFY9ud7twKWkBczYG7SQcCDUEa2S6rTCyJDkIx1huguAjseTpzemcdrvxxfL1cOCQbrc7kEGtlLFZDKA4KAjxPYd9SOS9JWlJ9ODXV9N23XcSgPShyBVVYABEIDkQNtRJFAJjca15ACS13BtRUqDoMpmAwuRXVoPCkC9FwvHEGjA2DHlCj5OBI2jOAAHUIAgTB03oiZszgVt829Lxi1LbIlRreATxopt2G4b0BFne9exogdB1UsSkBnfcPnjadtPnR85mfdc4J3K5EL4ICRFsQyGJM4AzOvFxbznB9IJs6CXzfeDP1WFAfwyP8AJcvg3Mw3CJk87zrJXYK7PfBD9z4IA)_)

Note that we need to do a type coercion here.

This is because TypeScript does not know that merging `Omit<T, "owner">` and `{owner: "whatever"}` is the same as `T`.

[See this GitHub issue for more.](https://github.com/microsoft/TypeScript/issues/35858)

## Generic solution

The above snippet can be modified to create a generic solution to inject any arbitrary props;

```typescript
function withInjectedProps<U extends Record<string, unknown>>(
  injectedProps: U
) {
  return function <T extends U>(Component: React.ComponentType<T>) {
    return function (props: Omit<T, keyof U>): JSX.Element {
      //A type coercion is neccessary because TypeScript doesn't know that the Omit<T, keyof U> + {...injectedProps} = T
      const newProps = { ...props, ...injectedProps } as T;
      return <Component {...newProps} />;
    };
  };
}
```

(_[Link to TS Playground](https://www.typescriptlang.org/play?strictFunctionTypes=false&jsx=1#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wG4AoczAVwDsNgJa4B3YGACwElaArJDEgAmABRxgAzgB4AqnCQAPGElpCJiAdCFSJMKMFoBzADRw6Aa1oQWtAHy24ACgP9Bo8RIBccGQEo4AN7kcHBEMNRQzDT0MIzMUgAq8koqaj62jsEhcADCuJC0KjDeyOgwAHR54ExFCQCeYEiJtln+QdmhSOGRcNEMTE5gHt4A8iDsiabmSHUQmOn+3gBSAMoAGuUAogA2SCBFgVkdAPTHAIJwMA1IcGgQSFBocXDA6oVoaEgSEihQdXAAIwEKGoEhu9UaKzQ+jA8CE9wktAA5PBLNZLhwUPBODcxhMEqZ8NZClB8A4ANSBYkPbzlOkAXzgAF44Akjtk7rRdHBCiwxBBJMzAnA6eUhgKJKZRS4BMp3BK4IyUOoEhQOiEwhF4lUCgcAqLefzJIzjrY1dl6ebLeR6ZQro1clijeoWe04NtgAA3L7eWjUEBAqDm6lQby6fRGCjWvqxAY5LGOALur1fUwhxXeeMwZ1tLKanqZDpSIRelrqwL4Ai28sAWSQ1m8AQ93ok9NMIxsNKpnag1eyUmOJc9ZbgvijduucBE2xQhWzHiFbtoKH2Yb0BkMpDgNsoMee09nXUTy-2jO8B7nOcOGq6Wqc7OLpbgjSgEiYbxXN1egRPSHpA6HEcx23W1yE5bkO0KIQsyFNhOB4Vw5WdRMQ28fAAQgAF8HpXxHCzYDKCkGDmy+JkAgATkZEMmXwCQWDqBRK1NLdTgxb8JA4CBqG2IRARuTADCQcgpEg4RiJTCQyMouBqNo+jGLgZjFOONj1A4rieLgTFvTgFBLmuTYoBwKBhNE6CsWTFspJNM1lNUuB1O43igV6QTKHA+AzIvLpYPYbg+FlYRkICVCCAwrCcMcbyYGA1jNgURo3HkIzoDgABaXTtk4LjDA4Ux2CRN4IHgMBfliNBuN+bZ-iIFAhBQAFdnKbcgA)_)

## Without coercion

```typescript
function withOwner(owner: string) {
  return function <T extends { owner: string }>(
    Component: React.ComponentType<T>
  ): React.ComponentType<Omit<T, "owner"> & { owner?: never }> {
    return function (props) {
      const newProps = { ...props, owner };
      return <Component {...newProps} />;
    };
  };
}
```

(_[Link to TS Playground](https://www.typescriptlang.org/play?strictFunctionTypes=false&jsx=1#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wG4AoczAVwDsNgJa4B3YGACwHkXakoAFBF78AXHADOMKMFoBzAJRwA3uThwiMalGY16MRswA8AFThIAHjCS0AJhJVxhfKOKkz5cAL4A+AWvU4AGFcSD5aGHFkdBgAOhDwJhsYEwBPMCRTHwCFKOI4hLDktIyjLhB2UwAaAmd+fB84ADIVOqgAfnE+ADd+XxUA9U1tXToGJjgBMBwwCSVVQMC0Jik4PhYABRmHAF5HWIPpiFmatu8KRaGkLR04I0KkiJUD2PWt44kvOAB6HwvArz-QHkLyUGDpJDBFAwd6zOB7BZwAA2wF6Ei61BAACN+P82m5pLI5BRgXpxswgtCBMpkaikBJTiIoN5xJSYdt5gFhrd-IsjLZUdlLip8ARQcKALJIYTiZQotFeGo8FyytriwJGb4C7pCuAKEmUZa0VbKpC2Nnw1jsbhMgT4CQsVIWfAKARs-WUe7Q2lonbKACcXzaO3tjudPz+P2+cE4wAcEg4EGoSNscBxcEwsiQ5DKInN3vl9L9gacTJDDqdot+pCjMY4cckieTqY4KF6cBQMYhAFEoDgoDnTfn4IWJMWvtXa7H402U2nIZm+JRyOCMnAACIQOSwhyI2goEBIAkeOQBfGSQnyEFUMYGCabuTU-eHxkuLziB87zlXG7GbWNAB1CAIEwWVnyQRU4FNVxWiZLxNX-a8jRNPMH0tNhOGgu0K2dV0Hw9T00PAkNM1sCBRWDUNKwjGtvmjadGyTOd00XbNcz4WwiIPJASOAMiKLLKjw0nOi6wbBMmJbNtIU7VckF7ftB1Qrc1m43j+Joqd6xnST5wzLMgA)_)

## Learn More

We will need to extract lessons from here in future but here they are:

- https://medium.com/@xfor/typescript-react-hocs-context-api-cb46da611f12
- https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
- https://www.matthewgerstman.com/tech/ts-tricks-higher-order-components/

---
id: intro
sidebar_label: Intro
title: Advanced Cheatsheet
---

**This Advanced Cheatsheet** helps show and explain advanced usage of generic types for people writing reusable type utilities/functions/render prop/higher order components and TS+React **libraries**.

- It also has miscellaneous tips and tricks for pro users.
- Advice for contributing to DefinitelyTyped
- The goal is to take _full advantage_ of TypeScript.

**Creating React + TypeScript Libraries**

The best tool for creating React + TS libraries right now is [`tsdx`](https://github.com/palmerhq/tsdx). Run `npx tsdx create` and select the "react" option. You can view [the React User Guide](https://github.com/palmerhq/tsdx/issues/5) for a few tips on React+TS library best practices and optimizations for production.

Another option is [Rollpkg](https://github.com/rafgraph/rollpkg), which uses Rollup and the TypeScript compiler (not Babel) to create packages. It includes default configs for TypeScript, Prettier, ESLint, and Jest (setup for use with React), as well as Bundlephobia package stats for each build.

- Be sure to also check [`basarat`'s guide](https://basarat.gitbooks.io/typescript/content/docs/quick/library.html) for library tsconfig settings.
- Alec Larson: [The best Rollup config for TypeScript libraries](https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226)
- From the Angular world, check out https://github.com/bitjson/typescript-starter

---
id: utility_types
title: "Utility Types"
sidebar_label: Utility Types
---

We will assume knowledge of utility types covered in the sister project [`typescript-cheatsheets/utilities`](https://github.com/typescript-cheatsheets/utilities). Look up libraries included there as well for your typing needs.

If you intend to maintain a large TS codebase/a nontrivial React+TS library, **we strongly recommend exploring these utilities** so that you don't reinvent the wheel and/or lose sanity trying to do so. Studying their code can also teach you a lot of advanced TS that is not covered here.

I also recommend have a good working knowledge of how to construct the inbuilt utility types from scratch. See [Dr. Rauschmayer's guide](https://2ality.com/2020/06/computing-with-types.html) for a concise introduction.

A level of comfort with **generic types** is therefore required. Here are some helpful resources:

- https://ts.chibicode.com/generics/


---
id: patterns_by_usecase
title: "Useful Patterns by Use Case"
sidebar_label: Useful Patterns by Use Case
---

## Wrapping/Mirroring

### Wrapping/Mirroring a HTML Element

Usecase: you want to make a `<Button>` that takes all the normal props of `<button>` and does extra stuff.

Strategy: extend `React.ComponentPropsWithoutRef<'button'>`

```tsx
// usage
function App() {
  // Type '"foo"' is not assignable to type '"button" | "submit" | "reset" | undefined'.(2322)
  // return <Button type="foo"> sldkj </Button>

  // no error
  return <Button type="button"> text </Button>;
}

// implementation
export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  specialProp?: string;
}
export function Button(props: ButtonProps) {
  const { specialProp, ...rest } = props;
  // do something with specialProp
  return <button {...rest} />;
}
```

[_See this in the TS Playground_](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUI4wPQtwCuqyA5lowQ4A7fMAhC4AQTBgAFAEo4Ab0Zw4bOABUAnmCzkARAQgQDZOMHRCI8NKmA8hyAEYAbfTAhwYu-WQPOHDCeQgZwAD5wBqgcziDAMGGRBpSoWIkRnEIAJlgEwEJY2WQAdLIATADM5eXyqurslDAcUBIAPABCQSHevgC8RiYGAHxwqK7ZANYAVnBtLF3B4sP19RrWcFhQxFD1TS3tiz0+egOBS6GjMFgAHvDzR8uMAL7MDBqgYO4gWEIwyDAxEJGLdILALH8tgQ8PpHkIAArEMDoW7XHLobB4GAlADCJEghT+iIgyLaZHOITIoxUDDUqD0uGAyFcxLAAH4AFxjGBQAo8egMV4MUHQQjCUTiOBw2RgJGoLlw1moRQ0tS4cSoeBKMYMpkspEAGjgJRNqXgzzgfTgspJqAFag02S8qBI6QAFny4AB3BJunVYRnM1l7dIHOYUyVKE0lM0WljDAXPIA)

**Forwarding Refs**: As [the React docs themselves note](https://reactjs.org/docs/forwarding-refs.html), most usecases will not need to obtain a ref to the inner element. But for people making reusable component libraries, you will need to `forwardRef` the underlying element, and then you can use `ComponentPropsWithRef` to grab props for your wrapper component. Check [our docs on forwarding Refs](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/) for more.

In future, the need to `forwardRef` may go away in React 17+, but for now we still have to deal with this. 🙃

<details>
<summary>

Why not `ComponentProps` or `IntrinsicElements` or `[Element]HTMLAttributes` or `HTMLProps` or `HTMLAttributes`?

</summary>

## `ComponentProps`

You CAN use `ComponentProps` in place of `ComponentPropsWithRef`, but you may prefer to be explicit about whether or not the component's refs are forwarded, which is what we have chosen to demonstrate. The tradeoff is slightly more intimidating terminology.

More info: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/

### Maybe `JSX.IntrinsicElements` or `[Element]HTMLAttributes`

There are at least 2 other equivalent ways to do this, but they are more verbose:

```tsx
// Method 1: JSX.IntrinsicElements
type BtnType = JSX.IntrinsicElements["button"]; // cannot inline or will error
export interface ButtonProps extends BtnType {} // etc

// Method 2: React.[Element]HTMLAttributes
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
```

Looking at [the source for `ComponentProps`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/f3134f4897c8473f590cbcdd5788da8d59796f45/types/react/index.d.ts#L821) shows that this is a clever wrapper for `JSX.IntrinsicElements`, whereas the second method relies on specialized interfaces with unfamiliar naming/capitalization.

> Note: There are over 50 of these specialized interfaces available - look for `HTMLAttributes` in our [`@types/react` commentary](https://react-typescript-cheatsheet.netlify.app/docs/advanced/types_react_api#typesreact).

Ultimately, [we picked the `ComponentProps` method](https://github.com/typescript-cheatsheets/react/pull/276) as it involves the least TS specific jargon and has the most ease of use. But you'll be fine with either of these methods if you prefer.

### Definitely not `React.HTMLProps` or `React.HTMLAttributes`

This is what happens when you use `React.HTMLProps`:

```tsx
export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  specialProp: string;
}
export function Button(props: ButtonProps) {
  const { specialProp, ...rest } = props;
  // ERROR: Type 'string' is not assignable to type '"button" | "submit" | "reset" | undefined'.
  return <button {...rest} />;
}
```

It infers a too-wide type of `string` for `type`, because it [uses `AllHTMLAttributes` under the hood](https://github.com/typescript-cheatsheets/react/issues/128#issuecomment-508103558).

This is what happens when you use `React.HTMLAttributes`:

```tsx
import { HTMLAttributes } from "react";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /* etc */
}

function App() {
  // Property 'type' does not exist on type 'IntrinsicAttributes & ButtonProps'
  return <Button type="submit"> text </Button>;
}
```

</details>

### Wrapping/Mirroring a Component

> TODO: this section needs work to make it simplified.

Usecase: same as above, but for a React Component you don't have access to the underlying props

```tsx
import { CSSProperties } from "react";

const Box = (props: CSSProperties) => <div style={props} />;

const Card = (
  { title, children, ...props }: { title: string } & $ElementProps<typeof Box> // new utility, see below
) => (
  <Box {...props}>
    {title}: {children}
  </Box>
);
```

Strategy: extract a component's props by inferring them

Example:

```tsx
// ReactUtilityTypes.d.ts
declare type $ElementProps<T> = T extends React.ComponentType<infer Props>
  ? Props extends object
    ? Props
    : never
  : never;
```

Usage:

```tsx
import * as Recompose from "recompose";
export const defaultProps = <
  C extends React.ComponentType,
  D extends Partial<$ElementProps<C>>
>(
  defaults: D,
  Component: C
): React.ComponentType<$ElementProps<C> & Partial<D>> =>
  Recompose.defaultProps(defaults)(Component);
```

_thanks [dmisdm](https://github.com/typescript-cheatsheets/react/issues/23)_

:new: You should also consider whether to explicitly forward refs:

```tsx
import { forwardRef, ReactNode } from "react";

// base button, with ref forwarding
type Props = { children: ReactNode; type: "submit" | "button" };
export type Ref = HTMLButtonElement;

export const FancyButton = forwardRef<Ref, Props>((props, ref) => (
  <button ref={ref} className="MyCustomButtonClass" type={props.type}>
    {props.children}
  </button>
));

// second layer button, no need for forwardRef (TODO: doublecheck this)
export interface DoubleWrappedProps
  extends React.ComponentPropsWithRef<typeof FancyButton> {
  specialProp?: string;
}
export function DoubleWrappedButton(props: DoubleWrappedProps) {
  const { specialProp, ref, ...rest } = props;
  return <button ref={ref} {...rest} />;
}

// usage
import { useRef } from "react";

function App() {
  const btnRef = useRef<HTMLButtonElement>(null!);
  return (
    <DoubleWrappedButton type="button" ref={btnRef}>
      {" "}
      text{" "}
    </DoubleWrappedButton>
  );
}
```

_[TS Playground link](https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwCwAUIwPTNwBGaWHArjDBAB2AGjgB3YDAAWcSgTgFoY5FAAmwQQHNGMAJ5huABWJh0AXjgBvOLinAANqsqCAXJiowAdNjwwAchCqWDRwegZuAESoPOwgkhFwAD5wEex8AoIJAL70DFgAHpCwofrc2PIWABIAKgCyADIAQulCAKL2WCBYgjC5BUXwuEKo8ABiyIK4us38QnAWPvieilDKauUAPOWixhCmAHwAFIdgJqiicgCU8-twh4xwcBtps4KyWARmlnJZNvZoqD8yC6ZgitV0AGF-qhAcCsAkwlgvqc9qhPIisvsHo8rCjTJ5bA4nN0stiNswXhksQxLpdcowWGxUFghoJVHB-rosFBeK9GP1oPANDBuQQ8NwACIQGIdADqUGQYAMql2pjgBRFbPQiy8EJIkEE3RgqtQsskUk2iIg8nGk2mLUEt0s2NQBlwwGQ9lVAH43CMoBpNLlSXlCoKFDxJjBgHMpTKsPLFcqZhkTmc3HH2HKFUqsCqztdnQxHqyRlY4K6WR6vSYLh9RJ5G5Qy78LHjULlHpQYDwoG9ng73p9vh9fpZG55mzBfsx9sGGQxWHAeKhkJosIwCJH8DG3gBBJWHQvY0vwdgwQTlebuXyeFdYTY1BoptodLo9I6CHj2ewAQku2Ldr2-aZtmSZ5i+byIqClJCAkchfOel6jrcIr5PA5KgQmObJg61IhkAA)_

## Polymorphic Components (e.g. with `as` props)

> "Polymorphic Components" = passing a component to be rendered, e.g. with `as` props

`ElementType` is pretty useful to cover most types that can be passed to createElement e.g.

```tsx
function PassThrough(props: { as: React.ElementType<any> }) {
  const { as: Component } = props;

  return <Component />;
}
```

You might also see this with React Router:

```tsx
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component {...rest} /> : <Redirect to="/" />;
};
```

For more info you can refer to these resources:

- https://blog.andrewbran.ch/polymorphic-react-components/
- https://github.com/kripod/react-polymorphic-box
- https://stackoverflow.com/questions/58200824/generic-react-typescript-component-with-as-prop-able-to-render-any-valid-dom

[Thanks @eps1lon](https://github.com/typescript-cheatsheets/react/pull/69) and [@karol-majewski](https://github.com/typescript-cheatsheets/react/issues/151) for thoughts!

## Generic Components

Just as you can make generic functions and classes in TypeScript, you can also make generic components to take advantage of the type system for reusable type safety. Both Props and State can take advantage of the same generic types, although it probably makes more sense for Props than for State. You can then use the generic type to annotate types of any variables defined inside your function / class scope.

```tsx
import { ReactNode, useState } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

function List<T>(props: Props<T>) {
  const { items, renderItem } = props;
  const [state, setState] = useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
}
```

You can then use the generic components and get nice type safety through type inference:

```tsx
ReactDOM.render(
  <List
    items={["a", "b"]} // type of 'string' inferred
    renderItem={(item) => (
      <li key={item}>
        {/* Error: Property 'toPrecision' does not exist on type 'string'. */}
        {item.toPrecision(3)}
      </li>
    )}
  />,
  document.body
);
```

As of [TS 2.9](#typescript-29), you can also supply the type parameter in your JSX to opt out of type inference:

```tsx
ReactDOM.render(
  <List<number>
    items={["a", "b"]} // Error: Type 'string' is not assignable to type 'number'.
    renderItem={(item) => <li key={item}>{item.toPrecision(3)}</li>}
  />,
  document.body
);
```

You can also use Generics using fat arrow function style:

```tsx
import { ReactNode, useState } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

// Note the <T extends unknown> before the function definition.
// You can't use just `<T>` as it will confuse the TSX parser whether it's a JSX tag or a Generic Declaration.
// You can also use <T,> https://github.com/microsoft/TypeScript/issues/15713#issuecomment-499474386
const List = <T extends unknown>(props: Props<T>) => {
  const { items, renderItem } = props;
  const [state, setState] = useState<T[]>([]); // You can use type T in List function scope.
  return (
    <div>
      {items.map(renderItem)}
      <button onClick={() => setState(items)}>Clone</button>
      {JSON.stringify(state, null, 2)}
    </div>
  );
};
```

The same for using classes: (Credit: [Karol Majewski](https://twitter.com/WrocTypeScript/status/1163234064343736326)'s [gist](https://gist.github.com/karol-majewski/befaf05af73c7cb3248b4e084ae5df71))

```tsx
import { PureComponent, ReactNode } from "react";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

interface State<T> {
  items: T[];
}

class List<T> extends PureComponent<Props<T>, State<T>> {
  // You can use type T inside List class.
  state: Readonly<State<T>> = {
    items: [],
  };
  render() {
    const { items, renderItem } = this.props;
    // You can use type T inside List class.
    const clone: T[] = items.slice(0);
    return (
      <div>
        {items.map(renderItem)}
        <button onClick={() => this.setState({ items: clone })}>Clone</button>
        {JSON.stringify(this.state, null, 2)}
      </div>
    );
  }
}
```

Though you can't use Generic Type Parameters for Static Members:

```tsx
class List<T> extends React.PureComponent<Props<T>, State<T>> {
  // Static members cannot reference class type parameters.ts(2302)
  static getDerivedStateFromProps(props: Props<T>, state: State<T>) {
    return { items: props.items };
  }
}
```

To fix this you need to convert your static function to a type inferred function:

```tsx
class List<T> extends React.PureComponent<Props<T>, State<T>> {
  static getDerivedStateFromProps<T>(props: Props<T>, state: State<T>) {
    return { items: props.items };
  }
}
```

## Typing Children

Some API designs require some restriction on `children` passed to a parent component. It is common to want to enforce these in types, but you should be aware of limitations to this ability.

### What You CAN Do

You can type the **structure** of your children: just one child, or a tuple of children.

The following are valid:

```ts
type OneChild = React.ReactElement;
type TwoChildren = [React.ReactElement, React.ReactElement];
type ArrayOfProps = SomeProp[];
type NumbersChildren = number[];
type TwoNumbersChildren = [number, number];
```

<details>
<summary>
Don't forget that you can also use `prop-types` if TS fails you.
</summary>

```ts
Parent.propTypes = {
  children: PropTypes.shape({
    props: PropTypes.shape({
      // could share `propTypes` to the child
      value: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
```

</details>

### What You CANNOT Do

The thing you cannot do is **specify which components** the children are, e.g. If you want to express the fact that "React Router `<Routes>` can only have `<Route>` as children, nothing else is allowed" in TypeScript.

This is because when you write a JSX expression (`const foo = <MyComponent foo='foo' />`), the resultant type is blackboxed into a generic JSX.Element type. (_[thanks @ferdaber](https://github.com/typescript-cheatsheets/react/issues/271)_)

## Type Narrowing based on Props

What you want:

```tsx
// Usage
function App() {
  return (
    <>
      {/* 😎 All good */}
      <Button target="_blank" href="https://www.google.com">
        Test
      </Button>
      {/* 😭 Error, `disabled` doesnt exist on anchor element */}
      <Button disabled href="x">
        Test
      </Button>
    </>
  );
}
```

How to implement: Use [type guards](https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html#user-defined-type-guards)!

```tsx
// Button props
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
};

// Anchor props
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

// Input/output options
type Overload = {
  (props: ButtonProps): JSX.Element;
  (props: AnchorProps): JSX.Element;
};

// Guard to check if href exists in props
const hasHref = (props: ButtonProps | AnchorProps): props is AnchorProps =>
  "href" in props;

// Component
const Button: Overload = (props: ButtonProps | AnchorProps) => {
  // anchor render
  if (hasHref(props)) return <a {...props} />;
  // button render
  return <button {...props} />;
};
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoAekrgCEBXGGCAOzjBzAGcKYBPMEjqNmLAAqcucALyJiMAHQMmrABIAVALIAZAIJMowAEaMkXADwady0QFEANkhBIWMAHxwAZHADeFOHAAFkSYAPwAXHD0LAAmSJjALEgxANwUAL5p5BTUcLosaIHQ7JK8AkL5hdASENwycuiKlUVQVnoGxqYWbc3QDk4u7l6+-kEhEXBcMIYsAOZZmRQ5NACSLGCMlBCMG-C1MMCsPOT8gnAA8gBuSFD2ECgx9X7kAQAUHLVckTasNdwAlJEAFIAZQAGgp+s5XFk3h9uJFelA-lxAXBQRCoYMFlllnAAOL0FBQR7MOCFJBoADWcGAmDG8TgSAAHsAplJEiVPhQ0Ed4IEUFxVCF6u9JN8RL9JHAAD55AotFFo+EcqRIlEyNyjABEwXi2tpbBVuKoNAAwrhIElXDy+cIVCxIlcbncHqKVRKHRq5erJP9NSMXnBcigFcUiLEbqM6XBXgKhSExZ9-v6iDB6FA2OYUL4FHmVelg25YcGaCYHXAI3EoKM0xms+XRLn85JC5RixkTbkAKpcFCzJAUTDRDCHNi6MBgV7+54BOuZ2OjALmLVBgIBHyUABUcEAvBuAOD28vZ7HBZhAII8t5R0kv1+YfmwYMSBzBpNqAPpGeyhqkGvWYN9AiYBFqAAd3AhQzwgWZHAUXkQG1Vd12QuB1DMGBb2XSgHyQlDNx3XdAFo9uBbCgHAoAAGjgAADGI2RQL9kmouAYggMxXCZVkpjgVg4FDKooCZRxoXgK8bzXO8HxY+jGMef832ZRDMPXNCpmU8xsMlFhcKw3D-gWIA)

Components, and JSX in general, are analogous to functions. When a component can render differently based on their props, it's similar to how a function can be overloaded to have multiple call signatures. In the same way, you can overload a function component's call signature to list all of its different "versions".

A very common use case for this is to render something as either a button or an anchor, based on if it receives a `href` attribute.

```tsx
type ButtonProps = JSX.IntrinsicElements["button"];
type AnchorProps = JSX.IntrinsicElements["a"];

// optionally use a custom type guard
function isPropsForAnchorElement(
  props: ButtonProps | AnchorProps
): props is AnchorProps {
  return "href" in props;
}

function Clickable(props: ButtonProps | AnchorProps) {
  if (isPropsForAnchorElement(props)) {
    return <a {...props} />;
  } else {
    return <button {...props} />;
  }
}
```

They don't even need to be completely different props, as long as they have at least one difference in properties:

```tsx
type LinkProps = Omit<JSX.IntrinsicElements["a"], "href"> & { to?: string };

function RouterLink(props: LinkProps | AnchorProps) {
  if ("href" in props) {
    return <a {...props} />;
  } else {
    return <Link {...props} />;
  }
}
```

<details>
  <summary><b>Approach: Generic Components</b></summary>

Here is an example solution, see the further discussion for other solutions. _thanks to [@jpavon](https://github.com/typescript-cheatsheets/react/issues/12#issuecomment-394440577)_

```tsx
interface LinkProps {}
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type RouterLinkProps = Omit<NavLinkProps, "href">;

const Link = <T extends {}>(
  props: LinkProps & T extends RouterLinkProps ? RouterLinkProps : AnchorProps
) => {
  if ((props as RouterLinkProps).to) {
    return <NavLink {...(props as RouterLinkProps)} />;
  } else {
    return <a {...(props as AnchorProps)} />;
  }
};

<Link<RouterLinkProps> to="/">My link</Link>; // ok
<Link<AnchorProps> href="/">My link</Link>; // ok
<Link<RouterLinkProps> to="/" href="/">
  My link
</Link>; // error
```

</details>

<details>
  <summary><b>Approach: Composition</b></summary>

If you want to conditionally render a component, sometimes is better to use [React's composition model](https://reactjs.org/docs/composition-vs-inheritance.html) to have simpler components and better to understand typings:

```tsx
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
type RouterLinkProps = Omit<AnchorProps, "href">;

interface ButtonProps {
  as: React.ComponentClass | "a";
  children?: React.ReactNode;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  const { as: Component, children, ...rest } = props;
  return (
    <Component className="button" {...rest}>
      {children}
    </Component>
  );
};

const AnchorButton: React.FunctionComponent<AnchorProps> = (props) => (
  <Button as="a" {...props} />
);

const LinkButton: React.FunctionComponent<RouterLinkProps> = (props) => (
  <Button as={NavLink} {...props} />
);

<LinkButton to="/login">Login</LinkButton>;
<AnchorButton href="/login">Login</AnchorButton>;
<AnchorButton href="/login" to="/test">
  Login
</AnchorButton>; // Error: Property 'to' does not exist on type...
```

</details>

You may also want to use Discriminated Unions, please check out [Expressive React Component APIs with Discriminated Unions](https://blog.andrewbran.ch/expressive-react-component-apis-with-discriminated-unions/).

Here is a brief intuition for **Discriminated Union Types**:

```ts
type UserTextEvent = {
  type: "TextEvent";
  value: string;
  target: HTMLInputElement;
};
type UserMouseEvent = {
  type: "MouseEvent";
  value: [number, number];
  target: HTMLElement;
};
type UserEvent = UserTextEvent | UserMouseEvent;
function handle(event: UserEvent) {
  if (event.type === "TextEvent") {
    event.value; // string
    event.target; // HTMLInputElement
    return;
  }
  event.value; // [number, number]
  event.target; // HTMLElement
}
```

<details>
  <summary>
  Take care: TypeScript does not narrow the type of a Discriminated Union on the basis of typeof checks. The type guard has to be on the value of a key and not it's type.
  </summary>

```ts
type UserTextEvent = { value: string; target: HTMLInputElement };
type UserMouseEvent = { value: [number, number]; target: HTMLElement };
type UserEvent = UserTextEvent | UserMouseEvent;
function handle(event: UserEvent) {
  if (typeof event.value === "string") {
    event.value; // string
    event.target; // HTMLInputElement | HTMLElement (!!!!)
    return;
  }
  event.value; // [number, number]
  event.target; // HTMLInputElement | HTMLElement (!!!!)
}
```

The above example does not work as we are not checking the value of `event.value` but only it's type. Read more about it [microsoft/TypeScript#30506 (comment)](https://github.com/microsoft/TypeScript/issues/30506#issuecomment-474858198)

</details>

<details>
  <summary>
  Discriminated Unions in TypeScript can also work with hook dependencies in React. The type matched is automatically updated when the corresponding union member based on which a hook depends, changes. Expand more to see an example usecase.
   <br/><br/>
  </summary>

```tsx
import { useMemo } from "react";

interface SingleElement {
  isArray: true;
  value: string[];
}
interface MultiElement {
  isArray: false;
  value: string;
}
type Props = SingleElement | MultiElement;

function Sequence(p: Props) {
  return useMemo(
    () => (
      <div>
        value(s):
        {p.isArray && p.value.join(",")}
        {!p.isArray && p.value}
      </div>
    ),
    [p.isArray, p.value] // TypeScript automatically matches the corresponding value type based on dependency change
  );
}

function App() {
  return (
    <div>
      <Sequence isArray={false} value={"foo"} />
      <Sequence isArray={true} value={["foo", "bar", "baz"]} />
    </div>
  );
}
```

<a href="https://www.typescriptlang.org/play?#code/JYWwDg9gTgLgBAKjgQwM5wEoFNkGN4BmUEIcA5FDvmQNwBQdMAnmFnAArFjoC8dccAD5wA3vwETgqAIJQoyJgC44MKAFcs9CRIBuyADYblqVcAB2AcwDaAXRpxxAgL7jhY7QKmz5SuAQOomo66BkZwJlDmFloSTvS4EGYmcAAacDxwABRgypwQ3ACU6QB8ouKUMGpQZphUMAB0aoEAslggEJnBmUU8pZ0ecAA8ACbAOsXB2nqGWJmoBYqTEiJg9V5yCnAAZFtwq9Ma9QBWEOaZZAA0ZAUuAwIiAISr6z7bu-uhWLcegwD0o+NggULsErM8ZBsmBc9vUDlgbNDfr84AAVFhYVC4SJgeDINQwEjIGDAXAGfRMOAgIm4AAWGJUdLgCTkGMgZlGljgcJU6PEBXocToBDUZnwwEScGkYDA3TKAgqVRq-QkIzGTP0aFQADlkCAsDwAERSsAGiYDQZpF4KHgifz6QJOLmfG1kAgQCBkR2-M0-S0Qnw21QaR1wm1WV3uy7kABGyCgUbIsYAXmQbF6fQI-gCffy6E4gA"><i>See this in TS Playground</i>
</a>

In the above example, based on the `isArray` union member, the type of the `value` hook dependency changes.

 </details>

To streamline this you may also combine this with the concept of **User-Defined Type Guards**:

```ts
function isString(a: unknown): a is string {
  return typeof a === "string";
}
```

[Read more about User-Defined Type Guards in the Handbook](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards).

### Narrowing using `extends`

See this quick guide: https://twitter.com/mpocock1/status/1500813765973053440?s=20&t=ImUA-NnZc4iUuPDx-XiMTA

## Props: One or the Other but not Both

Use the `in` keyword, function overloading, and union types to make components that take either one or another sets of props, but not both:

```tsx
type Props1 = { foo: string };
type Props2 = { bar: string };

function MyComponent(props: Props1 | Props2) {
  if ("foo" in props) {
    // props.bar // error
    return <div>{props.foo}</div>;
  } else {
    // props.foo // error
    return <div>{props.bar}</div>;
  }
}
const UsageComponent = () => (
  <div>
    <MyComponent foo="foo" />
    <MyComponent bar="bar" />
    {/* <MyComponent foo="foo" bar="bar"/> // invalid */}
  </div>
);
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCmATzCTgAUcwBnARjgF44BvOTCBABccFjCjAAdgHM4AXwDcVWvSYRWAJi684AIxRQRYiTPlLK5TAFdJGYBElwAstQDCuSJKSSYACjDMLCJqrBwAPoyBGgCUvBRwcMCYcL4ARAIQqYmOAeossTzxCXAA9CVwuawAdPpQpeVIUDhQRQlEMFZQjgA8ACbAAG4AfDyVLFUZct0l-cPmCXJwSAA2LPSF5MX1FYETgtuNza1w7Z09syNjNQZTM4ND8-IUchRoDmJwAKosKNJI7uAHN4YCJkOgYFUAGKubS+WKcIYpIp9e7HbouAGeYH8QScdKCLIlIZojEeIE+PQGPG1QnEzbFHglABUcHRbjJXgpGTxGSytWpBlSRO2UgGKGWwF6cCZJRe9OmFwo0QUQA)

Further reading: [how to ban passing `{}` if you have a `NoFields` type.](http://www.javiercasas.com/articles/typescript-impossible-states-irrepresentable)

## Props: Must Pass Both

```tsx
type OneOrAnother<T1, T2> =
  | (T1 & { [K in keyof T2]?: undefined })
  | (T2 & { [K in keyof T1]?: undefined });

type Props = OneOrAnother<{ a: string; b: string }, {}>;

const a: Props = { a: "a" }; // error
const b: Props = { b: "b" }; // error
const ab: Props = { a: "a", b: "b" }; // ok
```

Thanks [diegohaz](https://twitter.com/kentcdodds/status/1085655423611367426)

## Props: Pass One ONLY IF the Other Is Passed

Say you want a Text component that gets truncated if `truncate` prop is passed but expands to show the full text when `expanded` prop is passed (e.g. when the user clicks the text).

You want to allow `expanded` to be passed only if `truncate` is also passed, because there is no use for `expanded` if the text is not truncated.

Usage example:

```tsx
const App = () => (
  <>
    {/* these all typecheck */}
    <Text>not truncated</Text>
    <Text truncate>truncated</Text>
    <Text truncate expanded>
      truncate-able but expanded
    </Text>
    {/* TS error: Property 'truncate' is missing in type '{ children: string; expanded: true; }' but required in type '{ truncate: true; expanded?: boolean | undefined; }'. */}
    <Text expanded>truncate-able but expanded</Text>
  </>
);
```

You can implement this by function overloads:

```tsx
import { ReactNode } from "react";

interface CommonProps {
  children?: ReactNode;
  miscProps?: any;
}

type NoTruncateProps = CommonProps & { truncate?: false };

type TruncateProps = CommonProps & { truncate: true; expanded?: boolean };

// Function overloads to accept both prop types NoTruncateProps & TruncateProps
function Text(props: NoTruncateProps): JSX.Element;
function Text(props: TruncateProps): JSX.Element;
function Text(props: CommonProps & { truncate?: boolean; expanded?: boolean }) {
  const { children, truncate, expanded, ...otherProps } = props;
  const classNames = truncate ? ".truncate" : "";
  return (
    <div className={classNames} aria-expanded={!!expanded} {...otherProps}>
      {children}
    </div>
  );
}
```

## Props: Omit prop from a type

Note: [Omit was added as a first class utility in TS 3.5](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittk)! 🎉

Sometimes when intersecting types, we want to define our own version of a prop. For example, I want my component to have a `label`, but the type I am intersecting with also has a `label` prop. Here's how to extract that out:

```tsx
export interface Props {
  label: React.ReactNode; // this will conflict with the InputElement's label
}

// this comes inbuilt with TS 3.5
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// usage
export const Checkbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, "label">
) => {
  const { label } = props;
  return (
    <div className="Checkbox">
      <label className="Checkbox-label">
        <input type="checkbox" {...props} />
      </label>
      <span>{label}</span>
    </div>
  );
};
```

When your component defines multiple props, chances of those conflicts increase. However you can explicitly state that all your fields should be removed from the underlying component using the `keyof` operator:

```tsx
export interface Props {
  label: React.ReactNode; // conflicts with the InputElement's label
  onChange: (text: string) => void; // conflicts with InputElement's onChange
}

export const Textbox = (
  props: Props & Omit<React.HTMLProps<HTMLInputElement>, keyof Props>
) => {
  // implement Textbox component ...
};
```

As you can see from the Omit example above, you can write significant logic in your types as well. [type-zoo](https://github.com/pelotom/type-zoo) is a nice toolkit of operators you may wish to check out (includes Omit), as well as [utility-types](https://github.com/piotrwitek/utility-types) (especially for those migrating from Flow).

## Props: Extracting Prop Types of a Component

Sometimes you want the prop types of a component, but it isn't exported.

A simple solution is to use `React.ComponentProps`:

```tsx
// a Modal component defined elsewhere
const defaultProps: React.ComponentProps<typeof Modal> = {
  title: "Hello World",
  visible: true,
  onClick: jest.fn(),
};
```

There are advanced edge cases if you want to extract the prop types of a component taking into account internal props, `propTypes`, and `defaultProps` - [check our issue here for helper utilities that resolve these](https://github.com/typescript-cheatsheets/react/issues/63).

## Props: Render Props

> Advice: Where possible, you should try to use Hooks instead of Render Props. We include this merely for completeness.

Sometimes you will want to write a function that can take a React element or a string or something else as a prop. The best Type to use for such a situation is `ReactNode` which fits anywhere a normal, well, React Node would fit:

```tsx
import { ReactNode } from "react";

interface Props {
  label?: ReactNode;
  children?: ReactNode;
}

const Card = ({ children, label }: Props) => {
  return (
    <div>
      {label && <div>{label}</div>}
      {children}
    </div>
  );
};
```

If you are using a function-as-a-child render prop:

```tsx
import { ReactNode } from "react";

interface Props {
  children: (foo: string) => ReactNode;
}
```

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new/choose).

## Handling Exceptions

You can provide good information when bad things happen.

```ts
class InvalidDateFormatError extends RangeError {}
class DateIsInFutureError extends RangeError {}

/**
 * // optional docblock
 * @throws {InvalidDateFormatError} The user entered date incorrectly
 * @throws {DateIsInFutureError} The user entered date in future
 *
 */
function parse(date: string) {
  if (!isValid(date))
    throw new InvalidDateFormatError("not a valid date format");
  if (isInFuture(date)) throw new DateIsInFutureError("date is in the future");
  // ...
}

try {
  // call parse(date) somewhere
} catch (e) {
  if (e instanceof InvalidDateFormatError) {
    console.error("invalid date format", e);
  } else if (e instanceof DateIsInFutureError) {
    console.warn("date is in future", e);
  } else {
    throw e;
  }
}
```

[View in TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtAGxQGc64BJAOwDcVrgATAERRhIAYtBACAolBxQ4SAB6CW3RghQsA5kknS4AbwC+VWgzj9BTOqyEBXGNaLboshUiUq1mxzIMUKmaywYwBAscMB0AGqcPAAU3AJIAFxwdDBQwBoAlHoUcHBEdlCh8YJwAPxwadZIcMmYnHRIANwUhpTk-oEwwaHhVrb2SHEJyanpWTnkeWghqXAlSAByEADucAC8cCxIa2ZDmS1TcDMsc2j2RCwwextbO6YJw4KZuXCvBfah51Ku1wkAdJoYAAVUD7OAAPnmCWWK0BSBBYJiB1avnIAHoAFSY3KYuDo9FwCBgbohTjzCBoABG1EpAGtcXAAAIwAAWOBWjF0rA4XD4CREUDEMC8+jgwNZNWsjRkvyQRG40NKGRmPww1AAnoyWezVly9hZ+oUtFJoGKJVKZbIrvKkIqFmFQv5jbjcei-AEgiE4GAUFBGk8kik0hl1NldK9gJg4DEAIThKJ8wOZF5HPJsjl3NY86L8wSC4VeGIAIhYEHgKDgvJ4SpqmFEAmLKKOUZjfRYNmNyeyGdWWYe5ksHYGDlNUBLDvCjsqkrgzsGTcOeQJcH+a9R7TSGsmy8JaE41B9foDC2ydFwO0lRFaxwEaFZMaQ4cj0ZiNQyqTUaCQEGjOb5ewFhIY7PmmxyzBA1BIP88rSCWGTVvaCRzg2MDFgANLIzZ5GKSDUI0YSvu+pwwF+P7RgaQ6doMXigXk0wQVB-wrH6LATshU4ZHOI5IBhWFLnAuH4TUEZgb2azNK8bT6EAA)

Simply throwing an exception is fine, however it would be nice to make TypeScript remind the consumer of your code to handle your exception. We can do that just by returning instead of throwing:

```ts
function parse(
  date: string
): Date | InvalidDateFormatError | DateIsInFutureError {
  if (!isValid(date))
    return new InvalidDateFormatError("not a valid date format");
  if (isInFuture(date)) return new DateIsInFutureError("date is in the future");
  // ...
}

// now consumer *has* to handle the errors
let result = parse("mydate");
if (result instanceof InvalidDateFormatError) {
  console.error("invalid date format", result.message);
} else if (result instanceof DateIsInFutureError) {
  console.warn("date is in future", result.message);
} else {
  /// use result safely
}

// alternately you can just handle all errors
if (result instanceof Error) {
  console.error("error", result);
} else {
  /// use result safely
}
```

You can also describe exceptions with special-purpose data types (don't say monads...) like the `Try`, `Option` (or `Maybe`), and `Either` data types:

```ts
interface Option<T> {
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Option<U>): FormikOption<U>;
  getOrElse(value: T): T;
}
class Some<T> implements Option<T> {
  constructor(private value: T) {}
  flatMap<U>(f: (value: T) => None): None;
  flatMap<U>(f: (value: T) => Some<U>): Some<U>;
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  getOrElse(): T {
    return this.value;
  }
}
class None implements Option<never> {
  flatMap<U>(): None {
    return this;
  }
  getOrElse<U>(value: U): U {
    return value;
  }
}

// now you can use it like:
let result = Option(6) // Some<number>
  .flatMap((n) => Option(n * 3)) // Some<number>
  .flatMap((n = new None())) // None
  .getOrElse(7);

// or:
let result = ask() // Option<string>
  .flatMap(parse) // Option<Date>
  .flatMap((d) => new Some(d.toISOString())) // Option<string>
  .getOrElse("error parsing string");
```

---
id: misc_concerns
title: "Section 3: Misc. Concerns"
sidebar_label: Misc. Concerns
---

Sometimes writing React isn't just about React. While we don't focus on other libraries like Redux (see below for more on that), here are some tips on other common concerns when making apps with React + TypeScript.

## Writing TypeScript Libraries instead of Apps

`propTypes` may seem unnecessary with TypeScript, especially when building React + TypeScript **apps**, but they are still relevant when writing **libraries** which may be used by developers working in Javascript.

```ts
interface MyComponentProps {
  autoHeight: boolean;
  secondProp: number;
}
export class MyComponent extends React.Component<MyComponentProps, {}> {
  static propTypes = {
    autoHeight: PropTypes.bool,
    secondProp: PropTypes.number.isRequired,
  };
}
```

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Commenting Components

TypeScript uses [TSDoc](https://github.com/Microsoft/tsdoc), a variant of JSDoc for TypeScript. This is very handy for writing component libraries and having useful descriptions pop up in autocomplete and other tooling (like the [Docz PropsTable](https://www.docz.site/docs/components-api#propstable)). The main thing to remember is to use `/** YOUR_COMMENT_HERE */` syntax in the line just above whatever you're annotating.

```tsx
interface MyComponentProps {
  /** Description of prop "label".
   * @default foobar
   * */
  label?: string;
}
/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
export default function MyComponent({ label = "foobar" }: MyComponentProps) {
  return <div>Hello world {label}</div>;
}
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoC4AOxiSk3STgFkBPABRzAGc4BvCnDgB6AFRi4AESQ80UYGBjAI1OBExww3OACIANigBGSfboB0Q4ZIACAEySMArvqwQIRlFCtxJYkVaGJvoA-ABccDwwCtQA5gDcFAC+FBTiYkKSAOJI1PQo+nBouJB5tHAOcgpKKmo0cABSAMpSEGhwmNAgKDDmrF4A1nYQAO51fGI8TmCQsEh2YpbkvgHkSAAes-AOzq4dTtQYtaxsAMIlqrkwABT8cEGmcAC8ep0eXrpwSRHsXBC8AEoBFYiDAnFA1AAeOzAABuAD4ABKmfQQOAjaD6OwCB76JKQkQwhGJchJIA)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Namespaced Components

Often when creating similar components or components that have a parent-child relationship, it is useful to namespace your components. Types can easily be added be using `Object.assign()`;

```tsx
import { forwardRef } from "react";
const Input = (props: any) => <input {...props} />;
const Form = forwardRef<HTMLDivElement, any>(
  ({ children, ...otherProps }, ref) => (
    <form {...otherProps} ref={ref}>
      {children}
    </form>
  )
);
/**
 * Exported components now can be used as `<Form>` and `<Form.Input>`
 */
export default Object.assign(Form, { Input: Input });
```

[View in the TypeScript Playground](https://www.typescriptlang.org/play/?jsx=2&ssl=1&ssc=1&pln=14&pc=52#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wFgAoCtCAOwGd4BJGsAV3gF44AKMHMOgC44KGgE8AlHA4A+OAB5gLdnADeAOk18IAgL5wA9DIpVaDOADFoeLsnQx1maAHcUUACbJM8gBIAVAFkAGQARYAA3AFEAGyQQJBoYABoRcRlublU0AAtgaPciGhTNdQgYbKQoAAV+Ol0UokwpWR4KOAUnKDwNTTKK6tr9Ro5VRt1jcnb2rNz8wt02hQNOkAmJCQBuE3IDACpdtt24SIAPSFgkdzhqcFoEmDo4Gghna9E4ACMkOFY6S5FHgADeRWLoyQGpK7A0EgdTMNgwcGHAwUJBnaDwdxITAoVjReAAeQ+ACskBh1Cg6HRgABzGjcGEpVTw9jCFkwXSbIA)

(Contributed by @bryceosterhaus, see [further discussion](https://github.com/typescript-cheatsheets/react/issues/165))

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Design System Development

I do like [Docz](https://docz.site/) which takes basically [1 line of config](https://www.docz.site/documentation/project-configuration#typescript) to accept TypeScript. However it is newer and has a few more rough edges (many breaking changes since it is still < v1.0)

For developing with Storybook, read the docs I wrote over here: <https://storybook.js.org/configurations/typescript-config/>. This includes automatic proptype documentation generation, which is awesome :)

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Migrating From Flow

You should check out large projects that are migrating from flow to pick up concerns and tips:

- [Jest](https://github.com/facebook/jest/pull/7554)
- [Expo](https://github.com/expo/expo/issues/2164)
- [React-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd/issues/982)
- [Storybook](https://github.com/storybooks/storybook/issues/5030)
- [VueJS](https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf)

Useful libraries:

- <https://github.com/bcherny/flow-to-typescript>
- <https://github.com/Khan/flow-to-ts>
- <https://github.com/piotrwitek/utility-types>

If you have specific advice in this area, please file a PR!

[Something to add? File an issue](https://github.com/typescript-cheatsheets/react/issues/new).

## Prettier

There isn't any real secret to Prettier for TypeScript. But its a great idea to run prettier on every commit!

```bash
$ yarn add -D prettier husky lint-staged
```

```json
// inside package.json
{
  //...
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "linters": {
      "src/*.{ts,tsx,js,jsx,css,scss,md}": [
        "prettier --trailing-comma es5 --single-quote --write",
        "git add"
      ],
      "ignore": ["**/dist/*, **/node_modules/*"]
    }
  },
  "prettier": {
    "printWidth": 80,
    "semi": false,
    "singleQuote": true,
    "trailingComma": "es5"
  }
}
```

Integrating this with ESlint may be a problem. We haven't written much on this yet, please contribute if you have a strong opinion. [Here's a helpful gist.](https://gist.github.com/JirkaVebr/519c7597517e4ba756d5b89e7cb4cc0e)

For library authors, this is set up for you in [tsdx](https://github.com/palmerhq/tsdx/pull/45/files). You may also wish to check out the newer https://ts-engine.dev/ project.

## Testing

Yes, you can test your types! You shouldn't use it for EVERYTHING, but it can help prevent regressions:

- https://github.com/azz/jest-runner-tsc
- https://github.com/SamVerschueren/tsd
- https://github.com/ikatyang/dts-jest ([Demo](https://codesandbox.io/s/dts-test-frozen-public-demo-iyorn))
- https://github.com/microsoft/dtslint ([Intro to dtslint](https://www.youtube.com/watch?v=nygcFEwOG8w&feature=share))

## Working with Non-TypeScript Libraries (writing your own index.d.ts)

Lets say you want to use `de-indent`, but it isn't typed or on DefinitelyTyped. You get an error like this:

```
[ts]
Could not find a declaration file for module 'de-indent'. '/Users/swyx/Work/react-sfc-loader/node_modules/de-indent/index.js' implicitly has an 'any' type.
  Try `npm install @types/de-indent` if it exists or add a new declaration (.d.ts) file containing `declare module 'de-indent';` [7016]
```

So create a `.d.ts` file anywhere in your project with the module definition:

```ts
// de-indent.d.ts
declare module "de-indent" {
  function deindent(): void;
  export = deindent; // default export
}
```

<details>

<summary>Further Discussion</summary>

Any other tips? Please contribute on this topic! [We have an ongoing issue here with some references](https://github.com/typescript-cheatsheets/react/issues/8). We have more discussion and examples [in our issue here](https://github.com/typescript-cheatsheets/react/issues/12).

</details>

## Compilation Speed

Compiling large TS projects can get slow. Here are some tips:

- We have a dedicated repo tracking TS speed recommendations: https://github.com/typescript-cheatsheets/speed
- Use [TS 3.0 Project references](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_version#typescript-30)
- Check the official [TS performance wiki guidelines](https://github.com/microsoft/TypeScript/wiki/Performance) - note that [Dan Rossenwasser says to take it with a grain of salt](https://news.ycombinator.com/item?id=25199070)
- Webpack ([see CRA diff](https://gist.github.com/jaredpalmer/d3016701589f14df8a3572df91a5754b)):
  - set `output.pathinfo = false`
  - set `optimization.splitChunks`, `optimization.removeAvailableModules`, `optimization.removeEmptyChunks` to `false`


  ---
id: types_react_api
title: "Section 4: @types/react and @types/react-dom APIs"
sidebar_label: "@types/react and @types/react-dom APIs"
---

The `@types` typings export both "public" types meant for your use as well as "private" types that are for internal use.

Check [SaltyCrane's React TypeScript Cheatsheet](https://github.com/saltycrane/typescript-cheatsheet) for a nice autogenerated complete reference.

## `@types/react`

[Link to `.d.ts`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)

**Namespace: React**

Most Commonly Used Interfaces and Types

- `ReactNode` - anything that is renderable _inside_ of JSX, this is NOT the same as what can be rendered by a component!
- `Component` - base class of all class-based components
- `PureComponent` - base class for all class-based optimized components
- `FC`, `FunctionComponent` - a complete interface for function components, often used to type external components instead of typing your own
- `CSSProperties` - used to type style objects
- all events: used to type event handlers
- all event handlers: used to type event handlers
- all consts: `Children`, `Fragment`, ... are all public and reflect the React runtime namespace

Not Commonly Used but Good to know

- `Ref` - used to type `innerRef`
- `ElementType` - used for higher order components or operations on components, e.g. [Polymorphic Components](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#polymorphic-components)
- `ReactElement` - [can be used if you want to pass it to `cloneElement`](https://www.reddit.com/r/reactjs/comments/ia8sdi/any_other_typescript_users_constantly_confused/g1npahe/) aka it's pretty rarely used
- `ComponentType` - used for higher order components where you don't specifically deal with the intrinsic components
- `ReactPortal` - used if you specifically need to type a prop as a portal, otherwise it is part of `ReactNode`
- `ComponentClass` - a complete interface for the produced constructor function of a class declaration that extends `Component`, often used to type external components instead of typing your own
- `JSXElementConstructor` - anything that TypeScript considers to be a valid thing that can go into the opening tag of a JSX expression
- `ComponentProps` - props of a component - most useful for [Wrapping/Mirroring a HTML Element](https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#wrappingmirroring-a-html-element)
- `ComponentPropsWithRef` - props of a component where if it is a class-based component it will replace the `ref` prop with its own instance type
- `ComponentPropsWithoutRef` - props of a component without its `ref` prop
- `HTMLProps` and `HTMLAttributes` - these are the most generic versions, for global attributes (see a list of [attributes marked as "global attribute" on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)). In general, prefer `React.ComponentProps`, `JSX.IntrinsicElements`, or [specialized HTMLAttributes interfaces](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/a2aa0406e7bf269eef01292fcb2b24dee89a7d2b/types/react/index.d.ts#L1914-L2625):

<details>
  <summary>
  List of specialized HTMLAttributes
  </summary>

Note that there are about 50 of these, which means there are some HTML elements which are not covered.

- `AnchorHTMLAttributes`
- `AudioHTMLAttributes`
- `AreaHTMLAttributes`
- `BaseHTMLAttributes`
- `BlockquoteHTMLAttributes`
- `ButtonHTMLAttributes`
- `CanvasHTMLAttributes`
- `ColHTMLAttributes`
- `ColgroupHTMLAttributes`
- `DataHTMLAttributes`
- `DetailsHTMLAttributes`
- `DelHTMLAttributes`
- `DialogHTMLAttributes`
- `EmbedHTMLAttributes`
- `FieldsetHTMLAttributes`
- `FormHTMLAttributes`
- `HtmlHTMLAttributes`
- `IframeHTMLAttributes`
- `ImgHTMLAttributes`
- `InsHTMLAttributes`
- `InputHTMLAttributes`
- `KeygenHTMLAttributes`
- `LabelHTMLAttributes`
- `LiHTMLAttributes`
- `LinkHTMLAttributes`
- `MapHTMLAttributes`
- `MenuHTMLAttributes`
- `MediaHTMLAttributes`
- `MetaHTMLAttributes`
- `MeterHTMLAttributes`
- `QuoteHTMLAttributes`
- `ObjectHTMLAttributes`
- `OlHTMLAttributes`
- `OptgroupHTMLAttributes`
- `OptionHTMLAttributes`
- `OutputHTMLAttributes`
- `ParamHTMLAttributes`
- `ProgressHTMLAttributes`
- `SlotHTMLAttributes`
- `ScriptHTMLAttributes`
- `SelectHTMLAttributes`
- `SourceHTMLAttributes`
- `StyleHTMLAttributes`
- `TableHTMLAttributes`
- `TextareaHTMLAttributes`
- `TdHTMLAttributes`
- `ThHTMLAttributes`
- `TimeHTMLAttributes`
- `TrackHTMLAttributes`
- `VideoHTMLAttributes`
- `WebViewHTMLAttributes`

</details>

- all methods: `createElement`, `cloneElement`, ... are all public and reflect the React runtime API

[@Ferdaber's note](https://github.com/typescript-cheatsheets/react/pull/69): I discourage the use of most `...Element` types because of how black-boxy `JSX.Element` is. You should almost always assume that anything produced by `React.createElement` is the base type `React.ReactElement`.

**Namespace: JSX**

- `Element` - the type of any JSX expression. You should ideally never need to see or use this, but you do because of [a limitation of TypeScript](https://github.com/microsoft/TypeScript/issues/21699).
- `LibraryManagedAttributes` - It specifies other places where JSX elements can declare and initialize property types. Used to resolve static `defaultProps` and `propTypes` with the internal props type of a component.
- `IntrinsicElements` - every possible built-in component that can be typed in as a lowercase tag name in JSX. If you're using this to get the attributes for a HTML element, `React.ComponentProps<element>` may be more readable as it doesn't require knowing what "Intrinsic" means.

Not commonly used but good to know

- `IntrinsicAttributes` set of attributes that all `IntrinsicElements` support... basically just `key`.
- `ElementChildrenAttribute` name of property that TS looks at to figure out what types of children a component supports. Basically the `children` property
- `ElementAttributesProperty` name of property that TS looks at to figure out what attributes a component supports. Basically the `props` property (for a class instance)

**Don't use/Internal/Deprecated**

Anything not listed above is considered an internal type and not public. If you're not sure you can check out the source of `@types/react`. The types are annotated accordingly.

- `SFCElement`
- `SFC`
- `ComponentState`
- `LegacyRef`
- `StatelessComponent`
- `ReactType`

### Adding non-standard attributes

The attributes allowed on host components such as `button` or `img` follow the
[HTML living standard](https://html.spec.whatwg.org/). New features that are not yet part of the living standard
or are only implemented by certain browsers will therefore cause a type error. If
you specifically write code for these browsers or polyfill these attributes you can
use [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) to still get those components type checked without having
to use `any` or `@ts-ignore`.

In this example we'll add the [`loading`](https://www.chromestatus.com/feature/5645767347798016) attribute which adds support for [lazy-loading](https://web.dev/native-lazy-loading) images on Chrome:

```ts
// react-unstable-attributes.d.ts
import "react";

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: "auto" | "eager" | "lazy";
  }
}
```

## `@types/react-dom`

To be written