
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EmployeeLogin from '../Components/EmployeeLogin'
import SignIn from '../Components/Login/Login'
import SignUp from '../Components/SignUp/SignUp'
import ManageUsers from '../Components/domain/ManageUsers'
import ProtectedRoute from './ProtectedRoute'
import AppRouter from './AppRouter'
import useGlobalContext from '../ContextApi/useGlobalContext'
import PageNotFound from '../Components/404/PageNotFound'

const RoutesPage = () => {
  const {state} = useGlobalContext()
  const [stateAppRouter,setStateAppRouter] =React.useState([])

  const {roleId} = state?.userAndRoleInfo??{}
  React.useEffect(()=>{
    if(roleId){
        const getAppRouter = AppRouter[roleId]
        setStateAppRouter([...getAppRouter])
    }
   
  },[roleId])
  

    return (
        <BrowserRouter>
            <Routes>

                {stateAppRouter?.map((router)=>{
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