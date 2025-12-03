#### Question 1. What is the output of the following code?
```javascript
var dwayne = {},
    daniel = { firstName: 'Daniel'},
    jason = {key: 'jason'};

dwayne[daniel]=123;
dwayne[jason]=456;

console.log(dwayne[daniel]); // 456
```
The reason for this is as follows:  

When setting an object property, JavaScript will
implicitly stringify the parameter value. In this case, since daniel and jason are both
objects, they will both be converted to **"[object Object]"** . As a result, dwayne[dani]
and dwayne[jason] are both equivalent to dwayne["[object Object]"] and can be used
interchangeably. Therefore, setting or referencing dwayne[jason] is precisely the same as
setting or referencing dwayne[daniel] .

dfgd  
fdgdfg.

#### Question 1
I am a `boy` of `gdfgdfg`
```javascript
var dwayne = {},
    daniel = { firstName: 'Daniel'},
    jason = {key: 'jason'
};

dwayne[daniel]=123;
dwayne[jason]=456;

console.log(dwayne[daniel]); // 456
```

> sdfsdf
> dfgdfg