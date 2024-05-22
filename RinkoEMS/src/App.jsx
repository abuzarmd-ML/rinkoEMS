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
import Clients from './Components/Clients/Clients'
import Attendance from './Components/Attendance/Attendance'
import AddEmployee from './Components/Employee/AddEmployee'
import AddObra from './Components/Obra/AddObra'
import Company from './Components/Company/Company'


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
      {/* <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route> */}
      <Route path='/employee' element={<Employee />}></Route>
      <Route path='/employee/add' element={<AddEmployee />}></Route>
      <Route path='/employee/add/:id' element={<AddEmployee />}></Route>
      <Route path='/obra' element={<Obra />}></Route>
      <Route path='/obra/add' element={<AddObra />}></Route>
      <Route path='/companies' element={<Company />}></Route>
      <Route path='/clients' element={<Clients />}></Route>
      <Route path='/attendance' element={<Attendance />}></Route>
      <Route path='/dashboard' element={<Dashboards />}>
     
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        {/* <Route path='/dashboard/employee' element={<Employee />}></Route> */}
        {/* <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile' element={<Profile />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route> */}
      </Route>
    </Routes>
    </BrowserRouter>
  )
}



export default App
