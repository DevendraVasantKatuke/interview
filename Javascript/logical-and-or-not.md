### Logical OR ( || )
```
true || false; // true
false || false; // false
false || true; // true
false || true || false; // true
"" || "Ifeoma"; // 'Ifeoma'
undefined || null || 0; // 0
```
### Logical AND ( && )
```
false && true; // false
1 && 0 && 1; // 0
"" && null; // ''
undefined && true; // undefined
```
### Logical NOT ( ! )
```
!0; // returns true. 0 is falsy, and the inverse is truthy
!"Ifeoma"; // returns false. 'Ifeoma' is truthy, and the inverse is falsy
!!null; // returns false. null is falsy. The first bang operator returns true, and the second bang operator returns false
!undefined; // returns true. Since undefined is falsy, the inverse is truthy
```