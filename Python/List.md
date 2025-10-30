```
# Range: range() returns an immutable sequence of numbers that can be easily converted to lists, tuples, sets etc.
# range(start, stop, step)
numbers = range(4)  
print(list(numbers))     
# [0, 1, 2, 3] 
```
# List
```
numbers = [10, 20, 30, 40, 50, 60]
print(numbers[1:4]) # Output: [20, 30, 40]
print(numbers[:3]) # Output: [10, 20, 30]
print(numbers[0::2]) # Output: [10, 30, 50]
print(numbers[-4:-1]) # Output: [30, 40, 50]
print(numbers[::-1]) # Output: [60,50,40,30,20,10]
```
```
list1 = [1, 2]
list2 = ["a", "b"]

list3 = list1 + list2 
print(list3) # Output: [1, 2, 'a', 'b']

for x in list2:
	list1.append(x)
print(list1) # Output: [1, 2, 'a', 'b']

list1.extend(list2)
print(list1) # Output: [1, 2, 'a', 'b']

list1 = [1, 3, 5])
lst1 = list1 * 3 
# lst1 => [1, 3, 5, 1, 3, 5, 1, 3, 5] 
```
```
# Stack
stack = ["Amar", "Akbar", "Anthony"]
stack.append("Ram")
stack.append("Iqbal")
print(stack)  # ['Amar', 'Akbar', 'Anthony', 'Ram', 'Iqbal']
# Removes the last item
stack.pop()
print(stack) # ['Amar', 'Akbar', 'Anthony', 'Ram']

# Queue
queue = ["Amar", "Akbar", "Anthony"]
queue.append("Ram")
queue.append("Iqbal")
print(queue)   # ['Amar', 'Akbar', 'Anthony', 'Ram', 'Iqbal']
queue.pop(0)
print(queue)   # ['Akbar', 'Anthony', 'Ram', 'Iqbal']
```
```
# Nested List
L = ['a', 'b', ['cc', 'dd', ['eee', 'fff']], 'g', 'h']  
print(L[2])  # ['cc', 'dd', ['eee', 'fff']]  
print(L[2][2]) # ['eee', 'fff']  
print(L[2][2][0]) # eee 
```
```
clear() 	Removes all elements from the list, resulting in an empty list.
count() 	Returns the number of occurrences of a specified element.
sort() 		Sorts the list in ascending order by default. You can also sort in descending order and specify custom sorting criteria.
reverse() 	Reverses the elements of the list in place.
copy() 		Returns a shallow copy of the list.

append() 	Adds a single element to the end of the list.
extend() 	Adds multiple elements (from another iterable) to the end of the list.
insert() 	Inserts an element at a specified position.
remove() 	Removes the first occurrence of a specified element.
pop() 		Removes and returns an element at a specified index. If no index is specified, it removes and returns the last element.
index() 	Returns the index of the first occurrence of a specified element.
```
```
squares = [x**2 for x in range(1, 6)]
print(squares) # Output: [1, 4, 9, 16, 25]

even_numbers = [x for x in range(1, 11) if x % 2 == 0]
print(even_numbers) # Output: [2, 4, 6, 8, 10]

fruits = ["apple", "banana", "cherry"]
uppercase_fruits = [fruit.upper() for fruit in fruits]
print(uppercase_fruits) # Output: ['APPLE', 'BANANA', 'CHERRY']

nested_list = [[1, 2], [3, 4], [5, 6]]
flattened = flatten_list(nested_list)
print(flattened)
# Output: [1, 2, 3, 4, 5, 6]
```
```
Tuple: A collection of items 'that is ordered', 'immutable/read-only' and 'allow duplicate values'.

tuplesingle = ("only")
mixed = (1, "hello", 3.14, True)
nested = (1, [2, 3], (4, 5, 6))
also_numbers = 1, 2, 3, 4, 5
new_tuple = tuple(("apple", "banana", "cherry"))

list_items = ["x", "y", "z"] # Creating a tuple from a list
tuple_items = tuple(list_items) # ('x', 'y', 'z’)
```
```
fruits = ("apple", "mango", "cherry")
for fruit in fruits:
	print(fruit)

colors = ("red", "green", "blue", "green")
print(colors.count("green")) # Output: 2

a = "Madhav"
b = 21
c = "Engineer"
person = a,b,c # Packing values into a tuple

name, age, profession = person # Unpacking a tuple
print(name) # Output: Madhav
print(age) # Output: 21
print(profession) # Output: Engineer
```
```
# Using Tuples as Keys in Dictionaries (tuples are hashable)
location_data = {
	(40.7128, -74.0060): "New York City",
	(34.0522, -118.2437): "Los Angeles"
}
print(location_data[(40.7128, -74.0060)]) # Output: New York City
```
```
# Sets
- Removing Duplicates: Easily eliminate duplicate entries from data.
- Membership Testing: Quickly check if an item exists in a collection.
- Set Operations: Perform mathematical operations like union, intersection, and difference.
- Data Analysis: Useful in scenarios requiring unique items, such as tags, categories, or unique identifiers

empty_set = set()
print(empty_set) # Output: set()

fruits = {'apple', 'banana', 'cherry'}
fruits.remove('banana')
print(fruits) # Output: {'apple', 'cherry'}
fruits.discard('orange') # No error even if 'orange' is not in the set
print(fruits) # Output: {'apple', 'cherry’}

squares = {x**2 for x in range(1, 6)}
print(squares) # Output: {1, 4, 9, 16, 25}

set_a = {1, 2, 3}
set_b = {3, 4, 5}
union_set = set_a.union(set_b)
print(union_set) # Output: {1, 2, 3, 4, 5}
Alternative Syntax: union_set = set_a | set_b

set_a = {1, 2, 3}
set_b = {2, 3, 4}
intersection_set = set_a.intersection(set_b)
print(intersection_set) # Output: {2, 3}
Alternative Syntax: intersection_set = set_a & set_b

set_a = {1, 2, 3, 4}
set_b = {3, 4, 5}
difference_set = set_a.difference(set_b)
print(difference_set) # Output: {1, 2}
Alternative Syntax: difference_set = set_a - set_b

set_a = {1, 2, 3}
set_b = {3, 4, 5}
sym_diff_set = set_a.symmetric_difference(set_b)
print(sym_diff_set) # Output: {1, 2, 4, 5}
Alternative Syntax: sym_diff_set = set_a ^ set_b
```
```
# Dictionary
- User Profiles in Web Applications: Store user details like name, email, etc.
- Product Inventory Management: Keep track of stock levels for products in an e-commerce system.
- API Responses: Parse JSON data returned from APIs (e.g., weather data).
- Grouping Data: Organize data into categories. 
Example: grouped = {"fruits": ["apple", "banana"], "veggies": ["carrot"]}
- Caching: Store computed results to reuse and improve performance. 
Example: cache = {"factorial_5": 120}
- Switch/Lookup Tables: Simulate switch-case for decision-making.
# Example: 	actions = {"start": start_fn, "stop": stop_fn}
			actions["start"]()

empty_dict = {}
cohort = {
	"course": "Python",
	"instructor": "Rishabh Mishra",
	"level": "Beginner"
}
print(cohort["course"]) # Output: Python

# Using dict() constructor
person = dict(name="Madhav", age=20, city="Mathura")

# Using a List of Tuples
student = dict([("name", "Madhav"), ("age", 20), ("grade", "A")])

del student["age"]

# nested dictionaries
students = {
	"student1": {
		"name": "Madhav",
		"age": 20,
		"grade": "A"
	},
	"student2": {
		"name": "Keshav",
		"age": 21,
		"grade": "B"
	}
}
print(students["student1"]["name"]) # Output: Madhav
```
```
# Example: Creating a dictionary with square numbers
squares = {x: x * x for x in range(1, 6)}
print(squares)
# Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
```
```
# Compare
dict1 = {'Name': 'Zara', 'Age': 7};  
dict2 = {'Name': 'Mahnaz', 'Age': 27}; 
dict3 = {'Name': 'Abid', 'Age': 27};  
dict4 = {'Name': 'Zara', 'Age': 7};  
print "Return Value : %d" % cmp (dict1, dict2) # -1
print "Return Value : %d" % cmp (dict2, dict3) # 1
print "Return Value : %d" % cmp (dict1, dict4) # 0
```
```
# clear()
dict = {'Name': 'Zara', 'Age': 7}; 
dict.clear() 
print "End Len : %d" %  len(dict) 
# End Len : 0
```
```
# copy
dict1 = {'Name': 'Zara', 'Age': 7}; 
dict2 = dict1.copy() 
print "New Dictionary : %s" % str(dict2)
# New Dictionary : {'Age': 7, 'Name': 'Zara'}

# fromkeys()
seq = ('name', 'age', 'sex') 
dict = dict.fromkeys(seq) 
print "New Dictionary : %s" %  str(dict)
# New Dictionary : {'age': None, 'name': None, 'sex': None} 

dict = dict.fromkeys(seq, 10)
print "New Dictionary : %s" %  str(dict) 
# New Dictionary : {'age': 10, 'name': 10, 'sex': 10} 
```
```
# get()
dict = {'Name': 'Zabra', 'Age': 7} 
print "Value : %s" % dict.get('Age') # Value : 7
print "Value : %s" % dict.get('Education', "Never")  # Value : Never
```
```
# items()
dict = {'Name': 'Zara', 'Age': 7} 
print "Value : %s" % dict.items() 
# Value : [('Age', 7), ('Name', 'Zara')]
```
```
# update()
dict = {'Name': 'Zara', 'Age': 7} 
dict2 = {'Sex': 'female' } 
dict.update(dict2) 
print "Value : %s" %  dict 
# Value : {'Age': 7, 'Name': 'Zara', 'Sex': 'female'} 
```
```
keys = ["One", "Two", "Three", "Four"] 
values = [1,2,3,4] 
yourdict = {k:v for k,v in zip(keys, values)} 
print(yourdict) # {'One': 1, 'Two': 2, 'Three': 3, 'Four': 4} 
```
```
keys = ["One", "Two", "Three", "Four"]
values = [1,2,3,4]
yourdict = dict(zip(keys, values))  
print(yourdict) # {'One': 1, 'Two': 2, 'Three': 3, 'Four': 4} 
```