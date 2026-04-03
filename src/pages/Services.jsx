import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, MapPin, Calendar, Check, ArrowRight, ShieldCheck, Mail, Briefcase, Loader2 } from "lucide-react"
import { toast } from "sonner"

const Services = () => {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const q = query(collection(db, "services"), orderBy("createdAt", "desc"))
                const querySnapshot = await getDocs(q)
                setServices(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            } catch (error) {
                console.error("Error fetching services:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-32 pb-32"
        >
            {/* Services Hero */}
            <header className="px-6 sm:px-12 max-w-7xl mx-auto pt-20 text-center">
                <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-latte font-bold tracking-[0.3em] text-[10px] uppercase mb-6 block"
                >
                    Excellence in Every Cup
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-serif font-black text-espresso leading-tight mb-8 tracking-tighter"
                >
                    Beyond the <span className="text-latte italic underline decoration-latte/20 underline-offset-8 decoration-4">Brew.</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-charcoal/40 text-xl leading-relaxed max-w-2xl mx-auto italic font-medium"
                >
                    We offer a curated suite of services designed for individuals and businesses who appreciate precision, craft, and the art of coffee.
                </motion.p>
            </header>

            {/* Service Grid */}
            <section className="px-6 sm:px-12 max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex justify-center p-20">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <Loader2 className="w-12 h-12 text-latte" />
                        </motion.div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <AnimatePresence>
                            {services.map((service, index) => (
                                <ServiceCard 
                                    key={service.id || index}
                                    icon={getIcon(service.icon)} 
                                    title={service.title} 
                                    desc={service.description}
                                    index={index}
                                />
                            ))}
                        </AnimatePresence>
                        {services.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-white/50 rounded-[3rem] border-2 border-dashed border-espresso/5">
                                <Coffee className="w-12 h-12 text-espresso/10 mx-auto mb-4" />
                                <p className="text-espresso/20 font-serif italic text-lg">New specialized services are currently being cured.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>

             {/* Booking Banner Section */}
             <section className="px-6 sm:px-12 max-w-7xl mx-auto py-32">
                <div className="relative premium-gradient rounded-[4rem] p-12 md:p-24 overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-2/3 h-full opacity-5 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
                        <Coffee className="w-full h-full text-white" />
                    </div>
                    <div className="max-w-2xl relative z-10 flex flex-col items-start text-left">
                        <h2 className="text-5xl md:text-7xl text-white font-serif font-black mb-8 leading-tight tracking-tighter">Consult our master roasters.</h2>
                        <p className="text-cream/60 text-xl mb-12 leading-relaxed italic font-medium">Looking for something specific? Our team is available for custom coffee consulting and private tasting sessions.</p>
                        <a 
                            href="mailto:hello@brewhouse.cafe"
                            className="inline-flex items-center space-x-4 px-10 py-5 bg-white text-espresso rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all hover:bg-latte hover:text-white shadow-xl hover:-translate-y-1"
                        >
                            <span>Inquire Now</span>
                            <Mail className="w-5 h-5" />
                        </a>
                    </div>
                </div>
             </section>

            {/* Pricing Section - Still Static for Design but could be dynamic later */}
             <section className="px-6 sm:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-20 px-4">
                    <h2 className="text-4xl md:text-6xl text-espresso font-serif font-black mb-6 tracking-tighter">Collective Memberships</h2>
                    <p className="text-latte text-xs tracking-[0.4em] font-black uppercase">Join the BrewHouse Inner Circle</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                     <PricingCard 
                        title="Enthusiast" 
                        price="$29" 
                        features={["Limited Edition Roasts", "10% Off All In-Store", "Monthly Cupping Sessions"]}
                     />
                     <PricingCard 
                        title="Connoisseur" 
                        price="$59" 
                        featured
                        features={["Weekly Fresh Supply", "20% Off All In-Store", "VIP Event Invites", "Custom Grind Pro"]}
                     />
                     <PricingCard 
                        title="Artisan" 
                        price="$99" 
                        features={["Daily Free Brews", "30% Off All In-Store", "Private Roasting Tours", "Exclusive Merchandise"]}
                     />
                </div>
             </section>
        </motion.div>
    )
}

const getIcon = (type) => {
    switch(type) {
        case "Calendar": return <Calendar className="w-10 h-10" />
        case "ShieldCheck": return <ShieldCheck className="w-10 h-10" />
        case "MapPin": return <MapPin className="w-10 h-10" />
        case "Briefcase": return <Briefcase className="w-10 h-10" />
        default: return <Coffee className="w-10 h-10" />
    }
}

const ServiceCard = ({ icon, title, desc, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex flex-col space-y-8 group p-10 bg-white rounded-[3rem] border border-espresso/5 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
        <div className="w-24 h-24 bg-cream p-6 rounded-[2rem] text-latte flex items-center justify-center transition-all group-hover:bg-espresso group-hover:text-white group-hover:scale-110 shadow-lg border border-white">
            {icon}
        </div>
        <div>
            <h3 className="text-3xl font-serif font-black text-espresso mb-4 leading-tight">{title}</h3>
            <p className="text-charcoal/40 text-base leading-relaxed italic font-medium">{desc}</p>
        </div>
    </motion.div>
)

const PricingCard = ({ title, price, features, featured=false }) => (
    <div className={`p-12 rounded-[4rem] transition-all duration-700 hover:shadow-2xl ${
        featured ? "bg-espresso text-white scale-105 shadow-2xl relative border-4 border-latte/10" : "bg-white text-espresso border border-espresso/5"
    }`}>
        {featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-latte px-6 py-2 rounded-full text-[10px] font-black uppercase text-white shadow-xl tracking-widest italic">Most Coveted</span>}
        <h3 className="text-4xl font-serif font-black mb-4">{title}</h3>
        <div className="flex items-baseline mb-12">
            <span className="text-6xl font-black tracking-tighter">{price}</span>
            <span className="text-sm font-black uppercase tracking-widest opacity-40 ml-2">/mo</span>
        </div>
        <ul className="space-y-8 mb-16">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center space-x-4 text-sm font-bold">
                    <div className={`p-1 rounded-full ${featured ? "bg-latte/20 text-latte" : "bg-espresso/5 text-latte"}`}>
                        <Check className="w-4 h-4" />
                    </div>
                    <span className="opacity-80">{feature}</span>
                </li>
            ))}
        </ul>
        <button 
            onClick={() => toast.success("Inquiry noted. Our collective manager will reach out soon.")}
            className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3 transition-all ${
                featured ? "bg-latte text-white hover:bg-white hover:text-espresso shadow-lg" : "bg-espresso text-white hover:bg-latte"
            }`}
        >
            <span>Claim Tier</span>
            <ArrowRight className="w-5 h-5 text-current" />
        </button>
    </div>
)

export default Services
