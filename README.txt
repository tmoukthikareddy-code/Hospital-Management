CAREPOINT HOSPITAL MANAGEMENT SYSTEM

Requirements: Node.js and MySQL.

1. Open this project folder in VS Code.
2. Open MySQL and run database.sql (copy its SQL into MySQL Workbench or mysql terminal).
3. In server.js, change password: "tejaswi" to your MySQL root password if different.
4. In terminal inside this folder run:
   npm install
   npm start
5. Open http://localhost:3000

Features: add, list, search, update and delete patients. Fields: Patient ID, Name, Email, Phone No, Gender, Age, Problem.

If you use mysql terminal:
   mysql -u root -p < database.sql
Enter your MySQL password when prompted.
