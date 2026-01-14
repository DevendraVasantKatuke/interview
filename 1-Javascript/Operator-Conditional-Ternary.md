```
let score = 85;
let grade;

if (score >= 80) {
  grade = "A";
} else if (score > 70) {
  grade = "B";
} else if (score > 60) {
  grade = "C";
} else {
  grade = "D";
}
console.log("Your grade is " + grade);

// Using ternary operator. The code looks like this:

score >= 80
  ? (grade = "A")
  : score >= 70
  ? (grade = "B")
  : score >= 60
  ? (grade = "C")
  : (grade = "D");

console.log("Your grade is " + grade);
```