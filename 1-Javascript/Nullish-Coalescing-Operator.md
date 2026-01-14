```
console.log(undefined ?? 44);   // 44
console.log(null ?? 44);        // 44

console.log("" ?? 44);          // ""
console.log(0 ?? 44);           // 0
console.log(false ?? 44);       // false
console.log(true ?? 44);        // true
```

```
let nullishValue = null
let emptyVal = ''
let num = 43
console.log(nullishValue ?? emptyVal) // logs '' because the left hand operand is null

console.log(emptyVal ?? num) // logs '' because the left hand operand is not null or undefined

// This operator can also be used to specify a default value for a variable
const logAgeToConsole = (age) => {
  age = age ?? 25
  console.log(age)
}

logAgeToConsole(21) // logs 21 to the console.
logAgeToConsole() // logs 25 to the console as a default value
```

```
export function AwesomeComponent({ numOfChildren }){
    let chilrenCount = numOfChildren ?? 'Not Specified'
        return (
           <p> { childrenCount } </p>
        )
    }

// Let's look at different scenarios and their corresponding output.
<AwesomeComponent numOfChildren = '' /> // childrenCount is set to ''
<AwesomeComponent numOfChildren = 5 /> // childrenCount would be 5
<AwesomeComponent /> // childrenCount would be set to 'Not Specified'
<AwesomeComponent numOfChildren = 0 /> //childrenCount would be 0
<AwesomeComponent numOfChildren = {false} /> // chilrenCount would be false
<AwesomeComponent numOfChildren = null /> // ChildrenCount would be set to 'Not Specified'
```

```
let result = null ?? "yes; 	// yes
```
