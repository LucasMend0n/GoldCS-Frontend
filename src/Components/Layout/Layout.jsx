import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import useAuth from "../../hooks/useAuth"

const Layout = () => {
    const auth = useAuth();

    return (
        <main className="App">
            {auth.token ? <Navbar /> : <></>}
            <Outlet />
            {auth.token ? <Footer /> : <></>}
        </main>
    )
}

export default Layout