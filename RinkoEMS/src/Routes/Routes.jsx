
import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Employee from '../Components/Employee/Employee'
import EmployeeLogin from '../Components/EmployeeLogin'
import SignIn from '../Components/Login/Login'
import SignUp from '../Components/SignUp/SignUp'
import Dashboards from '../Components/Dashboard/Dashboard'
import ManageUsers from '../Components/domain/ManageUsers'
import Obra from '../Components/Obra/Obra'
import Client from '../Components/Client/Client'
import AddClient from '../Components/Client/AddClient'
import Attendance from '../Components/Attendance/Attendance'
import AddEmployee from '../Components/Employee/AddEmployee'
import AddObra from '../Components/Obra/AddObra'
import Company from '../Components/Company/Company'
import AddCompany from '../Components/Company/AddCompany'
import ProtectedRoute from './ProtectedRoute'
import Project from '../Components/Project/Project'
import AddProject from '../Components/Project/AddProject'
import ObraEntrada from '../Components/ObraEntrada/ObraEntrada'
import AddObraEntrada from '../Components/ObraEntrada/AddObraEntrada'


const RoutesPage = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* <ProtectedRoute path="/protected" element={<ManageUsers />} /> */}
                <Route exact path='/' element={<ProtectedRoute />}>
                    <Route exact path='/' element={<ManageUsers />} />
                </Route>
                <Route exact path='/client' element={<ProtectedRoute />}>
                    <Route exact path='/client' element={<Client />} />
                </Route>
                <Route exact path='/client' element={<ProtectedRoute />}>
                    <Route exact path='/client/add' element={<AddClient  />} />
                </Route>
                <Route exact path='/client' element={<ProtectedRoute />}>
                    <Route exact path='/client/add/:id' element={<AddClient  />} />
                </Route>
               
                <Route exact path='/company' element={<ProtectedRoute />}>
                     <Route path='/company' element={<Company />} />
                </Route>

                <Route exact path='/company' element={<ProtectedRoute />}>
                    <Route path='/company/add' element={<AddCompany />} />
                </Route>
               
                <Route exact path='/company' element={<ProtectedRoute />}>
                    <Route path='/company/add/:id' element={<AddCompany />} />
                </Route>

                <Route exact path='/project' element={<ProtectedRoute />}>
                     <Route path='/project' element={<Project />} />
                </Route>

                <Route exact path='/project' element={<ProtectedRoute />}>
                    <Route path='/project/add' element={<AddProject />} />
                </Route>
               
                <Route exact path='/project' element={<ProtectedRoute />}>
                    <Route path='/project/add/:id' element={<AddProject />} />
                </Route> 

                <Route exact path='/employee' element={<ProtectedRoute />}>
                    <Route exact path='/employee' element={<Employee />} />
                </Route>
                <Route exact path='/employee/add' element={<ProtectedRoute />}>
                <Route path='/employee/add' element={<AddEmployee />} />
                </Route>
                <Route exact path='/employee/add/:id' element={<ProtectedRoute />}>
                <Route path='/employee/add/:id' element={<AddEmployee />} />
                </Route>
                <Route exact path='/obra' element={<ProtectedRoute />}>
                <Route path='/obra' element={<Obra />} />
                </Route>
                <Route exact path='/obra/add' element={<ProtectedRoute />}>
                <Route path='/obra/add' element={<AddObra />} />
                </Route>
                <Route exact path='/obra/add/:id' element={<ProtectedRoute />}>
                <Route path='/obra/add/:id' element={<AddObra />} />
                </Route>
                <Route exact path='/obra_entrada/add' element={<ProtectedRoute />}>
                <Route path='/obra_entrada/add' element={<AddObraEntrada />} />
                </Route>
                <Route exact path='/obra_entrada' element={<ProtectedRoute />}>
                <Route path='/obra_entrada' element={<ObraEntrada />} />
                </Route>
                <Route exact path='/obra_entrada/add/:id' element={<ProtectedRoute />}>
                <Route path='/obra_entrada/add/:id' element={<AddObraEntrada />} />
                </Route>
                <Route exact path='/mamage-users' element={<ProtectedRoute />}>
                <Route path='/mamage-users' element={<ManageUsers />} />
                </Route>
                <Route exact path='/attendance' element={<ProtectedRoute />}>
                <Route path='/attendance' element={<Attendance />} />
                </Route>

                <Route exact path='/dashboard' element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<Dashboards />} />
                </Route>

                <Route path='/' element={<SignIn />}></Route>
                <Route path='/login' element={<SignIn />}></Route>
                <Route path='/signup' element={<SignUp />}></Route>
                <Route path='/mamage-users' element={<ManageUsers />}></Route>
                <Route path='/adminlogin' element={<SignIn />}></Route>
                <Route path='/employee_login' element={<EmployeeLogin />}></Route>
               
            </Routes>
        </BrowserRouter>

    )
}

export default RoutesPage