```
class Student:
	pass

student1 = Student()
print(type(student1))
# Output: <class '__main__.Student'>
```
```
class Student:
	def __init__(self, name, grade):
		self.name = name # Attribute
		self.grade = grade # Attribute
	def get_grade(self): # Method
		return f"{self.name} is in grade {self.grade}."

student1 = Student("Madhav", 10)
print(student1.get_grade()) # Output: Madhav is in grade 10.
```
```
# Abstraction in Python
# Abstraction hides implementation details and shows only the relevant functionality to the user.

class Student:
	def __init__(self, name, grade, percentage):
		self.name = name
		self.grade = grade
		self.percentage = percentage

	def is_honors(self): # Abstracting the logic
		return self.percentage > 90 # Logic hidden

# Abstract method in use
student1 = Student("Madhav", 10, 98)
print(student1.is_honors()) # Output: True
```
```
# Encapsulation in Python: Restricting direct access to attributes & methods
# Encapsulation restricts access to certain attributes or methods to protect the data and enforce controlled access.

class Student:
	def __init__(self, name, grade, percentage):
		self.name = name
		self.grade = grade
		self.__percentage = percentage # Private attribute (hidden)
	def get_percentage(self): # Public method to access the private attribute
		return self.__percentage

student1 = Student("Madhav", 10, 98)
print(f"{student1.name}'s percentage is {student1.get_percentage()}%.")
print(student1.__percentage) # error
```
```
# Inheritance in Python: Reusing Parent’s prop & methods
# Inheritance (parent-child), allows one class (child) to reuse the properties and methods of another class (parent). This avoids duplication and helps in code reuse.

class Student:
	def __init__(self, name, grade, percentage):
		self.name = name
		self.grade = grade
		self.percentage = percentage
	def student_details(self): # method
		print(f'{self.name} is in {self.grade} grade with {self.percentage}%')

class GraduateStudent(Student): # GraduateStudent inherits from Student
	def __init__(self, name, grade, percentage, stream):
		super().__init__(name, grade, percentage) # Call parent class initializer
		self.stream = stream # New attribute specific to GraduateStudent
	def student_details(self):
		super().student_details()
		print(f"Stream: {self.stream}")

# Create a graduate student
grad_student = GraduateStudent("Vishakha", 12, 94, "PCM")
# Vishakha is in 12 grade with 94%
grad_student.student_details() # Stream: PCM
```
```
# Polymorphism in Python: Same method but different output
# Polymorphism allows methods in different classes to have the same name but behave differently depending on the object.

class GraduateStudent(Student):
	def student_details(self): # Same method as in parent class
	print(f"{self.name} is a graduate student from final year.")

# Polymorphism in action
student1 = Student("Madhav", 10, 98)
grad_student = GraduateStudent("Sudevi", 12, 99, "PCM")
student1.student_details()

# Output: Madhav is in 10 grade with 98%
grad_student.student_details()
# Output: Sudevi is a graduate student from final year.
```