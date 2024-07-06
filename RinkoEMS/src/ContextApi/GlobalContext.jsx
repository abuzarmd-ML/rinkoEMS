import { createContext,useEffect, useReducer } from "react"
import Cookies from 'js-cookie';
import { UPDATE_USER_INFO,CHANGE_LOADING_STATE } from "./GlobalActions";
import GlobalReducer from "./Reducer"
import axiosInstance from "../services/axiosInstance"

export const UserContext = createContext({
    userInfo: {},
    roleType: 'user',
    isLoading: true
})

const GlobalContext = ({ children }) => {

    const [state, dispatch] = useReducer(GlobalReducer, UserContext)
    const token = Cookies.get('token');
    
    useEffect(()=>{
        console.log('token',token)
     if(token){
        dispatch({
            type:CHANGE_LOADING_STATE,
            isLoading:false
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