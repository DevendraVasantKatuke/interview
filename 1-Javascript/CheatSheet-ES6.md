```
let bin = 0b1010010
let oct = 0o755
```
```
"hello".repeat(3)
"hello".includes("ll")
"hello".startsWith("he")
"hello".padStart(8) // "   hello"
"hello".padEnd(8) // "hello   " 
"hello".padEnd(8, '!') // hello!!!
"\u1E9B\u0323".normalize("NFC")
```
```
class Circle extends Shape {
	constructor (radius) {
    	this.radius = radius
  	}
	getArea () {
    	return Math.PI * 2 * this.radius
  	}
	// Calling superclass methods
  	expand (n) {
    	return super.expand(n) * Math.PI
  	}
	// Static methods
	static createFromDiameter(diameter) {
    	return new Circle(diameter / 2)
  	}
}
```
```
const byte = 2 ** 8
Math.pow(2, 8)
```
```
new Promise((resolve, reject) => {
	if (ok) { resolve(result) }
  	else { reject(error) }
})
```
```
promise
	.then((result) => { ··· })
	.catch((error) => { ··· })
	.finally(() => { // logic independent of success/error })
```
```
Promise.all(···)
Promise.race(···)
Promise.reject(···)
Promise.resolve(···)
```
```
async function run () {
	const user = await getUser()
	const tweets = await getTweets(user)
	return [user, tweets]
}
```
```
// Destructuring assignment
// Arrays
const [first, last] = ['Nikola', 'Tesla']
// Objects
let {title, author} = {
	title: 'The Silkworm',
	author: 'R. Galbraith'
}
```
```
// Default values
const scores = [22, 33]
const [math = 50, sci = 50, arts = 50] = scores
// math === 22, sci === 33, arts === 50

// Function arguments
function greet({ name, greeting }) {
	console.log(`${greeting}, ${name}!`)
}
greet({ name: 'Larry', greeting: 'Ahoy' })

function greet({ name = 'Rauno' } = {}) {
	console.log(`Hi ${name}!`);
}
greet() // Hi Rauno!
greet({ name: 'Larry' }) // Hi Larry!
```
```
// Reassigning keys
function printCoordinates({ left: x, top: y }) {
  console.log(`x: ${x}, y: ${y}`)
}
printCoordinates({ left: 25, top: 90 })
```
```
// Destructuring Loops
for (let {title, artist} of songs) {
	···
}
```
```
// Object destructuring
const { id, ...detail } = song;
```
```
// Spread
// Object spread
// with Object spread
const options = {
	...defaults,
	visible: true
}

// without Object spread
const options = Object.assign(
	{}, defaults,
  	{ visible: true })
// The Object spread operator lets you build new objects from other objects.

//Array spread
// with Array spread
const users = [
	...admins,
	...editors,
	'rstacruz'
]

// without Array spread
const users = admins
	.concat(editors)
	.concat([ 'rstacruz' ])
//The spread operator lets you build new arrays in the same way.
```
```
function greet (name = 'Jerry') {
	return `Hello ${name}`
}

function fn(x, ...y) {
  // y is an Array
  return x * y.length
}

fn(...[1, 2, 3])
// same as fn(1, 2, 3)

setTimeout(() => {
  ···
})

readFile('text.txt', (err, data) => {
  ...
})

numbers.map(n => n * 2)
// No curly braces = implicit return
// Same as: numbers.map(function (n) { return n * 2 })
numbers.map(n => ({
  result: n * 2
}))
```
```
module.exports = { hello, bye }
// Same as: module.exports = { hello: hello, bye: bye }

const App = {
	start () {
    	console.log('running')
  	}
}

const App = {
	get closed () {
    	return this.status === 'closed'
  	},
  	set closed (value) {
    	this.status = value ? 'closed' : 'open'
  	}
}
```
```
let event = 'click'
let handlers = {
	[`on${event}`]: true
}
```
```
const fatherJS = { age: 57, name: "Brendan Eich" }
Object.values(fatherJS)
// [57, "Brendan Eich"]
Object.entries(fatherJS)
// [["age", 57], ["name", "Brendan Eich"]]
```
```
import Express from 'express'
// aka: const Express = require('···').default || require('···')
import { indent } from 'helpers'
// aka: const indent = require('···').indent
import * as Helpers from 'helpers'
// aka: const Helpers = require('···')
import { indentSpaces as indent } from 'helpers'
// aka: const indent = require('···').indentSpaces
import is the new require(). See: Module imports

export default function () { ··· }
// aka: module.exports.default = ···
export function mymethod () { ··· }
// aka: module.exports.mymethod = ···
export const pi = 3.14159
// aka: module.exports.pi = ···
```
```
function* idMaker () {
	let id = 0
  	while (true) { yield id++ }
}
let gen = idMaker()
gen.next().value  // → 0
gen.next().value  // → 1
gen.next().value  // → 2

for (let i of iterable) {
	···
}
```