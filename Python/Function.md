```
#  Default Arguments
def add_numbers( a = 7,  b = 8): 
	sum = a + b 
	print('Sum:', sum)

#  Variable-length Arguments or Arbitrary arguments
def myFun(*argv): 
	for arg in argv: 
		print(arg) 

myFun('Hello', 'Welcome', 'to', 'GeeksforGeeks')

# *kwargs for variable number of keyword arguments
def myFun(**kwargs): 
	for key, value in kwargs.items(): 
		print("%s == %s" % (key, value)) 

myFun(first='Geeks', mid='for', last='Geeks') 
# first == Geeks 
# mid == for 
# last == Geeks
```
```
# Direct Recursion
def factorial(n): 
	if n < 0 or n == 1: 
		return 1 
	else: 
		value = n*factorial(n-1) 
		return value 

factorial(5) 
# 120

# Indirect Recursion
def funA(n):
    if (n > 0):
        print("", n, end='')
        funB(n - 1)

def funB( n):  
    if (n > 1):  
        print("", n, end='')  
        funA(n // 2) # // is for floor division
           
# Driver code  
funA(20)  
```