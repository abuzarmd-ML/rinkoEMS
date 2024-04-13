import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Home from './Components/Home'
import Employee from './Components/Employee/Employee'
import Category from './Components/Category'
import Profile from './Components/Profile'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import PrivateRoute from './Components/PrivateRoute'
import SignIn from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import Dashboards from './Components/Dashboard/Dashboard'
import ManageUsers from './Components/domain/ManageUsers'
import Obra from './Components/Obra/Obra'
import Clients from './Components/Clients/Clients'
import Attendance from './Components/Attendance/Attendance'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}></Route>
      <Route path='/login' element={<SignIn />}></Route>
      <Route path='/singup' element={<SignUp />}></Route>
      <Route path='/mamage-users' element={<ManageUsers />}></Route>
      <Route path='/adminlogin' element={<SignIn />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
      <Route path='/employee' element={<Employee />}></Route>
      <Route path='/obra' element={<Obra />}></Route>
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
