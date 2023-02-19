### Function Components
These can be written as normal functions that take a props argument and return a JSX element.
```
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
### Why is React.FC discouraged? What about React.FunctionComponent / React.VoidFunctionComponent ?
You may see this in many React+TypeScript codebases:
```
const App: React.FunctionComponent<{ message: string }> = ({ message }) => (
<div>{message}</div>
);
```
However, the general consensus today is that React.FunctionComponent (or the shorthand React.FC ) is discouraged. This is a nuanced opinion of course, but if you agree and want to remove React.FC from your codebase, you can use this jscodeshift codemod.

Some differences from the "normal function" version:

- React.FunctionComponent is explicit about the return type, while the normal function version is implicit (or else needs additional annotation).
- It provides typechecking and autocomplete for static properties like displayName , propTypes , and defaultProps.
    - Note that there are some known issues using defaultProps with React.FunctionComponent . See this issue for details. We maintain a separate defaultProps section you can also look up.
- Before the React 18 type updates, React.FunctionComponent provided an implicit definition of children (see below), which was heavily debated and is one of the reasons React.FC was removed from the Create React App TypeScript template.
```
// before React 18 types
const Title: React.FunctionComponent<{ title: string }> = ({
    children,
    title,
}) => <div title={title}>{children}</div>;
```
### (Deprecated)Using React.VoidFunctionComponent or React.VFC instead
In @types/react 16.9.48, the React.VoidFunctionComponent or React.VFC type was added for typing children explicitly. However, please be aware that React.VFC and React.VoidFunctionComponent were deprecated in React 18 (https://github.com/DefinitelyTyped/DefinitelyTyped/pull/59882), so this interim solution is no longer necessary or
recommended in React 18+.

Please use regular function components or React.FC instead.
```
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
- In the future , it may automatically mark props as readonly , though that's a moot point if the props object is destructured in the parameter list.

In most cases it makes very little difference which syntax is used, but you may prefer the more explicit nature of React.FunctionComponent .

## Minor Pitfalls
These patterns are not supported:
### Conditional rendering
```
const MyConditionalComponent = ({ shouldRender = false }) =>
shouldRender ? <div /> : false; // don't do this in JS either
const el = <MyConditionalComponent />; // throws an error

```

This is because due to limitations in the compiler, function components cannot return anything other than a JSX expression or null , otherwise it complains with a cryptic error message saying that the other type is not assignable to Element .
### Array.fill
```
const MyArrayComponent = () => Array(5).fill(<div />);
const el2 = <MyArrayComponent />; // throws an error
```
Unfortunately just annotating the function type will not help so if you really need to return other exotic types that React supports, you'd need to perform a type assertion:
```
const MyArrayComponent = () => Array(5).fill(<div />) as any as JSX.Element;
```
## Hooks
### useState
Type inference works very well for simple values:
```
const [state, setState] = useState(false);
// `state` is inferred to be a boolean
// `setState` only takes booleans
```
See also the Using Inferred Types section if you need to use a complex type that you've relied on inference for.

However, many hooks are initialized with null-ish default values, and you may wonder how to provide types. Explicitly declare the type, and use a union type:
```
const [user, setUser] = useState<User | null>(null);
// later...
setUser(newUser);
```
You can also use type assertions if a state is initialized soon after setup and always has a value after:
```
const [user, setUser] = useState<User>({} as User);
// later...
setUser(newUser);
```
This temporarily "lies" to the TypeScript compiler that {} is of type User . You should follow up by setting the user state — if you don't, the rest of your code may rely on the fact that user is of type User and that may lead to runtime errors.

### useReducer
You can use Discriminated Unions for reducer actions. Don't forget to define the return type of reducer, otherwise TypeScript will infer it.
```
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
			<button onClick={() => dispatch({ type: "decrement", payload: "5" })}>-</button>
			<button onClick={() => dispatch({ type: "increment", payload: 5 })}>+</button>
		</>
	);
}
```
### Usage with Reducer from redux
In case you use the redux library to write reducer function, It provides a convenient helper of the format Reducer<State, Action> which takes care of the return type for you.

So the above reducer example becomes:
```
import { Reducer } from 'redux';

export function reducer: Reducer<AppState, Action>() {}
```
### useEffect / useLayoutEffect
Both of useEffect and useLayoutEffect are used for performing side effects and return an optional cleanup function which means if they don't deal with returning values, no types are necessary. When using useEffect , take care not to return anything other than a function or undefined , otherwise both TypeScript and React will yell at you. This can be subtle when using arrow functions:
```
function DelayedEffect(props: { timerMs: number }) {
	const { timerMs } = props;
	
	useEffect(
		() =>
			setTimeout(() => {
				/* do stuff */
			}, timerMs),
			[timerMs]);
	// bad example! setTimeout implicitly returns a number
	// because the arrow function body isn't wrapped in curly braces
	return null;
}
```
Solution to the above example
```
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
### useRef
In TypeScript, useRef returns a reference that is either read-only or mutable, depends on whether your type argument fully covers the initial value or not. Choose one that suits your use case.
#### Option 1: DOM element ref
To access a DOM element : provide only the element type as argument, and use null as initial value. In this case, the returned reference will have a read-only .current that is managed by React. TypeScript expects you to give this ref to an element's ref prop:
```
function Foo() {
	// - If possible, prefer as specific as possible. For example, 		HTMLDivElement is better than HTMLElement and way better than Element.

	// - Technical-wise, this returns RefObject<HTMLDivElement>

	const divRef = useRef<HTMLDivElement>(null);
	
	useEffect(() => {
		// Note that ref.current may be null. This is expected, because you may conditionally render the ref-ed element, or you may forgot to assign it
		if (!divRef.current) throw Error("divRef is not assigned");
		// Now divRef.current is sure to be HTMLDivElement
		doSomethingWith(divRef.current);
	});

	// Give the ref to an element so React can manage it for you
	return <div ref={divRef}>etc</div>;
}
```
If you are sure that divRef.current will never be null, it is also possible to use the non-null assertion operator ! :
```
const divRef = useRef<HTMLDivElement>(null!);
// Later... No need to check if it is null
doSomethingWith(divRef.current);
```
Note that you are opting out of type safety here - you will have a runtime error if you forget to assign the ref to an element in the render, or if the ref-ed element is conditionally rendered.

#### Choosing which HTMLElement to use
Refs demand specificity - it is not enough to just specify any old HTMLElement . If you don't know the name of the element type you need, you can check lib.dom.ts or make an intentional type error and let the language service tell you:

#### Option 2: Mutable value ref
To have a mutable value : provide the type you want, and make sure the initial value fully belongs to that type:
```
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
### useImperativeHandle
```
// Countdown.tsx
// Define the handle types which will be passed to the forwardRef
export type CountdownHandle = {
	start: () => void;
};

type CountdownProps = {};

const Countdown = forwardRef<CountdownHandle, CountdownProps>((props, ref) => {
	useImperativeHandle(ref, () => ({
		// start() has type inference here
		start() {
			alert("Start");
		},
	}));
	return <div>Countdown</div>;
});
```
```
// The component uses the Countdown component
import Countdown, { CountdownHandle } from "./Countdown.tsx";

function App() {
	const countdownEl = useRef<CountdownHandle>(null);
	useEffect(() => {
		if (countdownEl.current) {
			// start() has type inference here as well
countdownEl.current.start();
		}
	}, []);
	return <Countdown ref={countdownEl} />;
}
```
### Custom Hooks

If you are returning an array in your Custom Hook, you will want to avoid type inference as TypeScript will infer a union type (when you actually want different types in each position of the array). Instead, use TS 3.4 const assertions:
```
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
This way, when you destructure you actually get the right types based on destructure position.

### Alternative: Asserting a tuple return type
If you are having trouble with const assertions, you can also assert or define the function return types:
```
import { useState } from "react";

export function useLoading() {
	const [isLoading, setState] = useState(false);
	const load = (aPromise: Promise<any>) => {
		setState(true);
		return aPromise.finally(() => setState(false));
	};
	return [isLoading, load] as [
boolean, (aPromise: Promise<any>) => Promise<any>];
}
```
A helper function that automatically types tuples can also be helpful if you write a lot of custom hooks:
```
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
Note that the React team recommends that custom hooks that return more than two values should use proper objects instead of tuples, however.

### Class Components
Within TypeScript, React.Component is a generic type (aka React.Component<PropType, StateType> ), so you want to provide it with (optional) prop and state type parameters:
```
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
			<div>{this.props.message} {this.state.count}</div>
		);
	}
}
```
> Don't forget that you can export/import/extend these types/interfaces for reuse.

### Why annotate state twice?
It isn't strictly necessary to annotate the state class property, but it allows better type inference when accessing this.state and also initializing the state.

This is because they work in two different ways, the 2nd generic type parameter will allow this.setState() to work correctly, because that method comes from the base class, but initializing state inside the component overrides the base implementation so you have to make sure that you tell the compiler that you're not actually doing anything different.

### No need for readonly
You often see sample code include readonly to mark props and state immutable:
```
type MyProps = {
	readonly message: string;
};
type MyState = {
	readonly count: number;
};
```
This is not necessary as React.Component<P,S> already marks them as immutable. 

### Class Methods: Do it like normal, but just remember any arguments for your functions also need to be typed:
```
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
### Class Properties : 
If you need to declare class properties for later use, just declare it like state , but without assignment:
```
class App extends React.Component<{message: string;}> {
	pointer: number; // like this
	componentDidMount() {
		this.pointer = 3;
	}
	
	render() {
		return (
			<div>{this.props.message} and {this.pointer}</div>
		);
	}
}
```
### Typing getDerivedStateFromProps
Before you start using getDerivedStateFromProps , please go through the documentation and You Probably Don't Need Derived State. Derived State can be implemented using hooks which can also help set up memoization.

Here are a few ways in which you can annotate getDerivedStateFromProps

1. If you have explicitly typed your derived state and want to make sure that the return value from getDerivedStateFromProps conforms to it.
```
class Comp extends React.Component<Props, State> {
	static getDerivedStateFromProps(
		props: Props, state: State
	): Partial<State> | null {
	//
	}
}
```
2. When you want the function's return value to determine your state.
```
class Comp extends React.Component<Props,
	ReturnType<typeof Comp["getDerivedStateFromProps"]>
> {
	static getDerivedStateFromProps(props: Props) {}
}
```
3. When you want derived state with other state fields and memoization
```
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
### You May Not Need defaultProps
> defaultProps will eventually be deprecated
> The consensus is to use object default values.

Function Components:
```
type GreetProps = { age?: number };
const Greet = ({ age = 21 }: GreetProps) => // etc
```
Class Components:
```
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
### Typing defaultProps
Type inference improved greatly for defaultProps in TypeScript 3.0+, although some edge cases are still problematic .

### Function Components
```
// using typeof as a shortcut; note that it hoists!
// you can also declare the type of DefaultProps if you choose
// e.g. https://github.com/typescript-cheatsheets/react/issues/415#issuecomment-841223219

type GreetProps = { age: number } & typeof defaultProps;
Const defaultProps = {
	age: 21,
};
const Greet = (props: GreetProps) => {
	// etc
};
Greet.defaultProps = defaultProps;
```
For Class components , there are a couple ways to do it (including using the Pick utility type) but the recommendation is to "reverse" the props definition:
```
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
### JSX.LibraryManagedAttributes nuance for library authors
The above implementations work fine for App creators, but sometimes you want to be able to export GreetProps so that others can consume it. The problem here is that the way GreetProps is defined, age is a required prop when it isn't because of defaultProps .

The insight to have here is that GreetProps is the internal contract for your component, not the external , consumer facing contract. You could create a separate type specifically for export, or you could make use of the JSX.LibraryManagedAttributes utility:
```
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
This will work properly, although hovering over ApparentGreetProps may be a little intimidating. You can reduce this boilerplate with the ComponentProps utility detailed below.

### Consuming Props of a Component with defaultProps
A component with defaultProps may seem to have some required props that actually aren't.
Problem Statement

Here's what you want to do:
```
interface IProps {
	name: string;
}
const defaultProps = {
	age: 25,
};
const GreetComponent = ({ name, age }: IProps & typeof defaultProps) => 	(<div>{`Hello, my name is ${name}, ${age}`}</div>);
GreetComponent.defaultProps = defaultProps;

const TestComponent = (props: React.ComponentProps<typeof GreetComponent>) => {
	return <h1 />;
};
// Property 'age' is missing in type '{ name: string; }' but required in type '{ age: number; }'
const el = <TestComponent name="foo" />;
```
### Solution
Define a utility that applies JSX.LibraryManagedAttributes :
```
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
### TypeScript 2.9 and earlier
For TypeScript 2.9 and earlier, there's more than one way to do it, but this is the best advice we've yet seen:
```
type Props = Required<typeof MyComponent.defaultProps> & {
	/* additional props here */
};
export class MyComponent extends React.Component<Props> {
	static defaultProps = {
		foo: "foo",
	};
}
```
Our former recommendation used the Partial type feature in TypeScript, which means that the current interface will fulfill a partial version on the wrapped interface. In that way we can extend defaultProps without any changes in the types!
```
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
The problem with this approach is it causes complex issues with the type inference working with JSX.LibraryManagedAttributes . Basically it causes the compiler to think that when creating a JSX expression with that component, that all of its props are optional.

### Typing Component Props
This is intended as a basic orientation and reference for React developers familiarizing with TypeScript.

### Basic Prop Types Examples
A list of TypeScript types you will likely use in a React+TypeScript app:
```
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
Notice we have used the TSDoc ` /** comment */` style here on each prop. You can and are encouraged to leave descriptive comments on reusable components. For a fuller example and discussion, see our Commenting Components section in the Advanced Cheatsheet.

### Useful React Prop Type Examples
Relevant for components that accept other React components as props.
```
export declare interface AppProps {
	children?: React.ReactNode; // best, accepts everything React can render
	childrenElement: JSX.Element; // A single React element
style?: React.CSSProperties; // to pass through style props

	onChange?: React.FormEventHandler<HTMLInputElement>; // form events! the generic parameter is the type of ev
	props: Props & React.ComponentPropsWithoutRef<"button">; // to impersonate all the props of a button element
	props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>; // to impersonate all the props of MyBu
}
```
### Small React.ReactNode edge case before React 18
Before the React 18 type updates, this code typechecked but had a runtime error:
```
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
This is because ReactNode includes ReactFragment which allowed type {} before React 18.

### JSX.Element vs React.ReactNode?
A more technical explanation is that a valid React node is not the same thing as what is returned by React.createElement . Regardless of what a component ends up rendering, React.createElement always returns an object, which is the JSX.Element interface, but React.ReactNode is the set of all possible return values of a component.
-  JSX.Element -> Return value of React.createElement
- React.ReactNode -> Return value of a component

### Types or Interfaces?
You can use either Types or Interfaces to type Props and State, so naturally the question arises - which do you use?

> Use Interface until You Need Type - orta.

Here's a helpful rule of thumb:

-  always use interface for public API's definition when authoring a library or 3rd party ambient type definitions, as this allows a consumer to extend them via declaration merging if some definitions are missing.
- consider using type for your React Component Props and State, for consistency and because it is more constrained.

> At scale, there are performance reasons to prefer interfaces. 

> but take this with a grain of salt

> Types are useful for union types (e.g. type MyType = TypeA | TypeB ) whereas Interfaces are better for declaring dictionary shapes and then implementing or extending them.

### Useful table for Types vs Interfaces
It's a nuanced topic, don't get too hung up on it. Here's a handy table:

|Aspect                                 			|Type|Interface|
|-                                      			|-   |-        |
|Can describe functions                 			|    |         |
|Can describe constructors              			|    |         |
|Can describe tuples                    			|    |         |
|Interfaces can extend it							|⚠️  |         |
|Classes can extend it								|    |         |
|Classes can implement it ( implements )			|⚠️  |         |
|Can intersect another one of its kind				|    |⚠️       |
|Can create a union with another one of its kind    |	 |		   |
|Can be used to create mapped types			   		|	 |		   |
|Can be mapped over with mapped types 		  		|	 |		   |
|Expands in error messages and logs 		      	|	 |		   |
|Can be augmented                                   |    |         |
|Can be recursive                                   |⚠️  |         |

> ⚠️ In some cases

### getDerivedStateFromProps
Before you start using getDerivedStateFromProps , please go through the documentation and You Probably Don't Need Derived State. Derived State can be easily achieved using hooks which can also help set up memoization easily.

Here are a few ways in which you can annotate getDerivedStateFromProps

- If you have explicitly typed your derived state and want to make sure that the return value from getDerivedStateFromProps conforms to it.
```
class Comp extends React.Component<Props, State> {
	static getDerivedStateFromProps(
		props: Props,
		state: State): Partial<State> | null {
		//
	}
}
```
-  When you want the function's return value to determine your state.
```
class Comp extends React.Component<Props,
	ReturnType<typeof Comp["getDerivedStateFromProps"]>
> {
	static getDerivedStateFromProps(props: Props) {}
}
```
-  When you want derived state with other state fields and memoization
```
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
### Forms and Events
If performance is not an issue (and it usually isn't!), inlining handlers is easiest as you can just use type inference and contextual typing:
```
const el = (
	<button
		onClick={(event) => {
			/* event will be correctly typed automatically! */
		}}
	/>
);
```
But if you need to define your event handler separately, IDE tooling really comes in handy here, as the @type definitions come with a wealth of typing. Type what you are looking for and usually the autocomplete will help you out. Here is what it looks like for an onChange for a form event:
```
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
Instead of typing the arguments and return values with React.FormEvent<> and void , you may alternatively apply types to the event handler itself
```
// typing on LEFT hand side of =
onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
	this.setState({text: e.currentTarget.value})
}
```
#### Why two ways to do the same thing?
The first method uses an inferred method signature (e: React.FormEvent<HTMLInputElement>): void and the second
method enforces a type of the delegate provided by @types/react . So React.ChangeEventHandler<> is simply a "blessed" typing by @types/react , whereas you can think of the inferred method as more... artisanally hand-rolled . Either way it's a good pattern to know.

### Typing onSubmit, with Uncontrolled components in a Form
If you don't quite care about the type of the event, you can just use React.SyntheticEvent. If your target form has custom named inputs that you'd like to access, you can use a type assertion:
```
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
		<label>Email:<input type="email" name="email" /></label>
	</div>
	<div>
		<label>Password:<input type="password" name="password" />				</label>
	</div>
	<div>
		<input type="submit" value="Log in" />
	</div>
</form>
```
### Context
Basic Example
```
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
You can also use the Class.contextType or Context.Consumer API.

### Extended Example
Using createContext with an empty object as default value.
```
interface ContextState {
	// set the type of state you want to handle with context e.g.
	name: string | null;
}
//set an empty object as default state
const Context = createContext({} as ContextState);

// set up context provider as you normally would in JavaScript [React Context API](https://reactjs.org/docs/co
```
Using createContext and context getters to make a createCtx with no defaultValue , yet no need to check for undefined :
```
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
Notice the explicit type arguments which we need because we don't have a default string value:
```
const currentUserContext = createContext<string | undefined>(undefined);
//                                             ^^^^^^^^^^^^^^^^^^
```
along with the non-null assertion to tell TypeScript that currentUser is definitely going to be there:
```
return <div>HELLO {currentUser!.toUpperCase()}!</div>;
//                              ^
```
This is unfortunate because we know that later in our app, a Provider is going to fill in the context.

There are a few solutions for this:
1. You can get around this by asserting non null:
```
const currentUserContext = createContext<string>(undefined!);
```
This is a quick and easy fix, but this loses type-safety, and if you forget to supply a value to the
Provider, you will get an error.
2. We can write a helper function called createCtx that guards against accessing a Context whose value wasn't provided. By doing this, API instead, we never have to provide a default and never have to check for undefined :
```
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
export const [useCurrentUserName, CurrentUserProvider] = 					createCtx<string>();
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
3. You can go even further and combine this idea using createContext and context getters.
```
import { createContext, useContext } from "react";
// A helper to create a Context and Provider with no upfront default value, and without having to check for undefined all the time.

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

export const [useCtx, SettingProvider] = createCtx<string>(); // specify type, but no need to specify va
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
4. Using createContext and useContext to make a createCtx with unstated -like context setters:
```
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
5. A useReducer-based version may also be helpful.

### Mutable Context Using a Class component wrapper
```
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
	ProviderState> {
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
### forwardRef/createRef
#### createRef :
```
import { createRef, PureComponent } from "react";

class CssThemeProvider extends PureComponent<Props> {
	private rootRef = createRef<HTMLDivElement>(); // like this
	render() {
		return <div ref={this.rootRef}>{this.props.children}</div>;
	}
}
```
#### forwardRef :
```
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
> the ref you get from forwardRef is mutable so you can assign to it if needed.

This was done on purpose. You can make it immutable if you have to - assign React.Ref if you want to ensure nobody reassigns it:
```
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
If you are grabbing the props of a component that forwards refs, use ComponentPropsWithRef .

### Generic forwardRefs
#### Option 1 - Wrapper component
```
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
			</li>))}
		</ul>
	);
}
```
#### Option 2 - Redeclare forwardRef
```
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
	ref: ForwardedRef<HTMLUListElement>) {
	return (
		<ul ref={ref}>
		{props.items.map((item, i) => (
		<li key={i}>
			<button onClick={(el) => props.onSelect(item)}>Select</button>
			{item}
		</li>))}
	</ul>);
}

export const ClickableList = forwardRef(ClickableListInner);
```
> You may also wish to do Conditional Rendering with forwardRef .

### Portals
#### Using ReactDOM.createPortal :
```
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
#### Using hooks
```
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
### Modal Component Usage Example:
```
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
					}}>I'm a modal!{" "}
					<button
						style={{ background: "papyawhip" }}
						onClick={() => setShowModal(false)}
						>close</button>
				</div>
			</Modal>
			)}
			<button onClick={() => setShowModal(true)}>show Modal</button>
			// rest of your app
		</div>
	);
}
```
> This example is based on the Event Bubbling Through Portal example of React docs.

### Error Boundaries
#### Option 1: Using react-error-boundary
React-error-boundary - is a lightweight package ready to use for this scenario with TS support built-in. This approach also lets you avoid class components that are not that popular anymore.

#### Options 2: Writing your custom error boundary component

If you don't want to add a new npm package for this, you can also write your own ErrorBoundary component.
```
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
### Troubleshooting Handbook: Types

Facing weird type errors? You aren't alone. This is the hardest part of using TypeScript with React. Be patient - you are learning a new language after all. However, the more you get good at this, the less time you'll be working against the compiler and the more the compiler will be working for you!

Try to avoid typing with any as much as possible to experience the full benefits of TypeScript. Instead, let's try to be familiar with some of the common strategies to solve these issues.

### Union Types and Type Guarding
Union types are handy for solving some of these typing problems:
```
class App extends React.Component<
	{},
	{
		count: number | null; // like this
	}>
	{
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

### Type Guarding:
Sometimes Union Types solve a problem in one area but create another downstream. If A and B are both object types, A | B isn't "either A or B", it is "A or B or both at once", which causes some confusion if you expected it to be the former.
Learn how to write checks, guards, and assertions (also see the Conditional Rendering section below).
```
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
> Method 2 is also known as User-Defined Type Guards and can be really handy for readable code. This is how TS itself refines types with typeof and instanceof .

If you need if...else chains or the switch statement instead, it should "just work", but look up Discriminated Unions if you iteup). This is handy in typing reducers for useReducer or Redux.

### Optional Types
If a component has an optional prop, add a question mark and assign during destructure (or use defaultProps).
```
class MyComponent extends React.Component<{
	message?: string; // like this
	}> {
	render() {
		const { message = "default" } = this.props;
		return <div>{message}</div>;
	}
}
```
You can also use a ! character to assert that something is not undefined, but this is not encouraged.

### Enum Types
> We recommend avoiding using enums as far as possible .

Enums have a few documented issues (the TS team agrees). A simpler alternative to enums is just declaring a union type of string literals:
```
export declare type Position = "left" | "right" | "top" | "bottom";
```
If you must use enums, remember that enums in TypeScript default to numbers. You will usually want to use them as strings instead:
```
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
### Type Assertion
Sometimes you know better than TypeScript that the type you're using is narrower than it thinks, or union types need to be asserted to a more specific type to work with other APIs, so assert with the as keyword. This tells the compiler you know better
than it does.
```
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
Note that you cannot assert your way to anything - basically it is only for refining types. Therefore it is not the same as "casting" a type.

You can also assert a property is non-null, when accessing it:
```
element.parentNode!.removeChild(element); // ! before the period
myFunction(document.getElementById(dialog.id!)!); // ! after the property accessing
let userID!: string; // definite assignment assertion... be careful!
```
Of course, try to actually handle the null case instead of asserting :)

### Simulating Nominal Types
TS' structural typing is handy, until it is inconvenient. However you can simulate nominal typing with type branding :
```
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = OrderID | UserID;
```
We can create these values with the Companion Object Pattern:
```
function OrderID(id: string) {
	return id as OrderID;
}
function UserID(id: string) {
	return id as UserID;
}
```
Now TypeScript will disallow you from using the wrong ID in the wrong place:
```
function queryForUser(id: UserID) {
	// ...
}

queryForUser(OrderID("foobar")); // Error, Argument of type 'OrderID' is not assignable to parameter of type '
```
In future you can use the `unique` keyword to brand.

### Intersection Types
Adding two types together can be handy, for example when your component is supposed to mirror the props of a native component like a button :
```
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

### You can also use Intersection Types to make reusable subsets of props for similar components:
```
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

Make sure not to confuse Intersection Types (which are and operations) with Union Types (which are or operations).

### Union Types
This section is yet to be written (please contribute!). Meanwhile, see our commentary on Union Types usecases.

### Overloading Function Types
Specifically when it comes to functions, you may need to overload instead of union type. The most common way function types are written uses the shorthand:
```
type FunctionType1 = (x: string, y: number) => number;
```
But this doesn't let you do any overloading. If you have the implementation, you can put them after each other with the function keyword:
```
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x): any {
	// implementation with combined signature
	// ...
}
```
However, if you don't have an implementation and are just writing a .d.ts definition file, this won't help you either. In this case you can forego any shorthand and write them the old-school way. The key thing to remember here is as far as TypeScript is
concerned, functions are just callable objects with no key :
```
type pickCard = {
	(x: { suit: string; card: number }[]): number;
	(x: number): { suit: string; card: number };
	// no need for combined signature in this form
	// you can also type static properties of functions here eg `pickCard.wasCalled`
};
```
Note that when you implement the actual overloaded function, the implementation will need to declare the combined call signature that you'll be handling, it won't be inferred for you. You can readily see examples of overloads in DOM APIs, e.g.
createElement .

### Using Inferred Types
Leaning on TypeScript's Type Inference is great... until you realize you need a type that was inferred, and have to go back and explicitly declare types/interfaces so you can export them for reuse.

Fortunately, with typeof , you won't have to do that. Just use it on any value:
```
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
### Using Partial Types
Working with slicing state and props is common in React. Again, you don't really have to go and explicitly redefine your types if you use the Partial generic type:
```
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
### Minor caveats on using Partial
Note that there are some TS users who don't agree with using Partial as it behaves today. See subtle pitfalls of the above example here, and check out this long discussion on why @types/react uses Pick instead of Partial.

### The Types I need weren't exported!
This can be annoying but here are ways to grab the types!
- Grabbing the Prop types of a component: Use React.ComponentProps and typeof , and optionally Omit any overlapping types
```
import { Button } from "library"; // but doesn't export ButtonProps! oh no!
type ButtonProps = React.ComponentProps<typeof Button>; // no problem! grab your own!
type AlertButtonProps = Omit<ButtonProps, "onClick">; // modify
const AlertButton = (props: AlertButtonProps) => (
	<Button onClick={() => alert("hello")} {...props} />
);
```
You may also use ComponentPropsWithoutRef (instead of ComponentProps) and ComponentPropsWithRef (if your component specifically forwards refs)

- Grabbing the return type of a function: use ReturnType :
```
// inside some library - return type { baz: number } is inferred but not exported
function foo(bar: string) {
	return { baz: 1 };
}

//inside your app, if you need { baz: number }
type FooReturn = ReturnType<typeof foo>; // { baz: number }
```
In fact you can grab virtually anything public: see this blogpost from Ivan Koshelev
```
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
- TS also ships with a Parameters utility type for extracting the parameters of a function
- for anything more "custom", the infer keyword is the basic building block for this, but takes a bit of getting used to.

### The Types I need don't exist!
What's more annoying than modules with unexported types? Modules that are untyped !

> Before you proceed - make sure you have checked that types don't exist in DefinitelyTyped or TypeSearch

Fret not! There are more than a couple of ways in which you can solve this problem.
Slapping any on everything A lazier way would be to create a new type declaration file, say typedec.d.ts – if you don't already have one. Ensure that the path to file is resolvable by TypeScript by checking the include array in the tsconfig.json file at the root of your directory.
```
// inside tsconfig.json
{
	// ...
	"include": [
		"src" // automatically resolves if the path to declaration is src/typedec.d.ts
	]
	// ...
}
```
Within this file, add the declare syntax for your desired module, say my-untyped-module – to the declaration file:
```
// inside typedec.d.ts
declare module "my-untyped-module";
```
This one-liner alone is enough if you just need it to work without errors. A even hackier, write-once-and-forget way would be to use "*" instead which would then apply the Any type for all existing and future untyped modules.

This solution works well as a workaround if you have less than a couple untyped modules. Anything more, you now have a ticking type-bomb in your hands. The only way of circumventing this problem would be to define the missing types for those untyped
modules as explained in the following sections.

### Autogenerate types
You can use TypeScript with --allowJs and --declaration to see TypeScript's "best guess" at the types of the library.

If this doesn't work well enough, use dts-gen to use the runtime shape of the object to accurately enumerate all available properties. This tends to be very accurate, BUT the tool does not yet support scraping JSDoc comments to populate additional types.
```
npm install -g dts-gen
dts-gen -m <your-module>
```
### Typing Exported Hooks
Typing Hooks is just like typing pure functions.

The following steps work under two assumptions:
- You have already created a type declaration file as stated earlier in the section.
- You have access to the source code - specifically the code that directly exports the functions you will be using. In most cases, it would be housed in an index.js file. Typically you need a minimum of two type declarations (one for Input Prop and the other for Return Prop) to define a hook completely. Suppose the hook you wish to type follows the following structure,
```
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
```
declare module 'use-untyped-hook' {
	export interface InputProps { ... } // type declaration for prop
	export interface ReturnProps { ... } // type declaration for return props
	export default function useUntypedHook(
		prop: InputProps
		// ...
	): ReturnProps;
}
```
For instance, the useDarkMode hook exports the functions that follows a similar structure.
```
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
```
declare module "use-dark-mode" {
	/**
	* A config object allowing you to specify certain aspects of `useDarkMode`
	*/
	export interface DarkModeConfig {
		classNameDark?: string; // A className to set "dark mode". Default = "dark-mode".
		classNameLight?: string; // A className to set "light mode". Default = "light-mode".
		element?: HTMLElement; // The element to apply the className. Default = `document.body`
		onChange?: (val?: boolean) => void; // Override the default className handler with a custom callback.
		storageKey?: string; // Specify the `localStorage` key. Default = "darkMode". Set to `null` to disable per
		storageProvider?: WindowLocalStorage; // A storage provider. Default = `localStorage`.
		global?: Window; // The global object. Default = `window`.
	}
	// An object returned from a call to `useDarkMode`.
	export interface DarkMode {
		readonly value: boolean;
		enable: () => void;
		disable: () => void;
		toggle: () => void;
	}
	// A custom React Hook to help you implement a "dark mode" component for your application.
	export default function useDarkMode(
		initialState?: boolean,
		config?: DarkModeConfig
	): DarkMode;
}
```
### Typing Exported Components
In case of typing untyped class components, there's almost no difference in approach except for the fact that after declaring the types, you export the extend the type using class UntypedClassComponent extends React.Component<UntypedClassComponentProps, any> {} where UntypedClassComponentProps holds the type declaration.
```
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
### Frequent Known Problems with TypeScript
Just a list of stuff that React developers frequently run into, that TS has no solution for. Not necessarily TSX only.

TypeScript doesn't narrow after an object element null check

### TypeScript doesn't let you restrict the type of children
Guaranteeing typesafety for this kind of API isn't possible:
```
<Menu>
	<MenuItem/> {/* ok */}
	<MenuLink/> {/* ok */}
	<div> {/* error */}
</Menu>
```
### Troubleshooting Handbook: Operators
- typeof and instanceof : type query used for refinement
- keyof : get keys of an object. keyof T is an operator to tell you what values of k can be used for obj[k] .
- O[K] : property lookup
- [K in O] : mapped types
- `+` or `-` or `readonly` or `?` : addition and subtraction and readonly and optional modifiers
- x ? Y : Z : Conditional types for generic types, type aliases, function parameter types
- ! : Nonnull assertion for nullable types
- = : Generic type parameter default for generic types
- as : type assertion
- is : type guard for function return types

Conditional Types are a difficult topic to get around so here are some extra resources:

### Troubleshooting Handbook: Utilities
These are all built in, see source in es5.d.ts:
- ConstructorParameters : a tuple of class constructor's parameter types
- Exclude : exclude a type from another type
- Extract : select a subtype that is assignable to another type
- InstanceType : the instance type you get from a new ing a class constructor
- NonNullable : exclude null and undefined from a type
- Parameters : a tuple of a function's parameter types
- Partial : Make all properties in an object optional
- Readonly : Make all properties in an object readonly
- ReadonlyArray : Make an immutable array of the given type
- Pick : A subtype of an object type with a subset of its keys
- Record : A map from a key type to a value type
- Required : Make all properties in an object required
- ReturnType : A function's return type

### Troubleshooting Handbook: tsconfig.json
```
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
Selected flags and why we like them:
- esModuleInterop : disables namespace imports ( import * as foo from "foo" ) and enables CJS/AMD/UMD style
imports ( import fs from "fs" )
- strict : strictPropertyInitialization forces you to initialize class properties or explicitly declare that they can be
undefined. You can opt out of this with a definite assignment assertion.
- "typeRoots": ["./typings", "./node_modules/@types"] : By default, TypeScript looks in node_modules/@types and parent folders for third party type declarations. You may wish to override this default resolution so you can put all your global type declarations in a special typings folder.

### Troubleshooting Handbook: Fixing bugs in official typings
If you run into bugs with your library's official typings, you can copy them locally and tell TypeScript to use your local version using the "paths" field. In your tsconfig.json :
```
{
	"compilerOptions": {
		"paths": {
			"mobx-react": ["../typings/modules/mobx-react"]
		}
	}
}
```
If you just need to add an interface, or add missing members to an existing interface, you don't need to copy the whole typing package. Instead, you can use declaration merging:
```
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
You dont always have to implement the module, you can simply import the module as any for a quick start:
```
// my-typings.ts
declare module "plotly.js"; // each of its imports are `any`
```
Because you don't have to explicitly import this, this is known as an ambient module declaration. You can do AMD's in a scriptmode .ts file (no imports or exports), or a .d.ts file anywhere in your project.

You can also do ambient variable and ambient type declarations:
```
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
### Troubleshooting Handbook: Globals, Images and other non-TS files
Use declaration merging.

If, say, you are using a third party JS script that attaches on to the window global, you can extend Window :
```
declare global {
	interface Window {
		MyVendorThing: MyVendorType;
	}
}
```
Likewise if you wish to "import" an image or other non TS/TSX file:
```
// declaration.d.ts
// anywhere in your project, NOT the same name as any of your .ts/tsx files
declare module "*.png";
// importing in a tsx file
import * as logo from "./logo.png";
```
Note that tsc cannot bundle these files for you, you will have to use Webpack or Parcel.

### Linting
> Note that TSLint is now in maintenance and you should try to use ESLint instead. If you are interested in TSLint tips, please check this PR from @azdanov. The rest of this section just focuses on ESLint. You can convert TSlint to ESlint with this tool.
> This is an evolving topic. typescript-eslint-parser is no longer maintained and work has recently begun on typescript-eslint in the ESLint community to bring ESLint up to full parity and interop with TSLint.
```
yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint
```
add a lint script to your package.json :
```
"scripts": {
"lint": "eslint 'src/**/*.ts'"
},
```
and a suitable .eslintrc.js (using .js over .json here so we can add comments):
```
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
		"@typescript-eslint/explicit-function-return-type": "warn", // Consider using explicit annotations for obj
		"no-empty": "warn",
	},
};
```
More .eslintrc.json options to consider with more options you may want for apps:
```
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
### 10 Bad TypeScript Habits:
1. not using "strict": true
2. using || for default values when we have ??
3. Using any instead of unknown for API responses
4. using as assertion instead of Type Guards ( function isFoo(obj: unknown): obj is Foo {} )
5. as any in tests
6. Marking optional properties instead of modeling which combinations exist by extending interfaces
7. One letter generics
8. Non-boolean if (nonboolean) checks
9. bangbang checks if (!!nonboolean)
10. != null to check for null and undefined