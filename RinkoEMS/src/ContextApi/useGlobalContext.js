import { useContext } from "react"

import { UserContext } from "./GlobalContext"

const useGlobalContext = ()=>{
    const {...rest} = useContext(UserContext)

    return {
       ...rest
    }
}

export default useGlobalContext