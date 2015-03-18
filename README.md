# Assignment5 
# Using the Async Series and Parallel Modules

# Given student master records in one JSON file (students.json). Here, the Id and Email address of a student are unique  identifiers.
# There is a set of files which contain records for each subject, say sub_1.json, sub_2.json, sub_3.json, sub_4.json.
# This project is done in 2 steps 
# First, search for the specified student in the students.json first (based on the Email Id), to determine the Id of that student.
# Second, used that Id to search into the each of the subject files, to determine if this particular student is enrolled into any of those
# subjects (The reading of all 4 subject files is done in parallel).
# Return result list of subject for that student.
# 
# eg. for GET Method : 
#  input= "localhost:8000/students/nikhil@example.com"
#  output = Student enrolled for subjects :
#				Physics
#				Advanced Math Part 1
#				English
#
