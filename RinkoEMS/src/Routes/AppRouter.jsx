
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
import ObraEntrada from '../Components/ObraEntrada/ObraEntrada'
import AddObraEntrada from '../Components/ObraEntrada/AddObraEntrada'
import MarkAttendance from "../Components/Attendance/MarkAttendance"


const AdminObject = [
    {
        id: 1,
        name: 'Manage Users',
        url: '/',
        path: '/',
        component: <ManageUsers />
    },
    {
        id: 2,
        name: 'Client',
        url: '/client',
        path: '/client',
        component: <Client />
    },
    {
        id: 3,
        name: 'Add Client',
        url: '/client/add',
        path: '/client',
        component: <AddClient />
    },
    {
        id: 4,
        name: 'Get Client',
        url: '/client/add/:id',
        path: '/cleint',
        component: <AddClient />
    },
    {
        id: 5,
        name: 'Compnay',
        url: '/company',
        path: '/company',
        component: <Company />
    },
    {
        id: 6,
        name: 'Add Compny',
        url: '/company/add',
        path: '/compnay',
        component: <AddCompany />
    },
    {
        id: 7,
        name: 'Get Compnay',
        url: '/company/add/:id',
        path: '/compnay',
        component: <AddCompany />
    },
    {
        id: 8,
        name: 'Project',
        url: '/project',
        path: '/project',
        component: <Project />
    },
    {
        id: 9,
        name: 'Add Project',
        url: '/project/add/',
        path: '/project',
        component: <AddProject />
    },
    {
        id: 10,
        name: 'Get Project',
        url: '/project/add/:id',
        path: '/project',
        component: <AddProject />
    },
    {
        id: 11,
        name: 'Employee',
        url: '/employee',
        path: '/employee',
        component: <Employee />
    },
    {
        id: 12,
        name: 'Add Employee',
        url: '/employee/add',
        path: '/employee',
        component: <AddEmployee />
    },
    {
        id: 13,
        name: 'Get Employee',
        url: '/employee/add/:id',
        path: '/employee',
        component: <AddEmployee />
    },
    {
        id: 14,
        name: 'Obra',
        url: '/obra',
        path: '/obra',
        component: <Obra />
    },

    {
        id: 15,
        name: 'Add Obra',
        url: '/obra/add/',
        path: '/obra',
        component: <AddObra />
    },

    {
        id: 16,
        name: 'Get Obra',
        url: '/obra/add/:id',
        path: '/obra',
        component: <AddObra />
    },
    {
        id: 17,
        name: 'Obra Entrada',
        url: '/obra_entrada',
        path: '/obra_entrada',
        component: <ObraEntrada />
    },

    {
        id: 18,
        name: 'Add Obra Entrada',
        url: '/obra_entrada/add/',
        path: '/obra_entrada',
        component: <AddObraEntrada />
    },
    {
        name:'Configurations',
        url:'/configurations',
        path:'/configurations',
        component: <AdminConfigurations />
    },

    {
        id: 19,
        name: 'Get Obra Entrada',
        url: '/obra_entrada/add/:id',
        path: '/obra_entrada',
        component: <AddObraEntrada />
    },
    {
        id: 20,
        name: 'Attendance',
        url: '/attendance',
        path: '/attendance',
        component: <Attendance />
    },
    {
        id: 21,
        name: 'dashboard',
        url: '/dashboard',
        path: '/dashboard',
        component: <Dashboards />
    },
    {
        id: 22,
        name: 'mark-attendance',
        url: '/mark-attendance/:emp_id',
        path: '/mark-attendance',
        component: <MarkAttendance />

    }
]

const userRoute = [
    {
        id: 1,
        name: 'Employee',
        url: '/employee',
        path: '/employee',
        component: <Employee />
    },
    {
        id: 2,
        name: 'Add Employee',
        url: '/employee/add',
        path: '/employee',
        component: <AddEmployee />
    },
    {
        id: 3,
        name: 'Get Employee',
        url: '/employee/add/:id',
        path: '/employee',
        component: <AddEmployee />
    },
    {
        id: 4,
        name: 'Obra',
        url: '/obra',
        path: '/obra',
        component: <Obra />
    },

    {
        id: 5,
        name: 'Add Obra',
        url: '/obra/add/',
        path: '/obra',
        component: <AddObra />
    },

    {
        id: 6,
        name: 'Get Obra',
        url: '/obra/add/:id',
        path: '/obra',
        component: <AddObra />
    },
    {
        id: 7,
        name: 'Attendance',
        url: '/attendance',
        path: '/attendance',
        component: <Attendance />
    },
]
const AppRouter = {
    "1": AdminObject,
    "2": AdminObject,
    "3": userRoute
}

export default AppRouter