import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import React, { useEffect, useState } from 'react'

const RequireAuth = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false)
    }, [])
    
    if (isLoading) {
        return (<div>Carregando...</div>)
    }
    
    if (!auth.token) {
        return (
            <Navigate to='/login' />
        )
    }

    return <Outlet />

}

export default RequireAuth