
import { CHANGE_LOADING_STATE,UPDATE_USER_INFO } from "./GlobalActions"

const GlobalReducer = (state,action)=>{
    switch(action.type){
        case UPDATE_USER_INFO:
            return {
                ...state,
                userAndRoleInfo:{...action?.userAndRoleInfo},
                isLoading:false,
                roleData:action?.userAndRoleInfo.roleId
               
            }
        case CHANGE_LOADING_STATE:
            return {
                ...state,
                isLoading:!!action?.isLoading
            }
        default:
            return state
    }
}

export default GlobalReducer