# Array
```
const myNumbers = [4, 1, -20, -7, 5, 9, -6];
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];
```
### `for..of`

```
for (const x of myNumbers) {...}
``` 

```js
const listItems = products.map(product =>
  ...
);
```
# Object
const band = {
  vocals: "Robert"
}
- Object.keys(band) // ["vocals"]
- Object.values(band) // ["Robert"]
- for..let
```
for (let b in band) {
  console.log(band[b]); // "Robert", b is key
}
```