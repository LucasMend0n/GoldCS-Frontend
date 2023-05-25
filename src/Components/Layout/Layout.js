import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
const Layout = () => {

    return (
        <>
            <main className="App">
                <Navbar />
                <Outlet />
                <Footer />
            </main>
        </>
    )
}

export default Layout