import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Coffee, Mail, Lock, ArrowRight } from "lucide-react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await login(email, password)
            toast.success("Welcome back to BrewHouse!")
            navigate("/")
        } catch (error) {
            console.error("Login Error:", error)
            toast.error("Failed to sign in. Please check your credentials.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 flex items-center justify-center min-h-[70vh]">
            <div className="max-w-md w-full bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-latte/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-latte/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="text-center mb-12 relative z-10">
                    <div className="w-20 h-20 bg-espresso/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-espresso/10 transition-transform duration-500 hover:rotate-12">
                        <Coffee className="w-10 h-10 text-espresso" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-espresso mb-4 tracking-tight">Welcome Back</h1>
                    <p className="text-charcoal/40 text-sm font-medium uppercase tracking-widest leading-loose">Access your rewards & reservations.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-espresso/40 ml-1">Email Address</label>
                        <div className="relative group/field">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20 group-focus-within/field:text-latte transition-colors" />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 bg-cream/50 border border-espresso/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte/20 transition-all font-medium text-espresso placeholder:text-espresso/10 outline-none"
                                placeholder="name@email.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold uppercase tracking-widest text-espresso/40">Password</label>
                            <Link to="/forgot-password" size="sm" className="text-xs font-bold uppercase tracking-widest text-latte hover:underline transition-all">Forgot?</Link>
                        </div>
                        <div className="relative group/field">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20 group-focus-within/field:text-latte transition-colors" />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 bg-cream/50 border border-espresso/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte/20 transition-all font-medium text-espresso placeholder:text-espresso/10 outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full py-5 bg-espresso text-white rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all hover:bg-espresso/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : (
                            <>
                                <span>Sign In</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                    
                    <div className="text-center pt-6 space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="h-px bg-espresso/10 flex-grow"></div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-espresso/30 italic">New to the Club?</span>
                            <div className="h-px bg-espresso/10 flex-grow"></div>
                        </div>
                        <p className="text-charcoal/60 text-sm">
                            <Link to="/signup" className="text-latte font-bold hover:underline transition-all">Create your account</Link> to start earning rewards.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
