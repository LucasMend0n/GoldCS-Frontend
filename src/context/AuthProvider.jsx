/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, loginRequest, setUserLocalStorage } from "./util";
import jwt from 'jwt-decode'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = getUserLocalStorage()
        if (user) {
            setUser(user);
        }
    }, [])



    async function authenticate(email, password) {
        try {
            const response = await loginRequest(email, password);
            if ('success' in response) {
                const retLogin = {
                    token: response.result.token,
                    refreshToken: response.result.refreshToken
                }

                const payload = jwt(retLogin.token)
                payload.token = retLogin.token
                setUser(payload);
                setUserLocalStorage(payload);
                return true;
            }
            else if (response.response && response.response.data && response.response.data.StatusCode) {
                const statusCode = response.response.data.StatusCode;
                let errorMessage = ''
                switch (statusCode) {
                    case 404:
                        errorMessage = 'Usuário não encontrado. Tente novamente'
                        break;
                    case 400:
                        errorMessage = 'Usuário ou senha inválidos. Tente novamente'
                        break;
                    default:
                        errorMessage = 'Ocorreu um erro, tente novamente mais tarde.'
                        break;
                }
                setError(errorMessage);
            } else {
                setError('Erro desconhecido');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    function logout() {
        setUser(null)
        setUserLocalStorage(null)
        setError(null)
    }

    function clearLoginError() {
        setError(null);
    }

    return (
        <AuthContext.Provider value={{ ...user, error, authenticate, clearLoginError, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext; 