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