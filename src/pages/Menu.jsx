import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuth } from "../context/AuthContext"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, Search, Filter, Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"

const Menu = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [ordering, setOrdering] = useState(null)
    const [search, setSearch] = useState("")
    const [activeCategory, setActiveCategory] = useState("All")
    const { currentUser } = useAuth()

    const categories = ["All", "Hot Drinks", "Cold Drinks", "Food", "Specials"]

    useEffect(() => {
        const fetchItems = async () => {
            console.log("Menu: Fetching items...");
            try {
                // Set a timeout for the fetch
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000));
                
                const q = query(collection(db, "menu"), orderBy("name"));
                const querySnapshot = await Promise.race([getDocs(q), timeoutPromise]);
                
                const menuItems = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setItems(menuItems);
            } catch (error) {
                console.error("Menu: Error fetching items:", error);
                setItems([]);
            } finally {
                setLoading(false);
            }
        }
        fetchItems()
    }, [])

    const handleQuickOrder = async (item) => {
        if (!currentUser) {
            toast.error("Please log in to place an order.")
            return
        }

        setOrdering(item.id)
        try {
            await addDoc(collection(db, "orders"), {
                userId: currentUser.uid,
                userName: currentUser.displayName || currentUser.email,
                itemName: item.name,
                price: item.price,
                status: "Pending",
                createdAt: serverTimestamp()
            })
            toast.success(`${item.name} order sent to baristas!`)
        } catch (error) {
            console.error("Order error:", error)
            toast.error("Failed to send order. Please try again.")
        } finally {
            setOrdering(null)
        }
    }

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                             item.description.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = activeCategory === "All" || item.category === activeCategory
        return matchesSearch && matchesCategory
    })

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-6 sm:px-12 py-12"
        >
            <header className="mb-20 text-center">
                <motion.span 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-latte font-bold tracking-[0.3em] text-xs uppercase mb-4 block"
                >
                    Selection
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-6xl md:text-7xl font-serif font-black text-espresso mb-8 tracking-tight"
                >
                    Curated Collection
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-charcoal/40 text-xl leading-relaxed max-w-2xl mx-auto italic font-medium"
                >
                    Discover our house-roasted blends, artisanal pastries, and seasonal specials crafted with precision and care.
                </motion.p>
            </header>

            {/* Controls */}
            <div className="mb-16 flex flex-col md:flex-row gap-6 md:items-center justify-between sticky top-24 z-30 bg-cream/80 backdrop-blur-md py-4 transition-all border-b border-espresso/5">
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar md:pb-0 relative px-1">
                    {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`relative whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                                activeCategory === cat 
                                ? "text-white" 
                                : "text-espresso/60 hover:text-espresso"
                            }`}
                        >
                            {activeCategory === cat && (
                                <motion.div 
                                    layoutId="activeCategory"
                                    className="absolute inset-0 bg-espresso rounded-full -z-10 shadow-lg shadow-espresso/20"
                                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                />
                            )}
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative group max-w-sm w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 group-focus-within:text-latte transition-colors duration-300" />
                    <input 
                        type="text" 
                        placeholder="Search our selection..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-espresso/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte/20 transition-all font-medium text-charcoal"
                    />
                </div>
            </div>

            {loading ? (
                 <div className="flex justify-center items-center h-64">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="text-latte"
                    >
                        <Coffee className="w-10 h-10" />
                    </motion.div>
                 </div>
            ) : (
                <motion.div 
                    layout 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        {filteredItems.map((item, index) => (
                            <MenuItemCard 
                                key={item.id} 
                                item={item} 
                                index={index} 
                                onOrder={() => handleQuickOrder(item)}
                                isOrdering={ordering === item.id}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {!loading && filteredItems.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-24 bg-white/40 rounded-[2.5rem] border-2 border-dashed border-espresso/10"
                >
                    <Coffee className="mx-auto w-16 h-16 text-espresso/10 mb-6" />
                    <p className="text-charcoal/40 text-xl font-serif italic">No items found matching your selection.</p>
                </motion.div>
            )}
        </motion.div>
    )
}

const MenuItemCard = ({ item, index, onOrder, isOrdering }) => (
    <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: (index % 6) * 0.05 
        }}
        whileHover={{ y: -12 }}
        className="group relative flex flex-col"
    >
        <div className="relative h-[280px] rounded-[2rem] overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl group-hover:shadow-espresso/10 transition-all duration-500">
            <motion.img 
                src={item.image || "/placeholder-coffee.jpg"} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                initial={{ filter: "blur(10px)", opacity: 0.8 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md shadow-xl px-4 py-1.5 rounded-full text-sm font-black text-espresso border border-latte/10">
                ${item.price}
            </div>
            
            {item.tags && item.tags.length > 0 && (
                <div className="absolute bottom-5 left-5 flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-black tracking-widest bg-espresso/90 text-white px-3 py-1 rounded-lg backdrop-blur-md shadow-lg">{tag}</span>
                    ))}
                </div>
            )}
        </div>
        
        <div className="px-2">
            <h3 className="text-2xl font-serif font-bold text-espresso mb-2 group-hover:text-latte transition-colors duration-300 leading-tight">{item.name}</h3>
            <p className="text-charcoal/40 text-sm leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2 italic font-medium">{item.description}</p>
            
            <motion.div 
                onClick={onOrder}
                className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase font-black text-espresso/30 hover:text-latte transition-all duration-300 cursor-pointer pt-4 border-t border-espresso/5"
                whileTap={{ scale: 0.98 }}
            >
                <span className="flex items-center group-hover:text-latte transition-colors">
                    {isOrdering ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />} 
                    {isOrdering ? "Ordering..." : "Quick Order"}
                </span>
                <span className="text-latte opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">→</span>
            </motion.div>
        </div>
    </motion.div>
)



export default Menu
