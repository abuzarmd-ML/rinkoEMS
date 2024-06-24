import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './Components/Home'
import Employee from './Components/Employee/Employee'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import SignIn from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Dashboards from './Components/Dashboard/Dashboard'
import ManageUsers from './Components/domain/ManageUsers'
import Obra from './Components/Obra/Obra'
import Client from './Components/Client/Client'
import AddClient from './Components/Client/AddClient'
import Attendance from './Components/Attendance/Attendance'
import AddEmployee from './Components/Employee/AddEmployee'
import AddObra from './Components/Obra/AddObra'
import Company from './Components/Company/Company'
import Project from './Components/Project/Project'
import AddProject from './Components/Project/AddProject'
import AddCompany from './Components/Company/AddCompany'
import RoutesPage from './Routes/Routes'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}></Route>
      <Route path='/login' element={<SignIn />}></Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/mamage-users' element={<ManageUsers />}></Route>
      <Route path='/adminlogin' element={<SignIn />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee' element={<Employee />}></Route>
      <Route path='/employee/add' element={<AddEmployee />}></Route>
      <Route path='/employee/add/:id' element={<AddEmployee />}></Route>

      <Route path='/project' element={<Project />}></Route>
      <Route path='/project/add' element={<AddProject />}></Route>
      <Route path='/prject/add/:id' element={<AddProject />}></Route>

      <Route path='/company' element={<Company />}></Route>
      <Route path='/company/add' element={<AddCompany />}></Route>
      <Route path='/company/add/:id' element={<AddCompany />}></Route>

      <Route path='/obra' element={<Obra />}></Route>
      <Route path='/obra/add' element={<AddObra />}></Route>
      <Route path='/obra/add/:id' element={<AddObra />}></Route>
    
    
      <Route path='/client' element={<Client />}></Route>
      <Route path='/client/add' element={<AddClient />}></Route>
      <Route path='/client/add/:id' element={<AddClient />}></Route>
      <Route path='/attendance' element={<Attendance />}></Route>
      <Route path='/dashboard' element={<Dashboards />}>
     
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>

      </Route>
    </Routes>
    </BrowserRouter>
  )
}



export default App
