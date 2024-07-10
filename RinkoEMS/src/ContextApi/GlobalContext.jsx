import { createContext,useEffect, useReducer } from "react"
import Cookies from 'js-cookie';
import { UPDATE_USER_INFO,CHANGE_LOADING_STATE,UPDATE_COMPANY_COLOR } from "./GlobalActions";
import GlobalReducer from "./Reducer"
import axiosInstance from "../services/axiosInstance"

export const UserContext = createContext({
    userInfo: {
    },
    isLoading: true,
    companyColor: "#0d6efd"
})

const GlobalContext = ({ children }) => {

    const [state, dispatch] = useReducer(GlobalReducer, UserContext)
    const token = Cookies.get('token');
    
    useEffect(()=>{
     if(token){
        axiosInstance
        .get('/getUserInfo')
        .then((response)=>{
            dispatch({
                type:UPDATE_USER_INFO,
                userAndRoleInfo:response.data.userAndRoleInfo
            })
            dispatch({
                type:CHANGE_LOADING_STATE,
                isLoading:false
            })
            dispatch({
                type:UPDATE_COMPANY_COLOR,
                companyColor: "0d6efd"
            })
        })
        .catch(()=>{
            dispatch({
                type:CHANGE_LOADING_STATE,
                isLoading:false
            })
        })
     }else{
        dispatch({
            type:CHANGE_LOADING_STATE,
            isLoading:false
        })
     }
     },[token])
    const {isLoading} = state
    if(isLoading) {
        return <h2>Loading state</h2>
    }
    return (
        <UserContext.Provider value={{
            state,
            dispatch,
        }}>
            {children}
        </UserContext.Provider>
    )


}


export default GlobalContext