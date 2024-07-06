
import { CHANGE_LOADING_STATE,UPDATE_USER_INFO } from "./GlobalActions"

const GlobalReducer = (state,action)=>{
    switch(action.type){
        case UPDATE_USER_INFO:
            return {
                ...state,
                userInfo:action?.userInfo,
                roleType: action?.roleType
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