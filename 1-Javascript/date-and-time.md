# Date and time
```
let now = new Date(); // Sun Jul 16 2023 17:32:36 GMT+0530 (India Standard Time)
let now = new Date(53 * 365 * 24 * 3600 * 1000);
let Jan01_1970 = new Date(0);
// Dates before 01.01.1970 have negative timestamps
let Dec31_1969 = new Date(-24 * 3600 * 1000);
let date = new Date("2017-01-26");
// new Date(year, month, date, hours, minutes, seconds, ms)`
// new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
// new Date(2011, 0, 1); // the same, hours etc are 0 by default
let date = new Date(2011, 0, 1, 2, 3, 4, 567); // 1.01.2011, 02:03:04.567
```
```
getFullYear() // Get the year (4 digits)
getMonth() // Get the month, **from 0 to 11**.
getDate() // Get the day of month, from 1 to 31
getHours() 
getMinutes()
getSeconds()
getMilliseconds()
getDay() // Get the day of week, from `0` (Sunday) to `6` (Saturday)
```
**All the methods above return the components relative to the local time zone.**

> There are also their UTC-counterparts, that return day, month, year and so on for the time zone UTC+0
```
getTime() // the timestamp for the date, milliseconds passed from the January 1st of 1970 UTC+0
getTimezoneOffset() // Returns the difference between UTC and the local time zone, in minutes:
```
## Setting date components
```
setFullYear(year, [month], [date])
setMonth(month, [date])
setDate(date)
setHours(hour, [min], [sec], [ms])
setMinutes(min, [sec], [ms])
setSeconds(sec, [ms])
setMilliseconds(ms)
setTime(milliseconds) // sets the whole date by milliseconds since 01.01.1970 UTC
```
> Every one of them except `setTime()` has a UTC-variant, for instance: `setUTCHours()`.

## Autocorrection
```
let date = new Date(2013, 0, 32); // 32 Jan 2013
alert(date); // ...is 1st Feb 2013!
```
Let's say we need to increase the date "28 Feb 2016" by 2 days. It may be "2 Mar" or "1 Mar" in case of a leap-year. We don't need to think about it. Just add 2 days. The `Date` object will do the rest:
```
let date = new Date(2016, 1, 28);
date.setDate(date.getDate() + 2);
alert( date ); // 1 Mar 2016
```
That feature is often used to get the date after the given period of time. For instance, let's get the date for "70 seconds after now":
```
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // shows the correct date
```
We can also set zero or even negative values. For example:
```
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // set day 1 of month
alert( date );

date.setDate(0); // min day is 1, so the last day of the previous month is assumed
alert( date ); // 31 Dec 2015
```
## Date to number, date diff
When a `Date` object is converted to number, it becomes the timestamp same as `date.getTime()`:
```js run
let date = new Date();
alert(+date); // the number of milliseconds, same as date.getTime()
```
## Date.parse from a string
The string format should be: `YYYY-MM-DDTHH:mm:ss.sssZ`, where:
```
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');
alert(ms); // 1327611110417  (timestamp)

let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );
alert(date);
```