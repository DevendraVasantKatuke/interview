```
let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}

addEntry("a", "b");
addEntry(["work", "touched tree", "pizza", "running", "television"], false);

console.log (journal);

// [
//   { events: 'a', squirrel: 'b' },
//   {
//     events: [ 'work', 'touched tree', 'pizza', 'running', 'television' ],
//     squirrel: false
//   }
// ]
```