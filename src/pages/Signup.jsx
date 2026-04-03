import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Coffee, Mail, Lock, User, ArrowRight } from "lucide-react"

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const { signup } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        try {
            await signup(email, password, name)
            toast.success("Welcome to BrewHouse, " + name + "!")
            navigate("/")
        } catch (error) {
            console.error("Signup Error:", error)
            toast.error("Failed to create account. Email may already be in use.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 flex items-center justify-center min-h-[70vh]">
            <div className="max-w-md w-full bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-latte/10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-48 h-48 bg-latte/5 rounded-full -ml-20 -mt-20 group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div className="text-center mb-12 relative z-10">
                    <div className="w-20 h-20 bg-latte/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-latte/10 transition-transform duration-500 hover:rotate-12">
                        <Coffee className="w-10 h-10 text-latte" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-espresso mb-4 tracking-tight">Join the Craft</h1>
                    <p className="text-charcoal/40 text-sm font-medium uppercase tracking-widest leading-loose">The perfect blend starts here.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-espresso/40 ml-1">Full Name</label>
                        <div className="relative group/field">
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20 group-focus-within/field:text-latte transition-all" />
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 bg-cream/50 border border-espresso/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte/20 transition-all font-medium text-espresso placeholder:text-espresso/10 outline-none"
                                placeholder="Your Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-espresso/40 ml-1">Email Address</label>
                        <div className="relative group/field">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20 group-focus-within/field:text-latte transition-all" />
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
                        <label className="text-xs font-bold uppercase tracking-widest text-espresso/40 ml-1">Password</label>
                        <div className="relative group/field">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-espresso/20 group-focus-within/field:text-latte transition-all" />
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
                        {loading ? "Creating Profile..." : (
                            <>
                                <span>Get Started</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                    
                    <div className="text-center pt-6 space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="h-px bg-espresso/10 flex-grow"></div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-espresso/30 italic">Already a Member?</span>
                            <div className="h-px bg-espresso/10 flex-grow"></div>
                        </div>
                        <p className="text-charcoal/60 text-sm">
                            <Link to="/login" className="text-latte font-bold hover:underline transition-all">Sign in here</Link> to access your account.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
