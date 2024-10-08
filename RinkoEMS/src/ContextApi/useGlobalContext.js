import React, { useContext } from "react"
import { UserContext } from "./GlobalContext"
import axiosInstance from "../services/axiosInstance"
import Cookies from 'js-cookie';


const useGlobalContext = ()=>{
    const {...rest} = useContext(UserContext)
    const token = Cookies.get('token');
     React.useEffect(()=>{
        if(rest.userAndRoleInfo.isLogin||token){
        axiosInstance
        .get('/getUserInfo')
        .then((response)=>{
            localStorage.setItem("userAndRoleInfo", JSON.stringify(response.data.userAndRoleInfo));
            rest.setUserInfoContext({...response.data.userAndRoleInfo,isLogin:true})
   
        })
        .catch((e)=>{
            console.log('response',e)   
        })
    }
    },[rest.userAndRoleInfo.isLogin,token])

    return {
       ...rest
    }
}

export default useGlobalContext