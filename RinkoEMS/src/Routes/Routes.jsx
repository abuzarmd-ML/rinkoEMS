
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeLogin from '../Components/EmployeeLogin'
import useGlobalContext from '../ContextApi/useGlobalContext'
import SignIn from '../Components/Login/Login'
import SignUp from '../Components/SignUp/SignUp'
import ManageUsers from '../Components/domain/ManageUsers'
import ProtectedRoute from './ProtectedRoute'
import AppRouter from './AppRouter'

const RoutesPage = () => {
    const contextData = useGlobalContext()
    const roleId = contextData?.userAndRoleInfo?.roleId
  
    return (
        <BrowserRouter>
            <Routes>

                {AppRouter[roleId]?.map((router) => {
                    return (
                        <Route key={router.id} exact path={router.url} element={<ProtectedRoute />}>
                            <Route exact path={router.url} element={router.component} />
                        </Route>
                    )
                })}

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