/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, loginRequest, setUserLocalStorage } from "./util";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        const user = getUserLocalStorage()
        if (user) {
            setUser(user);
        }
    }, [])



    async function authenticate(email, password) {
        var backendResponse; 
        try {
            const response = await loginRequest(email, password);
            if ('success' in response) {
                const payload = {
                    token: response.result.token,
                    email: response.result.email,
                    userID: response.result.userID,
                    name: response.result.name,
                }
                setUser(payload);
                setUserLocalStorage(payload);
                backendResponse = response.response.data;
            }
            else{
                backendResponse = response.response.data;
            }
            return backendResponse; 

        } catch (error) {
            console.log(error);
        }
    }

    function logout() {
        setUser(null)
        setUserLocalStorage(null)
    }

    return (
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext; 