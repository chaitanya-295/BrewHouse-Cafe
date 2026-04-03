import { Link } from "react-router-dom"
import { ArrowRight, Coffee, Clock, ShieldCheck, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const Home = () => {
    return (
        <div className="space-y-32">
            {/* Hero Section */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center px-6 sm:px-12 pointer-events-none">
                <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-latte rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-espresso rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10 pointer-events-auto">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center md:text-left"
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 bg-latte/10 text-latte text-xs font-bold tracking-[0.2em] uppercase rounded-full">Crafted with Love</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-espresso leading-tight mb-8">
                            Experience the Art of <span className="text-latte underline-offset-8 decoration-latte underline italic">Coffee</span>
                        </h1>
                        <p className="text-lg md:text-xl text-charcoal/70 mb-10 max-w-lg leading-relaxed">
                            Every bean is hand-selected and roasted to perfection. Welcome to BrewHouse, where every cup tells a story.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                            <Link to="/menu" className="btn-primary flex items-center group w-full sm:w-auto justify-center">
                                Explore Menu 
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/reserve" className="btn-secondary w-full sm:w-auto justify-center text-center">Book a Table</Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="flex-1 relative aspect-square"
                    >
                        <div className="relative z-10 h-full w-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                            <img src="/hero-coffee.jpg" alt="Beautiful coffee craft" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center space-x-4 border border-latte/10">
                            <div className="p-3 bg-latte/20 rounded-full">
                                <Clock className="w-8 h-8 text-espresso" />
                            </div>
                            <div className="whitespace-nowrap">
                                <h4 className="font-bold text-espresso">Daily Fresh</h4>
                                <p className="text-xs text-charcoal/60 underline decoration-latte">Roasted every morning</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features/Stats Section */}
            <section className="bg-espresso py-24 sm:py-32 text-cream px-6 sm:px-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                    <FeatureItem icon={<Coffee className="w-10 h-10" />} title="Premium Beans" description="Ethically sourced arabica from high-altitude plantations." />
                    <FeatureItem icon={<Clock className="w-10 h-10" />} title="Quick Service" description="Expert baristas dedicated to speed without compromise." />
                    <FeatureItem icon={<ShieldCheck className="w-10 h-10" />} title="Eco-conscious" description="100% compostable packaging and zero-waste initiatives." />
                </div>
            </section>

            {/* Featured Items Placeholder */}
            <section className="px-6 sm:px-12 max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <span className="text-latte font-bold tracking-widest text-xs uppercase mb-2 block">Our Favorites</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso">Featured Selection</h2>
                    </div>
                    <Link to="/menu" className="text-latte font-bold hover:underline mb-2 flex items-center">View Full Menu <ArrowRight className="ml-1 w-4 h-4"/> </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeaturedCard title="Caramel Macchiato" price="$5.50" image="/item-1.jpg" desc="Rich espresso balanced with velvety steamed milk and sweet caramel." />
                    <FeaturedCard title="Vanilla Sweet Cream" price="$4.75" image="/item-2.jpg" desc="Cold brew topped with our house-made vanilla-infused cream." />
                    <FeaturedCard title="Almond Croissant" price="$4.25" image="/item-3.jpg" desc="Butter flaky pastry with sweet almond cream and toasted flakes." />
                </div>
            </section>

            {/* Gallery Section */}
            <section className="bg-cream/30 py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-20 text-center md:text-left">
                    <span className="text-latte font-bold tracking-widest text-xs uppercase mb-4 block">Visual Story</span>
                    <h2 className="text-5xl md:text-6xl font-serif font-bold text-espresso leading-tight italic">BrewMaster's <span className="underline decoration-latte/20 underline-offset-8">Gallery.</span></h2>
                </div>
                
                <div className="flex gap-10 px-6 sm:px-12 overflow-x-auto no-scrollbar pb-10">
                    <GalleryImage src="/hero-coffee.jpg" title="The Perfect Pull" tag="Espresso" />
                    <GalleryImage src="/about-cafe.jpg" title="Sanctuary of Brew" tag="Interior" />
                    <GalleryImage src="/item-2.jpg" title="Cold Extraction" tag="Slow Brew" />
                    <GalleryImage src="/item-1.jpg" title="Velvet Texture" tag="Latte Art" />
                    <GalleryImage src="/item-3.jpg" title="Morning Glow" tag="Bakery" />
                </div>
            </section>

             {/* Booking Banner Section */}
             <section className="px-6 sm:px-12 max-w-7xl mx-auto mb-32">
                <div className="relative premium-gradient rounded-[3rem] p-12 md:p-24 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                        <Coffee className="w-full h-full text-white" />
                    </div>
                    <div className="max-w-xl relative z-10">
                        <h2 className="text-4xl md:text-6xl text-white font-serif font-bold mb-8">Plan your visit<br/>today.</h2>
                        <p className="text-cream/70 text-lg mb-10 leading-relaxed">Avoid the queue and secure your favorite corner. We’re open for booking private tables and workspace niches.</p>
                        <Link to="/reserve" className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-espresso rounded-full font-bold transition-all hover:bg-latte hover:text-white">
                            <span>Make a Reservation</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
             </section>
        </div>
    )
}

const FeatureItem = ({ icon, title, description }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="flex flex-col items-center space-y-6"
    >
        <div className="p-5 bg-white/5 rounded-[2rem] border border-white/10 text-latte">{icon}</div>
        <h3 className="text-2xl font-serif font-semibold text-white">{title}</h3>
        <p className="text-cream/60 max-w-[250px] leading-relaxed mx-auto italic">{description}</p>
    </motion.div>
)

const FeaturedCard = ({ title, price, image, desc }) => (
    <Link to="/menu">
        <motion.div 
            whileHover={{ y: -10 }}
            className="card group cursor-pointer border-none shadow-xl bg-[#F8F5F1] h-full"
        >
            <div className="h-64 rounded-2xl overflow-hidden mb-8 relative">
                <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full font-bold text-espresso shadow-lg">{price}</div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-espresso mb-3 group-hover:text-latte transition-colors">{title}</h3>
            <p className="text-charcoal/60 text-sm leading-relaxed mb-6">{desc}</p>
            <div className="pt-4 border-t border-espresso/10 flex justify-between items-center text-xs tracking-[0.2em] font-bold uppercase text-espresso/40">
                <span>Specialty</span>
                <span className="text-latte group-hover:translate-x-1 transition-transform">Explore Menu →</span>
            </div>
        </motion.div>
    </Link>
)

const GalleryImage = ({ src, title, tag }) => (
    <motion.div 
        whileHover={{ scale: 1.05 }}
        className="relative min-w-[350px] md:min-w-[450px] h-[500px] rounded-[3rem] overflow-hidden group shadow-2xl flex-shrink-0"
    >
        <img src={src} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
            <span className="text-latte font-bold tracking-widest text-[10px] uppercase mb-4">{tag}</span>
            <h4 className="text-3xl font-serif font-bold text-white mb-2">{title}</h4>
        </div>
    </motion.div>
)

export default Home
