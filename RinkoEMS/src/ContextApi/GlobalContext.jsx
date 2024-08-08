import React from 'react'
import { createContext } from "react"
import Cookies from 'js-cookie';

import axiosInstance from "../services/axiosInstance"

const IntitalState = {
    userAndRoleInfo: {
    },
    isLoading: true
}

export const UserContext = createContext(IntitalState)

const GlobalContext = ({ children }) => {
    const token = Cookies.get('token');

     const [isLoading,setIsloading] = React.useState(false)
    const [roleInfo,setRoleInfo] =React.useState({userAndRoleInfo:{},isLogin:!!token})

    const setUserInfoContext = React.useCallback(
        newState => {
            setRoleInfo({userAndRoleInfo: {...roleInfo, ...newState}})
        },
        [roleInfo, setRoleInfo],
      )
      const getContextValue = React.useCallback(
        () => ({setUserInfoContext, ...roleInfo}),
        [roleInfo, setRoleInfo],
      )
      
    if(isLoading) {
        return <h2>Loading state</h2>
    }
    return (
        <UserContext.Provider value={getContextValue()}>
            {children}
        </UserContext.Provider>
    )


}


export default GlobalContext