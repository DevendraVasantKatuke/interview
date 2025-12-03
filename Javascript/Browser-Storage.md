# IndexedDB
```
var db = null,
request = window.indexedDB.open("DemoDB", 2);

request.onsuccess = function() {
    db = request.result; // We have a database!
    doThingsWithDB(db);
};

request.onupgradeneeded = function(event) {
    db = request.result;
    if (event.oldVersion < 1) {
        var store = db.createObjectStore("things", { autoIncrement: true });
    }
    if (event.oldVersion < 2) {
        var store = request.transaction.objectStore("things");
        store.createIndex("by_name", "name");
    }
};

request.onerror = function() {
    console.error("Something went wrong");
};
```
### Adding objects
```
var transaction = db.transaction(["things"], "readwrite");
transaction.oncomplete = function() {
    console.log("All done!");
};
transaction.onerror = function() {
    console.log("Something went wrong with our transaction: ", transaction.error);
};
var store = transaction.objectStore("things");
var request = store.add({
    key: "coffee_cup",
    name: "Coffee Cup",
    contents: ["coffee", "cream"]
});
request.onsuccess = function(event) {
    // Done! Here, `request.result` will be the object's key, "coffee_cup"
};

var thingsToAdd = [{ name: "Example object" }, { value: "I don't have a name" }];
thingsToAdd.forEach(e => store.add(e));
```
```
var transaction = db.transaction(["things"]);
transaction.oncomplete = function() {
    console.log("All done!");
};
transaction.onerror = function() {
    console.log("Something went wrong: ", transaction.error);
};
var store = transaction.objectStore("things");
var request = store.get("coffee_cup");

request.onsuccess = function(event) {
    console.log(request.result);
};
db.transaction("things").objectStore("things")
    .get("coffee_cup").onsuccess = e => console.log(e.target.result);
```
```
if (window.indexedDB) {
    // IndexedDB is available
}
```