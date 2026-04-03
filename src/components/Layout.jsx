import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Toaster } from "sonner"

const Layout = () => {
    return (
        <div className="min-h-screen bg-cream flex flex-col">
            <Navbar />
            <main className="flex-grow pt-24 sm:pt-32">
                <Outlet />
            </main>
            <Footer />
            <Toaster position="bottom-right" richColors />
        </div>
    )
}

export default Layout
