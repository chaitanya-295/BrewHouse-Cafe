import { useState, useEffect } from "react"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuth } from "../context/AuthContext"
import { toast } from "sonner"
import { Coffee, User, Calendar, Clock, MapPin, Loader2, ArrowRight } from "lucide-react"

const Dashboard = () => {
    const { currentUser } = useAuth()
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUserReservations = async () => {
            if (!currentUser) return
            setLoading(true)
            try {
                const q = query(
                    collection(db, "reservations"), 
                    where("userId", "==", currentUser.uid),
                    orderBy("createdAt", "desc")
                )
                const querySnapshot = await getDocs(q)
                setReservations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            } catch (error) {
                console.error("Error fetching user data:", error)
                toast.error("Failed to load your history.")
            } finally {
                setLoading(false)
            }
        }
        fetchUserReservations()
    }, [currentUser])

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
            <header className="mb-20 text-center md:text-left">
                <span className="text-latte font-bold tracking-widest text-xs uppercase mb-4 block">Personal Workspace</span>
                <h1 className="text-5xl md:text-6xl font-serif font-bold text-espresso mb-8">Hello, {currentUser?.name || "Member"}<span className="text-latte">.</span></h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Profile Card */}
                <div className="lg:col-span-1 bg-white rounded-[3rem] p-10 shadow-xl border border-latte/10 h-fit sticky top-32">
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-32 h-32 bg-espresso text-white rounded-[2rem] flex items-center justify-center text-5xl font-serif font-bold shadow-2xl border-4 border-white">
                            {currentUser?.name?.charAt(0) || <User className="w-12 h-12" />}
                        </div>
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-espresso">{currentUser?.name}</h3>
                            <p className="text-charcoal/40 text-sm italic">{currentUser?.email}</p>
                        </div>
                        <div className="w-full pt-8 border-t border-latte/10 space-y-4 text-left">
                             <div className="flex items-center space-x-3 text-sm">
                                <MapPin className="w-4 h-4 text-latte" />
                                <span className="text-charcoal/60">Brew City Member</span>
                             </div>
                             <div className="flex items-center space-x-3 text-sm">
                                <Calendar className="w-4 h-4 text-latte" />
                                <span className="text-charcoal/60">Joined March 2026</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="flex items-end justify-between px-4">
                        <h2 className="text-3xl font-serif font-bold text-espresso italic">Booking History</h2>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-espresso/30">{reservations.length} total events</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center p-20"><Loader2 className="w-10 h-10 text-latte animate-spin" /></div>
                    ) : (
                        <div className="space-y-6">
                            {reservations.map((res, index) => (
                                <div key={res.id} className="group bg-white p-8 rounded-[2.5rem] shadow-sm border border-latte/10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-2xl hover:-translate-y-1">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-latte group-hover:bg-latte/20 transition-colors">
                                            <Coffee className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-serif font-bold text-espresso">Table for {res.guests}</h4>
                                            <div className="flex items-center text-xs font-bold uppercase tracking-widest text-espresso/30 mt-1 italic">
                                                <Calendar className="w-3 h-3 mr-1" /> {res.date} • <Clock className="w-3 h-3 mx-1" /> {res.time}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                                            res.status === "Confirmed" ? "bg-green-100 text-green-700" : 
                                            res.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-latte/20 text-espresso"
                                        }`}>
                                            {res.status}
                                        </span>
                                        <button className="p-3 bg-espresso text-white rounded-xl transform hover:rotate-12 transition-all opacity-0 group-hover:opacity-100">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {reservations.length === 0 && (
                                <div className="p-20 text-center bg-white/50 rounded-3xl border-2 border-dashed border-espresso/10">
                                    <Calendar className="mx-auto w-12 h-12 text-espresso/10 mb-4" />
                                    <p className="text-charcoal/40 font-medium italic">No reservations found yet. Why not book your favorite spot today?</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
