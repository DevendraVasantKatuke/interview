```
The built-in Python procedures exit(), quit(), sys.exit(), and os. exit() are most frequently used to end a program.
```
```
# Python Nonlocal Variables: The ‘nonlocal’ keyword is used to work in scenarios where we have nested functions. Using the nonlocal keyword, we instruct the variable that it should not belong to the inner function.

def func1(): 
	a = 20 
	def func2(): 
		nonlocal a 
		print('func2 ', a) 
	func2() 
	print('func1 ', a) 

func1() 

# func2 20 
# func1 20
```
```
try:  
	result = 10/0 
	print(result) 
except: 
	print("Error: Denominator cannot be 0.") 
finally: 
	print("This is finally block.")
```
```
# module
# mymodule.py
def say_hello(name):
	return print(f"Hello, {name}!")

# Use the module:
import mymodule
greetings.say_hello("Madhav")
# Output: Hello, Madhav!
```
```
# Package is a collection of modules organized in directories (folders) with an __init__.py file.
# It allows you to structure your Python projects logically.

my_package/
	__init__.py
	math_utils.py
	string_utils.py

# Use the package:
from my_package import math_utils, string_utils
```
```
# A library is a collection of modules and packages
# Python has many popular libraries, such as Pandas, for data manipulation.
# pip install pandas
import pandas as pd
```