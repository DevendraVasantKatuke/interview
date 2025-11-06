- npm install redis
```
const redis = require("redis);
const client = redis.createClient();

client.on("error", function(error)) {
	console.log(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);
```