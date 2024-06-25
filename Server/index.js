import express from "express";      
import cors from 'cors'
import { loginRoute } from "./routes/loginRoutes.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoutes.js";
import { EmployeeRouter } from "./routes/EmployeeRoute.js";
import { CompanyRoute } from "./Routes/companyRoute.js"
import { ClientRoute } from "./Routes/ClientRoute.js";
import { ObraRoute } from "./Routes/ObraRoute.js";
import { ProjectRoute } from "./Routes/ProjectRoute.js";

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
// app.use(express.static('Public'))

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