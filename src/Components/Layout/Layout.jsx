import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import useAuth from "../../hooks/useAuth"

const Layout = () => {
    const auth = useAuth();

    return (
        <main className="App">
            {auth.token ? <Navbar /> : <></>}
            <Outlet />
        </main>
    )
}

export default Layout