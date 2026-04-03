import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Calendar, Users, Clock, ArrowRight, CheckCircle2 } from "lucide-react"

const Reserve = () => {
    const { currentUser } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: "2",
        occasion: "General",
        specialRequest: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!currentUser) {
            toast.error("Please login to make a reservation")
            navigate("/login")
            return
        }

        setLoading(true)
        try {
            await addDoc(collection(db, "reservations"), {
                ...formData,
                userId: currentUser.uid,
                userName: currentUser.name || currentUser.displayName || "Anonymous",
                status: "Pending",
                createdAt: serverTimestamp()
            })
            setSuccess(true)
            toast.success("Reservation request sent successfully!")
        } catch (error) {
            console.error("Error reservation:", error)
            toast.error("Failed to make reservation. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="max-w-xl mx-auto px-6 py-20 text-center animate-fade-in">
                <div className="w-24 h-24 bg-latte/20 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-latte/10">
                    <CheckCircle2 className="w-12 h-12 text-latte" />
                </div>
                <h1 className="text-4xl font-serif font-bold text-espresso mb-6">Booking Confirmed!</h1>
                <p className="text-charcoal/60 mb-10 text-lg">We've received your request for {formData.date} at {formData.time}. You'll receive an email confirmation shortly.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={() => navigate("/dashboard")} className="btn-primary">View Dashboard</button>
                    <button onClick={() => setSuccess(false)} className="btn-secondary">New Booking</button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Side: Info */}
            <div className="order-2 lg:order-1">
                <span className="text-latte font-bold tracking-widest text-xs uppercase mb-6 block">Seating</span>
                <h1 className="text-6xl font-serif font-bold text-espresso leading-tight mb-8">Reserve your<br/><span className="text-latte italic underline decoration-latte/30 underline-offset-8">Favorite Spot.</span></h1>
                <p className="text-charcoal/60 text-lg leading-relaxed mb-12 max-w-md">Enjoy a peaceful coffee experience. We reserve limited spots to ensure a serene atmosphere for all our guests.</p>
                
                <div className="space-y-8">
                    <InfoItem icon={<Calendar className="w-6 h-6 text-latte" />} title="Flexible Booking" desc="Choose your preferred date and time slot." />
                    <InfoItem icon={<Users className="w-6 h-6 text-latte" />} title="Group Friendly" desc="Accommodating groups of up to 10 guests." />
                    <InfoItem icon={<Clock className="w-6 h-6 text-latte" />} title="Real-time Status" desc="Get instant updates on your booking request." />
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="order-1 lg:order-2 bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-latte/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-latte/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-espresso/40 ml-1">Select Date</label>
                            <input 
                                type="date" 
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte/20 transition-all font-medium text-espresso"
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-widest text-espresso/40 ml-1">Select Time</label>
                            <select 
                                required
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte/20 transition-all font-medium text-espresso"
                            >
                                <option value="">Slotted Time</option>
                                <option value="09:00 AM">09:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="02:00 PM">02:00 PM</option>
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="06:00 PM">06:00 PM</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-espresso/40 ml-1">Number of Guests</label>
                        <select 
                            required
                            value={formData.guests}
                            onChange={(e) => setFormData({...formData, guests: e.target.value})}
                            className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte/20 transition-all font-medium text-espresso"
                        >
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="6">6 Guests</option>
                            <option value="10">10 Guests</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-espresso/40 ml-1">Special Requests (Optional)</label>
                        <textarea 
                            rows="3"
                            value={formData.specialRequest}
                            onChange={(e) => setFormData({...formData, specialRequest: e.target.value})}
                            placeholder="Allergies, table preference, celebration..."
                            className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte/20 transition-all font-medium text-espresso resize-none placeholder:text-espresso/20"
                        ></textarea>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full py-5 bg-espresso text-white rounded-2xl font-bold flex items-center justify-center space-x-3 transition-all hover:bg-espresso/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl disabled:opacity-50"
                    >
                        {loading ? "Processing..." : (
                            <>
                                <span>Confirm Reservation</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                    
                    {!currentUser && (
                        <p className="text-center text-sm text-charcoal/40 pt-4 bg-red-50 p-4 rounded-xl border border-red-100 font-medium">
                            🔒 You must be logged in to book a table.
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}

const InfoItem = ({ icon, title, desc }) => (
    <div className="flex space-x-6">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-latte/10 h-fit transition-transform hover:scale-110">{icon}</div>
        <div>
            <h3 className="text-xl font-serif font-bold text-espresso mb-1">{title}</h3>
            <p className="text-charcoal/50 text-sm leading-relaxed max-w-xs">{desc}</p>
        </div>
    </div>
)

export default Reserve
