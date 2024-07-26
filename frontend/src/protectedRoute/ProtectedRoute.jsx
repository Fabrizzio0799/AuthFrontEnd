import { Navigate } from "react-router-dom";
//import Loading from "../components/Loading/Loading";
import { useAuth } from "../contexts/authContext";

import React from 'react'

const ProtectedRoute = ({children}) => {
    const {user,loading,currentDB}=useAuth()
    if(loading)return (<p>Loading...</p>)
    if (!user||(user && !currentDB))return <Navigate to='/login'/>
    return <>{children}</>
}

export default ProtectedRoute
