# Employee_Vacation_Tracker
This reposatory describes the APIs that will be used to create and manage employee vacation leaves in a web application.
  ## Admin API:
    ###  The admin API will allow the following operations:
            •	Create a new employee with the following properties: 
                  o	Employee code (alphanumeric code)
                  o	First name
                  o	Last name
                  o	Joining date in the company
                  o	Date of birth
                  o	Gender
                  o	Marital status
                  o	Role
                  o	Mobile number
                  o	Status (active/inactive)
                  •	Get all employees
                  •	Get an employee by ID
                  •	Update an employee
                  •	Delete an employee
  ## Employee API:
     ### The employee API will allow the following operations:
            •	Create a new vacation leave with the following properties: 
                o	Start date and time
                o	End date and time
                o	Date and time (should be the day requesting the leave)
                o	Vacation type (annual leave, sick leave, unpaid leave, paternal leave, or maternity leave)
                •	Get all vacation leaves for the current employee
                •	Get a specific vacation leave by ID
                •	Update a vacation leave
                •	Delete a vacation leave
  ## Authentication:
      The APIs will be authenticated using OAuth 2.0 with two different user roles: employee and admin. Employees will be able to use their employee credentials to access their own vacation leaves, while admins will be able to access all vacation leaves.


## How to run the project?
    1- download source code from my reposatory
    2- open code with visual studio code
    3- open new terminal 
    4- write in the terminal ( npm i ) to install the nodemodules folder
    5- then write in the terminal ( node index.js ) to run the project
    6- download the Postman Collection from my reposatory here to test the APIs on Postman
    7- open Postman and upload the collections you have downloaded from here to test the APIs
