import { Link, useLocation } from "react-router-dom"
import { ShoppingBag, User, LogOut, Menu as MenuIcon, Coffee } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"

const Navbar = () => {
    const { currentUser, isAdmin, logout } = useAuth()
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 sm:px-12 py-4 ${
            scrolled ? "bg-cream/80 backdrop-blur-lg shadow-sm border-b border-latte/20" : "bg-transparent"
        }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <Coffee className="w-8 h-8 text-espresso" />
                    <span className="font-serif text-2xl font-bold tracking-tight text-espresso">BrewHouse<span className="text-latte">.</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <NavLink to="/" active={location.pathname === "/"}>Home</NavLink>
                    <NavLink to="/menu" active={location.pathname === "/menu"}>Menu</NavLink>
                    <NavLink to="/reserve" active={location.pathname === "/reserve"}>Reservations</NavLink>
                    <NavLink to="/about" active={location.pathname === "/about"}>About</NavLink>
                    <NavLink to="/services" active={location.pathname === "/services"}>Services</NavLink>
                    {isAdmin && (
                        <NavLink to="/admin" active={location.pathname.startsWith("/admin")}>Admin</NavLink>
                    )}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                            <Link to="/dashboard" className="p-2 hover:bg-latte/10 rounded-full transition-colors text-espresso">
                                <User className="w-5 h-5" />
                            </Link>
                            <button onClick={() => logout()} className="p-2 hover:bg-red-50 rounded-full transition-colors text-red-500">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login" className="px-5 py-2 text-espresso font-medium hover:bg-latte/10 rounded-full transition-all">Login</Link>
                            <Link to="/signup" className="px-5 py-2 bg-espresso text-white font-medium rounded-full hover:bg-espresso/90 shadow-md transform hover:-translate-y-1 transition-all">Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <button 
                  className="md:hidden text-espresso"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-0 left-0 right-0 bg-cream p-6 shadow-2xl border-b border-latte/20 animate-fade-in">
                    <div className="flex items-center justify-between mb-8">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2">
                            <Coffee className="w-8 h-8 text-espresso" />
                            <span className="font-serif text-2xl font-bold text-espresso">BrewHouse<span className="text-latte">.</span></span>
                        </Link>
                        <button onClick={() => setMobileMenuOpen(false)}>×</button>
                    </div>
                    <div className="flex flex-col space-y-6 text-center">
                        <MobileLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileLink>
                        <MobileLink to="/menu" onClick={() => setMobileMenuOpen(false)}>Menu</MobileLink>
                        <MobileLink to="/reserve" onClick={() => setMobileMenuOpen(false)}>Reservations</MobileLink>
                        <MobileLink to="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileLink>
                        <MobileLink to="/services" onClick={() => setMobileMenuOpen(false)}>Services</MobileLink>
                        {isAdmin && (
                            <MobileLink to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin</MobileLink>
                        )}
                        <hr className="border-latte/20" />
                        {currentUser ? (
                           <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-red-500">Sign Out</button>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-espresso">Login</Link>
                                <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-espresso text-white rounded-xl">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

const NavLink = ({ to, children, active }) => (
    <Link to={to} className={`text-sm font-medium transition-colors hover:text-latte ${
        active ? "text-latte" : "text-charcoal"
    }`}>
        {children}
    </Link>
)

const MobileLink = ({ to, children, onClick }) => (
    <Link to={to} onClick={onClick} className="text-lg font-medium text-charcoal hover:text-latte">
        {children}
    </Link>
)

export default Navbar
