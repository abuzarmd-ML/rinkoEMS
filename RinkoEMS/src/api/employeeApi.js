// src/api/employeeApi.js

export async function fetchEmployees() {
    const response = await fetch('http://localhost:3000/employees');
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    const data = await response.json();
    console.log("Dataaaaa: ",data)
    return data;
}
