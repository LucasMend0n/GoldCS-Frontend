import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import React from 'react'

const RequireAuth = () => {

    const auth = useAuth();

    if (!auth.token) {
        return (
            <Navigate to='/login'/>
        )
    }

    return <Outlet />

}

export default RequireAuth