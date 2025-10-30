```
# declare a byte object 
b = bytes('pythön', encoding='utf-8') 

# convert a utf-8 byte object to ascii with errors ignored 
print(str(b, encoding='ascii', errors='ignore')) 
# pythn 

# convert a utf-8 byte object to ascii with strict error 
print(str(b, encoding='ascii', errors='strict')) 
# UnicodeDecodeError: 'ascii' codec can't decode byte 0xc3 in position 4: ordinal not in range(128)
```
```
# Reverse String
x = “good” [::-1] 
print(x) # doog
```
```
# slicing can be done in two ways: 

# 1. Using a slice(start, stop, step) method 
String = 'ASTRING'
s1 = slice(3) 				# AST
s2 = slice(1, 5, 2) 		# SR
s3 = slice(-1, -12, -2) 	# GITA

# 2. Using the array slicing [::] ([start:stop:step]) method
S = 'ABCDEFGHI’ 
print(S[2:7]) 		# CDEFG
print(S[-7:-2])  	# CDEFG
print(S[2:-5]) 		# CD
print(S[2:7:2])		# CEG
print(S[6:1:-2])	# GEC
print(S[:3])		# ABC
print(S[6:])		# GHI
```
```
L = ['red', 'green', 'blue’]  
x = ','.join(L)  
print(x) # red,green,blue
```
```
# join() on Dictionary 
L = {'name':'Bob', 'city':'seattle’}  
x = ','.join(L) print(x)  
# city,name

x = ','.join(L.values())  
print(x)  
# Seattle, Bob

x = ','.join('='.join((key,val)) 
for (key,val) in L.items())
print(x) 
# city=seattle,name=Bob
```
```
hindi_str=u “नमस्ते” 
Print(hindi_str) 
# नमस्ते

name = ‘Jack' 
country = 'UK' 
print(f'{name} is from {country}’) 
# Jack is from UK
```