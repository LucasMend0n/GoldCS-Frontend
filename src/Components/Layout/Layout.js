import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import useAuth from "../../hooks/useAuth"
const Layout = () => {

    const { auth } = useAuth();

    return (


        <main className="App">
            {auth?.user ? <Navbar /> : <></>}
            <Outlet />
            {auth?.user ? <Footer /> : <></>}
        </main>

    )
}

export default Layout