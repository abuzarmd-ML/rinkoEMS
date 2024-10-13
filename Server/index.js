import express from "express";      
import cors from 'cors'
import { loginRoute } from "./routes/loginRoutes.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoutes.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import { CompanyRoute } from "./Routes/companyRoute.js"
import { ClientRoute } from "./Routes/ClientRoute.js";
import { ObraRoute } from "./Routes/ObraRoute.js";
import { ProjectRoute } from "./Routes/ProjectROute.js";
import { DropDownOptionsRouter } from "./Routes/DropdownOptionsRoute.js";
import { ObraEntradaRouter } from "./Routes/ObraEntradaRoute.js";
import { AttendanceRouter } from "./Routes/AttendanceRoutes.js";

const app = express() 


app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(loginRoute)
app.use(userRoute)
app.use(EmployeeRouter)
app.use(CompanyRoute)
app.use(ClientRoute)
app.use(ObraRoute)
app.use(ProjectRoute)
app.use(DropDownOptionsRouter)
app.use(ObraEntradaRouter)
app.use(AttendanceRouter);

app.listen(3000 , () =>{
    console.log("Server is running !!")
} )

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        Jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
}
app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id})
} )

// app.listen(3000, () => {
//     console.log("Server is running")
// })