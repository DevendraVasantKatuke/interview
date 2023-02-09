`e.stopPropagation()` stops the event handlers attached to the tags above from firing.

`e.preventDefault()` prevents the default browser behavior for the few events that have it.

Updater Function:
```js
const [number, setNumber] = useState(0);
setNumber(number + 5);
setNumber(n => n + 1); // updater function
```
