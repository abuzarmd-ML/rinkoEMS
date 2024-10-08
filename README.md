## rinkoEMS

Employee Management System & Attendance System for one of the largest man power supplying company in Barcelona, Spain.

![rinko_instalaciones_internacionales_sl_logo](https://github.com/user-attachments/assets/f4c0d86f-7c4e-484c-8724-0e1f830c7c53)

## Tech Stack
**Frontend:** Material UI, Javascript, React JS

**Backend:** Node JS

**DataBase:** MySQL

## Database Structure:
Role Table (roles):
id: Unique identifier for each role (primary key).
name: Name of the role, e.g., "Admin", "Employee", etc.

`CREATE TABLE roles (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL);`

 insert the initial set of roles manually into the roles table during the setup or initialization phase of your application. These initial roles will serve as the predefined roles that users can select during the registration process.

 `INSERT INTO roles (name) VALUES ('Admin'), ('Employee');`

User Table (users):
id: Unique identifier for each user (primary key).
username: Username of the user.
email: Email address of the user.
password: Hashed password of the user.
role_id: Foreign key referencing the id column in the roles table, representing the role of the user.

`CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);`


TABLE companies:

`CREATE TABLE companies (
                    company_id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255),
                    address VARCHAR(255),
                    status VARCHAR(50),
                    encargar VARCHAR(250)
                    )`

TABLE employee:

`CREATE TABLE employee (
                    employee_id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255),
                    phone INT NOT NULL,
                    country VARCHAR(255),
                    dob DATE,
                    nie VARCHAR(255),
                    caducidad DATE,
                    social_security INT,
                    type VARCHAR(100),
                    status VARCHAR(50),
                    rate INT,
                    reference VARCHAR(255),
                    remarks VARCHAR(255),
                    bank_name VARCHAR(255),
                    iban VARCHAR(255),
                    company_id INT,
                    FOREIGN KEY (company_id) REFERENCES companies(company_id)
                    )`
