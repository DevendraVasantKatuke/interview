```
What is Text File?  
• A text file is usually considered as sequence of lines.  
• Line is a sequence of characters (ASCII or UNICODE), stored on permanent storage media.  
• The default character coding in python is ASCII each line is terminated by a special character, known as End of Line (EOL).
• At the lowest level, text file will be collection of bytes.  
• Text files are stored in human readable form and they can also be created using any text editor.  

What is Binary File? 
• A binary file contains arbitrary binary data i.e. numbers stored in the file, can be used for numerical operation(s).
• So when we work on binary file, we have to interpret the raw bit pattern(s) read from the file into correct type of data in our program.
• In the case of binary file it is extremely important that we interpret the correct data type while reading the file.
• Python provides special module(s) for encoding and decoding of data for binary file. 
```
```
# file
# r: Read (default mode). Opens the file for reading. The pointer is at the beginning of the file. 
# r+ Opens the file for reading and writing. It will replace any prior data in the file. 
# rb Same as r mode, except this opens the file in binary mode.
# rb+ Same as r+ mode, except this, opens the file in binary mode.

# w: Write. Opens the file for writing (if file doesn’t exist, it creates one).
# w+ To write and read data, use w+. It will replace current data. 
# wb Same as w mode, except this opens the file in binary format. 
# wb+ Same as w+ except this opens the file in binary format. 

# a: Append. Opens the file for appending. The pointer is at the end of the file. If the file does not exist,it creates a new file for writing.
# a+ Opens the file for appending and reading. Existing data won’t be replaced by it. 
# ab Same as a mode, except this opens the file in binary format. 
# ab+ Same as a+ mode, except this, opens the file in binary format. 
```
```
# Reading the entire file
file = open('example.txt', 'r')
content = file.read()
print(content)
file.close()

# Reading one line at a time
file = open('example.txt', 'r')
line = file.readline()
print(line)
file.close()

# read first 20 characters in the file.
f = open("sample.txt", "r") 
data = f.read(20) 
print(data) 

#  Read the file in text mode
f = open("sample.txt", "rt") # note: rt
data = f.read() 
print(data) 

# Reading with 'with' statement In this case, you don’t need to call file.close(), because Python automatically closes the file
when the block is finished.
with open('example.txt', 'r') as file:
	content = file.read()
	print(content)

try:
	open('example.txt', 'r') as file:
	content = file.read()
	print(content)
finally:
	file.close()

# Writing to a file (overwrites existing content)
file = open('example.txt', 'w')
file.write("Hello, world!")
file.close()

# Appending to a file (add line to the end)
file = open('example.txt', 'a')
file.write("\nThis is an appended line.")
file.close()
```
```
# Working with Difft Format Files

# csv - Using csv module
import csv
file = open('file.csv', mode='r')
reader = csv.reader(file)

# csv - Using pandas library
import pandas as pd
df = pd.read_csv('file.csv')

# excel - Using pandas library
import pandas as pd
df = pd.read_excel('file.xlsx')

# PDF Using PyPDF2 library:
import PyPDF2
file = open('file.pdf', 'b')
pdf_reader = PyPDF2.PdfReader(file)
```