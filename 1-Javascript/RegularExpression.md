```
let re1 = new RegExp("abc");
let re2 = /abc/;
console.log(/abc/.test("abcde")); // true
console.log(/abc/.test("abxde")); // false
```
```
console.log(/[0123456789]/.test("in 992")); // true
console.log(/[0-9]/.test("in 1992")); // true
```
```
\d	Any digit character
\w	An alphanumeric character (“word character”)
\s	Any whitespace character (space, tab, newline, and similar)
\D	A character that is not a digit
\W	A nonalphanumeric character
\S	A nonwhitespace character
.	Any character except for newline
```
```
console.log(/'\d+'/.test("'123'")); // true
console.log(/'\d+'/.test("''")); // false
console.log(/'\d*'/.test("'123'")); // true
console.log(/'\d*'/.test("''")); // true
```
```
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour")); // true
console.log(neighbor.test("neighbor")); // true
```
```
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45")); // true
```
```
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo")); // true
```
```
let match = /\d+/.exec("one two 100");
console.log(match); // ["100"]
console.log(match.index); // 8
```
```
console.log("one two 100".match(/\d+/)); // ["100"]
```
```
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'")); // ["'hello'", "hello"]
```
```
console.log(/bad(ly)?/.exec("bad")); // ["bad", undefined]
console.log(/(\d)+/.exec("123")); // ["123", "3"]
```
```
console.log(/(?:na)+/.exec("banana")); // ["nana"]
```
```
function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003")); // → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)
```
```
console.log(/a(?=e)/.exec("braeburn")); // ["a"]
console.log(/a(?! )/.exec("a b")); // null
```
```
let animalCount = /\d+ (pig|cow|chicken)s?/;
console.log(animalCount.test("15 pigs")); // true
console.log(animalCount.test("15 pugs")); // false
```
```
console.log("papa".replace("p", "m")); // mapa
console.log("Borobudur".replace(/[ou]/, "a")); // Barobudur
console.log("Borobudur".replace(/[ou]/g, "a")); // Barabadar
```
```
console.log("Liskov, Barbara\nMcCarthy, John\nMilner, Robin"
	.replace(/(\p{L}+), (\p{L}+)/gu, "$2 $1"));
// Barbara Liskov
// John McCarthy
// Robin Milner
```
```
let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\p{L}+)/gu, minusOne)); // → no lemon, 1 cabbage, and 100 eggs
```
```
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3")); // 1 + 3
console.log(stripComments("x = 10;// ten!")); // x = 10;
console.log(stripComments("1 /* a */+/* b */ 1")); // 1  1
```
```
function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments("1 /* a */+/* b */ 1")); // 1 + 1
```
```
let name = "harry";
let regexp = new RegExp("(^|\\s)" + name + "($|\\s)", "gi");
console.log(regexp.test("Harry is a dodgy character.")); // true
```
```
let name = "dea+hl[]rd";
let escaped = name.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp = new RegExp("(^|\\s)" + escaped + "($|\\s)", "gi");
let text = "This dea+hl[]rd guy is super annoying.";
console.log(regexp.test(text)); // true
```
```
console.log("  word".search(/\S/)); // 2
console.log("    ".search(/\S/)); // -1
```
```
let pattern = /y/g;
pattern.lastIndex = 3;
let match = pattern.exec("xyzzy");
console.log(match.index); // 4
console.log(pattern.lastIndex); // 5
```
```
let global = /abc/g;
console.log(global.exec("xyz abc")); // ["abc"]
let sticky = /abc/y;
console.log(sticky.exec("xyz abc")); // null
```
```
let digit = /\d/g;
console.log(digit.exec("here it is: 1")); // → ["1"]
console.log(digit.exec("and now: 1")); // → null
```
```
console.log("Banana".match(/an/g)); // ["an", "an"]
```
```
let input = "A string with 3 numbers in it... 42 and 88.";
let matches = input.matchAll(/\d+/g);
for (let match of matches) {
  console.log("Found", match[0], "at", match.index);
}
// Found 3 at 14
// Found 42 at 33
// Found 88 at 40
```
```
function parseINI(string) {
  // Start with an object to hold the top-level fields
  let result = {};
  let section = result;
  for (let line of string.split(/\r?\n/)) {
    let match;
    if (match = line.match(/^(\w+)=(.*)$/)) {
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;|$)/.test(line)) {
      throw new Error("Line '" + line + "' is not valid.");
    }
  };
  return result;
}

console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}
```
```
console.log(/🍎{3}/.test("🍎🍎🍎")); // false
console.log(/<.>/.test("<🌹>")); // false
console.log(/<.>/u.test("<🌹>")); // true
```
```
console.log(/🍎{3}/u.test("🍎🍎🍎")); // true
```