import { createContext, useContext, useMemo, useState } from "react"
const UserContext=createContext();
export const useUser=()=>{
    return useContext(UserContext);
}
const UserProvider=()=>{
    const [isLoggedIn,setIsUserLoggedIn]=useState(false);
    const login=()=>{
        setIsUserLoggedIn(true);
    }
    const logout=()=>{
        setIsUserLoggedIn(false);
    }
    const userValue=useMemo(()=>{
        setIsUserLoggedIn,login,logout
    },[isLoggedIn]);
    return(<UserContext.Provider value={userValue}>
        {children}
    </UserContext.Provider>)
}