import { createContext,useEffect, useReducer } from "react"
import Cookies from 'js-cookie';
import { UPDATE_USER_INFO,CHANGE_LOADING_STATE } from "./GlobalActions";
import GlobalReducer from "./Reducer"
import axiosInstance from "../services/axiosInstance"

const IntitalState = {
    userAndRoleInfo: {
    },
    isLoading: true
}

export const UserContext = createContext(IntitalState)

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
    console.log('isLoading',isLoading)
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