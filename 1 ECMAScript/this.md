# "use strict" mode
```
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand");
console.log(name); // Ferdinand
// The call to Person succeeded, but returned an undefined value and created the global binding name
```
```
"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// ypeError: Cannot set properties of undefined (setting 'name')
```