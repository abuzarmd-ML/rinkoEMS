
import ManageUsers from "../Components/domain/ManageUsers"
import Client from "../Components/Client/Client"
import AddClient from "../Components/Client/AddClient"
import Company from "../Components/Company/Company"
import AddCompany from "../Components/Company/AddCompany"
import Project from "../Components/Project/Project"
import AddProject from "../Components/Project/AddProject"
import Employee from "../Components/Employee/Employee"
import AddEmployee from "../Components/Employee/AddEmployee"
import Obra from "../Components/Obra/Obra"
import AddObra from "../Components/Obra/AddObra"
import Attendance from '../Components/Attendance/Attendance'
import Dashboards from '../Components/Dashboard/Dashboard'

const AppRouter = {"1":[
    {
        id:1,
        name:'Manage Users',
        url:'/',
        path:'/',
        component: <ManageUsers />
    },
    {
        id:2,
        name:'Client',
        url:'/client',
        path:'/client',
        component: <Client />
    },
    {
        id:3,
        name:'Add Client',
        url:'/client/add',
        path:'/client',
        component: <AddClient  />
    },
    {
        id:4,
        name:'Get Client',
        url:'/client/add/:id',
        path:'/cleint',
        component: <AddClient  />
    },
    {
        id:5,
        name:'Compnay',
        url:'/company',
        path:'/company',
        component: <Company  />
    },
    {
        id:6,
        name:'Add Compny',
        url:'/company/add',
        path:'/compnay',
        component: <AddCompany  />
    },
    {
        id:7,
        name:'Get Compnay',
        url:'/company/add/:id',
        path:'/compnay',
        component: <AddCompany   />
    },
    {
        id:8,
        name:'Project',
        url:'/project',
        path:'/project',
        component: <Project  />
    },
    {
        id:9,
        name:'Add Project',
        url:'/project/add/',
        path:'/project',
        component: <AddProject  />
    },
    {
        id:10,
        name:'Get Project',
        url:'/project/add/:id',
        path:'/project',
        component: <AddProject  />
    },
    {
        id:11,
        name:'Employee',
        url:'/employee',
        path:'/employee',
        component: <Employee  />
    },
    {
        id:12,
        name:'Add Employee',
        url:'/employee/add',
        path:'/employee',
        component: <AddEmployee  />
    },
    {
        id:13,
        name:'Get Employee',
        url:'/employee/add/:id',
        path:'/employee',
        component: <AddProject  />
    },
    {
        id:14,
        name:'Obra',
        url:'/obra',
        path:'/obra',
        component: <Obra  />
    },

    {
        id:15,
        name:'Add Obra',
        url:'/obra/add/',
        path:'/obra',
        component: <AddObra />
    },

    {
        id:16,
        name:'Get Obra',
        url:'/obra/add/:id',
        path:'/obra',
        component: <AddObra  />
    },
    {
        id:17,
        name:'Attendance',
        url:'/attendance',
        path:'/attendance',
        component: <Attendance  />
    },
    {
        id:18,
        name:'dashboard',
        url:'/dashboard',
        path:'/dashboard',
        component: <Dashboards />
    },


],
"3":[
    {
        id:1,
        name:'Employee',
        url:'/employee',
        path:'/employee',
        component: <Employee  />
    },
    {
        id:2,
        name:'Add Employee',
        url:'/employee/add',
        path:'/employee',
        component: <AddEmployee  />
    },
    {
        id:3,
        name:'Get Employee',
        url:'/employee/add/:id',
        path:'/employee',
        component: <AddProject  />
    },
    {
        id:4,
        name:'Obra',
        url:'/obra',
        path:'/obra',
        component: <Obra  />
    },

    {
        id:5,
        name:'Add Obra',
        url:'/obra/add/',
        path:'/obra',
        component: <AddObra />
    },

    {
        id:6,
        name:'Get Obra',
        url:'/obra/add/:id',
        path:'/obra',
        component: <AddObra  />
    },
    {
        id:7,
        name:'Attendance',
        url:'/attendance',
        path:'/attendance',
        component: <Attendance  />
    },
]
}

export default AppRouter