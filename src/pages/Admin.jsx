import { useState, useEffect } from "react"
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import { toast } from "sonner"
import { 
    Coffee, Plus, Trash2, Check, X, 
    UtensilsCrossed, CalendarCheck, Loader2, 
    Briefcase, ShoppingBag, Clock, User, 
    DollarSign, Image as ImageIcon, Tag
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const Admin = () => {
    const [activeTab, setActiveTab] = useState("reservations")
    const [reservations, setReservations] = useState([])
    const [menuItems, setMenuItems] = useState([])
    const [services, setServices] = useState([])
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    
    // Modals
    const [showAddMenuModal, setShowAddMenuModal] = useState(false)
    const [showAddServiceModal, setShowAddServiceModal] = useState(false)
    
    // Form States
    const [newItem, setNewItem] = useState({ name: "", price: "", category: "Hot Drinks", description: "", tags: "", image: "" })
    const [newService, setNewService] = useState({ title: "", description: "", icon: "Coffee" })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                // Reservations
                const resSnap = await getDocs(query(collection(db, "reservations"), orderBy("createdAt", "desc")))
                setReservations(resSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))

                // Menu
                const menuSnap = await getDocs(query(collection(db, "menu"), orderBy("name")))
                setMenuItems(menuSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                
                // Services
                const servSnap = await getDocs(query(collection(db, "services"), orderBy("title")))
                setServices(servSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
                
                // Orders
                const orderSnap = await getDocs(query(collection(db, "orders"), orderBy("createdAt", "desc")))
                setOrders(orderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            } catch (error) {
                console.error("Error fetching admin data:", error)
                toast.error("Failed to load dashboard data.")
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleUpdateStatus = async (collectionName, id, status) => {
        try {
            await updateDoc(doc(db, collectionName, id), { status })
            if (collectionName === "reservations") {
                setReservations(prev => prev.map(res => res.id === id ? { ...res, status } : res))
            } else if (collectionName === "orders") {
                setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order))
            }
            toast.success(`${collectionName.slice(0, -1)} ${status.toLowerCase()}`)
        } catch (error) {
            toast.error("Failed to update status")
        }
    }

    const handleDelete = async (collectionName, id) => {
        if (!confirm(`Are you sure you want to delete this ${collectionName.slice(0, -1)}?`)) return
        try {
            await deleteDoc(doc(db, collectionName, id))
            if (collectionName === "menu") setMenuItems(prev => prev.filter(i => i.id !== id))
            if (collectionName === "services") setServices(prev => prev.filter(i => i.id !== id))
            toast.success("Deleted successfully")
        } catch (error) {
            toast.error("Failed to delete item")
        }
    }

    const handleAddMenu = async (e) => {
        e.preventDefault()
        try {
            const tagsArray = newItem.tags.split(",").map(t => t.trim()).filter(t => t !== "")
            const docRef = await addDoc(collection(db, "menu"), {
                ...newItem,
                tags: tagsArray,
                createdAt: serverTimestamp()
            })
            setMenuItems(prev => [{ id: docRef.id, ...newItem, tags: tagsArray }, ...prev])
            setShowAddMenuModal(false)
            setNewItem({ name: "", price: "", category: "Hot Drinks", description: "", tags: "", image: "" })
            toast.success("Added to menu")
        } catch (error) {
            toast.error("Failed to add item")
        }
    }

    const handleAddService = async (e) => {
        e.preventDefault()
        try {
            const docRef = await addDoc(collection(db, "services"), {
                ...newService,
                createdAt: serverTimestamp()
            })
            setServices(prev => [{ id: docRef.id, ...newService }, ...prev])
            setShowAddServiceModal(false)
            setNewService({ title: "", description: "", icon: "Coffee" })
            toast.success("Service added")
        } catch (error) {
            toast.error("Failed to add service")
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 px-4">
                <div className="space-y-2">
                  <h1 className="text-5xl font-serif font-black text-espresso tracking-tight">Admin Console</h1>
                  <p className="text-charcoal/40 text-xs font-black uppercase tracking-[0.3em]">Curation • Management • Experience</p>
                </div>
                
                <div className="flex bg-white/50 backdrop-blur-md p-1.5 rounded-3xl shadow-sm border border-espresso/5 overflow-x-auto w-full lg:w-auto no-scrollbar">
                    <TabButton active={activeTab === "reservations"} onClick={() => setActiveTab("reservations")} icon={<CalendarCheck className="w-4 h-4" />} label="Bookings" />
                    <TabButton active={activeTab === "orders"} onClick={() => setActiveTab("orders")} icon={<ShoppingBag className="w-4 h-4" />} label="Orders" />
                    <TabButton active={activeTab === "menu"} onClick={() => setActiveTab("menu")} icon={<UtensilsCrossed className="w-4 h-4" />} label="Menu" />
                    <TabButton active={activeTab === "services"} onClick={() => setActiveTab("services")} icon={<Briefcase className="w-4 h-4" />} label="Services" />
                </div>
            </header>

            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <Loader2 className="w-12 h-12 text-latte" />
                    </motion.div>
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-12"
                >
                   {activeTab === "reservations" && <ReservationsPanel reservations={reservations} onUpdate={(id, s) => handleUpdateStatus("reservations", id, s)} />}
                   {activeTab === "orders" && <OrdersPanel orders={orders} onUpdate={(id, s) => handleUpdateStatus("orders", id, s)} />}
                   {activeTab === "menu" && <MenuPanel items={menuItems} onDelete={(id) => handleDelete("menu", id)} onAdd={() => setShowAddMenuModal(true)} />}
                   {activeTab === "services" && <ServicesPanel services={services} onDelete={(id) => handleDelete("services", id)} onAdd={() => setShowAddServiceModal(true)} />}
                </motion.div>
            )}

            {/* Modals */}
            <AnimatePresence>
                {showAddMenuModal && (
                    <Modal title="Add Menu Selection" onClose={() => setShowAddMenuModal(false)}>
                        <form onSubmit={handleAddMenu} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <FormGroup label="Item Name" icon={<Coffee className="w-4 h-4" />}><Input value={newItem.name} onChange={v => setNewItem({...newItem, name: v})} required /></FormGroup>
                                <FormGroup label="Price" icon={<DollarSign className="w-4 h-4" />}><Input value={newItem.price} onChange={v => setNewItem({...newItem, price: v})} required /></FormGroup>
                            </div>
                            <FormGroup label="Category" icon={<Tag className="w-4 h-4" />}>
                                <select className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl outline-none font-medium text-espresso" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                                    <option value="Hot Drinks">Hot Drinks</option>
                                    <option value="Cold Drinks">Cold Drinks</option>
                                    <option value="Food">Food</option>
                                    <option value="Specials">Specials</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Image URL" icon={<ImageIcon className="w-4 h-4" />}><Input value={newItem.image} onChange={v => setNewItem({...newItem, image: v})} /></FormGroup>
                            <FormGroup label="Tags" icon={<Tag className="w-4 h-4" />}><Input placeholder="e.g. Best Seller, Vegan" value={newItem.tags} onChange={v => setNewItem({...newItem, tags: v})} /></FormGroup>
                            <FormGroup label="Description" icon={<UtensilsCrossed className="w-4 h-4" />}><textarea className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl outline-none font-medium text-espresso h-28 resize-none" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} required /></FormGroup>
                            <div className="flex gap-4 pt-4"><button type="submit" className="flex-1 btn-primary py-4">Save Selection</button></div>
                        </form>
                    </Modal>
                )}

                {showAddServiceModal && (
                    <Modal title="Add Professional Service" onClose={() => setShowAddServiceModal(false)}>
                        <form onSubmit={handleAddService} className="space-y-5">
                            <FormGroup label="Service Title" icon={<Briefcase className="w-4 h-4" />}><Input value={newService.title} onChange={v => setNewService({...newService, title: v})} required /></FormGroup>
                            <FormGroup label="Icon Type" icon={<Tag className="w-4 h-4" />}>
                                <select className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl outline-none font-medium text-espresso" value={newService.icon} onChange={e => setNewService({...newService, icon: e.target.value})}>
                                    <option value="Coffee">Coffee</option>
                                    <option value="Calendar">Calendar</option>
                                    <option value="ShieldCheck">Shield</option>
                                    <option value="MapPin">Location</option>
                                    <option value="Briefcase">Professional</option>
                                </select>
                            </FormGroup>
                            <FormGroup label="Description" icon={<UtensilsCrossed className="w-4 h-4" />}><textarea className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl outline-none font-medium text-espresso h-40 resize-none" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required /></FormGroup>
                            <div className="flex gap-4 pt-4"><button type="submit" className="flex-1 btn-primary py-4">Launch Service</button></div>
                        </form>
                    </Modal>
                )}
            </AnimatePresence>
        </div>
    )
}

// UI Components
const TabButton = ({ active, onClick, icon, label }) => (
    <button onClick={onClick} className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${active ? "bg-espresso text-white shadow-xl" : "text-charcoal/40 hover:text-espresso/60"}`}>
        {icon} <span className="hidden sm:inline">{label}</span>
    </button>
)

const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-espresso/60 backdrop-blur-md">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} className="bg-white rounded-[3rem] p-10 max-w-xl w-full relative shadow-2xl border border-white/20">
            <button onClick={onClose} className="absolute top-8 right-8 text-espresso/20 hover:text-espresso transition-colors"><X className="w-6 h-6" /></button>
            <h2 className="text-3xl font-serif font-black text-espresso mb-8">{title}</h2>
            {children}
        </motion.div>
    </div>
)

const FormGroup = ({ label, icon, children }) => (
    <div className="space-y-2">
        <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-espresso/40 ml-2">
            {icon} <span>{label}</span>
        </div>
        {children}
    </div>
)

const Input = ({ placeholder, value, onChange, required = false }) => (
    <input type="text" placeholder={placeholder} required={required} value={value} onChange={e => onChange(e.target.value)} className="w-full p-4 bg-cream/50 border border-espresso/10 rounded-2xl outline-none font-medium text-espresso focus:ring-2 focus:ring-latte/20 transition-all placeholder:text-espresso/20" />
)

const ReservationsPanel = ({ reservations, onUpdate }) => (
    <PanelWrapper title="Table Reservations" badge="Active Bookings">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-cream/20 text-[10px] font-black uppercase tracking-widest text-espresso/40">
                    <tr>
                        <th className="px-8 py-5">Customer</th>
                        <th className="px-8 py-5">Timing</th>
                        <th className="px-8 py-5">Table</th>
                        <th className="px-8 py-5">Party</th>
                        <th className="px-8 py-5 text-center">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-latte/10">
                    {reservations.map(res => (
                        <tr key={res.id} className="hover:bg-cream/10 transition-colors">
                            <td className="px-8 py-6">
                                <div className="font-bold text-espresso">{res.userName}</div>
                                <div className="text-xs text-latte">{res.occasion}</div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="font-medium text-espresso">{res.date}</div>
                                <div className="text-xs text-charcoal/40">{res.time}</div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="font-bold text-latte">Table {res.tableNumber || "N/A"}</div>
                            </td>
                            <td className="px-8 py-6 font-bold text-espresso/60">{res.guests} Guests</td>
                            <td className="px-8 py-6">
                                <StatusBadge status={res.status} />
                            </td>
                            <td className="px-8 py-6 text-right">
                                {res.status === "Pending" && (
                                    <div className="flex justify-end space-x-2">
                                        <button onClick={() => onUpdate(res.id, "Confirmed")} className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-all border border-green-200/50"><Check className="w-4 h-4" /></button>
                                        <button onClick={() => onUpdate(res.id, "Cancelled")} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all border border-red-200/50"><X className="w-4 h-4" /></button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {reservations.length === 0 && <EmptyState message="No reservations found." />}
        </div>
    </PanelWrapper>
)

const OrdersPanel = ({ orders, onUpdate }) => (
    <PanelWrapper title="Live Orders" badge={`${orders.length} Total`}>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-cream/20 text-[10px] font-black uppercase tracking-widest text-espresso/40">
                    <tr>
                        <th className="px-8 py-5">Customer</th>
                        <th className="px-8 py-5">Location</th>
                        <th className="px-8 py-5">Order Detail</th>
                        <th className="px-8 py-5 text-center">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-latte/10">
                    {orders.map(order => (
                        <tr key={order.id} className="hover:bg-cream/10 transition-colors">
                            <td className="px-8 py-6">
                                <div className="font-bold text-espresso">{order.userName || "Guest"}</div>
                                <div className="text-xs text-charcoal/40">{new Date(order.createdAt?.seconds * 1000).toLocaleString()}</div>
                            </td>
                            <td className="px-8 py-6 font-bold text-latte">
                                Table {order.tableNumber || "N/A"}
                            </td>
                            <td className="px-8 py-6">
                                <div className="font-bold text-espresso">{order.itemName}</div>
                                <div className="text-xs font-black text-espresso/40 uppercase tracking-tighter">${order.price}</div>
                            </td>
                            <td className="px-8 py-6">
                                <StatusBadge status={order.status || "Pending"} />
                            </td>
                            <td className="px-8 py-6 text-right">
                                {(order.status === "Pending" || !order.status) && (
                                    <div className="flex justify-end space-x-2">
                                        <button onClick={() => onUpdate(order.id, "Completed")} className="bg-espresso text-white px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all">Mark Complete</button>
                                        <button onClick={() => onUpdate(order.id, "Cancelled")} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 border border-red-200/50"><X className="w-4 h-4" /></button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {orders.length === 0 && <EmptyState message="No orders yet." />}
        </div>
    </PanelWrapper>
)

const MenuPanel = ({ items, onDelete, onAdd }) => (
    <div className="space-y-8">
        <div className="flex justify-between items-end px-4">
            <div>
                <h3 className="text-3xl font-serif font-black text-espresso">Artisanal Selection</h3>
                <p className="text-xs font-black uppercase text-espresso/20 tracking-widest mt-1">Curate your coffee experience</p>
            </div>
            <button onClick={onAdd} className="btn-primary flex items-center space-x-3 px-6 py-4 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-all"><Plus className="w-5 h-5" /> <span>Add Selection</span></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {items.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-[2.5rem] border border-latte/10 flex items-center gap-6 relative group hover:shadow-2xl hover:shadow-espresso/10 transition-all duration-500">
                    <img src={item.image || "/placeholder-coffee.jpg"} className="w-24 h-24 rounded-[2rem] object-cover shadow-2xl border-4 border-white" />
                    <div className="flex-grow">
                        <div className="text-[10px] uppercase font-black tracking-widest text-latte mb-1">{item.category}</div>
                        <h4 className="text-lg font-serif font-bold text-espresso leading-tight">{item.name}</h4>
                        <p className="text-espresso/60 font-black text-sm mt-1">${item.price}</p>
                    </div>
                    <button onClick={() => onDelete(item.id)} className="p-4 bg-red-50 text-red-400 hover:text-red-700 hover:bg-red-100 rounded-[1.5rem] transition-all opacity-0 group-hover:opacity-100"><Trash2 className="w-5 h-5" /></button>
                </div>
            ))}
        </div>
    </div>
)

const ServicesPanel = ({ services, onDelete, onAdd }) => (
    <div className="space-y-8">
        <div className="flex justify-between items-end px-4">
            <div>
                <h3 className="text-3xl font-serif font-black text-espresso">Professional Services</h3>
                <p className="text-xs font-black uppercase text-espresso/20 tracking-widest mt-1">Expanding beyond the brew</p>
            </div>
            <button onClick={onAdd} className="btn-primary flex items-center space-x-3 px-6 py-4 rounded-[2rem] shadow-xl hover:-translate-y-1 transition-all"><Plus className="w-5 h-5" /> <span>New Service</span></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(service => (
                <div key={service.id} className="bg-white p-10 rounded-[3rem] border border-latte/10 flex flex-col space-y-6 relative group hover:shadow-2xl transition-all duration-500">
                    <div className="w-16 h-16 bg-cream rounded-[1.5rem] flex items-center justify-center text-latte"><Coffee className="w-8 h-8" /></div>
                    <div>
                        <h4 className="text-2xl font-serif font-bold text-espresso mb-3">{service.title}</h4>
                        <p className="text-charcoal/40 text-sm italic leading-relaxed">{service.description}</p>
                    </div>
                    <button onClick={() => onDelete(service.id)} className="absolute top-10 right-10 p-4 text-red-300 hover:text-red-600 hover:bg-red-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-5 h-5" /></button>
                </div>
            ))}
        </div>
    </div>
)

// Helpers
const PanelWrapper = ({ title, badge, children }) => (
    <div className="bg-white rounded-[3rem] shadow-sm border border-latte/10 overflow-hidden">
        <div className="p-10 border-b border-latte/10 bg-cream/20 flex justify-between items-end">
            <div>
                <h3 className="text-2xl font-serif font-black text-espresso">{title}</h3>
                <p className="text-xs font-black uppercase text-espresso/20 tracking-widest mt-1">Real-time Dashboard</p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white px-5 py-2 rounded-full border border-latte/20 shadow-sm">{badge}</span>
        </div>
        {children}
    </div>
)

const StatusBadge = ({ status }) => {
    const colors = {
        Pending: "bg-latte/10 text-latte",
        Confirmed: "bg-green-100 text-green-700",
        Completed: "bg-espresso text-white",
        Cancelled: "bg-red-100 text-red-700"
    }
    return <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-current shadow-sm block w-fit mx-auto ${colors[status] || "bg-gray-100 text-gray-600"}`}>{status}</span>
}

const EmptyState = ({ message }) => (
    <div className="p-32 text-center">
        <Coffee className="w-16 h-16 text-espresso/5 mx-auto mb-6" />
        <p className="text-espresso/20 font-serif italic text-xl">{message}</p>
    </div>
)

export default Admin
