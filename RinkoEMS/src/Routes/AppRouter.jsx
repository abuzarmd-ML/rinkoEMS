
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
import AdminConfigurations from "../Components/AdminConfigurations/AdminConfigurations"

const AppRouter = {"admin":[
    {
        name:'Manage Users',
        url:'/',
        path:'/',
        component: <ManageUsers />
    },
    {
        name:'Client',
        url:'/client',
        path:'/client',
        component: <Client />
    },
    {
        name:'Add Client',
        url:'/client/add',
        path:'/client',
        component: <AddClient  />
    },
    {
        name:'Get Client',
        url:'/client/add/:id',
        path:'/cleint',
        component: <AddClient  />
    },
    {
        name:'Compnay',
        url:'/company',
        path:'/company',
        component: <Company  />
    },
    {
        name:'Add Compny',
        url:'/company/add',
        path:'/compnay',
        component: <AddCompany  />
    },
    {
        name:'Get Compnay',
        url:'/company/add/:id',
        path:'/compnay',
        component: <AddCompany   />
    },
    {
        name:'Project',
        url:'/project',
        path:'/project',
        component: <Project  />
    },
    {
        name:'Add Project',
        url:'/project/add/',
        path:'/project',
        component: <AddProject  />
    },
    {
        name:'Get Project',
        url:'/project/add/:id',
        path:'/project',
        component: <AddProject  />
    },
    {
        name:'Employee',
        url:'/employee',
        path:'/employee',
        component: <Employee  />
    },
    {
        name:'Add Employee',
        url:'/employee/add',
        path:'/employee',
        component: <AddEmployee  />
    },
    {
        name:'Get Employee',
        url:'/employee/add/:id',
        path:'/employee',
        component: <AddEmployee  />
    },
    {
        name:'Obra',
        url:'/obra',
        path:'/obra',
        component: <Obra  />
    },

    {
        name:'Add Obra',
        url:'/obra/add/',
        path:'/obra',
        component: <AddObra />
    },

    {
        name:'Get Obra',
        url:'/obra/add/:id',
        path:'/obra',
        component: <AddObra  />
    },
    {
        name:'Attendance',
        url:'/attendance',
        path:'/attendance',
        component: <Attendance  />
    },
    {
        name:'dashboard',
        url:'/dashboard',
        path:'/dashboard',
        component: <Dashboards />
    },
    {
        name:'Configurations',
        url:'/configurations',
        path:'/configurations',
        component: <AdminConfigurations />
    },


],
"user":[
    {
        name:'Employee',
        url:'/employee',
        path:'/employee',
        component: <Employee  />
    },
    {
        name:'Add Employee',
        url:'/employee/add',
        path:'/employee',
        component: <AddEmployee  />
    },
    {
        name:'Get Employee',
        url:'/employee/add/:id',
        path:'/employee',
        component: <AddProject  />
    },
    {
        name:'Obra',
        url:'/obra',
        path:'/obra',
        component: <Obra  />
    },

    {
        name:'Add Obra',
        url:'/obra/add/',
        path:'/obra',
        component: <AddObra />
    },

    {
        name:'Get Obra',
        url:'/obra/add/:id',
        path:'/obra',
        component: <AddObra  />
    },
    {
        name:'Attendance',
        url:'/attendance',
        path:'/attendance',
        component: <Attendance  />
    },
]
}

export default AppRouter