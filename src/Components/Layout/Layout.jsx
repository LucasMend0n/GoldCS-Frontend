import { Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import Sidebar from "./Sidebar";

const Layout = () => {
    const auth = useAuth();

    return (
        <main className="App">
            {auth.token ? <Sidebar /> : <></>}
            <Outlet />
        </main>
    )
}

export default Layout