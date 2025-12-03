---
title: The global object in Javascript
date: Dec 29, 2023
author: Devendra Vasant Katuke
---

### type `this` on comm

1. Open your console
2. type `node` and press `enter`. A node command prompt will appear.
3. type `this` and press `enter`.
4. you see the APIs below:

```
{
  global,
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Getter/Setter],
  btoa: [Getter/Setter],
  performance: [Getter/Setter],
  navigator: [Getter],
  fetch: [Function: fetch],
  crypto: [Getter]
}
```

```
> this === globalThis
> this === window

```
