##### Update React
```
npm update react@next react-dom@next
yarn upgrade react@next react-dom@next
```

## React 18 features
- automatic batching: new APIs (like startTransition), and a new streaming server renderer with built-in support for React.lazy. These features are possible due to “concurrent rendering” and it lets React prepare multiple versions of the UI at the same time. 

> there is no concurrent mode, only concurrent features.
```js
// before
const container = document.getElementById('root');
ReactDOM.render(<App />, container);

// after
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);
```
## Streaming Server Rendering with Suspense

React 18 also includes improvements to server-side rendering performance using Suspense.

Streaming server rendering lets you generate HTML from React components on the server, and stream that HTML to your users. In React 18, you can use `Suspense` to break down your app into smaller independent units which can be streamed independently of each other without blocking the rest of the app. This means users will see your content sooner and be able to start interacting with it much faster.

## React without memo {/*react-without-memo*/}

Looking further into the future, [Xuan Huang (黄玄)](https://twitter.com/Huxpro) shared an update from our React Labs research into an auto-memoizing compiler. Check out this talk for more information and a demo of the compiler prototype:

## Responding to events {/*responding-to-events*/}
- `e.stopPropagation()` stops the event handlers attached to the tags above from firing.
- `e.preventDefault()` prevents the default browser behavior for the few events that have it.

```js {2-4,7}
function MyButton() {
    const [count, setCount] = useState(0);
    
    function handleClick() {
        setCount(count + 1);
    }

    return (
        <button onClick={handleClick}>Click me</button>
    );
}
```
```
export default function MyApp() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>Counters that update together</h1>
            <MyButton count={count} onClick={handleClick} />
            <MyButton count={count} onClick={handleClick} />
        </div>
    );
}

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
```
## Updater Function:
```js
const [number, setNumber] = useState(0);
setNumber(number + 5);
setNumber(n => n + 1); // updater function
```
