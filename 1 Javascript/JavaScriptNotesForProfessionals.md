```
<p id="paragraph"></p>
document.getElementById("paragraph").textContent = "Hello, World";
```
```
<body>
    <h1>Adding an element</h1>
</body>
var element = document.createElement('p');
element.textContent = "Hello, World";
document.body.appendChild(element); //add the newly created element to the DOM
```
```
var canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 250;
var ctx = canvas.getContext('2d');
ctx.font = '30px Cursive';
ctx.fillText("Hello world!", 50, 50);
document.body.appendChild(canvas);
```
```
var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.width = 500;
svg.height = 50;
var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
text.setAttribute('x', '0');
text.setAttribute('y', '50');
text.style.fontFamily = 'Times New Roman';
text.style.fontSize = '50';
text.textContent = 'Hello world!';
svg.appendChild(text);
document.body.appendChild(svg);
```
```
var img = new Image();
img.src = 'https://i.ytimg.com/vi/zecueq-mo4M/maxresdefault.jpg';
document.body.appendChild(img);
```
##### JavaScript Variables
```
var myInteger = 12; // 32-bit number (from -2,147,483,648 to 2,147,483,647)
var myLong = 9310141419482; // 64-bit number (from -9,223,372,036,854,775,808 to
9,223,372,036,854,775,807)
var myFloat = 5.5; // 32-bit floating-point number (decimal)
var myDouble = 9310141419482.22; // 64-bit floating-point number
var myBoolean = true; // 1-bit true/false (0 or 1)
var myBoolean2 = false;
var myNotANumber = NaN;
var NaN_Example = 0/0; // NaN: Division by Zero is not possible
var notDefined; // undefined: we didn't define it to anything yet
window.alert(aRandomVariable); // undefined
var myNull = null; // null
// etc...
```
##### Built-in Constants. null
> null is used for representing the intentional absence of an object value and is a primitive value. 

Unlike undefined,
- it is not a property of the global object.
- It is equal to undefined but not identical to it.
- null == undefined; // true
- null === undefined; // false
- typeof null; // 'object';
```
var a = null;
a === null; // true
```
##### Testing for NaN using isNaN()
```
isNaN(NaN);         // true 
isNaN(1);           // false: 1 is a number
isNaN(-2e-4);       // false: -2e-4 is a number (-0.0002) in scientific notation
isNaN(Infinity);    // false: Infinity is a number
isNaN(true);        // false: converted to 1, which is a number
isNaN(false);       // false: converted to 0, which is a number
isNaN(null);        // false: converted to 0, which is a number
isNaN("");          // false: converted to 0, which is a number
isNaN(" ");         // false: converted to 0, which is a number
isNaN("45.3");      // false: string representing a number, converted to 45.3
isNaN("1.2e3");     // false: string representing a number, converted to 1.2e3
isNaN("Infinity");  // false: string representing a number, converted to Infinity
isNaN(new Date);    // false: Date object, converted to milliseconds since epoch
isNaN("10$");       // true : conversion fails, the dollar sign is not a digit
isNaN("hello");     // true : conversion fails, no digits at all
isNaN(undefined);   // true : converted to NaN
isNaN();            // true : converted to NaN (implicitly undefined)
isNaN(function(){});// true : conversion fails
isNaN({});          // true : conversion fails
isNaN([1, 2]);      // true : converted to "1, 2", which can't be converted to a number
```
> This last one is a bit tricky: checking if an Array is NaN. To do this, the Number() constructor ﬁrst converts the array to a string, then to a number; this is the reason why isNaN([]) and isNaN([34]) both return false, 
> but isNaN([1, 2]) and isNaN([true]) both return true: because they get converted to "", "34", "1,2" and "true" respectively. In general, an array is considered NaN by isNaN() unless it only holds one element whose string representation can be converted to a valid number. 
```
Number.isNaN()
```
> In ECMAScript 6, the `Number.isNaN()` function has been implemented primarily to avoid the problem of `window.isNaN()` of forcefully converting the parameter to a number. Number.isNaN(), indeed, doesn't try to convert the value to a number before testing. This also means that only values of the type number, that are also `NaN`, return true (which basically means only `Number.isNaN(NaN))`.

When the `Number.isNaN` is called with one argument number, the following steps are taken:
1. If Type(number) is not Number, return false.
2. If number is NaN, return true.
3. Otherwise, return false.
```
// The one and only
Number.isNaN(NaN);                  // true
// Numbers
Number.isNaN(1);                    // false
Number.isNaN(-2e-4);                // false
Number.isNaN(Infinity);             // false
// Values not of type number
Number.isNaN(true);                 // false
Number.isNaN(false);                // false
Number.isNaN(null);                 // false
Number.isNaN("");                   // false
Number.isNaN(" ");                  // false
Number.isNaN("45.3");               // false
Number.isNaN("1.2e3");              // false
Number.isNaN("Infinity");           // false
Number.isNaN(new Date);             // false
Number.isNaN("10$");                // false
Number.isNaN("hello");              // false
Number.isNaN(undefined);            // false
Number.isNaN();                     // false
Number.isNaN(function(){});         // false
Number.isNaN({});                   // false
Number.isNaN([]);                   // false
Number.isNaN([1]);                  // false
Number.isNaN([1, 2]);               // false
Number.isNaN([true]);               // false
```
##### NaN
NaN stands for "Not a Number." When a mathematical function or operation in JavaScript cannot return a speciﬁc number, it returns the value NaN instead. It is a property of the global object, and a reference to Number.NaN.
```
window.hasOwnProperty('NaN'); // true
NaN; // NaN
```
Perhaps confusingly, NaN is still considered a number.
```
typeof NaN; // 'number'
```
Don't check for NaN using the equality operator. See isNaN instead.
```
NaN == NaN // false
NaN === NaN // false
```
##### undeﬁned and null
- undefined is a global value that represents the absence of an assigned value.
- null is an object that indicates that a variable has been explicitly assigned "no value".
```
typeof undefined === 'undefined'
typeof null === 'object'
function foo() { return; } // returns undefined
```
```
console.log(window.undefined); // undefined
window.hasOwnProperty('undefined'); // true
```
Before ECMAScript 5 you could actually change the value of the window.undefined property to any other value potentially breaking everything.

##### Inﬁnity and -Inﬁnity
```
1 / 0; // Infinity. Number.POSITIVE_INFINITY
- (Infinity); // -Infinity Number.NEGATIVE_INFINITY.
```
```
Infinity > 123192310293;            // true
-Infinity < -123192310293;          // true
1 / 0;                              // Infinity
Math.pow(123123123, 9123192391023); // Infinity
Number.MAX_VALUE * 2;               // Infinity
23 / Infinity;                      // 0
-Infinity;                          // -Infinity
-Infinity === Number.NEGATIVE_INFINITY; // true
-0;                                 // -0 , yes there is a negative 0 in the language
0 === -0;                           // true
1 / -0;                             // -Infinity
1 / 0 === 1 / -0;                   // false
Infinity + Infinity;                // Infinity
var a = 0, b = -0;
a === b;                            // true
1 / a === 1 / b;                    // false
```
##### Number constants
```
Number.MAX_VALUE; // 1.7976931348623157e+308
Number.MAX_SAFE_INTEGER; // 9007199254740991
Number.MIN_VALUE; // // 5e-324
Number.MIN_SAFE_INTEGER; // // -9007199254740991
Number.EPSILON; // // 0.0000000000000002220446049250313
Number.POSITIVE_INFINITY; // Infinity
Number.NEGATIVE_INFINITY; // // -Infinity
Number.NaN; // // NaN
```
> Note that Number.EPSILON represents the diﬀerent between one and the smallest Number greater than one, and thus the smallest possible diﬀerence between two diﬀerent Number values. One reason to use this is due to the nature of how numbers are stored by JavaScript see Check the equality of two numbers

##### Operations that return NaN
Mathematical operations on values other than numbers return NaN.
```
"b" * 3
"cde" - "e"
[1, 2, 3] * 2
```
```
An exception: Single-number arrays.
[2] * [3]  // Returns 6
"a" + "b"  // Returns "ab"
```
```
0 / 0           // NaN
```
```
Math.floor("a") // NaN
Math.sqrt(-1)   // NaN
```
##### Console
- assert
- clear
- count
- debug
- dir
- dirxml
- error
- group
- groupCollapsed
- groupEnd
- info
- log
- markTimeline
- proﬁle
- proﬁleEnd
- table
- time
- timeEnd
- timeStamp
- timeline
- timelineEnd
- trace
- warn
```
##### Measuring time - console.time()
```
var elms = document.getElementsByTagName('*'); //select all elements on the page
console.time('Loop time');
for (var i = 0; i < 5000; i++) {
    for (var j = 0, length = elms.length; j < length; j++) {
        // nothing to do ...
    }
}
console.timeEnd('Loop time');
```
##### Formatting console output
```
console.log('%s has %d points', 'Sam', 100);
```
- `%s` Formats the value as a string
- `%i` or `%d` Formats the value as an integer
- `%f` Formats the value as a ﬂoating point value
- `%o` Formats the value as an expandable DOM element
- `%O` Formats the value as an expandable JavaScript object
- `%c` Applies CSS style rules to the output string as speciﬁed by the second parameter
```
```
console.log('%cHello world!', 'color: blue; font-size: xx-large');
```
##### Using groups to indent output
- `console.groupCollapsed()`: creates a collapsed group of entries that can be expanded through the disclosure button in order to reveal all the entries performed after this method is invoked;
- `console.group()`: creates an expanded group of entries that can be collapsed in order to hide the entries after this method is invoked.
- `console.groupEnd()`: exits the current group, allowing newer entries to be printed in the parent group after this method is invoked.

##### Including a stack trace when logging console.trace()
```
function foo() {
console.trace('My log statement');
}
foo();
```
```
var e = new Error('foo');
console.log(e.stack);
```
##### Tabulating values - console.table()
```
console.table(['Hello', 'world']);
console.table({foo: 'bar', bar: 'baz'});
var personArr = [{
        "personId": 123,
        "name": "Jhon",
        "city": "Melbourne",
        "phoneNo": "1234567890"
    }, {
        "personId": 124,
        "name": "Amelia",
        "city": "Sydney",
        "phoneNo": "1234567890"
    }];

console.table(personArr, ['name', 'personId']);
```
##### Datatypes in JavaScript
```
typeof {}               // "object"
typeof []               // "object"
typeof null             // "object"
typeof /aaa/            // "object"
typeof Error()          // "object"
typeof function(){}     // "function"
```
##### Finding an object's class
To ﬁnd whether an object was constructed by a certain constructor or one inheriting from it, you can use the instanceof command:
```
function sum(...arguments) {
    if (arguments.length === 1) {
        const [firstArg] = arguments
        if (firstArg instanceof Array) { //firstArg is something like [1, 2, 3]
            return sum(...firstArg) //calls sum(1, 2, 3)
        }
    }
    return arguments.reduce((a, b) => a + b)
}
console.log(sum(1, 2, 3))   //6
console.log(sum([1, 2, 3])) //6
console.log(sum(4))         //4
```
```
// Note that primitive values are not considered instances of any class:
console.log(2 instanceof Number)        //false
console.log('abc' instanceof String)    //false
console.log(true instanceof Boolean)    //false
console.log(Symbol() instanceof Symbol) //false
```
```
console.log([] instanceof Object, [] instanceof Array)  //true true
console.log([].constructor === Object, [].constructor === Array) //false true
function isNumber(value) {
    //null.constructor and undefined.constructor throw an error when accessed
    if (value === null || value === undefined) return false
    return value.constructor === Number
}
console.log(isNumber(null), isNumber(undefined))  //false false
console.log(isNumber('abc'), isNumber([]), isNumber(() => 1)) //false false false
console.log(isNumber(0), isNumber(Number('10.1')), isNumber(NaN)) //true true true
```
##### Getting object type by constructor name
```
Object.prototype.toString.call("String")        // "[object String]"
Object.prototype.toString.call(42)              // "[object Number]"
Object.prototype.toString.call(true)            // "[object Boolean]"
Object.prototype.toString.call(Object())        // "[object Object]"
// or
Object.prototype.toString.call({})              // "[object Object]"
Object.prototype.toString.call(function(){})    // "[object Function]"
Object.prototype.toString.call(new Date(2015,10,21)) // "[object Date]"
Object.prototype.toString.call(new RegExp())    // "[object RegExp]"
// or
Object.prototype.toString.call(/foo/);          // "[object RegExp]"
Object.prototype.toString.call([]);             // "[object Array]"
Object.prototype.toString.call(null);           // "[object Null]"
Object.prototype.toString.call(undefined);      // "[object Undeﬁned]"
Object.prototype.toString.call(Error());        // "[object Error]"
```
##### Strings
```
var intString = String(32); // "32"
var booleanString = String(true); // "true"
var nullString = String(null); // "null"
```
```
var intString = (5232).toString(); // "5232"
var booleanString = (false).toString(); // "false"
var objString = ({}).toString(); // "[object Object]"
```
```
String.fromCharCode(104,101,108,108,111) //"hello"
```
```
var objectString = new String("Yes, I am a String object");
typeof objectString;            //"object"
typeof objectString.valueOf();  //"string"
```
```
var foo = "Foo";
var bar = "Bar";
foo.concat(bar)
"a".concat("b", " ", "d")
```
```
var string = "string";
var number = 32;
var boolean = true;
console.log(string + number + boolean); // "string32true"
```
```
// You can use String.raw to get backslashes to be in the string without modification.
`a\\b` // = a\b
String.raw`a\\b` // = a\\b
```
##### Reverse String
```
function reverseString(str) {
    return str.split('').reverse().join('');
}
reverseString('string');
````
characters with combining marks (e.g. diaeresis) will appear on the logical "next" character instead of the original one it was combined with.
```
'?????.'.split('').reverse().join(''); //fails
```
```
function reverseString(str) {
    return [...String(str)].reverse().join('');
}
console.log(reverseString('stackoverflow'));    // "wolfrevokcats"
console.log(reverseString(1337));               // "7331"
console.log(reverseString([1, 2, 3]));          // "3,2,1"
```
```
function reverse(string) {
    var strRev = "";
    for (var i = string.length - 1; i >= 0; i--) {
        strRev += string[i];
    }
    return strRev;
}
reverse("zebra");
```
##### Comparing Strings Lexicographically
```
var a = "hello";
var b = "world";
console.log(a.localeCompare(b)); // -1
```
```
function strcmp(a, b) {
    if(a === b) {
        return 0;
    }
    if (a > b) {
        return 1;
    }
    return -1;
}
console.log(strcmp("hello", "world")); // -1
console.log(strcmp("hello", "hello")); // 0
console.log(strcmp("world", "hello")); // 1
```
```
var arr = ["bananas", "cranberries", "apples"];
arr.sort(function(a, b) {
    return a.localeCompare(b);
});
console.log(arr); // [ "apples", "bananas", "cranberries" ]
```
##### Access character at index in string
```
var string = "Hello, World!";
console.log( string.charAt(4) ); // "o"
console.log( string[4] ); // "o"
console.log( string.charCodeAt(4) ); // 111
```
##### Escaping quotes
```
var text = 'L\'albero means tree in Italian';
console.log( text ); \\ "L'albero means tree in Italian"
var text = "I feel \"high\"";
var content = "<p class=\"special\">Hello World!</p>";
var hello = '<p class="special">I\'d like to say "Hi"</p>'; // valid String
var hi = "<p class='special'>I'd like to say &quot;Hi&quot;</p>"; // valid String
var hello = '<p class="special">I&apos;d like to say "Hi"</p>'; // valid String
```
##### Word Counter
```
function wordCount( val ) {
    var wom = val.match(/\S+/g);
    return {
        charactersNoSpaces : val.replace(/\s+/g, '').length,
        characters: val.length,
        words: wom ? wom.length : 0,
        lines: val.split(/\r*\n/).length
    };
}
wordCount( someMultilineText ).words;
```
##### Splitting a string into an array
```
var s = "one, two, three, four, five"
s.split(", "); // ["one", "two", "three", "four", "five"]
s.split(", ").join("--");
```
##### Strings are unicode
```
var s = "some ∆≈ƒ unicode ¡™£¢¢¢";
s.charCodeAt(5); // 8710
```
##### Detecting a string
```
var isString = function(value) {
    return typeof value === "string" || value instanceof String;
};
```
```
var pString = "Primitive String";
var oString = new String("Object Form of String");
Object.prototype.toString.call(pString);//"[object String]"
Object.prototype.toString.call(oString);//"[object String]"
```
```
var aString = "Primitive String";
// Generic check for a substring method
if(aString.substring) {
}
// Explicit check for the String substring prototype method
if(aString.substring === String.prototype.substring) {
    aString.substring(0, );
}
```
##### Substrings with slice
```
var s = "0123456789abcdefg";
s.slice(0, 5);  // "01234"
s.slice(5, 6);  // "5"
s.slice(10);    // "abcdefg"
```
##### Character code
```
var charCode = "µ".charCodeAt(); // The character code of the letter µ is 181
var charCode = "ABCDE".charCodeAt(3); // The character code of "D" is 68
// The Grinning Face Emoji has code point 128512 or 0x1F600
var codePoint = "????".codePointAt();
```
##### String Representations of Numbers
```
// base 10 Number
var b10 = 12;
// base 16 String representation
var b16 = b10.toString(16); // "c"
var b16 = 'c';

// base 10 Number
var b10 = parseInt(b16, 16); // 12
let b16 = '3.243f3e0370cdc'; 
// Split into integer and fraction parts
let [i16, f16] = b16.split('.');
// Calculate base 10 integer part
let i10 = parseInt(i16, 16); // 3
// Calculate the base 10 fraction part
let f10 = parseInt(f16, 16) / Math.pow(16, f16.length); // 0.14158999999999988
// Put the base 10 parts together to find the Number
let b10 = i10 + f10; // 3.14159
```
> Be careful as small errors may be in the result due to diﬀerences in what is possible to be represented in diﬀerent bases. It may be desirable to perform some kind of rounding afterwards.

>  Very long representations of numbers may also result in errors due to the accuracy and maximum values of Numbers of the environment the conversions are happening in.

##### String Find and Replace Functions
```
var string = "Hello, World!";
console.log( string.indexOf("o") ); // 4
console.log( string.indexOf("foo") ); // -1
console.log( string.lastIndexOf("o") ); // 8
console.log( string.lastIndexOf("foo") ); // -1
console.log( string.includes("Hello") ); // true
console.log( string.includes("foo") );// false
```
```
var string = "Hello, World!";
string = string.replace( "Hello", "Bye" ); // "Bye, World!"
string = string.replace( /W.{3}d/g, "Universe" ); // "Bye, Universe!"
```
```
var string = "heLlo, woRlD!";
string = string.replace( /([a-zA-Z])([a-zA-Z]+)/g, function(match, g1, g2) {
    return g1.toUpperCase() + g2.toLowerCase();
});
console.log( string ); // "Hello, World!"
```
##### Find the index of a substring inside a string
```
'Hellow World'.indexOf('Wor');// 7
"harr dee harr dee harr".indexOf("dee", 10); // 14
'Hellow World'.indexOf('WOR'); // -1
```
##### String to Upper/Lower Case
```
// String.prototype.toUpperCase():
console.log('qwerty'.toUpperCase()); // 'QWERTY'
// String.prototype.toLowerCase()
console.log('QWERTY'.toLowerCase()); // 'qwerty'
```
##### Repeat a String
```
"abc".repeat(3); // Returns "abcabcabc"
"abc".repeat(0); // Returns ""
"abc".repeat(-1); // Throws a RangeError
```
```
var myString = "abc";
var n = 3;
new Array(n + 1).join(myString); // Returns "abcabcabc"
```
##### Date
- `value` The number of milliseconds since 1 January 1970 00:00:00.000 UTC (Unix epoch)
- `dateAsString` A date formatted as a string (see examples for more information)
- `year` The year value of the date. 
> Note that month must also be provided, or the value will be interpreted as a number of milliseconds.

> values between 0 and 99 have special meaning.
- `month` The month, in the range 0-11. Note that using values outside the speciﬁed range for this and the following parameters will not result in an error, but rather cause the resulting date to "roll over" to the next value.
- `day` Optional: The date, in the range 1-31.
- `hour` The hour, in the range 0-23.
- `minute` The minute, in the range 0-59.
- `second` The second, in the range 0-59.
- `millisecond` Optional: The millisecond, in the range 0-999.

##### Create a new Date object

Date() creates a Date instance containing the current time (up to milliseconds) and date.

Date(m) creates a Date instance containing the time and date corresponding to the Epoch time (1 January, 1970 UTC) plus m milliseconds. Example: new Date(749019369738) gives the date Sun, 26 Sep 1993 04:56:09
GMT.

with a string argument
Date(dateString) returns the Date object that results after parsing dateString with Date.parse.

with two or more integer arguments
Date(i1, i2, i3, i4, i5, i6) reads the arguments as year, month, day, hours, minutes, seconds,

milliseconds and instantiates the corresponding Dateobject. Note that the month is 0-indexed in JavaScript,
so 0 means January and 11 means December. Example: new Date(2017, 5, 1) gives June 1st, 2017.

Exploring dates
Note that these examples were generated on a browser in the Central Time Zone of the US, during Daylight Time,
as evidenced by the code. Where comparison with UTC was instructive, Date.prototype.toISOString() was used
GoalKicker.com – JavaScript® Notes for Professionals

47

to show the date and time in UTC (the Z in the formatted string denotes UTC).
// Creates a Date object with the current date and time from the
// user's browser
var now = new Date();
now.toString() === 'Mon Apr 11 2016 16:10:41 GMT-0500 (Central Daylight Time)'
// true
// well, at the time of this writing, anyway
// Creates a Date object at the Unix Epoch (i.e., '1970-01-01T00:00:00.000Z')
var epoch = new Date(0);
epoch.toISOString() === '1970-01-01T00:00:00.000Z' // true
// Creates a Date object with the date and time 2,012 milliseconds
// after the Unix Epoch (i.e., '1970-01-01T00:00:02.012Z').
var ms = new Date(2012);
date2012.toISOString() === '1970-01-01T00:00:02.012Z' // true
// Creates a Date object with the first day of February of the year 2012
// in the local timezone.
var one = new Date(2012, 1);
one.toString() === 'Wed Feb 01 2012 00:00:00 GMT-0600 (Central Standard Time)'
// true
// Creates a Date object with the first day of the year 2012 in the local
// timezone.
// (Months are zero-based)
var zero = new Date(2012, 0);
zero.toString() === 'Sun Jan 01 2012 00:00:00 GMT-0600 (Central Standard Time)'
// true
// Creates a Date object with the first day of the year 2012, in UTC.
var utc = new Date(Date.UTC(2012, 0));
utc.toString() === 'Sat Dec 31 2011 18:00:00 GMT-0600 (Central Standard Time)'
// true
utc.toISOString() === '2012-01-01T00:00:00.000Z'
// true
// Parses a string into a Date object (ISO 8601 format added in ECMAScript 5.1)
// Implementations should assumed UTC because of ISO 8601 format and Z designation
var iso = new Date('2012-01-01T00:00:00.000Z');
iso.toISOString() === '2012-01-01T00:00:00.000Z' // true
// Parses a string into a Date object (RFC in JavaScript 1.0)
var local = new Date('Sun, 01 Jan 2012 00:00:00 -0600');
local.toString() === 'Sun Jan 01 2012 00:00:00 GMT-0600 (Central Standard Time)'
// true
// Parses a string in no particular format, most of the time. Note that parsing
// logic in these cases is very implementation-dependent, and therefore can vary
// across browsers and versions.
var anything = new Date('11/12/2012');
anything.toString() === 'Mon Nov 12 2012 00:00:00 GMT-0600 (Central Standard Time)'
// true, in Chrome 49 64-bit on Windows 10 in the en-US locale. Other versions in
// other locales may get a different result.
// Rolls values outside of a specified range to the next value.
var rollover = new Date(2012, 12, 32, 25, 62, 62, 1023);
rollover.toString() === 'Sat Feb 02 2013 02:03:03 GMT-0600 (Central Standard Time)'
// true; note that the month rolled over to Feb; first the month rolled over to
// Jan based on the month 12 (11 being December), then again because of the day 32
// (January having 31 days).

GoalKicker.com – JavaScript® Notes for Professionals

48

// Special dates for years in the range 0-99
var special1 = new Date(12, 0);
special1.toString() === 'Mon Jan 01 1912 00:00:00 GMT-0600 (Central Standard Time)`
// true
// If you actually wanted to set the year to the year 12 CE, you'd need to use the
// setFullYear() method:
special1.setFullYear(12);
special1.toString() === 'Sun Jan 01
12 00:00:00 GMT-0600 (Central Standard Time)`
// true

Section 8.2: Convert to a string format
Convert to String
var date1 = new Date();
date1.toString();

Returns: "Fri Apr 15 2016 07:48:48 GMT-0400 (Eastern Daylight Time)"

Convert to Time String
var date1 = new Date();
date1.toTimeString();

Returns: "07:48:48 GMT-0400 (Eastern Daylight Time)"

Convert to Date String
var date1 = new Date();
date1.toDateString();

Returns: "Thu Apr 14 2016"

Convert to UTC String
var date1 = new Date();
date1.toUTCString();

Returns: "Fri, 15 Apr 2016 11:48:48 GMT"

Convert to ISO String
var date1 = new Date();
date1.toISOString();

Returns: "2016-04-14T23:49:08.596Z"

GoalKicker.com – JavaScript® Notes for Professionals

49

Convert to GMT String
var date1 = new Date();
date1.toGMTString();

Returns: "Thu, 14 Apr 2016 23:49:08 GMT"
This function has been marked as deprecated so some browsers may not support it in the future. It is suggested to
use toUTCString() instead.

Convert to Locale Date String
var date1 = new Date();
date1.toLocaleDateString();

Returns: "4/14/2016"
This function returns a locale sensitive date string based upon the user's location by default.
date1.toLocaleDateString([locales [, options]])

can be used to provide speciﬁc locales but is browser implementation speciﬁc. For example,
date1.toLocaleDateString(["zh", "en-US"]);

would attempt to print the string in the Chinese locale using United States English as a fallback. The options
parameter can be used to provide speciﬁc formatting. For example:
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
date1.toLocaleDateString([], options);

would result in
"Thursday, April 14, 2016".
See the MDN for more details.

Section 8.3: Creating a Date from UTC
By default, a Date object is created as local time. This is not always desirable, for example when communicating a
date between a server and a client that do not reside in the same timezone. In this scenario, one doesn't want to
worry about timezones at all until the date needs to be displayed in local time, if that is even required at all.
The problem
In this problem we want to communicate a speciﬁc date (day, month, year) with someone in a diﬀerent timezone.
The ﬁrst implementation naively uses local times, which results in wrong results. The second implementation uses
UTC dates to avoid timezones where they are not needed.
Naive approach with WRONG results
GoalKicker.com – JavaScript® Notes for Professionals

50

function formatDate(dayOfWeek, day, month, year) {
var daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
return daysOfWeek[dayOfWeek] + " " + months[month] + " " + day + " " + year;
}
//Foo lives in a country with timezone GMT + 1
var birthday = new Date(2000,0,1);
console.log("Foo was born on: " + formatDate(birthday.getDay(), birthday.getDate(),
birthday.getMonth(), birthday.getFullYear()));
sendToBar(birthday.getTime());

Sample output:
Foo was born on: Sat Jan 1 2000

//Meanwhile somewhere else...
//Bar lives in a country with timezone GMT - 1
var birthday = new Date(receiveFromFoo());
console.log("Foo was born on: " + formatDate(birthday.getDay(), birthday.getDate(),
birthday.getMonth(), birthday.getFullYear()));

Sample output:
Foo was born on: Fri Dec 31 1999

And thus, Bar would always believe Foo was born on the last day of 1999.
Correct approach
function formatDate(dayOfWeek, day, month, year) {
var daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
return daysOfWeek[dayOfWeek] + " " + months[month] + " " + day + " " + year;
}
//Foo lives in a country with timezone GMT + 1
var birthday = new Date(Date.UTC(2000,0,1));
console.log("Foo was born on: " + formatDate(birthday.getUTCDay(), birthday.getUTCDate(),
birthday.getUTCMonth(), birthday.getUTCFullYear()));
sendToBar(birthday.getTime());

Sample output:
Foo was born on: Sat Jan 1 2000

//Meanwhile somewhere else...
//Bar lives in a country with timezone GMT - 1
var birthday = new Date(receiveFromFoo());

GoalKicker.com – JavaScript® Notes for Professionals

51

console.log("Foo was born on: " + formatDate(birthday.getUTCDay(), birthday.getUTCDate(),
birthday.getUTCMonth(), birthday.getUTCFullYear()));

Sample output:
Foo was born on: Sat Jan 1 2000

Creating a Date from UTC
If one wants to create a Date object based on UTC or GMT, the Date.UTC(...) method can be used. It uses the
same arguments as the longest Date constructor. This method will return a number representing the time that has
passed since January 1, 1970, 00:00:00 UTC.
console.log(Date.UTC(2000,0,31,12));

Sample output:
949320000000

var utcDate = new Date(Date.UTC(2000,0,31,12));
console.log(utcDate);

Sample output:
Mon Jan 31 2000 13:00:00 GMT+0100 (West-Europa (standaardtijd))

Unsurprisingly, the diﬀerence between UTC time and local time is, in fact, the timezone oﬀset converted to
milliseconds.
var utcDate = new Date(Date.UTC(2000,0,31,12));
var localDate = new Date(2000,0,31,12);
console.log(localDate - utcDate === utcDate.getTimezoneOffset() * 60 * 1000);

Sample output: true
Changing a Date object
All Date object modiﬁers, such as setDate(...) and setFullYear(...) have an equivalent takes an argument in
UTC time rather than in local time.
var date = new Date();
date.setUTCFullYear(2000,0,31);
date.setUTCHours(12,0,0,0);
console.log(date);

Sample output:
GoalKicker.com – JavaScript® Notes for Professionals

52

Mon Jan 31 2000 13:00:00 GMT+0100 (West-Europa (standaardtijd))

The other UTC-speciﬁc modiﬁers are .setUTCMonth(), .setUTCDate() (for the day of the month),
.setUTCMinutes(), .setUTCSeconds() and .setUTCMilliseconds().

Avoiding ambiguity with getTime() and setTime()
Where the methods above are required to diﬀerentiate between ambiguity in dates, it is usually easier to
communicate a date as the amount of time that has passed since January 1, 1970, 00:00:00 UTC. This single number
represents a single point in time, and can be converted to local time whenever necessary.
var date = new Date(Date.UTC(2000,0,31,12));
var timestamp = date.getTime();
//Alternatively
var timestamp2 = Date.UTC(2000,0,31,12);
console.log(timestamp === timestamp2);

Sample output: true

//And when constructing a date from it elsewhere...
var otherDate = new Date(timestamp);
//Represented as a universal date
console.log(otherDate.toUTCString());
//Represented as a local date
console.log(otherDate);

Sample output:

Mon, 31 Jan 2000 12:00:00 GMT
Mon Jan 31 2000 13:00:00 GMT+0100 (West-Europa (standaardtijd))

/code>

Section 8.4: Formatting a JavaScript date
Formatting a JavaScript date in modern browsers
In modern browsers (*), Date.prototype.toLocaleDateString() allows you to deﬁne the formatting of a Date in a
convenient manner.
It requires the following format :
dateObj.toLocaleDateString([locales [, options]])

The locales parameter should be a string with a BCP 47 language tag, or an array of such strings.
The options parameter should be an object with some or all of the following properties:
localeMatcher : possible values are "lookup" and "best fit"; the default is "best fit"
timeZone : the only value implementations must recognize is "UTC"; the default is the runtime's default time
GoalKicker.com – JavaScript® Notes for Professionals

53

zone
hour12 :possible values are true and false; the default is locale dependent
formatMatcher : possible values are "basic" and "best fit"; the default is "best fit"
weekday : possible values are "narrow", "short" & "long"
era : possible values are "narrow", "short" & "long"
year : possible values are "numeric" & "2-digit"
month : possible values are "numeric", "2-digit", "narrow", "short" & "long"
day : possible values are "numeric" & "2-digit"
hour : possible values are "numeric" & "2-digit"
minute : possible values are "numeric" & "2-digit"
second : possible values are "numeric" & "2-digit"
timeZoneName : possible values are "short" & "long"

How to use
var today = new Date().toLocaleDateString('en-GB', {
day : 'numeric',
month : 'short',
year : 'numeric'
});

Output if executed on January 24

ʰ, 2036 :

'24 Jan 2036'

Going custom
If Date.prototype.toLocaleDateString() isn't ﬂexible enough to fulﬁll whatever need you may have, you might
want to consider creating a custom Date object that looks like this:
var DateObject = (function() {
var monthNames = [
"January", "February", "March",
"April", "May", "June", "July",
"August", "September", "October",
"November", "December"
];
var date = function(str) {
this.set(str);
};
date.prototype = {
set : function(str) {
var dateDef = str ? new Date(str) : new Date();
this.day = dateDef.getDate();
this.dayPadded = (this.day < 10) ? ("0" + this.day) : "" + this.day;
this.month = dateDef.getMonth() + 1;
this.monthPadded = (this.month < 10) ? ("0" + this.month) : "" + this.month;
this.monthName = monthNames[this.month - 1];
this.year = dateDef.getFullYear();
},
get : function(properties, separator) {
var separator = separator ? separator : '-'
ret = [];
for(var i in properties) {
ret.push(this[properties[i]]);
}
return ret.join(separator);

GoalKicker.com – JavaScript® Notes for Professionals

54

}
};
return date;
})();

If you included that code and executed new DateObject() on January 20 ʰ, 2019, it would produce an object with
the following properties:
day: 20
dayPadded: "20"
month: 1
monthPadded: "01"
monthName: "January"
year: 2019

To get a formatted string, you could do something like this:
new DateObject().get(['dayPadded', 'monthPadded', 'year']);

That would produce the following output:
20-01-2016

(*) According to the MDN, "modern browsers" means Chrome 24+, Firefox 29+, IE11, Edge12+, Opera 15+ & Safari
nightly build

Section 8.5: Get the number of milliseconds elapsed since 1
January 1970 00:00:00 UTC
The static method Date.now returns the number of milliseconds that have elapsed since 1 January 1970 00:00:00
UTC. To get the number of milliseconds that have elapsed since that time using an instance of a Date object, use its
getTime method.
// get milliseconds using static method now of Date
console.log(Date.now());
// get milliseconds using method getTime of Date instance
console.log((new Date()).getTime());

Section 8.6: Get the current time and date
Use new Date() to generate a new Date object containing the current date and time.
Note that Date() called without arguments is equivalent to new Date(Date.now()).
Once you have a date object, you can apply any of the several available methods to extract its properties (e.g.
getFullYear() to get the 4-digits year).

Below are some common date methods.
Get the current year
var year = (new Date()).getFullYear();
console.log(year);
// Sample output: 2016

GoalKicker.com – JavaScript® Notes for Professionals

55

Get the current month
var month = (new Date()).getMonth();
console.log(month);
// Sample output: 0

Please note that 0 = January. This is because months range from 0 to 11, so it is often desirable to add +1 to the
index.
Get the current day
var day = (new Date()).getDate();
console.log(day);
// Sample output: 31

Get the current hour
var hours = (new Date()).getHours();
console.log(hours);
// Sample output: 10

Get the current minutes
var minutes = (new Date()).getMinutes();
console.log(minutes);
// Sample output: 39

Get the current seconds
var seconds = (new Date()).getSeconds();
console.log(second);
// Sample output: 48

Get the current milliseconds
To get the milliseconds (ranging from 0 to 999) of an instance of a Date object, use its getMilliseconds method.
var milliseconds = (new Date()).getMilliseconds();
console.log(milliseconds);
// Output: milliseconds right now

Convert the current time and date to a human-readable string
var now = new Date();
// convert date to a string in UTC timezone format:
console.log(now.toUTCString());
// Output: Wed, 21 Jun 2017 09:13:01 GMT

The static method Date.now() returns the number of milliseconds that have elapsed since 1 January 1970 00:00:00
UTC. To get the number of milliseconds that have elapsed since that time using an instance of a Date object, use its
getTime method.
// get milliseconds using static method now of Date
console.log(Date.now());
// get milliseconds using method getTime of Date instance
console.log((new Date()).getTime());

Section 8.7: Increment a Date Object
To increment date objects in JavaScript, we can usually do this:
var checkoutDate = new Date();

// Thu Jul 21 2016 10:05:13 GMT-0400 (EDT)

checkoutDate.setDate( checkoutDate.getDate() + 1 );

GoalKicker.com – JavaScript® Notes for Professionals

56

console.log(checkoutDate); // Fri Jul 22 2016 10:05:13 GMT-0400 (EDT)

It is possible to use setDate to change the date to a day in the following month by using a value larger than the
number of days in the current month var checkoutDate = new Date();
// Thu Jul 21 2016 10:05:13 GMT-0400 (EDT)
checkoutDate.setDate( checkoutDate.getDate() + 12 );
console.log(checkoutDate); // Tue Aug 02 2016 10:05:13 GMT-0400 (EDT)

The same applies to other methods such as getHours(), getMonth(),etc.
Adding Work Days
If you wish to add work days (in this case I am assuming Monday - Friday) you can use the setDate function
although you need a little extra logic to account for the weekends (obviously this will not take account of national
holidays) function addWorkDays(startDate, days) {
// Get the day of the week as a number (0 = Sunday, 1 = Monday, .... 6 = Saturday)
var dow = startDate.getDay();
var daysToAdd = days;
// If the current day is Sunday add one day
if (dow == 0)
daysToAdd++;
// If the start date plus the additional days falls on or after the closest Saturday calculate
weekends
if (dow + daysToAdd >= 6) {
//Subtract days in current working week from work days
var remainingWorkDays = daysToAdd - (5 - dow);
//Add current working week's weekend
daysToAdd += 2;
if (remainingWorkDays > 5) {
//Add two days for each working week by calculating how many weeks are included
daysToAdd += 2 * Math.floor(remainingWorkDays / 5);
//Exclude final weekend if remainingWorkDays resolves to an exact number of weeks
if (remainingWorkDays % 5 == 0)
daysToAdd -= 2;
}
}
startDate.setDate(startDate.getDate() + daysToAdd);
return startDate;
}

Section 8.8: Convert to JSON
var date1 = new Date();
date1.toJSON();

Returns: "2016-04-14T23:49:08.596Z"

Chapter 9: Date Comparison
Section 9.1: Comparing Date values
To check the equality of Date values:
var date1 = new Date();
var date2 = new Date(date1.valueOf() + 10);
console.log(date1.valueOf() === date2.valueOf());

Sample output: false
Note that you must use valueOf() or getTime() to compare the values of Date objects because the equality
operator will compare if two object references are the same. For example:
var date1 = new Date();
var date2 = new Date();
console.log(date1 === date2);

Sample output: false
Whereas if the variables point to the same object:
var date1 = new Date();
var date2 = date1;
console.log(date1 === date2);

Sample output: true
However, the other comparison operators will work as usual and you can use < and > to compare that one date is
earlier or later than the other. For example:
var date1 = new Date();
var date2 = new Date(date1.valueOf() + 10);
console.log(date1 < date2);

Sample output: true
It works even if the operator includes equality:
var date1 = new Date();
var date2 = new Date(date1.valueOf());
console.log(date1 <= date2);

Sample output: true

GoalKicker.com – JavaScript® Notes for Professionals

58

Section 9.2: Date Dierence Calculation
To compare the diﬀerence of two dates, we can do the comparison based on the timestamp.
var date1 = new Date();
var date2 = new Date(date1.valueOf() + 5000);
var dateDiff = date1.valueOf() - date2.valueOf();
var dateDiffInYears = dateDiff/1000/60/60/24/365; //convert milliseconds into years
console.log("Date difference in years : " + dateDiffInYears);
