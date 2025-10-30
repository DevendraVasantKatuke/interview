```
import sqlite3  
connection = sqlite3.connect("aquarium.db") 
print(connection.total_changes)

cursor = connection.cursor() 
cursor.execute("CREATE TABLE fish (name TEXT, species TEXT, tank_number INTEGER)") 

rows = cursor.execute("SELECT name, species, tank_number FROM fish").fetchall()

cursor.close() 
```