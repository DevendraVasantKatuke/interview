```
let empty = {};
console.log(empty.toString);
// function toString(){…}
console.log(empty.toString());
// [object Object]
console.log(Object.getPrototypeOf({}) == Object.prototype);
// true
console.log(Object.getPrototypeOf(Object.prototype));
// null
console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
// true
console.log(Object.getPrototypeOf([]) == Array.prototype);
// true
```
```
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");
// → The black rabbit says 'I am fear and darkness'
```