### Console
```
$ psql #logs in to default database & default user
$ sudo -u <rolename:postgres> psql #logs in with a particular user

// Replace anything within <placeholder> accordingly
```

### Commands
```
Show roles: \du
Show tables: \dt
Show databases: \l
Connect to a database: \c <database>
Show columns of a table: \d <table> or \d+ <table>
Quit: \q
```
### Creating database
```
$ createdb databasename
```

## SQL joins cheatsheet

```
SELECT * FROM order_items \
  LEFT OUTER JOIN orders \
  ON order_items.order_id = orders.id
Joins are typically added to SELECT statements to add more columns and records.
```

### Diagram
```
SELECT * FROM `A` INNER JOIN `B`
┌────────┐
│ A  ┌───┼────┐
│    │ ∩ │    │
└────┼───┘  B │
     └────────┘
Inner join			∩
Left outer join		A + ∩
Right outer join	∩ + B
Full outer join		A + ∩ + B
```

## JSON

### Accessors
```
SELECT * FROM users WHERE data->>'name' = 'John';
SELECT data->>'name' AS name FROM users;
```
|operator 	|Description	|Example 	|Returns 	|
|-			|-				|-			|-			|
|-> int 	|Get array element 2 |data->2 |JSON|
|-> text	|Get object key name|data->'name'|	JSON|
|#> text[]	|Get keypath a,b (eg, data.a.b)	|data#>'{a,b}'|	JSON|
|->> int	|Get array element 2|	data->>2|	Text|
|->> text	|Get object key name|	data->>'name'|	Text|
|#>> text[]	|Get keypath a,b (eg, data.a.b)|	data#>>'{a,b}'|	Text|

// > returns JSON, >> returns text.

### Boolean operators
```
SELECT * FROM users WHERE data->tags ? 'admin';
SELECT data->tags ? 'admin' AS is_admin FROM users;
```
|Operator|	Description|	Example|
|-|-|-|
|? str|	Does data have key name?|	data ? 'name'|
|?| text[]|	Does data have a or b?|	data ?| array['a','b']|
|?& text[]|	Does data have a and b?|	data ?& array['a','b']
|@> jsonb|	Does left include right?|	data @> '{"b":2}'::jsonb|
|<@ jsonb|	Does right include left?|	data <@ '{"a":1,"b":2}'::jsonb|

// When ?/?|/?& works on objects, it checks keys; when it works on arrays, it checks for elements.

## Updating

### Arrays and objects
```
UPDATE users SET tags = tags || array['admin'];
```
|Operator|Example|Description|
|-|-|-|
|\|\| json|	data \|\| array['a','b']|	Concatenate|
|- str|	data - 'a'|	Delete a key|
|- int|	data - 1|	Delete an array item|
|#- text[]|	data #- '{us,name}'|	Delete a path|

// Only available in PostgreSQL 9.5+.

### jsonb_set
```
UPDATE users SET data = jsonb_set(data, '{name}', '"John"');
```

### Functions
```
fn(json) → json
jsonb_set(data, '{path}', value)
jsonb_strip_nulls(data)
fn(···) → json
to_json("Hello"::text)
array_to_json('{1,2}'::int[])
```

### Iteration
```
SELECT * from json_each('{"a":1, "b":2}')
SELECT * from json_each_text('{"a":1, "b":2}')
-- key | value
```

### More examples
```
'{"a":1}'::jsonb ? 'a'
'["a"]'::jsonb ? 'a'
```

## Knex

### Connect
```
require('knex')({
  client: 'pg',
  connection: 'postgres://user:pass@localhost:5432/dbname'
})
```

### Create table
```
knex.schema.createTable('user', (table) => {
  table.increments('id')
  table.string('name')
  table.integer('age')
})
.then(() => ···)
```

### Select
```
knex('users')
  .where({ email: 'hi@example.com' })
  .then(rows => ···)
```

### Insert
```
knex('users')
  .insert({ email: 'hi@example.com' })
```

### Update
```
knex('users')
  .where({ id: 135 })
  .update({ email: 'hi@example.com' })
```

### Migrations
```
knex init
knex migrate:make migration_name
knex migrate:make migration_name -x ts # Generates a TypeScript migration file
knex migrate:latest
knex migrate:rollback
```

### Seeds
```
knex seed:make seed_name
knex seed:make seed_name -x ts # Generates a TypeScript seed file
knex seed:run # Runs all seed files
knex seed:run --specific=seed-filename.js # Runs a specific seed file
```

## Connect

### Libraries
```
pg			PostgreSQL
mysql		MySQL or MariaDB
sqlite3		Sqlite3
mssql		MSSQL
```

### Connect via host
```
var knex = require('knex')({
	client: 'mysql',
  	connection: {
    	host: '127.0.0.1',
    	user: 'your_database_user',
    	password: 'your_database_password',
    	database: 'myapp_test'
  	},
  	pool: { min: 0, max: 7 }
})
```

### Connect via URL
```
var pg = require('knex')({
	client: 'pg',
  	connection: process.env.DATABASE_URL,
 	searchPath: 'knex,public',
  	pool: { min: 0, max: 7 }
})
```

### Connect via Sqlite
```
var knex = require('knex')({
	client: 'sqlite3',
	connection: { filename: './mydb.sqlite' }
})
```

## Select

### Where
```
knex
  .from('books')
  .select('title', 'author', 'year')

// Where
  .where('title', 'Hello')
  .where({ title: 'Hello' })
  .whereIn('id', [1, 2, 3])
  .whereNot(···)
  .whereNotIn('id', [1, 2, 3])

// Where conditions
  .whereNull('updated_at')
  .whereNotNull(···)
  .whereExists('updated_at')
  .whereNotExists(···)
  .whereBetween('votes', [1, 100])
  .whereNotBetween(···)
  .whereRaw('id = ?', [1])

// Where grouping
  .where(function () {
		this
      		.where('id', 1)
      		.orWhere('id', '>', 10)
  	})
```

### Join
```
knex('users')

// Basic join
  .join('contacts', 'users.id', '=', 'contacts.id')
  .join('contacts', {'users.id': 'contacts.id'})

// Strings
  .join('accounts', 'accounts.type', '=', knex.raw('?', ['admin']))

// Directions
  .leftJoin(···)
  .leftOuterJoin(···)
  .rightJoin(···)
  .rightOuterJoin(···)
  .outerJoin(···)
  .fullOuterJoin(···)
  .crossJoin(···)

// Raw
  .joinRaw('natural full join table1')

// Grouping
  .join('accounts', function () {
    this
      .on('accounts.id', '=', 'users.account_id')
      .orOn('accounts.owner_id', '=', 'users.id')

      .onIn('accounts.id', [1, 2, 3, 5, 8])
      .onNotIn(···)

      .onNull('accounts.email')
      .onNotNull(···)

      .onExists(function () {
        this.select(···)
      })
      .onNotExists(···)
  })
```

### Others
```
knex('users')
  .distinct()

// Group
  .groupBy('count')
  .groupByRaw('year WITH ROLLUP')

// Order
  .orderBy('name', 'desc')
  .orderByRaw('name DESC')

// Offset/limit
  .offset(10)
  .limit(20)

// Having
  .having('count', '>', 100)
  .havingIn('count', [1, 100])

// Union
  .union(function() {
    this.select(···)
  })
  .unionAll(···)
```

### Etc
```
knex('users')
  .pluck('id')
  .then(ids => { ··· })

knex('users')
  .first()
  .then(user => { ··· })

// Booleans
  .count('active')
  .count('active as is_active')

// Numbers
  .min('age')
  .max('age')
  .sum('age')
  .sumDistinct('age')
  .avg('age')
```

## Schema

### Create table
```
knex.schema.createTable('accounts', table => {

// Columns
  table.increments('id')
  table.string('account_name')
  table.integer('age')
  table.float('age')
  table.decimal('balance', 8, 2)
  table.boolean('is_admin')
  table.date('birthday')
  table.time('created_at')
  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.json('profile')
  table.jsonb('profile')
  table.uuid('id').primary()

// Constraints
  table.unique('email')
  table.unique(['email', 'company_id'])
  table.dropUnique(···)

// Indices
  table.foreign('company_id')
    .references('companies.id')
  table.dropForeign(···)

// Variations
  table.integer('user_id')
    .unsigned()
    .references('users.id')
})
.then(() => ···)
```

### Alter table
```
knex.schema.table('accounts', table => {

// Create
  table.string('first_name')

// Alter
  table.string('first_name').alter()
  table.renameColumn('admin', 'is_admin')

// Drop
  table.dropColumn('admin')
  table.dropTimestamps('created_at')

})
```

### Other methods
```
knex.schema
  .renameTable('persons', 'people')
  .dropTable('persons')
  .hasTable('users').then(exists => ···)
  .hasColumn('users', 'id').then(exists => ···)
```

## Modifying

### Insert
```
knex('users')

// Insert one
  .insert({ name: 'John' })

// Insert many
  .insert([
    { name: 'Starsky' },
    { name: 'Hutch' }
  ])
```

### Update
```
knex('users')
  .where({ id: 2 })
  .update({ name: 'Homer' })
```

### Delete
```
knex('users')
  .where({ id: 2 })
  .del()
```

## Migrations

### Setting up
```
// Create knexfile.js
./node_modules/.bin/knex init

// Create a migration
knex migrate:make migration_name
knex migrate:make migration_name --env production

// Run migrations
knex migrate:latest
knex migrate:latest --env production

// Rollback
knex migrate:rollback
knex migrate:rollback --env production
```