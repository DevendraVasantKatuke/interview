1. Given a string, reverse each word in the sentence
```
var string = "Welcome to this Javascript Guide!";

// Output becomes !ediuG tpircsavaJ siht ot emocleW
var reverseEntireSentence = reverseBySeparator(string, "");

// Output becomes emocleW ot siht tpircsavaJ !ediuG
var reverseEachWord = reverseBySeparator(reverseEntireSentence, " ");

function reverseBySeparator(string, separator) {
  return string.split(separator).reverse().join(separator);
}
```

2. How to empty an array in JavaScript?
> var arrayList =  ['a', 'b', 'c', 'd', 'e', 'f'];

> arrayList = [];

> arrayList.length = 0;

> arrayList.splice(0, arrayList.length);


3. How would you check if a number is an integer?
A very easy way to check if a number is a decimal or an integer is to check if there is a remainder when divided by 1.

4. Please explain what a callback function is and give a simple example.
```
function modifyArray(arr, callback) { 
 
 arr.push(100); 
 
 callback(); 
 } 
 var arr = [1, 2, 3, 4, 5];
 modifyArray(arr, function() { console.log("array has been modified", arr); });
```
A callback function is a function that is passed as an argument to another function and executed after an operation completes. Below is an example of a simple callback function that logs into the console after performing a few operations. 5. Given two strings, returns true if they are anagrams of each other

5. Given two strings, return true if they are anagrams of one another

An “anagram” of a “string” is another character string containing the same characters, only the order of the characters can be different. For example, “abcd” and “dabc” are anagrams of each other.
```
var firstWord = "Mary";
var secondWord = "Army";
isAnagram(firstWord, secondWord); // true 
function isAnagram(first, second) {
   // For case insensitivity, change both words to lowercase. 
   var a = first.toLowerCase();
   var b = second.toLowerCase();
   // Sort the strings, and join the resulting array to a string. Compare the results 
   a = a.split("").sort().join("");
   b = b.split("").sort().join("");
   return a === b;
}
```
6. What will be the output of the following code?
```
var y = 1;
if (function f() {}) {
  y += typeof f;
}
console.log(y);
```
The above code would output 1 undefined. If the conditional statement is evaluated with eval, then eval(function f() {}) returns function f() {}, which is true when the statement code is executed. typeoff returns undefined because when the statement code is executed at runtime, the statement inside the if condition is evaluated at runtime.

7. What will the following code output?
```
(function() {
  var a = b = 5;
})();
console.log(b);
```
The above code prints 5 even though it looks like the variable was declared inside a function and is not accessible outside of it. It’s because
> var a = b = 5;

is interpreted the following way:
> var a = b; b = 5;

8. What will the following code output?
```
for (var i = 0; i < 4; i++) {
  setTimeout(() => console.log(i), 0)
}
```
The classic pitfall here is the Zero delays. setTimeout(callback, 0) doesn’t mean that the callback will be fire after zero milliseconds.

Here’s what happen on the event loop side:

- Current Call Stack is set to the first setTimeout().
- windows.setTimeout() is considered as a Web APIs (for better Non-Blocking I/O). So the call stack sends this part of code to correct Web APIs. After 0 milliseconds, the callback (here an anonymous function) would be sent to the Queue (not to the call stack).
- As the call stack is free, for-loop can continue to the second setTimeout …(repeat after we meet this condition i < 4)…
- Now the loop is over and i === 4. JS can now execute the callback queue one by one. Each console.log(i) will print the 4.

9. Palindrome Problem

A palindrome is a word, phrase, or other type of string that can be read backwards or upside down. For example, “racecar” and “Anna” are palindromes. “Tisch” and “Juan” are not palindromes because they do not read the same from left to right and from right to left.
```
const palindrome = str => {
  // turn the string to lowercase
  str = str.toLowerCase()
  // reverse input string and return the result of the
  // comparisong
  return str === str.split('').reverse().join('')
}
```

10. Find the Vowels

This is probably one of the less challenging challenges (no pun intended) — in terms of difficulty — but that doesn’t detract from the fact that you could come across it during a job interview. It goes like this.
```
const findVowels = str => {
  let count = 0
  const vowels = ['a', 'e', 'i', 'o', 'u']
  for(let char of str.toLowerCase()) {
    if(vowels.includes(char)) {
      count++
    }
  }
  return count
}
```